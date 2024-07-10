import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class Check extends IUIElement {
    constructor(properties) {
        super(IUI.extend(properties, { cssClass: 'check' }));

        this._register("check");

        this.on("click", () => {
            this.checked = !this.checked;
        });
    }

    get checked() {
        return this.hasAttribute("checked");
    }

    set checked(value) {
        this.check(value);
        this._emit("check", { checked: value });
    }

    check(value) {
        if (value)
            this.setAttribute("checked", "checked");
        else
            this.removeAttribute("checked");
    }

    create() {
        this.field = this.getAttribute("field");
    }

    async setData(value, radix) {
        await super.setData(value, radix);
        if (value != null && this.field != null)
            this.value = value[this.field];
        else if (this.field != null)
            this.value = null;
    }


    modified(name, value) {
        if (name == this.field) {
            this.value = value;
        }
    }

    get value() {
        return this.checked;
    }

    set value(value) {
        this.checked = value;
    }

});