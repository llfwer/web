function checkMedia() {
    // 是否显示图片
    var showImage;
    chrome.storage.sync.get({ showImage: true }, function (items) {
        showImage = items.showImage;
    });
    // web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
    chrome.webRequest.onBeforeRequest.addListener(details => {
        // cancel 表示取消本次请求
        if (!showImage && details.type == 'image') {
            return { cancel: true };
        }

        // 简单的音视频检测
        // 大部分网站视频的type并不是media，且视频做了防下载处理，所以这里仅仅是为了演示效果，无实际意义
        if (details.type == 'media') {
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'icon.png',
                title: '检测到音视频',
                message: '音视频地址：' + details.url,
            });
        }
    }, { urls: ["<all_urls>"] }, ["blocking"]);
}

function init() {
    console.log("Hello, here!")
    checkMedia();
}

init();