import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class Input extends IUIElement {
    constructor() {
        super({ formatter: (x) => x });
        this._register("input");
        this._register("change");
    }

    _checkValidity() {
        if (this.validate != null) {
            try {
                let valid = this.validate.apply(this);
                if (!valid) {
                    this.setAttribute("invalid", "");
                    this.classList.add(this.cssClass + "-invalid");
                    return false;
                }
                else {
                    this.removeAttribute("invalid");
                    this.classList.remove(this.cssClass + "-invalid");
                    return true;
                }
            }
            catch (e) {
                console.log("Validation Error", e);
                return false;
            }
        }

        return true;
    }

    get caption(){
        return this.getAttribute("caption");// this._span.innerHTML;
    }

    set caption(value){
        this.setAttribute("caption", value);
        this._span.innerHTML = value;
    }

    create() {

        this.isAuto = this.hasAttribute("auto");
        this.field = this.getAttribute("field");
        
        
        if (this.field != null)
        {
            this.setAttribute(":data", `d['${this.field}']`)
            this.setAttribute("async:revert", `d['${this.field}'] = await this.getData()`);
        }

        this._span = document.createElement("span");
        this._span.innerHTML =  this.getAttribute("caption");

        this._input = document.createElement("input");
        this._input.placeholder = " ";

        let self = this;

        this._input.addEventListener("input", () => {
            if (self._checkValidity() && self.isAuto)
                this.revert();
                //self.data[self.field] = self.value;
        });

        this._input.addEventListener("change", () => {
            self._emit("change", { value: self.value });
        });

        this.type = this.hasAttribute("type") ? this.getAttribute("type").toLowerCase() : "text";

        this.accept = this.getAttribute("accept");

        this.appendChild(this._input);
        this.appendChild(this._span);

        if (this.type == "password")
        {
            this._eye = document.createElement("div");
            this._eye.className = this.cssClass + "-eye";
            this._eye.addEventListener("mousedown", ()=>{
                self._input.type = "text";
                self._eye.classList.add(self.cssClass + "-eye-active");
            });
            this._eye.addEventListener("mouseup", ()=>{
                self._input.type = "password";
                self._eye.classList.remove(self.cssClass + "-eye-active");
            });

            this.appendChild(this._eye);

        }

    }

    async updateAttributes(deep, parentData) {
        await super.updateAttributes(deep, parentData);
        //this._input.type = this.type;
        //this._input.value = this.value;
    }

    set type(value) {
        this._input.type = value;
    }

    get type() {
        return this._input.type;
    }

    set accept(value){
        this._input.accept = value;
    }

    get accept() {
        return this._input.accept;
    }

    set disabled(value) {
        if (value)
            this.setAttribute("disabled", "disabled");
        else
            this.removeAttribute("disabled");

        this._input.disabled = value;
    }

    get disabled() {
        return this._input.disabled;
    }

    set enabled(value) {
        this.disabled = !value;
    }

    get enabled() {
        return !this._input.disabled;
    }

    async setData(value) {

        await super.setData(value);

        if (this.type == "checkbox")
            this._input.checked = value;
        else if (this.type == "date") 
            this._input.value = value != null ? value.toISOString().slice(0, 10) : value;
        else if (this.type == null || this.type == "text" || this.type == "search" || this.type == "password")
            this._input.value = value == null ? '' : value;
        else
            this._input.value = value;

        if (this._checkValidity() && this.isAuto)
            this.revert();

        
        /*
        await super.setData(value);
        if (value != null && this.field != null)
            this.value = value[this.field];
        else if (this.field != null)
            this.value = null;
            */
    }


    // modified(name, value) {
    //     if (name == this.field) {
    //         this.value = value;
    //     }
    // }

    async getData(){
        if (this.type == "checkbox")
            return this._input.checked;
        else if (this.type == "date")
            return new Date(this._input.value);
        else if (this.type == "file")
            return new Uint8Array(await this._input.files[0].arrayBuffer());
        else
            return this._input.value;
    }

    get data()
    {
        if (this.type == "checkbox")
        return this._input.checked;
        else if (this.type == "date")
            return new Date(this._input.value);
        else if (this.type == "file")
        {            
            return new Promise((resolve)=>{
                this._input.files[0].arrayBuffer().then((x)=>{
                    resolve(new Uint8Array(x));
                });
            });
        }
        else
            return this._input.value;
    }

    /*
    get data() {
        if (this.type == "checkbox")
            return this._input.checked;
        else if (this.type == "date")
            return new Date(this._input.value);
        else if (this.type == "file")
        {

        }
        else
            return this._input.value;
    }
*/

    // set value(value) {

    //     if (this.type == "checkbox")
    //         this._input.checked = value;
    //     else if (this.type == "date") 
    //         this._input.value = value != null ? value.toISOString().slice(0, 10) : value;
    //     else if (this.type == null || this.type == "text")
    //         this._input.value = value == null ? '' : value;
    //     else
    //         this._input.value = value;

    //     this._checkValidity();
    // }
});