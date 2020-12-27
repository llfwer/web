// 通过postMessage调用content-script
function invokeContentScript(code) {
    window.postMessage({cmd: 'invoke', code: code}, '*');
}

// 发送普通消息到content-script
function sendMessageToContentScriptByPostMessage(data) {
    window.postMessage({cmd: 'message', data: data}, '*');
}

// postMessage发送消息给content
function sendMessageToContent1() {
    window.postMessage({"test": '你好！'}, '*');
}

// 通过DOM事件发送消息给content
function sendMessageToContent2() {
    var customEvent = document.createEvent('Event');
    customEvent.initEvent('myCustomEvent', true, true);

    // 通过事件发送消息给content-script
    function sendMessageToContentScriptByEvent(data) {
        data = data || '你好，我是injected-script!';
        var hiddenDiv = document.getElementById('myCustomEventDiv');
        hiddenDiv.innerText = data
        hiddenDiv.dispatchEvent(customEvent);
    }

    window.sendMessageToContentScriptByEvent = sendMessageToContentScriptByEvent;
}

function init() {
    console.log('inject1')
    //sendMessageToContent1();
}

init()