import IUIElement from "../Core/IUIElement.js";

export default IUI.module(
  class DataList extends IUIElement {
    constructor(properties) {
      super(properties);
    }

    create() {
      this.style.display = "none";
    }
  }
);
