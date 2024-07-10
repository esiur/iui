import IUIElement from "./IUIElement.js";
import { Binding, BindingType } from "./Binding.js";
//import Route from '../Router/Route.js';
import BindingList  from "./BindingList.js";

const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

export class IUI {

	static debugMode = true;
	
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


    static async created(element, includeThisElement = false) { 

		// @TODO: this should grow from root to leef
		if (includeThisElement && element instanceof IUIElement) {
			await element.created();
		}

		for (var i = 0; i < element.children.length; i++) {
			let e = element.children[i];
			if (e instanceof IUIElement)
				await e.created();
			await IUI.created(e);
		}
		
    }

    static async create(element, includeThisElement = false)
    {

		if (includeThisElement && element instanceof IUIElement) {
			await element.create();
		}

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

	static extend(properties, defaults, overwrite)
	{
		if (properties == null)
			properties = defaults;
		else
			for(var i in defaults)
				if (overwrite)
					properties[i] = defaults[i];
				else if (properties[i] === undefined)
					properties[i] = defaults[i];
		return properties;
	}


	static bind(element, skipAttributes, sourcePath, scope) {

        // ::Attribute
        // : Field 
        // async:: Async Attribute
        // async: Async Field
        // @ Event

        // skip element ?
        if (element.hasAttribute("skip")
		 || element.hasAttribute("i-skip")
         || element instanceof HTMLTemplateElement)
            return;

        // tags to skip
        //if (element instanceof HTMLScriptElement )
            //return;
		
        let bindings;
		
				
		if (scope == null)
		    scope = {};
		else
			scope = {...scope};

		// get refs before they get overwritten
		//let refs = scope?.refs;

		// some element extended or overwritten the binding arguments
		if (element.scope != null)
			IUI.extend(scope, element.scope, true);
		
		if (element.hasAttribute(":scope"))
		{
			let script = element.getAttribute(":scope");
			let code = `try {\r\n context.value = ${script}; \r\n}\r\n catch(ex) { context.error = ex; }`
			let func = new Function("context", code);
			let context = {};

			func.call(element, context);

			if (context.error != undefined)
				console.log("Scope binding failed", context.error.name + ": " + context.error.message, this.script, this.target);
			else if (context.value != undefined 
					&& context.value instanceof Object)
				IUI.extend(scope, context.value, true);
		}
		
		let scopeArgs = Object.keys(scope);
		let scopeValues = Object.values(scope);


		bindings = new BindingList(element, scope);

        if (skipAttributes)
		{
			// copy attributes bindings
			if (element.__i_bindings != null)
				for(let i = 0; i < element.__i_bindings.length; i++)
					if (element.__i_bindings[i].type != BindingType.TextNode)
						bindings.push(element.__i_bindings[i]);
		}
		else
        {
			element.__i_bindings?.destroy();

            // compile attributes
            for (let i = 0; i < element.attributes.length; i++) {
				let attr = element.attributes[i];

				// skip scope
				if (attr.name == ":scope")
					continue;

				if (attr.name.startsWith("@")){

					// make events
					let code = attr.value;
					//let code = `try {\r\n context.value = ${script}; \r\n}\r\n catch(ex) { context.error = ex; }`
					let func = new Function("event", ...scopeArgs, code);
					let handler = (event) => {
						func.call(element, event, ...scopeValues);
					}

					bindings.addEvent(attr.name.substr(1), handler);
				} 
				else if (attr.name.startsWith("event:"))
				{
					// make events
					let code = attr.value;
					//let code = `try {\r\n context.value = ${script}; \r\n}\r\n catch(ex) { context.error = ex; }`
					let func = new Function("event", ...scopeArgs, code);
					let handler = (event) => {
						func.call(element, event, ...scopeValues);
					}

					bindings.addEvent(attr.name.substr(6), handler);

				}
				else if (attr.name.startsWith("async-event:")) {
					// make events
					let code = attr.value;
					//let code = `try {\r\n context.value = ${script}; \r\n}\r\n catch(ex) { context.error = ex; }`
					let func = new AsyncFunction("event", ...scopeArgs, code);
					let handler = (event) => {
						func.call(element, event, ...scopeValues);
					}

					bindings.addEvent(attr.name.substr(12), handler);
				}
				else
				{
					let b = Binding.create(attr,  bindings.scope);

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
            }

			
			// add reference
			// if (element.hasAttribute("ref")) {
			// 	let ref = element.getAttribute("ref");
			// 	if (refs[ref] == null)
			// 		refs[ref] = element;
			// 	else if (refs[ref] == element){
			// 		// do nothing
			// 	}
			// 	else if (refs[ref] instanceof Array){
			// 		refs[ref].push(element);
			// 	} else {
			// 		var firstRef = refs[ref];
			// 		refs[ref] =[firstRef, element];
			// 	}
			// }
        }

		// get new refs (scope might been overwritten)
		//refs = scope?.refs;

        // compile nodes
        for (var i = 0; i < element.childNodes.length; i++) {
            let el = element.childNodes[i];
            if (el instanceof IUIElement) {
                // @TODO: check if the IUI element handles the binding
				IUI.bind(el, false, sourcePath, scope);
            }
			else if (el instanceof HTMLScriptElement)
			{

				try
				{
					// this because HTML parser don't evaluate script tag
					/// let func = new Function("//# sourceURL=iui://" + sourcePath + "-" + Math.round(Math.random() * 10000) + "\r\n return " + el.text.trim());
					let func = new Function(...scopeArgs, 
						"//# sourceURL=iui://" + sourcePath + "-" 
						+ Math.round(Math.random() * 10000) 
						+ "\r\n" + el.text.trim());

					let rt = func.apply(el.parentElement, scopeValues);

					// Apply the returned object to the parent element.
					if (typeof (rt) === "object") {
						for (var k in rt)
							el.parentElement[k] = rt[k];
					}
				}
				catch (ex) {
					console.log(ex);
				}
			}
            else if (el instanceof HTMLElement) {
				IUI.bind(el, false, sourcePath, scope);
            }
            else if (el instanceof Text) {
                let b = Binding.create(el, bindings.scope);
                if (b != null)
                    bindings.push(b);
            }
        }

        element.__i_bindings = bindings;
	}

	static async render(element, data, textNodesOnly = false, radix = null) {
     
		if (!element.__i_bindings) {
            return;
        }

		let bindings = element.__i_bindings;

		if (textNodesOnly) {
			for (var i = 0; i < bindings.length; i++)
				if (bindings[i].type == BindingType.TextNode)
					await bindings[i].render(data, radix);
		} else {
			// render attributes & text nodes
			for (var i = 0; i < bindings.length; i++)
				await bindings[i].render(data, radix);
		}

        // render children
        for (var i = 0; i < element.children.length; i++) {
            let el = element.children[i];
            if (el instanceof IUIElement) {
                // @TODO should check if the element depends on parent or not
                if (el.dataMap != null) {
                    // if map function failed to call setData, we will render without it
                    if (!(await el.dataMap.render(data, radix))){
						// @BUG @TODO this causes stackoverflow
						// await el.render();
					}
                }
                else {
                    await el.setData(data);
				}
			}
            else {
                if (el.dataMap != null)
                    await el.dataMap.render(data, radix);
                else
					el.data = data;

                await IUI.render(el, el.data, textNodesOnly, data);
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
