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

//数组是否包含某值
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
    let pros = '[{"1":"股票代码"},' +
        '{"2":"股票名称"},' +
        '{"3":"当日价格"},' +
        '{"4":"当日涨幅"},' +
        '{"5":"当日换手率"},' +
        '{"6":"当日开盘涨幅"},' +
        '{"7":"智能亮点"},' +
        '{"8":"入选状态"},' +
        '{"9":"五星买卖点"},' +
        '{"10":"红黄白买卖点"},' +
        '{"11":"神秘C买卖点"},' +
        '{"12":"入选日期"},' +
        '{"13":"持续时间"},' +
        '{"14":"入选价格"},' +
        '{"15":"入选最高涨幅"},' +
        '{"16":"信号类型"},' +
        '{"17":"连板数"},' +
        '{"18":"涨停原因"},' +
        '{"19":"琅琊飙升榜"},' +
        '{"20":"琅琊排名榜"},' +
        '{"21":"琅琊次日排名榜"},' +
        '{"22":"首次封板时间"},' +
        '{"23":"最后封板时间"},' +
        '{"24":"开板数"},' +
        '{"25":"反包池最近一次涨停时连板数"},' +
        '{"26":"最近涨停日期"},' +
        '{"27":"反包类型"},' +
        '{"28":"攻击波"},' +
        '{"29":"回头波"},' +
        '{"30":"次日开盘涨幅"},' +
        '{"31":"次日涨幅"},' +
        '{"32":"涨停类型"},' +
        '{"33":"涨停因子"},' +
        '{"34":"封单量"},' +
        '{"35":"几天几板"},' +
        '{"36":"所属概念板块"},' +
        '{"37":"当日流通市值"},' +
        '{"38":"当日总市值"},' +
        '{"39":"最高连板数"},' +
        '{"40":"股池来源"},' +
        '{"41":"入选理由（复盘）"},' +
        '{"42":"涨停家数"},' +
        '{"43":"领涨股代码"},' +
        '{"44":"领涨股名称"},' +
        '{"45":"领涨股涨幅"},' +
        '{"46":"入选理由（投顾）"},' +
        '{"47":"舆情类型"},' +
        '{"48":"舆情新闻ID"},' +
        '{"49":"题材-行业地位"},' +
        '{"50":"题材-投资逻辑"},' +
        '{"51":"3日涨幅"},' +
        '{"52":"5日涨跌幅"},' +
        '{"53":"10日涨跌幅"},' +
        '{"54":"20日涨跌幅"},' +
        '{"55":"10日最高涨跌幅"},' +
        '{"56":"振幅"},' +
        '{"57":"成交量"},' +
        '{"58":"成交额"},' +
        '{"59":"主力净买"},' +
        '{"60":"主力占比"},' +
        '{"61":"量比"},' +
        '{"62":"涨速"},' +
        '{"63":"所属行业"},' +
        '{"64":"市盈率"},' +
        '{"65":"市净率"},' +
        '{"66":"总股本"},' +
        '{"67":"流通股本"},' +
        '{"68":"每股收益"},' +
        '{"69":"最新价格"},' +
        '{"70":"最新涨幅"},' +
        '{"71":"最新换手率"},' +
        '{"72":"最新开盘涨幅"},' +
        '{"73":"最新流通市值"},' +
        '{"74":"最新总市值"},' +
        '{"75":"最新涨停标签"},' +
        '{"76":"最新攻击波"},' +
        '{"77":"最新回头波"},' +
        '{"78":"ipo日期"},' +
        '{"79":"题材上涨比例"},' +
        '{"80":"五星买点个数"},' +
        '{"81":"五星买点比例"},' +
        '{"82":"连涨天数"},' +
        '{"83":"上涨家数"},' +
        '{"84":"下跌家数"},' +
        '{"85":"平盘家数"},' +
        '{"86":"所属特色题材"},' +
        '{"87":"竞价涨跌幅"},' +
        '{"88":"竞价占昨量"},' +
        '{"89":"竞价成交量"},' +
        '{"90":"竞价换手率"},' +
        '{"91":"大涨解读-驱动"},' +
        '{"92":"题材级别"},' +
        '{"93":"脱水研报链接地址"},' +
        '{"94":"区间涨幅"},' +
        '{"95":"区间最高幅"},' +
        '{"96":"股票类型"},' +
        '{"97":"涨停标识"},' +
        '{"98":"区间成交量"},' +
        '{"99":"区间成交额"},' +
        '{"100":"区间资金流"},' +
        '{"101":"区间主站净买"},' +
        '{"102":"区间主力占比"},' +
        '{"103":"实时成分股数量"},' +
        '{"104":"红黄白K线"},' +
        '{"105":"近N日红黄白K线数目"},' +
        '{"106":"涨跌额"},' +
        '{"107":"市场10日涨幅"},' +
        '{"108":"入选后10日最大涨幅"},' +
        '{"109":"入选后20日最大涨幅"},' +
        '{"110":"入选后涨幅"},' +
        '{"111":"入选后5日涨幅"},' +
        '{"112":"入选后10日涨幅"},' +
        '{"113":"入选后20日涨幅"}]';

    let container = document.getElementById('container');
    let btn2 = document.getElementById('btn2');
    let btn3 = document.getElementById('btn3');
    let label2 = document.getElementById('label2');
    let label3 = document.getElementById('label3');

    let proJson = JSON.parse(pros);

    let words = [];

    Object.values(proJson).forEach(function (item) {
        for (let key in item) {
            let child = document.createElement("button");
            child.value = key;
            child.innerText = key + ' ' + item[key];
            child.onclick = function (e) {
                if (!contains(words, child.value)) {
                    words[words.length] = child.value;
                    label2.value = words;
                }
            }
            container.appendChild(child);
        }
    })

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

    /*document.getElementById('btn4').addEventListener('change', function () {
        console.log(this.files)

        let file = this.files[0];

        let reader = new FileReader();
        reader.onload = function (progressEvent) {
            // Entire file
            console.log(this.result);

            // By lines
            let lines = this.result.split('');
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
    });*/
}

window.onload = function () {
    init1();
    init2();
};