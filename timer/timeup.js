let draw = document.getElementById('timer');
let mypen = draw.getContext('2d');
const [CENTERX, CENTERY] = [300, 300], // 圆心中心点
SECONDL = 135, // 秒针长度
    MINUTESL = 110, // 分针长度
    HOURL = 80, // 时针长度
    PERIOD = 60, // 时间周期
    OUTCIRCLE = 150, // 外圈长度
    INCIRCLE = 145, // 内圈长度
    WIDTH = 800, // canvas的宽
    HEIGHT = 800; // canvas的高
if (draw.getContext) {
    // this.getTime 和 this.getTime()有什么区别
    setInterval(this.getTimer, 1000);
}
/**
 * 得到内外两个圈
 */
function getCirles() {
    mypen.arc(CENTERX, CENTERY, OUTCIRCLE, 0, 2 * Math.PI, false);
    mypen.moveTo(INCIRCLE + CENTERX, CENTERY);
    mypen.arc(CENTERX, CENTERY, INCIRCLE, 0, 2 * Math.PI, false);
    mypen.moveTo(CENTERX, CENTERY);
}
/**
 * 渲染出时钟
 */
function getTimer() {
    let [hour, minutes, second] = this.getNow();
    mypen.beginPath();
    this.getCirles();
    this.getPiont(hour, minutes, second, HOURL);
    this.getPiont(hour, minutes, second, MINUTESL);
    this.getPiont(hour, minutes, second, SECONDL);
    // console.log(hour, minutes, second)
    // 旋转是改变不了旋转方向的
    // 这条路是行不通的
    // mypen.translate(CENTERX, CENTERY)
    // mypen.rotate(180)
    mypen.clearRect(0, 0, WIDTH, HEIGHT);
    mypen.stroke();
}
/**
 * 获得指针
 * @param {number} pointH 时间点小时
 * @param {number} pointM 时间点分钟
 * @param {number} pointS 时间点秒
 * @param {number} POINTL 各种指针长度
 */
function getPiont(pointH, pointM, pointS, POINTL) {
    let secondX, secondY, MinutesX, MinutesY, HourX, HourY, normalH; // 用来保存基本弧度
    normalH = (2 * Math.PI) / PERIOD; // 基本弧度
    if (POINTL === HOURL) {
        // 为什么时针还有问题
        // 因为分针和秒针都是60秒，60分钟
        // 时针只有12小时
        HourX = POINTL * Math.sin(-6 * normalH * (pointH - pointM / PERIOD) + Math.PI);
        HourY = POINTL * Math.cos(-6 * normalH * (pointH - pointM / PERIOD) + Math.PI);
        lineX = HourX;
        lineY = HourY;
    } else if (POINTL === MINUTESL) {
        // 分针对了
        // 分针选择直接弹过去那种
        MinutesX = POINTL * Math.sin(-normalH * pointM + Math.PI);
        MinutesY = POINTL * Math.cos(-normalH * pointM + Math.PI);
        lineX = MinutesX;
        lineY = MinutesY;
    } else {
        // 秒针对了
        secondX = POINTL * Math.sin(-normalH * pointS + Math.PI);
        secondY = POINTL * Math.cos(-normalH * pointS + Math.PI);
        lineX = secondX;
        lineY = secondY;
    }
    mypen.lineTo(CENTERX + lineX, CENTERY + lineY);
    mypen.moveTo(CENTERX, CENTERY);
}
/**
 * 获取当前时间
 */
function getNow() {
    let time = new Date(),
        hour = time.getHours(),
        minutes = time.getMinutes(),
        second = time.getSeconds();
    return [hour, minutes, second];
}

// 总觉得还有问题