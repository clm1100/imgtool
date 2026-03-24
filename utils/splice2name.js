function spliceTwoName(productname){
    let byteLength = 0;
    let string = 0;
    let productnameLength = productname.length;
    for (let i = 0; i < productnameLength; i++) {
        let itbytel = productname.charCodeAt(i);
        if (itbytel > 255) {
            byteLength += 2
        } else {
            byteLength += 1
        }
        if (byteLength >= 16) {
            string = i;
            break;
        }
    }

    let productname1 = productname.slice(0, string);
    let productname2 = productname.slice(string);
    return [productname1,productname2];
}

module.exports = spliceTwoName;