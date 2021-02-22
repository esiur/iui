import IUIElement from "../Core/IUIElement.js";
import Field from './Field.js';
import { IUI } from "../Core/IUI.js";

export default IUI.module(class Layout extends HTMLElement// IUIElement
{  
	constructor()
	{
		super();
	}
	
	static get moduleName(){ 
        return this.name.toLowerCase();
    }

	//create()
	//{
 //       for (var i = 0; i < this.children.length; i++)
 //           if (this.children[i] instanceof Field) {
 //               this[this.children[i].name] = this.children[i];
 //               this.fields.push(this.children[i]);
 //           }
			
	//	this.style.display = "none";
	//}

	static getHTML(el, removeSelf = false) {
		for (var i = 0; i < el.children.length; i++)
			if (el.children[i] instanceof Layout) {
				let layout = el.children[i];
				let rt = layout.innerHTML;

				if (removeSelf)
					el.removeChild(layout);
				return rt;
			}

		return null;
	}
	
	static get(el, tag, removeSelf = false, collection = false) {

		for (var i = 0; i < el.children.length; i++)
			if (el.children[i] instanceof Layout) {
				let layout = el.children[i];
				let rt = collection ? {} : [];
				for (var j = 0; j < layout.children.length; j++) {
					if (layout.children[j] instanceof Field) {
						let fd = layout.children[j].serialize(tag);
						if (collection)
							rt[fd.name] = fd;
						else
							rt.push(fd);
					}
				}

				if (removeSelf)
					layout.parentElement.removeChild(layout);
				return rt;
			}

		return null;
    }
});