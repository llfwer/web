// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || 'inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/javascript/inject.javascript
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        //this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}

// 回复popup或者bg的消息
function callbackMessage() {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
        if (request.cmd === 'init') {
            console.log(request.value);
            console.log(video_data);
            sendResponse(video_data);
        }
    });
}

var video_data;

// 监听注入js发送来的消息
function listenInjectMessage() {
    window.addEventListener("message", function (e) {
        video_data = e.data.data;
        console.log(video_data);
    }, false);
}

function init() {
    console.log('content')

    listenInjectMessage()

    document.addEventListener('DOMContentLoaded', function () {
        injectCustomJs();
    });

    callbackMessage();
}


init();