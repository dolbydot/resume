
var songList = [
    {
        "index": 1,
        "uid": "1",
        "url": "https://dolbydot.cn:9443/mp3/2.mp3",
        "song": "取暖",
        "author": "张国荣",
        "special": "Printemps",
        "img": "./special-photo/取暖.jpg",
        "time": 254
    },
    {
        "index": 2,
        "uid": "2",
        "url": "https://dolbydot.cn:9443/mp3/1.mp3",
        "song": "十分十二寸",
        "author": "林子祥",
        "special": "十分十二寸",
        "img": "./special-photo/十分十二寸.jpg",
        "time": 585
    },
    {
        "index": 3,
        "uid": "3",
        "url": "https://dolbydot.cn:9443/mp3/3.mp3",
        "song": "月亮代表我的心",
        "author": "张国荣",
        "special": "钟情张国荣",
        "img": "./special-photo/月亮代表我的心2.jpg",
        "time": 237
    },
    {
        "index": 4,
        "uid": "4",
        "url": "https://dolbydot.cn:9443/mp3/4.mp3",
        "song": "爱的故事(上)",
        "author": "孙耀威",
        "special": "爱的故事(上集)",
        "img": "./special-photo/爱的故事上.jpg",
        "time": 238
    },
    {
        "index": 5,
        "uid": "5",
        "url": "https://dolbydot.cn:9443/mp3/5.mp3",
        "song": "爱情",
        "author": "莫文蔚",
        "special": "莫后年代",
        "img": "./special-photo/爱情.jpg",
        "time": 285
    },
    {
        "index": 6,
        "uid": "6",
        "url": "https://dolbydot.cn:9443/mp3/6.mp3",
        "song": "黎明不要来",
        "author": "叶倩文",
        "special": "《倩女幽魂》主题曲",
        "img": "./special-photo/黎明不要来2.jpg",
        "time": 188
    },
    {
        "index": 7,
        "uid": "7",
        "url": "https://dolbydot.cn:9443/mp3/7.mp3",
        "song": "一丝不挂",
        "author": "陈奕迅",
        "special": "Time Files",
        "img": "./special-photo/一丝不挂3.jpg",
        "time": 241
    },
    {
        "index": 8,
        "uid": "8",
        "url": "https://dolbydot.cn:9443/mp3/8.mp3",
        "song": "淹没",
        "author": "张学友",
        "special": "Lust,Caution",
        "img": "./special-photo/淹没3.png",
        "time": 222
    },
    {
        "index": 9,
        "uid": "9",
        "url": "https://dolbydot.cn:9443/mp3/9.mp3",
        "song": "我是愤怒",
        "author": "Beyond",
        "special": "乐与怒",
        "img": "./special-photo/我是愤怒.jpg",
        "time": 252
    },
    {
        "index": 10,
        "uid": "10",
        "url": "https://dolbydot.cn:9443/mp3/10.mp3",
        "song": "芳华绝代",
        "author": "张国荣&梅艳芳",
        "special": "Y100",
        "img": "./special-photo/芳华绝代.jpeg",
        "time": 369
    },
    {
        "index": 11,
        "uid": "11",
        "url": "https://dolbydot.cn:9443/mp3/11.mp3",
        "song": "一生所爱",
        "author": "卢冠廷",
        "special": "《大话西游》插曲",
        "img": "./special-photo/一生所爱.jpg",
        "time": 273
    },
    {
        "index": 12,
        "uid": "12",
        "url": "https://dolbydot.cn:9443/mp3/12.mp3",
        "song": "钟无艳",
        "author": "谢安琪",
        "special": "Audiophile Compilations",
        "img": "./special-photo/钟无艳.jpg",
        "time": 276
    },
    {
        "index": 13,
        "uid": "13",
        "url": "https://dolbydot.cn:9443/mp3/13.mp3",
        "song": "一生守候",
        "author": "王若琳",
        "special": "为爱做的一切",
        "img": "./special-photo/一生守候.jpeg",
        "time": 293
    },
    {
        "index": 14,
        "uid": "14",
        "url": "https://dolbydot.cn:9443/mp3/14.mp3",
        "song": "初恋",
        "author": "林志美",
        "special": "《食神》插曲",
        "img": "./special-photo/初恋.jpg",
        "time": 225
    },
    {
        "index": 15,
        "uid": "15",
        "url": "https://dolbydot.cn:9443/mp3/15.mp3",
        "song": "一事无成",
        "author": "周柏豪&郑融",
        "special": "Continue",
        "img": "./special-photo/一事无成.jpeg",
        "time": 191
    }
]


