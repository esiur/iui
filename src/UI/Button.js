import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(
  class Button extends IUIElement {
    constructor() {
      super({ cssClass: "button" });

      this.addEventListener(
        "mousedown",
        e => {
          var r = this.getBoundingClientRect();
          this.style.setProperty("--x", e.x - r.x + "px");
          this.style.setProperty("--y", e.y - r.y + "px");

          this.style.setProperty("--w", r.width + "px");
          this.style.setProperty("--h", r.height + "px");

          this.classList.remove(this.cssClass + "-clicked");
          void this.offsetWidth;
          this.classList.add(this.cssClass + "-clicked");
        },
        true
      );

      this._register("check");
    }

    get type() {
      return this.getAttribute("type");
    }

    set type(value) {
      this.setAttribute("type", value);
    }

    get checked() {
      return this.hasAttribute("checked");
    }

    set checked(value) {
      if (value) this.setAttribute("checked", "");
      else this.removeAttribute("checked");
    }

    get disabled() {
      return this.getAttribute("disabled");
    }

    set disabled(value) {
      this.setAttribute("disabled", value);
    }

    create() {
      if (this.type == "check") {
        this.addEventListener("click", () => {
          let checked = !this.checked;
          this.checked = checked;
          this._emit("check", { checked });
        });
      }

      //this.classList.add(this.cssClass);
    }
  }
);
