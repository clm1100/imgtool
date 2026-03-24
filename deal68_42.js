var images = require("images");

async function deal100x30({ productname = "彼岸准时钟", producttype = "HYCX-YU-110", productdate ="2020-12-12"}={},res) {
    const createImg = require('./creatImg')

    const Left = 350;
    const Top = 15;
    const offsetLeft = 850;
    const offsetTop = 535;

    let src = './bg3/b68x42.png';
    let output = './assets/output.jpg';
    let { nameLeft, nameTop, typeLeft, typeTop, dateLeft, dateTop, waterLeft, waterTop } = {
        nameLeft: Left,
        nameTop: 400+Top,
        typeLeft: Left,
        typeTop: 490+Top,
        dateLeft: Left,
        dateTop: 582+Top
    }

    await Promise.all([
        createImg({ name: productname, outputname: 'name'}),
        createImg({ name: producttype, outputname: 'type'}),
        createImg({ name: productdate, outputname: 'date'})
    ]);
    let out = images(src);
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
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
