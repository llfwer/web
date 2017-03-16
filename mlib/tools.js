//结构元素访问
function EachObject(obj, fun) {
    for (var n in obj) {
        var m = obj[n];
        fun(n, m);
    }
}

//更新字体(资讯)
function replace_font(r_str) {
    var _str = r_str;
    _str = _str.replace(/style/g, "st");
    _str = _str.replace(/class/g, "cls");
    _str = _str.replace(/<([p|P]+)\s*[^><]*>/g, "<$1 style=\"text-indent:2em;line-height:1.6;\">");
    return _str;
}

//数组元素匹配
function inArray(stringToSearch, arrayToSearch) {
    for (var i = 0; i < arrayToSearch.length; i++) {
        if (stringToSearch == arrayToSearch[i].toString()) {
            return i;
        }
    }
    return -1;
}

//数值保留小数
function MathRound(value, index) {
    var num = Number(value);
    if (isNaN(num)) {
        return value;
    }
    var lv = 1;
    for (var i = 1; i <= index; i++) {
        lv = lv * 10;
    }
    var result = Math.round(num * lv) / lv;
    return result.toFixed(index);
}

//数值亿万表达
function YWYNum(value) {
    var num = Number(value);
    if (isNaN(num)) {
        return value;
    }

    var result;
    var wan = num / 10000;
    var yi = num / 100000000;
    if (Math.abs(wan) < 1) {
        result = num.toFixed(2) + '元';
    } else if (Math.abs(yi) < 1) {
        result = MathRound(wan, 2) + '万';
    } else {
        result = MathRound(yi, 2) + '亿';
    }
    return result;
}

//数值亿万表达
function YWYNumB(value, index) {
    var num = Number(value);
    if (isNaN(num)) {
        return value;
    }
    var result;
    var wan = num / 10000;
    var yi = num / 100000000;
    if (Math.abs(wan) < 1) {
        result = num.toFixed(index) + '元';
    } else if (Math.abs(yi) < 1) {
        result = MathRound(wan, index) + '万';
    } else {
        result = MathRound(yi, index) + '亿';
    }
    return result;
}

//数值亿万表达
function YWYNumC(value, index) {
    var num = Number(value);
    if (isNaN(num)) {
        return value;
    }
    var result;
    var wan = num / 10000;
    var yi = num / 100000000;
    if (Math.abs(wan) < 1) {
        result = num.toFixed(index);
    } else if (Math.abs(yi) < 1) {
        result = MathRound(wan, index);
    } else {
        result = MathRound(yi, index);
    }
    return result;
}

//获取今天的日期
function GetToday(n) {
    var today = new Date();
    var IntToday = DatetoInt(today);
    if (n == 0) {
        return IntToday;
    }
    var StrToday = InttoDateStr(IntToday);
    return StrToday;
}

//日期格式转换为整型日期格式
function DatetoInt(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    var minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = "0" + hours;
    }
    year = year.toString();
    month = month.toString();
    day = day.toString();
    hours = hours.toString();
    minutes = minutes.toString();
    seconds = seconds.toString();
    var intdate = parseInt(year + month + day);
    return intdate;
}

//整型日期格式转化为字符串格式
function InttoDateStr(intdate) {
    var year = intdate.toString().substring(0, 4);
    var month = intdate.toString().substring(4, 6);
    var day = intdate.toString().substring(6);
    var datestr = year + "-" + month + "-" + day;
    return datestr;
}

//时间戳转换
function timestampToDate(tid) {
    //return new Date(parseInt(tid.replace("/Date(","").replace(")/",""))).toLocaleString().replace(/\//g, "-");
    var now = new Date(parseInt(tid.replace("/Date(", "").replace(")/", "")))
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = now.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var hours = now.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    var minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return year + "-" + month + "-" + day + '-' + hours + ':' + minutes;
}

function addByTransDate(dateParameter, num) {
    var translateDate = "",
        dateString = "",
        monthString = "",
        dayString = "";
    translateDate = dateParameter.replace("-", "/").replace("-", "/");
    var newDate = new Date(translateDate);
    newDate = newDate.valueOf();
    newDate = newDate + num * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);
    //如果月份长度少于2，则前加 0 补位
    if ((newDate.getMonth() + 1).toString().length == 1) {
        monthString = 0 + "" + (newDate.getMonth() + 1).toString();
    } else {
        monthString = (newDate.getMonth() + 1).toString();
    }
    //如果天数长度少于2，则前加 0 补位
    if (newDate.getDate().toString().length == 1) {
        dayString = 0 + "" + newDate.getDate().toString();
    } else {
        dayString = newDate.getDate().toString();
    }
    dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
    return dateString;
}

