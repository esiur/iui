import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import Link from "../Router/Link.js";

export default IUI.module(
  class Location extends IUIElement {
    constructor() {
      super();
    }

    create() {
      let self = this;
      window.router.on("route", e => {
        self.textContent = ""; // clear everything

        let html = "";
        let route = e.route;

        var current = document.createElement("div");
        current.innerHTML = route.caption;

        self.append(current);

        while ((route = route.parent)) {
          var sep = document.createElement("span");
          self.prepend(sep);

          let link = new Link();
          link.link = route.link;
          link.innerHTML = route.caption;

          self.prepend(link);
        }
      });
    }
  }
);
