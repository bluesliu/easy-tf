import React, {Component} from "react";
import {TextField, TextFieldState} from "../src/index";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.tfState = TextFieldState.create();
        this.tfState.editable = true;
        // this.tfState.style
    }

    render() {
        return (
            <div>
                <TextField tfState={this.tfState}/>
            </div>
        );
    }
}

