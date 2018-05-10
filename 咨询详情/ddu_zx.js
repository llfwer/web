var imgHeaderDict = {
    "1": "http://172.16.8.149:8080",
    "2": "http://api.uptougu.com"
};
var ipHeader = imgHeaderDict["2"];

var defStr = `{"resultCode":"0000","resultMsg":null,"resultData":{"time":null,"deviceType":null,"platformType":null,"appId":null,"appVersion":null,"maxId":null,"channelNo":null,"manufacturer":null,"systemNo":null,"deviceId":null,"id":4,"groupId":185,"userId":10969265,"title":"震荡当中必须做的一件事","content":"<p>&nbsp; 昨天收评提示：\\"午后指数震荡回落，五日和十日均线走平，显示短线市场震荡回吐的压力加重。KDJ指数的高位死叉仍在延续，进一步向下扩散，表明短线调整尚有空间。”</p><p>&nbsp; 今天早盘股指低开后冲高回落，短线承压明显。随着两会临近，以及技术上的获利回吐压力加重，预计短线市场仍将震荡为主，上证指数重要支撑点在3200点附近区域，较强支撑在60天均线3170点区域。深圳两大指数同样面临短线压力。总体来看，下跌还是技术性调整性质，行情总体还将保持着退一进二的格局</p><p>&nbsp;&nbsp;<img src=\\"/upload/attachment/2017-02-28/1488267031093003031.jpg\\" title=\\"1488267031093003031.jpg\\" alt=\\"1.jpg\\"/></p><p>&nbsp; 早盘顺风再涨停，带动物流快递行业上涨，位居涨幅首位，建筑、次新股和工业4.0表现相对强势，钢铁、通信、医药等跌幅靠前，热点轮动较快，持续时间短，不利于短期赚钱效应的扩散，前期老热点如水泥等快速退潮，新热点还在培育之中。在换档震荡之际，投资者必须做好一件事，那就是调仓换筹工作，减持部分前期涨幅较大的品种，待回落后低吸，中小创市场当中，一部分品种已经开始显露出其投资的价值，更具体的投资品种，请大家收听今天收盘后本人的语音解盘提示分析。</p><p>&nbsp; 风险提示</p><p>&nbsp; 本人郑重强调：个人不会从事任何形式的代客理财、分成等非法证券业务，不会有任何形式的个人收款帐号，不会在任何公开场合，推荐任何具体投资标的，文中所提及个股，仅是案例分析并非个股推荐，据此买卖，盈亏自负!本博主请各位投资者不信谣不传谣，理性投资，谨防上当</p>","summary":"今天早盘股指低开后冲高回落，短线承压明显。","readCount":1,"type":1,"cost":0,"saleCount":0,"status":0,"createTime":"2017-02-28 15:31:22","updateTime":null,"publishTime":"2017-03-10 15:31:22","otherTag":"手牌","rewardCount":null,"userName":null,"avatar":null,"adviserType":null}}
`;

$(function () {
    new FastClick(document.body);
    var json = JSON.parse(defStr);
    retinfo('', '', '1', json);
});

function retinfo(formId, funcId, flag, strParam) {
    if (flag) {
        ipHeader = imgHeaderDict[flag];
    }

    $('#content').empty();
    var _res = strParam;
    if (_res.resultCode == "0000") {
        //1免费2收费
        $('#title').html(_res.resultData.title);
        $('#time').text(checkNull(_res.resultData.createTime) ? '--' : formatPTime(_res.resultData.publishTime));
        if (!checkNull(_res.resultData.summary)) {
            $('#zytext').text(_res.resultData.summary);
            $('.intro').show();
        }
        $('#content').html(replaceFont(_res.resultData.content));
        $('#content img').click(function (e) {
            setImg(e);
        });
    }
}

//格式化时间
function formatPTime(ft) {
    if (isToday(ft)) {
        return '今日' + ft.substring(ft.indexOf(' '), ft.lastIndexOf(':')) + '发布';
    } else {
        var dateList = ft.split(":");
        var _h = dateList[0];
        var _m = dateList[1];
        return _h + ':' + _m + '发布';
    }
}

//判断是否是今天
function isToday(str) {
    var target = new Date(str);
    var today = new Date();
    return target.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0);
}

function replaceFont(r_str) {
    var _str = r_str;
    _str = _str.replace(/&quot;/g, "\"");
    _str = _str.replace(/<br\/>/gi, '');
    _str = _str.replace(/\/g, "&#12;");
    _str = _str.replace(/<IMG/g, "<img");
    _str = _str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
        if (checkNull(capture.match(/http([^'"]*)/ig))) {
            return '<img width="100%" src="' + ipHeader + capture + '">';
        } else {
            if (checkNull(capture.match(/icon_mp3.gif/ig))) {
                if (capture.indexOf("/ueditor/dialogs/emotion/images/test/") == -1) {
                    return '<img width="100%" src="' + capture + '">';
                } else {
                    return '<img src="' + capture + '">';
                }
            } else {
                return '';
            }
        }
    });
    _str = _str.replace(/<audio [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
        if (checkNull(capture.match(/http([^'"]*)/ig))) {
            return '<audio style="width:100%;margin-top:8px;" controls="controls" src="' + ipHeader + capture + '">';
        } else {
            return '<audio src="' + capture + '">';
        }
    });
    return _str;
}

//放大照片
function setImg(e) {
    var imgList = [];
    var curIndex = 0;
    $.each($('#content img'), function (index, obj) {
        if (this === e.target) {
            curIndex = index;
        }
        imgList.push(obj.src);
    });
    var _ups = new UPContent();
    _ups.Set('curIndex', curIndex);
    _ups.Set('imgUrlList', imgList.toString());
    Up_Callback('', 'setimg', _ups, '', 'LOC');
}