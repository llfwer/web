//数组转bitmap
function convert_bitmap(arr) {
    let vBitmap = [];
    for (let item of arr) {
        let index = item % 8;
        let count = parseInt(item / 8);
        vBitmap[count] = vBitmap[count] || 0;
        vBitmap[count] = (1 << (7 - index)) | vBitmap[count];
    }
    for (let i = 0; i < vBitmap.length; i++) {
        if (!vBitmap[i]) {
            vBitmap[i] = 0;
        }
    }
    return vBitmap;
}

function contains(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return true;
        }
    }
    return false;
}

//直接转换
function init1() {
    let input = document.getElementById('input');
    let btn = document.getElementById('btn');
    let label = document.getElementById('label1');

    btn.onclick = function (e) {
        label.value = '';
        if (input.value === '') {
            alert('请输入正确的数组')
        } else {
            let arr = eval(input.value);
            console.log(arr)
            if (arr == null) {
                alert('无效数组')
            } else {
                let value = '[';
                value += convert_bitmap(arr);
                value += ']';
                label.value = value;
                label.select();
                document.execCommand("Copy"); // 执行浏览器复制命令
            }
        }
    };
}

//自由选择
function init2() {
    let pros = '[{"1":"1股票代码"},{"2":"2股票名称"},{"3":"3当日价格"},{"4":"4当日涨幅"},{"5":"5当日换手率"},{"6":"6当日开盘涨幅"},{"7":"7智能亮点"},{"8":"8入选状态"},{"9":"9五星买卖点"},{"10":"10红黄白买卖点"},{"11":"11神秘C买卖点"},{"12":"12入选日期"},{"13":"13持续时间"},{"14":"14入选价格"},{"15":"15入选最高涨幅"},{"16":"16信号类型"},{"17":"17连板数"},{"18":"18涨停原因"},{"19":"19琅琊飙升榜"},{"20":"20琅琊排名榜"}]';

    let container = document.getElementById('container');
    let btn2 = document.getElementById('btn2');
    let btn3 = document.getElementById('btn3');
    let label2 = document.getElementById('label2');
    let label3 = document.getElementById('label3');

    let proJson = JSON.parse(pros);

    let words = [];

    /*Object.values(proJson).forEach(function (item) {
        for (let key in item) {
            let child = document.createElement("button");
            child.value = key;
            child.innerText = item[key];
            child.onclick = function (e) {
                if (!contains(words, child.value)) {
                    words[words.length] = child.value;
                    label2.value = words;
                }
            }
            container.appendChild(child);
        }
    })*/

    btn2.onclick = function (e) {
        label3.value = '';

        let value = '[';
        value += convert_bitmap(words);
        value += ']';
        label3.value = value;
        label3.select();
        document.execCommand("Copy"); // 执行浏览器复制命令
    };

    btn3.onclick = function (e) {
        words = [];
        label2.value = '';
        label3.value = '';
    };

    document.getElementById('btn4').addEventListener('change', function () {
        console.log(this.files)

        let file = this.files[0];

        let reader = new FileReader();
        reader.onload = function (progressEvent) {
            // Entire file
            console.log(this.result);

            // By lines
            let lines = this.result.split('\n');
            for (let line = 0; line < lines.length; line++) {
                let arr = lines[line].split(' ');

                let child = document.createElement("button");
                child.value = arr[1];
                child.innerText = arr[1] + arr[0];
                child.onclick = function (e) {
                    if (!contains(words, child.value)) {
                        words[words.length] = child.value;
                        label2.value = words;
                    }
                }
                container.appendChild(child);

                console.log(lines[line]);
            }
        };
        reader.readAsText(file);
    });
}

window.onload = function () {
    init1();
    init2();
};