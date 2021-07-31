// 取模运算
function mod(x, y) {
    return x - y * Math.floor(x / y);
}

// 整除运算
function zhengchu(x, y) {
    return Math.floor(x / y);
}

//数值变换
function num_exchange(x) {
    let shang = zhengchu(x, 256);
    let yu = mod(x, 256);
    let yuyu = mod(x, 4096);

    let houdian;
    if (x <= 97) {
        houdian = 1;
    } else {
        houdian = 1 + zhengchu((yuyu - 98 + 256), 256)
    }

    let houdian1;
    if (x < 1377) {
        houdian1 = 1;
    } else {
        houdian1 = 2 + zhengchu(zhengchu((x - 1377), 256), 16)
    }

    let zidian2 = {
        1: "8",
        2: "9",
        3: "E",
        4: 'F',
        5: 'C',
        6: 'D',
        7: '2',
        8: '3',
        9: '0',
        10: "1",
        11: '6',
        12: '7',
        13: "4",
        14: '5',
        15: 'A',
        16: 'B'
    };
    let zidian3 = {
        1: "C",
        2: "D",
        3: "A",
        4: 'B',
        5: '8',
        6: '9',
        7: '6',
        8: '7',
        9: '4',
        10: "5",
        11: '2',
        12: '3',
        13: "0",
        14: '1',
        15: 'E',
        16: 'F'
    };
    let zidian = {
        1: "3",
        2: "2",
        3: "5",
        4: '4',
        5: '7',
        6: '6',
        7: '9',
        8: '8',
        9: 'B',
        10: "A",
        11: 'D',
        12: 'C',
        13: "F",
        14: 'E',
        15: '1',
        16: '0'
    };
    let zidian1 = {
        1: "E",
        2: "D",
        3: "C",
        4: 'B',
        5: 'A',
        6: '9',
        7: '8',
        8: '7',
        9: '6',
        10: "5",
        11: '4',
        12: '3',
        13: "2",
        14: '1',
        15: '0',
        0: 'F'
    };

    let yu1 = mod(yu - 2, 16);
    let shang1;
    if (yu < 2) {
        shang1 = 16;
    } else {
        shang1 = zhengchu((yu - 2), 16) + 1
    }

    return zidian[shang1] + zidian1[yu1] + ' ' + zidian3[houdian1] + zidian2[houdian] + ' FF FF';
}

//转换十六进制并反转
function to_hex_revert(num) {
    let hex = num.toString(16);
    hex = hex.toUpperCase();

    let mask = '00000000';
    hex = mask.substr(0, 8 - hex.length) + hex;

    let index = hex.length;
    let stack = [];
    while (index > 0) {
        stack.push(hex.substr(index - 2, 2));
        index -= 2;
    }

    return stack.join(' ');
}

//数值变换
function init1() {
    let input = document.getElementById('input');
    let btn = document.getElementById('btn');
    let label = document.getElementById('label1');

    btn.onclick = function (e) {
        label.value = '';
        if (isNaN(input.value)) {
            alert('请输入正确的数字')
        } else {
            let x = parseInt(input.value);
            if (x > 65535) {
                alert('不支持大于65535的数')
            } else {
                label.value = num_exchange(x) + ' 01 C8 FF FF';
                label.select();
                document.execCommand("Copy"); // 执行浏览器复制命令
            }
        }
    };
}

