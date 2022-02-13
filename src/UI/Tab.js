import { IUI } from "../Core/IUI.js";
import IUIElement from "../Core/IUIElement.js";

export default IUI.module(
  class Tab extends IUIElement {
    constructor(properties) {
      super(properties);
    }

    create() {}

    get caption() {
      return this.getAttribute("caption");
    }

    get selected() {
      return this.hasAttribute("selected"); // == "1" || selected == "yes" || selected == "true");
    }
  }
);
