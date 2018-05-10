var imgHeaderDict = {
    "1": "http://172.16.8.149:8080",
    "2": "http://api.uptougu.com"
};
var ipHeader = imgHeaderDict["2"];

//noinspection JSAnnotator
var defStr = `{"resultCode":"0000","resultMsg":null,"resultData":{"time":null,"deviceType":null,"platformType":null,"appId":null,"appVersion":null,"maxId":null,"channelNo":null,"manufacturer":null,"systemNo":null,"deviceId":null,"id":2617,"userId":6880089,"title":"superman的独家观点","content":"<p>2月17日（周五）大盘冲高回落，收放量阴线，中小创同步震荡，创业板收跌0.78%。盘面上，板块和个股涨少跌多，量子通信、西藏板块和船舶制造等板块涨幅居前，黄金水道、水利和煤炭等板块跌幅居前。全天两市成交4993.4亿元，比上一个交易日的4514.6亿元增加了478.8亿元，量能放大了10.6%。</p><p>消息面上，今天起，将沪深300、上证50、中证500股指期货平今仓交易手续费调整为成交金额的万分之九点二。沪深300和上证50股指期货各合约非套期保值持仓的交易保证金标准，由目前合约价值的40%调整为20%；中证500股指期货各合约非套期保值持仓的交易保证金标准，由目前合约价值的40%调整为30%。从公布的各项指标看，本次期指调整仅是对股指期货限制措施的小幅调整，风险可控，不会对股指期货和股票市场正常运行产生影响。</p><p><br/></p>","summary":"观点简介","commentCount":0,"readCount":4,"favorites":0,"type":2,"cost":288.00,"saleCount":0,"createTime":"2017-02-06 17:00:50","updateTime":"2017-02-09 15:29:33","publishTime":"2017-02-09 15:29:33","status":0,"isRecommend":null,"recommendTime":null,"otherTag":null,"onOff":null,"rewardCount":0,"recommendPicture":null,"recommendThumbnailPicture":null,"isRecommendForWebRead":null,"isRecommendForWebReadPicture":null,"isRecommendForWebReadThumbnailPicture":null,"isRecommendForWebReadTime":null,"isRecommendForBanner":null,"isRecommendForBannerTime":null,"isRecommendForAppBanner":null,"isRecommendForAppBannerTime":null,"userName":"陈杰","avatar":"http://172.16.8.149:8080/upload/cetificate/2016-10-08/1475907795814_113-thumbnail.jpg","tagList":null,"noteTagList":[],"subscribed":1,"adviserType":1,"tags":null,"relation":null,"userIntro":null,"isFavorite":0}}`;

$(function () {
    new FastClick(document.body);
    retinfo('', '', '2', defStr);
});

function retinfo(formId, funcId, flag, strParam) {
    if (flag) {
        ipHeader = imgHeaderDict[flag];
    }
    $('#content').empty();
    var _res = JSON.parse(strParam);
    if (_res.resultCode == "0000") {
        //1免费2收费
        var payType = _res.resultData.type;
        $('#title').html(_res.resultData.title);
        $('#source').text(setNullText(_res.resultData.userName));
        $('#time').text(checkNull(_res.resultData.createTime) ? '--' : formatPTime(_res.resultData.createTime));
        if (!checkNull(_res.resultData.avatar)) {
            $('#pic').css({"background-image": "url('" + _res.resultData.avatar + "')"});
            $('#pic,#source').click(function (e) {
                linkToAdviser();
            });
        } else {
            $('#pic').removeClass("pic");
        }
        if (!checkNull(_res.resultData.summary)) {
            $('#zytext').text(_res.resultData.summary);
            $('.intro').show();
        }
        if (_res.resultData.rewardCount == '0') {
            $('#rewardCount').text(_res.resultData.rewardCount);
        } else {
            $('#rewardCount').text(checkNull(_res.resultData.rewardCount) ? '--' : (isNaN(_res.resultData.rewardCount) ? '--' : _res.resultData.rewardCount));
        }
        if (payType == 1) {
            $('.dsdiv').show();
            $('#dsbtn').click(function (e) {
                dsSubmit(this.id);
            });
            $('#content').html(replaceFont(_res.resultData.content));
            $('#content img').click(function (e) {
                setImg(e);
            });
        } else if (payType == 2) {
            //1已订阅，0未订阅
            var subs = _res.resultData.subscribed;
            if (subs == 1) {
                $('.dsdiv').show();
                $('#dsbtn').click(function (e) {
                    dsSubmit(this.id);
                });
                $('#content').html(replaceFont(_res.resultData.content));
                $('#content img').click(function (e) {
                    setImg(e);
                });
            } else if (subs == 0) {
                var _cost = _res.resultData.cost;
                var _scount = _res.resultData.saleCount;
                var _id = _res.resultData.id;
                var _title = _res.resultData.title;
                $('#content').html(setSubsHtml(_cost, _scount));
                $('#content .subsbtn').click(function (e) {
                    subsSubmit(_id, _cost, _title);
                });
            }
            if (_res.resultData.adviserType == "2") {
                $('#mydiv').html(setLegalStatement(subs, _res.resultData.userName));
            }
        }

    } else {
    }
}

