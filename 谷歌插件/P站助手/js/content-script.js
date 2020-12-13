document.addEventListener('DOMContentLoaded', function () {
    console.log('我被执行了！');
});
(function () {
    console.log('我被执行了！');
    eval_scripts = (document.querySelector("#player >script:nth-child(2)") || document.querySelector("#player >script:nth-child(1)"))
    if (eval_scripts) {
        raw = eval_scripts.innerHTML
        raw = `	var playerObjList = {};` + raw
        t = raw.match("flashvars_[0-9]{1,}")[0]
        eval(raw)
        if (t) {
            play_info = eval(t)
            var video_info = {}
            video_info['video_title'] = play_info.video_title
            video_info['link_url'] = play_info.link_url
            video_info['cover'] = play_info.image_url
            video_info['quality'] = []

            Object.keys(play_info).forEach((item) => {
                console.log(play_info)
                tmp = []
                if (item.startsWith('quality_')) {

                    video_info['quality'].push({
                        quality: item.split("_")[1],
                        url: play_info[item]
                    })
                }
            })
            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                if (request.cmd == 'init')
                    sendResponse(video_info);
            });
        }
    }

})()