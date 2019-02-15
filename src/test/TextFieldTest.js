import React,{Component} from 'react';
import {TextField, BlockType, Block, TextFieldState, StyleUtil, SelectionUtil} from '../easy-tf';

export default class TextFieldTest extends Component{
    render() {


        //
        const block2 = new Block('01234567890abcdefghijk');
        block2.type = BlockType.BLOCK;

        const tfState = TextFieldState.create();
        tfState.content.appendBlock(block2);
        // tfState.content.appendBlock(block);
        tfState.editable = true;
        tfState.style = {position: "absolute"
                        ,width: "400px"
                        ,height: "200px"
                        ,top: "200px"};
        // tfState.text = "0123456789abcdefghijklmnopqrst"

        let getArgValue = (idx)=>{
            return document.getElementById("input"+idx).value;
        };

        return(
            <div>
                <input id="input1" placeholder="arg1"/>
                <input id="input2" placeholder="arg2"/>
                <br/>
                <button onClick={(e)=>{
                    const offset = getArgValue(1);
                    const len = getArgValue(2);
                    tfState.deleteText(offset, len);
                }}>删除 arg1开始 arg2长度</button>

                <button onClick={(e)=>{
                    SelectionUtil.selectAll(tfState)
                }}>全选</button>

                <button onClick={(e)=>{
                    tfState.setTextStyle(StyleUtil.FontWeight.BOLD, tfState.selection.startOffset, tfState.selection.length);
                }}>加粗</button>

                <button onClick={(e)=>{
                    const curBlock = tfState.getCursorBlock();
                    if(curBlock){
                        tfState.setBlockType(curBlock.key, BlockType.QUOTE);
                    }
                }}>设置为引用</button>

                <button onClick={(e)=>{
                    tfState.clearStyle();
                }}>清除样式</button>

                <TextField tfState={tfState}/>
            </div>
        )
    }
}