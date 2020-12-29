// popup或者bg向content主动发送消息
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}

function init() {
    sendMessageToContentScript({ cmd: 'test', value: '你好，我是popup！' }, function (response) {
        console.log('来自content的回复：' + response);
    });
}

init();