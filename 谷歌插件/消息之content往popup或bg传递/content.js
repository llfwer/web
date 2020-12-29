// 发消息给popup或bg
function sendMessageToPopupOrBg() {
    chrome.runtime.sendMessage({ greeting: '你好，我是content-script呀，我主动发消息给后台！' }, function (response) {
        console.log('收到回复：' + response);
    });
}

function init() {
    console.log('content')
    document.addEventListener('DOMContentLoaded', function () {
        sendMessageToPopupOrBg();
    });
}


init();