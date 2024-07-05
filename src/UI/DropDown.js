import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import Layout from "../Data/Layout.js";
import Menu from "./Menu.js";
export default IUI.module(class DropDown extends IUIElement {

    visible = false;

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

        this.addEventListener("click", function (e) {
            var t = e.target
            do {
                if (t == self.menu)
                    return;
            } while (t = t.parentElement)

            self.setVisible(!self.visible);
        });


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

    getOffset() {
        var el = this;
        var _x = 0;
        var _y = 0;
        while (!isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        _x += window.pageXOffset;
        _y += window.pageYOffset;

        return { top: _y, left: _x, width: this.clientWidth, height: this.clientHeight };
    }


    
    setVisible(visible) {

        if (visible == this.visible)
            return;

        if (visible) {
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
    }

    setVisibleOld(visible) {
        this.visible = visible;

        if (!this.fixed) {
            if (visible) {
                this.menu.classList.add(this.cssClass + "-menu-visible");
                this.classList.add(this.cssClass + "-visible");
            }
            else {
                this.menu.classList.remove(this.cssClass + "-menu-visible");
                this.classList.remove(this.cssClass + "-visible");
            }
        }
        else {
            if (visible) {
                var rect = this.getBoundingClientRect();

                var menuWidth = this.menu.clientWidth;
                var menuHeight = this.menu.clientHeight;

                if (menuWidth > document.body.clientWidth) {
                    menuWidth = (document.body.clientWidth - 10);
                    this.menu.style.width = menuWidth + "px";
                }


                var startX = rect.left + (rect.width / 2 - menuWidth / 2);


                if (this.direction == "up") {
                    //					var menuTop = rect.top - this.arrow.clientHeight - this.menu.clientHeight;
                    var menuTop = rect.top - this.menu.clientHeight;

                    if (menuTop < 0) {
                        menuTop = 5;
                        //						this.menu.style.height = (rect.top  - this.arrow.clientHeight ) + "px";
                        this.menu.style.height = (rect.top) + "px";

                        this.menu.classList.add(this.cssClass + "-menu-oversized");
                    }
                    else
                        this.menu.classList.remove(this.cssClass + "-menu-oversized");


                    //this.arrow.classList.remove(this.customClass + "-arrow-down");
                    //this.arrow.classList.add(this.customClass + "-arrow-up");
                    //this.arrow.style.top = ( rect.top - this.arrow.clientHeight ) + "px";
                    this.menu.style.top = (menuTop) + "px";
                }
                else {
                    //var menuTop = rect.top + rect.height + this.arrow.clientHeight;
                    var menuTop = rect.top + rect.height;

                    //this.arrow.classList.remove(this.customClass + "-arrow-up");
                    //this.arrow.classList.add(this.customClass + "-arrow-down");
                    //this.arrow.style.top = ( rect.top + rect.height ) + "px";

                    this.menu.style.top = menuTop + "px";

                    if (menuTop + menuHeight > document.body.clientHeight) {
                        this.menu.style.height = (document.body.clientHeight - menuTop) + "px";
                        this.menu.classList.add(this.cssClass + "-menu-oversized");
                    }
                    else {
                        this.menu.classList.remove(this.cssClass + "-menu-oversized");
                    }
                }

                if (startX < 0)
                    startX = 5;
                else if (startX + menuWidth > document.body.clientWidth)
                    startX = document.body.clientWidth - menuWidth - 5;


                //this.arrow.style.left = (rect.left + (rect.width/2 - this.arrow.clientWidth/2)) + "px";
                this.menu.style.left = startX + "px";

                //this.arrow.classList.add(this.customClass + "-arrow-visible");
                this.menu.classList.add(this.cssClass + "-menu-visible");
                this.classList.add(this.cssClass + "-visible");

            }
            else {
                //this.arrow.classList.remove(this.customClass + "-arrow-visible");
                this.menu.classList.remove(this.cssClass + "-menu-visible");
                this.classList.remove(this.cssClass + "-visible");
            }
        }

        this._emit("visible", { visible});

        return this;

    }
});