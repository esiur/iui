
import IUIElement from "../Core/IUIElement.js";
import Tab from "./Tab.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class Tabs extends IUIElement {

    constructor() {
        super({
            selected: null,
            list: [],
            _y: 0,
            _x: 0,
            auto: true,
        });
    }


    create()
    {
        var self = this;

        this._register("select");


        this._bar = document.createElement("div");
        this._bar.classList.add(this.cssClass + "-bar");

        this._ext = document.createElement("span");
        this._ext.className = this.cssClass + "-bar-ext";
        this._bar.appendChild(this._ext);


        
        //this.insertAdjacentElement("afterBegin", this._bar);

        this._body = document.createElement("div");
        this._body.className = this.cssClass + "-body";

        this.appendChild(this._bar);
        this.appendChild(this._body);



        var items = [];// this.getElementsByClassName("tab");

        for (var i = 0; i < this.children.length; i++)
            if (this.children[i] instanceof Tab)
                items.push(this.children[i]);

        this._observer = new ResizeObserver(x => {
            self._body.style.height = x[0].target.offsetHeight + "px";// x[0].contentRect.height + "px";
        });

        items.map(x => self.add(x));


        this.addEventListener("touchstart", function (e) {

            var x = e.target;
            do {
                if (x == self)
                    break;
                var sy = window.getComputedStyle(x)["overflow-x"];
                if (x.scrollWidth > x.clientWidth && (sy == "scroll" || sy == "auto"))
                    return;
            } while (x = x.parentElement)

            self._x = e.originalEvent ? e.originalEvent.touches[0].clientX : e.touches[0].clientX;
            self._y = e.originalEvent ? e.originalEvent.touches[0].clientY : e.touches[0].clientY;
        }, { passive: true });

        this.addEventListener("touchmove", function (e) {
            if (!self._x || !self._y) {
                return;
            }

            var xUp = e.originalEvent ? e.originalEvent.touches[0].clientX : e.touches[0].clientX;
            var yUp = e.originalEvent ? e.originalEvent.touches[0].clientY : e.touches[0].clientY;
            var xDiff = document.dir == "rtl" ? xUp - self._x : self._x - xUp;
            var yDiff = self._y - yUp;


            var index = self.list.indexOf(self.selected);

            if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                if (xDiff > 0) {
                    if (index < self.list.length - 1) {
                        self.select(self.list[index + 1]);
                        //self.selected.scrollIntoView();
                    }
                    /* left swipe */
                } else {

                    if (index > 0)
                        self.select(self.list[index - 1]);

                    /* right swipe */
                }
            } else {
                if (yDiff > 0) {
                    /* up swipe */
                } else {
                    /* down swipe */
                }
            }
            /* reset values */
            self._x = null;
            self._y = null;

        }, { passive: true });
    }

    created() {
        //this._updateSize();
    }

    add(item) {

        var label =  document.createElement("i-check");
        label.innerHTML = item.title;

        this._ext.insertAdjacentElement("beforebegin", label);

        label.className = this.cssClass + "-button";

        item.classList.add(this.cssClass + "-content");
        label.content = item;
        item.label = label;

        this._body.append(item);


        //this._bar.appendChild(label);
        //this._bar.insertAdjacentElement("afterBegin", label);

        this.list.push(item);
        var self = this;
        label.on("check", function (v) {
            //if (v && !self._neglect)
            self.select(item);
        });

        //this._updateSize();
        //this.updateBindings();

        if (item.selected)
            this.select(item);

        
        return this;
    }

    //_updateSize() {
    //    for (var i = 0; i < this._body.children.length; i++) {
    //        if (this._body.clientHeight < this._body.children[i].offsetHeight) {
    //            this._body.style.height = this._body.children[i].offsetHeight + "px";
    //        }
    //    }
    //}

    select(item) {
        var tab;
        if (item instanceof Tab)
            tab = item;
        else if (typeof o === 'string' || o instanceof String)
            for (var i = 0; i < this.list.length; i++)
                if (this.list[i].id == item) {
                    tab = item;
                    break;
                }
                else if (!isNaN(item))
                    tab = this.list[i];

        //this._neglect = true;

        var self = this;

        this.list.forEach(function (i) {
            if (i == tab)
                tab.label.check(true);// set(true, false);
            else {
                i.classList.remove(self.cssClass + "-content-active");
                i.label.check(false);// set(false, false);
            }
        });


        //this._neglect = false;
        tab.classList.add(this.cssClass + "-content-active");

        if (this.selected != null)
            this._observer.unobserve(this.selected);
        this.selected = tab;
        this._observer.observe(this.selected);

        if (document.dir == "rtl")
            this._bar.scrollLeft = tab.label.offsetLeft + tab.label.clientWidth;
        else
            this._bar.scrollLeft = tab.label.offsetLeft - tab.label.clientWidth;

        
        this._emit("select", tab);
        return this;
    }

});