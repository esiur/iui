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

    }

    async setData(value, radix) {
        this.original = value;
        super.setData(new Modifiable(this.original, true), radix); 

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