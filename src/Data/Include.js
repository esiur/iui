import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class Include extends IUIElement
{
    constructor()
    {
        super();
        this.refs = {};
    }

    async create()
    {
        //console.log("Create ...", this.getAttribute("src"));

        if (this.getAttribute("src") == "views/studio/realestate.html")
            console.log("Create include");

        if (this.hasAttribute("src")) {

            let src = this.getAttribute("src").replace(/^\/+|\/+$/g, '');
            let x = await fetch(src);

            if (x.status !== 200)
                return;

            let t = await x.text();

            this.innerHTML = t;

            let xeval = (code) => eval(code);

            // call create for the new elements
            var newElements = this.querySelectorAll("*");
            for (var i = 0; i < newElements.length; i++) {
                var el = newElements[i];

                // set route for all elements
                //newElements[i].route = this.route;
                el.route = this.route;
                el.view = this;
                if (el.hasAttribute("ref")) {
                    this.refs[el.getAttribute("ref")] = el;
                }

                if (el instanceof HTMLScriptElement) {
                    // this because HTML parser don't evaluate script tag
                    let func = new Function("//# sourceURL=iui://" + src + "-" + Math.round(Math.random() * 10000) + "\r\n return " + el.text.trim());// "return " + el.text + ";");

                    let rt = func.call(el.parentElement);

                    //let rt = xeval.call(el.parentElement, "//# sourceURL=iui://" + src + Math.round(Math.random() * 10000) + "\r\n (" + el.text + ")");
                    if (typeof (rt) === "object") {
                        for (var k in rt)
                            el.parentElement[k] = rt[k];
                    }
                }
            }
        }

        //this.updateBindings();
    }

    get src()
    {
        return this._src;
    }
});