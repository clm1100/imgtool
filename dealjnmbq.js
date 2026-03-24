var images = require("images");
const getLength = require("./utils/getLength")
const spliceTwoNameV2 = require('./utils/splice2nameV2')


async function deal100x30({ productname = "彼岸准时钟", producttype = "HYCX-YU-110", productdate ="2020-12-12",productpeople="001"}={},res) {
    const createImg = require('./creatImg')
    let src = './bg3/jnmbq.png';
    let output = './assets/output.jpg';
    const Left = 336;
    const Top = 160
    const offsetLeft = 861;
    const offsetTop = 315;
    let out = images(src);

    if (getLength(productname)<44){
        let { nameLeft, nameTop, typeLeft, typeTop, } = {
            nameLeft: Left,
            nameTop: 266+Top,
            typeLeft: Left,
            typeTop: 346+Top,
        }
        await Promise.all([
            createImg({ name: productname, outputname: 'name', fontSize: 28 }),
            createImg({ name: producttype, outputname: 'type', fontSize: 30 }),
        ]);
        
        for (let j = 0; j < 6; j++) {
            for (let i = 0; i < 3; i++) {
                out.draw(images("./name.png"), nameLeft + offsetLeft * i, nameTop + j * offsetTop)
                out.draw(images("./type.png"), typeLeft + offsetLeft * i, typeTop + j * offsetTop)
            }
        }
    }else{
        // let productname1 = productname.slice(0,24);
        // let productname2 = productname.slice(24);

        const [productname1,productname2] = spliceTwoNameV2(productname,44)

        let { nameLeft, nameTop,nameLeft1,nameTop1, typeLeft, typeTop } = {
            nameLeft: Left,
            nameTop: 236+Top,
            nameLeft1: Left,
            nameTop1: 276+Top,
            typeLeft: Left,
            typeTop: 346+Top,
        }

        await Promise.all([
            createImg({ name: productname1, outputname: 'name', fontSize: 28 }),
            createImg({ name: productname2, outputname: 'name1', fontSize: 28 }),
            createImg({ name: producttype, outputname: 'type', fontSize: 30 }),
        ]);
        for (let j = 0; j < 6; j++) {
            for (let i = 0; i < 3; i++) {
                out.draw(images("./name.png"), nameLeft + offsetLeft * i, nameTop + j * offsetTop)
                out.draw(images("./name1.png"), nameLeft1 + offsetLeft * i, nameTop1 + j * offsetTop)
                out.draw(images("./type.png"), typeLeft + offsetLeft * i, typeTop + j * offsetTop)
            }
        }
    }
    out.save(output, {
        quality: 100
    })
    res && res.redirect("/output.jpg");
   
    
}

module.exports = deal100x30

deal100x30({ productname : "彼岸准时钟111", producttype : "HYCX-YU-110111", productdate :"2020-12-12111" });