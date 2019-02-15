import {Range} from 'int-range';
import {randomString} from "../util/randomString";

let objPool = [];

/**
 * 行内样式范围
 */
export default class InlineStyleRange extends Range {

    #key;

    /**
     *
     * @param {number} begin
     * @param {number} length
     * @param {{}|null} style
     */
    constructor(begin, length, style = null) {
        super(begin, length);

        /**
         * 样式的值
         * 例如：'{color:"red"}'
         * @returns {{}}
         */
        this.style = style;

        this.#key = randomString(5);
    }

    get key() { return this.#key; }
    // /**
    //  *
    //  * @returns {String}
    //  */
    // get styleName() {
    //     if (this.style === null) {
    //         return '';
    //     }
    //     return Object.keys(this.style)[0];
    // }
    //
    // /**
    //  *
    //  * @returns {String}
    //  */
    // get styleValue() {
    //     if (this.styleName == null) {
    //         return '';
    //     }
    //     return this.style[this.styleName];
    // }

    /**
     *
     * @param {InlineStyleRange} sr
     * @returns {boolean}
     */
    equal(sr) {
        if(!super.equal(sr)){
            return false;
        }

        if(!sr.style && !this.style){
            return true;
        }

        if(sr.style && this.style){
            const keys1 = Object.keys(this.style);
            const keys2 = Object.keys(sr.style);
            if(keys1.length !== keys2.length){
                return false;
            }
            for (let i = 0; i < keys1.length; i++) {
                const key = keys1[i];
                if(this.style[key] !== sr.style[key]){
                    return false;
                }
            }
            return true;
        }

        return false;
    }

    /**
     *
     * @returns {InlineStyleRange}
     */
    clone() {
        const sr = new InlineStyleRange(this.begin, this.length);
        sr.style = {...sr.style, ...this.style};
        return sr;
    }

    /**
     *
     * @param begin
     * @param length
     * @param style
     * @returns {InlineStyleRange}
     */
    static create(begin, length, style = null) {
        if (objPool.length > 0) {
            const obj = objPool.pop();
            obj.begin = begin;
            obj.length = length;
            obj.style = style;
            return obj;
        } else {
            return new InlineStyleRange(begin, length, style);
        }
    }

    /**
     *
     * @param {InlineStyleRange} obj
     */
    static release(obj){
        if(obj instanceof InlineStyleRange){
            obj.style = null;
            obj.begin = obj.length = 0;
            objPool.push(obj);
        }
    }
}