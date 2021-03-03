import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import Link from "../Router/Link.js";
import Check from "./Check.js";

export default IUI.module(class Navbar extends IUIElement
{
    constructor()
    {
        super();

        this._list = [];
    }

    search_old(text) {  
        for(var i = 0; i < this._container.children.length; i++)
        {
            let el = this._container.children[i];
            if (el.title.toLowerCase().includes(text))
            {
                el.text.innerHTML = el.title.replace(new RegExp(text, 'gi'), (str) => `<span>${str}</span>`);
                el.style.display = "";
                el.removeAttribute("hidden");
                
                // make parents visible
                let level = parseInt(el.getAttribute("data-level"));

                for(var j = i - 1; j >= 0; j--)
                {
                    let previous = this._container.children[j];
                    let pLevel = parseInt(previous.getAttribute("data-level"));

                    if (pLevel < level)
                    {
                        previous.removeAttribute("hidden");
                        previous.style.display = "";
                        if (previous.expand)
                           previous.expand.checked = true;
                        level = pLevel;
                    }
                }
            }
            else
            {
                el.style.display = "none";
            }
        }
    }

    search(text, within) {

        let menu = within == null ? this._container : within.menu;
        
        for(var i = 0; i < menu.children.length; i++)
        {
            let item = menu.children[i];
            let link = item.link;
            if (link.title.toLowerCase().includes(text))
            {
                link.text.innerHTML = link.title.replace(new RegExp(text, 'gi'), (str) => `<span>${str}</span>`);
                item.style.display = "";

                //if (within != null)
                  //  within.removeAttribute("collapsed");
                
                // make parents visible
                let parent = within;

                while (parent != null && parent != this)
                {
                    parent.expand.checked = true;
                    parent.removeAttribute("collapsed");
                    parent.style.display = "";
                    parent = parent.parentElement.parentElement;
                }

            }
            else
            {
                item.style.display = "none";
            }

            if (item.menu != null)
                this.search(text, item);
        }
    }
    
    expand_old(link, value) {
        let next = link;// = link.nextElementSibling;
        let level = parseInt(link.getAttribute("data-level"));


        // save 
        //window.localStorage.setItem("iui.navbar/" + link.link, value);

        if (link.expand && link.expand.checked != value)
            link.expand.checked = value;

        while (next = next.nextElementSibling) {
            if (parseInt(next.getAttribute("data-level")) > level){
                if (value)
                    next.removeAttribute("hidden");
                else
                    next.setAttribute("hidden", "");
                if (next.expand)
                    next.expand.checked = value;
            }
            else
                break;
        }
    }

    expand(item, value) {
        if (value)
            item.removeAttribute("collapsed");
        else
            item.setAttribute("collapsed", "");

        item.expand.checked = value;
    }

    get collapsed(){
        return this.hasAttribute("collapsed");
    }

    get auto(){
        return this.hasAttribute("auto");
    }
    
    build(){

        this.innerHTML = "";
        let roots = router.routes.filter(x => x.parent == null);
        let self = this;
        this._search = document.createElement("input");
        this._search.type = "search";
        this._search.className = this.cssClass + "-search textbox";
        this._search.addEventListener("input", (x) => {
            self.search(this._search.value);
        });

        this.appendChild(this._search);

        this._container = document.createElement("div");
        this._container.className = this.cssClass + "-container";
        
        this.appendChild(this._container);

        let collapsed = this.collapsed;
        let auto = this.auto;

        const filterRoutes = (routes) => 
            routes.filter(r => {
                if (r.hasAttribute("private"))
                    return false;
            
                if (this.private instanceof Function)
                        {
                            try{
                            if (this.private(r))
                            {
                                return false;
                            }
                            } catch(ex){
                                console.log(ex);
                                debugger;
                            }

                            return true;
                        }
                    });

        const appendRoutes = (routes, level, container) => {
            for (var i = 0; i < routes.length; i++) {


                let item = document.createElement("div");
                item.className = this.cssClass + "-item";

                let link = new Link();// document.createElement("i-link");
                item.setAttribute("level", level);
                link.link = routes[i].link;
                link.title = routes[i].caption;
                if (routes[i].icon != null)
                link.innerHTML =  "<img src='" + routes[i].icon + "'>";
                
                link.text = document.createElement("span");
                link.text.innerHTML = link.title;
                link.appendChild(link.text);

                item.link = link;
                
                item.appendChild(link);
                container.appendChild(item);

                this._list.push(item);

                let subRoutes = filterRoutes(routes[i].routes);

                if (subRoutes.length > 0) {
                    // append plus
                    item.expand = new Check({cssClass: this.cssClass + "-check"});// document.createElement("i-check");
                    item.expand.checked = this.collapsed ? false : true;

                    item.expand.checked = !collapsed;

                    if (collapsed)
                        item.setAttribute("collapsed", "");

                    link.appendChild(item.expand);

                    item.menu = document.createElement("div");
                    item.menu.className = this.cssClass + "-menu";
                    item.appendChild(item.menu);

                    item.expand.on("click", (e) => {
                        self.expand(item, item.expand.checked);
                        e.stopPropagation();
                    });


                    if (auto)
                    {
                        item.addEventListener("mouseenter", ()=> self.expand(item, true));
                        item.addEventListener("mouseleave", ()=> self.expand(item, false));
                    }

                    appendRoutes(subRoutes, level + 1, item.menu);
                }

            }
        };

        appendRoutes(filterRoutes(roots), 0, this._container);
    }

    created() {
        if (!this.hasAttribute("manual"))
            window.router.on("created", this.build);

        window.router.on("navigate", (e) => { 
            
            for(var i = 0; i < this._list.length; i++)
            {
                var el = this._list[i];
                if (el.link.link == e.base)
                    el.setAttribute("selected", "");
                else
                    el.removeAttribute("selected");
            }
        });
    }
});