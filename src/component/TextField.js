import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFieldEvent from "../event/TextFieldEvent";
import TextContent from "./TextContent";
import TimerUtil from "../util/TimerUtil";
import SelectionUtil from "../util/SelectionUtil";
import * as Nav from "../util/NavigatorUtil";
import "../css/index.css";

export default class TextField extends Component {

    /**
     * 正在进行输入法
     * @type {boolean}
     */
    #isCompositionStart = false;

    /**
     * 检测鼠标是否按下
     * @type {boolean}
     */
    #mouseDown = false;

    static propTypes = {
        tfState: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        /**
         *
         * @type {{renderData: Object, tfState: TextFieldState}}
         */
        this.state = {
            tfState: this.props.tfState,
            renderData: null
        };

        this.tfState.addEventListener(TextFieldEvent.RENDER, this.onRenderHandler, this);
        this.onMouseUpHandler = this.onMouseUpHandler.bind(this);
    }

    // 组件卸载
    componentWillUnmount() {
        const {tfState} = this.props;
        tfState.removeEventListener(TextFieldEvent.RENDER, this.onRenderHandler);
        document.removeEventListener('mouseup', this.onMouseUpHandler);
    }

    // 组件渲染完成
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.renderData.needCursor){   //请求定位光标，这个操作必须在DOM节点渲染完成后执行
            SelectionUtil.set(this.tfState);
        }
    }

    // tfState请求渲染
    onRenderHandler(event) {
        this.state.renderData = {...this.state.renderData, ...event.data};
        this.setState({});
    }

    render() {
        const {key, editable, style, content} = this.props.tfState;

        return (
            <div id={key}
                 className="TextField"
                 suppressContentEditableWarning={true}  //用来屏蔽内容可编辑的警告
                 contentEditable={editable}
                 style={style}
                 onMouseDown={(e) => {
                     this.onMouseDownHandler(e)
                 }}
                 onFocus={(e) => {
                     SelectionUtil.save(this.tfState);
                 }}
                 onBlur={(e) => {
                     SelectionUtil.save(this.tfState);
                 }}
                 onKeyDown={(e) => {
                     this.onKeyDownHandler(e)
                 }}
                 onKeyUp={(e) => {
                     this.onKeyUpHandler(e)
                 }}
                 onCompositionStart={(e) => {
                     this.onCompositionStartHandler(e)
                 }}
                 onCompositionEnd={(e) => {
                     this.onCompositionEndHandler(e)
                 }}><TextContent content={content}/></div>
        )
    }

    onMouseDownHandler(e) {
        this.#mouseDown = true;
        document.addEventListener('mouseup', this.onMouseUpHandler);
        SelectionUtil.save(this.tfState);
    }

    onMouseUpHandler(e) {
        this.#mouseDown = false;
        document.removeEventListener('mouseup', this.onMouseUpHandler);
        TimerUtil.setTimeout(() => {
            SelectionUtil.save(this.tfState);
        }, this, 0);
    }

    onKeyDownHandler(e) {
        if (this.#mouseDown) {
            e.preventDefault();
            return;
        }

        const {key, keyCode, ctrlKey, metaKey, altKey} = e;
        const {selection, content} = this.tfState;
        // TODO 可配置

        // 向上移动光标的时候，如果前面的Block是\n，光标就会跳过此Block，造成无法定位的问题
        if (key === 'ArrowUp') {
            const curBlock = content.getBlocksByRange(selection.range)[0];
            if (curBlock) {
                const list = content.getBlockList();
                for (let i = 1; i < list.length; i++) {
                    if (list[i].key === curBlock.key) {
                        const beforeBlock = list[i - 1];
                        if (beforeBlock.length === 0) {
                            e.preventDefault();
                            const range = selection.getBlockRange(beforeBlock.key);
                            selection.update(beforeBlock.key, range.begin, beforeBlock.key, range.begin);
                            selection.set();
                            return;
                        }
                    }
                }
            }
        }

        if (key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'Meta' || key === 'CapsLock' || key === 'Escape'
            || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
            return;
        }
        const isWin = Nav.isWin();
        const isMac = Nav.isMac();
        if (isWin || isMac) {
            const ctrlOrMeta = isWin ? e.ctrlKey : e.metaKey;
            const isAlt = e.altKey;

            if (ctrlOrMeta && (keyCode === 67 || keyCode === 86 || keyCode === 88)) {   //ctrl + c,v,x
                return;
            }
            if (isMac && isAlt && (keyCode === 73 || keyCode === 85 || keyCode === 78 || keyCode === 69)) {   //在mac系统下 alt + i,u,n,e 会出现 Dead
                return;
            }
            if (keyCode === 65 && ((isMac && metaKey) || (isWin && ctrlKey))) { //全选
                SelectionUtil.selectAll(this.tfState);
                return;
            }
        }

        e.preventDefault();
        TimerUtil.setTimeout(this.onInputText, this, 0, key, keyCode, ctrlKey, metaKey, altKey)
    }

    onInputText(key, keyCode, ctrlKey, metaKey, altKey) {
        const tfState = this.tfState;
        const {selection, content} = tfState;

        if (this.#isCompositionStart) {
            return;
        }

        if (key === 'Backspace') {
            const delRange = SelectionUtil.getPressBackSpaceRange(tfState);
            tfState.deleteText(delRange.begin, delRange.length);
        } else if (key === 'Delete') {
            const delRange = SelectionUtil.getPressDeleteRange(tfState);
            tfState.deleteText(delRange.begin, delRange.length);
        } else {
            // 输入行为
            // 如有当前光标框选了内容，就先把这些内容删除
            const delRange = selection.range;
            if(delRange.length>0){
                content.deleteTextByRange(delRange);
            }
            if (key === 'Enter') {
                tfState.wrap(selection.startOffset);
            }
            else if (key === 'Tab') {
                tfState.insertText('\t', selection.startOffset);
            }
            else{
                tfState.insertText(key, selection.startOffset);
            }
        }
    }

    onKeyUpHandler(e) {
        // 按方向键后，更新光标位置
        if (!this.#isCompositionStart
            && (e.key === 'ArrowRight'
                || e.key === 'ArrowLeft'
                || e.key === 'ArrowUp'
                || e.key === 'ArrowDown')) {
            SelectionUtil.save(this.tfState);
        }
    }

    /**
     * 输入法开始
     * @param e
     */
    onCompositionStartHandler(e) {
        e.preventDefault();
        this.#isCompositionStart = true;
        const tfState = this.tfState;
        const selection = tfState.selection;
        if (selection.length > 0) {
            tfState.deleteText(selection.startOffset, selection.length)
        }
    }

    /**
     * 输入法结束 插入输入法生成的内容
     * @param e
     */
    onCompositionEndHandler(e) {
        e.preventDefault();
        const data = e.data;    //输入法返回的文字
        const tfState = this.tfState;
        const selection = tfState.selection;
        TimerUtil.setTimeout(() => {
            this.#isCompositionStart = false;
            tfState.insertText(data, selection.startOffset)
        }, this, 0);
    }

    /**
     *
     * @returns {TextFieldState}
     */
    get tfState() {
        return this.state.tfState;
    }

    /**
     *
     * @returns {Content}
     */
    get content() {
        return this.tfState.content;
    }
}