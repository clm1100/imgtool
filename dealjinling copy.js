var images = require("images");

function getLength(str) {  //获取字符串的字节数，扩展string类型方法
    var b = 0; 
    var l = str.length;  //初始化字节数递加变量并获取字符串参数的字符个数
    if (l) {  //如果存在字符串，则执行计划
        for (var i = 0; i < l; i++) {  //遍历字符串，枚举每个字符
            if (str.charCodeAt(i) > 255) {  //字符编码大于255，说明是双字节字符
                b += 2;  //则累加2个
            } else {
                b++;  //否则递加一次
            }
        }
        return b;  //返回字节数
    } else {
        return 0;  //如果参数为空，则返回0个
    }
}


async function deal100x30({ productname = "彼岸准时钟", producttype = "HYCX-YU-110", productdate ="2020-12-12",productpeople="001"}={},res) {
    const createImg = require('./creatImg')
    let src = './bg3/jinling.png';
    let output = './assets/output.jpg';

    console.log(getLength(productname),'============------====')

    if (getLength(productname)<16){
        console.log("==============")
        let { nameLeft, nameTop, typeLeft, typeTop, peopleLeft, peopleTop, dateLeft, dateTop, waterLeft, waterTop } = {
            nameLeft: 260,
            nameTop: 300,
            typeLeft: 260,
            typeTop: 380,
            peopleLeft: 260,
            peopleTop: 464,
            dateLeft: 260,
            dateTop: 556,
            waterLeft: 280,
            waterTop: 480,
        }

        let productdatearr = productdate.split("-");
        let newproductdate = () => productdatearr[0] + "-" + productdatearr[1] + "-" + (Math.floor(Math.random() * (30 - 1)) + 1)

        // let dates = [newproductdate(), newproductdate(), newproductdate(), newproductdate()];
        let dates = [productdate, productdate, productdate, productdate];

        await Promise.all([
            createImg({ name: productname, outputname: 'name', fontSize: 30 }),
            createImg({ name: producttype, outputname: 'type', fontSize: 30 }),
            createImg({ name: productpeople, outputname: 'people', fontSize: 30 }),
            createImg({ name: dates[0], outputname: 'date0', fontSize: 30 }),
            createImg({ name: dates[1], outputname: 'date1', fontSize: 30 }),
            createImg({ name: dates[2], outputname: 'date2', fontSize: 30 }),
            createImg({ name: dates[3], outputname: 'date3', fontSize: 30 })
        ]);
        let out = images(src);
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                out.draw(images("./name.png"), nameLeft + 570 * i, nameTop + j * 744)
                out.draw(images("./type.png"), typeLeft + 570 * i, typeTop + j * 744)
                out.draw(images("./people.png"), peopleLeft + 570 * i, peopleTop + j * 744)
                out.draw(images(`./date${i}.png`), dateLeft + 570 * i, dateTop + j * 744)
                out.draw(images("./z.png"), waterLeft + 570 * i, waterTop + j * 744)
            }

        }

        out.save(output, {
            quality: 100
        })
        res && res.redirect("/output.jpg");
    }else{

        let byteLength=0;
        let string=0;
        let productnameLength = productname.length;
        for (let i = 0; i < productnameLength;i++){
            let itbytel = productname.charCodeAt(i) ;
            if (itbytel>255){
                byteLength+=2
            }else{
                byteLength+=1
            }
            if (byteLength>=16){
                string=i;
                break;
            }
        }
        console.log(string);


        let productname1 = productname.slice(0, string);
        let productname2 = productname.slice(string);
        let { nameLeft, nameTop,nameLeft1,nameTop1, typeLeft, typeTop, peopleLeft, peopleTop, dateLeft, dateTop, waterLeft, waterTop } = {
            nameLeft: 260,
            nameTop: 260,
            nameLeft1: 260,
            nameTop1: 300,
            typeLeft: 260,
            typeTop: 380,
            peopleLeft: 260,
            peopleTop: 464,
            dateLeft: 260,
            dateTop: 556,
            waterLeft: 280,
            waterTop: 480,
        }

        let productdatearr = productdate.split("-");
        let newproductdate = () => productdatearr[0] + "-" + productdatearr[1] + "-" + (Math.floor(Math.random() * (30 - 1)) + 1)

        // let dates = [newproductdate(), newproductdate(), newproductdate(), newproductdate()];
        let dates = [productdate, productdate, productdate, productdate];


        await Promise.all([
            createImg({ name: productname1, outputname: 'name', fontSize: 30 }),
            createImg({ name: productname2, outputname: 'name1', fontSize: 30 }),
            createImg({ name: producttype, outputname: 'type', fontSize: 30 }),
            createImg({ name: productpeople, outputname: 'people', fontSize: 30 }),
            createImg({ name: dates[0], outputname: 'date0', fontSize: 30 }),
            createImg({ name: dates[1], outputname: 'date1', fontSize: 30 }),
            createImg({ name: dates[2], outputname: 'date2', fontSize: 30 }),
            createImg({ name: dates[3], outputname: 'date3', fontSize: 30 })
        ]);
        let out = images(src);
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                out.draw(images("./name.png"), nameLeft + 570 * i, nameTop + j * 744)
                out.draw(images("./name1.png"), nameLeft1 + 570 * i, nameTop1 + j * 744)
                out.draw(images("./type.png"), typeLeft + 570 * i, typeTop + j * 744)
                out.draw(images("./people.png"), peopleLeft + 570 * i, peopleTop + j * 744)
                out.draw(images(`./date${i}.png`), dateLeft + 570 * i, dateTop + j * 744)
                out.draw(images("./z.png"), waterLeft + 570 * i, waterTop + j * 744)
            }

        }

        out.save(output, {
            quality: 100
        })
        res && res.redirect("/output.jpg");
    }

   
    
}

module.exports = deal100x30

deal100x30({ productname : "彼岸准时钟111", producttype : "HYCX-YU-110111", productdate :"2020-12-12111" });