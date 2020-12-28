// popup或者bg向content主动发送消息
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}

function init() {
    console.log('初始化')

    sendMessageToContentScript({cmd: 'init', value: 'init'}, function (response) {
        console.log(response)
        if (response !== 'init'){
            //let obj = eval(response);
            let obj = JSON.parse(response);

            let html = '<li><img class="video" src ="' + obj.cover + '" /><div><h4>' + obj.video_title + '<h4>'

            for (var i = 0; i < obj.quality.length; i++) {
                html += '<a target="_blank" href="' + obj.quality[i].url + '"><span class="btn"><img class="icon" src="../download.svg"/>Download ' + obj.quality[i].quality + '</span></a>'
            }
            html += '</div></li>'
            let container = document.getElementById('video_info');
            container.innerHTML = html;
        }
    });
}

init();