import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class Repeat extends IUIElement
{
    constructor()
    {
        super({ _data: [] });
        this.list = [];
    }

    _isDirectDecedent(x){
        while(x = x.parentElement)
            if (x == this)
                return true;
            else if (x instanceof Repeat && x != this)
                return false;
    }

    create()
    {
        //////////////
        /// Create ///
        //////////////

        console.log(this, this.innerHTML);

        if (this._created)
            debugger;

        this._created = true;
        
        // create template to speed avoid HTML parsing each time.
        let repeatables = this.querySelectorAll("*[repeat]");
 
        repeatables = Array.from(repeatables).filter(x=>this._isDirectDecedent(x));

        if (repeatables.length > 0)
        {

            this._repeatNode = repeatables[0].cloneNode(true);
            this._container = repeatables[0].parentElement;
            this._beforeNode = repeatables[0].nextSibling;
            repeatables[0].parentElement.removeChild(repeatables[0]);
        }
        else
        {
            if (this.children.length > 0)
                this._repeatNode = this.children[0].cloneNode(true);
            else {
                this._repeatNode = document.createElement("div");

                if (this.childNodes.length > 0 && this.childNodes[0].data.trim() != "")
                    this._repeatNode.innerHTML = this.childNodes[0].data.trim();
            }

            this.innerHTML = "";
            this._container = this;
        }


        // var newElements = this.querySelectorAll("*");
        // for (var i = 0; i < newElements.length; i++)
        //     newElements[i].repeat = this;

        // var self = this;

        /*
        this._repeatModified = function(propertyName, value)
		{

            var bindings = self._repeatBindings.get(this);

            // update view
            for(var i = 0; i < bindings.length; i++)
            {
                if (bindings[i].props)
                {
                    for(var j = 0; j < bindings[i].props.length; j++)
                    {
                        if (bindings[i].props[j] == propertyName)
                        {
                            bindings[i].node.data = bindings[i].func.apply(self, 
                                [this, this, this, this, 0, 0]);

                            break;
                        }
                    }
                }
            }
		};
        */
    }


    clear()
    {
        for (var i = 0; i < this.list.length; i++)
            this._container.removeChild(this.list[i]);
        this.list = [];
        this._data = [];
    }

    
    get data() {
        return super.data;
    }

    get length() {
        return this._data.length;
    }


    async setData(value)
    {
        
        
        // this to avoid interruption by an event
        if (this._busy)
        {
            console.log("Busy", this);
            return false;
        }

        this._busy = true;

 
        // clear
        this.clear();

        if (value?.toArray instanceof Function)
            value = value.toArray();
        else if (value == null || !(value instanceof Array || value instanceof Int32Array))
            value = [];


            //debugger;
        await super.setData(value);

        
        for (let i = 0; i < value.length; i++) {

            let el = this._repeatNode.cloneNode(true);

            this.list.push(el);

            await IUI.create(el);

            IUI.bind(el, false, "repeat", 
                      IUI.extend(this.__i_bindings?.scope, 
                                {index: i, repeat: this}, true));
            
            this._container.insertBefore(el, this._beforeNode);
            
            // update referencing
            this.__i_bindings?.scope?.refs?._build();

            await IUI.created(el);

            if (el instanceof IUIElement){
                // @TODO should check if the element depends on parent or not
                if (el.dataMap != null) {
                    // if map function failed to call setData, we will render without it
                    if (!(await el.dataMap.render(value[i])))
                        await el.render();
                }
                else {
                    await el.setData(value[i]);
                }
            }
            else 
            {
                if (el.dataMap != null)
                    await el.dataMap.render(value[i]);
                else
                    el.data = value[i];

                await IUI.render(el, el.data, false);
            }
            
        }


    
        // @TODO: check if this works for event names starting with ":"
        this._emit(":data", { data: value });
        // this._emit("modified", { data: value, property: "data" });

   
        this._busy = false;
    }

});