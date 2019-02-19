import Content from "./Content";
import SelectionRange from "./SelectionRange";
import {randomString} from "../util/randomString";
import {Event, EventDispatcher} from "easy-event";
import {Range} from "int-range";
import TextFieldEvent from "../event/TextFieldEvent";
// import Block from "./Block";
import BlockType from "./BlockType";

/**
 *
 * @type {Array.<TextFieldState>}
 */
let objPool = [];

export default class TextFieldState extends EventDispatcher {

    #key = randomString(5);
    #content = Content.create();
    #selection = new SelectionRange();
    #editable = false;

    #style = null;

    /**
     * 删除从 offset 开始，length 长度的字符，如果 offset 或 length 未设置，则删除光标选中区域
     * @param {number} offset    删除字符的开始位置
     * @param {number} length    删除字符的长度
     */
    deleteText(offset=undefined, length=undefined) {
        const selection = this.#selection;
        const content = this.#content;
        offset = Number(offset);
        length = Number(length);
        if(isNaN(offset) || isNaN(length)){
            offset = selection.startOffset;
            length = selection.length;
        }

        if(length===0){
            return;
        }

        if(content.blockCount===0){
            return;
        }

        const delRange = Range.create(offset, length);

        // 删除了带样式的段落，清除样式，不要真正删除它
        if(delRange.length===1){
            const block = content.getBlocksByRange(delRange)[0];
            if(block && block.length===0 && block.type!==BlockType.BLOCK){
                block.type = BlockType.BLOCK;
                this.doRender();
                return;
            }
        }
        // this.#deleteTextByRange(delRange);
        const cursorBlock = content.getBlocksByRange(delRange)[0];
        content.deleteTextByRange(delRange);
        if(cursorBlock){
            //更新光标位置
            const startOffset = delRange.begin;
            const startKey = cursorBlock.key;
            selection.update(startKey, startOffset, startKey, startOffset);
        }
        this.doRender(cursorBlock);
    }

    /**
     * 在 offset 位置换行
     * @param {number} offset
     */
    wrap(offset){
        const selection = this.#selection;
        const content = this.#content;

        if(content.blockCount === 0){
            content.appendBlockText('');
            content.appendBlockText('');
            const secondBlock = content.getBlockList()[1];
            //更新光标位置
            selection.update(secondBlock.key, 1, secondBlock.key, 1);
        }
        else{
            const curBlock = content.getBlockByOffset(offset);
            if(!curBlock) return;

            const blockRange =  content.getBlockRange(curBlock.key);
            const newBlock = curBlock.split(selection.startOffset - blockRange.begin);

            const idx = content.getBlockIndex(curBlock.key);
            content.insertBlock(newBlock, idx+1);

            //更新光标位置
            const startOffset = selection.startOffset+1;
            const startKey = newBlock.key;
            selection.update(startKey, startOffset, startKey, startOffset );
        }
        this.doRender(true);
    }

    /**
     * 插入文本
     * @param {String} text
     * @param {number} offset
     */
    insertText(text, offset){
        const {selection,content} = this;
        let curBlock;
        if (content.blockCount === 0) {
            curBlock = content.appendBlockText(text);
        } else {
            curBlock = content.getBlockByOffset(offset);
            if (curBlock === null) return;

            const blockRange = content.getBlockRange(curBlock.key);
            const localOffset = offset - blockRange.begin;
            curBlock.insertText(text, localOffset);
            // 回收
            Range.release(blockRange);
        }

        //更新光标位置
        const startOffset = offset + text.length;
        const startKey = curBlock.key;
        selection.update(startKey, startOffset, startKey, startOffset);

        this.doRender(true);
    }

    /**
     * 设置行内文本样式
     * @param {Object} style
     * @param {number} offset
     * @param {number} length
     */
    setTextStyle(style, offset = 0, length = undefined) {
        this.#content.setTextStyle(style, offset, length);
        this.doRender();
    }

    /**
     * 设置段落样式
     * @param {string} key
     * @param {{}} style
     */
    setBlockStyle(key, style){
        this.#content.setBlockStyle(key, style);
        this.doRender();
    }

    /**
     * 设置段落类型
     * @param {string} key
     * @param {symbol} type
     */
    setBlockType(key, type){
        this.#content.setBlockType(key, type);
        this.doRender();
    }

    /**
     * 获得光标起始位置的block
     * @returns {Block}
     */
    getCursorBlock(){
        return this.#content.getBlockByOffset(this.#selection.startOffset);
    }

    /**
     * 清除样式
     */
    clearStyle(){
        // this.#style = null;
        this.#content.clearStyle();
        this.doRender();
    }

    release(){
        Content.release(this.#content);
        this.#selection = null;
        this.#editable = false;
        this.#style = null;
    }

    /**
     * 获得文本内容
     * @returns {string}
     */
    get text() {
        return this.#content.getText();
    }

    get length() {
        return this.#content.length;
    }

    set text(value) {
        this.#selection.reset();
        Content.release(this.#content);
        this.#content = Content.create();
        this.#content.appendBlockText(value);
        this.doRender();
    }

    get key() {
        return this.#key;
    }

    get content() {
        return this.#content;
    }

    get selection() {
        return this.#selection;
    }

    get editable() {
        return this.#editable;
    }

    set editable(value) {
        this.#editable = value;
        this.doRender();
    }

    get style() {
        return this.#style;
    }

    set style(value) {
        this.#style = value;
        this.doRender();
    }

    doRender(needCursor=false) {
        this.dispatchEvent(Event.create(TextFieldEvent, TextFieldEvent.RENDER, {needCursor}));
    }

    /**
     *
     * @returns {TextFieldState}
     */
    static create() {
        if (objPool.length > 0) {
            return objPool.pop();
        }
        return new TextFieldState();
    }

    /**
     *
     * @param {TextFieldState} tfState
     */
    static release(tfState) {
        if(tfState instanceof TextFieldState){
            tfState.release();
            objPool.push(tfState);
        }
    }
}