import InlineStyleRange from "../model/InlineStyleRange";
import BlockType from './BlockType'
import {randomString} from "../util/randomString";
import {rangeIntersect} from "int-range";

const objPool = [];

/**
 * 块级元素，一个 Block 对应 DOM 中的一个 <p> 标签
 */
export default class Block {
    /**
     * 键值，由5位随机字符串组成
     * @type {string}
     */
    #key = '';

    /**
     * 存储行内样式
     * @type {Array.<InlineStyleRange>}
     */
    #inlineStyleRanges = [];

    /**
     * 文字内容
     * @type {string}
     */
    #text = "";

    /**
     * 段落样式
     * @type {{}}
     */
    style = null;

    /**
     * 段落类型
     * @type {symbol}
     */
    type = BlockType.BLOCK;

    /**
     *
     * @param {string} text
     */
    constructor(text=''){
        this.#text = text;
        this.#key = randomString(5);
    }

    /**
     *
     * @param {Range} range 局部范围
     */
    deleteText(range) {
        this.#text = this.text.substr(0, range.begin) + this.text.substr(range.begin+range.length);
        // 更新样式范围
        this.#inlineStyleRanges = this.#inlineStyleRanges.map((sr)=>{
            const intersect = rangeIntersect(sr, range)[0];
            if(intersect!==undefined){
                //相交的情况
                sr.length -= intersect.length;
                //判断左移
                if(range.min<sr.min){
                    sr.begin -= (sr.min-range.min);
                }
            }
            else{
                //非相交情况
                //如果 range 在 sr 的右侧，那么不需修改 sr
                //如果 range 在 sr 的左侧，那么 sr 要向左移动
                if(range.max < sr.min){
                    sr.begin -= range.length;
                }
            }
            return sr;
        });
    }

    /**
     *
     * @param {string} text
     * @param {number} offset
     */
    insertText(text, offset) {
        this.#text = this.#text.substr(0, offset)
            + text
            + this.#text.substr(offset);

        // 更新样式范围
        this.#inlineStyleRanges = this.#inlineStyleRanges.map((sr) => {
            if ((offset > sr.min && offset <= sr.max + 1)
                || (sr.length === 0 && offset === sr.min)
                || (offset === 0 && sr.min === 0)) {
                sr.length += text.length;
            } else if (offset <= sr.min) {
                sr.begin += text.length;
            }

            return sr;
        });
    }

    /**
     * 合入
     * @param {Block} block
     */
    merge(block) {
        const oldLen = this.length;
        this.#text += block.text;

        const list = block.inlineStyleRanges.map((sr)=>{
            return new InlineStyleRange(sr.begin+oldLen, sr.length, sr.style);
        });

        list.forEach((sr)=>{
            this.#inlineStyleRanges.push(sr);
        });
    }

    /**
     * 分割段落
     * @param {number} position 分割的位置
     * @returns {Block | null}
     */
    split(position) {
        if(position<0 || position>this.length){
            return null;
        }

        const newBlock = Block.create(this.#text.substr(position));
        // 继承到下一段的样式
        newBlock.style = {...newBlock.style, ...this.style};
        this.#inlineStyleRanges.forEach((sr)=>{
            if(position<=sr.max || position===this.#text.length){
                /**
                 * 拷贝一份样式，给下一段使用
                 * @type {InlineStyleRange}
                 */
                // const copy = sr.clone();
                if(position<sr.min){
                    // copy.begin -= position;
                    newBlock.addStyle(sr.style, sr.begin-position, sr.length);
                }
                else if(position===this.#text.length){
                    newBlock.addStyle(sr.style, 0, 0);
                }
                else if(position>=sr.min){
                    newBlock.addStyle(sr.style, 0, sr.length-(position-sr.min));
                }
            }
        }, this);

        //更新本段
        this.#text = this.#text.substr(0, position);
        this.#inlineStyleRanges = this.#inlineStyleRanges.filter((sr)=>{
            if(sr.min<position) {
                sr.max = Math.min(sr.max, this.#text.length);
                return sr;
            }
            return null;
        });
        return newBlock;
    }

    /**
     *
     * @param {{}}     style
     * @param {number} offset   开始位置
     * @param {number} length   长度
     */
    addStyle(style, offset=0, length=0){

        let styleName = Object.keys(style)[0];

        //判断是否需要覆盖样式
        let isCover = false;
        for (let i = 0; i < this.#inlineStyleRanges.length; i++) {
            const sr = this.#inlineStyleRanges[i];
            const _styleName = Object.keys(sr.style)[0];
            if(_styleName === styleName){
                if(sr.begin === offset && sr.length === length ) {
                    this.#inlineStyleRanges[i].style = style;
                    isCover = true;
                    break;
                }
            }
        }

        if(!isCover){
            let sr = InlineStyleRange.create(offset, length, style);
            sr.style = style;
            this.#inlineStyleRanges.push(sr);
        }
    }

    /**
     * 清除样式
     */
    clearStyle(){
        for (let i = 0; i < this.#inlineStyleRanges.length; i++) {
            InlineStyleRange.release(this.#inlineStyleRanges[i]);
        }
        this.type = BlockType.BLOCK;
        this.#inlineStyleRanges.length = 0;
        this.style = null;
    }

    /**
     * key
     * @returns {string}
     */
    get key() { return this.#key; }

    /**
     * 文字长度
     * @returns {number}
     */
    get length() {
        return this.text.length;
    }

    /**
     * 样式
     * @returns {Array.<InlineStyleRange>}
     */
    get inlineStyleRanges() {
        return this.#inlineStyleRanges;
    }

    /**
     * @returns {string}
     */
    get text() { return this.#text; }
    set text(value) {
        this.#text = value;
    }

    /**
     *
     * @param text
     * @returns {Block}
     */
    static create(text='') {
        if(objPool.length>0){
            const block = objPool.pop();
            block.text = text;
            return block;
        }
        return new Block(text);
    }

    /**
     *
     * @param {Block} block
     */
    static release(block) {
        block.text = '';
        for (let i = 0; i < block.inlineStyleRanges.length; i++) {
            InlineStyleRange.release(block.inlineStyleRanges[i]);
        }
        block.inlineStyleRanges.length = 0;
        block.type = BlockType.BLOCK;
        block.style = null;
        objPool.push(block);
    }

    /**
     * 克隆
     * @returns {Block}
     */
    clone() {
        const block = Block.create(this.#text);
        this.inlineStyleRanges.forEach((sr)=>{
            block.addStyle(sr.style, sr.begin, sr.length);
        });
        block.type = this.type;
        block.style = {...block.style, ...this.style};
        return block;
    }
}

