import { IUI } from "./IUI.js";
import { Binding, BindingType, AttributeBindingDestination } from "./Binding.js";

export default class IUIElement extends HTMLElement {
    constructor(defaults) {
        super();

        this._events = [];
        this._data = null;
        
        for (var i in defaults)
            if (this[i] == undefined)
                this[i] = defaults[i];

        this._register("data");
    }

    static get moduleName(){ 
        return this.name.toLowerCase();
    }
    

    get cssClass(){
        if (this.hasAttribute("css-class"))
            return this.getAttribute("css-class");
        //else
          //  return this.constructor.moduleName;
    }

    set cssClass(value)
    {
        this.classList.remove(this.cssClass);
        this.setAttribute("css-class", value);
        this.classList.add(value);
    }

    async render() {
        await this._renderElement(this, this._data);
    }

    _getParentData() {
        var p = this.parentElement;
        do {
            if (p.data !== undefined)
                return p.data;
        } while (p = p.parentElement);

        return undefined;
    }

    async setData(value) {
        //if (this.bindings === undefined)
        //    this.updateBindings();

        
        this._data = value;
        this._emit("data", {data: value});
        await this._renderElement(this, value);

        //console.log("IUI: SetData", value, this.tagName);
    }

    get data() {
        return this._data;
    }

    async revert(){
        //if (this.revertMap != null)
        //{
            //if (data == undefined)
            //    await this.revertMap.render(this._getParentData());
            //else
            //    await this.revertMap.render(data);
            // revert parents
            
        let e = this;     

        do {
            var p = e.parentElement;

            if (e.revertMap != null)
                await e.revertMap.render(p?.data);
        } while (e = p);
        //}
    }

    async update(data) {
        if (data == undefined) {
            // get parent data
            if (this.dataMap != null) {
                await this.dataMap.render(this._getParentData());
            } else
                await this.setData(this.data);
        }
        else {
            // apply specified data
            if (this.dataMap != null) {
                await this.dataMap.render(data);
            } else
                await this.setData(data);
        }
    }

    async _renderElement(element, data) {
        if (!element.bindings) {
            return;
        }


        //console.log("_renderElement " + element.getAttribute("ref"), element);

        //if (element.hasAttribute("debug"))
          //  debugger;

        // render attributes & text nodes
        for (var i = 0; i < element.bindings.length; i++)
            await element.bindings[i].render(data);

        // render children
        for (var i = 0; i < element.children.length; i++) {
            let e = element.children[i];
            if (e instanceof IUIElement)
                // @TODO should check if the element depends on parent or not
                if (e.dataMap != null) {
                    // if map function failed to call setData, we will render without it
                    if (!(await e.dataMap.render(data)))
                        await e.render();
                }
                else
                    await e.setData(data);
            else {
                if (e.dataMap != null)
                    await e.dataMap.render(data);
                else
                    e.data = data;

                //let data = e.mapData(data);
                await this._renderElement(e, e.data);
            }
        }
    }


    // this meant to be inherited
    modified() {

    }

    get data() {
        return this._data;
    }

    connectedCallback() {

        if (this.hasAttribute("css-class"))
            this.classList.add(this.getAttribute("css-class"));
        else
        {
            let className = this.constructor.moduleName;

            this.setAttribute("css-class", className);
            this.classList.add(className);
        }
    }

    disconnectedCallback() {
       //     console.log("removed", this);
    }

    adoptedCallback() {

        //console.log("adopted", this);

    }

    //appendChild(node) {
    //    // do some bindings
    //    super.appendChild(node);
    //}

    created() {

    }

    create() {
        //this.updateBindings();
    }

    destroy() {

        console.log("Destroy", this);
        IUI.registry.splice(IUI.registry.indexOf(this), 1);
        if (this.parentNode)
            this.parentNode.removeChild(this);
    }



    _make_bindings(element) {

        // ::Attribute
        // : Field
        // async:: Async Attribute
        // async: Async Field
        // @ Event

        let bindings = [];

        
        //if (element.hasAttribute("debug"))
          //  debugger;

        // compile attributes
        for (var i = 0; i < element.attributes.length; i++) {

            let b = Binding.create(element.attributes[i]);

            if (b != null) {
                if (b.type == BindingType.HTMLElementDataAttribute || b.type == BindingType.IUIElementDataAttribute)
                    element.dataMap = b;
                else if (b.type == BindingType.RevertAttribute)
                    element.revertMap = b;
                else
                    bindings.push(b);
            }
        }

        // compile nodes
        for (var i = 0; i < element.childNodes.length; i++) {
            let e = element.childNodes[i];
            if (e instanceof IUIElement) {
                // @TODO: check if the IUI element handles the binding
                this._make_bindings(e);
            }
            else if (e instanceof HTMLElement) {
                this._make_bindings(e);
            }
            else if (e instanceof Text) {
                let b = Binding.create(e);
                if (b != null)
                    bindings.push(b);
            }
        }

        element.bindings = bindings;
    }


    _emit(event, values) {
        //var args = Array.prototype.slice.call(arguments, 1);
        var e = new CustomEvent(event, values);
        for (var i in values) {
            if (e[i] === undefined)
                e[i] = values[i];
        }

        try
        {
            return this.dispatchEvent(e);
        }
        catch(ex)
        {
            console.log(ex);
        }
    }

    updateBindings() {
        this._make_bindings(this);
    }

    _encapsulateEvent(code){
        return `try {\r\n ${code} \r\n}\r\n catch(ex) { console.log(ex.name + ":" + ex.message, this); }`;
    }

    _register(event) {
        this._events.push(event);

        if (this.hasAttribute("@" + event)) {
            let handler = this.getAttribute("@" + event);
            if (handler.match(/^[A-Za-z\$_]+(?:[\$_][A-Za-z0-9]+)*$/g) === null) {
                try
                {
                    let func = new Function("event", this._encapsulateEvent(this.getAttribute("@" + event)));
                    this.addEventListener(event, func);
                } catch (ex)
                {
                    console.log(ex);
                }
            }
            else {
                let func = this[handler];
                if (func instanceof Function) {
                    this.addEventListener(event, func, false);
                }
                else {
                    // might be added in the future
                    let func = new Function("event", `this["${handler}"](event)`);
                    this.addEventListener(event, func, false);
                }
            }
        }
    }

    off(event, fn) {
        this.removeEventListener(event, fn);
        return this;
    }

    on(event, fn) {
        this.addEventListener(event, fn, false);
        return this;
    }
}