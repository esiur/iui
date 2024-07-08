import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class IUIWindow extends IUIElement {
    constructor() {
        super({ closeable: true, draggable: false, focus: false });

        this._register("resize");
        this._register("move");
        this._register("close");

        this._uid = "d:" + Math.random().toString(36).substring(2);

    }

    static moduleName = "window";

    async create() {

        await super.create();

        //debugger;

        var self = this;

        this.tabIndex = 0;

        // create header
        this._header = document.createElement("div");
        this._header.className = this.cssClass + "-header";

        if (this.draggable)
            this._header.setAttribute("draggable", true);

        var f = this.getElementsByClassName(this.cssClass + "-footer");
        this._footer = f.length > 0 ? f[0] : null;

        var b = this.getElementsByClassName(this.cssClass + "-body");
        //this.body = b.length > 0 ? b[0]: null;

        if (b.length == 0) {
            this._body = document.createElement("div");
            this._body.className = this.cssClass + "-body";

            while (this.children.length > (this._footer == null ? 0 : 1))
                this._body.appendChild(this.children[0]);

            this.insertAdjacentElement("afterBegin", this._body);

        }
        else
            this._body = b[0];

        //if (this.icon) {
        this._icon = document.createElement("div");
        this._icon.className = this.cssClass + "-icon";
        this._icon.style.setProperty("--icon", `url('${this.icon}')`);
        this._header.appendChild(this._icon);
        //}

        this._caption = document.createElement("div");
        this._caption.className = this.cssClass + "-caption";
        this._caption.innerHTML = this.caption;

        this._subtitle = document.createElement("div");
        this._subtitle.className = this.cssClass + "-subtitle";
        this._subtitle.innerHTML = this.subtitle;

        this._tools = document.createElement("div");
        this._tools.className = this.cssClass + "-tools";

        this._header.appendChild(this._caption);
        this._header.appendChild(this._subtitle);
        this._header.appendChild(this._tools);

        if (this.closeable) {
            this._close = document.createElement("div");
            this._close.className = this.cssClass + "-tools-close button";
            this._close.addEventListener("click", function () {
                self._emit("close");
            });
        }

        //this.addEventListener("mousedown", function (e) {
        //    self.setFocus(true);
        //});

        this.insertAdjacentElement("afterBegin", this._header);
    }

    setHeaderVisible(value) {
        this._header.style.display = value ? "" : "none";
        //this._updateSize();
    }

    setCloseVisible(value) {
        if (this.closeable)
            this._close.style.display = value ? "" : "none";
    }

    get icon() {
        return this.getAttribute("icon");
    }

    set icon(value) {
        this._icon.style.setProperty("--icon", `url('${value}')`);
        this.setAttribute("icon", value);
    }


    /*
    setFocus(v) {
        this.focus = v;

        var self = this;

        if (v) {
            this.classList.add(this.cssClass + "-active");

            return;
            var last = IUI._nav_list[IUI._nav_list.length - 1];

            if (last && last != this) {
                last.classList.remove(this.cssClass + "-active");
                last.focus = false;
            }

            if (last != this) {
                if (window.location.hash != "#" + this._uid) {
                    IUI._nav_ignore = true;
                    window.location.hash = this._uid;
                    //window.location.replace("#" + this._uid);
                }
            }

            var i = IUI._nav_list.indexOf(this);
            if (i > -1)
                IUI._nav_list.splice(i, 1);

            IUI._nav_list.push(this);

        }
        else {
            var last = IUI._nav_list[IUI._nav_list.length - 1];
            if (last == this) {
                IUI._nav_list.pop();
                last = IUI._nav_list.pop();

                IUI._nav_list.push(this);


                if (last) {
                    last.classList.add(this.cssClass + "-active");
                    last.focus = true;
                    IUI._nav_list.push(last);
                    if (window.location.hash != "#" + last._uid) {
                        IUI._nav_ignore = true;
                        window.location.hash = last._uid;
                        //window.location.replace("#" + last._uid);
                    }
                }
                else {
                    if (window.location.hash != "#") {
                        IUI._nav_ignore = true;
                        var x = window.scrollX;
                        var y = window.scrollY;

                        window.location.hash = "#";

                        window.scrollTo(x, y);
                        //window.location.replace("#");

                    }
                }
            }

            this.classList.remove(this.cssClass + "-active");

        }

        return this;
    }
    */


    show() {
        //this.setFocus(true);
        return this;
    }

    move(x, y) {
        this.style.left = x + "px";
        this.style.top = y + "px";
        this._emit("move", x, y);
        return this;
    }

    resize(width, height) {
        this.style.width = width + "px";
        this.style.height = height + "px";

        this._updateSize();

        this._emit("resize", this.clientWidth, this.clientHeight);

        return this;
    }

    _updateSize() {
        if (IUI.responsive)
            return;

        if (this._body) {
            if (this.clientWidth < this._body.scrollWidth)
                this.style.width = this._body.scrollWidth + 1 + "px";

            if (this._footer) {

                if (this.clientWidth < this._footer.offsetWidth)
                    this.style.width = this._footer.offsetWidth + "px";

                if (this.clientHeight < this._header.offsetHeight + this._body.scrollHeight + this._footer.offsetHeight)
                    this.style.height = (this._header.offsetHeight + this._body.scrollHeight + this._footer.offsetHeight) + "px";

            }
            else {
                if (this.clientHeight < this._header.offsetHeight + this._body.scrollHeight)
                    this.style.height = (this._header.offsetHeight + this._body.scrollHeight + 1) + "px";

            }
        }

        // handle windows exceeding document size
        if (this.clientHeight > document.body.clientHeight) {
            this.style.height = document.body.clientHeight + "px";
            if (this._footer)
                this._body.style.height = (this.clientHeight - this._footer.clientHeight - this._header.clientHeight) + "px";
            else
                this._body.style.height = (this.clientHeight - this._header.clientHeight) + "px";
        }


        if (this.clientWidth > document.body.clientWidth)
            this.style.width = document.body.clientWidth + 1 + "px";

    }


    get caption() {
        return this.getAttribute("caption");
    }

    set caption(value) {
        this._caption.innerHTML = value;
        this.setAttribute("caption", value);
    }


    get subtitle() {
        return this.getAttribute("subtitle");
    }

    set subtitle(value) {
        this._subtitle.innerHTML = value;
        this.setAttribute("subtitle", value);
    }


});

/*
IUI._nav_list = [];

window.addEventListener("hashchange", function(e){

   if (IUI._nav_ignore)
   {
       IUI._nav_ignore = false;
       return;
   }

   if (IUI.responsive)
   {
       var oldHash = e.oldURL.split("#");
       if (oldHash.length == 2)
       {
           var hash = oldHash[1];
           var dialogs = IUI.registry.filter(function(o){ return ( o instanceof IUIWindow); });
               dialogs.forEach(function(dlg){
               if (dlg._uid == hash)
                       dlg.hide();	
               });
       }
   }

   var newHash = e.newURL.split("#");	
   if (newHash.length == 2)
   {
       var hash = newHash[1];

       if (hash == "")
       {
           var dialogs = IUI.registry.filter(function(o){ return ( o instanceof IUIDialog); });
           dialogs.forEach(function(d){
               d.hide();
           });

           IUI._nav_list = [];

           return;
       }

       var dialogs = IUI.registry.filter(function(o){ return ( o instanceof IUIWindow); });

       dialogs.forEach(function(dlg){
          if (dlg._uid == hash)
               dlg.setFocus(true);	
       });
   }
});
*/
