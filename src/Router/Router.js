import Route from "./Route.js";
import Target from "./Target.js";
import { IUI } from "../Core/IUI.js";
import path from "../Core/Path.js";

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
    }

    _getRouteParent(route) {
      let e = null;

      while ((e = route.parentElement)) {
        if (e instanceof Route || e instanceof Router) return e;
      }

      return null;
    }

    add(route, parent = null) {
      route.base = this._base;

      if (!parent) {
        this.routes.push(route);
        return;
      }

      route.parent = parent;
      this.appendChild(route);
    }

    _routeInPath(name, routes) {
      for (let i = 0; i < routes.length; i++)
        if (routes[i].name == name) return routes[i];
      return null;
    }

    getRoute(url, data) {
      /**
       * @type {String[]}
       */
      const p = url.split("/");
      if (p[0] == this._base) p.shift();
      let searchRoutes = this.routes;
      for (let i = 0; i < p.length; i++) {
        const route = this._routeInPath(p[i], searchRoutes);

        if (route == null) return [null, null];

        if (i == p.length - 1) {
          // return [destination state route (link, icon,..etc) , actual route to view]
          if (route.dst == null) return [route, route];

          const dst =
            route.dst instanceof Function ? route.dst(data) : route.dst;
          const url = dst.replace(/^[/]*(.*?)[/]*$/g, "$1").trim();
          return [route, this.getRoute(url)[1]];
        }
        searchRoutes = route.routes;
      }
    }

    back() {
      window.history.back();
    }

    _toQuery(o) {
      return Object.keys(o)
        .map(i =>
          !i ? i : `${i}=${encodeURI(o[i].toString().replace("&", "&&"))}`
        )
        .join("&");
    }

    _fromQuery(q) {
      const kv = q.replace("&&", "\0").split("&");
      const rt = {};
      for (let i = 0; i < kv.length; i++) {
        const d = kv[i].replace("\0", "&").split("=", 2);
        const v = decodeURI(d[1] || "");
        if (v != null && v.trim() != "" && !isNaN(v)) v = new Number(v);
        rt[d[0]] = v;
      }
      return JSON.parse(JSON.stringify(rt));
    }

    async navigate(url, data, target, state, dataToQuery = true) {
      let q = url.match(/^\/*(.*?)\?(.*)$|^\/*(.*)$/);

      let path;

      // Do we have a query string ?
      if (q[2] !== undefined) {
        path = q[1];
        data = this._fromQuery(q[2]);
        url = path + "?" + q[2];
      }
      // Do we have data?
      else if (data !== undefined) {
        path = q[3];
        url = dataToQuery ? path + "?" + this._toQuery(data) : path;
      } else {
        path = q[3];
        url = path;
      }

      const [stateRoute, viewRoute] = this.getRoute(path, data);

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

      if (!(target instanceof Target)) target = this;

      if (state == null) {
        const id = Math.random().toString(36).substring(2, 12);
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
      const state = this.current;
      this.navigate(state.url, state.data, state.target, state);
    }

    show(route, active) {
      super.show(route, active);
    }

    get current() {
      return this._states.get(history.state); //.viewRoute;
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
      this._base = this.hasAttribute("base") ? this.getAttribute("base") : "/";
    }

    destroy() {
      console.log("Destroyed", this);
    }

    created() {
      if (
        this.hasAttribute("type") &&
        this.getAttribute("type").toLowerCase() == "hash"
      ) {
        this._hash = true;
      }

      /// find all children
      for (let i = 0; i < this.children.length; i++) {
        const e = this.children[i];
        if (e instanceof Route) {
          this.add(e);
          if (e.visible) this.navigate(e.name);
        }
      }

      this._emit("created");
    }

    connectedCallback() {
      window.router = this;

      const self = this;
      window.addEventListener("popstate", function (event) {
        const stateId = event.state;
        let path;

        if (self._hash) {
          path = window.location.hash;

          if (path.length > 0) path = path.substring(1);
        } else {
          path = window.location.pathname;
        }

        if (stateId != null) {
          if (stateId != self._history[self._history.length - 1]) {
            //this._lastStateId = stateId;
            const state = self._states.get(stateId);
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
