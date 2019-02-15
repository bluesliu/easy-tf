import {Event} from "easy-event";

export default class TextFieldEvent extends Event{
    static RENDER = Symbol('render');
}