function $(selector) {
    return document.querySelector(selector)
}

var player = $('#player')
var wrapper = $('.wrapper')
var bg = $('.bg')
var playToggle = $('.play-toggle')
var playNext = $('.next-song')
var playPre = $('.pre-song')
var song = $('.song-info .song-name')
var author = $('.author')
var special = $('.special')
var img = $('.album-art')
var volDown = $('.voldown')
var volUp = $('.volup')
var totalTime = $('.total-time')
var curTime = $('.cur-time')
var cycleBtn = $('.cycle-status')
var progressRange = $('.progress-range')
var progressDrag = $('.progress-range>.drag')
var volRange = $('.voice-range')
var volDrag = $('.voice-range>.drag')

var curIdx = 0;
var listLen = songList.length

//进入页面就获取音乐源，歌名，歌手，时长，专辑图片并开始播放
function getInfo() {
    //求余是为了能正确列表循环播放
    player.src = songList[curIdx % listLen].url
    song.innerHTML = songList[curIdx % listLen].song
    author.innerHTML = songList[curIdx % listLen].author
    special.innerHTML = songList[curIdx % listLen].special
    img.style.backgroundImage = "url(" + songList[curIdx % listLen].img + ")"
    // bg.style.backgroundImage = "url(" + songList[curIdx % listLen].img + ")"
}

getInfo()
getTotalTime()
player.play()

function toggleStatus() {
    //如果当前没有开始播放或者是暂停状态，那么点击playToggle开始播放，并修改playToggle的样式为红色三角
    if (player.currentTime === 0 || player.paused) {
        player.play()
        playToggle.innerHTML = '&#xe8fe;'
        playToggle.style.color = '#25c54d'
    } else {
        //如果正在播放则点击playToggle就暂停，并修改playToggle的样式为绿色竖线
        player.pause()
        playToggle.innerHTML = '&#xe610;'
        playToggle.style.color = '#ff1719'
    }
}

//点击播放|暂停修改按钮样式
playToggle.addEventListener('click', function () {
    toggleStatus()
})

//切换曲目
function switchMusic() {
    //为了在暂停状态下切歌时得到正确的按钮样式
    if (player.currentTime === 0 || player.paused) {
        player.play()
        getTotalTime()
        playToggle.innerHTML = '&#xe8fe;'
        playToggle.style.color = '#25c54d'
    }
}

//下一曲
playNext.addEventListener('click', function () {
    //首先初始化当前曲目索引为0，点击下一曲按钮时索引加1
    curIdx += 1
    getInfo()
    switchMusic()
})

//上一曲
playPre.addEventListener('click', function () {
    curIdx = curIdx == 1 ? listLen : curIdx - 1;
    getInfo()
    switchMusic()
})

//音量控制
//1、默认音量
player.volume = 0.5
volDrag.style.width = '50%';

//2、音量range
volRange.addEventListener('mousedown', function (e) {
    var volWidthStr = window.getComputedStyle(volRange).width
    var volRangeWidth = volWidthStr.replace(/\.\d+px$/, '')//volRange的长度
    var posX = e.clientX//当前点击位置距离浏览器窗口原点的水平距离
    var targetLeft = volRange.offsetLeft//volRange原点距离wrapper原点的水平距离
    var outerLeft = wrapper.getBoundingClientRect().x//wrapper原点距离浏览器窗口原点的水平距离
    var dragWidth = posX - targetLeft - outerLeft
    var percentage = dragWidth / volRangeWidth //黑色部分所占整个灰色部分的百分比
    player.volume = 1 * percentage//点击后得到的音量
    volDrag.style.width = percentage * 100 + '%'//设置黑色drag部分的宽度
})

