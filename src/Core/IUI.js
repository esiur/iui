import IUIElement from "./IUIElement.js";

export const IUI = {
    format: function (input) {
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
    },
    _menus: [],
	views: [],
	modules: {},
	registry : [],
    observer: new IntersectionObserver(function(entries) {
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

	}, { threshold: [0] }),
    created: async function (element) {

        for (var i = 0; i < element.children.length; i++) {
            let e = element.children[i];
            if (e instanceof IUIElement)
                await e.created();
            await IUI.created(e);
        }
    },
    create: async function(element)
    {

        for (let i = 0; i < element.children.length; i++) {
            let e = element.children[i];
            if (e instanceof IUIElement) {
                await e.create();
               // e.updateBindings();
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
	},
	get : function(o)
    {
        return document.getElementById(o);

		//for(var i = 0; i < IUI.registry.length; i++)
		//	if (IUI.registry[i].id == o)
		//		return IUI.registry[i];
		//return null;
	},
	put: function(o)
	{
		IUI.registry.push(o);
	},
	remove: function(id)
	{
		for(var i = 0; i < IUI.registry.length; i++)
			if (IUI.registry[i].el.id == id)
			{
				IUI.registry.splice(i, 1);
				break;	
			}
	},
	module: function(objectClass)
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
	},
	extend: function(properties, defaults, force)
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
