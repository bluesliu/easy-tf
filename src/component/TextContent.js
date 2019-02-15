import React,{Component} from "react";
import PropTypes from "prop-types";
import TextBlock from "./TextBlock";

export default class TextContent extends Component{
    static propTypes = {
        content : PropTypes.object.isRequired
    };

    render() {
        const {content} = this.props;
        return (
            <div className="TextContent">{this.renderBlockList(content)}</div>
        );
    }

    /**
     *
     * @param content
     * @returns {Array}
     */
    renderBlockList(content) {
        let list = [];
        content.getBlockList().forEach((v) => {
            list.push(<TextBlock key={v.key} block={v}/>)
        });
        return list;
    }
}