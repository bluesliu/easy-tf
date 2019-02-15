/**
 * 是否是Mac系统
 * @returns {boolean}
 */
let isMac = ()=>{
    return (navigator.platform === "Mac68K") || (navigator.platform === "MacPPC") || (navigator.platform === "Macintosh") || (navigator.platform === "MacIntel");
};

/**
 * 是否是Windows系统
 * @returns {boolean}
 */
let isWin = ()=>{
    return (navigator.platform === "Win32") || (navigator.platform === "Windows");
};

export {isMac, isWin};