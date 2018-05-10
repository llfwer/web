/************************************************************************************************************************/
/*** 通讯交互脚本 ***********************************************************************************************************/
/***********************************************************************************************************************/

//判断是否为IOS系统，true是IOS，false非ios
function Check_IOS() {
    var xt_type = typeof(navigator.platform) == "undefined" ? "" : navigator.platform.toLowerCase();
    if (xt_type == "ipod" || xt_type == "ipod touch" || xt_type == "iphone" || xt_type == "ipad" || xt_type == "iphone simulator" || xt_type == "ipad simulator") {
        return "IOS";
    }
    else{
	    if((/Android/gi).test(navigator.userAgent)){
	    	return "Android";
	    }
	    return 'Win';
    }
}

/*
 * 固定参数
 */
var ReqPack = [{}];
var mb_system = Check_IOS();



/*
 * IOS函数桥接
 */
var IOS_Bridge = {

    callbacksCount: 1,
    callbacks: {},

    resultForCallback: function resultForCallback(callbackId, resultArray) {
        try {
            var callback = IOS_Bridge.callbacks[callbackId];
            if (!callback) {
                return;
            }
            callback.apply(null, resultArray);
        } catch (e) {
            alert(e);
        }
    },

    /*
     * functionName: 调用函数名称
     * args:json 格式参数
     * callback 回调函数名称
     * mob_funcname 类似UP
     */
    call: function call(args, funcID, frameID, callback, mob_funcname) {

        var hasCallback = callback && typeof callback == "function";
        var callbackId = hasCallback ? IOS_Bridge.callbacksCount++ : 0;

        if (hasCallback) {
            IOS_Bridge.callbacks[callbackId] = callback;
        }
        var iframe = document.createElement("IFRAME");

        iframe.setAttribute("src", "js-frame:" + callbackId + ";;" + frameID + ";;" + funcID + ";;" + args + ";;" + callback + ";;" + mob_funcname);
        //encodeURIComponent(JSON.stringify(args)));
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;

    }
};


/*
 * 移动平台调用Up_Callback
 * _callback_name： 回调函数名(js函数名)
 * _funid： 功能号
 * _parm： 请求参数对象 设置好的UPContent对象
 * _mob_formid： 移动平台用框架ID （非移动平台送''）送什么返回什么
 * _mob_ard_funcname：Android 平台用，后台功能模块名称 如'FuncID:'
 */
function Up_Callback(_callback_name, _funid, _parm, _mob_formid, _mob_funcname) {
    if (mb_system == "IOS") {
        IOS_Bridge.call(_parm == undefined ? '' : _parm.Value(), _funid, _mob_formid, _callback_name, _mob_funcname);
    } else {
        window.up_java.Android_SendData(_parm == undefined ? '' : _parm.Length(), _parm == undefined ? '' : _parm.Value(), _funid, _mob_formid, _callback_name, _mob_funcname);
    }
}



/*
 * 获取 function 名称
 * 不处理 var xx = function(){}; 此种方式
 */
function Fun_Name(funname) {
    var tmp = funname.toString();
    var re = /function\s*(\w*)/i;
    var matches = re.exec(tmp);
    //alert("name:" +matches[1]);
    return matches[1];
}


/*
 * 页面跳转
 */
function Ref_URL(_url) {
    location.href = _url;
}



/*
 * 定义 UPContent
 * 参数JSON格式定义
 */
var UPContent = function() {
    this.ret = "";
    this.retcnt = [];
    this.retlength = 0;
};

UPContent.prototype = {
    Set: function(k, v) {
        if ($.trim(k) == "") {
            alert("当前键对获取为NULL，请输入键值对");
            return;
        } else {

            if (typeof(v) == 'string') {
                this.retcnt.push("\"" + k + "\":" + "\"" + v + "\"");
            } else if (typeof(v) == 'number') {
                this.retcnt.push("\"" + k + "\":" + v);
            } else {
                var _cnts = [];
                $.each(v, function(n, m) {
                    if (typeof(m) == 'string') {
                        _cnts.push("\"" + n + "\":" + "\"" + m + "\"");
                    } else {
                        _cnts.push("\"" + n + "\":" + m);
                    }
                });
                this.retcnt.push("\"" + k + "\":{" + _cnts.join(',') + "}");
            }
            this.retlength++;
        }
    },

    Length: function() {
        return this.retlength;
    },

    Value: function() {
        return "[{" + this.retcnt.join(',') + "}]";
    }
};


/*
 * 字符串转字节函数
 */
function stringToBytes(str) {
    var ch, st, re = [];
    for (var i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        st = [];
        do {
            st.push(ch & 0xFF);
            ch = ch >> 8;
        } while (ch);
        re = re.concat(st.reverse());
    }
    return re;
}


/*
 * 获取url信息
 */
var request = {
    QueryString: function(val) {
        var url = window.location.search;
        var re = new RegExp("" + val + "=([^&?]*)", "ig");
        return decodeURI((url.match(re)) ? (url.match(re)[0].substr(val.length + 1)) : null);
    }
};



/*
 * 应答结果集解析
 */
function UP_RetResult(json) {

    try {
        var _data = {};
        var _uplist = $.parseJSON(json);

        _data["ErrorCode"] = _uplist.ecode;
        _data["ErrorInfo"] = _uplist.einfo;
        _data["POS"] = _uplist.POS;
        _data["NUM"] = _uplist.num;
        _data["data"] = _uplist.data;
        return _data;
    } catch (error) {
        return {
            "ErrorCode": 1,
            "ErrorInfo": "数据读取错误",
            "POS": "",
            "NUM": 0,
            data: [{}]
        };
    }
}




