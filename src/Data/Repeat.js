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
            else
                this._repeatNode = document.createElement("div");

            this.innerHTML = "";
            this._container = this;
        }


        var newElements = this.querySelectorAll("*");
        for (var i = 0; i < newElements.length; i++)
            newElements[i].repeat = this;

        var self = this;

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

    _assign(node, index) {

        // update fields

        // this so we won't mess with i-include view
        if (node.view == undefined)
            node.view = this.view;

        node.rotue = this.route;
        node.index = index;

        // update references
        if (node.hasAttribute("ref"))
        {
            let ref = node.getAttribute("ref");
            // create new array
            if (!(this.view.refs[ref] instanceof Array))
                this.view.refs[ref] = [];
            this.view.refs[ref][index] = node;
        }

        //Object.assign(node, customFields);
        for (var i = 0; i < node.children.length; i++) 
            this._assign(node.children[i], index);
    }

    async setData(value)
    {
        
        
        // this to avoid interruption by an event
        if (this._busy)
        {
            console.log("Busy", this);
            return false;
        }

        //console.log("RPT: SetData", value);
        this._busy = true;

       // var id = Math.random();

        //console.log("SetData " + this.getAttribute("ref") + " " + id, value);
        //console.trace();
        // clear
        this.clear();

        if (value instanceof Structure)
            value = value.toPairs();
        else if (value == null || !(value instanceof Array || value instanceof Int32Array))
            value = [];


            //debugger;
        await super.setData(value);

        
        for (let i = 0; i < value.length; i++) {

            ///console.log("ST1");
            //let content = this.template.content.cloneNode(true);
            //let nodes = content.childNodes;

            let e = this._repeatNode.cloneNode(true);

            this.list.push(e);


            //console.log("ST2");


            // Create node
            if (e instanceof IUIElement)
                await e.create();
            
              //  console.log("ST3");
                // Create children
                //console.log("Create repeat " + i, this, e);

                await IUI.create(e);

            //console.log("Created repeat " + i, this, e);
            

            //console.log("ST4");

            //this._make_bindings(e)
            IUI.bind(e, this, "repeat");
            this._container.insertBefore(e, this._beforeNode);

            this._assign(e, i);// { view: this.view, route: this.route, index: i });


            //console.log("ST5");

            if (e instanceof IUIElement) {
                // @TODO should check if the element depends on parent or not
                if (e.dataMap != null) {
                    // if map function failed to call setData, we will render without it
                    if (!(await e.dataMap.render(value[i])))
                        await e.render();
                }
                else{
                    await e.setData(value[i]);
                   // console.log("ST6.1");
                }
            }
            else {
                if (e.dataMap != null)
                    await e.dataMap.render(value[i]);
                else
                    e.data = value[i];

              //  console.log("ST6.2", e);
                await this._renderElement(e, e.data);
              //  console.log("ST6.3");
            }

            // if (node.dataMap != null) {
            //     await node.dataMap.render(value[i]);
            //     this._renderElement(node, node.data);
            // }
            // else {

            //     node.data = value[i];
            //     this._renderElement(node, node.data);
            // }

            /*

            var newElements = content.querySelectorAll("*");

            while (nodes.length > 0) {
                let n = nodes[0];
                //n.index = i;
                if (n instanceof HTMLElement)
                    n.setAttribute(":data", `d[${i}]`);
                this._container.appendChild(n);
            }

            // this has to be called after appending the child otherwise node will be HTMLElement and not IUIElement , bug maybe in webkit ?
            for (var j = 0; j < newElements.length; j++) {
                let el = newElements[j];

                // set route for all elements
                el.index = i;
                el.view = this;
                el.route = this.route;
                //newElements[j].route = this.route;
                if (el instanceof IUIElement)
                    el.create();
            }
            */
        
        }


    
        // @TODO: check if this works for event names starting with ":"
        this._emit(":data", { data: value });
        // this._emit("modified", { data: value, property: "data" });

   
        this._busy = false;
    }

});