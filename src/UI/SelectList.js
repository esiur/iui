import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(
  class SelectList extends IUIElement {
    constructor() {
      super({
        selected: null,
        list: [],
        query: x => null,
        formatter: x => x["name"],
      });

      var self = this;

      this._register("select");
      this.classList.add(this.cssClass);

      //        this.menu = iui(menu[0]).menu({ customClass: this.customClass + "-menu", layout: this.layout.menu });
      this.menu = new Menu({
        cssClass: this.cssClass + "-menu",
        "target-class": "",
      });

      this.menu.on("visible", function (v) {
        if (v) self.classList.add(self.cssClass + "-active");
        else self.classList.remove(self.cssClass + "-active");
      });

      this.menu.on("click", e => {
        let [data, element] = self.menu._getElementData(e.target);
        if (data != undefined) self.data = data;
      });

      document.body.appendChild(this.menu);

      this.label = document.createElement("div");
      this.label.className = this.cssClass + "-label";

      this.appendChild(this.label);

      this.label.addEventListener("click", function (e) {
        self.show();
      });

      this.arrow = document.createElement("div");
      this.arrow.className = this.customClass + "-arrow";

      this.header = document.createElement("div");
      this.header.className = this.customClass + "-header";

      this.header.appendChild(this.label);
      this.header.appendChild(this.arrow);

      this.appendChild(this.header);

      this.arrow.addEventListener("click", function (e) {
        self.show();
      });
    }

    clear() {
      this.menu.clear();
      return this;
    }

    add(item) {
      this.menu.add(item);
      return this;
    }

    set(item) {
      if (typeof item == "string" || typeof item == "number") {
        for (var i = 0; i < this.menu.list.length; i++) {
          if (this.menu.list[i][this.menu.index] == item) {
            item = this.menu.list[i];
            break;
          }
        }
      }

      // item is action
      this.label.innerHTML = this.layout.text.formatter
        ? this.layout.text.formatter(item[this.layout.text.field], item)
        : item[this.layout.text.field];
      this.selected = item;

      this._emit("select", item);
      return this;
    }

    show() {
      return this.setVisible(true);
    }

    hide() {
      return this.setVisible(false);
    }

    _computeMenuOuterWidth() {
      return this.menu.offsetWidth - this.menu.clientWidth;
    }

    setVisible(visible) {
      if (visible) {
        this.response.start = 0;
        this._emit("query", null, this.response);

        // show menu
        var rect = this.el.getBoundingClientRect();
        this.menu.el.style.width =
          rect.width - this._computeMenuOuterWidth() + "px";
        this.menu.setVisible(true, rect.left, rect.top + rect.height);
      } else {
        this.menu.hide();
      }

      return this;
    }
  }
);
