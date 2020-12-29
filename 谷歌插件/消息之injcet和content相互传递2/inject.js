// 监听content发送来的消息
function listen() {
    window.addEventListener("message", function (e) {
        let data = e.data;
        if (data.cmd === 'message') {
            console.log(data);
        }
    }, false);
}

// 发送消息到content
function sendMessage(cmd, data) {
    window.postMessage({ cmd: cmd, data: data }, '*');
}

// 通过DOM事件发送消息给content
function sendMessageByDom(data) {
    var hiddenDiv = document.getElementById('myCustomEventDiv');
    if (hiddenDiv) {
        data = data || '你好，我是injected-script!';
        hiddenDiv.innerText = data

        // 通过事件发送消息给content
        var customEvent = document.createEvent('Event');
        customEvent.initEvent('myCustomEvent', true, true);
        hiddenDiv.dispatchEvent(customEvent);
    }
}

function init() {
    console.log('inject1')
    //listen();
    sendMessageByDom('hello');
}

init()