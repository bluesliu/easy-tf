import {Range} from "int-range";

export default  class SelectionRange {

    #startKey = '';
    #startOffset = 0;
    #endKey = '';
    #endOffset = 0;

    toString() {
        return (
            'startKey: ' +
            this.startKey +
            ', startOffset:' +
            this.startOffset +
            ', ' +
            'endKey: ' +
            this.endKey +
            ', endOffset:' +
            this.endOffset
        );
    }

    /**
     * 选区字符长度
     * @returns {number}
     */
    get length() {
        return Math.abs(this.startOffset - this.endOffset);
    }

    /**
     * 获得当前光标范围
     * @returns {*|*}
     */
    get range() {
        return Range.create(this.startOffset, this.length);
    }

    get startOffset(){ return this.#startOffset; }
    get startKey() { return this.#startKey; }
    get endOffset(){ return this.#endOffset; }
    get endKey() { return this.#endKey; }

    /**
     *
     * @param {string} startKey
     * @param {number} startOffset
     * @param {string} endKey
     * @param {number} endOffset
     */
    update(startKey, startOffset, endKey, endOffset){
        this.#startKey = startKey;
        this.#startOffset = startOffset;
        this.#endKey = endKey;
        this.#endOffset = endOffset;
    }

    reset(){
        this.#startOffset = this.#endOffset = 0;
        this.#startKey = this.#endKey = '';
    }
}