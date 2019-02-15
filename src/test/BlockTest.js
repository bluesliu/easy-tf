import React,{Component} from 'react';
import TextBlock from "../component/TextBlock";
import Block from "../model/Block";
import {Color, FontSize, FontWeight, FontFamily} from "../util/StyleUtil";
import BlockType from "../model/BlockType";

export default class BlockTest extends Component{
    render() {

        const block = Block.create('这是一个Block，啊啊啊啊啊啊啊啊啊');
        block.addStyle(Color.Red, 1,5);
        block.addStyle(FontSize.XX_LARGE, 4,5);
        block.addStyle(FontWeight.BOLD, 4,5);
        block.addStyle(FontFamily.STSong, 11);
        block.addStyle(FontFamily.STSong, 11);
        block.type = BlockType.QUOTE;

        return(
            <TextBlock block={block}/>
        )
    }
}