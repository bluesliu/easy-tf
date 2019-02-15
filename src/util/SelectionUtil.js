import TimerUtil from "./TimerUtil";

let tryCount = 0;

export default class SelectionUtil {

    /**
     * 保存光标位置
     * @param {TextFieldState} tfState
     */
    static save(tfState) {
        let sel = window.getSelection();
        let selRange;

        if(sel.rangeCount===0){
            if(tryCount++ < 10){
                TimerUtil.setTimeout(SelectionUtil.save, null, 0, tfState);
            }
            else{
                tryCount = 0;
            }
            return;
        }

        tryCount = 0;

        try {
            selRange = sel.getRangeAt(0);
        } catch (err) {
            return;
        }

        const {key, selection, content} = tfState;

        if(content.blockCount===0){
            selection.reset();
            console.log('光标位置:', selection.toString());
            return;
        }

        let getKey = (findNode, offset) => {
            if(findNode.className === 'TextContent'){
                let block = content.getBlockList()[Math.max(0, offset-1)];
                if(block !== undefined){
                    return block.key;
                }
                else{
                    return '';
                }
            }

            let depthFind = (container)=>{
                if(container === findNode){
                    find = true;
                    return;
                }
                if(container.nodeName === '#text'){
                    return;
                }
                for (let i = 0; i < container.childNodes.length; i++) {
                    depthFind(container.childNodes[i]);
                    if(find){
                        return;
                    }
                }
            };

            const tfDom = document.getElementById(key);
            if(!tfDom)return '';
            const contentDom = tfDom.childNodes[0];
            if(!contentDom)return '';
            let find = false;
            for (let i = 0; i < contentDom.childNodes.length; i++) {
                const blockNode = contentDom.childNodes[i];
                depthFind(blockNode);

                if(find){
                    return blockNode.dataset['key'];
                }
            }
            return '';
        };

        let getGlobalOffset = (findNode, offset) => {
            if(findNode.className==='TextContent')
            {
                const block = content.getBlockList()[Math.max(0,offset-1)];
                if(block === undefined){
                    return 0;
                }
                const blockRange = content.getBlockRange(block.key);
                if(blockRange===null){
                    return 0;
                }
                return blockRange.max+1;
            }

            let depthFind = (container)=>{
                if(container === findNode){
                    count += offset;
                    find = true;
                    return;
                }
                if(container.nodeName === '#text'){
                    count += container.length;
                    return;
                }
                for (let i = 0; i < container.childNodes.length; i++) {
                    depthFind(container.childNodes[i]);
                    if(find){
                        return;
                    }
                }
            };

            const tfDom = document.getElementById(key);
            if(!tfDom)return 0;
            const contentDom = tfDom.childNodes[0];
            if(!contentDom)return 0;
            let find = false;
            let count = 0;
            for (let i = 0; i < contentDom.childNodes.length; i++) {
                const blockNode = contentDom.childNodes[i];
                depthFind(blockNode);

                // 从第2段开始，就要累加前面的换行
                if(i>0 && contentDom.childNodes[i-1].innerText !== '\n'){
                    count += 1;
                }

                if(find){
                    return count;
                }
            }
            return 0;
        };

        const startKey = getKey(selRange.startContainer, selRange.startOffset);
        const startOffset = getGlobalOffset(selRange.startContainer, selRange.startOffset);
        const endKey = getKey(selRange.endContainer, selRange.endOffset);
        const endOffset = getGlobalOffset(selRange.endContainer, selRange.endOffset);
        selection.update(startKey, startOffset, endKey, endOffset);

        console.log('光标位置:', selection.toString());
    }

    /**
     * 应用光标位置
     * @param {TextFieldState} tfState
     */
    static set(tfState) {
        let {selection} = tfState;

        let depthFind = (result, container, globalOffset)=>{
            if(container.nodeName === '#text' || container.nodeName === 'BR'){
                const len = container.length===undefined?0:container.length;
                if(globalOffset <= result.count+len){
                    result.offset = globalOffset-result.count;
                    result.node = container;
                    result.find = true;
                    return;
                }
                else{
                    result.count += container.length;
                }
            }
            for (let i = 0; i < container.childNodes.length; i++) {
                depthFind(result, container.childNodes[i], globalOffset);
                if(result.find){
                    return;
                }
            }
            // fixme 这里退出会产生异常
            return;
        };

        /**
         * 获得光标所在的DOM节点，和在此DOM节点上的偏移量
         * @param key
         * @param gloablOffset
         */
        const getPosition = (key, gloablOffset)=>{
            const result = {node:null, offset:0, count:0, find:false};
            const tfDOM = document.getElementById(tfState.key);
            const contentDOM = tfDOM.childNodes[0];
            for (let i = 0; i < contentDOM.childNodes.length; i++) {
                const blockNode = contentDOM.childNodes[i];
                if((blockNode.nodeName === 'P' && blockNode.dataset['key'] === key)
                    || (blockNode.nodeName === 'BLOCKQUOTE' && blockNode.dataset['key'] === key))
                {
                    //当前blockNode就是要找的段落
                    //找到最深层的节点
                    for (let j = 0; j < blockNode.childNodes.length; j++) {
                        const child = blockNode.childNodes[j];
                        //深度查找
                        depthFind(result, child, gloablOffset);
                        if(result.find){
                            return result;
                        }
                    }
                }
                else{
                    result.count += blockNode.innerText.length;
                    if(i+1<contentDOM.childNodes.length && blockNode.innerText!=='\n'){      //加上换行
                        result.count += 1;
                    }
                }
            }
            return result;
        };

        const position1 = getPosition(selection.startKey, selection.startOffset);
        const position2 = getPosition(selection.endKey, selection.endOffset);
        const selRange = document.createRange();
        selRange.setStart(position1.node, position1.offset);
        selRange.setEnd(position2.node, position2.offset);
        const sel = window.getSelection();//获取当前选中区域
        sel.removeAllRanges();//移出所有的选中范围
        sel.addRange(selRange);//添加新建的范围
    }

    /**
     * 全选
     * @param {TextFieldState} tfState
     */
    static selectAll(tfState){
        const {content, selection} = tfState;
        const blockList = content.getBlockList();
        if(blockList.length > 0){
            const firstBlock = blockList[0];
            const lastBlock = blockList[blockList.length-1];
            selection.update(firstBlock.key, 0, lastBlock.key, content.getText().length);
            SelectionUtil.set(tfState);
        }
    }

    /**
     * 返回按下键盘退格键的删除范围
     * @param {TextFieldState} tfState
     * @returns {Range}
     */
    static getPressBackSpaceRange(tfState){
        const {content, selection} = tfState;
        const delRange = selection.range;
        if(content.blockCount===0){
            delRange.begin = 0;
            delRange.length = 0;
        }
        else if(delRange.length === 0){ //当前光标没有框选，所以删除的范围是左边一格
            delRange.begin -= 1;
            delRange.begin = Math.max(delRange.begin, 0);
            delRange.length = 1;
        }
        return delRange;
    }

    /**
     * 返回按下键盘Del键的删除范围
     * @param {TextFieldState} tfState
     * @returns {Range}
     */
    static getPressDeleteRange(tfState){
        const {content, selection} = tfState;
        const delRange = selection.range;
        if(content.blockCount===0){
            delRange.begin = 0;
            delRange.length = 0;
        }
        else if(delRange.length === 0){ //当前光标没有框选，所以删除的范围是右边一格
            // delRange.begin += 1;
            delRange.begin = Math.min(delRange.begin, tfState.text.length);
            delRange.length = 1;
        }
        return delRange;
    }
}

