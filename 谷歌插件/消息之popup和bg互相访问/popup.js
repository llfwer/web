// 调用bg的js方法
function callBackgroundMethod() {
    var bg = chrome.extension.getBackgroundPage();
    bg.test(); // 访问bg的函数
    console.log(bg.document.body.innerHTML); // 访问bg的DOM
}

function init() {
    callBackgroundMethod();
}

init();