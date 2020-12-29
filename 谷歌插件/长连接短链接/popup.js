// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

// 打开长连接
function connectToContent() {
    getCurrentTabId((tabId) => {
        var port = chrome.tabs.connect(tabId, { name: 'test-connect' });
        port.postMessage({ question: '你是谁啊？' });
        port.onMessage.addListener(function (msg) {
            alert('收到消息：' + msg.answer);
            if (msg.answer && msg.answer.startsWith('我是')) {
                port.postMessage({ question: '哦，原来是你啊！' });
            }
        });
    });
}

function init() {
    connectToContent()
}

init();