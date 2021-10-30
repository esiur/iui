import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class CodePreview extends IUIElement {
    constructor(properties) {
        super();
    }

    async create() {

        if (this.hasAttribute("debug"))
            debugger;

        this._code = this.innerHTML.trim();
        this.textContent = '';
        
        // create elements
        this.bar = document.createElement("div");
        this.bar.className = this.cssClass + "-bar";
        this.content = document.createElement("div");
        this.content.className = this.cssClass + "-content";
        this.editor =  document.createElement("code");
        this.editor.className = this.cssClass + "-editor";

        this.editor.innerText = this._code;
        this.editor.contentEditable = true;

        this.editor.setAttribute("skip", true);

        let self = this;
        this.editor.addEventListener("input", function() {
            self._code = self.editor.innerText.trim();
            self.update();
        }, false);
        
        this.preview = document.createElement("div");
        this.preview.className = this.cssClass + "-preview";
        //this.preview.setAttribute(":content", "");

        this.content.append(this.editor);
        this.content.append(this.preview);
        
        this.append(this.bar);
        this.append(this.content);
        this.field = this.getAttribute("field");

        await this.update();
    }
   
    
    async update() {
        
        if (this._updating)
            return;

        this._updating = true;
        this.preview.innerHTML = this._code;

        await IUI.create(this.preview);
        await IUI.created(this.preview);
        IUI.bind(this.preview, this.preview, "preview");
        await IUI.render(this.preview, this._data, true);

        this._updating = false;
    }
});