export default class BlockType {
    /**
     * 普通段落
     * @type {symbol}
     */
    static BLOCK = Symbol('block');
    /**
     * 引用
     * @type {symbol}
     */
    static QUOTE = Symbol('quote');
}