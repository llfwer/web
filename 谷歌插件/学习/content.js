// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || 'inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/javascript/inject.javascript
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}

// 回复popup或者bg的消息
function callbackMessage() {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
        if (request.cmd == 'test') {
            console.log(request.value);
        }
        sendResponse('我收到了你的消息！');
    });
}

// 发消息给后台
function sendMessageToBackground() {
    chrome.runtime.sendMessage({greeting: '你好，我是content-script呀，我主动发消息给后台！'}, function (response) {
        console.log('收到来自后台的回复：' + response);
    });
}

// 监听注入js发送来的消息
function listenInjectMessage1() {
    window.addEventListener("message", function (e) {
        console.log(e.data);
    }, false);
}

// DOM方式监听注入js发送来的消息
function listenInjectMessage2() {
    var hiddenDiv = document.getElementById('myCustomEventDiv');
    if (!hiddenDiv) {
        hiddenDiv = document.createElement('div');
        hiddenDiv.style.display = 'none';
        document.body.appendChild(hiddenDiv);
    }
    hiddenDiv.addEventListener('myCustomEvent', function () {
        var eventData = document.getElementById('myCustomEventDiv').innerText;
        console.log('收到自定义事件消息：' + eventData);
    });
}


function init() {
    console.log('content')
    //listenInjectMessage1();
    document.addEventListener('DOMContentLoaded', function () {
        injectCustomJs();
    });
    //callbackMessage();
    //sendMessageToBackground();
}


init();