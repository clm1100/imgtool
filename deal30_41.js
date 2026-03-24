var images = require("images");

async function deal100x30({ productname = "彼岸准时钟", producttype = "HYCX-YU-110", productdate ="2020-12-12"}={},res) {

    const Left = 470
    const Top = 230
    const offsetLeft = 385;
    const offsetTop = 514;
    const src = './bg3/b30x41.png';
    const output = './assets/output.jpg';
    const out = images(src);
    const createImg = require('./creatImg')
    
    let { nameLeft, nameTop, typeLeft, typeTop, dateLeft, dateTop } = {
        nameLeft: Left,
        nameTop: 260+Top,
        typeLeft: Left,
        typeTop: 330+Top,
        dateLeft: Left,
        dateTop: 410+Top
    }

    try {
        await Promise.all([
            createImg({ name: productname, outputname: 'name' ,fontSize:24}),
            createImg({ name: producttype, outputname: 'type' ,fontSize:28}),
            createImg({ name: productdate, outputname: 'date' ,fontSize:28})
        ]);
        
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < 4; i++) {
                out.draw(images("./name.png"), nameLeft + offsetLeft * i, nameTop + j * offsetTop)
                out.draw(images("./type.png"), typeLeft + offsetLeft * i, typeTop + j * offsetTop)
                out.draw(images("./date.png"), dateLeft + offsetLeft * i, dateTop + j * offsetTop)
            }
        }

        await out.save(output, {
            quality: 100
        })
        res&&res.redirect("/output.jpg");
    } catch(err) {
        console.error('Error in deal100x30:', err);
        res && res.status(500).send('Error: ' + err.message);
    }
}

module.exports = deal100x30;
