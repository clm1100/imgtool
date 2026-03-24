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

module.exports = getLength;