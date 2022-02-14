import IUIElement from "../Core/IUIElement.js";
import Route from "./Route.js";
import Target from "./Target.js";
import { IUI } from "../Core/IUI.js";

export default IUI.module(
  class Router extends Target {
    constructor() {
      super({
        routes: [],
        _states: new Map(),
        active: null,
        cssClass: "router",
      });

      this._history = [];

      //IUI._router = this;

      //Object.defineProperty(window, "router", {
      //    get() {
      //        if (!IUI._router.isConnected)
      //            IUI._router = document.getElementsByTagName("i-router")[0];
      //        return IUI._router;
      //    }
      //});
    }

    _getRouteParent(route) {
      let e = null;

      while ((e = route.parentElement)) {
        if (e instanceof Route || e instanceof Router) return e;
      }

      return null;
    }

    add(route, parent = null) {
      if (parent == null) {
        this.routes.push(route);
      } else {
        route.parent = parent;
        this.appendChild(route);
        //parent.routes.push(route);
      }
    }

    _routeInPath(name, routes) {
      for (var i = 0; i < routes.length; i++)
        if (routes[i].name == name) return routes[i];
      return null;
    }

    getRoute(url, data) {
      /**
       * @type {String[]}
       */
      let p = url.split("/");

      let searchRoutes = this.routes;

      if (p[0] == this.base) {
        p.shift();
      }

      for (var i = 0; i < p.length; i++) {
        var route = this._routeInPath(p[i], searchRoutes);

        if (route == null) return [null, null];

        if (i == p.length - 1) {
          // return [destination state route (link, icon,..etc) , actual route to view]
          if (route.dst == null) return [route, route];
          else {
            let dst =
              route.dst instanceof Function ? route.dst(data) : route.dst;
            let url = dst.replace(/^[/]*(.*?)[/]*$/g, "$1").trim();
            return [route, this.getRoute(url)[1]];
          }
        }

        searchRoutes = route.routes;
      }
    }

    back() {
      //if (this._history.length > 1) {
      //    let last = this._history[this._history.length - 2];
      //    this.navigate(last.url, last.data, last.target);
      //}

      window.history.back();
    }

    _toQuery(o) {
      let rt = [];
      for (let i in o)
        if (o[i] == undefined) rt.push(i);
        else rt.push(i + "=" + encodeURI(o[i].toString().replace("&", "&&"))); ///encodeURIComponent(o[i]));
      return rt.join("&");
    }

    _fromQuery(q) {
      let kv = q.replace("&&", "\0").split("&");
      let rt = {};
      for (let i = 0; i < kv.length; i++) {
        let d = kv[i].replace("\0", "&").split("=", 2);
        let v = decodeURI(d[1] || ""); //decodeURIComponent(d[1] || '');
        if (v != null && v.trim() != "" && !isNaN(v)) v = new Number(v);
        rt[d[0]] = v;
      }
      return JSON.parse(JSON.stringify(rt));
    }

    async navigate(url, data, target, state, dataToQuery = true) {
      let q = url.match(/^\/*(.*?)\?(.*)$|^\/*(.*)$/);

      //debugger;

      var path;

      // do we have a query string ?
      if (q[2] !== undefined) {
        path = q[1];
        data = this._fromQuery(q[2]);
        url = path + "?" + q[2];
      }
      // do we have data ?
      else if (data !== undefined) {
        path = q[3];
        url = dataToQuery ? path + "?" + this._toQuery(data) : path;
      } else {
        path = q[3];
        url = path;
      }

      let [stateRoute, viewRoute] = this.getRoute(path, data);

      if (stateRoute == null) {
        console.warn("State not found ", path);
        return;
      }

      let ok = this._emit("navigate", {
        url,
        stateRoute,
        viewRoute,
        base: path,
        data,
        cancelable: true,
      });

      if (!ok) {
        console.warn("Route not allowed", path);
        return;
      }

      // destination view not found
      if (viewRoute == null) {
        console.log(`Destination route not found ${stateRoute.dst}`);
        viewRoute = stateRoute;
      }

      //let state = null;

      //if (data !== undefined) {
      //    for (let [k, v] of this._states)
      //        if (v == data) {
      //            state = k;
      //            break;
      //        }

      //    if (state == null) {
      //        state = Math.random().toString(36).substr(2, 10);
      //        this._states.set(state, data);
      //    }
      //}

      if (!(target instanceof Target)) target = this;

      if (state == null) {
        let id = Math.random().toString(36).substr(2, 10);
        state = { id, url, data, target, stateRoute, viewRoute };
        this._states.set(id, state);
        history.pushState(
          id,
          stateRoute.caption,
          this._hash ? "#" + url : "/" + url
        );
      }

      this._history.push(state.id); // { url, data, target, stateRoute, viewRoute });

      target.show(viewRoute, this.active);
      viewRoute.set(true);

      this.active = viewRoute;

      //{ url: "/", data: null, target: null };
      this._emit("route", { route: stateRoute });

      viewRoute.query = data || {};
      stateRoute.query = viewRoute.query;

      target.setLoading(true);

      if (stateRoute.dataMap != null) {
        // if map function failed to call setData, we will render without it
        if (!(await stateRoute.dataMap.render(data || {})))
          await stateRoute.render();

        if (viewRoute != stateRoute) await viewRoute.setData(stateRoute.data);
      } //if (data !== undefined)
      else await viewRoute.setData(data);

      target.setLoading(false);
    }

    hide() {
      // do nothing, we're not here to hide.
    }

    refresh() {
      let state = this.current;
      this.navigate(state.url, state.data, state.target, state);

      //this.current.render();
      //this.current.data = this.current.data;
      //if (updateAttributes)
      //  this.current.updateAttributes(true);
    }

    show(route, active) {
      super.show(route, active);
    }

    get current() {
      return this._states.get(history.state); //.viewRoute;
      //return this._history[this._history.length - 1].viewRoute;
    }

    get previous() {
      if (this._history.length > 2)
        return this._states.get(this._history[this._history.length - 2]);
      //.viewRoute;
      else return null;
    }

    create() {
      // save origin
      this.origin = window.location.pathname + window.location.search;
      this.base = this.getAttribute("base") || "";
    }

    destroy() {
      console.log("Destroyed", this);
    }

    created() {
      if (
        this.hasAttribute("type") &&
        this.getAttribute("type").toLowerCase() == "hash"
      )
        this._hash = true;

      /// find all children
      for (var i = 0; i < this.children.length; i++) {
        let e = this.children[i];
        if (e instanceof Route) {
          this.add(e);
          if (e.visible) this.navigate(e.name);
        }
      }

      this._emit("created");
      this.navigate(this.origin);
      //console.log("Router created", this);
    }

    connectedCallback() {
      //console.log("New router", this);

      window.router = this;

      let self = this;

      window.addEventListener("popstate", function (event) {
        //console.log(event);
        let stateId = event.state;
        let path;

        if (self._hash) {
          path = window.location.hash;

          if (path.length > 0) path = path.substr(1);
        } else {
          path = window.location.pathname;
        }

        if (stateId != null) {
          if (stateId != self._history[self._history.length - 1]) {
            //this._lastStateId = stateId;
            let state = self._states.get(stateId);
            self.navigate(path, state.data, state.target, state);
          } else {
            console.log("SAME");
          }
        } else {
          this._lastState = null;
          self.navigate(path, undefined, undefined, {});
        }
        //alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
        console.log(document.location.hash, event.state);
      });

      this._register("navigate");
      this._register("route");
      this._register("created");
    }
  }
);
