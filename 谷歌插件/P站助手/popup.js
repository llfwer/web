// 向content主动发送消息
function sendMessage(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}

function init() {
    console.log('初始化')

    sendMessage({cmd: 'init', value: 'init'}, function (response) {
        console.log(response)
        if (response !== 'init') {
            let obj = JSON.parse(response);

            let html = '<li><img class="video" src ="' + obj.cover + '" /><div><h4>' + obj.video_title + '<h4>'

            for (let i = 0; i < obj.video.length; i++) {
                html += '<a target="_blank" href="' + obj.video[i].url + '"><span class="btn"><img class="icon" src="download.svg"/>Download ' + obj.video[i].quality + '</span></a>'
            }
            html += '</div></li>'
            let container = document.getElementById('video_info');
            container.innerHTML = html;
        } else {
            alert('初始化失败')
        }
    });
}

init();