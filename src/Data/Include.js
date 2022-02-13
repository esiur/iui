import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import RefsCollection from "../Core/RefsCollection.js";

export default IUI.module(
  class Include extends IUIElement {
    constructor() {
      super();
      this.refs = new RefsCollection();
    }

    get src() {
      return this.getAttribute("src");
    }

    set src(value) {
      this.setAttribute("src", value);
      this._load(value);
    }

    get scope() {
      return { view: this, refs: this.refs };
    }

    async _load(url) {
      if (this._loading) return;

      this._loading = true;

      let src = url.replace(/^\/+|\/+$/g, "");

      this.classList.add(this.cssClass + "-loading");

      let x = await fetch(src);

      if (x.status == 200) {
        let t = await x.text();

        this.innerHTML = t;

        //let xeval = (code) => eval(code);

        if (window?.app?.loaded) {
          await IUI.create(this);
          IUI.bind(
            this,
            true,
            "include:" + src,
            IUI.extend(this._i__bindings.scope, this.scope, true)
          );

          this.refs._build();
          await IUI.created(this);
          await IUI.render(this, this._data, true);
        }

        // // call create for the new elements
        // var newElements = this.querySelectorAll("*");
        // for (var i = 0; i < newElements.length; i++) {
        //     var el = newElements[i];

        //     // set route for all elements
        //     //newElements[i].route = this.route;
        //     el.route = this.route;
        //     el.view = this;
        //     if (el.hasAttribute("ref")) {
        //         this.refs[el.getAttribute("ref")] = el;
        //     }

        //     if (el instanceof HTMLScriptElement) {
        //         // this because HTML parser don't evaluate script tag
        //         let func = new Function("//# sourceURL=iui://" + src + "-" + Math.round(Math.random() * 10000) + "\r\n return " + el.text.trim());// "return " + el.text + ";");

        //         let rt = func.call(el.parentElement);

        //         //let rt = xeval.call(el.parentElement, "//# sourceURL=iui://" + src + Math.round(Math.random() * 10000) + "\r\n (" + el.text + ")");
        //         if (typeof (rt) === "object") {
        //             for (var k in rt)
        //                 el.parentElement[k] = rt[k];
        //         }
        //     }
        // }
      }

      this.classList.remove(this.cssClass + "-loading");

      // if (window?.app?.loaded)
      // {
      //     await IUI.create(this);
      //     await IUI.created(this);

      //     for(let i = 0; i < this.children.length; i++)
      //     {
      //         let el =  this.children[i];
      //         IUIElement._make_bindings(el);
      //         await IUIElement._renderElement(el, el._data);
      //     }
      // }

      this._loading = false;
    }

    async create() {
      if (this.hasAttribute("src")) await this._load(this.getAttribute("src"));
    }

    async created() {
      this.refs._build();
    }
  }
);
