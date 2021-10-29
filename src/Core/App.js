import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class App extends IUIElement {
    constructor() {
        super();
    }

    create() {
        this._register("load");
        window.app = this;
    }

    created() {
        IUI.bind(this, this, "/");
        //IUIElement._make_bindings(this);
        this.render();
        this._emit("load", { app: this });
        this.loaded = true;
    }

});