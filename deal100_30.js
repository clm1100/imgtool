var images = require("images");

async function deal100x30({ productname = "彼岸准时钟", producttype = "HYCX-YU-110", productdate ="2020-12-12"}={},res) {
    const createImg = require('./creatImg')
    let src = './bg3/100x30.png';
    let output = './assets/output.jpg';
    const Left = 360;
    const Top = 65;
    const offsetLeft = 1226;
    const offsetTop = 385;
    let { nameLeft, nameTop, typeLeft, typeTop, dateLeft, dateTop, waterLeft, waterTop } = {
        nameLeft: Left,
        nameTop: 420+Top,
        typeLeft: Left+590,
        typeTop: 420+Top,
        dateLeft: Left,
        dateTop: 540+Top
    }

    await Promise.all([
        createImg({ name: productname, outputname: 'name' }),
        createImg({ name: producttype, outputname: 'type' }),
        createImg({ name: productdate, outputname: 'date' })
    ]);
    let out = images(src);
    for (let i = 0; i < 4; i++) {
        out.draw(images("./name.png"), nameLeft, nameTop + offsetTop * i)
        out.draw(images("./type.png"), typeLeft, typeTop + offsetTop * i)
        out.draw(images("./date.png"), dateLeft, dateTop + offsetTop * i)

        out.draw(images("./name.png"), nameLeft + offsetLeft, nameTop + offsetTop * i)
        out.draw(images("./type.png"), typeLeft + offsetLeft, typeTop + offsetTop * i)
        out.draw(images("./date.png"), dateLeft + offsetLeft, dateTop + offsetTop * i)
    }

    out.save(output, {
        quality: 100
    })
    res && res.redirect("/output.jpg");
}

module.exports = deal100x30
