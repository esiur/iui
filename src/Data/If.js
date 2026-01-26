import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class If extends IUIElement {
    constructor() {
        super();
        this._condition = false;
        this._template = [];
        this._prepared = false;
        this._updating = false;
    }

    get condition() {
        return this._condition;
    }

    set condition(value) {
        const next = !!value;
        if (this._condition === next)
            return;
        this._condition = next;
        this._updateVisibility();
    }

    create() {
        if (this._created)
            return;
        this._created = true;
        this._stashChildren();
    }

    _stashChildren() {
        this._template = Array.from(this.childNodes);
        for (let i = 0; i < this._template.length; i++)
            this.removeChild(this._template[i]);
    }

    _restoreChildren() {
        if (this.childNodes.length !== 0 || this._template.length === 0)
            return;
        for (let i = 0; i < this._template.length; i++)
            this.appendChild(this._template[i]);
    }

    async _updateVisibility() {
        if (this._updating)
            return;
        this._updating = true;

        try {
            if (this._condition) {
                this._restoreChildren();

                if (!this._prepared) {
                    await IUI.create(this);
                    IUI.bind(this, true, "if", this.__i_bindings?.scope);
                    this.__i_bindings?.scope?.refs?._build();
                    await IUI.created(this);
                    this._prepared = true;
                }

                await IUI.render(this, this._data, false, this._radix);
            }
            else if (this.childNodes.length > 0) {
                this._template = Array.from(this.childNodes);
                for (let i = 0; i < this._template.length; i++)
                    this.removeChild(this._template[i]);
            }
        } finally {
            this._updating = false;
        }
    }
});
