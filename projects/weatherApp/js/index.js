//点进页面首先获取当前ip并显示当前城市的天气
$.get('https://api.ipify.org/?format=json')
    .done(function (data) {
        $.get('https://weixin.jirengu.com/weather/cityid?location=' + data.ip)
            .done(getWeather)//请求成功执行getWeather函数
    })

//用户输入数据并返回数据
$('#u-ipt-city').on('keydown', function (e) {
    var cityName, cityId
    //如果用户按下了回车
    if (e.keyCode == 13) {
        //获取他输入的cityName的pinyin
        cityName = $(this).val()
        //根据cityName发起http请求
        $.get('https://weixin.jirengu.com/weather/cityid?location=' + cityName)
            .done(getWeather)//请求成功执行getWeather函数
        $(this).val('')//回车后清空输入内容
    }
})

//获取天气数据并渲染到页面
function getWeather(data) {
    //如果数据到来
    if (data && data.results && data.results[0]) {
        //获取用户输入的城市的id
        cityId = data.results[0].id
        //根据cityId发起http请求
        $.get('https://weixin.jirengu.com/weather/now?cityid=' + cityId)
            .done(function (data) {//请求成功执行以下代码
                if (data.status == 'OK') {//如果数据状态OK（这个ok是和后段约定的），即数据到来了
                    renderTodayPage(data.weather[0])//调用函数renderPage来渲染页面，传递的参数为获取的数据data的weather数组对象的第一项
                    renderFutPage(data.weather[0].future)
                } else {//如果数据出错则弹出警告框
                    alert('数据出错了')
                }
            })
    }
}

// 渲染当天天气
function renderTodayPage(data) {
    var nowImgUrl, nowCode
    nowCode = data.now.code
    nowImgUrl = '//weixin.jirengu.com/images/weather/code/' + nowCode + '.png'
    //当前ip地址的cityName
    $('#location').text(data.city_name)
    //当前时间
    $('#time').text(getTime())
    //天气图片
    $('#t-img-wind>img').attr('src', nowImgUrl)
    //温度
    $('#t-temp').text(data.now.temperature + '°')
    //风速
    $('#t-wind').text(data.now.wind_speed + 'mph')
}

//渲染未来6天的天气
function renderFutPage(data) {
    var futures = $('#future .f-forecast')
    futures.each(function (idx, ele) {
        $(this).find('.f-date').text(data[idx].day)
        $(this).find('.f-img').attr('src', '//weixin.jirengu.com/images/weather/code/' + data[idx].code1 + '.png')
        $(this).find('.f-temp').text(data[idx].high + '°')
    })
}

//获取当前时间
function getTime() {
    var date = new Date
    min = date.getMinutes()
    sec = date.getSeconds()
    if (min < 10) {
        min = '0' + min
    }
    if (sec < 10) {
        sec = '0' + sec
    }
    return date.getHours() + ':' + min + ':' + sec
}

//设置定时器
setInterval(function () {
    $('#time').text(getTime())
}, 1000)


