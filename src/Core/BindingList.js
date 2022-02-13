export default class BindingList extends Array {
  constructor(target, scope) {
    super();
    this.target = target;
    this.scope = scope;
    this.events = [];
  }

  destroy() {
    for (var i = 0; i < this.length; i++) this[i].unbind();
    this.scope = {};
    this.target = null;
    for (var i = 0; i < this.events.length; i++)
      this.target.removeEventListener(
        this.events[i].name,
        this.events[i].handle
      );
  }

  addEvent(name, handle) {
    this.target.addEventListener(name, handle);
    this.events.push({ name, handle });
  }

  getArgumentsNames() {
    if (this.scope == null) return [];

    let rt;
    for (var i in this.scope.length) rt.push(i);
    return rt;
  }
}
