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
            let hiddenDiv = document.getElementById('myCustomEventDiv');
            if (hiddenDiv) {
                sendResponse(hiddenDiv.innerText);
            } else {
                sendResponse('init');
            }
        }
    });
}

// 监听注入js发送来的消息
function listenInjectMessage() {
    window.addEventListener("message", function (e) {
        console.log(e.data.data);
    }, false);
}

function createEmptyDiv() {
    let hiddenDiv = document.getElementById('myCustomEventDiv');
    if (!hiddenDiv) {
        hiddenDiv = document.createElement('div');
        hiddenDiv.id = 'myCustomEventDiv';
        hiddenDiv.style.display = 'none';
        document.body.appendChild(hiddenDiv);
    }
}

function init() {
    console.log('content')

    //listenInjectMessage()

    document.addEventListener('DOMContentLoaded', function () {
        createEmptyDiv();
        injectCustomJs();
    });

    callbackMessage();
}


init();