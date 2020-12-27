// 图标添加文字
function setIconText() {
    let action = chrome.browserAction;
    action.setBadgeText({text: 'new'});
    action.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
}

// 只有P站才会点亮插件
function showTabOnlyPornhub() {
    chrome.runtime.onInstalled.addListener(function () {
        chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
            chrome.declarativeContent.onPageChanged.addRules([
                {
                    conditions: [
                        // 只有打开百度才显示pageAction
                        new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'pornhub'}})
                    ],
                    actions: [new chrome.declarativeContent.ShowPageAction()]
                }
            ]);
        });
    });
}


console.log("Hello, here!")

//setIconText();
showTabOnlyPornhub();