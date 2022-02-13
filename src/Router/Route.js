import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import Router from "./Router.js";
import RefsCollection from "../Core/RefsCollection.js";
import Path from "../Core/Path.js";

export default IUI.module(
  class Route extends IUIElement {
    constructor() {
      super();

      this.routes = [];
      this.refs = new RefsCollection(this);

      this._register("show");
      this._register("hide");
    }

    async setData(value) {
      if (this.hasAttribute("debug")) debugger;

      return await super.setData(value);
    }

    get scope() {
      return { route: this, view: this };
    }

    _updateLinks() {
      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i] instanceof Route) {
          this.routes.push(this.children[i]);
          window.router.add(this.children[i], this);
          i--;
        }
      }
    }

    base = "";

    get link() {
      var link = this.name;
      var parent = this.parent;
      while (parent != null) {
        link = parent.name + "/" + link;
        parent = parent.parent;
      }

      return this.base + "/" + link;
    }

    get name() {
      return this.getAttribute("name");
    }

    get src() {
      return this.getAttribute("src");
    }

    get dst() {
      return this._dst || this.getAttribute("dst");
    }

    set dst(value) {
      this._dst = value;
    }

    get caption() {
      return this.getAttribute("caption");
    }

    get private() {
      return this.hasAttribute("private");
    }

    get icon() {
      return this.getAttribute("icon");
    }

    _getParent() {
      let e = null; //this.parentElement;
      while ((e = this.parentElement)) {
        if (e instanceof Route || e instanceof Router) return e;
      }

      return null;
    }

    async create() {
      //window.router.add(this);
      this._updateLinks();

      if (this.hasAttribute("src")) {
        let src = this.getAttribute("src").replace(/^\/+|\/+$/g, "");
        let x = await fetch(src);
        if (x.status != 200) return;

        let t = await x.text();

        this.innerHTML = t;
      }

      if (window?.app?.loaded) {
        await IUI.create(this);
        IUI.bind(this, true, "route:" + src, this.scope);
        this.refs._build();
        await IUI.created(this);
        await IUI.render(this, this._data, true);
      }
    }

    created() {
      this.refs._build();
    }

    set(value) {
      if (value == this.visible) {
        return;
      }

      if (value) {
        this.setAttribute("selected", "");
        this._emit("show");
      } else {
        this.removeAttribute("selected");
        this._emit("hide");
      }
    }

    get visible() {
      return this.hasAttribute("selected");
    }
    set visible(value) {
      this.set(value);
    }
  }
);
