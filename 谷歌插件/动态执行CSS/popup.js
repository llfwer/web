// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

function init() {
    getCurrentTabId((tabId) => {
        // 动态执行CSS代码，TODO，这里有待验证
        //chrome.tabs.insertCSS(tabId, { code: 'xxx' });
        // 动态执行CSS文件
        chrome.tabs.insertCSS(tabId, { file: 'inject.css' });
    });
}

init();