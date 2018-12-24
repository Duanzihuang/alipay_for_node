//时区方法
const timeAddZero = (sz) => {
    if (sz >= 0 && sz <= 9) {
        sz = "0" + sz;
    }
    return sz;
}

//获取当前时间
exports.getNowFormatDate = (incrTime = 0) => {
    var date = new Date();
    date.setTime(date.getTime() + incrTime);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var currentdate = date.getFullYear() + seperator1 + timeAddZero(month) + seperator1 + timeAddZero(strDate)
        + " " + timeAddZero(date.getHours()) + seperator2 + timeAddZero(date.getMinutes())
        + seperator2 + timeAddZero(date.getSeconds());
    return currentdate;
}

//生成订单号
/**
 * 订单号暂时由时间戳与八位随机码生成
 */
exports.generateOutTradeNo = () => {
    var code = ""
    for (var i = 0; i < 8; i++) {
        code += Math.floor(Math.random() * 10);
    }

    return Date.now().toString() + code;
}
