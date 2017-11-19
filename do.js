var counters = []; // 开始时间戳
var offsets = []; // 倒计时时间
var timers = []; // js timer id

// 初始化添加timer
// count - 添加个数
// offset - timer 倒计时秒数
function init(count, offset = 15 * 60) {
    for (var i = 0; i < count; i++) {
        appendTimer(offset);
    }
}

// 添加一个倒计时Timer 
// offset - 倒计时秒数/
// addMin - 加时时间
function appendTimer(offset, addMin = 10) {
    var index = document.getElementsByClassName('timer').length;
    var timer_div = document.createElement("div");
    timer_div.className = "timer";
    timer_div.id = `timer_${index}`;
    timer_div.innerHTML = `
    <div id="" class="timer">
        <span id="display_${index}"></span>
        <button id="begin_${index}" onclick="begin(${index}, ${offset})">开始</button>
        <button id="stop_${index}" onclick="stop(${index})">停止</button>
        <button id="stop_${index}" onclick="addTime(${index}, 60 * ${addMin}">加${addMin}分</button>
    </div>
    `;
    document.getElementById('timer_list').appendChild(timer_div);
}

// 开始倒计时
// i - Timer索引
// seconds - 要倒计时的秒数
function begin(i, seconds) {
    warning(i, false); // 先清除警示
    counters[i] = (new Date()).valueOf();
    offsets[i] = seconds * 1000;
    timers[i] = setInterval(function () {
        checkEnd(i, display(i));
    }, 10)
}

// 停止倒计时
// i - 要停止的Timer索引
function stop(i) {
    warning(i, false);    
    if (!timers[i]) return;
    clearInterval(timers[i]);
    timers[i] = 0;
}

// 加时
// i - Timer索引索引
// seconds - 加时
function addTime(i, seconds) {
    if (!counters[i]) return;
    counters[i] += seconds * 1000;
    display(i);
}

// 显示倒计时
// i - Timer索引
function display(i) {
    var current = (new Date()).valueOf();
    var leave = offsets[i] - (current - counters[i]); // 剩余时间
    var time = "00 : 00 : 00";
    if (leave <= 0) {
        stop(i);
    } else {
        var leaveTime = new Date(leave);
        time = `${zero(leaveTime.getMinutes(), 2)} : ${zero(leaveTime.getSeconds(), 2)} : ${zero(leaveTime.getMilliseconds(), 3)}`;
    }
    document.getElementById(`display_${i}`).innerHTML = time;
    return leave;
}

// 检查是否结束
// i - Timer索引
// time - 剩余时间
function checkEnd(i, time) {
    if (time > 0) return;
    warning(i);
}

// 数字自动补零
// num - 时间
// length - 补足长度
function zero(num, length){              
    return new Array(length - (num + "").length + 1).join("0") + str;             
}

// 警示
// i - Timer索引
// enable - 开启警示与否
function warning(i, enable = true) {
    if (enable) {
        document.getElementById(`timer_${i}`).style.backgroundColor = "red";
    } else {
        document.getElementById(`timer_${i}`).style.backgroundColor = "";        
    }
}

init(6);