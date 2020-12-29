// 图标添加文字
function setIconText() {
    let action = chrome.browserAction;
    action.setBadgeText({ text: 'new' });
    action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
}

function init() {
    console.log("Hello, here!")
    setIconText();
}

init();