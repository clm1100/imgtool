const fs = require("fs");
const textToSVG = require('text-to-svg').loadSync('./font/msyh.ttf');
const sharp = require("sharp")

async function createImg({name,outputname,fontSize=36}){
    const attributes = { fill: 'black' };
    const options = { x: 0, y: 0, fontSize: fontSize, anchor: 'top', attributes: attributes, width: 720 };

    const svg = textToSVG.getSVG(name, options);
    // const svg2png = require("svg2png");

    let textSVG = Buffer.from(svg);

    await sharp(textSVG).png().toFile(`./${outputname}.png`);

    // let result =  await svg2png(textSVG);

    // fs.writeFileSync(`./${outputname}.png`, result);
}


module.exports = createImg;
