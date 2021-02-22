import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class DropDown extends IUIElement {
    constructor() {
        super({"direction": "down" });

        var self = this;

        this._register("visible");

        this.visible = false;

       // this.classList.add(this.cssClass + "-" + this.direction);

        this.menu = this.getElementsByClassName(this.cssClass + "-menu")[0];


        //this.arrow = document.createElement("div");
        //this.arrow.className = this.customClass + "-arrow";


        //this.el.appendChild(this.arrow);

        if (this.getAttribute("fixed"))
        {
            this._fixed = true;
            document.body.appendChild(this.menu);
        }

        //this.el.appendChild(this.menu);

        this.addEventListener("click", function (e) {
            var t = e.target
            do {
                if (t == self.menu)
                    return;
            } while (t = t.parentElement)

            self.setVisible(!self.visible);
        });

        IUI._menus.push(this);

        /*
        document.body.addEventListener("click", function(e)
            {
                if (!self.visible)
                    return;
        	
                var x = e.target;
                do {
                    if (x == self.menu || x == self.el)
                        return;
                } while (x = x.parentNode)
            	
                if (e.target.id == "iui_app_background")
                    return;
    
                self.setVisible(false);
            });*/
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

    set data(value) {
       // console.log("DD", value);
        super.data = value;
//        console.log("VV", this._uiBindings, this._dataBindings);
    }
    setVisible(visible) {
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