import IUIElement from "./IUIElement.js";

export const BindingType = {
    IUIElement: 0, // this will never happen !
    TextNode: 1,
    ContentAttribute: 2,
    Attribute: 3,
    HTMLElementDataAttribute: 4,
    IUIElementDataAttribute: 5,
    IfAttribute: 6,
    RevertAttribute: 7
};

export const AttributeBindingDestination = {
    Field: 0,
    Attribute: 1
};

const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

export class Binding {
    static create(nodeOrAttributeOrIUIElement) {
        var code, isAsync, type, attrType, attrKey, func, script;

        //if (nodeOrAttributeOrIUIElement.created)
          //  debugger;

        if (nodeOrAttributeOrIUIElement instanceof IUIElement) {
            isAsync = nodeOrAttributeOrIUIElement.hasAttribute("async");
            type = BindingType.IUIElement;
        } else if (nodeOrAttributeOrIUIElement instanceof Text) {// nodeOrAttribute.nodeType == 3) {
            if (!nodeOrAttributeOrIUIElement.wholeText.match(/\${.*}/))
                return null;
            type = BindingType.TextNode;
            isAsync = nodeOrAttributeOrIUIElement.parentElement.hasAttribute("async");
            //code = "return `" + nodeOrAttributeOrIUIElement.wholeText + "`;";

            script = nodeOrAttributeOrIUIElement.wholeText;
            
            code = `try {\r\n context.value = \`${script}\`\r\n}\r\n catch(ex) { context.error = ex; }`

            
            nodeOrAttributeOrIUIElement.data = "";
            nodeOrAttributeOrIUIElement.created = true;
        } else if (nodeOrAttributeOrIUIElement instanceof Attr) {

            if (nodeOrAttributeOrIUIElement.name.startsWith("async::")) {
                isAsync = true;
                attrType = AttributeBindingDestination.Attribute;
                attrKey = nodeOrAttributeOrIUIElement.name.substr(7);
            }
            else if (nodeOrAttributeOrIUIElement.name.startsWith("::")) {
                isAsync = false;
                attrType = AttributeBindingDestination.Attribute;
                attrKey = nodeOrAttributeOrIUIElement.name.substr(2);
            }
            else if (nodeOrAttributeOrIUIElement.name.startsWith("async:")) {
                isAsync = true;
                attrType = AttributeBindingDestination.Field;
                attrKey = nodeOrAttributeOrIUIElement.name.substr(6);
            }
            else if (nodeOrAttributeOrIUIElement.name.startsWith(":")) {
                isAsync = false;
                attrType = AttributeBindingDestination.Field;
                attrKey = nodeOrAttributeOrIUIElement.name.substr(1);
            }
            else {
                return null;
            }

           // isAsync = nodeOrAttributeOrIUIElement.value.search("await");

//            code = "return " + nodeOrAttributeOrIUIElement.value + ";";

            script = nodeOrAttributeOrIUIElement.value
            code = `try {\r\n context.value = ${script}; \r\n}\r\n catch(ex) { context.error = ex; }`

            let sentence = attrKey.split("-");
            for (var i = 1; i < sentence.length; i++)
                sentence[i] = sentence[i].charAt(0).toUpperCase() + sentence[i].slice(1);
            attrKey = sentence.join("");

            if (attrKey == "content")
                type = BindingType.ContentAttribute;
            else if (attrKey == "if") {
                type = BindingType.IfAttribute;
                //displayMode = 
            }
            else if (attrKey == "revert")
                type = BindingType.RevertAttribute;
            else if (attrKey != "data")
                type = BindingType.Attribute;
            else if (nodeOrAttributeOrIUIElement.ownerElement instanceof IUIElement)
                type = BindingType.IUIElementDataAttribute;
            else
                type = BindingType.HTMLElementDataAttribute;
        }


        // test the function

        try {
            if (isAsync)
                func = new AsyncFunction("data", "d", "context", "_test", code);
            else
                func = new Function("data", "d", "context", "_test", code);
        }
        catch (ex) {
            console.log("Test failed: " + ex, code);
            return null;
        }


        let rt = new Binding();
        Object.assign(rt, { isAsync, type, attrType, attrKey, func, target: nodeOrAttributeOrIUIElement, checked: false, script });
        return rt;
    }

    constructor() {
        this.watchList = [];
        let self = this;
        this.listener = function (name, value) {
            self.render(self.data);
        };
    }

