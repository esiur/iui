import { IUI } from "./IUI.js";
import { Binding, BindingType, AttributeBindingDestination } from "./Binding.js";

export default class IUIElement extends HTMLElement {
    constructor(defaults) {
        super();

        this._events = [];
        this._data = null;
        this._defaults = defaults;
        
        for (var i in defaults)
            if (this[i] == undefined)
                try {
                    this[i] = defaults[i];
                } catch {
                    // mostly because modifying dom attributes are not allowed in custom elements creation
                }

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
        await IUI.render(this, this._data);
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
        this._data = value;
        this._emit("data", {data: value});
        await IUI.render(this, value);
        
        // notify updated callback
        await this.updated();
    }


    setError(exception) {
        if (!IUI.debugMode)
            return;

        if (this._errorElement == null) {
            this._errorElement = document.createElement("div");
            this._errorElement.className = "iui-error";
            this.append(this._errorElement);
        }

        var label = document.createElement("span");
        label.innerHTML = exception;
        this._errorElement.append(label);
    }

    
    async updated() {
        // to be implemented by the user.
    }

    get data() {
        return this._data;
    }

    async revert(){
        let e = this;     

        do {
            var p = e.parentElement;

            if (e.revertMap != null)
                await e.revertMap.render(p?.data);
        } while (e = p);
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

    // bindings arguments
    get scope(){
        return null;
    }

    // this meant to be inherited
    modified() {

    }

    connectedCallback() {
        if (this.hasAttribute("css-class"))
        {
            this.classList.add(this.getAttribute("css-class"));
        }
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
 
    }

    destroy() {
        IUI.registry.splice(IUI.registry.indexOf(this), 1);
        if (this.parentNode)
            this.parentNode.removeChild(this);
    }



    _emit(event, values) {
        //var args = Array.prototype.slice.call(arguments, 1);
        var e = new CustomEvent(event, values);
        for (let i in values) {
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


    _encapsulateEvent(code){
        return `try {\r\n ${code} \r\n}\r\n catch(ex) { console.log(ex.name + ":" + ex.message, this); }`;
    }

    _register(event) {
        this._events.push(event);

        /*
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
        */
    }

    off(event, func) {
        this.removeEventListener(event, func);
        return this;
    }

    on(event, func) {
        this.addEventListener(event, func, false);
        return this;
    }
}