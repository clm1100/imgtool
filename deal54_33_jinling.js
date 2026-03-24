var images = require("images");

async function deal100x30({ productname = "彼岸准时钟", producttype = "HYCX-YU-110", productdate ="2020-12-12"}={},res) {
    const createImg = require('./creatImg');
    const Left = 310
    const Top = 230
    const offsetLeft = 666;
    const offsetTop = 430;
    let src = './bg3/54_33_jinling.png';
    let output = './assets/output.jpg';
    let { nameLeft, nameTop, typeLeft, typeTop, dateLeft, dateTop, waterLeft, waterTop } = {
        nameLeft: Left,
        nameTop: 70+Top,
        typeLeft: Left,
        typeTop: 145+Top,
        dateLeft: Left,
        dateTop: 218+Top
    }

    await Promise.all([
        createImg({ name: productname, outputname: 'name' ,fontSize:20}),
        createImg({ name: producttype, outputname: 'type' ,fontSize:20}),
        createImg({ name: productdate, outputname: 'date' ,fontSize:20})
    ]);
    let out = images(src);
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 3; i++) {
            out.draw(images("./name.png"), nameLeft + offsetLeft * i, nameTop + j * offsetTop)
            out.draw(images("./type.png"), typeLeft + offsetLeft * i, typeTop + j * offsetTop)
            out.draw(images("./date.png"), dateLeft + offsetLeft * i, dateTop + j * offsetTop)
        }
        
    }

    await out.save(output, {
        quality: 100
    })
    res && res.redirect("/output.jpg");
}

module.exports = deal100x30
