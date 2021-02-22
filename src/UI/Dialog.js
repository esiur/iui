import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import IUIWindow from "./Window.js";

export default  IUI.module(class IUIDialog extends IUIWindow
{
	static moduleName = "dialog";

	constructor()
	{
			super({ 
                    closeable: true, 
                    resizeable: true, 
                    draggable: false,
                    _dragging: false, 
                    _expanding: false, 
                    x: 0, 
                    y: 0,
                    visible: false,
                    modal: false
                }
            );

			var self = this;

			this._register("visible");
			this._register("resize");
 
			this.on("close", function(){
				self.hide();
			});
 	}

	 create()
	 {
		 
		super.create();
		var self = this;

		if (this.modal)
		{
			this.background = iui("iui_app_background");
			if (!this.background)
			{
				var bg = document.createElement("div");
				bg.id="iui_app_background";
				document.body.insertAdjacentElement("afterBegin", bg);
				this.background = iui(bg).background();
			}
	 

	//		this.modal.className = this.customClass + "-modal-background";

			this.classList.add(this.customClass + "-modal");

		}
 

		this.loading = document.createElement("div");
		this.loading.className = this.customClass + "-loading";

		if (this.loadingText)
			this.loading.innerHTML = this.loadingText;
		else
		{
			var lc = document.createElement("div");
			lc.className = this.customClass + "-loading-content";
			this.loading.appendChild(lc);
		}

		this.body.appendChild(this.loading);


		if (this.draggable)
		{
			this.addEventListener("mousedown", function(e){
				self._startDragging(e);
			});
		}
		else
		{
			this.header.addEventListener('mousedown', function (e) {
				self._startDragging(e);
			});
		}

		document.addEventListener('mouseup', function () {
				self._stopDragging();
				self._stopExpanding();
			});
		
		document.addEventListener('mousemove', function (e) {
				if (self._dragging)
					self._drag(e);
				else if (self._expanding)
					self._expand(e);
			});

		this.addEventListener("mousedown", function(e){	
			if (self.style.cursor == "nwse-resize")
				self._startExpanding(e);
		});

		this.addEventListener("mousemove", function(e)
		{
			if (self._dragging)
				return;

			if (!self._expanding)			
			{
				var x = (e.pageX || e.clientX + (document.documentElement.scrollLeft ?
					document.documentElement.scrollLeft :
					document.body.scrollLeft)) - self.offsetLeft;
				var y = (e.pageY || e.clientY + (document.documentElement.scrollTop ?
					document.documentElement.scrollTop :
					document.body.scrollTop) ) - self.offsetTop;

				if (self.clientWidth - x < 5 && self.clientHeight - y < 5)
				{
					self.style.cursor = "nwse-resize";
				}
				else
				{
					self.style.cursor = "";
				}
			}
		});

	}

	 _startDragging(e)
	 {
		this._dragging = true;

		this._dragX = (e.pageX || e.clientX + (document.documentElement.scrollLeft ?
			document.documentElement.scrollLeft :
			document.body.scrollLeft)) - this.offsetLeft;
			this._dragY = (e.pageY || e.clientY + (document.documentElement.scrollTop ?
			document.documentElement.scrollTop :
			document.body.scrollTop) ) - this.offsetTop;

		//corssbrowser mouse pointer values
		 document.onselectstart = function() {return false};
	 }
  
	 _drag(e)
	 {
		var x = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
			document.documentElement.scrollLeft :
			document.body.scrollLeft);
		var y = e.pageY || e.clientY + (document.documentElement.scrollTop ?
			document.documentElement.scrollTop :
			document.body.scrollTop);
		this.style.top = (y - this._dragY ) + "px";// (y - self.y) + "px";
		this.style.left = (x -this._dragX ) + "px";//(x - self.x) + "px";
		this._emit("move", {left: this.offsetLeft, top: this.offsetTop});
	 }

	 _stopDragging()
	 {
		this._dragging = false;
	 }

	 _startExpanding(e)
	 {
		document.onselectstart = function() {return false};
		this._expanding = true;
		this._dragX = (e.pageX || e.clientX + (document.documentElement.scrollLeft ?
			document.documentElement.scrollLeft :
			document.body.scrollLeft)) - this.offsetLeft;
		this._dragY = (e.pageY || e.clientY + (document.documentElement.scrollTop ?
			document.documentElement.scrollTop :
			document.body.scrollTop) ) - this.offsetTop;
		this._width = this.clientWidth;
		this._height = this.clientHeight;
	 }

	 _expand(e)
	 {
		var x = (e.pageX || e.clientX + (document.documentElement.scrollLeft ?
			document.documentElement.scrollLeft :
			document.body.scrollLeft))  - this.offsetLeft;
		var y = (e.pageY || e.clientY + (document.documentElement.scrollTop ?
			document.documentElement.scrollTop :
			document.body.scrollTop)) - this.offsetTop;

		
		this.resize(this._width + x -this._dragX, this._height + y - this._dragY);
	 }

	 _stopExpanding()
	 {
		this._expanding = false;
		this.style.cursor = "";
		this._width = this.clientWidth;
		this._height = this.clientHeight;
		document.onselectstart = function() {return true};
	 }

    setLoading(visible)
	{
		if (this.footer)
			for(var i = 0; i < this.footer.children.length; i++)
				if (this.footer.children[i].nodeName == "BUTTON")
					this.footer.children[i].disabled = visible;

		if (visible)
			this.loading.classList.add(this.customClass + "-loading-visible");
		else
			this.loading.classList.remove(this.customClass + "-loading-visible");

		return this;
	}

	center()
	{
		this._updateSize();
		return this.move(window.pageXOffset + (window.innerWidth / 2) - (this.offsetWidth / 2), 
						 window.pageYOffset + (window.innerHeight / 2) - (this.offsetHeight / 2));
	}

	setVisible(visible)
	{

		if (visible == this.visible)
			return;

		this.visible = visible;
		
		if (visible)
		{
			this.classList.add(this.customClass + "-visible");
 
			if (this.background)
			{
				this.background.setVisible(true);

			}
			//else
			if (!this._shown)
			{
				this._updateSize();
				this._shown = true;
			}

			this.setFocus(true);

			this._updateSize();

		}
		else
		{
			this._updateSize();

			this.classList.remove(this.customClass + "-visible");
			this.classList.remove(this.customClass + "-active");

			if (this.background)
				this.background.setVisible(false);

				//this.modal.classList.remove(this.customClass + "-modal-background-visible");

			this.setFocus(false);

			var i = IUI._nav_list.indexOf(this);
			if (i > -1)
				IUI._nav_list.splice(i, 1);

			/*
			IUI._nav_list.pop
			if (IUI._previousWindow)
				if (IUI._previousWindow.visible)
					IUI._previousWindow.focus();
				else
					window.location.hash = "";
			else
				window.location.hash = "";
				*/
		}

		this._emit("visible", {visible});

		return this;
	}
	
	hide()
	{
		this.setVisible(false);
		return this;
	}
	
	show()
	{
		this.setVisible(true);
 		return this;
	}
});

document.addEventListener("keydown", function (e) {
    if ( e.keyCode === 27 ) { // ESC
        var dialogs = IUI.registry.filter(function(o){ return ( o instanceof IUIDialog); }).filter(function(x){return x.focus;});
		for(var i = 0; i < dialogs.length; i++)
			dialogs[i].hide();
    }
})


//IUI.module("dialog", IUIDialog, function(el, modal, properties){ return new IUIDialog(el, modal, properties);});