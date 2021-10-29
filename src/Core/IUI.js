import IUIElement from "./IUIElement.js";
import { Binding, BindingType } from "./Binding.js";
//import Route from '../Router/Route.js';


export class IUI {

	static _menus = [];
	static views = [];
	static modules = {};
	static registry = [];

	static format(input) {
        if (typeof input == "string" || input instanceof String) {
            let template = document.createElement("template");
            template.innerHTML = input;
            let nodes = template.content.cloneNode(true).childNodes;
            return nodes;
        }
        else if (input instanceof HTMLCollection)
            return input;
        else if (input instanceof HTMLElement)
            return [input];
        else
            return [];
    }

    static observer = new IntersectionObserver(function(entries) {
		// isIntersecting is true when element and viewport are overlapping
		// isIntersecting is false when element and viewport don't overlap
		for(var i = 0; i < entries.length; i++)
		{
			if (entries[i].isIntersecting)
			{
				if (entries[i]._require_update)
					entries[i].update();
			}
		}

	}, { threshold: [0] });


    static async created (element) {

        for (var i = 0; i < element.children.length; i++) {
            let e = element.children[i];
            if (e instanceof IUIElement)
                await e.created();
            await IUI.created(e);
        }
    }

    static async create(element)
    {

        for (let i = 0; i < element.children.length; i++) {
            let e = element.children[i];
            if (e instanceof IUIElement) {
                await e.create();
            }

            await IUI.create(e);
        }
        /*
        let router = document.getElementsByTagName("i-router")[0];

        await router.create();

        let elements = document.querySelectorAll("*");
        for (var i = 0; i < elements.length; i++)
            if (elements[i] instanceof IUIElement && elements[i].tagName != "I-ROUTER") {
                console.log(elements[i]);
                await elements[i].create();
            }
          */      
                
		//for(var i = 0; i < IUI.registry.length; i++)
		//{
		//	IUI.extend(IUI.registry[i], IUI.registry[i].properties);
		//	await IUI.registry[i].create();
		//	//await IUI.registry[i].updateAttributes();
		//}
        //return;
	}

	static get(o)
    {
        return document.getElementById(o);

		//for(var i = 0; i < IUI.registry.length; i++)
		//	if (IUI.registry[i].id == o)
		//		return IUI.registry[i];
		//return null;
	}

	static put(o)
	{
		IUI.registry.push(o);
	}

	static  remove(id)
	{
		for(var i = 0; i < IUI.registry.length; i++)
			if (IUI.registry[i].el.id == id)
			{
				IUI.registry.splice(i, 1);
				break;	
			}
	}

	static module(objectClass)
    {
		let moduleName = objectClass.moduleName;

        if (IUI.modules[moduleName] === undefined) {
            customElements.define("i-" + moduleName, objectClass);
            IUI.modules[moduleName] = {
                cls: objectClass, init: function (properties) {
                    return new objectClass(properties);
                }
            };
		}
		
		return objectClass;
	}

	static extend(properties, defaults, force)
	{
		if (properties == null)
			properties = defaults;
		else
			for(var i in defaults)
				if (force)
					properties[i] = defaults[i];
				else if (properties[i] === undefined)
					properties[i] = defaults[i];
		return properties;
	}


	static bind(element, rootElement, sourcePath){

        // ::Attribute
        // : Field
        // async:: Async Attribute
        // async: Async Field
        // @ Event

        // skip element ?
        if (element.hasAttribute("skip")
         || element instanceof HTMLTemplateElement)
            return;

        // tags to skip
        //if (element instanceof HTMLScriptElement )
            //return;

		if (rootElement == null)
			rootElement = element;
		
        let bindings;
        
        if (element != rootElement)
        {
			element.view = rootElement.view;
			element.route = rootElement.route;

			bindings = [];
            // compile attributes
            for (var i = 0; i < element.attributes.length; i++) {

                let b = Binding.create(element.attributes[i]);

                if (b != null) {
                    if (b.type == BindingType.HTMLElementDataAttribute 
                        || b.type == BindingType.IUIElementDataAttribute)
                        element.dataMap = b;
                    else if (b.type == BindingType.RevertAttribute)
                        element.revertMap = b;
                    else
                        bindings.push(b);
                }
            }

			// add reference
			if (element.hasAttribute("ref")) {
				rootElement.refs[el.getAttribute("ref")] = element;
			}
        }
		else
		{	
			// remove previous text node bindings
			bindings = element.bindings == null ? [] : element.bindings.filter(x=> x.type != BindingType.TextNode);
			element.refs = {};
		}

        // compile nodes
        for (var i = 0; i < element.childNodes.length; i++) {
            let el = element.childNodes[i];
            if (el instanceof IUIElement) {
                // @TODO: check if the IUI element handles the binding
				IUI.bind(el, rootElement, sourcePath);
            }
            else if (el instanceof HTMLElement) {
				IUI.bind(el, rootElement, sourcePath);
            }
            else if (el instanceof Text) {
                let b = Binding.create(el);
                if (b != null)
                    bindings.push(b);
            }
			else if (el instanceof HTMLScriptElement)
			{
				// this because HTML parser don't evaluate script tag
				let func = new Function("//# sourceURL=iui://" + sourcePath + "-" + Math.round(Math.random() * 10000) + "\r\n return " + el.text.trim());
				let rt = func.call(el.parentElement);

				if (typeof (rt) === "object") {
					for (var k in rt)
						el.parentElement[k] = rt[k];
				}
			}
        }

        element.bindings = bindings;
	
	}

