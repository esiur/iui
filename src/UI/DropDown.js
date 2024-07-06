import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import Layout from "../Data/Layout.js";
import Menu from "./Menu.js";
export default IUI.module(class DropDown extends IUIElement {

    //visible = false;

    constructor() {
        super({"direction": "down" });

        this._register("visible");
    }



    async create()
    {
        await super.create();

        this.menu = new Menu({ cssClass: this.cssClass + "-menu", "target-class": "" });

        let layout = Layout.get(this, "div", true, true); 

        if (layout != null && layout.label != undefined && layout.menu != undefined) {
            this.label = layout.label.node;
            this.menu.appendChild(layout.menu.node);
        }
        else if (layout != null && layout.null != null)
        {
            this.label = layout.null.node;
            this.menu.appendChild(layout.null.node.cloneNode(true));
        }
        else
        {
            this.label = document.createElement("div");
            this.label.innerHTML = this.innerHTML;
        }

        this.label.className = this.cssClass + "-label";

        this.appendChild(this.label);

        let self = this;

        this.label.addEventListener("click", function (e) {
            self.show();
        });

        if (this.getAttribute("fixed"))
        {
            this._fixed = true;
            document.body.appendChild(this.menu);
        }

        app.appendChild(this.menu);

        if (app.loaded)
        {
            await IUI.create(this.menu);

            IUI.bind(this.menu, false, "menu", this.__i_bindings?.scope, false);
            // update referencing
            this.__i_bindings?.scope?.refs?._build();

            await IUI.created(this.menu);
        }
    }  

    async setData(value){

        //debugger;
        await super.setData(value);
        await this.menu.setData(value);

    }

    set fixed(value) {
        if (value)
            document.body.appendChild(this.menu);
        this._fixed = value;
    }

    get fixed() {
        return this._fixed;
    }

    hide() {
        return this.setVisible(false);
    }

    show() {
        return this.setVisible(true);
    }


    disconnectedCallback() {
        if (this.menu)
            app.removeChild(this.menu);
    }

    connectedCallback(){
        super.connectedCallback();
        if (this.menu)
            app.appendChild(this.menu);        
    }
    
    setVisible(visible) {

        if (visible == this.menu.visible)
            return;

        if (visible) {
            // show menu
            var rect = this.getBoundingClientRect();
            //this.menu.style.width = (this.clientWidth - this._computeMenuOuterWidth()) + "px";
            this.menu.style.marginTop = rect.height + "px";
            this.menu.setVisible(true, rect.left, rect.top);//, this.menu);

            this.classList.add(this.cssClass + "-visible");

            if (this._autocomplete)
                setTimeout(() => {
                    this.textbox.focus();        
                }, 100);

        }
        else {

            this.classList.remove(this.cssClass + "-visible");            
            this.menu.hide();
        }

    }

    _computeMenuOuterWidth() {
        return this.menu.offsetWidth - this.menu.clientWidth;
    }

});