//格式化时间
function formatPTime(ft) {
    var dateList = ft.split(":");
    var _h = dateList[0];
    var _m = dateList[1];
    return _h + ':' + _m;
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

function setSubsHtml(cost, scount) {
    var _str = '';
    _str += '<div class="subsbtn">¥' + cost + '（已有' + scount + '人订阅）</div><div class="subslabel">点击支付' + cost + '元查看正文内容</div>';
    return _str;
}

function subsSubmit(id, cost, title) {
    var _ups = new UPContent();
    _ups.Set('id', id);
    _ups.Set('cost', cost);
    _ups.Set('title', title);
    Up_Callback('', 'subscribe', _ups, '', 'LOC');
}

function dsSubmit(id) {
    $('#' + id).css({"background-image": "url(images/sds.png)"});
    setTimeout(function () {
        $('#' + id).css({"background-image": "url(images/ds.png)"});
        var _ups = new UPContent();
        Up_Callback('', 'ds', _ups, '', 'LOC');
    }, 300);
}

function setLegalStatement(subs, uname) {
    var _str = '';
    var _name = checkNull(uname) ? "--" : uname;
    _str += '<div class="footer ' + 'ftype' + subs + '">';
    _str += '<div class="txt">';
    _str += '<div>本观点由&nbsp;深圳市优品投资顾问有限公司</div>';
    _str += '<div>(证券投资咨询机构：ZX0111)&nbsp;投资研究中心提供</div>';
    _str += '<div>【' + _name + '】&nbsp;提供部分素材</div>';
    _str += '</div></div>';
    return _str;
}
function linkToAdviser() {
    var _ups = new UPContent();
    Up_Callback('', 'linkToAdviser', _ups, '', 'LOC');
}


function show_TG(data) {
    if (data.resultCode == '0000') {

        $('#tgdiv').empty();

        var smartdata = data.resultData.smartExpressList;
        var smartLen = smartdata.length;
        var temp_html = '';
        //TA 的锦囊
        if (smartLen > 0) {
            var tgtop_html = '<div class="tg_title"><span>TA的锦囊</span></div>';
            for (var i = 0; i < smartLen; i++) {
                var cost = smartdata[i].cost;
                //更新价格
                if (smartdata[i].showRecommendStatus == "3" || smartdata[i].discountStatus == "1") {
                    cost = smartdata[i].favourablePrice;
                }

                temp_html += '<a href="openurl://fun=JN&id=' + smartdata[i].id + '">';
                temp_html += '<div class="cntbox">';
                temp_html += '<div class="cnt_title">' + smartdata[i].name + '</div>';
                temp_html += ' <div class="cnt_time">已发布<span>' + (smartdata[i].updateCount == null ? 0 : smartdata[i].updateCount) + '</span>篇锦囊文章 </div>';
                temp_html += '<div class="cnt_desc">' + smartdata[i].feature + '</div>';
                temp_html += '<div class="enddate">服务期至:' + moment(smartdata[i].endTime).format("YYYY/MM/DD") + '</div>';
                temp_html += '<div class="price"><span>价格:' + cost + '</span>&nbsp;&nbsp;<span>订阅:' + smartdata[i].subscribeCount + '</span></div>';
                temp_html += ' <div class="clear"></div></div></a>';
            }

            tgtop_html += temp_html;
            $('#tgdiv').append(tgtop_html);
        }

        //TA的组合
        var protdata = data.resultData.portfolioList;
        var protLen = protdata.length;
        if (protLen > 0) {
            var tgtop_html = '<div class="tg_title"><span>TA的组合</span></div><ul>';
            temp_html = '';
            for (var i = 0; i < protLen; i++) {
                temp_html += '<li class="comlist"><a href="openurl://fun=ZH&id=' + protdata[i].id + '&ex1=0">';
                temp_html += '<div class="income"><div class="num">' + protdata[i].target + '%</div><div class="txt">目标收益</div></div>';
                temp_html += '<div class="info"><div class="title">' + protdata[i].portfolioName + '</div>';
                temp_html += '<div class="desc borderL borderR">';
                if (protdata[i].startOrNot == 0) {
                    temp_html += '<div class="mark">' + protdata[i].portfolioTarget + '</div>';
                    temp_html += '<div class="sm">适用人群</div>';
                } else {
                    temp_html += '<div class="dayincome"><div class="mark" style="color: ' + (protdata[i].totalProfitRate >= 0 ? "#ea1c1c" : "#27c032") + '">' + ((+protdata[i].totalProfitRate) * 100).toFixed(2) + '%</div><div class="sm">总收益</div></div>';
                    temp_html += '<div class="success borderL"><div class="mark" style="color: #ea1c1c">' + (protdata[i].successRate == null ? '0' : ((+protdata[i].successRate) * 100).toFixed(2)) + '%</div><div class="sm">成功率</div></div>';
                }
                temp_html += '</div></div>';
                temp_html += '<div class="infodata">';
                temp_html += '<div class="dateT">' + moment(protdata[i].endTime).format("YYYY/MM/DD") + '到期</div>';
                temp_html += '<div class="desc"><div class="mark">' + protdata[i].duration + '天</div><div class="sm">运行周期</div></div></div>';
                temp_html += '</a></li>';
            }
            temp_html += '</ul><div class="clear"></div>';
            tgtop_html += temp_html;
            $('#tgdiv').append(tgtop_html);
        }

        var groupdata = data.resultData.niuGroupList;
        var groupLen = groupdata.length;
        if (groupLen > 0) {
            var tgtop_html = '<div class="tg_title"><span>TA的交易圈</span></div>';
            temp_html = '';
            for (var i = 0; i < groupLen; i++) {
                temp_html += '<a href="openurl://fun=QZ&id=' + groupdata[i].id + '">';
                temp_html += '<div class="cntbox">';
                temp_html += '<div class="cnt_title">' + groupdata[i].name + '</div>';
                temp_html += '<div class="cnt_time">还剩<span>' + (groupdata[i].maxUserCount - groupdata[i].userCount) + '</span>个名额</div>';
                temp_html += '<div class="cnt_desc">' + groupdata[i].intro + '</div>';
                temp_html += '</div>';
            }
            tgtop_html += temp_html;
            $('#tgdiv').append(tgtop_html);
        }
    }
}