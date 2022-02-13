import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(
  class RoutesList extends IUIElement {
    constructor(properties) {
      super(properties, { class: "routes-list" });
    }

    create() {
      if (!window.router) return;

      var table = document.createElement("i-table");

      this.appendChild(table);

      for (var i = 0; i < window.router.routes.length; i++) {
        // hell
        table.add;
      }
    }
  }
);
