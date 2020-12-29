function init() {
    console.log('inject1')

    let node = (document.querySelector("#player >script:nth-child(2)") || document.querySelector("#player >script:nth-child(1)"))
    if (!node) {
        console.log('找不到节点')
    } else {
        let html = node.innerHTML
        html = `	var playerObjList = {};` + html
        let v = html.match("flashvars_[0-9]{1,}")[0]
        if (!v) {
            console.log('找不到变量')
        } else {
            eval(html)
            let obj = eval(v)
            let info = {}

            info['video_title'] = obj.video_title
            info['link_url'] = obj.link_url
            info['cover'] = obj.image_url
            info['video'] = []

            let mediaList = obj['mediaDefinitions'];
            for (let i = 0; i < mediaList.length; i++) {
                let item = mediaList[i];

                if (item['format'] === 'mp4') {
                    info['video'].push({
                        quality: item['quality'],
                        url: item['videoUrl']
                    })
                }
            }

            let element = document.getElementById('myCustomEventDiv');
            if (element) {
                element.innerText = JSON.stringify(info)
            }
        }
    }
}

init()