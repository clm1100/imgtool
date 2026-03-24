const  images = require("images");
const textToSVG = require('text-to-svg').loadSync('./font/msyh.ttf');
// const svg2png = require("svg2png");
const fs = require('fs');
const sharp = require("sharp")

const attributes = { fill: 'black' };
const options = { x: 0, y: 0, fontSize: 26, anchor: 'top', attributes: attributes, width: 720 };

const svg = textToSVG.getSVG("你好1111", options);

let textSVG = Buffer.from(svg);



(async () => {
    let result = await sharp(textSVG).png().toFile("name.png");

    let r = fs.readFileSync('./name.png');
    console.log(r);

    // fs.writeFileSync(`./name.png`, result);
})()

// (async ()=>{
//     let result = await svg2png(textSVG);

//     fs.writeFileSync(`./name.png`, result);
// })()