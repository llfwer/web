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

// 监听inject发送来的消息
function listen() {
    window.addEventListener("message", function (e) {
        let data = e.data;
        if (data.cmd === 'invoke' && data.data === 'init') {
            sendMessage('message', 'hello');
            console.log(data);
        }
    }, false);
}

// 发送消息到inject
function sendMessage(cmd, data) {
    window.postMessage({ cmd: cmd, data: data }, '*');
}

function init() {
    console.log('content')
    document.addEventListener('DOMContentLoaded', function () {
        listen();
        injectCustomJs();
    });
}


init();