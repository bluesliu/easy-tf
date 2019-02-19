import Block from './Block';
import {Range, rangeIntersect} from "int-range";
/**
 *
 * @type {Array.<Content>}
 */
const objPool = [];

/**
 * 编辑器的内容
 */
export  default class Content {

    /**
     *
     * @type {Array.<Block>}
     */
    #blockList = [];

    /**
     *
     * @returns {Array<Block>}
     */
    getBlockList() {
        return this.#blockList;
    }

    /**
     *
     * @param {string} key
     * @returns {Block}
     */
    getBlock(key) {
        const arr = this.#blockList.filter((block) => {
            return block.key === key;
        });
        return arr[0];
    }

    /**
     *
     * @param idx
     * @returns {Block}
     */
    getBlockAt(idx) {
        return this.#blockList[idx];
    }

    /**
     * 返回与range相交的block列表
     * @param {Range} range
     * @return {Array.<Block>}
     */
    getBlocksByRange(range){
        const list = [];
        this.#blockList.forEach((block)=>{
            const blockRange = this.getBlockRange(block.key);
            if(blockRange.isIntersect(range)){
                list.push(block);
            }
        },this);
        return list;
    }

    /**
     * 返回 offset 位置所在的 block
     * @param offset
     * @returns {Block}
     */
    getBlockByOffset(offset) {
        const range = Range.create(offset, 0);
        const block = this.getBlocksByRange(range)[0];
        Range.release(range);
        return block;
    }

    /**
     * 返回block的index
     * @param key
     * @returns {number}
     */
    getBlockIndex(key) {
        for (let i = 0; i < this.#blockList.length; i++) {
            if(this.#blockList[i].key===key){
                return i;
            }
        }
        return -1;
    }

    /**
     * 插入段落
     * @param {Block} block
     * @param {number} index
     */
    insertBlock(block, index){
        this.#blockList.splice(index, 0, block);
    }

    /**
     * 获得段落数量
     * @returns {number}
     */
    get blockCount() {
        return this.#blockList.length;
    }

    /**
     * 尾部追加段落
     * @param text
     * @returns {Block}
     */
    appendBlockText(text = '') {
        const block = Block.create(text);
        this.appendBlock(block);
        return block;
    }

    /**
     * 尾部追加段落
     * @param block
     */
    appendBlock(block) {
        this.#blockList.push(block);
    }

    /**
     * 删除block
     * @param {string} key
     */
    delBlock(key) {
        for (let i = 0; i < this.#blockList.length; i++) {
            if (this.#blockList[i].key === key) {
                Block.release(this.#blockList[i]);
                this.#blockList.splice(i, 1);
                return;
            }
        }
    }

    /**
     * 获得编辑器纯文本内容
     * @returns {string}
     */
    getText() {
        let text = '';
        this.#blockList.forEach((block, index, array) => {
            text += block.text;
            if (index + 1 < array.length) {
                text += '\n';
            }
        });
        return text;
    }

    /**
     * 获得文本长度
     * @returns {number}
     */
    get length() {
        return this.getText().length;
    }

    /**
     * 获得段落的范围
     * @param {string} key
     * @returns {Range}
     */
    getBlockRange(key) {
        const blockList = this.#blockList;
        let blockOffset = 0;
        for (let i = 0; i < blockList.length; i++) {
            const _block = blockList[i];
            if(_block.key === key){
                return Range.create(blockOffset, _block.length+1);
            }
            blockOffset += (_block.length+1);
        }
        return null;
    };

    /**
     * 删除range范围内的内容
     * @param range
     * @returns {boolean} 存在删除内容返回 true ； 否则返回 false
     */
    deleteTextByRange(range) {
        const blockList = this.#blockList;
        // 保存需要融合段落的key
        const keyArr = [];
        for (let i = blockList.length-2; i >= 0 ; i--) {
            let _block = blockList[i];
            let _blockRange = this.getBlockRange(_block.key);
            // 删除了尾部的换行
            if(range.min<=_blockRange.max && range.max>=_blockRange.max){
                if(keyArr.length===0){
                    keyArr.unshift(blockList[i+1].key);
                }
                keyArr.unshift(_block.key);
            }
        }
        if(keyArr.length>=2){
            const first = this.getBlock(keyArr.shift());
            const margeLen = keyArr.length;                     //融合段落的数量
            range.length -= margeLen;                           //因为融合了，所以要减去多余的换行

            keyArr.forEach((key)=>{
                const block = this.getBlock(key);
                if(block){
                    first.merge(block);
                    const index = blockList.indexOf(block);
                    blockList.splice(index,1);
                    Block.release(block);
                }
            }, this);
        }
        for (let i = 0; i < blockList.length; i++) {
            const block = blockList[i];
            const blockRange = this.getBlockRange(block.key);
            if(blockRange.isIntersect(range)){
                //全局范围转换为局部范围
                const localRange = new Range(range.begin-blockRange.begin, range.length);
                //删除文字
                block.deleteText(localRange);
                return true;
            }
        }
        return false;
    }

    /**
     * 设置行内文本样式
     * @param {{}} style
     * @param {number} offset
     * @param {number} length
     */
    setTextStyle(style, offset = 0, length = undefined) {
        if(length===undefined){
            length = this.getText().length;
        }
        length = Math.min(this.getText().length, length);

        const styleRange = new Range(offset, length);
        //const {selection} = this.#editorState;
        for (let i = 0; i < this.#blockList.length; i++) {
            const _block = this.#blockList[i];
            const blockRange = this.getBlockRange(_block.key);
            const interRange = rangeIntersect(styleRange, blockRange)[0];
            if(interRange !== undefined){
                _block.addStyle(style, interRange.begin-blockRange.begin, interRange.length);
            }
        }
    }

    /**
     * 设置段落样式
     * @param {string} key
     * @param {{}} style
     */
    setBlockStyle(key, style){
        const block = this.getBlock(key);
        if(block) {
            block.style = {...block.style, ...style};
        }
    }

    /**
     * 设置段落类型
     * @param {string} key
     * @param {symbol} type
     */
    setBlockType(key, type){
        const block = this.getBlock(key);
        if(block && block.type !== type) {
            block.type = type;
        }
    }

    /**
     * 清除样式
     */
    clearStyle(){
        this.#blockList.forEach((block)=>{
            block.clearStyle();
        });
    }

    /**
     *
     * @returns {Content}
     */
    static create() {
        if (objPool.length > 0) {
            return objPool.pop();
        }
        return new Content();
    }

    /**
     *
     * @param {Content} content
     */
    static release(content) {
        const list = content.getBlockList();
        while (list.length > 0) {
            const block = list.pop();
            Block.release(block);
        }
        objPool.push(content);
    }
}