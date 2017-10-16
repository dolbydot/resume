//tab按钮切换样式
$('footer').on('click', 'div', function () {
    $(this).addClass('active')
    .siblings().removeClass('active')
})

//刚进入页面就获取20条
var index = 0
var isLoading = false//状态锁
start()

//发送ajax请求获取数据，一次20条
function start() {
    if (isLoading) return
    isLoading = true
    $('.loading').show()
    $.ajax({
        url: 'http://api.douban.com/v2/movie/top250',
        method: 'GET',
        data: {
            start: index,
            count: 20
        },
        dataType: 'jsonp'
    }).done(function (ret) {
        console.log(ret)
        setData(ret)
        index += 20
    }).fail(function () {
        console.log('error')
    }).always(function () {
        isLoading = false
        $('.loading').hide()
    })
}

//设置数据
function setData(data) {
    data.subjects.forEach(function (movie) {
        var segment = `
    <div class="movie-item">
            <a href="#">
                <div class="poster">
                    <img src="" alt="">
                </div>
                <div class="info">
                    <h2 class="title"></h2>
                    <p><span class="grade"></span><span class="collect"></span></p>
                    <p><span class="year"></span> / <span class="genres"></span></p>
                    <p>导演: <span class="directors"></span></p>
                    <p>主演: <span class="actors"></span></p>
                </div>
            </a>
    </div>
    `
        var $node = $(segment)
        $node.find('a').attr('href', movie.alt)
        $node.find('img').attr('src', movie.images.medium)
        $node.find('.title').text(movie.title)
        $node.find('.grade').text(movie.rating.average + '分 / ')
        $node.find('.collect').text(movie.collect_count + '收藏')
        $node.find('.year').text(movie.year)
        $node.find('.genres').text(movie.genres.join(' / '))
        $node.find('.directors').text(function () {
            var directorsArr = []
            movie.directors.forEach(function (item) {
                directorsArr.push(item.name)
            })
            return directorsArr.join('、')
        })
        $node.find('.actors').text(function () {
            var actorsArr = []
            movie.casts.forEach(function (item) {
                actorsArr.push(item.name)
            })
            return actorsArr.join('、')
        })
        $('#top250').append($node)
    })
}

//判断是否滚动到底部+懒加载
var clock
$('main').on('scroll', function () {
    if (clock) {
        clearTimeout(clock)
    }
    clock = setTimeout(function () {
        if ($('section').eq(0).height() - 10 <= $('main').scrollTop() + $('main').height()) {
            start()
        }
    }, 300)
})
