import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import Layout from "../Data/Layout.js";

export default IUI.module(class Table extends IUIElement {
	constructor()
	{
		super({
			indexer: (x) => x.instance?.id ?? x.id,
			parents_getter: (x) => x.instance?.attributes.item("parents"),
			children_getter: (x) => x.instance?.attributes.item("children"), 
			parents_changed: (x, p) => false,					
			_long_press_x: 0,
			_long_press_y: 0,
			updateOnModification: true,
			last_query: () => true
		});

		var self = this;

		this.list = [];

		this._register("click");
		this._register("rowdblclick");
		this._register("contextmenu");
		this._register("expand");
		this._register("enter");
		this._register("leave");
		this._register("touch");


		//window.addEventListener("resize", function(e){
		//	self.updateSize();
		//});
		
		this._resizing = false;
		this._resizeX = 0;
	}

	get layout()
	{
		return this._layout;
	}

	set layout(value)
	{
		this._layout = value;

		if (!this._created)
			return;

		var self = this;

		this.header.innerHTML = "";

		let row = this.header.insertRow();

		for (var i = 0; i < value.length; i++) {
			let column = value[i];
			let cell = row.insertCell();

			
			var width;
			if (column.width && column.width.substring(column.width.length-1) == "%")
				width = ((parseInt(column.width.substring(0, column.width.length - 1)) / 100) * this.clientWidth) + "px";
			else
				width = column.width;
		
			cell.style.width = width;
			//cell.setAttribute("data-width", column.width);
		
			let hWrap = document.createElement("div");
			hWrap.className = this.cssClass + "-header-wrap";
			
			let resizer = document.createElement("div");
			resizer.className = this.cssClass + "-resizer";
			
			resizer.addEventListener("mousedown", function(e)
			{
				self.updateSize();
				//corssbrowser mouse pointer values
				self._resizeX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
				document.documentElement.scrollLeft :
				document.body.scrollLeft);
		
				self._resizingColumnWidth = cell.clientWidth;
				self._resizingTableWidth = self.table.clientWidth;						
				self._resizing = true;
				self._resizingColumn = cell;// self.headers.indexOf(cell); 
				document.onselectstart = function() {return false};
			});
						
			
			if (column.type && column.type == "search")
			{
				let input = document.createElement("input");
				input.type = "search";
				input.className = this.cssClass + "-header-input";
				input.placeholder = column.name;
				input.id = self.id + "_" + column.field;
						
				input.addEventListener("keyup", function() {
						self.search(column, input.value);
				});
						
				hWrap.appendChild(input);
		
			}
			else if (column.type && column.type == "select")
			{
				// filter out list
				column.filter = [];
						
				let select = document.createElement("div");
				select.id = self.id + "_" + column.field;
				select.className = self.cssClass + "-header-select";
				select.innerHTML = column.name;
				select.setAttribute("data-dir", "normal");
		
				var menu = document.createElement("div");
				menu.className = self.cssClass + "-header-menu";
		
				select.addEventListener("click", function(e)
				{
					if (select.getAttribute("data-dir") == "down")
						self.sort(column, true);
					else
						self.sort(column, false);
				});
		
				var tip = document.createElement("div");
				tip.className = self.cssClass + "-filter-menu";
				menu.appendChild(tip);
		
				menu.addEventListener("click", function(evt){
					if (evt.target != menu)
						return;
							
					if (tip.style.display == "none")
					{
						var items = self.list.distinct(column.field);
						tip.innerHTML = "";
								
						var filters = [];
								
						for(var i = 0; i < items.length; i++)
						{
							var item = items[i];
							var fc = document.createElement("input");
							fc.type = "checkbox";
							fc.checked = column.filter.indexOf(item) > -1 ? false : true;
							// add to filters list
							filters.push({el: fc, text: item});
							// add to field.filter to be rendered by the grid
							fc.addEventListener("click", function(){
								column.filter = [];
								filters.forEach(function(filter)
								{
									if (!filter.checked)
										column.filter.push(filter.text);
								});
										
								self._applyFilter();
							});
									
							var fi = document.createElement("label");
							fi.className = self.cssClass + "-filter-menu-item";
							fi.innerHTML = column.formatter ? column.formatter(item, fi) : item;
							tip.appendChild(fc);
							tip.appendChild(fi);
							tip.appendChild(document.createElement("br"));
						}
								
						tip.style.display = "block";
					}
					else
					{
						tip.style.display = "none";
					}
				});
		
		
				hWrap.appendChild(select);
				hWrap.appendChild(menu);
		
			}
			else
			{
				let text = document.createElement("div");
				text.className = self.cssClass + "-header-text";
				text.innerHTML = column.name;
				text.setAttribute("data-dir", "normal");
						
				//var sort = ne("div");
				//sort.className = "grid-header-sort";
						
				hWrap.appendChild(text);
				//hWrap.appendChild(resizer);
				//hWrap.appendChild(sort);
		
				text.addEventListener("click", function(e)
				{
					if (text.getAttribute("data-dir") == "down")
						self.sort(column, true);
					else
						self.sort(column, false);
				});
			}
					
			hWrap.appendChild(resizer);
			cell.appendChild(hWrap);
		}		
	}


	create() {		 
		let self = this;

		 // get layout
		 this._layout = Layout.get(this, "td", true);

		 this.table = document.createElement("table");
		 this.table.className = this.cssClass + "-body";
		this.appendChild(this.table);
		
		this.body = this.table.createTBody();
		 this.header = this.table.createTHead();
		 this.header.className = this.cssClass + "-header";

		this.body.addEventListener("mousedown", function(e){
			if (self.multiselect)
			{
				self._boxStartX = e.pageX;
				self._boxStartY = e.pageY;
				self._multiselecting = true;
				self.selectBox.classList.add(self.cssClass + "-select-box-visible");
			}
		});

		this.selectBox = document.createElement("div");
		this.selectBox.className = this.cssClass + "-select-box";
		this.appendChild(this.selectBox);

		this.body.addEventListener("mousemove", function(e){

			if (self._multiselecting || self._multideselecting)
			{
				self._boxEndX = e.pageX;
				self._boxEndY = e.pageY;

				if (e.movementY > 0)
				{
					self._multiselecting = true;
					self._multideselecting = false;
				}
				else if (e.movementY < 0)
				{
					self._multiselecting = false;
					self._multideselecting = true;
				}

			
				if (self._boxEndX > self._boxStartX)
				{
					self.selectBox.style.left = self._boxStartX + "px";
					self.selectBox.style.width = (self._boxEndX - self._boxStartX) + "px";
				}
				else
				{
					self.selectBox.style.left = self._boxEndX + "px";
					self.selectBox.style.width = (self._boxStartX - self._boxEndX) + "px";
				}

				if (self._boxEndY > self._boxStartY)
				{
					self.selectBox.style.top = self._boxStartY + "px";
					self.selectBox.style.height = (self._boxEndY - self._boxStartY) + "px";
				}
				else
				{
					self.selectBox.style.top = self._boxEndY + "px";
					self.selectBox.style.height = (self._boxStartY - self._boxEndY) + "px";
				}

				// now lets look for all rows within this range
				var rect = self.body.getBoundingClientRect();
				var offset = {
				top: rect.top + document.body.scrollTop,
				left: rect.left + document.body.scrollLeft
				};
				
				var by, sy;

				if (self._boxStartY > self._boxEndY)
				{
					by = self._boxStartY - offset.top;
					sy = self._boxEndY - offset.top;
				}
				else
				{
					by = self._boxEndY - offset.top;
					sy = self._boxStartY - offset.top;
				}


				var selected = [];

				for(var i = 0; i < self.body.rows.length; i++)
				{
					var top = self.body.rows[i].offsetTop;
					var bottom = top + self.body.rows[i].offsetHeight;

					if ((top > sy || bottom > sy) && (top < by || bottom < by))
					{
						selected.push(self.body.rows[i]);
						self.body.rows[i].classList.add(self.cssClass + "-row-selected");
					}
					else
					{
						self.body.rows[i].classList.remove(self.cssClass + "-row-selected");
					}
				}

				for(var i = 0; i < selected.length; i++)
					self._selectChildren(selected[i], true);
			}
		});

		document.body.addEventListener("mouseup", function(e){

			if (self._multiselecting || self._multideselecting)
			{	
				self._multiselecting = false;
				self._multideselecting = false;
				self.selectBox.classList.remove(self.cssClass + "-select-box-visible");
				self.selectBox.style.width = "0px";
				self.selectBox.style.height = "0px";
			}
		});
		
		
		document.addEventListener('mouseup', function () {
			self._resizing = false;
			document.onselectstart = function() {return true};

			});
		
		document.addEventListener('mousemove', function (e) {
			if (self._resizing) {
				var x = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
				document.documentElement.scrollLeft :
				document.body.scrollLeft);
				//var y = e.pageY || e.clientY + (document.documentElement.scrollTop ?
				//  document.documentElement.scrollTop :
				//  document.body.scrollTop);
	
				var col = self._resizingColumn;

				var tw,cw;

				if (document.dir == "rtl")
				{
					tw = (self._resizingTableWidth - (x - self._resizeX));
					cw = (self._resizingColumnWidth - (x - self._resizeX));
				}
				else
				{
					tw = (self._resizingTableWidth + (x - self._resizeX));
					cw = (self._resizingColumnWidth + (x - self._resizeX));
				}

	
				// must have limits
				if (cw > 20)
				{
					/*
					tw = 0;
					for(var i = 0; i < self.headers.length; i++)
					{
						if (i != self.resizingColumn)
							tw += self.headers[i].clientWidth;
						//self.headers[self.resizingColumn];
					}
	*/
					//tw += cw;
					self.header.style.width = tw + "px";
					self.table.style.width = tw + "px";

					col.style.width = cw + "px";
					//dummy.style.width = cw + "px";// col.style.width;


				}
			}
		});

		// load data
		//if (this.data)
		//	this.load(this.data);
		
		//this.updateSize();

		 this._created = true;

		 if (this._layout) 
			 this.layout = this._layout;
	 }


	updateSize()
	{
		let totalWidth = 0;

		for (var i = 0; i < this.table.tHead.rows[0].cells.length; i++)
		{
			var header = this.table.tHead.rows[0].cells[i];
			var width = header.clientWidth + "px"; 
			
			if (width == "0px")
			{
				width = this.headers[i].getAttribute("data-width");
				if (width.substring(width.length-1) == "%")
					width = ((parseInt(width.substring(0, width.length - 1)) / 100) * this.clientWidth) + "px";
			}

			if (header.style.display != "none")
				totalWidth+=parseInt(width.substr(0, width.length-2));

			header.style.width = width;
		}
		
		if (this.clientWidth > 0)
		{
			this.body.style.width = this.table.tHead.clientWidth + "px";
			this.table.tHead.style.width = this.table.tHead.clientWidth + "px";
		}
		else
		{
			this.table.style.width = totalWidth + "px";
		}
	}
	
	sort(column, desc)
	{

		
		if (this.tree)
			return;

		//let column = this.layout[columnIndex];

		if (column.sorter)
		{
			this.list.sort(column.sorter);
		}
		else
		{
			this.list.sort(function(a, b){
				if (typeof a[column.field] == "number" || a[column.field] instanceof Date)
					return a[column.field] - b[column.field];
				else
					return a[column.field].toString().localeCompare(b[column.field]);
			
			});
		}

		if (desc)
			this.list.reverse();
		
		for(var i = 0; i < this.list.length; i++)
		{
			var tr = this.getRows(this.indexer(this.list[i]))[0];
			this.body.insertAdjacentElement("beforeEnd", tr);
		}

		for(var i = 0; i < this.layout.length; i++)
		{
			let th = this.table.tHead.rows[0].cells[i];
			let txt = th.getElementsByClassName(this.cssClass + "-header-text")[0];
		
			if (column !== this.layout[i])
				txt.setAttribute("data-dir", "normal");
			else if (desc)
				txt.setAttribute("data-dir", "up");
			else
				txt.setAttribute("data-dir", "down");
		}
	}
	
 
	setRowVisible(row, visible)
	{
		var level = parseInt(row.getAttribute("data-level"));

		if (visible)
		{
			row.classList.remove(this.cssClass + "-row-hidden");
			row.classList.remove(this.cssClass + "-row-selected");
		
			// make sure parent is visible
			for(var i = row.rowIndex - 2; i >= 0; i--)
			{
				var lev = parseInt(this.body.rows[i].getAttribute("data-level"));
				if (lev > level)
					break;
				else if (lev < level)
				{
					this.setRowVisible(this.body.rows[i], true);
					break;
				}
			}
		}
		else
		{
			row.classList.add(this.cssClass + "-row-hidden");
			// make sure children are visible
			for(var i = row.rowIndex; i < this.body.rows.length; i++)
			{
				var lev = parseInt(this.body.rows[i].getAttribute("data-level"));
				if (lev <= level)
					break;
				this.body.rows[i].classList.add(this.cssClass + "-row-hidden");
			}
		}
	} 

	expand(row, visible)
	{
		var button = row.getElementsByClassName(this.cssClass + "-tree")[0];
		button.setAttribute("data-expand", visible ? 1 : 0);
		var level = parseInt(row.getAttribute("data-level"));
		
		for(var i = row.rowIndex; i < this.body.rows.length; i++)
		{
			var lev = parseInt(this.body.rows[i].getAttribute("data-level"));
			if (lev <= level)
				break;
			
			if (!visible)
			{
				button = this.body.rows[i].getElementsByClassName(this.cssClass + "-tree");
				if (button.length > 0)
					button[0].setAttribute("data-expand", 0);
				this.body.rows[i].classList.add(this.cssClass + "-row-hidden");
			}
			else if (lev == level + 1)
				this.body.rows[i].classList.remove(this.cssClass + "-row-hidden");
		}

		//this.updateSize();
	};
	
	
	filter(queryFunction)
	{
		if (queryFunction)
		{
			this.last_query = queryFunction;

			for(var i = 0; i < this.body.rows.length; i++)
			{
				var item = this.get(parseInt(this.body.rows[i].getAttribute("data-id")));
				var visible = queryFunction(item);
				this.setRowVisible(this.body.rows[i], visible);
			}
		}
		// restore default view
		else 
		{
			this.last_query = function(){return true};

			// view all
			for(var i = 0; i < this.body.rows.length; i++)
				this.body.rows[i].classList.remove(this.cssClass + "-row-hidden");
			
			// hide non-expanded
			for(var i = 0; i < this.body.rows.length; i++)
			{
				var row = this.body.rows[i];
				var level = parseInt(row.getAttribute("data-level"));
				var button = row.getElementsByClassName(this.cssClass + "-tree");
				if (button.length > 0)
				{
					// hide ?
					if (button[0].getAttribute("data-expand") == '0')
					{
						for(i = i + 1; i < this.body.rows.length; i++)
						{
							var subRow = this.body.rows[i];
							var l = parseInt(subRow.getAttribute("data-level"));
							if (l > level)
								subRow.classList.add(this.cssClass + "-row-hidden");
							else
							{
								i--;
								break;
							}
						}
					}
				}
			}
		}
	}

	_selectChildren(row, value)
	{
		var level = parseInt(row.getAttribute("data-level"));

		for(var i = row.rowIndex; i < this.body.rows.length; i++)
		{
			var subRow = this.body.rows[i];
			var l = parseInt(subRow.getAttribute("data-level"));
			if (l > level)
			{
				if (value)
					subRow.classList.add(this.cssClass + "-row-selected");
				else
					subRow.classList.remove(this.cssClass + "-row-selected");
			}
			else
			{
				break;
			}
		}
	}

	_select(row, item, multiple = false, context = false)
	{
		if (this.multiselect)
		{
			
			var checked = row.classList.contains(this.cssClass + "-row-selected");

			// implement Microsoft Windows Explorer behaivor
			if (context)
			{
				multiple = checked || multiple;
				checked = !checked;
			}

			if (multiple)
			{
				var rows = this.getRows(this.indexer(item));

				if (checked)
					for(var i = 0; i < rows.length; i++)
					{
						rows[i].classList.remove(this.cssClass + "-row-selected");
						this._selectChildren(rows[i], false);
					}
				else
					for(var i = 0; i < rows.length; i++)
					{
						rows[i].classList.add(this.cssClass + "-row-selected");
						this._selectChildren(rows[i], true);
					}
			}
			else
			{
				for(var i = 0; i < this.body.rows.length; i++)
					this.body.rows[i].classList.remove(this.cssClass + "-row-selected");

				row.classList.add(this.cssClass + "-row-selected");
				this._selectChildren(row, true);
			}
		}
		else
		{
			for(var i = 0; i < this.body.rows.length; i++)
				if (this.body.rows[i] == row)
					row.classList.add(this.cssClass + "-row-selected");
				else
					this.body.rows[i].classList.remove(this.cssClass + "-row-selected");
			this._selected = item;
		}
	}

	get selected()
	{
		if (this.multiselect)
		{
			var rt = [];
			for(var i = 0; i < this.body.rows.length; i++)
			{
				if (this.body.rows[i].classList.contains(this.cssClass + "-row-selected"))
				{
					var item = this.get(this.body.rows[i].getAttribute("data-id"));
					if (rt.indexOf(item) < 0)
						rt.push(item);
				}
			}

			return rt;
		}
		else
			return this._selected;
	}

	_applyFilter()
	{
		for(var i = 0; i < this.list.length; i++)
		{
			var item = this.list[i];
			el = document.getElementById(this.id + "_" + this.indexer(item), this.body);
			
			// visible by default
			el.style.display = "";

			for(var j = 0; j < this.layout.length; j++)
			{
				var column = this.layout[j];
				if (column.filter)
					column.filter.forEach(function(filter)
					{
						if (item[column.field] == filter)
						{
							// hide this one
							el.style.display = "none";
						}
					});
			}
		}
	};
	
	get(id)
	{
		for(var i = 0; i < this.list.length; i++)
			if (this.indexer(this.list[i]) == id)
				return this.list[i];
	}
	
 	
	setColumnVisible(index, visible)
	{	
		var display = visible ? "table-cell" : "none";
		var columnWidth = this.headers[index].clientWidth;

		for(var i = 0; i < this.table.rows.length; i++)
			this.table.rows[i].cells[index].style.display = display;
		
		this.headers[index].style.display = display;

		// shrink the table
		if (display == "none")
		{
		 	//this.header.width = (this.header.clientWidth - columnWidth) + "px";
		}

		//this.updateSize();
	}
	
	containsAny(items)
	{
		if (items == null)
			return false;

		for(var i = 0; i < items.length; i++)
		{
			if (this.list.indexOf(items[i]) > -1)
				return true;
		}

		return false;
	}

	
	_createTreeButton(row, dynamicLoading, item)
	{
		var self = this;
		var button = document.createElement("div");
		button.className = this.cssClass + "-tree";

		button.setAttribute("data-expand", dynamicLoading ? 2 : 0);
		button.addEventListener("click", function(){
			
			var eState = this.getAttribute("data-expand");

			if (eState == '2')
			{
				var ev = {
					button: button,
					item: item,
					row: row,
					table: self,
					success: function()
					{
					 	self.expand(this.button.parentNode.parentNode, 1);
					},
					failure: function(errorMsg)
					{
						this.setAttribute("data-expand", 2);
					}
				};

				this.setAttribute("data-expand", 3);

				// raise event 
				self._emit("expand", ev);
			}
			else if (eState == "0")
			{
				self.expand(this.parentNode.parentNode, true);
			}
			else if (eState == "1")
			{
				self.expand(this.parentNode.parentNode, false);
			}
		});
	
		row.cells[0].insertAdjacentElement("afterbegin", button);
	}

	add(item, dynamicLoading)//fast)
	{

		this.list.push(item);
		
		var self = this;
		var parents = this.parents_getter(item);
		var newRow;

		if (this.containsAny(parents))
		{
 			for(var i = 0; i < parents.length; i++)
			{
				var parent = parents[i];
				var inListParents = this.getRows(this.indexer(parent));
				
				for(var j = 0; j < inListParents.length; j++)
				{
					var parentRow = inListParents[j];
					// add expand button to parent
					var treeButton = parentRow.getElementsByClassName(this.cssClass + "-tree", parentRow);

					if (treeButton.length == 0)
					{
						this._createTreeButton(parentRow); 
						newRow = this._addRow(item, parseInt(parentRow.getAttribute("data-level")) + 1, false, parentRow.rowIndex);
					}
					else
					{
  						newRow = this._addRow(item, parseInt(parentRow.getAttribute("data-level")) + 1, treeButton[0].getAttribute("data-expand") == '1', parentRow.rowIndex);
 					}
				}

				// perhaps parent row depends on children
				this.update(parent);
			}
		}
		else
		{
			newRow = this._addRow(item, 0, true);
		}
		
		if (dynamicLoading)
			this._createTreeButton(newRow, true, item);

		// @TODO: fix this since modified event is removed
		if (item.on)
			if (this.updateOnModification)
				item.on("modified", function(propertyName){
					//console.log("render", propertyName, item);
					self.update(item, propertyName);
				});
			
		
		//if (!fast)
		
		//	self.layout.forEach(function(field){
			//	if (field.type && field.type == "select")
				//{
					// calculate distinct
				//}
			//});
 		//this.updateSize();

		return self;
	}
	
	_findIndexes(propertyIndex)
	{
		var rt = [];
		for(var i = 0; i < this.layout.length; i++)
		{
			if (this.layout[i].field == propertyIndex || this.layout[i].field == "_any")
			   rt.push(i);
		}
		return rt;
	};

	_addRow(item, level, visible, index)
	{
		var self = this;
		// add item
		var tr = self.body.insertRow(index);
		tr.setAttribute("data-id", this.indexer(item));
		tr.setAttribute("data-level", level);
		if (visible)
			tr.className = this.cssClass + "-row";
		else
			tr.className = this.cssClass + "-row " + this.cssClass + "-row-hidden";

 
		for(var i = 0; i < this.layout.length; i++)
		{
			let column = this.layout[i];
				
			let cl = column.node.cloneNode(true);// tr.insertCell();

			//this._make_bindings(cl)

			IUI.bind(cl, this, "table");

			tr.appendChild(cl);

			if (cl.dataMap != null)
				cl.dataMap.render(item).then(() => self._renderElement(cl, cl.data));
			else {
				cl.data = item;
				this._renderElement(cl, cl.data);
			}
			//if (column.formatter)
			//{
			//	var rt = column.formatter(item[column.field], item, cl);
			//	if (rt instanceof Element)
			//	{
			//		cl.appendChild(rt);
			//	}
			//	else
			//		cl.innerHTML=rt;
			//}
			//else
			//	cl.innerHTML=item[column.field];

			cl.style.display = this.table.tHead.rows[0].cells[i].style.display;

		}
		
		tr.addEventListener("click", function(e)
		{
			self._select(tr, item, e.ctrlKey);
			self._emit("click", { data: item, row: tr, event: e });
		});
		
		tr.addEventListener("dblclick", function(e)
		{
			self._select(tr, item, e.ctrlKey);
			self._emit("rowdblclick", { data: item, row: tr, event: e });
		});
		
		tr.addEventListener("contextmenu", function(e)
		{
			self._select(tr, item, e.ctrlKey, true);
			self._emit("contextmenu", { data: item, row: tr, event: e });
		});

		tr.addEventListener("mouseleave", function(e){
			//if (self._multideselecting)
			//	tr.classList.remove(self.cssClass + "-row-selected");

			self._emit("leave", { data: item, row: tr, event: e });
		});

		tr.addEventListener("mouseenter", function(e){
			//if (self._multiselecting)
			//	tr.classList.add(self.cssClass + "-row-selected");
				//self._select(tr, item, true);

			self._emit("enter", { data: item, row: tr, event: e });
		});

		tr.addEventListener("touchstart", function(e){

			self._tx = e.touches[0].clientX;
			self._ty = e.touches[0].clientY;

			self._long_press_item = item;
			self._long_press_x = e.touches[0].clientX;
			self._long_press_y = e.touches[0].clientY;
			if (self._long_press_timeout)
				clearTimeout(self._long_press_timeout);
			self._long_press_timeout = setTimeout(function(){
				if (self._long_press_item)
				{
					self._select(tr, self._long_press_item);
					self._emit("contextmenu", { data: self._long_press_item, event: e, row: tr });
					self._long_press_timeout = null;
					self._long_press_item = null;
				}
			}, 600);
		});

		this.addEventListener("touchmove", function(e){
 
			if (Math.abs(e.touches[0].clientX - self._long_press_x) > 10 || Math.abs(e.touches[0].clientY - self._long_press_y) > 10)
			{
				self._long_press_item = null;
			}
		});

		tr.addEventListener("touchend", function(e){
			
			var tx = e.changedTouches[0].clientX;
			var ty = e.changedTouches[0].clientY;

			if (Math.abs(tx - self._tx) < 10 && Math.abs(ty - self._ty) < 10 )
			{
				self._select(tr, item);
				self._emit("touch", { data: item, event: e , row: tr});
			}

			if (self._long_press_timeout)
				clearTimeout(self._long_press_timeout);
		 	else
				e.preventDefault();

			self._long_press_item = null;
			self._long_press_timeout = null;
		});

		return tr;
	};

	get(id)
	{
		for(var i = 0; i < this.list.length; i++)
			if (this.indexer(this.list[i]) == id)
				return this.list[i];
		return null;
	}

	getRows(id)
	{
		var rt = [];
		for(var i = 0; i < this.body.rows.length; i++)
			if (this.body.rows[i].getAttribute("data-id") == id)
				rt.push(this.body.rows[i]);
		return rt;
	}

	toJSON(level)
	{
		//if (!level)
		//	level = 3;

		var headers = ["#"];
		var list = [];
 
 		// make header
		for(var i = 0; i < this.layout.length; i++)
			if (!( this.layout[i].noPrint ||  this.layout[i].noExport) && this.headers[i].style.display !="none")
			{
				headers.push( this.layout[i].name);
 			}
		
		var index = 1;

		// build table
		for(var i = 0; i < this.body.rows.length; i++)
		{
			var row = this.body.rows[i];
			var rowLevel = parseInt(row.getAttribute("data-level"));

			if (level)
			{
 				if (rowLevel > level)
					continue;
			} 
			else if (row.classList.contains(this.cssClass + "-row-hidden"))
			{
				continue;
			}
			
			var item = [rowLevel, index++];
 			for(var j = 0; j < this.layout.length; j++)
				if (!( this.layout[j].noPrint ||  this.layout[j].noExport) && this.headers[j].style.display !="none")
				{
					var text = "";
					for(var k = 0; k < row.cells[j].childNodes.length; k++)
						if (row.cells[j].childNodes[k].nodeType == 3)
						{
							text = row.cells[j].childNodes[k].data;
							break;
						}
						
					item.push(text);//row.cells[j].innerHTML);
 				}
			list.push(item);
		}

		return {headers: headers, data: list};
	}

	toTable(level){
		// create table
		var tbl = document.createElement("table");
		var header = tbl.createTHead();
		var body = tbl.createTBody();

		var tr = header.insertRow();

		// make header
		for(var i = 0; i < this.layout.length; i++)
			if (!this.layout[i].noPrint && this.headers[i].style.display !="none")
			{
				var th = tr.insertCell();
				th.innerHTML = this.layout[i].name;
			}
		
		// build table
		for(var i = 0; i < this.body.rows.length; i++)
		{
			var row = this.body.rows[i];
			if (level)
			{
 				if (parseInt(row.getAttribute("data-level")) > level)
					continue;
			} 
			else if (row.classList.contains(this.cssClass + "-row-hidden"))
			{
				continue;
			}
			
			tr = body.insertRow();
			tr.classList.add("level-" + (parseInt(row.getAttribute("data-level"))+1));

			for(var j = 0; j < this.layout.length; j++)
				if (!this.layout[j].noPrint && this.headers[j].style.display !="none")
				{
					var td = tr.insertCell();
					td.innerHTML = row.cells[j].innerHTML;
				}
		}

		return tbl;
	};

	_removeRow(row)
	{
		var level = parseInt(row.getAttribute("data-level"));
		var nextIndex = row.rowIndex; // zero-indexed (dummy header included, so it's 1-indexed')
		// remove all children
		while(nextIndex < this.body.rows.length){
			var r = this.body.rows[nextIndex];
			var l = parseInt(r.getAttribute("data-level"));
			if (l <= level)
				break;
			this.body.rows.deleteRow(nextIndex++);
		}

		// get parent row
		var parentRow = this._getParentRow(row);
		// remove row itself
		this.body.deleteRow(row.rowIndex-1);
		// remove expand button from parent if it has no more children
		if (parentRow)
		{
			// last item ? means has no children
			if (parentRow.rowIndex == this.body.rows.length 
				|| parseInt(this.body.rows[parentRow.rowIndex].getAttribute("data-level")) <= parseInt(parentRow.getAttribute("data-level")))
				{
					// remove expand button
					var button = parentRow.getElementsByClassName(this.cssClass + "-tree");
					if (button.length > 0)
						button[0].parentNode.removeChild(button[0]);
				}

			// render parent (in case formatter depends on children)
			//var parent = this.get(parseInt(parentRow.getAttribute("data-id")));
			//this._renderRow(parentRow, parent);
		}
	}

	_getById(id)
	{
		for(var i = 0; i < this.list.length; i++)
			if (this.indexer(this.list[i]) == id)
				return this.list[i];

		return null;// this;
	}

	remove(item)
	{
		if (typeof item == "string" || typeof item == "number")
			item = this._getById(item);
		
		if (item == null)
			return;

		var rows = this.getRows(this.indexer(item));
		// remove all occurrences
		for(var i = 0; i < rows.length; i++)
			this._removeRow(rows[i]);

		var i = this.list.indexOf(item);
		this.list.splice(i, 1);

		return this;
	}

	clear()
	{
		while(this.body.rows.length > 0)
			this.body.deleteRow(0);
		
		this.list = [];

		return this;
	}


	//_renderRow(row, item, propertyName)
	//{
	//	if (propertyName)
	//	{
	//		var indexes = this._findIndexes(propertyName);

	//		for(var i = 0; i < indexes.length; i++)
	//		{
	//			var expand = null;
	//			if (indexes[i] == 0)
	//			{
	//				expand = row.cells[0].getElementsByClassName(this.cssClass + "-tree");
	//				expand = expand.length > 0 ? expand[0] : null;
	//			}

	//			if (this.layout[indexes[i]].formatter)
	//			{
	//				var rt = this.layout[indexes[i]].formatter(item[propertyName], item, row.cells[indexes[i]]);

	//				if (rt == null)
	//				{
	//					// do nothing
	//					expand = false;
	//				}
	//				else if (rt instanceof Element)
	//				{
	//					row.cells[indexes[i]].innerHTML = "";
	//					row.cells[indexes[i]].appendChild(rt);
	//				}
	//				else
	//					row.cells[indexes[i]].innerHTML=rt;
	//			}
	//			else
	//				row.cells[indexes[i]].innerHTML=item[propertyName];

	//			if (expand)
	//				row.cells[0].insertAdjacentElement("afterbegin", expand);
	//		}
	//	}
	//	else
	//	{
	//		var expand = row.cells[0].getElementsByClassName(this.cssClass + "-tree");
	//		expand = expand.length > 0 ? expand[0] : null;

	//		for(var i = 0; i < this.layout.length; i++)
	//		{
	//			var column = this.layout[i];
	//			if (column.formatter)
	//			{
	//				var rt = column.formatter(item[column.field], item, row.cells[i]);							
	//				if (rt instanceof Element)
	//				{
	//					row.cells[i].innerHTML = "";
	//					row.cells[i].appendChild(rt);
	//				}
	//				else
	//					row.cells[i].innerHTML=rt;
	//			}
	//			else
	//				row.cells[i].innerHTML=item[column.field];
	//		}

	//		if (expand)
	//			row.cells[0].insertAdjacentElement("afterbegin", expand);
	//	}
	//}

	_getParentRow(row)
	{
		var level = parseInt(row.getAttribute("data-level"));
		for(var i = row.rowIndex - 2; i >= 0; i--)
		{
			if (parseInt(this.body.rows[i].getAttribute("data-level")) < level)
				return this.body.rows[i];
		}
	}
	
	_renderItem(item, propertyName = null)
	{
		var rows = this.getRows(this.indexer(item));
		var removedRows = [];

		var self = this;

		var parentsChanged = this.parents_changed(item, propertyName);

		if (propertyName == null || parentsChanged)
		{
			var notModifiedParents = [];

			// remove from parents
			var parents = this.parents_getter(item);

			for(var i = 0; i < rows.length; i++)
			{
				var row = rows[i];
				var level = parseInt(row.getAttribute("data-level"));
				// get parent row
				var parentRow = this._getParentRow(row);
				if (parentRow)
				{
					// parent found
					var parent = this.get(parseInt(parentRow.getAttribute("data-id")));
					if (parents == null || parents.indexOf(parent) == -1)
					{
						// remove this node
						this._removeRow(row);
						removedRows.push(row);
					}
					else
						notModifiedParents.push(parent);
				}
			}
	
			// add to new parents
			if (parents != null)
			{
				for(var i = 0; i < parents.length; i++)
				{
					var parent = parents[i];
					if (notModifiedParents.indexOf(parent) == -1 && this.list.indexOf(parent) > -1)
					{
						// add new row
						var inListParents = this.getRows(this.indexer(parent));

						for(var j = 0; j < inListParents.length; j++)
						{
							var parentRow = inListParents[j];
							var treeButton = parentRow.getElementsByClassName(this.cssClass + "-tree", parentRow);
							if (treeButton.length == 0)
							{
								this._createTreeButton(parentRow);
								this._addRow(item, parseInt(parentRow.getAttribute("data-level")) + 1, false, parentRow.rowIndex);
							}
							else
							{
								this._addRow(item, parseInt(parentRow.getAttribute("data-level")) + 1, treeButton[0].getAttribute("data-expand") == '1', parentRow.rowIndex);
							}
						}
					}
				}
			}
		}
		else
		{
			// render parent (in case formatter depends on children)
			//for(var i = 0; i < rows.length; i++)
			//{
			//	var parentRow = this._getParentRow(rows[i]);
			//	if (parentRow)
			//	{
			//		var parent = this.get(parseInt(parentRow.getAttribute("data-id")));
			//		this._renderRow(parentRow, parent, propertyName);
			//	}
			//}
		}

		// render the non-removed rows.
		//for(var i = 0; i < rows.length; i++)
		//	if (removedRows.indexOf(rows[i]) == -1)
		//		this._renderRow(rows[i], item, propertyName);
	}

	update(item, propertyName)
	{
		if (item)
			this._renderItem(item, propertyName);
		else
		{
			for(var i = 0; i < this.list.length; i++)
				this._renderItem(this.list[i]);
		}

		return this;
	}



	async setData(value) 
	{
		await super.setData(value);

		this.clear();

		if (this.tree)
		{
			var self = this;
			var loadFunction = function(items, level)
			{
				for(var i = 0; i < items.length; i++)
				{
					var item = items[i];
					self.list.push(item);

					var row = self._addRow(item, level, level==0);
					if (item.children && item.children.length > 0)
					{
						self._createTreeButton(row);
						// load children
						loadFunction(item.children, level+1);
					}
				}
			}

			// recursively load items
			loadFunction(value, 0);
		}
		else
		{
			for (var i = 0; i < value.length; i++)
				this.add(value[i]);
		}
	}
});