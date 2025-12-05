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
		
		//this.selected = null;
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

	_selectIndex(index){
		let found = null;
		
		for(let i = 0; i < this.repeat.children.length; i++)
		{
			let el = this.repeat.children[i];

			if (i == index)
			{
				found = el.data;
				el.classList.add(this.cssClass + "-selected");
			}
			else {
				el.classList.remove(this.cssClass + "-selected");
			}
		}
		
		return found;
	}
 
 	_select(value){
		
		let found = false;
		
		for(let i = 0; i < this.repeat.children.length; i++)
		{
			let el = this.repeat.children[i];

			if (el.data == value)
			{
				found = true;
				el.classList.add(this.cssClass + "-selected");
			}
			else {
				el.classList.remove(this.cssClass + "-selected");
			}
		}
		return false;
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
		if (this.hasAttribute("menu")) {
            let menuData = this.getAttribute("menu");
            this.repeat.setAttribute(":data", menuData);// "d[1]");
        }

		this.repeat.setAttribute("i-skip-data", "skip");

        this.repeat.on("click", async (e) => {
            			
            if (e.target == self.repeat)
                return;

            for(let i = 0; i < self.repeat.children.length; i++)
            {
                let el = self.repeat.children[i];

                if (el.contains(e.target))
                {
					
                    el.classList.add(self.cssClass + "-selected");
					
					try {
						self._emit("input", { value: el.data });
						//self._emit("select", { value: el.data });
						self._skipQuery = true;
						await self.setData(el.data);
						self._skipQuery = false;

						//self.selected = el.data;
					}
					catch {
					
					}
                }
                else {
                    el.classList.remove(self.cssClass + "-selected");
                }
            }
        });

		let html = this.innerHTML;
		
        // get repeated item
        this.repeat.innerHTML = html;
		this.innerHTML = "";

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

        //if (this.repeat.data.length == 0)
          //  await self.setData(null);
    }


    async setData(value, radix) {

        await super.setData(value, radix);

		if (!this._skipQuery) {
			await this._query();
					
			if (!this._select(value))
				super.setData(this._selectIndex(0), radix);

		}
		
        try {
            this._emit("select", { value });
        }
        catch (ex) {

        }


        if (this._checkValidity() && this.isAuto)
            this.revert();

    }



});