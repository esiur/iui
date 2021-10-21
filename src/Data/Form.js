import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import Modifiable from "./Modifiable.js";

export default IUI.module(class Form extends IUIElement {
    constructor() {
        super();
    }

    static _copy(val){
        if (typeof val === 'object' && val !== null)
        {
            let rt = {};
            for(var i in val)
                if (val[i] instanceof Array)
                    // copy array
                    rt[i] = [...val[i]];
                else
                    rt[i] = val[i];

            return rt;
        }
        else 
            return val;
    }

    async create() {
        //var elements = this.querySelectorAll("*[field]");
        //for (var i = 0; i < elements.length; i++)
        //    this.form[elements[i].getAttribute("field")] = elements[i];
    }

    async setData(value) {
        this.original = value;
        //var copy = {};
        //Object.assign(copy, value);
        super.setData(new Modifiable(this.original));//  Form._copy(this.original));
        //super.setData({ ...this.original });
    }

  
    async reset() {
        //super.setData({ ...this.original });
        super.setData(new Modifiable(this.original));//Form._copy(this.original));
        return this;
    }

 

    get diff() {

        return this._data._diff;

        if (this.original == null)
            return this._data;

        
        var rt = {};
        for (var i in this._data)
            if (this._data[i] != this.original[i])
            {
                if (this._data[i] instanceof Array && Form._areEqual(this._data[i], this.original[i]))
                    continue;
                else
                    rt[i] = this._data[i];
            }
            
        return rt;
    }

});