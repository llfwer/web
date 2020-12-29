function init() {
    console.log("Hello, here!")
    // 保存数据
    chrome.storage.sync.set({isDark: true}, function () {
        console.log('保存成功！');
    });
}

init();