function reduceByTransDate(dateParameter, num) {
    var translateDate = "",
        dateString = "",
        monthString = "",
        dayString = "";
    translateDate = dateParameter.replace("-", "/").replace("-", "/");
    var newDate = new Date(translateDate);
    newDate = newDate.valueOf();
    newDate = newDate - num * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);
    //如果月份长度少于2，则前加 0 补位
    if ((newDate.getMonth() + 1).toString().length == 1) {
        monthString = 0 + "" + (newDate.getMonth() + 1).toString();
    } else {
        monthString = (newDate.getMonth() + 1).toString();
    }
    //如果天数长度少于2，则前加 0 补位
    if (newDate.getDate().toString().length == 1) {
        dayString = 0 + "" + newDate.getDate().toString();
    } else {
        dayString = newDate.getDate().toString();
    }
    dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
    return dateString;
}

//得到日期  主方法
function getDate_full(pdVal) {
    var trans_day = "";
    var cur_date = new Date();
    var cur_year = new Date().getFullYear();
    var cur_month = cur_date.getMonth() + 1;
    var real_date = cur_date.getDate();
    cur_month = cur_month > 9 ? cur_month : ("0" + cur_month);
    real_date = real_date > 9 ? real_date : ("0" + real_date);
    eT = cur_year + "-" + cur_month + "-" + real_date;
    if (pdVal == 1) {
        trans_day = addByTransDate(eT, 1);
    } else if (pdVal == -1) {
        trans_day = reduceByTransDate(eT, 1);
    } else {
        trans_day = eT;
    }
    //处理
    return trans_day;
}

//本地数据
function LocaData(name, value) {
    if (typeof value != 'undefined') {
        localStorage.setItem(name, value);
    } else {
        return localStorage.getItem(name);
    }
}

//清除本地数据
function ClearLocaData(name) {
    localStorage.removeItem(name);
}

/*  关闭loading  */
function closeloading() {
    $.unblockUI();
    return false;
}

/*  获取当前body高度  */
function getnowheight(gheight) {
    var _ups = new UPContent();
    _ups.Set('h', gheight);
    Up_Callback('', 'viewheight', _ups, '', 'LOC');
}

//屏判定设置
function setDPR(obj, objstx) {
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStorePixelRatio = objstx.webkitBackingStorePixelRatio ||
        objstx.mozBackingStorePixelRatio ||
        objstx.msBackingStorePixelRatio ||
        objstx.oBackingStorePixelRatio ||
        objstx.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStorePixelRatio;
    if (devicePixelRatio !== backingStorePixelRatio) {

        var oldWidth = obj.width;
        var oldHeight = obj.height;

        obj.width = oldWidth * ratio;
        obj.height = oldHeight * ratio;

        obj.style.width = oldWidth + 'px';
        obj.style.height = oldHeight + 'px';

        objstx.scale(ratio, ratio);
    }
}

function matchUrl(url) {
    var _url = url;
    if (!checkNull(_url)) {
        return (/^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/).test(_url);
    }
    return false;
}

function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
    str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
    str = str.replace(/\s/g, ''); //去掉&nbsp;[ \f\n\r\t\v]
    return str;
}

//判断为空
function checkNull(obj) {
    return (obj == undefined || obj == null || obj == '') ? true : false;
}

function isNullObj(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

//转换数字
function chartParseFloat(num) {
    return parseFloat((num == null || num == undefined || num == '') ? 0 : num);
}

/*
 * 获取url信息
 */
var request = {
    QueryString: function (val) {
        var url = window.location.search;
        var re = new RegExp("" + val + "=([^&?]*)", "ig");
        return decodeURI((url.match(re)) ? (url.match(re)[0].substr(val.length + 1)) : null);
    }
};

//格式化数据空
function setNullText(text) {
    return checkNull(text) ? '--' : text;
}