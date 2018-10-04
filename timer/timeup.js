let draw = document.getElementById('timer');
let mypen = draw.getContext('2d');
let {
    sin,
    cos,
    PI
} = Math;
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
    // 初始化的时候运行一次
    this.getTimer(); //放在循环外面避免重新绘制，但是清理画布这个动作会把这个文字也清理掉
    this.getTimeNum();
    setInterval(this.getTimer, 1000);
}
/**
 * 得到内外两个圈
 */
function getCirles() {
    mypen.arc(CENTERX, CENTERY, OUTCIRCLE, 0, 2 * PI, false);
    mypen.moveTo(INCIRCLE + CENTERX, CENTERY);
    mypen.arc(CENTERX, CENTERY, INCIRCLE, 0, 2 * PI, false);
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
    // 旋转是改变不了旋转方向的
    // 这条路是行不通的
    // mypen.translate(CENTERX, CENTERY)
    // mypen.rotate(180)
    // 清除画布
    mypen.clearRect(0, 0, WIDTH, HEIGHT);
    // 获取时间表上的数字
    // 问题就是每次都得重新渲染
    this.getTimeNum();
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
    normalH = (2 * PI) / PERIOD; // 基本弧度
    if (POINTL === HOURL) {
        // 为什么时针还有问题
        // 因为分针和秒针都是60秒，60分钟
        // 时针只有12小时
        HourX = POINTL * sin(-5 * normalH * (pointH + pointM / PERIOD) + PI);
        HourY = POINTL * cos(-5 * normalH * (pointH + pointM / PERIOD) + PI);
        lineX = HourX;
        lineY = HourY;
    } else if (POINTL === MINUTESL) {
        // 分针对了
        // 分针选择直接弹过去那种
        MinutesX = POINTL * sin(-normalH * pointM + PI);
        MinutesY = POINTL * cos(-normalH * pointM + PI);
        lineX = MinutesX;
        lineY = MinutesY;
    } else {
        // 秒针对了
        secondX = POINTL * sin(-normalH * pointS + PI);
        secondY = POINTL * cos(-normalH * pointS + PI);
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
/**
 * 获取时间点对应数字
 */
function getTimeNum() {
    // let count = 0;
    // 简单的字体三件套
    mypen.font = 'bold 14px Arial';
    mypen.textAlign = 'center';
    mypen.textBaseline = 'middle';
    //这个循环只要执行一次
    // mypen.fillText('12', 200, 200);
    //断点先是画出来了，然后就消失了
    for (let i = 0; i < 12; i++) {
        // count++
        let tempX = CENTERX + INCIRCLE * sin(-i * PI / 6 + PI),
            tempY = CENTERY + INCIRCLE * cos(-i * PI / 6 + PI);
        if (i === 0) {
            // 假如等于0的时候换成12
            mypen.fillText('12', tempX, tempY);
        } else {
            mypen.fillText(i, tempX, tempY);
        }

    }
}

// 总觉得还有问题
// 时针还有问题
// 有些部分能不能不重复绘制
// 现在应该木有问题了