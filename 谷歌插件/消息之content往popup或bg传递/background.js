// 监听来自content的消息
function listenContentMessage() {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log('收到来自content-script的消息：');
        console.log(request, sender, sendResponse);
        sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
    });
}

function init() {
    console.log("Hello, here!")
    listenContentMessage();
}

init();