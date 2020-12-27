// popup或者bg向content主动发送消息
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}

function init() {
    console.log('初始化')

    sendMessageToContentScript({cmd: 'init', value: 'init'}, function (response) {
        console.log(response)
    });
}

init();