    _findMap(thisArg) {

        // @TODO: Map thisArg too
        let map = {};

        let detector = {
            get: function (obj, prop) {
                if (typeof prop == "string") {
                    obj[prop] = {};
                    return new Proxy(obj[prop], detector);
                }
            }
        };

        this.checked = true;

        let proxy = new Proxy(map, detector);

        try {
            let d = this.func.apply(thisArg, [proxy, proxy, {}, true]);
            this.map = map;
            return d;
        }
        catch (ex) {
            //console.log("Proxy failed", ex);
            this.map = map;
        }
    }

    async _execute(thisArg, data) {
        if (!this.checked)
            this._findMap(thisArg);

            
        let context = {};
        var rt = this.func.apply(thisArg, [data, data, context, false]);

        //console.log(rt);
        if (rt instanceof Promise)
            await rt;

        if (context.error != undefined)
        {
            console.log("Execution failed", context.error.name + ": " + context.error.message, this.script, this.target);
            return;
        }
        else if (context.value == undefined)
        {
            return;
        }
        else if (context.value instanceof Promise)
        {
            try
            {
                return await context.value;
            } catch(ex) {
                console.log("Execution failed", ex.name + ": " + ex.message, this.script, this.target);
            }
        }
        else
        {
            return context.value;
        }
    }

    unbind() {
        this.data = null;
        for (var i = 0; i < this.watchList.length; i++)
            this.watchList[i].data.off(this.watchList[i].event, this.listener);
        this.watchList = [];
    }

    bind(data, map) {
        if (data == null)
            return;

        if (data?.on) {
            
            for (var p in map) {
                let event = ":" + p;
                data.on(":" + p, this.listener);
                this.watchList.push({ data, event});

                this.bind(data[p], map[p]);
            }

            //if (this.watchList.includes(data))
            //    this.watchList.push({ data, event :  });
        }
        else {
            for (var p in map) {
                this.bind(data[p], map[p]);
            }
        }
    }

 

    async render(data) {

        // @TODO: Checking properties bindings moved here
        if (data != this.data)
            this.unbind();

        try {
            if (this.type === BindingType.IUIElement) {
                let d = this.func.apply(this.target, [data, data]);
                if (d instanceof Promise)
                    d = await d;
                await this.target.setData(d);
            }
            else if (this.type === BindingType.TextNode) {

                try {

                    let d = await this._execute(this.target.parentElement, data);
                    
                    if (d === undefined)
                        return false;
                    //if (d instanceof Promise)
                    //    d = await d;

                    this.target.data = d;// (d === undefined) ? "" : d;

                    if (data != this.data) {
                        this.data = data;
                        this.bind(data, this.map);
                    }

                }
                catch (ex) {
                    this.target.data = "";
                }
            }
            // Content Attribute
            else if (this.type == BindingType.ContentAttribute) {
                let d = await this._execute(this.target.ownerElement, data);

                if (d === undefined)
                    return false;

                //if (d instanceof Promise)
                  //  d = await d;

                this.target.ownerElement.innerHTML = d;
            }
            else if (this.type == BindingType.IfAttribute)
            {
                let d = await this._execute(this.target.ownerElement, data);

                //if (d === undefined)
                //    return false;

                this.target.ownerElement.style.display = d ? "" : "none";
            }
            else if (this.type == BindingType.RevertAttribute)
            {
                let d = await this._execute(this.target.ownerElement, data);
                if (d === undefined)
                    return false;
                //if (d instanceof Promise)
                  //  d = await d;
                
            }
            // Attribute
            else if (this.type === BindingType.Attribute) {

                //if (this.target.ownerElement.hasAttribute("debug"))
                  //  debugger;

                let d = await this._execute(this.target.ownerElement, data);

                if (d === undefined)
                    return false;

                //if (d instanceof Promise)
                  //  d = await d;

                if (this.attrType == AttributeBindingDestination.Field)
                    this.target.ownerElement[this.attrKey] = d;
                else
                    this.target.ownerElement.setAttribute(this.attrKey, d);

                if (data != this.data) {
                    this.data = data;
                    this.bind(data, this.map);
                }
            }

            // Data Attribute of IUI Element
            else if (this.type === BindingType.IUIElementDataAttribute) {

     

                let d = await this._execute(this.target.ownerElement, data);
                //if (d === undefined)
                //    return false;
               
                //if (d instanceof Promise)
                  //  d = await d;
                await this.target.ownerElement.setData(d);
            }
            // Data Attribute of HTML Element
            else if (this.type == BindingType.HTMLElementDataAttribute) {

                let d = await this._execute(this.target.ownerElement, data);
                if (d === undefined)
                    return false;
                //if (d instanceof Promise)
                  //  d = await d;
                this.target.ownerElement.data = d;
            }

            return true;
        }
        catch (ex) {
            //            console.log(ex);
            return false;
        }
    }

}