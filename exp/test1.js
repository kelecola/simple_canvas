let draw = document.querySelector('.saveTest'),
    mypen = draw.getContext('2d');

// mypen.fillStyle = '#ff0000';
// // save方法把配置全部放入一个栈中
// // restore方法可以把配置取出来
// mypen.save();

// mypen.fillStyle = '#00ff00';
// mypen.translate(100, 100);
// mypen.save();

// mypen.fillStyle = '#0000ff';
// mypen.fillRect(0, 0, 100, 200);

// mypen.restore();
// mypen.fillRect(10, 10, 100, 200);

// mypen.restore();
// mypen.fillRect(0, 0, 100, 200);
// 简单的道理图片太大了，你要等它加载完成才能执行下一步
let image = new Image(),
    count = 0;
// 这些地方总是会涉及到一些图片的初始化，假如要用上计时器的时候
image.src = `../image/picture${count+1}.jpg`;
image.onload = function () {
    mypen.drawImage(image, 0, 0, 960, 600);
};

// 假如要对这些图片进行点击操作怎么设置
// 基本思维他们点击的都是canvas这一个东西，只能说是算出是这个图片的时候
// 实行不同的方法来达到faker click
setInterval(function () {
    if (count === 0) {
        count++;
    } else if (count === 1) {
        count++;
    } else {
        count = 0;
    }
    image.src = `../image/picture${count+1}.jpg`;
    image.onload = function () {
        mypen.drawImage(image, 0, 0, 960, 600);
    };
    // 全局透明度
    // mypen.globalAlpha = count / 3;
    // my.globalCompositionOperation = 'source-out';
}, 1500);


// mypen.drawImage(image, 10, 10);
// mypen.stroke();
// 到了这边以后还有一个问题就是层级问题哪个图层在上面哪个图层在下面