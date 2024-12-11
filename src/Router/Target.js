import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import Route from "./Route.js";
import Layout from '../Data/Layout.js';

export default IUI.module(class Target extends IUIElement {

    $messageElement;
    $progressElement;

    constructor(properties) {
        super(IUI.extend(properties, { cssClass: 'target' }));

        this._register("show");
        this._register("hide");
    }

    setLoading(value) {
        if (value)
            this.$loadingElement.classList.add(this.cssClass + "-loading-visible");
        else
            this.$loadingElement.classList.remove(this.cssClass + "-loading-visible");
    }


    async setMessage(message) {
        await this.$messageElement.setData({ message });
    }

    async setProgress(progress, max) {
        await this.$progressElement.setData({ progress, max });
    }


    create() {

        this.$loadingElement = document.createElement("div");
        this.$loadingElement.className = this.cssClass + "-loading";
        this.$loadingElement.setAttribute(":data", "{progress: 0, max: 0, message: '...'}");

        this.appendChild(this.$loadingElement);

        // get collection
        let layout = Layout.get(this, "i-element", true, true);

        for (let name in layout) {
            if (name == "progress") {
                this.$progressElement = layout[name].node;
                this.$loadingElement.appendChild(this.$progressElement);
            }
            else if (name = "message") {
                this.$messageElement = layout[name].node;
                this.$loadingElement.appendChild(this.$messageElement);
            }
        }
    }

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


        if (route.parentElement != this)
            this.appendChild(route);

        this._emit("show", { route, previous });
    }

    hide(route) {
        for (var i = 0; i < this.children.length; i++)
            if (this.children[i] instanceof Route) {
                this.children[i].set(false);
            }

        this._emit("hide", { route });
    }
});