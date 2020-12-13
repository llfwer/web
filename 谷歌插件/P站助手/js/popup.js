(function () {
    sendMessageToContentScript({cmd: 'init', value: 'init'}, function (video_info) {
        console.log('我被执行了！');
        console.log(video_info)

        html = '<li><img class="video" src ="' + video_info.cover + '" /><div><h4>' + video_info.video_title + '<h4>'

        for (var i = 0; i < video_info.quality.length; i++) {
            html += '<a target="_blank" href="' + video_info.quality[i].url + '"><span class="btn"><img class="icon" src="../css/download.svg"/>Download ' + video_info.quality[i].quality + '</span></a>'
        }
        html += '</div></li>'
        $("#video_info").append(html)
    })
})()

function append_html(link, cover, video_url) {
    console.log('append_html->', link, cover, video_url)
    $("#video_info").append('<li><img class="video" src="' + cover + '"/><div><a target="_blank" href="' + video_url + '"><span class="btn"><img class="icon" src="../css/download.svg"/>Download</span></a><a target="_blank" href="' + "https://tkdownload.vip/?link=" + link + '"><span class="btn"><img class="icon" src="../css/download.svg"/>Download Without WaterMark</span></a></div></li>')
}

function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}