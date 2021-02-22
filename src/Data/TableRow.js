import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";


export default IUI.module(class TableRow extends IUIElement {
    constructor() {
        super();
    }

    create() {
        //this.style.display = "none";
        this.style.display = "table-row";
        console.log("TR");
    }
});