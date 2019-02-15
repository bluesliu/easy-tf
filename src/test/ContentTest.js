import React,{Component} from 'react';
import Block from "../model/Block";
import {Color, FontSize, FontWeight, FontFamily} from "../util/StyleUtil";
import BlockType from "../model/BlockType";
import Content from "../model/Content";
import TextContent from "../component/TextContent";

export default class ContentTest extends Component{
    render() {

        const block = Block.create('这是一个Block，啊啊啊啊啊啊啊啊啊');
        block.addStyle(Color.Red, 1,5);
        block.addStyle(FontSize.XX_LARGE, 4,5);
        block.addStyle(FontWeight.BOLD, 4,5);
        block.addStyle(FontFamily.STSong, 11);
        block.addStyle(FontFamily.STSong, 11);
        block.type = BlockType.QUOTE;

        const block2 = block.clone();
        block2.text = "01234567890abcdefghijk";
        block2.type = BlockType.BLOCK;

        const content = Content.create();
        content.appendBlock(block);
        content.appendBlock(block2);

        return(
            <TextContent content={content}/>
        )
    }
}