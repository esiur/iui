import IUIElement from "../Core/IUIElement.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(class Link extends IUIElement
{
    constructor()
    {
        //debugger;
        super({ cssClass: 'link' });

  //      super({ cssClass: 'link' });
        this._register("route");
        this.addEventListener("click",
            (e) => {

                var r = this.getBoundingClientRect();            
                this.style.setProperty("--x", (e.x - r.x) + "px");
                this.style.setProperty("--y", (e.y - r.y) + "px");
    
                this.style.setProperty("--w", r.width + "px");
                this.style.setProperty("--h", r.height + "px");
    
                this.classList.remove(this.cssClass + "-clicked");
                void this.offsetWidth;
                this.classList.add(this.cssClass + "-clicked");

                let url = this.getAttribute("href");

                let ok = this._emit("route", { url, cancelable: true, query: this.query});
                if (!ok)
                    return;


                //if (url == "#")
                  //  url = router.current.link;
                   // return;

                let target = this.hasAttribute("target") ? document.getElementById(this.getAttribute("target")) : null;

                
                if (url == ":back") {
                    window.router.back();
                    return;
                }


                
                if (this.query)// || this.hasAttribute(":data"))
                    window.router.navigate(url || router.current.url, this.query, target);
                else if (url != null)
                    window.router.navigate(url, undefined, target);
            }
        );

        //this._register("click");
    }

    get link() {
        return this.getAttribute("href");
    }

    set link(value) {
        this.setAttribute("href", value);
    }

    create()
    {

    }
});