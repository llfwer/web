// 通过postMessage调用content-script
function invokeContentScript(code) {
    window.postMessage({cmd: 'invoke', code: code}, '*');
}

// 发送普通消息到content-script
function sendMessageToContentScriptByPostMessage(data) {
    window.postMessage({cmd: 'message', data: data}, '*');
}

// postMessage发送消息给content
function sendMessageToContent(data) {
    window.postMessage({cmd: 'message', data: data}, '*');
}

// 获取js变量
function getJsParams() {
    let content = (document.querySelector("#player >script:nth-child(2)") || document.querySelector("#player >script:nth-child(1)"))
    if (content) {
        let html = content.innerHTML
        html = `	var playerObjList = {};` + html
        let flashvars = html.match("flashvars_[0-9]{1,}")[0]
        eval(html)
        if (flashvars) {
            let play_info = eval(flashvars)
            let video_info = {}

            video_info['video_title'] = play_info.video_title
            video_info['link_url'] = play_info.link_url
            video_info['cover'] = play_info.image_url
            video_info['quality'] = []

            let mediaList = play_info['mediaDefinitions'];
            for (let i = 0; i < mediaList.length; i++) {
                let item = mediaList[i];

                if (item['format'] === 'mp4') {
                    video_info['quality'].push({
                        quality: item['quality'],
                        url: item['videoUrl']
                    })
                }
            }

            sendMessageToContent(video_info)
        }
    }
}

function init() {
    console.log('inject1')
    //sendMessageToContent1();

    getJsParams();
}

init()