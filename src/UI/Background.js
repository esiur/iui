import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class Background extends IUIElement {
    constructor() {
        super({ cssClass: 'background' });


        this.classList.add(this.cssClass);
        this._register("visible");

    }
 

    create() {

    }

    hide() {
        return this.setVisible(false);
    }

    show() {
        return this.setVisible(true);
    }

    setVisible(value) {
        this.visible = value;
        if (value) {
            this.classList.add(this.cssClass + "-visible");
        }
        else {
            this.classList.remove(this.cssClass + "-visible");
        }

        this._emit("visible", value);

        return this;
    }
});