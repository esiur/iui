import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import Tabs from "./Tabs.js";
import Tab from "./Tab.js";

export default IUI.module(
  class Form extends IUIElement {
    constructor() {
      super();
    }

    create() {
      this._container = document.createElement("div");
      this._container.className = "container";

      this._actions = document.createElement("div");
      this._actions.className = "actions";

      this._save = document.createElement("button");
      this._save.className = "button";
      this._save.innerHTML = this.hasAttribute("save")
        ? this.getAttribute("save")
        : "Save";
      this._cancel = document.createElement("button");
      this._cancel.className = "button";
      this._cancel = this.hasAttribute("cancel")
        ? this.getAttribute("cancel")
        : "Cancel";

      this._save.addEventListener("click", x => {});

      this._cancel.addEventListener("click", x => {
        window.router.back();
      });

      this._actions.appendChild(this._save);
      this._actions.appendChild(this._cancel);

      this.appendChild(this._container);
      this.appendChild(this._actions);
    }

    set layout(value) {
      /*
         
         mode:tabs,
         tabs: [
            {name: 'Tab Name'},
            {content: [
                {field: 'item', type: 'text|selectlist|check|autocomplete|form', layout: {}}
            ]}
         ]
         */
      // render layout
      if (value.mode == "tabs") {
        for (var i = 0; i < this.layout.tabs.length; i++) {
          // render tab
          this.mode = "tabs";
          this._tabs = new Tabs();
          var tab = new Tab();
          this._tabs.add(tab);
          for (var j = 0; j < this._tabs.length; j++) {}
          this.layout.tasbs[i].content;
        }
      }
    }

    set data(value) {
      var self = this;

      if (value == null) this._input.value = "";
      else {
        this._input.value = value[this._field];

        if (value.on)
          value.on("modified", (propertyName, value) => {
            if (propertyName == self._field)
              self._input.value = value[self._field];
          });
      }
      //super.data = data;
    }

    get layout() {
      return this._input.value;
    }

    set layout(value) {
      // load layout

      for (var i = 0; i < value.length; i++) {
        // [{tab: },{}]
      }

      this._input.value = value;
    }
  }
);
