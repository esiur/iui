import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import Route from "./Route.js";

export default IUI.module(
  class Target extends IUIElement {
    constructor(properties) {
      super(IUI.extend(properties, { cssClass: "target" }));

      this._register("show");
      this._register("hide");
    }

    setLoading(value) {
      if (value) this.classList.add(this.cssClass + "-loading");
      else this.classList.remove(this.cssClass + "-loading");
    }

    create() {}

    show(route, previous) {
      let previousTarget = previous?.target;

      route.target = this;

      for (var i = 0; i < this.children.length; i++)
        if (this.children[i] instanceof Route && this.children[i] != route) {
          this.children[i].set(false);
        }

      //if (previous != null && previous != route && previous.target == this) {
      //    previous.set(false);
      //}
      //else
      if (previousTarget != null && previousTarget != this) {
        previousTarget.hide(this.active);
      }

      if (route.parentElement != this) this.appendChild(route);

      this._emit("show", { route, previous });
    }

    hide(route) {
      for (var i = 0; i < this.children.length; i++)
        if (this.children[i] instanceof Route) {
          this.children[i].set(false);
        }

      this._emit("hide", { route });
    }
  }
);
