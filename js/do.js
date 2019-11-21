var counters = []; // 开始时间戳
var offsets = []; // 倒计时时间
var timers = []; // js timer id
var maxIndex = 0;
// 初始化添加timer
// count - 添加个数
// offset - timer 倒计时秒数
function init(count, offset = 4 * 60) {
    for (var i = 0; i < count; i++) {
        appendTimer(offset);
    }
}

// 添加一个倒计时Timer 
// offset - 倒计时秒数/
// addMin - 加时时间
function appendTimer(offset, addMin = 5) {
    var index = maxIndex++;
    var number = document.getElementsByClassName("timer").length;
    var timer_div = document.createElement("div");
    timer_div.className = "timer";
    timer_div.id = `timer_${index}`;
    timer_div.innerHTML = `
    <button class="number" ondblclick="remove(${index})">${number+1}</button>
    <button class="icon-btn" id="begin_${index}" onclick="begin(${index}, ${offset})"><img src="img/play.png" /></button>
    <button class="icon-btn" id="stop_${index}" onclick="stop(${index})"><img src="img/stop.png" /></button>
    <span class="display" id="display_${index}">${zero(parseInt(offset / 60), 2)}:${zero(offset % 60, 2)}.000</span>
    <button class="icon-btn" id="add_${index}" onclick="addTime(${index}, 60 * ${addMin})" title="加${addMin}分">
        <img src="img/add.png" />
    </button>
    <input type="number" id="stage_${index}" style="width:50px; border:2px #000 dashed;" placeholder="关卡"/>
    <audio class="hide" id="music_${index}" src="img/warning.mp3" loop/>
    `;
    document.getElementById('timer_list').appendChild(timer_div);
    document.getElementById(`stop_${index}`).style.display = "none";
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
    document.getElementById(`begin_${i}`).style.display = "none";    
    document.getElementById(`stop_${i}`).style.display = "";    
}

// 停止倒计时
// i - 要停止的Timer索引
function stop(i) {
    if (timers[i]) clearInterval(timers[i]);
    warning(i, false);    
    timers[i] = 0;
    counters[i] = (new Date()).valueOf();
    display(i);
    document.getElementById(`begin_${i}`).style.display = "";
    document.getElementById(`stop_${i}`).style.display = "none";
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
    var time = "00:00.000";
    if (leave <= 0) {
        clearInterval(timers[i]);
        timers[i] = 0;
    } else {
        var leaveTime = new Date(leave);
        time = `${zero(leaveTime.getMinutes(), 2)}:${zero(leaveTime.getSeconds(), 2)}.${zero(leaveTime.getMilliseconds(), 3)}`;
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
    return new Array(length - (num + "").length + 1).join("0") + num;             
}

// 警示
// i - Timer索引
// enable - 开启警示与否
function warning(i, enable = true) {
    if (enable) {
        document.getElementById(`display_${i}`).style.color = "red";
        document.getElementById(`display_${i}`).style.fontWeight = "bold";
    } else {
        document.getElementById(`display_${i}`).style.color = "";        
        document.getElementById(`display_${i}`).style.fontWeight = "";        
    }
    playmusic(i, enable);
}

function playmusic(i, play = true) {
    if (play) {
        document.getElementById(`music_${i}`).play()
    } else {
        document.getElementById(`music_${i}`).pause()        
    }
}

function remove(i) {
    var timer = document.getElementById(`timer_${i}`);
    timer.parentNode.removeChild(timer);
    var numbers = Array.from(document.getElementsByClassName("number"));
    numbers.forEach(function(ele, index) {
        ele.innerHTML = index + 1;
    });
}

init(6);
