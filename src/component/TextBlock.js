import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {rangeCut} from 'int-range';
import InlineStyleRange from "../model/InlineStyleRange";
import BlockType from "../model/BlockType";
import "../css/index.css";

export default class TextBlock extends Component{

    static propTypes = {
        block: PropTypes.object.isRequired
    };

    render() {
        const block = this.props.block;
        return TextBlock.renderBlock(block);
    }


    static renderBlock(block){
        if(block.type === BlockType.QUOTE){
            return <blockquote data-key={block.key} id={block.key} style={block.style}>{TextBlock.renderContent(block)}</blockquote>
        }
        else{
            return <p data-key={block.key} id={block.key} style={block.style}>{TextBlock.renderContent(block)}</p>;
        }
    }

    /**
     *
     * @param {Block} block
     */
    static renderContent(block) {
        let list = [];
        let offset = 0;

        if(block.text.length===0){
            return '\n';
        }

        let inlineStyles = TextBlock.parseInlineStyleRanges(block);
        while (offset < block.text.length) {
            let text = '';
            const is = inlineStyles.shift();
            if(is){
                if(offset < is.begin){
                    text = block.text.substring(offset, is.begin);
                    list.push(text);
                }

                offset = is.begin;

                text = block.text.substr(offset, is.length);
                list.push(<span key={is.key} data-key={is.key} style={is.style}>{text}</span>);

                offset += is.length;
            }
            else{
                text = block.text.substring(offset, block.text.length);
                list.push(text);

                offset = block.text.length;
            }
        }
        return list;
    }


    static parseInlineStyleRanges(block) {

        const inlineStyles = [];

        const ranges = rangeCut(...block.inlineStyleRanges);
        ranges.forEach((range) => {

            let style = null;
            for (let i = 0; i < block.inlineStyleRanges.length; i++) {
                const sr = block.inlineStyleRanges[i];
                if (range.begin >= sr.begin
                    && (range.begin < sr.begin + sr.length || block.length === 0)) {
                    if (style === null) {
                        style = {};
                    }
                    if (sr.style != null) {
                        style = {...style, ...sr.style}
                    }
                }
            }

            if (style != null) {
                inlineStyles.push(InlineStyleRange.create(range.begin, range.length, style));
            }
        });

        //TODO 合并inlineStyles

        return inlineStyles;
    }
}