// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

function init() {
    getCurrentTabId((tabId) => {
        // 动态执行JS代码
        // chrome.tabs.executeScript(tabId, { code: 'document.body.style.backgroundColor="red"' });
        // 动态执行JS文件
        chrome.tabs.executeScript(tabId, { file: 'inject.js' });
    });
}

init();