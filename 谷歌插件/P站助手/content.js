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

function createEmptyDiv() {
    let element = document.getElementById('myCustomEventDiv');
    if (!element) {
        element = document.createElement('div');
        element.id = 'myCustomEventDiv';
        element.style.display = 'none';
        document.body.appendChild(element);
    }
}

// 监听popup的消息
function listen() {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
        if (request.cmd === 'init') {
            console.log(request.value);
            let element = document.getElementById('myCustomEventDiv');
            if (element) {
                sendResponse(element.innerText);
            } else {
                sendResponse('init');
            }
        }
    });
}

function init() {
    console.log('content')

    document.addEventListener('DOMContentLoaded', function () {
        createEmptyDiv();
        injectCustomJs();
    });

    listen();
}


init();