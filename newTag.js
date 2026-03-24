var images = require("images");

async function deal100x30({ productname = "标准时钟", producttype = "HYCX-YU-110", productdate ="2020-12-12"}={},res) {
    const createImg = require('./creatImg');
    const Left = 124
    const Top = 116
    const offsetLeft = 337;
    const offsetTop = 293;
    let src = './bg3/newTag.png';
    let output = './assets/output.jpg';
    let { nameLeft, nameTop, typeLeft, typeTop, dateLeft, dateTop, waterLeft, waterTop } = {
        nameLeft: Left,
        nameTop: Top,
        typeLeft: Left,
        typeTop: 44+Top,
        dateLeft: Left,
        dateTop: 88+Top
    }

    await Promise.all([
        createImg({ name: productname, outputname: 'name' ,fontSize:20}),
        createImg({ name: producttype, outputname: 'type' ,fontSize:20}),
        createImg({ name: productdate, outputname: 'date' ,fontSize:20})
    ]);
    let out = images(src);
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 5; i++) {
            out.draw(images("./name.png"), nameLeft + offsetLeft * i, nameTop + j * offsetTop)
            out.draw(images("./type.png"), typeLeft + offsetLeft * i, typeTop + j * offsetTop)
            out.draw(images("./date.png"), dateLeft + offsetLeft * i, dateTop + j * offsetTop)
        }
        
    }

    out.save(output, {
        quality: 100
    })
    res && res.redirect("/output.jpg");
}

module.exports = deal100x30
