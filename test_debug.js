const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const TextToSVG = require('text-to-svg');
const pureimage = require('pureimage');

async function test() {
    const textToSVG = TextToSVG.loadSync(path.join(__dirname, 'font/msyh.ttf'));
    const name = '测试';
    const fontSize = 36;

    const metrics = textToSVG.getMetrics(name, { fontSize });

    const padding = 10;
    const width = Math.ceil(metrics.width + padding * 2);
    const height = Math.ceil(metrics.height + padding * 2);

    const pathData = textToSVG.getD(name, { fontSize, anchor: 'baseline left' });

    // 1. 用 pureimage 渲染到白色背景
    const img = pureimage.make(width, height);
    const ctx = img.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#000000';
    ctx.beginPath();

    const offsetX = padding;
    const offsetY = padding + metrics.ascender;

    const regex = /([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)/g;
    let match;

    while ((match = regex.exec(pathData)) !== null) {
        const type = match[1];
        const args = match[2].match(/-?[\d.]+/g)?.map(parseFloat) || [];

        switch (type) {
            case "M":
                if (args.length >= 2) ctx.moveTo(args[0] + offsetX, args[1] + offsetY);
                break;
            case "L":
                if (args.length >= 2) ctx.lineTo(args[0] + offsetX, args[1] + offsetY);
                break;
            case "C":
                if (args.length >= 6) ctx.bezierCurveTo(
                    args[0] + offsetX, args[1] + offsetY,
                    args[2] + offsetX, args[3] + offsetY,
                    args[4] + offsetX, args[5] + offsetY
                );
                break;
            case "Q":
                if (args.length >= 4) ctx.quadraticCurveTo(
                    args[0] + offsetX, args[1] + offsetY,
                    args[2] + offsetX, args[3] + offsetY
                );
                break;
            case "Z":
            case "z":
                ctx.closePath();
                break;
        }
    }

    ctx.fill();

    // 保存临时文件
    const tempPath = 'temp_white.png';
    await pureimage.encodePNGToStream(img, fs.createWriteStream(tempPath));

    // 2. 用 jimp 把白色变透明
    const jimpImg = await Jimp.read(tempPath);
    jimpImg.scan(0, 0, width, height, function(x, y, idx) {
        // idx 是像素在 buffer 中的偏移
        // RGBA 顺序
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];

        // 如果是白色，变透明
        if (r > 250 && g > 250 && b > 250) {
            this.bitmap.data[idx + 3] = 0; // alpha = 0
        }
    });

    await jimpImg.writeAsync('test_trans_jimp.png');
    fs.unlinkSync(tempPath);
    console.log('Done: test_trans_jimp.png, size:', fs.statSync('test_trans_jimp.png').size);
}

test().catch(console.error);
