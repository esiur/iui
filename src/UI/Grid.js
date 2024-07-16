import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class Grid extends IUIElement {
	constructor()
	{
		super({index: "iid", 
			layout: {content: {field: "name", formatter: null}, 
			title: {field: "content", formatter: null}, 
			footer: {field: "footer", formatter: null}}});

		this._register("add");
		this._register("layout");
		this._register("contextmenu");

		this.windows = [];
	}

    async create() {
        for (var i = 0; i < this.children.length; i++)
            this.add(this.children[i]);
    }

	async updated(){
		if (this.hasAttribute("dynamic")){
			for (var i = 0; i < this.children.length; i++)
				this.add(this.children[i]);
		}
	}

	setGridLayout(style)
	{
		this.style.grid = style;
		this._emit("layout", style, this);
		return this;
	}

    add(win) {
        let self = this;

        win.setAttribute("draggable", true);
        win.addEventListener("dragstart", function (e) {
            e.dataTransfer.effectAllowed = 'move';
            self._dragItem = this;

            this.classList.add(self.cssClass + '-window-drag');

        });

        win.addEventListener("dragover", function (e) {
            if (self._dragItem) {
                e.preventDefault();
                this.classList.add(self.cssClass + '-window-over');
                e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
            }
        });

        win.addEventListener("dragleave", function (e) {

            if (e.preventDefault)
                e.preventDefault();

            this.classList.remove(self.cssClass + "-window-over");
        });

        win.addEventListener("dragend", function (e) {
            this.classList.remove(self.cssClass + '-window-drag');
            self._dragItem = null;
        });

        win.addEventListener("drop", function (e) {
            self._dragItem.classList.remove(self.cssClass + "-window-drag");
            e.currentTarget.classList.remove(self.cssClass + "-window-over");

            for (var i = 0; i < self.children.length; i++)
                if (self.children[i] == self._dragItem) {
                    self.insertBefore(self._dragItem, e.currentTarget.nextSibling);
                    break;
                }
                else if (self.children[i] == e.currentTarget) {
                    self.insertBefore(self._dragItem, e.currentTarget);
                    break;
                }

            self._dragItem = null;
        });

        win.addEventListener("contextmenu", function (e) {
            self.selected = win;
            self._emit("contextmenu", { win });
        });

        win.on("close", function () {
            self.remove(win);
        });
    }

	addOld(item)
	{

		var self = this;

        var li = item;//document.createElement("li");
		//li.setAttribute("data-id", item[this.index]);

       	li.setAttribute("draggable", true);

		li.addEventListener("dragstart", function(e){
			  e.dataTransfer.effectAllowed = 'move';
			  self._dragItem = this;

            this.classList.add(self.cssClass + '-window-drag');

 		});

		li.addEventListener("dragover", function(e){
			if (self._dragItem)
			{
				e.preventDefault();
                this.classList.add(self.cssClass + '-window-over');
				e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
			}
		});

		li.addEventListener("dragleave", function(e){

			if (e.preventDefault) 
				e.preventDefault();

            this.classList.remove(self.cssClass + "-window-over");
		});

		li.addEventListener("dragend", function(e){
            this.classList.remove(self.cssClass + '-window-drag');
			self._dragItem = null;
		});

		li.addEventListener("drop", function(e){
            self._dragItem.classList.remove(self.cssClass + "-window-drag");
            e.currentTarget.classList.remove(self.cssClass + "-window-over");

			for(var i = 0; i < self.children.length; i++)
				if (self.children[i] == self._dragItem)
				{
					self.insertBefore(self._dragItem, e.currentTarget.nextSibling);
					break;
				}
				else if (self.children[i] == e.currentTarget)
				{
					self.insertBefore(self._dragItem, e.currentTarget);
					break;
				}
			
			self._dragItem = null;
		});

		li.addEventListener("contextmenu", function(e){
			self.selected = win;
			self._emit("contextmenu", item, win, this, e);
		});

		var win = iui(li).window({draggable: false, title: this.layout.title.formatter ? this.layout.title.formatter(item[this.layout.title.field], item) : item[this.layout.title.field]});

		var body = this.layout.content.formatter ? this.layout.content.formatter(item[this.layout.content.field], item, win, this) : item[this.layout.content.field];
		if (body instanceof HTMLElement)
			win.body.appendChild(body);
		else
			win.body.innerHTML = body;

		var footer = this.layout.footer.formatter ? this.layout.footer.formatter(item[this.layout.footer.field], item, win, this) : item[this.layout.footer.field];
		if (footer != null)
		{
			var fe = document.createElement("div");
			fe.className = "window-footer";

			if (footer instanceof HTMLElement)
				fe.appendChild(footer);
			else
				fe.innerHTML = footer;

			win.appendChild(fe);
		}

		win.on("close", function(){
			self.remove(win);
		});

		this.appendChild(li);

		win.control = item;

		this.windows.push(win);

		this._emit("add", item, win, this);

		return this;
		//win._updateSize();
	}

	remove(win)
    {
        win.destroy();
        this.removeChild(win);	
	}

	clear()
    {
        while (this.children.length > 0)
            this.removeChild(this.children[0]);
	}
});