import { IUI } from "../Core/IUI.js";
import IUIElement from "../Core/IUIElement.js";
import Background from "./Background.js";
import DropDown from "./DropDown.js";

export default class Menu extends IUIElement {
  constructor(props) {
    super(
      IUI.extend(props, {
        index: "iid",
        layout: { field: "name", formatter: null },
        visible: false,
        static: false,
        "target-class": "selected",
      })
    );

    this._register("visible");
    this._register("select");

    IUI._menus.push(this);
  }

  // clear() {
  //     this.innerHTML = "";
  //     this._uiBindings = null;
  // }

  hide() {
    return this.setVisible(false);
  }

  //show(x, y, element) {
  //   return this.setVisible(true, x, y, element);
  //}

  show(event) {
    event.preventDefault();

    let el = event.currentTarget;
    let x = event.pageX;
    let y = event.pageY;

    this.setVisible(true, x, y, el);
  }

  async showModal(element) {
    //super.data = this._getElementData(element);

    await super.setData(element.data);

    if (!this.background) {
      this.background = document.getElementById("iui_app_background");

      if (!this.background) {
        this.background = new Background(); // document.createElement("div");
        this.background.id = "iui_app_background";
        document.body.insertAdjacentElement("afterBegin", this.background);
      }
    }

    this.background.show();
    this.classList.add(this.cssClass + "-modal");
    this.classList.add(this.cssClass + "-visible");

    var width = window.innerWidth * 0.8;
    this.style.width = width + "px";

    this.style.top =
      window.pageYOffset +
      window.innerHeight / 2 -
      this.offsetHeight / 2 +
      "px"; // (document.body.clientHeight / 2 - this.clientHeight / 2) + "px";
    this.style.left =
      window.pageXOffset + window.innerWidth / 2 - this.offsetWidth / 2 + "px"; //(document.body.clientWidth / 2 - width / 2) + "px";

    this.visible = true;
    this._emit("visible", { visible: true });

    return this;
  }

  async setVisible(visible, x, y, element) {
    this.visible = visible;

    if (this.target) {
      if (this["target-class"] != null && this["target-class"] != "")
        this.target.classList.remove(this["target-class"]);
      this.target = null;
    }

    if (visible) {
      //if (element)
      //let dt = super._getElementData(element);
      if (element) {
        //[super.data, this.target] = dt;

        await this.setData(element.data);
        this.target = element;

        if (this["target-class"] != null && this["target-class"] != "")
          this.target.classList.add(this["target-class"]);
      }

      this._pass = true;

      if (IUI.responsive && !this.static) return this.showModal();

      this.classList.remove(this.cssClass + "-modal");

      var rect = this.getBoundingClientRect();

      if (y != null) {
        if (y + rect.height > document.documentElement.clientHeight)
          this.style.top =
            document.documentElement.clientHeight - rect.height + "px";
        else this.style.top = y + "px";
      }

      this.classList.add(this.cssClass + "-visible");

      if (x != null) {
        if (x + rect.width > document.body.scrollWidth)
          this.style.left = document.body.scrollWidth - rect.width + "px";
        //else if (x < 0)
        //	this.style.left = "0px";
        else this.style.left = x + "px";
      }
    } else {
      this.classList.remove(this.cssClass + "-visible");

      if (this.background) this.background.hide();

      //await super.setData({});// = {};
    }

    this._emit("visible", { visible });

    return this;
  }
}

IUI.module(Menu);

IUI.responsive = false;

window.addEventListener("load", function () {
  var handler = function (e) {
    if (e.target.id == "iui_app_background" && IUI.responsive) {
      for (var i = 0; i < IUI._menus.length; i++)
        if (IUI._menus[i] instanceof Menu) IUI._menus[i].setVisible(false);

      e.preventDefault();
      return;
    }

    for (var i = 0; i < IUI._menus.length; i++) {
      if (IUI._menus[i].visible) {
        var x = e.target;
        var m = IUI._menus[i];
        if (m instanceof Menu) {
          if (m._pass) {
            m._pass = false;
            continue;
          } else if (m.visible) if (!m.contains(e.target)) m.setVisible(false);
        } else if (m instanceof DropDown) {
          if (!(m.contains(e.target) || m.menu.contains(e.target)))
            m.setVisible(false);
        }
      }
    }
  };

  document.body.addEventListener("click", handler);
  document.body.addEventListener("touchstart", handler);
});
