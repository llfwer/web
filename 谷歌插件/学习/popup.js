// popup或者bg向content主动发送消息
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}

// 调用Background的js方法
function callBackgroundMethod() {
    var bg = chrome.extension.getBackgroundPage();
    bg.test(); // 访问bg的函数
    console.log(bg.document.body.innerHTML); // 访问bg的DOM
}

// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}
function init() {
    /*sendMessageToContentScript({cmd: 'test', value: '你好，我是popup！'}, function (response) {
        console.log('来自content的回复：' + response);
    });*/

    //callBackgroundMethod();
}

init();