import { IUI } from '../Core/IUI.js';
import IUIElement from '../Core/IUIElement.js';
import Menu from '../UI/Menu.js';
import Layout from '../Data/Layout.js';
import Repeat from '../Data/Repeat.js';

export default IUI.module(class Multiselect extends IUIElement {
    constructor() {
        super({
            visible: false,
            searchlist: false,
            hasArrow: true,
            distinct: false,
            query: (x) => null
        });

        this._register("select");
        this._register("input");
        this._register("add");
        this._register("remove");
    }

    disconnectedCallback() {
        if (!this.searchlist && this.menu)
            app.removeChild(this.menu);
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this.searchlist && this.menu)
            app.appendChild(this.menu);
    }

    _parseBoolAttr(name, fallback) {
        let value = this.getAttribute(name);
        if (value == null)
            return fallback;
        return !(value === "false" || value === "0" || value === "no");
    }

    _checkValidity() {

        if (this.validate != null) {
            try {
                let valid = this.validate.apply(this);
                if (!valid) {
                    this.setAttribute("invalid", "");
                    this.classList.add(this.cssClass + "-invalid");
                    return false;
                }
                else {
                    this.removeAttribute("invalid");
                    this.classList.remove(this.cssClass + "-invalid");
                    return true;
                }
            }
            catch (ex) {
                console.log("Validation Error", ex);
                return false;
            }
        }

        return true;
    }

    _getItemKey(item) {
        if (!this._keyField)
            return item;
        return item == null ? item : item[this._keyField];
    }

    _hasItem(item, list) {
        let key = this._getItemKey(item);
        for (let i = 0; i < list.length; i++)
            if (this._getItemKey(list[i]) === key)
                return true;
        return false;
    }

    _getItemFromTarget(target) {
        let node = target;
        while (node && node !== this.menu && node !== this.repeat) {
            if (node.data !== undefined)
                return node.data;
            node = node.parentElement;
        }
        return undefined;
    }

    async create() {

        this.isAuto = this.hasAttribute("auto");
        this.field = this.getAttribute("field");

        if (this.field != null) {
            this.setAttribute(":data", `d['${this.field}']`);
            this.setAttribute(":revert", `d['${this.field}'] = this.data`);
        }

        this.distinct = this._parseBoolAttr("distinct", this.distinct);
        this._keyField = this.getAttribute("key") || this.getAttribute("key-field");

        let self = this;

        this.repeat = new Repeat();
        this.repeat.cssClass = this.cssClass + "-menu-repeat";

        if (this.hasAttribute("menu")) {
            let menuData = this.getAttribute("menu");
            this.repeat.setAttribute(":data", menuData);
        }

        if (this.hasAttribute("footer")) {
            let footer = this.getAttribute("footer");
            this.footer = document.createElement("div");
            this.footer.className = this.cssClass + "-footer";
            this.footer.innerHTML = footer;
        }

        this.menu = new Menu({ cssClass: this.cssClass + "-autocomplete-menu", "target-class": "" });

        this.menu.on("click", async (e) => {
            if (e.target != self.textbox && e.target != self.footer && e.target !== self.menu && e.target != self.repeat) {
                let item = self._getItemFromTarget(e.target);
                if (item !== undefined) {
                    await self._addItem(item);
                }
            }
        }).on("visible", x => { if (!x.visible) self.hide(); });

        this.textbox = document.createElement("input");
        this.textbox.type = "search";
        this.textbox.className = this.cssClass + "-autocomplete-textbox";

        if (this.placeholder)
            this.textbox.placeholder = this.placeholder;

        this.textbox.addEventListener("keyup", function (e) {
            if (e.keyCode != 13) {
                self._query(0, self.textbox.value);
            }
        });

        this.textbox.addEventListener("focus", function () {
            self.show();
        });

        // get collection
        let layout = Layout.get(this, "div", true, true);
        let menuTemplate = null;
        let chipTemplate = null;

        if (layout != null && layout.label != undefined && layout.menu != undefined) {
            chipTemplate = layout.label.node;
            menuTemplate = layout.menu.node;
        }
        else if (layout != null && layout.null != null) {
            chipTemplate = layout.null.node;
            menuTemplate = layout.null.node.cloneNode(true);
        }
        else {
            chipTemplate = document.createElement("div");
            chipTemplate.innerHTML = this.innerHTML;
            menuTemplate = document.createElement("div");
            menuTemplate.innerHTML = this.innerHTML;
        }

        this.repeat.appendChild(menuTemplate);

        this.chips = new Repeat();
        this.chips.cssClass = this.cssClass + "-chips";

        let chip = document.createElement("div");
        chip.className = this.cssClass + "-chip";
        chip.setAttribute("repeat", "");

        let chipText = document.createElement("div");
        chipText.className = this.cssClass + "-chip-text";
        chipText.appendChild(chipTemplate);

        let chipRemove = document.createElement("div");
        chipRemove.className = this.cssClass + "-chip-remove";

        chip.appendChild(chipText);
        chip.appendChild(chipRemove);
        this.chips.appendChild(chip);

        this.wrap = document.createElement("div");
        this.wrap.className = this.cssClass + "-input";
        this.wrap.appendChild(this.chips);
        this.wrap.appendChild(this.textbox);

        this.header = document.createElement("div");
        this.header.className = this.cssClass + "-autocomplete-header";
        this.header.appendChild(this.wrap);

        this.appendChild(this.header);

        this.wrap.addEventListener("click", function (e) {
            if (e.target && e.target.classList.contains(self.cssClass + "-chip-remove"))
                return;
            self.textbox.focus();
            self.show();
        });

        this.chips.addEventListener("click", function (e) {
            let remove = e.target?.closest("." + self.cssClass + "-chip-remove");
            if (!remove)
                return;
            let chip = remove.closest("." + self.cssClass + "-chip");
            if (!chip)
                return;
            let index = parseInt(chip.dataset.index, 10);
            if (!Number.isNaN(index))
                self._removeItemAt(index);
        });

        this.menu.appendChild(this.repeat);
        if (this.footer != null)
            this.menu.appendChild(this.footer);

        if (this.hasArrow) {
            this.arrow = document.createElement("div");
            this.arrow.className = this.cssClass + "-autocomplete-arrow";
            this.header.appendChild(this.arrow);

            this.arrow.addEventListener("click", function () {
                if (self.visible)
                    self.hide();
                else
                    self.show();
            });
        }

        if (this.searchlist)
            this.appendChild(this.menu);
        else {
            app.appendChild(this.menu);
            if (app.loaded) {
                await IUI.create(this.menu);
                IUI.bind(this.menu, false, "menu", this.__i_bindings?.scope, false);
                this.__i_bindings?.scope?.refs?._build();
                await IUI.created(this.menu);
            }
        }

        this.addEventListener("click", function (e) {
            if (e.target == self.textbox)
                self.show();
        });
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }

    set disabled(value) {
        if (this.textbox)
            this.textbox.disabled = value;

        if (value)
            this.setAttribute("disabled", value);
        else
            this.removeAttribute("disabled");
    }

    show() {
        this.setVisible(true);
    }

    hide() {
        this.setVisible(false);
    }

    clear() {
        if (this.textbox)
            this.textbox.value = "";
        return this.setData([]);
    }

    async _query() {

        if (this.disabled)
            return;

        let text = this.textbox ? this.textbox.value : null;
        let res;

        if (this.query instanceof Array) {
            res = this.query;
        }
        else if (this.query instanceof Function) {
            res = this.query(0, text);
            if (res instanceof Promise)
                res = await res;
        }

        await this.menu.setData(res);
    }

    async _addItem(item) {
        if (item == null)
            return;

        let next = Array.isArray(this._data) ? this._data.slice() : [];

        if (this.distinct && this._hasItem(item, next))
            return;

        next.push(item);
        await this.setData(next);

        this._emit("input", { value: next });
        this._emit("add", { value: item });

        if (this.textbox) {
            this.textbox.value = "";
            this._query(0);
            this.textbox.focus();
        }
    }

    async _removeItemAt(index) {
        let list = Array.isArray(this._data) ? this._data.slice() : [];
        if (index < 0 || index >= list.length)
            return;

        let removed = list.splice(index, 1)[0];
        await this.setData(list);

        this._emit("input", { value: list });
        this._emit("remove", { value: removed });
    }

    _syncChipIndices() {
        if (!this.chips || !this.chips.list)
            return;
        for (let i = 0; i < this.chips.list.length; i++)
            this.chips.list[i].dataset.index = i;
    }

    async setData(value, radix) {

        if (value?.toArray instanceof Function)
            value = value.toArray();
        else if (!(value instanceof Array || value instanceof Int32Array))
            value = value == null ? [] : [value];

        if (this.distinct) {
            let seen = new Set();
            let deduped = [];
            for (let i = 0; i < value.length; i++) {
                let key = this._getItemKey(value[i]);
                if (!seen.has(key)) {
                    seen.add(key);
                    deduped.push(value[i]);
                }
            }
            value = deduped;
        }

        await super.setData(value, radix);

        this._syncChipIndices();

        try {
            this._emit("select", { value });
        }
        catch (ex) {
            this._emit("select", { value });
        }

        if (this._checkValidity() && this.isAuto)
            this.revert();
    }

    setVisible(visible) {
        if (visible == this.visible)
            return;

        if (visible) {
            this._query(0);

            var rect = this.getBoundingClientRect();
            this.menu.style.width = (this.clientWidth - this._computeMenuOuterWidth()) + "px";
            this.menu.style.paddingTop = rect.height + "px";
            this.menu.setVisible(true, rect.left, rect.top);
            this.visible = true;

            this.classList.add(this.cssClass + "-visible");

            if (this.textbox)
                setTimeout(() => {
                    this.textbox.focus();
                }, 100);

        }
        else {
            this.visible = false;
            this.classList.remove(this.cssClass + "-visible");
            this.menu.hide();
        }
    }

    _computeMenuOuterWidth() {
        return this.menu.offsetWidth - this.menu.clientWidth;
    }
});