	static async render(element, data, textNodesOnly = false) {
     
		if (!element.bindings) {
            return;
        }

		if (textNodesOnly) {
			for (var i = 0; i < element.bindings.length; i++)
				if (element.bindings[i].type == BindingType.TextNode)
					await element.bindings[i].render(data);
		} else {
			// render attributes & text nodes
			for (var i = 0; i < element.bindings.length; i++)
				await element.bindings[i].render(data);
		}

        // render children
        for (var i = 0; i < element.children.length; i++) {
            let el = element.children[i];
            if (el instanceof IUIElement)
                // @TODO should check if the element depends on parent or not
                if (el.dataMap != null) {
                    // if map function failed to call setData, we will render without it
                    if (!(await el.dataMap.render(data)))
                        await el.render();
                }
                else
                    await el.setData(data);
            else {
                if (el.dataMap != null)
                    await el.dataMap.render(data);
                else
					el.data = data;

                //let data = e.mapData(data);
                await IUI.render(el, el.data);
            }
        }
	}
};

export function iui(selector)
{
  	return IUI.get(selector);

	/*
	if ((typeof selector === 'string' || selector instanceof String) && selector.length > 0)
	{
		var els = document.querySelectorAll(selector); 
	}
	else
	{
		var els = IUI.get(selector);
		if (els != null)

	}
*/

	if (typeof(this) == "undefined" || this == window)
	{
		var o = IUI.get(selector);
		if (o)
			return o;
		else
		{
			var el;

			if (typeof Node === "object" ? o instanceof Node : (
				selector && typeof selector === "object" && typeof selector.nodeType === "number" && typeof selector.nodeName==="string") || selector === window)
			{
				el = selector;
			}
			else if (typeof selector === 'string' || selector instanceof String)
			{
				if (selector[0] == ".")
					el = document.getElementsByClassName(selector.substr(1));
				else
				    el = document.getElementById(selector);
			}

			if (el)
			{
				var rt = {};
				var makeFunc = function(module){
					return function(){
						if (el instanceof HTMLCollection)
						{
							let rt = [];
							for(var i = 0; i < el.length; i++)
							{
								var args = [el[i]];
								for(var j = 0; j < arguments.length; j++)
									 args.push(arguments[j]);
								rt.push(IUI.modules[module].init.apply(this, args));
							}
							return rt;
						}
						else
						{
						    var args = [el];
						    for(var i = 0; i < arguments.length; i++)
					     		args.push(arguments[i]);
					    	return IUI.modules[module].init.apply(this, args);
						}
					}
				};

				for(var m in IUI.modules)
					rt[m] = makeFunc(m);
				
				return rt;
			}
		}
	}
	
	/*
	IUI.registry.push(this);
	

	if (selector)
	{
		if( Object.prototype.toString.call( selector ) === '[object Array]' )
		{
			this.el = [];
			selector.forEach(function(i){
				this.el.push(query(i));
			});
		}
		else
			this.el = query(selector);
		
		this.events = {};
		this.id = this.el.id;
	}
	*/
}
/*
Array.prototype.each = function(func)
{
	if (this instanceof Array)
	{
		for(var i = 0; i < this.length; i++)
			if (func(this[i], i))
				break;
	}
	else
		for(var i in this)
			if(func(this[i], i))
				break;
}


Array.prototype.distinct = function(field)
{
	var rt = [];
	
	this.forEach(function(item)
	{
		if (rt.indexOf(item[field]) == -1)
			rt.push(item[field]);
	});
	
	return rt;
}
/*
iui.prototype.ec = function(className, parent)
{
	if (parent)
		return parent.getElementsByClassName(className);
	else
		return document.getElementsByClassName(className);
}

iui.prototype.ne = function(tag) 
{
	return document.createElement(tag);
}
*/


/*
iui.prototype.destroy  = function()
{
	IUI.registry.splice(IUI.registry.indexOf(this.el), 1); 
};

iui.prototype.register = function(event)
{
	this.events[event] = [];
	return this;
};

iui.prototype.emit = function(event)
{
	var args = Array.prototype.slice.call(arguments, 1);
	if (this.events && this.events[event])
		for(var i = 0; i < this.events[event].length; i++)
			this.events[event][i].apply(this, args);
	
	return this;
};

iui.prototype.on = function(event, fn) 
{
	if (this.events && this.events[event])
		this.events[event].push(fn);
	else if (document.attachEvent)
		this.el.attachEvent('on' + event, fn)
	else // if (document.addEventListener)
		this.el.addEventListener(event, fn, !0);
		
	return this;
};
*/

/*
window.addEventListener("load", function(){
	for(var m in IUI.modules)
	{
		var elements = document.getElementsByTagName(m);

	}
});
*/
