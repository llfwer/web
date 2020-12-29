// 供popup调用
function test() {
    console.log('我是background！');
}

// 访问popup资源
function callPopupAssets() {
    var views = chrome.extension.getViews({ type: 'popup' });
    if (views.length > 0) {
        console.log(views[0].location.href);
    }
}

function init() {
    console.log("Hello, here!")
    callPopupAssets();
}

init();