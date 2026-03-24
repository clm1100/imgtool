const images = require("images");
const getLength = require('./utils/getLength');
const spliceTwoName = require('./utils/splice2name');
const Left=365
const Top = 75
const offsetLeft = 500;
const offsetTop = 620
const src = './bg3/jinling.png';
const output = './assets/output.jpg';

async function deal100x30({ productname = "彼岸准时钟", producttype = "HYCX-YU-110", productdate ="2020-12-12",productpeople="001"}={},res) {
    const createImg = require('./creatImg')
    const out = images(src);
    if (getLength(productname)<=16){
        let { nameLeft, nameTop, typeLeft, typeTop, peopleLeft, peopleTop, dateLeft, dateTop, waterLeft, waterTop } = {
            nameLeft: Left,
            nameTop: 410+Top,
            typeLeft: Left,
            typeTop: 490+Top,
            peopleLeft: Left,
            peopleTop: 574+Top,
            dateLeft: Left,
            dateTop: 666+Top,
            waterLeft: Left,
            waterTop: 580+Top,
        }

        await Promise.all([
            createImg({ name: productname, outputname: 'name', fontSize: 30 }),
            createImg({ name: producttype, outputname: 'type', fontSize: 30 }),
            createImg({ name: productpeople, outputname: 'people', fontSize: 30 }),
            createImg({ name: productdate, outputname: 'date', fontSize: 30 }),
        ]);

        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                out.draw(images("./name.png"), nameLeft + offsetLeft * i, nameTop + j * offsetTop)
                out.draw(images("./type.png"), typeLeft + offsetLeft * i, typeTop + j * offsetTop)
                out.draw(images("./people.png"), peopleLeft + offsetLeft * i, peopleTop + j * offsetTop)
                out.draw(images(`./date.png`), dateLeft + offsetLeft * i, dateTop + j * offsetTop)
                out.draw(images("./z.png"), waterLeft + offsetLeft * i, waterTop + j * offsetTop)
            }

        }

    }else{

        const [productname1,productname2] = spliceTwoName(productname);
        
        let { nameLeft, nameTop,nameLeft1,nameTop1, typeLeft, typeTop, peopleLeft, peopleTop, dateLeft, dateTop, waterLeft, waterTop } = {
            nameLeft: Left,
            nameTop: 370+Top,
            nameLeft1: Left,
            nameTop1: 410+Top,
            typeLeft: Left,
            typeTop: 490+Top,
            peopleLeft: Left,
            peopleTop: 574+Top,
            dateLeft: Left,
            dateTop: 666+Top,
            waterLeft: Left,
            waterTop: 580+Top,
        }
        
        await Promise.all([
            createImg({ name: productname1, outputname: 'name', fontSize: 30 }),
            createImg({ name: productname2, outputname: 'name1', fontSize: 30 }),
            createImg({ name: producttype, outputname: 'type', fontSize: 30 }),
            createImg({ name: productpeople, outputname: 'people', fontSize: 30 }),
            createImg({ name: productdate, outputname: 'date', fontSize: 30 }),
        ]);

        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                out.draw(images("./name.png"), nameLeft + offsetLeft * i, nameTop + j * offsetTop)
                out.draw(images("./name1.png"), nameLeft1 + offsetLeft * i, nameTop1 + j * offsetTop)
                out.draw(images("./type.png"), typeLeft + offsetLeft * i, typeTop + j * offsetTop)
                out.draw(images("./people.png"), peopleLeft + offsetLeft * i, peopleTop + j * offsetTop)
                out.draw(images(`./date.png`), dateLeft + offsetLeft * i, dateTop + j * offsetTop)
                out.draw(images("./z.png"), waterLeft + offsetLeft * i, waterTop + j * offsetTop)
            }
        }
    }

    out.save(output, {
        quality: 100
    })
    res && res.redirect("/output.jpg");

}

module.exports = deal100x30