//3、点击音量减小按钮静音，再次点击此按钮声音恢复,设置一个点击次数count，每次点击count值加1
var count = 0
volDown.addEventListener('click', function () {
    count += 1
    var volWidthStr = window.getComputedStyle(volRange).width
    var volRangeWidth = volWidthStr.replace(/\.\d+px$/, '')
    var dragWidthStr = window.getComputedStyle(volDrag).width
    var volDragWidth = dragWidthStr.replace(/\.\d+px$/, '')

    if (count % 2 == 1) {
        player.volume = 0
        volDown.innerHTML = '&#xe632;'
        volDrag.style.opacity = 0
    } else {
        volDrag.style.opacity = 1
        volDown.innerHTML = '&#xe633;'
        player.volume = volDragWidth / volRangeWidth

    }
})

//获取当前播放的时间并在一曲结束后自动播放下一曲
function getCurTime() {
    var length = player.currentTime / player.duration * 100
    progressDrag.style.width = length + '%'
    var currentTime = player.currentTime//当前播放了多少秒
    var sec = Math.floor(currentTime % 60)//有一秒的误差
    var min = Math.floor(currentTime / 60)
    if (min < 10) {
        min = '0' + min
    }
    if (sec < 10) {
        sec = '0' + sec
    }
    curTime.innerHTML = min + ':' + sec
    if (player.currentTime == player.duration) {//如果当前播放的描述等于音频的总长度，单位以秒计
        playNext.click()
    }
}

//监听事件：一首歌放完自动播下一首，getCurTime函数里已经做了判断所以不需要重复写
// player.addEventListener('ended', function () {
//     curIdx += 1
//     getInfo()
//     switchMusic()
// })

//获取当前歌曲的总时长
function getTotalTime() {
    var totalSeconds = songList[curIdx % listLen].time
    var sec = totalSeconds % 60
    var min = Math.floor(totalSeconds / 60)
    if (min < 10) {
        min = '0' + min
    }
    if (sec < 10) {
        sec = '0' + sec
    }
    totalTime.innerHTML = min + ':' + sec
}

//进度条自动及手动控制
var timer = setInterval(getCurTime, 1000)
progressRange.addEventListener('mousedown', function (e) {
    var musWidthStr = window.getComputedStyle(progressRange).width
    var musRangeWidth = musWidthStr.replace(/\.\d+px$/, '')
    var posX = e.clientX//当前点击位置距离浏览器窗口原点的水平距离
    var targetLeft = progressRange.offsetLeft//ProgressRange原点距离wrapper原点的水平距离
    var outerLeft = wrapper.getBoundingClientRect().x//wrapper原点距离浏览器窗口原点的水平距离
    var percentage = (posX - targetLeft - outerLeft) / musRangeWidth
    player.currentTime = player.duration * percentage
})

//cycleBtnIdx与count共用回出现交叉点击时点两次才有反应的情况，没想到解决办法所以先分开定义计数变量
//问题：怎样实现利用到歌曲的index和curidx相结合
//优化：加载歌时不播放，load完才播放
//一曲放完下一曲时进度条样式和时间都有点问题，时好时坏

//键盘事件
window.addEventListener('keydown', function (e) {
    //1、空格 播放/暂停,在input输入框中按空格不生效
    if (e.keyCode === 32) {
        if (e.target.nodeName !== 'INPUT') {
            toggleStatus()
        }
    }
    //2、左/右键 上一曲/下一曲
    if (e.keyCode === 37) {
        playPre.click()
    }
    if (e.keyCode === 39) {
        playNext.click()
    }
    //3、上/下键 音量+/音量-
    if (e.keyCode === 38) {
        player.volume += 0.01
        volDrag.style.width = player.volume * 100 + '%'
    }
    if (e.keyCode === 40) {
        player.volume -= 0.01
        volDrag.style.width = player.volume * 100 + '%'
    }
})




//循环按钮样式
// var cycleBtnIdx = 0
// cycleBtn.addEventListener('click', function () {
//     cycleBtnIdx += 1
//     if (cycleBtnIdx % 3 == 0) {
//         //默认列表循环
//         this.innerHTML = '&#xe630;'
//     } else if (cycleBtnIdx % 3 == 1) {
//         //单曲循环
//         this.innerHTML = '&#xe65f;'
//         if (player.currentTime == player.duration) {

//         }
//     } else {
//         //随机循环
//         this.innerHTML = '&#xe631;'
//     }
// })
//歌词







