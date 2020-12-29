function init() {
    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    chrome.storage.sync.get({isDark: false, color: 'red'}, function (item) {
        console.log(item.isDark, item.color);
    });
}

init();