//装备属性
function init2() {
    let pros = '[{"01":"根骨"},{"02":"真气"},{"03":"武术"},{"04":"灵力"},{"05":"灵巧"},{"06":"机缘"},{"0A":"体力"},{"0B":"法力"},{"0C":"护盾"},{"0d":"攻击"},{"0E":"最小攻击"},{"0F":"最大攻击"},{"10":"法术攻击"},{"11":"防御"},{"12":"法术防御"},{"13":"护甲"},{"14":"速度"},{"15":"暴击能力"},{"16":"爆伤"},{"17":"破防能力"},{"18":"破魔能力"},{"19":"穿透"},{"1A":"命中"},{"1B":"闪避"},{"1C":"金亲和"},{"1D":"木亲和"},{"1E":"水亲和"},{"1F":"火亲和"},{"20":"土亲和"},{"21":"嘲讽"},{"22":"神念"},{"23":"吸魂"},{"32":"体力%"},{"33":"法力%"},{"34":"物理攻击%"},{"35":"法术攻击%"},{"36":"物理防御"},{"37":"法术防御"},{"38":"护甲"},{"39":"速度%"},{"3A":"全部伤害%"},{"3B":"近战伤害%"},{"3C":"法术伤害%"},{"3D":"远程伤害"},{"3E":"治疗能力"},{"3F":"金抗性"},{"40":"木抗性"},{"41":"水抗性"},{"42":"火抗性"},{"43":"土抗性"},{"44":"物理免伤%"},{"45":"法术免伤%"},{"46":"暴击率%"},{"47":"护甲吸收率%（没用的属性）"},{"48":"命中率%"},{"49":"闪避率%"},{"4A":"施法率%"},{"4B":"攻击击晕目标%"},{"4C":"攻击中毒%"},{"4D":"锻造成功率%"},{"4E":"锻造安全级"},{"4F":"道具掉率%"},{"50":"金币掉率%"},{"51":"修为获取%"},{"52":"等级（没用的属性）"},{"53":"拥有者等级（没用的属性）"},{"54":"经验（没用的属性）"},{"55":"境界"},{"56":"宠物经验%"},{"57":"宠物掉率%"},{"58":"宠物亲密增加率%"},{"59":"背包数量"},{"5A":"宠物携带量"},{"5B":"炼丹药效%"},{"5C":"双倍成丹%"},{"5D":"获取道具原价值%"},{"5E":"对强大敌人吸引"},{"5F":"御力"},{"60":"忽视物免"},{"61":"忽视法免"},{"62":"技能熟练度"},{"63":"施法干扰%"},{"64":"锻造成功率%"},{"65":"攻击时灼烧%"}]';

    let property = document.getElementById('property');
    let color = document.getElementById('color');
    let pro1 = document.getElementById('pro1');
    let pro2 = document.getElementById('pro2');
    let btn2 = document.getElementById('btn2');
    let label2 = document.getElementById('label2');

    let proJson = JSON.parse(pros);

    Object.values(proJson).forEach(function (item) {
        for (let key in item) {
            let child = document.createElement("option");
            child.value = key;
            child.text = item[key];
            property.appendChild(child);
        }
    })

    btn2.onclick = function (e) {
        label2.value = '';

        let proVal = property.options[property.selectedIndex].value;
        if (!proVal) {
            alert('没有选择属性')
            return;
        }

        let colorVal = color.options[color.selectedIndex].value;
        if (!colorVal) {
            alert('没有选择颜色')
            return;
        }

        if (pro1.value === '' || isNaN(pro1.value)) {
            alert('第一个数字必须要有')
            return;
        }

        let value = proVal + " 00 00 00 ";
        if (colorVal === 'black') {
            value += "00 00 00 00 ";
        } else {
            value += "01 00 00 00 ";
        }

        let x1 = parseInt(pro1.value);
        value += to_hex_revert(x1);

        value += ' ';

        if (pro2.value !== '' && !isNaN(pro2.value)) {
            let x2 = parseInt(pro2.value);
            value += to_hex_revert(x2);
        } else {
            value += "00 00 00 00 ";
        }

        label2.value = value;
        label2.select();
        document.execCommand("Copy"); // 执行浏览器复制命令
    };
}

//数值十六进制逆序输出
function init3() {
    let input = document.getElementById('input2');
    let btn = document.getElementById('btn3');
    let label = document.getElementById('label3');

    btn.onclick = function (e) {
        label.value = '';
        if (isNaN(input.value)) {
            alert('请输入正确的数字')
        } else {
            let x = parseInt(input.value);
            label.value = to_hex_revert(x);
            label.select();
            document.execCommand("Copy"); // 执行浏览器复制命令
        }
    };
}

//PY
function init4() {
    let copys = document.getElementsByClassName('copy');
    for (let i = 0; i < copys.length; i++) {
        copys[i].onclick = function (e) {
            this.select();
            document.execCommand("Copy"); // 执行浏览器复制命令
        };
    }
}

//宠物成长
function init5() {
    let input1 = document.getElementById('jy1');
    let input2 = document.getElementById('jy2');
    let btn = document.getElementById('jybtn');
    let label = document.getElementById('jylbl');

    btn.onclick = function (e) {
        label.value = '';
        if (isNaN(input1.value) || isNaN(input2.value)) {
            alert('请输入正确的数字')
        } else {
            let x1 = parseInt(input1.value);
            let x2 = parseInt(input2.value);
            if (x1 > 65535 || x2 > 65535) {
                alert('不支持大于65535的数')
            } else {
                label.value = num_exchange(x1) + ' ' + num_exchange(x2);
                label.select();
                document.execCommand("Copy"); // 执行浏览器复制命令
            }
        }
    };
}

window.onload = function () {
    init1();
    init2();
    init3();
    init4();
    init5();
};