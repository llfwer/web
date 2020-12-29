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

function init() {
    console.log('inject1')
    listen();
    sendMessage('invoke', 'init');
}

init()