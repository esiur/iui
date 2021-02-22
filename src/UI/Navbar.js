import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";
import Link from "../Router/Link.js";
import Check from "./Check.js";

export default IUI.module(class Navbar extends IUIElement
{
    constructor()
    {
        super();
    }

    search(text) {  
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

    
    expand(link, value) {
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

        var appendRoutes = (routes, level) => {
            for (var i = 0; i < routes.length; i++) {

                if (routes[i].hasAttribute("private"))
                    continue;

                if (this.private instanceof Function)
                {
                    try{
                   // console.log("F");
                    if (this.private(routes[i]))
                    {
                     //   console.log("private", route[i]);
                        continue;
                    }
                    } catch(ex){
                        console.log(ex);
                        debugger;
                    }
                }

                let el = new Link();// document.createElement("i-link");
                el.setAttribute("data-level", level);
                el.link = routes[i].link;
                el.title = routes[i].caption;
                if (routes[i].icon != null)
                    el.innerHTML =  "<img src='" + routes[i].icon + "'>";
                
                el.text = document.createElement("span");
                el.text.innerHTML = el.title;
                el.appendChild(el.text);
                
                this._container.appendChild(el);

                if (routes[i].routes.length > 0) {
                    // append plus
                    el.expand = new Check({cssClass: this.cssClass + "-check"});// document.createElement("i-check");
                    el.expand.checked = true;


                    //plus.className = "expand";#f8f8f8
                    el.expand.on("click", (e) => {
                        self.expand(el, el.expand.checked);
                        e.stopPropagation();
                    });

                    el.appendChild(el.expand);
                    appendRoutes(routes[i].routes, level + 1);
                }

            }
        };

        appendRoutes(roots, 0);
    }

    created() {
        if (!this.hasAttribute("manual"))
            window.router.on("created", this.build);

        window.router.on("navigate", (e) => { 
            for(var i = 0; i < this?._container?.children?.length; i++)
            {
                var el = this._container.children[i];
                if (el.link == e.base)
                    el.setAttribute("selected", "");
                else
                    el.removeAttribute("selected");
            }
        });
    }
});