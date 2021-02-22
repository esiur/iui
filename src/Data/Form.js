import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class Form extends IUIElement {
    constructor() {
        super();
        //this.form = {};
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
        super.setData(Form._copy(this.original));
        //super.setData({ ...this.original });
    }

  
    async reset() {
        //super.setData({ ...this.original });
        super.setData(Form._copy(this.original));
        return this;
    }

    // @TODO: Remove this when esiur adds suport to partially modified arrays with modified flag
    static _areEqual(ar1, ar2)
    {
        if (!(ar1 instanceof Array) || !( ar2 instanceof Array))
            return false;

        if (ar1.length != ar2.length)
            return false;

        for(var i = 0; i < ar1.length; i++)
            if (ar1[i] != ar2[i])
                return false;
        
        return true;
    }

    get diff() {
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