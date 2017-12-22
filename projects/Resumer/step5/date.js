function friendlyDate(time) {
    var offset = +new Date - time;
    var seconds = 1000,
        minutes = seconds * 60,
        hours = minutes * 60,
        days = hours * 24,
        months = days * 30,
        years = months * 12;
    var t;

    if (offset >= years) {
        t = parseInt(offset / years);
        return t + '年前';
    }
    else if (offset >= months) {
        t = parseInt(offset / months)
        return t + '个月前';
    }
    else if (offset >= days) {
        t = parseInt(offset / days);
        return t + '天前';
    }
    else if (offset >= hours) {
        t = parseInt(offset / hours);
        return t + '小时前';
    }
    else if (offset >= minutes) {
        t = parseInt(offset / minutes);
        return t + '分钟前';
    }
    return '刚刚'
}

export default friendlyDate


