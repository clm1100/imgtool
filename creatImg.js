const fs = require("fs");
const path = require("path");
const TextToSVG = require("text-to-svg");
const pureimage = require("pureimage");
const Jimp = require("jimp");

async function createImg({ name, outputname, fontSize = 36, fontPath = "font/msyh.ttf" }) {

    const textToSVG = TextToSVG.loadSync(path.join(__dirname, fontPath));

    // 小字号时放大绘制，解决 pureimage 渲染问题
    const scale = fontSize < 30 ? 3 : 1;
    const actualFontSize = fontSize * scale;

    const metrics = textToSVG.getMetrics(name, { fontSize: actualFontSize });

    const padding = 10 * scale;
    const width = Math.ceil(metrics.width + padding * 2) || 100;
    const height = Math.ceil(metrics.height + padding * 2) || 50;

    // 获取 SVG 路径（使用 baseline left anchor）
    const pathData = textToSVG.getD(name, {
        fontSize: actualFontSize,
        anchor: "baseline left"
    });

    // 创建 Canvas，先渲染到白色背景
    const img = pureimage.make(width, height);
    const ctx = img.getContext("2d");

    // 白色背景（后面会变透明）
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    // 黑色文字
    ctx.fillStyle = "#000000";
    ctx.beginPath();

    const offsetX = padding;
    const offsetY = padding + metrics.ascender;

    // 解析 SVG 路径（改进的解析，支持负数）
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
            case "H":
                if (args.length >= 1) ctx.lineTo(args[0] + offsetX, ctx.currentY);
                break;
            case "V":
                if (args.length >= 1) ctx.lineTo(ctx.currentX, args[0] + offsetY);
                break;
            case "C":
                if (args.length >= 6) {
                    ctx.bezierCurveTo(
                        args[0] + offsetX, args[1] + offsetY,
                        args[2] + offsetX, args[3] + offsetY,
                        args[4] + offsetX, args[5] + offsetY
                    );
                }
                break;
            case "Q":
                if (args.length >= 4) {
                    ctx.quadraticCurveTo(
                        args[0] + offsetX, args[1] + offsetY,
                        args[2] + offsetX, args[3] + offsetY
                    );
                }
                break;
            case "Z":
            case "z":
                ctx.closePath();
                break;
        }
    }

    ctx.fill();

    // 保存临时文件
    const tempPath = path.join(__dirname, `_temp_${outputname}.png`);
    await pureimage.encodePNGToStream(img, fs.createWriteStream(tempPath));

    // 用 Jimp 把白色背景变透明
    const jimpImg = await Jimp.read(tempPath);

    // 如果放大了，先缩小
    if (scale > 1) {
        jimpImg.resize(Math.round(width / scale), Math.round(height / scale));
    }

    // 扫描像素，把白色变透明
    const finalWidth = jimpImg.bitmap.width;
    const finalHeight = jimpImg.bitmap.height;

    jimpImg.scan(0, 0, finalWidth, finalHeight, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];

        // 白色像素变透明
        if (r > 250 && g > 250 && b > 250) {
            this.bitmap.data[idx + 3] = 0;
        }
    });

    const outputPath = path.join(__dirname, `${outputname}.png`);
    await jimpImg.writeAsync(outputPath);

    // 删除临时文件
    fs.unlinkSync(tempPath);

}

module.exports = createImg;
