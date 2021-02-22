import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class Range extends IUIElement {
    constructor() {
        super({
            getItem: function (index, data) {
                var item = data[index];
                return item == null ? index : item;
            },
            getIndex: function (x, width, data) {
                if (x < 0) x = 0;
                var p = x / width;
                var index = Math.floor(p * data.length);
                return index;
            },
            getPreview: function (index, data, x, width, el) {
                return null;
            },
            getPosition: function (index, data, width) {
                var itemSize = width / data.length;
                return (index * itemSize) + (itemSize / 2);
            },
            layout: {
                render: function () {
                    return true;
                },
                initialize: function () {
                    return true;
                }
            },
            data: []
        });

        var self = this;


        this._register("select");
        this._register("userSelect");

        this.preview = document.createElement("div");
        this.preview.className = this.customClass + "-preview";


        if (this.layout)
            this.layout.initialize.apply(this);


        this.thumb = document.createElement("div");
        this.thumb.classList.add(this.customClass + "-thumb");

        this.classList.add(this.customClass);
        this.appendChild(this.preview);
        this.appendChild(this.thumb);

        this.addEventListener("mousedown", function (e) {
            self._startDragging(e.clientX, e.clientY);
        });

        this.addEventListener("mouseleave", function (e) {
            self.preview.classList.remove(self.customClass + "-preview-visible");
        });

        this.addEventListener("mouseenter", function (e) {
            var rect = self.getBoundingClientRect();
            self._offset = {
                top: rect.top + document.body.scrollTop,
                left: rect.left + document.body.scrollLeft
            };
        });

        this.addEventListener("mousemove", function (e) {


            self._drag(e.clientX, e.clientY);

            var x = e.clientX - self._offset.left;
            var index = self.getIndex(x, self.offsetWidth, self.data);
            var preview = self.getPreview.call(self, index, self.data, x, self.offsetWidth, self.preview);

            if (preview == null || preview == false) {
                self.preview.classList.remove(self.customClass + "-preview-visible");
                return;
            }
            else if (preview instanceof HTMLElement) {
                while (self.preview.children.length > 0)
                    self.preview.removeChild(self.preview.children[0]);
                self.preview.appendChild(preview);
            }
            else if (preview != true) {
                self.preview.innerHTML = preview;
            }

            var index = self.getIndex((e.clientX - self._offset.left), self.offsetWidth, self.data);
            var dx = self.getPosition(index, self.data, self.offsetWidth);

            self.preview.style.setProperty("--x", dx + "px");
            self.preview.classList.add(self.customClass + "-preview-visible");

        });

        document.addEventListener("mouseup", function (e) {
            if (self._dragging)
                self._endDragging(e.clientX, e.clientY);
        });

        this.addEventListener("touchstart", function (e) {
            self._startDragging(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
        });

        this.addEventListener("touchmove", function (e) {
            self._drag(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
        });

        this.addEventListener("touchend", function (e) {
            self._endDragging(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        });

        this.setData(this.data);
    }

    _startDragging(x, y) {
        this._dragging = true;

        document.onselectstart = function () { return false };

        var rect = this.getBoundingClientRect();
        var body = document.body.getBoundingClientRect();

        this._offset = {
            top: rect.top + body.top,// document.body.scrollTop,
            left: rect.left + body.left,
        };

        var index = this.getIndex((x - this._offset.left), this.offsetWidth, this.data);
        this.set(index, true, true);
    }

    set(index, moveThumb = true, byUser = false) {

        var item = this.getItem(index, this.data);

        if (item != null) {
            if (moveThumb) {
                var dx = this.getPosition(index, this.data, this.offsetWidth);
                this.thumb.style.setProperty("--x", dx + "px");
            }

            this._emit("select", { item, index });

            if (byUser)
                this._emit("userSelect", { item, index });

            this.selected = item;
            this.selectedIndex = index;
        }

        return this;
    }

    _drag(x, y) {
        if (this._dragging) {
            this.thumb.classList.add(this.customClass + "-thumb-dragging");
            var dx = (x - this._offset.left);
            var index = this.getIndex(dx, this.offsetWidth, this.data);
            this.thumb.style.setProperty("--x", dx + "px");
            this.set(index, false, true);
        }
    }

    _endDragging(x, y) {
        document.onselectstart = function () { return true };
        this.thumb.classList.remove(this.customClass + "-thumb-dragging");
        var index = this.getIndex((x - this._offset.left), this.offsetWidth, this.data);
        this.set(index, true, true);
        this._dragging = false;
    }

    clear() {
        return this.setData([]);
    }
     
    render() {
        if (this.layout && this.layout.render)
            this.layout.render.apply(this);
        return this;
    }
});