import { IUI, iui } from '../Core/IUI.js';
import IUIElement from '../Core/IUIElement.js';
import Menu from '../UI/Menu.js';
import Layout from '../Data/Layout.js';
import Repeat from '../Data/Repeat.js';

export default IUI.module(class Radio extends IUIElement {
    constructor() {
        super({
            query: (x) => null,
        });

        this._register("select");
        this._register("input");
        this._register("add");
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
            catch (ex) {
                console.log("Validation Error", ex);
                return false;
            }
        }

        return true;
    }

    set hasAdd(value) {
        if (value)
            this.setAttribute("add", "add");
        else
            this.removeAttribute("add");
    }

    get hasAdd() {
        return this.hasAttribute("add");
    }

    async create() {

        this.isAuto = this.hasAttribute("auto");
        this.field = this.getAttribute("field");


        if (this.field != null)
        {
            this.setAttribute(":data", `d['${this.field}']`)
            this.setAttribute(":revert", `d['${this.field}'] = this.data`);
        }


        let self = this;
          
        this.repeat = new Repeat();
        this.repeat.cssClass = this.cssClass + "-repeat";
        
        this.repeat.on("click", async (e) => {
            
            if (e.target !== self.repeat)
                return;

            for(let i = 0; i < self.repeat.children.length; i++)
            {
                let el = self.repeat.children[i];

                if (el.contains(e.target))
                {
                    el.classList.add(self.cssClass + "-selected");
                    await self.setData(el.data);
                    self._emit("input", { value: el.data });

                }
                else {
                    el.classList.remove(self.cssClass + "-selected");
                }
            }
        });

        // get repeated item
        this.repeat.innerHTML = this.innerHTML;

        this.appendChild(this.repeat);
    
        if (this.hasAdd) {
            this._add_button = document.createElement("div");
            this._add_button.className = this.cssClass + "-add";
            this.appendChild(this._add_button);

            this._add_button.addEventListener("click", function (e) {
                self._emit("add", { value: self.data })
            });
        }


        
        if (app.loaded)
        {
            await IUI.create(this.repeat);

            IUI.bind(this.repeat, false, "radio", this.__i_bindings?.scope, false);
            // update referencing
            this.__i_bindings?.scope?.refs?._build();

            await IUI.created(this.repeat);
        }

        await this._query();
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }

    set disabled(value) {
        if (value) {
            this.setAttribute("disabled", value);
        }
        else {
            this.removeAttribute("disabled");
        }
    }

    clear() {
        this.response.start = 0;
        this.selected = null;
    }

    async _query() {

        let self = this;
        let res;

        if (this.query instanceof Array) {
            res = this.query;
        }
        else if (this.query instanceof Function) {
            res = this.query(0)
            if (res instanceof Promise)
                res = await res;
        }
        
        await this.repeat.setData(res);

        if (this.repeat.data.length == 0)
            await self.setData(null);
    }


    async setData(value, radix) {

        // this.label.innerHTML = "";
            
        await super.setData(value, radix);

        try {
            //let text = this.formatter(value);
            // this.label.innerHTML = text == null ? "" : text;

            this._emit("select", { value });
        }
        catch (ex) {
            //console.log(ex);
            this._emit("select", { value });
        }

        //this._checkValidity();


        if (this._checkValidity() && this.isAuto)
            this.revert();

    }



});