import { IUI } from "../Core/IUI.js";
import IUIElement from "../Core/IUIElement.js";

export default IUI.module(class Tab extends IUIElement {
    constructor(properties) {
        super(properties);
    }

    create() {

    }

    get title() {
        return this.getAttribute("title");
    }

    get selected() {
        return this.hasAttribute("selected");// == "1" || selected == "yes" || selected == "true");
    }
});