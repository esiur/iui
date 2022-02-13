export default class RefsCollection {
  constructor(rootElement) {
    this._rootElement = rootElement;
  }

  _build(element, append) {
    if (element == undefined) element = this._rootElement;

    if (!append)
      for (var i in this)
        if (i != "_rootElement" && i != "_build") delete this[i];

    for (var i = 0; i < element.children.length; i++) {
      let child = element.children[i];

      if (child.hasAttribute("ref")) {
        let ref = child.getAttribute("ref");
        if (this[ref] == null) this[ref] = child;
        else if (this[ref] == child) {
          // do nothing
        } else if (this[ref] instanceof Array) {
          this[ref].push(child);
        } else {
          var firstRef = this[ref];
          this[ref] = [firstRef, child];
        }
      }

      if (child.refs != undefined)
        // opt out if the element handles referencing
        break;
      else this._build(child, true);
    }
  }
}
