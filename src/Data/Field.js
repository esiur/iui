import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(
  class Field extends HTMLElement {
    constructor() {
      super();
    }

    static get moduleName() {
      return this.name.toLowerCase();
    }

    create() {
      //      if (this.formatter === undefined) {
      //          // load script
      //          for (var i = 0; i < this.children.length; i++)
      //              if (this.children[i] instanceof HTMLScriptElement) {
      //                  //this.formatter = new Function this.children[i].
      //              }
      //      }
      //this.style.display = "none";
    }

    get name() {
      return this.getAttribute("name");
    }

    set name(value) {
      this.setAttribute("name", value);
    }

    serialize(tag) {
      let template = document.createElement("template");
      let node = document.createElement(tag ?? "div");
      let width = null,
        name = null,
        type = null;

      // copy attributes
      for (var i = 0; i < this.attributes.length; i++) {
        let attr = this.attributes[i];
        if (attr.name == "width") width = attr.value;
        else if (attr.name == "name") name = attr.value;
        else if (attr.name == "type") type = attr.value;
        else node.setAttribute(attr.name, attr.value);
      }

      // copy html

      node.innerHTML = this.innerHTML;

      return { node, width, name, type };
    }
  }
);
