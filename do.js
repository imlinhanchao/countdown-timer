var counters = [];
var offsets = [];
var timers = [];
function init(count, offset = 15 * 60) {
    for (var i = 0; i < count; i++) {
        appendTimer(offset);
    }
}

function appendTimer(offset) {
    var index = document.getElementsByClassName('timer').length;
    var timer_div = document.createElement("div");
    timer_div.className = "timer";
    timer_div.id = `timer_${index}`;
    timer_div.innerHTML = `
    <div id="" class="timer">
        <span id="display_${index}"></span>
        <button id="begin_${index}" onclick="begin(${index}, ${offset})">开始</button>
        <button id="stop_${index}" onclick="stop(${index})">停止</button>
        <button id="stop_${index}" onclick="addTime(${index}, 60 * 10)">加10分</button>
    </div>
    `;
    document.getElementById('timer_list').appendChild(timer_div);
}

function begin(i, seconds) {
    warning(i, false);
    counters[i] = (new Date()).valueOf();
    offsets[i] = seconds * 1000;
    timers[i] = setInterval(function () {
        checkEnd(i, display(i));
    }, 10)
}

function stop(i) {
    warning(i, false);    
    if (!timers[i]) return;
    clearInterval(timers[i]);
    timers[i] = 0;
}

function addTime(i, seconds) {
    if (!counters[i]) return;
    counters[i] += seconds * 1000;
    display(i);
}

function display(i) {
    var current = (new Date()).valueOf();
    var leave = offsets[i] - (current - counters[i]);
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

function checkEnd(i, time) {
    if (time > 0) return;
    warning(i);
}

function zero(str,length){              
    return new Array(length - (str + "").length + 1).join("0") + str;             
}

function warning(i, enable = true) {
    if (enable) {
        document.getElementById(`timer_${i}`).style.backgroundColor = "red";
    } else {
        document.getElementById(`timer_${i}`).style.backgroundColor = "";        
    }
}

init(2)