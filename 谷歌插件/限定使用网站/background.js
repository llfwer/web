// 只有百度才会点亮插件
function showTabOnlyBaidu() {
    chrome.runtime.onInstalled.addListener(function () {
        chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
            chrome.declarativeContent.onPageChanged.addRules([
                {
                    conditions: [
                        // 只有打开百度才显示pageAction
                        new chrome.declarativeContent.PageStateMatcher({ pageUrl: { urlContains: 'baidu.com' } })
                    ],
                    actions: [new chrome.declarativeContent.ShowPageAction()]
                }
            ]);
        });
    });
}

function init() {
    console.log("Hello, here!")
    showTabOnlyBaidu();
}

init();