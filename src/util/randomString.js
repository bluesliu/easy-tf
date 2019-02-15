const cache = [];

/**
 * 创建一个随机字符串
 * @param {number} expect   随机字符串的长度，最小长度1，最大长度16
 * @returns {string}
 */
const randomString = function(expect) {
    expect = !expect ? 16 : expect;
    expect = Math.min(expect, 16);
    let str;
    while (true){
        str = Math.random().toString(36).substring(2);
        while (str.length < expect) {
            str += Math.random().toString(36).substring(2);
        }
        if(cache.indexOf(str)===-1){
            cache.push(str);
            break;
        }
    }
    return str.substring(0, expect);
};

export {randomString}