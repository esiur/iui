import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import RefsCollection from "./RefsCollection.js";

export default IUI.module(class App extends IUIElement {
    constructor() {
        super();
        this.refs = new RefsCollection(this);
    }

    create() {
        this._register("load");
        window.app = this;
    }


    created() {

        IUI.bind(this, this, "/", {app: this, refs: this.refs});

        // update referencing
        this.refs._build();

        //IUIElement._make_bindings(this);
        this.render();
        this._emit("load", { app: this });
        this.loaded = true;
    }

});