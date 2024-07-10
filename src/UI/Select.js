import { IUI, iui } from '../Core/IUI.js';
import IUIElement from '../Core/IUIElement.js';
import Menu from '../UI/Menu.js';
import Layout from '../Data/Layout.js';
import Repeat from '../Data/Repeat.js';

export default IUI.module(class Select extends IUIElement {
    constructor() {
        super({
            visible: false,
            searchlist: false,
            hasArrow: true,
            //hasAdd: false,
            updateTextBox: true,
            query: (x) => null,
            //_formatter: (x) => x,
            _autocomplete: false,
            //cssClass: 'select'
        });

        this._register("select");
        this._register("input");
        this._register("add");
    }

    disconnectedCallback() {
        //console.log("Select removed", this);
        if (!this.searchlist && this.menu)
            app.removeChild(this.menu);
        
    }

    connectedCallback(){
        super.connectedCallback();
        if (!this.searchlist && this.menu)
            app.appendChild(this.menu);        
    }
    
    get autocomplete() {
        return this._autocomplete;
    }

    // get formatter() {
    //     return this._formatter;
    // }

    // set formatter(value) {
    //     this._formatter = value;
    // }

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

        this._autocomplete = this.hasAttribute("autocomplete");
        //this.hasAdd = this.hasAttribute("add") || this.hasAdd;

        let self = this;

        //if (this._autocomplete)
          //  this.cssClass += "-autocomplete";



          
        this.repeat = new Repeat();
        this.repeat.cssClass = "select-menu-repeat";
        //this.repeat.innerHTML = this.innerHTML;

        if (this.hasAttribute("menu")) {
            let menuData = this.getAttribute("menu");
            this.repeat.setAttribute(":data", menuData);// "d[1]");
        }

        if (this.hasAttribute("footer")) {
            let footer = this.getAttribute("footer");
            this.footer = document.createElement("div");
            this.footer.className = this.cssClass + "-footer";
            this.footer.innerHTML = footer;// "${d[0]}";
        }

        this.menu = new Menu({ cssClass: this.cssClass + "-menu", "target-class": "" });
        
        this.menu.on("click", async (e) => {
            
            if (e.target != self.textbox && e.target != self.footer && e.target !== self.menu) {
                await self.setData(e.target.data);

                self._emit("input", { value: e.target.data });

                self.hide();
            }
        }).on("visible", x=> { if (!x.visible) self.hide()});


        if (this._autocomplete) {
            this.textbox = document.createElement("input");
            this.textbox.type = "search";
            this.textbox.className = this.cssClass + "-textbox";

            if (this.placeholder)
                this.textbox.placeholder = this.placeholder;

            this.textbox.addEventListener("keyup", function (e) {
                if (e.keyCode != 13) {
                    self._query(0, self.textbox.value);
                }
            });

            this.textbox.addEventListener("search", function (e) {
               // console.log(e);
            });

            this.menu.appendChild(this.textbox);

        }

        // get collection
        let layout = Layout.get(this, "div", true, true); 

        
        if (layout != null && layout.label != undefined && layout.menu != undefined) {
            this.label = layout.label.node;
            this.repeat.appendChild(layout.menu.node);
        }
        else if (layout != null && layout.null != null)
        {
            this.label = layout.null.node;
            this.repeat.appendChild(layout.null.node.cloneNode(true));
        }
        else
        {
            this.label = document.createElement("div");
            this.label.innerHTML = this.innerHTML;
            this.repeat.innerHTML = this.innerHTML;
        }

        // clear everything else
        //this.innerHTML = "";
        
        this.label.className = this.cssClass + "-label";

        this.appendChild(this.label);

        this.label.addEventListener("click", function (e) {
            self.show();
        });

        this.menu.appendChild(this.repeat);
        if (this.footer != null)
            this.menu.appendChild(this.footer);

    
        if (this.hasArrow) {
            this.arrow = document.createElement("div");
            this.arrow.className = this.cssClass + "-arrow";
            this.appendChild(this.arrow);


            this.arrow.addEventListener("click", function (e) {
                if (self.visible)
                    self.hide();
                else
                    self.show();
            });
        }

        if (this.hasAdd) {
            this._add_button = document.createElement("div");
            this._add_button.className = this.cssClass + "-add";
            this.appendChild(this._add_button);

            this._add_button.addEventListener("click", function (e) {
                self._emit("add", { value: self.data })
            });
        }


        if (this.searchlist)
            this.appendChild(this.menu);
        else
        {
            app.appendChild(this.menu);
            if (app.loaded)
            {


                await IUI.create(this.menu);

                IUI.bind(this.menu, false, "menu", this.__i_bindings?.scope, false);
                // update referencing
                this.__i_bindings?.scope?.refs?._build();

                await IUI.created(this.menu);

                /////console.log("Append", this.menu);
                //await this.menu.create();
                
                //IUI.bind(this.menu, false, "menu");
                //await IUI.create(this.menu);

                //await await IUI.create(e);

            }
        }

        this.addEventListener("click", function (e) {
            if (e.target == self.textbox)
                self.show();
        });
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }

    set disabled(value) {
        if (this._autocomplete) {
            this.textbox.disabled = value;
        }

        if (value) {
            this.setAttribute("disabled", value);
        }
        else {
            this.removeAttribute("disabled");
        }


    }
    /*
    set(item) {

        if (this.autocomplete != undefined) {
            if (item != null)
                this.textbox.value = this.layout.text.formatter ? this.layout.text.formatter(item[this.layout.text.field], item) : item[this.layout.text.field];
            else
                this.textbox.value = "";
        } else {
            if (item != null)
                this.label.innerHTML = this.layout.text.formatter ? this.layout.text.formatter(item[this.layout.text.field], item) : item[this.layout.text.field];
            else
                this.label.innerHTML = "";
        }

        this.selected = item;
        this._emit("select", item);
    }
    */

    show() {
        this.setVisible(true);
        //this.textbox.focus();
    }

    hide() {
        this.setVisible(false);
        //this.textbox.focus();
    }

    clear() {
        if (this.autocomplete !== undefined)
            this.textbox.value = "";
        //else
          //  this.label.innerHTML = "";

        //this.menu.clear();
        this.response.start = 0;
        this.selected = null;
    }

    async _query() {

        
        if (this._autocomplete)
            if (this.disabled)
                return;

        let self = this;
        let text = this._autocomplete ? this.textbox.value : null;
        let res;

        if (this.query instanceof Array) {
            res = this.query;
        }
        else if (this.query instanceof Function) {
            res = this.query(0, text)
            if (res instanceof Promise)
                res = await res;
        }
        
        
        
        //if (res[1].length == 0)
          //  await self.setData(null);

        await this.menu.setData(res);

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


    setVisible(visible) {

        if (visible == this.visible)
            return;

        //console.log("SLCT: SetVisible", visible);

        if (visible) {
            this._query(0);

            // show menu
            var rect = this.getBoundingClientRect();
            this.menu.style.width = (this.clientWidth - this._computeMenuOuterWidth()) + "px";
            this.menu.style.paddingTop = rect.height + "px";
            this.menu.setVisible(true, rect.left, rect.top);//, this.menu);
            this.visible = true;

            this.classList.add(this.cssClass + "-visible");

            if (this._autocomplete)
                setTimeout(() => {
                    this.textbox.focus();        
                }, 100);

        }
        else {
            this.visible = false;
            this.classList.remove(this.cssClass + "-visible");
            
            this.menu.hide();
        }

        //this.textbox.focus();

    }

    _computeMenuOuterWidth() {

        return this.menu.offsetWidth - this.menu.clientWidth;
        /*
        var style = window.getComputedStyle(this.menu.el, null);
        var paddingLeft = style.getPropertyValue('padding-left');
        var paddingRight = style.getPropertyValue('padding-right');
        var borderLeft = style.getPropertyValue('border-left');
        var borderRight = style.getPropertyValue('border-right');

        paddingLeft = parseInt(paddingLeft.substr(0, paddingLeft.length - 2));
        paddingRight = parseInt(paddingRight.substr(0, paddingRight.length - 2));
        borderLeft = parseInt(borderLeft.substr(0, borderLeft.length - 2));
        borderRight = parseInt(borderRight.substr(0, borderRight.length - 2));

        return paddingLeft + paddingRight + borderLeft + borderRight;
        */
    }

});