let draw = document.getElementById('timer')
if (draw.getContext) {
    let mypen = draw.getContext('2d')
    let h = 135
    // 这个时候应该去获取当前时间
    setInterval(function () {
        let time = new Date()
        // let hour = time.getHours()
        // let minute = time.getMinutes()
        let second = time.getSeconds()
        mypen.beginPath()
        mypen.arc(300, 300, 150, 0, 2 * Math.PI, false)
        mypen.moveTo(445, 300)
        mypen.arc(300, 300, 145, 0, 2 * Math.PI, false)
        mypen.moveTo(300, 300)
        mypen.lineTo(300 + h * Math.sin(second * Math.PI / 30), 300 + h * Math.cos(second * Math.PI / 30))
        mypen.moveTo(300, 300)
        mypen.clearRect(0, 0, 800, 800)
        // 这边一样的要下笔作画
        mypen.stroke()
    }, 1000)
    // 这边应该有一个换算公式才对
}
// 就单单是这么点代码就已经显得很乱了(这样的代码维护起来直接呵呵)