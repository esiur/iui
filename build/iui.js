(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

var _RefsCollection = _interopRequireDefault(require("./RefsCollection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(App, _IUIElement);

  var _super = _createSuper(App);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this);
    _this.refs = new _RefsCollection["default"](_assertThisInitialized(_this));
    return _this;
  }

  _createClass(App, [{
    key: "create",
    value: function create() {
      this._register("load");

      window.app = this;
    }
  }, {
    key: "created",
    value: function created() {
      _IUI.IUI.bind(this, this, "/", {
        app: this,
        refs: this.refs
      }); // update referencing


      this.refs._build(); //IUIElement._make_bindings(this);


      this.render();

      this._emit("load", {
        app: this
      });

      this.loaded = true;
    }
  }]);

  return App;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"./RefsCollection.js":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindingType = exports.Binding = exports.AttributeBindingDestination = void 0;

var _IUIElement = _interopRequireDefault(require("./IUIElement.js"));

var _IUI = require("./IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var BindingType = {
  IUIElement: 0,
  // this will never happen !
  TextNode: 1,
  ContentAttribute: 2,
  Attribute: 3,
  HTMLElementDataAttribute: 4,
  IUIElementDataAttribute: 5,
  IfAttribute: 6,
  RevertAttribute: 7
};
exports.BindingType = BindingType;
var AttributeBindingDestination = {
  Field: 0,
  Attribute: 1
};
exports.AttributeBindingDestination = AttributeBindingDestination;
var AsyncFunction = Object.getPrototypeOf( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))).constructor;

var Binding = /*#__PURE__*/function () {
  function Binding() {
    _classCallCheck(this, Binding);

    this.watchList = [];
    var self = this;

    this.listener = function (name, value) {
      self.render(self.data);
    };
  }

  _createClass(Binding, [{
    key: "_findMap",
    value: function _findMap(thisArg) {
      // @TODO: Map thisArg too
      var map = {};
      var detector = {
        get: function get(obj, prop) {
          if (typeof prop == "string") {
            obj[prop] = {};
            return new Proxy(obj[prop], detector);
          }
        }
      };
      this.checked = true;
      var proxy = new Proxy(map, detector);

      try {
        var d = this.func.apply(thisArg, [proxy, proxy, {}, true].concat(_toConsumableArray(this.scopeValues)));
        this.map = map;
        return d;
      } catch (ex) {
        //console.log("Proxy failed", ex);
        this.map = map;
      }
    }
  }, {
    key: "_execute",
    value: function () {
      var _execute2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(thisArg, data) {
        var context, rt;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.checked) this._findMap(thisArg);
                context = {};
                rt = this.func.apply(thisArg, [data, data, context, false].concat(_toConsumableArray(this.scopeValues))); //console.log(rt);

                if (!(rt instanceof Promise)) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 6;
                return rt;

              case 6:
                if (!(context.error != undefined)) {
                  _context2.next = 11;
                  break;
                }

                console.log("Execution failed", context.error.name + ": " + context.error.message, this.script, this.target);
                return _context2.abrupt("return");

              case 11:
                if (!(context.value == undefined)) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return");

              case 15:
                if (!(context.value instanceof Promise)) {
                  _context2.next = 27;
                  break;
                }

                _context2.prev = 16;
                _context2.next = 19;
                return context.value;

              case 19:
                return _context2.abrupt("return", _context2.sent);

              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2["catch"](16);
                console.log("Execution failed", _context2.t0.name + ": " + _context2.t0.message, this.script, this.target);

              case 25:
                _context2.next = 28;
                break;

              case 27:
                return _context2.abrupt("return", context.value);

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[16, 22]]);
      }));

      function _execute(_x, _x2) {
        return _execute2.apply(this, arguments);
      }

      return _execute;
    }()
  }, {
    key: "unbind",
    value: function unbind() {
      this.data = null;

      for (var i = 0; i < this.watchList.length; i++) {
        this.watchList[i].data.off(this.watchList[i].event, this.listener);
      }

      this.watchList = [];
    }
  }, {
    key: "bind",
    value: function bind(data, map) {
      if (data == null) return;

      if (data !== null && data !== void 0 && data.on) {
        for (var p in map) {
          var event = ":" + p;
          data.on(":" + p, this.listener);
          this.watchList.push({
            data: data,
            event: event
          });
          this.bind(data[p], map[p]);
        } //if (this.watchList.includes(data))
        //    this.watchList.push({ data, event :  });

      } else {
        for (var p in map) {
          this.bind(data[p], map[p]);
        }
      }
    }
  }, {
    key: "render",
    value: function () {
      var _render = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
        var d, _d, _window, _window$app, targetElement, _d2, _targetElement$__i_bi, _targetElement$__i_bi2, _targetElement$__i_bi3, _targetElement$__i_bi4, _d3, _d4, _d5, _d6, _d7;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // @TODO: Checking properties bindings moved here
                if (data != this.data) this.unbind();
                _context3.prev = 1;

                if (!(this.type === BindingType.IUIElement)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 5;
                return this._execute(this.target, data);

              case 5:
                d = _context3.sent;
                _context3.next = 8;
                return this.target.setData(d);

              case 8:
                _context3.next = 85;
                break;

              case 10:
                if (!(this.type === BindingType.TextNode)) {
                  _context3.next = 26;
                  break;
                }

                _context3.prev = 11;
                _context3.next = 14;
                return this._execute(this.target.parentElement, data);

              case 14:
                _d = _context3.sent;

                if (!(_d === undefined)) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", false);

              case 17:
                //if (d instanceof Promise)
                //    d = await d;
                this.target.data = _d; // (d === undefined) ? "" : d;

                if (data != this.data) {
                  this.data = data;
                  this.bind(data, this.map);
                }

                _context3.next = 24;
                break;

              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](11);
                this.target.data = "";

              case 24:
                _context3.next = 85;
                break;

              case 26:
                if (!(this.type == BindingType.ContentAttribute)) {
                  _context3.next = 45;
                  break;
                }

                targetElement = this.target.ownerElement;
                _context3.next = 30;
                return this._execute(targetElement, data);

              case 30:
                _d2 = _context3.sent;

                if (!(_d2 === undefined)) {
                  _context3.next = 33;
                  break;
                }

                return _context3.abrupt("return", false);

              case 33:
                //if (d instanceof Promise)
                //  d = await d;
                targetElement.innerHTML = _d2;

                if (!((_window = window) !== null && _window !== void 0 && (_window$app = _window.app) !== null && _window$app !== void 0 && _window$app.loaded)) {
                  _context3.next = 43;
                  break;
                }

                _context3.next = 37;
                return _IUI.IUI.create(targetElement);

              case 37:
                _IUI.IUI.bind(targetElement, true, "content", (_targetElement$__i_bi = targetElement.__i_bindings) === null || _targetElement$__i_bi === void 0 ? void 0 : _targetElement$__i_bi.scope); // update references


                (_targetElement$__i_bi2 = targetElement.__i_bindings) === null || _targetElement$__i_bi2 === void 0 ? void 0 : (_targetElement$__i_bi3 = _targetElement$__i_bi2.scope) === null || _targetElement$__i_bi3 === void 0 ? void 0 : (_targetElement$__i_bi4 = _targetElement$__i_bi3.refs) === null || _targetElement$__i_bi4 === void 0 ? void 0 : _targetElement$__i_bi4._build();
                _context3.next = 41;
                return _IUI.IUI.created(targetElement);

              case 41:
                _context3.next = 43;
                return _IUI.IUI.render(targetElement, targetElement._data, true);

              case 43:
                _context3.next = 85;
                break;

              case 45:
                if (!(this.type == BindingType.IfAttribute)) {
                  _context3.next = 52;
                  break;
                }

                _context3.next = 48;
                return this._execute(this.target.ownerElement, data);

              case 48:
                _d3 = _context3.sent;
                //if (d === undefined)
                //    return false;
                this.target.ownerElement.style.display = _d3 ? "" : "none";
                _context3.next = 85;
                break;

              case 52:
                if (!(this.type == BindingType.RevertAttribute)) {
                  _context3.next = 60;
                  break;
                }

                _context3.next = 55;
                return this._execute(this.target.ownerElement, data);

              case 55:
                _d4 = _context3.sent;

                if (!(_d4 === undefined)) {
                  _context3.next = 58;
                  break;
                }

                return _context3.abrupt("return", false);

              case 58:
                _context3.next = 85;
                break;

              case 60:
                if (!(this.type === BindingType.Attribute)) {
                  _context3.next = 70;
                  break;
                }

                _context3.next = 63;
                return this._execute(this.target.ownerElement, data);

              case 63:
                _d5 = _context3.sent;

                if (!(_d5 === undefined)) {
                  _context3.next = 66;
                  break;
                }

                return _context3.abrupt("return", false);

              case 66:
                //if (d instanceof Promise)
                //  d = await d;
                if (this.attrType == AttributeBindingDestination.Field) this.target.ownerElement[this.attrKey] = _d5;else this.target.ownerElement.setAttribute(this.attrKey, _d5);

                if (data != this.data) {
                  this.data = data;
                  this.bind(data, this.map);
                }

                _context3.next = 85;
                break;

              case 70:
                if (!(this.type === BindingType.IUIElementDataAttribute)) {
                  _context3.next = 78;
                  break;
                }

                _context3.next = 73;
                return this._execute(this.target.ownerElement, data);

              case 73:
                _d6 = _context3.sent;
                _context3.next = 76;
                return this.target.ownerElement.setData(_d6);

              case 76:
                _context3.next = 85;
                break;

              case 78:
                if (!(this.type == BindingType.HTMLElementDataAttribute)) {
                  _context3.next = 85;
                  break;
                }

                _context3.next = 81;
                return this._execute(this.target.ownerElement, data);

              case 81:
                _d7 = _context3.sent;

                if (!(_d7 === undefined)) {
                  _context3.next = 84;
                  break;
                }

                return _context3.abrupt("return", false);

              case 84:
                //if (d instanceof Promise)
                //  d = await d;
                this.target.ownerElement.data = _d7;

              case 85:
                return _context3.abrupt("return", true);

              case 88:
                _context3.prev = 88;
                _context3.t1 = _context3["catch"](1);
                return _context3.abrupt("return", false);

              case 91:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 88], [11, 21]]);
      }));

      function render(_x3) {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }], [{
    key: "create",
    value: function create(nodeOrAttributeOrIUIElement, scope) {
      var code, isAsync, type, attrType, attrKey, func, script; //if (nodeOrAttributeOrIUIElement.created)
      //  debugger;

      if (nodeOrAttributeOrIUIElement instanceof _IUIElement["default"]) {
        isAsync = nodeOrAttributeOrIUIElement.hasAttribute("async");
        type = BindingType.IUIElement;
      } else if (nodeOrAttributeOrIUIElement instanceof Text) {
        // nodeOrAttribute.nodeType == 3) {
        if (!nodeOrAttributeOrIUIElement.wholeText.match(/\${.*}/)) return null;
        type = BindingType.TextNode;
        isAsync = nodeOrAttributeOrIUIElement.parentElement.hasAttribute("async"); //code = "return `" + nodeOrAttributeOrIUIElement.wholeText + "`;";

        script = nodeOrAttributeOrIUIElement.wholeText;
        code = "try {\r\n context.value = `".concat(script, "`\r\n}\r\n catch(ex) { context.error = ex; }");
        nodeOrAttributeOrIUIElement.data = "";
        nodeOrAttributeOrIUIElement.created = true;
      } else if (nodeOrAttributeOrIUIElement instanceof Attr) {
        if (nodeOrAttributeOrIUIElement.name.startsWith("async::")) {
          isAsync = true;
          attrType = AttributeBindingDestination.Attribute;
          attrKey = nodeOrAttributeOrIUIElement.name.substr(7);
        } else if (nodeOrAttributeOrIUIElement.name.startsWith("::")) {
          isAsync = false;
          attrType = AttributeBindingDestination.Attribute;
          attrKey = nodeOrAttributeOrIUIElement.name.substr(2);
        } else if (nodeOrAttributeOrIUIElement.name.startsWith("async:")) {
          isAsync = true;
          attrType = AttributeBindingDestination.Field;
          attrKey = nodeOrAttributeOrIUIElement.name.substr(6); // skip scope
          // if (attrKey == "scope")
          //     return null;
        } else if (nodeOrAttributeOrIUIElement.name.startsWith(":")) {
          isAsync = false;
          attrType = AttributeBindingDestination.Field;
          attrKey = nodeOrAttributeOrIUIElement.name.substr(1); // skip scope
          // if (attrKey == "scope")
          //     return null;
        } else {
          return null;
        } // isAsync = nodeOrAttributeOrIUIElement.value.search("await");
        //            code = "return " + nodeOrAttributeOrIUIElement.value + ";";


        script = nodeOrAttributeOrIUIElement.value;
        code = "try {\r\n context.value = ".concat(script, "; \r\n}\r\n catch(ex) { context.error = ex; }");
        var sentence = attrKey.split("-");

        for (var i = 1; i < sentence.length; i++) {
          sentence[i] = sentence[i].charAt(0).toUpperCase() + sentence[i].slice(1);
        }

        attrKey = sentence.join("");
        if (attrKey == "content") type = BindingType.ContentAttribute;else if (attrKey == "if") {
          type = BindingType.IfAttribute; //displayMode = 
        } else if (attrKey == "revert") type = BindingType.RevertAttribute;else if (attrKey != "data") type = BindingType.Attribute;else if (nodeOrAttributeOrIUIElement.ownerElement instanceof _IUIElement["default"]) type = BindingType.IUIElementDataAttribute;else type = BindingType.HTMLElementDataAttribute;
      } // test the function


      var scopeKeys = Object.keys(scope);
      var scopeValues = Object.values(scope);

      try {
        var args = ["data", "d", "context", "_test"].concat(_toConsumableArray(scopeKeys));
        if (isAsync) func = _construct(AsyncFunction, _toConsumableArray(args).concat([code]));else func = _construct(Function, _toConsumableArray(args).concat([code]));
      } catch (ex) {
        console.log("Test failed: " + ex, code);
        return null;
      }

      var rt = new Binding();
      Object.assign(rt, {
        isAsync: isAsync,
        type: type,
        attrType: attrType,
        attrKey: attrKey,
        func: func,
        target: nodeOrAttributeOrIUIElement,
        checked: false,
        script: script,
        scopeKeys: scopeKeys,
        scopeValues: scopeValues
      });
      return rt;
    }
  }]);

  return Binding;
}();

exports.Binding = Binding;

},{"./IUI.js":4,"./IUIElement.js":5}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BindingList = /*#__PURE__*/function (_Array) {
  _inherits(BindingList, _Array);

  var _super = _createSuper(BindingList);

  function BindingList(target, scope) {
    var _this;

    _classCallCheck(this, BindingList);

    _this = _super.call(this);
    _this.target = target;
    _this.scope = scope;
    _this.events = [];
    return _this;
  }

  _createClass(BindingList, [{
    key: "destroy",
    value: function destroy() {
      for (var i = 0; i < this.length; i++) {
        this[i].unbind();
      }

      this.scope = {};
      this.target = null;

      for (var i = 0; i < this.events.length; i++) {
        this.target.removeEventListener(this.events[i].name, this.events[i].handle);
      }
    }
  }, {
    key: "addEvent",
    value: function addEvent(name, handle) {
      this.target.addEventListener(name, handle);
      this.events.push({
        name: name,
        handle: handle
      });
    }
  }, {
    key: "getArgumentsNames",
    value: function getArgumentsNames() {
      if (this.scope == null) return [];
      var rt;

      for (var i in this.scope.length) {
        rt.push(i);
      }

      return rt;
    }
  }]);

  return BindingList;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports["default"] = BindingList;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IUI = void 0;
exports.iui = iui;

var _IUIElement = _interopRequireDefault(require("./IUIElement.js"));

var _Binding = require("./Binding.js");

var _BindingList = _interopRequireDefault(require("./BindingList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IUI = /*#__PURE__*/function () {
  function IUI() {
    _classCallCheck(this, IUI);
  }

  _createClass(IUI, null, [{
    key: "format",
    value: function format(input) {
      if (typeof input == "string" || input instanceof String) {
        var template = document.createElement("template");
        template.innerHTML = input;
        var nodes = template.content.cloneNode(true).childNodes;
        return nodes;
      } else if (input instanceof HTMLCollection) return input;else if (input instanceof HTMLElement) return [input];else return [];
    }
  }, {
    key: "created",
    value: function () {
      var _created = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(element) {
        var i, e;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < element.children.length)) {
                  _context.next = 11;
                  break;
                }

                e = element.children[i];

                if (!(e instanceof _IUIElement["default"])) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return e.created();

              case 6:
                _context.next = 8;
                return IUI.created(e);

              case 8:
                i++;
                _context.next = 1;
                break;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function created(_x) {
        return _created.apply(this, arguments);
      }

      return created;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(element) {
        var i, e;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < element.children.length)) {
                  _context2.next = 11;
                  break;
                }

                e = element.children[i];

                if (!(e instanceof _IUIElement["default"])) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 6;
                return e.create();

              case 6:
                _context2.next = 8;
                return IUI.create(e);

              case 8:
                i++;
                _context2.next = 1;
                break;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function create(_x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "get",
    value: function get(o) {
      return document.getElementById(o); //for(var i = 0; i < IUI.registry.length; i++)
      //	if (IUI.registry[i].id == o)
      //		return IUI.registry[i];
      //return null;
    }
  }, {
    key: "put",
    value: function put(o) {
      IUI.registry.push(o);
    }
  }, {
    key: "remove",
    value: function remove(id) {
      for (var i = 0; i < IUI.registry.length; i++) {
        if (IUI.registry[i].el.id == id) {
          IUI.registry.splice(i, 1);
          break;
        }
      }
    }
  }, {
    key: "module",
    value: function module(objectClass) {
      var moduleName = objectClass.moduleName;

      if (IUI.modules[moduleName] === undefined) {
        customElements.define("i-" + moduleName, objectClass);
        IUI.modules[moduleName] = {
          cls: objectClass,
          init: function init(properties) {
            return new objectClass(properties);
          }
        };
      }

      return objectClass;
    }
  }, {
    key: "extend",
    value: function extend(properties, defaults, overwrite) {
      if (properties == null) properties = defaults;else for (var i in defaults) {
        if (overwrite) properties[i] = defaults[i];else if (properties[i] === undefined) properties[i] = defaults[i];
      }
      return properties;
    }
  }, {
    key: "bind",
    value: function bind(element, skipAttributes, sourcePath, scope) {
      // ::Attribute
      // : Field 
      // async:: Async Attribute
      // async: Async Field
      // @ Event
      // skip element ?
      if (element.hasAttribute("skip") || element.hasAttribute("i-skip") || element instanceof HTMLTemplateElement) return; // tags to skip
      //if (element instanceof HTMLScriptElement )
      //return;

      var bindings;
      if (scope == null) scope = {}; // get refs before they get overwritten
      //let refs = scope?.refs;
      // some element extended or overwritten the binding arguments

      if (element.scope != null) IUI.extend(scope, element.scope, true);else if (element.hasAttribute(":scope")) {
        var script = element.getAttribute(":scope");
        var code = "try {\r\n context.value = ".concat(script, "; \r\n}\r\n catch(ex) { context.error = ex; }");
        var func = new Function("context", code);
        var context = {};
        func.call(element, context);
        if (context.error != undefined) console.log("Scope binding failed", context.error.name + ": " + context.error.message, this.script, this.target);else if (context.value != undefined && context.value instanceof Object) IUI.extend(scope, context.value, true);
      }
      var scopeArgs = Object.keys(scope);
      var scopeValues = Object.values(scope);
      bindings = new _BindingList["default"](element, scope);

      if (skipAttributes) {
        // copy attributes bindings
        if (element.__i_bindings != null) for (var i = 0; i < element.__i_bindings.length; i++) {
          if (element.__i_bindings[i].type != _Binding.BindingType.TextNode) bindings.push(element.__i_bindings[i]);
        }
      } else {
        var _element$__i_bindings;

        (_element$__i_bindings = element.__i_bindings) === null || _element$__i_bindings === void 0 ? void 0 : _element$__i_bindings.destroy(); // compile attributes

        for (var i = 0; i < element.attributes.length; i++) {
          // skip scope
          if (element.attributes[i].name == ":scope") continue;

          if (element.attributes[i].name.startsWith("@")) {
            (function () {
              // make events
              var code = element.attributes[i].value; //let code = `try {\r\n context.value = ${script}; \r\n}\r\n catch(ex) { context.error = ex; }`

              var func = _construct(Function, ["event"].concat(_toConsumableArray(scopeArgs), [code]));

              var handler = function handler(event) {
                func.call.apply(func, [element, event].concat(_toConsumableArray(scopeValues)));
              };

              bindings.addEvent(element.attributes[i].name.substr(1), handler);
            })();
          } else {
            var b = _Binding.Binding.create(element.attributes[i], bindings.scope);

            if (b != null) {
              if (b.type == _Binding.BindingType.HTMLElementDataAttribute || b.type == _Binding.BindingType.IUIElementDataAttribute) element.dataMap = b;else if (b.type == _Binding.BindingType.RevertAttribute) element.revertMap = b;else bindings.push(b);
            }
          }
        } // add reference
        // if (element.hasAttribute("ref")) {
        // 	let ref = element.getAttribute("ref");
        // 	if (refs[ref] == null)
        // 		refs[ref] = element;
        // 	else if (refs[ref] == element){
        // 		// do nothing
        // 	}
        // 	else if (refs[ref] instanceof Array){
        // 		refs[ref].push(element);
        // 	} else {
        // 		var firstRef = refs[ref];
        // 		refs[ref] =[firstRef, element];
        // 	}
        // }

      } // get new refs (scope might been overwritten)
      //refs = scope?.refs;
      // compile nodes


      for (var i = 0; i < element.childNodes.length; i++) {
        var el = element.childNodes[i];

        if (el instanceof _IUIElement["default"]) {
          // @TODO: check if the IUI element handles the binding
          IUI.bind(el, false, sourcePath, scope);
        } else if (el instanceof HTMLScriptElement) {
          try {
            // this because HTML parser don't evaluate script tag
            /// let func = new Function("//# sourceURL=iui://" + sourcePath + "-" + Math.round(Math.random() * 10000) + "\r\n return " + el.text.trim());
            var _func = _construct(Function, _toConsumableArray(scopeArgs).concat(["//# sourceURL=iui://" + sourcePath + "-" + Math.round(Math.random() * 10000) + "\r\n" + el.text.trim()]));

            var rt = _func.apply(el.parentElement, scopeValues);

            console.log("rt", rt);

            if (_typeof(rt) === "object") {
              for (var k in rt) {
                el.parentElement[k] = rt[k];
              }
            }
          } catch (ex) {
            console.log(ex);
          }
        } else if (el instanceof HTMLElement) {
          IUI.bind(el, false, sourcePath, scope);
        } else if (el instanceof Text) {
          var _b = _Binding.Binding.create(el, bindings.scope);

          if (_b != null) bindings.push(_b);
        }
      }

      element.__i_bindings = bindings;
    }
  }, {
    key: "render",
    value: function () {
      var _render = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(element, data) {
        var textNodesOnly,
            bindings,
            i,
            el,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                textNodesOnly = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : false;

                if (element.__i_bindings) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return");

              case 3:
                bindings = element.__i_bindings;

                if (!textNodesOnly) {
                  _context3.next = 15;
                  break;
                }

                i = 0;

              case 6:
                if (!(i < bindings.length)) {
                  _context3.next = 13;
                  break;
                }

                if (!(bindings[i].type == _Binding.BindingType.TextNode)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 10;
                return bindings[i].render(data);

              case 10:
                i++;
                _context3.next = 6;
                break;

              case 13:
                _context3.next = 22;
                break;

              case 15:
                i = 0;

              case 16:
                if (!(i < bindings.length)) {
                  _context3.next = 22;
                  break;
                }

                _context3.next = 19;
                return bindings[i].render(data);

              case 19:
                i++;
                _context3.next = 16;
                break;

              case 22:
                i = 0;

              case 23:
                if (!(i < element.children.length)) {
                  _context3.next = 49;
                  break;
                }

                el = element.children[i];

                if (!(el instanceof _IUIElement["default"])) {
                  _context3.next = 38;
                  break;
                }

                if (!(el.dataMap != null)) {
                  _context3.next = 34;
                  break;
                }

                _context3.next = 29;
                return el.dataMap.render(data);

              case 29:
                if (_context3.sent) {
                  _context3.next = 32;
                  break;
                }

                _context3.next = 32;
                return el.render();

              case 32:
                _context3.next = 36;
                break;

              case 34:
                _context3.next = 36;
                return el.setData(data);

              case 36:
                _context3.next = 46;
                break;

              case 38:
                if (!(el.dataMap != null)) {
                  _context3.next = 43;
                  break;
                }

                _context3.next = 41;
                return el.dataMap.render(data);

              case 41:
                _context3.next = 44;
                break;

              case 43:
                el.data = data;

              case 44:
                _context3.next = 46;
                return IUI.render(el, el.data);

              case 46:
                i++;
                _context3.next = 23;
                break;

              case 49:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function render(_x3, _x4) {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }]);

  return IUI;
}();

exports.IUI = IUI;

_defineProperty(IUI, "_menus", []);

_defineProperty(IUI, "views", []);

_defineProperty(IUI, "modules", {});

_defineProperty(IUI, "registry", []);

_defineProperty(IUI, "observer", new IntersectionObserver(function (entries) {
  // isIntersecting is true when element and viewport are overlapping
  // isIntersecting is false when element and viewport don't overlap
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) {
      if (entries[i]._require_update) entries[i].update();
    }
  }
}, {
  threshold: [0]
}));

;

function iui(selector) {
  return IUI.get(selector);
  /*
  if ((typeof selector === 'string' || selector instanceof String) && selector.length > 0)
  {
  	var els = document.querySelectorAll(selector); 
  }
  else
  {
  	var els = IUI.get(selector);
  	if (els != null)
  
  }
  */

  if (typeof this == "undefined" || this == window) {
    var o = IUI.get(selector);
    if (o) return o;else {
      var el;

      if ((typeof Node === "undefined" ? "undefined" : _typeof(Node)) === "object" ? o instanceof Node : selector && _typeof(selector) === "object" && typeof selector.nodeType === "number" && typeof selector.nodeName === "string" || selector === window) {
        el = selector;
      } else if (typeof selector === 'string' || selector instanceof String) {
        if (selector[0] == ".") el = document.getElementsByClassName(selector.substr(1));else el = document.getElementById(selector);
      }

      if (el) {
        var rt = {};

        var makeFunc = function makeFunc(module) {
          return function () {
            if (el instanceof HTMLCollection) {
              var _rt = [];

              for (var i = 0; i < el.length; i++) {
                var args = [el[i]];

                for (var j = 0; j < arguments.length; j++) {
                  args.push(arguments[j]);
                }

                _rt.push(IUI.modules[module].init.apply(this, args));
              }

              return _rt;
            } else {
              var args = [el];

              for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
              }

              return IUI.modules[module].init.apply(this, args);
            }
          };
        };

        for (var m in IUI.modules) {
          rt[m] = makeFunc(m);
        }

        return rt;
      }
    }
  }
  /*
  IUI.registry.push(this);
  
  
  if (selector)
  {
  	if( Object.prototype.toString.call( selector ) === '[object Array]' )
  	{
  		this.el = [];
  		selector.forEach(function(i){
  			this.el.push(query(i));
  		});
  	}
  	else
  		this.el = query(selector);
  	
  	this.events = {};
  	this.id = this.el.id;
  }
  */

}
/*
Array.prototype.each = function(func)
{
	if (this instanceof Array)
	{
		for(var i = 0; i < this.length; i++)
			if (func(this[i], i))
				break;
	}
	else
		for(var i in this)
			if(func(this[i], i))
				break;
}


Array.prototype.distinct = function(field)
{
	var rt = [];
	
	this.forEach(function(item)
	{
		if (rt.indexOf(item[field]) == -1)
			rt.push(item[field]);
	});
	
	return rt;
}
/*
iui.prototype.ec = function(className, parent)
{
	if (parent)
		return parent.getElementsByClassName(className);
	else
		return document.getElementsByClassName(className);
}

iui.prototype.ne = function(tag) 
{
	return document.createElement(tag);
}
*/

/*
iui.prototype.destroy  = function()
{
	IUI.registry.splice(IUI.registry.indexOf(this.el), 1); 
};

iui.prototype.register = function(event)
{
	this.events[event] = [];
	return this;
};

iui.prototype.emit = function(event)
{
	var args = Array.prototype.slice.call(arguments, 1);
	if (this.events && this.events[event])
		for(var i = 0; i < this.events[event].length; i++)
			this.events[event][i].apply(this, args);
	
	return this;
};

iui.prototype.on = function(event, fn) 
{
	if (this.events && this.events[event])
		this.events[event].push(fn);
	else if (document.attachEvent)
		this.el.attachEvent('on' + event, fn)
	else // if (document.addEventListener)
		this.el.addEventListener(event, fn, !0);
		
	return this;
};
*/

/*
window.addEventListener("load", function(){
	for(var m in IUI.modules)
	{
		var elements = document.getElementsByTagName(m);

	}
});
*/

},{"./Binding.js":2,"./BindingList.js":3,"./IUIElement.js":5}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUI = require("./IUI.js");

var _Binding = require("./Binding.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var IUIElement = /*#__PURE__*/function (_HTMLElement) {
  _inherits(IUIElement, _HTMLElement);

  var _super = _createSuper(IUIElement);

  function IUIElement(defaults) {
    var _this;

    _classCallCheck(this, IUIElement);

    _this = _super.call(this);
    _this._events = [];
    _this._data = null;
    _this._defaults = defaults;

    for (var i in defaults) {
      if (_this[i] == undefined) try {
        _this[i] = defaults[i];
      } catch (_unused) {// mostly because modifying dom attributes are not allowed in custom elements creation
      }
    }

    _this._register("data");

    return _this;
  }

  _createClass(IUIElement, [{
    key: "cssClass",
    get: function get() {
      if (this.hasAttribute("css-class")) return this.getAttribute("css-class"); //else
      //  return this.constructor.moduleName;
    },
    set: function set(value) {
      this.classList.remove(this.cssClass);
      this.setAttribute("css-class", value);
      this.classList.add(value);
    }
  }, {
    key: "render",
    value: function () {
      var _render = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _IUI.IUI.render(this, this._data);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function render() {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: "_getParentData",
    value: function _getParentData() {
      var p = this.parentElement;

      do {
        if (p.data !== undefined) return p.data;
      } while (p = p.parentElement);

      return undefined;
    }
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._data = value;

                this._emit("data", {
                  data: value
                });

                _context2.next = 4;
                return _IUI.IUI.render(this, value);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setData(_x) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }()
  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
  }, {
    key: "revert",
    value: function () {
      var _revert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var e, p;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                e = this;

              case 1:
                p = e.parentElement;

                if (!(e.revertMap != null)) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 5;
                return e.revertMap.render(p === null || p === void 0 ? void 0 : p.data);

              case 5:
                if (e = p) {
                  _context3.next = 1;
                  break;
                }

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function revert() {
        return _revert.apply(this, arguments);
      }

      return revert;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(data == undefined)) {
                  _context4.next = 10;
                  break;
                }

                if (!(this.dataMap != null)) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 4;
                return this.dataMap.render(this._getParentData());

              case 4:
                _context4.next = 8;
                break;

              case 6:
                _context4.next = 8;
                return this.setData(this.data);

              case 8:
                _context4.next = 17;
                break;

              case 10:
                if (!(this.dataMap != null)) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 13;
                return this.dataMap.render(data);

              case 13:
                _context4.next = 17;
                break;

              case 15:
                _context4.next = 17;
                return this.setData(data);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x2) {
        return _update.apply(this, arguments);
      }

      return update;
    }() // bindings arguments

  }, {
    key: "scope",
    get: function get() {
      return null;
    } // this meant to be inherited

  }, {
    key: "modified",
    value: function modified() {}
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      if (this.hasAttribute("css-class")) {
        this.classList.add(this.getAttribute("css-class"));
      } else {
        var className = this.constructor.moduleName;
        this.setAttribute("css-class", className);
        this.classList.add(className);
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {//     console.log("removed", this);
    }
  }, {
    key: "adoptedCallback",
    value: function adoptedCallback() {//console.log("adopted", this);
    } //appendChild(node) {
    //    // do some bindings
    //    super.appendChild(node);
    //}

  }, {
    key: "created",
    value: function created() {}
  }, {
    key: "create",
    value: function create() {}
  }, {
    key: "destroy",
    value: function destroy() {
      _IUI.IUI.registry.splice(_IUI.IUI.registry.indexOf(this), 1);

      if (this.parentNode) this.parentNode.removeChild(this);
    }
  }, {
    key: "_emit",
    value: function _emit(event, values) {
      //var args = Array.prototype.slice.call(arguments, 1);
      var e = new CustomEvent(event, values);

      for (var i in values) {
        if (e[i] === undefined) e[i] = values[i];
      }

      try {
        return this.dispatchEvent(e);
      } catch (ex) {
        console.log(ex);
      }
    }
  }, {
    key: "_encapsulateEvent",
    value: function _encapsulateEvent(code) {
      return "try {\r\n ".concat(code, " \r\n}\r\n catch(ex) { console.log(ex.name + \":\" + ex.message, this); }");
    }
  }, {
    key: "_register",
    value: function _register(event) {
      this._events.push(event);
      /*
      if (this.hasAttribute("@" + event)) {
          let handler = this.getAttribute("@" + event);
          if (handler.match(/^[A-Za-z\$_]+(?:[\$_][A-Za-z0-9]+)*$/g) === null) {
              try
              {
                  let func = new Function("event", this._encapsulateEvent(this.getAttribute("@" + event)));
                  this.addEventListener(event, func);
              } catch (ex)
              {
                  console.log(ex);
              }
          }
          else {
              let func = this[handler];
              if (func instanceof Function) {
                  this.addEventListener(event, func, false);
              }
              else {
                  // might be added in the future
                  let func = new Function("event", `this["${handler}"](event)`);
                  this.addEventListener(event, func, false);
              }
          }
      }
      */

    }
  }, {
    key: "off",
    value: function off(event, func) {
      this.removeEventListener(event, func);
      return this;
    }
  }, {
    key: "on",
    value: function on(event, func) {
      this.addEventListener(event, func, false);
      return this;
    }
  }], [{
    key: "moduleName",
    get: function get() {
      return this.name.toLowerCase();
    }
  }]);

  return IUIElement;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

exports["default"] = IUIElement;

},{"./Binding.js":2,"./IUI.js":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RefsCollection = /*#__PURE__*/function () {
  function RefsCollection(rootElement) {
    _classCallCheck(this, RefsCollection);

    this._rootElement = rootElement;
  }

  _createClass(RefsCollection, [{
    key: "_build",
    value: function _build(element, append) {
      if (element == undefined) element = this._rootElement;
      if (!append) for (var i in this) {
        if (i != "_rootElement" && i != "_build") delete this[i];
      }

      for (var i = 0; i < element.children.length; i++) {
        var child = element.children[i];

        if (child.hasAttribute("ref")) {
          var ref = child.getAttribute("ref");
          if (this[ref] == null) this[ref] = child;else if (this[ref] == child) {// do nothing
          } else if (this[ref] instanceof Array) {
            this[ref].push(child);
          } else {
            var firstRef = this[ref];
            this[ref] = [firstRef, child];
          }
        }

        if (child.refs != undefined) // opt out if the element handles referencing
          break;else this._build(child, true);
      }
    }
  }]);

  return RefsCollection;
}();

exports["default"] = RefsCollection;

},{}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_HTMLElement) {
  _inherits(Field, _HTMLElement);

  var _super = _createSuper(Field);

  function Field() {
    _classCallCheck(this, Field);

    return _super.call(this);
  }

  _createClass(Field, [{
    key: "create",
    value: function create() {//      if (this.formatter === undefined) {
      //          // load script
      //          for (var i = 0; i < this.children.length; i++)
      //              if (this.children[i] instanceof HTMLScriptElement) {
      //                  //this.formatter = new Function this.children[i].
      //              }
      //      }
      //this.style.display = "none";
    }
  }, {
    key: "name",
    get: function get() {
      return this.getAttribute("name");
    },
    set: function set(value) {
      this.setAttribute("name", value);
    }
  }, {
    key: "serialize",
    value: function serialize(tag) {
      var template = document.createElement("template");
      var node = document.createElement(tag !== null && tag !== void 0 ? tag : "div");
      var width = null,
          name = null,
          type = null; // copy attributes

      for (var i = 0; i < this.attributes.length; i++) {
        var attr = this.attributes[i];
        if (attr.name == "width") width = attr.value;else if (attr.name == "name") name = attr.value;else if (attr.name == "type") type = attr.value;else node.setAttribute(attr.name, attr.value);
      } // copy html


      node.innerHTML = this.innerHTML;
      return {
        node: node,
        width: width,
        name: name,
        type: type
      };
    }
  }], [{
    key: "moduleName",
    get: function get() {
      return this.name.toLowerCase();
    }
  }]);

  return Field;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

var _Modifiable = _interopRequireDefault(require("./Modifiable.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Form, _IUIElement);

  var _super = _createSuper(Form);

  function Form() {
    _classCallCheck(this, Form);

    return _super.call(this);
  }

  _createClass(Form, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.original = value; //var copy = {};
                //Object.assign(copy, value);

                _get(_getPrototypeOf(Form.prototype), "setData", this).call(this, new _Modifiable["default"](this.original)); //  Form._copy(this.original));
                //super.setData({ ...this.original });


              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setData(_x) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }()
  }, {
    key: "reset",
    value: function () {
      var _reset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                //super.setData({ ...this.original });
                _get(_getPrototypeOf(Form.prototype), "setData", this).call(this, new _Modifiable["default"](this.original)); //Form._copy(this.original));


                return _context3.abrupt("return", this);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function reset() {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "diff",
    get: function get() {
      return this._data._diff;
      if (this.original == null) return this._data;
      var rt = {};

      for (var i in this._data) {
        if (this._data[i] != this.original[i]) {
          if (this._data[i] instanceof Array && Form._areEqual(this._data[i], this.original[i])) continue;else rt[i] = this._data[i];
        }
      }

      return rt;
    }
  }], [{
    key: "_copy",
    value: function _copy(val) {
      if (_typeof(val) === 'object' && val !== null) {
        var rt = {};

        for (var i in val) {
          if (val[i] instanceof Array) // copy array
            rt[i] = _toConsumableArray(val[i]);else rt[i] = val[i];
        }

        return rt;
      } else return val;
    }
  }]);

  return Form;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"./Modifiable.js":11}],9:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

var _RefsCollection = _interopRequireDefault(require("../Core/RefsCollection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Include, _IUIElement);

  var _super = _createSuper(Include);

  function Include() {
    var _this;

    _classCallCheck(this, Include);

    _this = _super.call(this);
    _this.refs = new _RefsCollection["default"]();
    return _this;
  }

  _createClass(Include, [{
    key: "src",
    get: function get() {
      return this.getAttribute("src");
    },
    set: function set(value) {
      this.setAttribute("src", value);

      this._load(value);
    }
  }, {
    key: "scope",
    get: function get() {
      return {
        view: this,
        refs: this.refs
      };
    }
  }, {
    key: "_load",
    value: function () {
      var _load2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
        var src, x, _window, _window$app, t;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._loading) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                this._loading = true;
                src = url.replace(/^\/+|\/+$/g, '');
                this.classList.add(this.cssClass + "-loading");
                _context.next = 7;
                return fetch(src);

              case 7:
                x = _context.sent;

                if (!(x.status == 200)) {
                  _context.next = 22;
                  break;
                }

                _context.next = 11;
                return x.text();

              case 11:
                t = _context.sent;
                this.innerHTML = t; //let xeval = (code) => eval(code);

                if (!((_window = window) !== null && _window !== void 0 && (_window$app = _window.app) !== null && _window$app !== void 0 && _window$app.loaded)) {
                  _context.next = 22;
                  break;
                }

                _context.next = 16;
                return _IUI.IUI.create(this);

              case 16:
                _IUI.IUI.bind(this, true, "include:" + src, _IUI.IUI.extend(this._i__bindings.scope, this.scope, true));

                this.refs._build();

                _context.next = 20;
                return _IUI.IUI.created(this);

              case 20:
                _context.next = 22;
                return _IUI.IUI.render(this, this._data, true);

              case 22:
                this.classList.remove(this.cssClass + "-loading"); // if (window?.app?.loaded)
                // {
                //     await IUI.create(this);
                //     await IUI.created(this);
                //     for(let i = 0; i < this.children.length; i++)
                //     {
                //         let el =  this.children[i];
                //         IUIElement._make_bindings(el);
                //         await IUIElement._renderElement(el, el._data);
                //     }
                // }

                this._loading = false;

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _load(_x) {
        return _load2.apply(this, arguments);
      }

      return _load;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.hasAttribute("src")) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this._load(this.getAttribute("src"));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "created",
    value: function () {
      var _created = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.refs._build();

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function created() {
        return _created.apply(this, arguments);
      }

      return created;
    }()
  }]);

  return Include;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"../Core/RefsCollection.js":6}],10:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement = _interopRequireDefault(require("../Core/IUIElement.js"));

var _Field = _interopRequireDefault(require("./Field.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_HTMLElement) {
  _inherits(Layout, _HTMLElement);

  var _super = _createSuper(Layout);

  function Layout() {
    _classCallCheck(this, Layout);

    return _super.call(this);
  }

  _createClass(Layout, null, [{
    key: "moduleName",
    get: function get() {
      return this.name.toLowerCase();
    } //create()
    //{
    //       for (var i = 0; i < this.children.length; i++)
    //           if (this.children[i] instanceof Field) {
    //               this[this.children[i].name] = this.children[i];
    //               this.fields.push(this.children[i]);
    //           }
    //	this.style.display = "none";
    //}

  }, {
    key: "getHTML",
    value: function getHTML(el) {
      var removeSelf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      for (var i = 0; i < el.children.length; i++) {
        if (el.children[i] instanceof Layout) {
          var layout = el.children[i];
          var rt = layout.innerHTML;
          if (removeSelf) el.removeChild(layout);
          return rt;
        }
      }

      return null;
    }
  }, {
    key: "get",
    value: function get(el, tag) {
      var removeSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var collection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      for (var i = 0; i < el.children.length; i++) {
        if (el.children[i] instanceof Layout) {
          var layout = el.children[i];
          var rt = collection ? {} : [];

          for (var j = 0; j < layout.children.length; j++) {
            if (layout.children[j] instanceof _Field["default"]) {
              var fd = layout.children[j].serialize(tag);
              if (collection) rt[fd.name] = fd;else rt.push(fd);
            }
          }

          if (removeSelf) layout.parentElement.removeChild(layout);
          return rt;
        }
      }

      return null;
    }
  }]);

  return Layout;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement // IUIElement
)));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"./Field.js":7}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modifiable = /*#__PURE__*/function () {
  function Modifiable(original) {
    var _this = this;

    _classCallCheck(this, Modifiable);

    this._events = {};
    this._data = Modifiable._copy(original);
    this._original = original;

    var _loop = function _loop(p) {
      if (p.startsWith("_")) return "continue";

      _this._register(":" + p);

      Object.defineProperty(_this, p, {
        get: function get() {
          return this._data[p];
        },
        set: function set(value) {
          this._data[p] = value;

          this._emit(":" + p, value);
        }
      });
    };

    for (var p in this._data) {
      var _ret = _loop(p);

      if (_ret === "continue") continue;
    }
  }

  _createClass(Modifiable, [{
    key: "_diff",
    get: function get() {
      if (this._original == null) return this._data;
      var rt = {};

      for (var i in this._data) {
        if (this._data[i] != this._original[i]) {
          if (this._data[i] instanceof Array && Modifiable._areEqual(this._data[i], this._original[i])) continue;else rt[i] = this._data[i];
        }
      }

      return rt;
    }
  }, {
    key: "_register",
    value: function _register(event) {
      this._events[event] = [];
    }
  }, {
    key: "_emit",
    value: function _emit(event) {
      event = event.toLowerCase();
      var args = Array.prototype.slice.call(arguments, 1);
      if (this._events[event]) for (var i = 0; i < this._events[event].length; i++) {
        if (this._events[event][i].f.apply(this._events[event][i].i, args)) return true;
      }
      return false;
    }
  }, {
    key: "_emitArgs",
    value: function _emitArgs(event, args) {
      event = event.toLowerCase();
      if (this._events[event]) for (var i = 0; i < this._events[event].length; i++) {
        if (this._events[event][i].f.apply(this._events[event][i].i, args)) return true;
      }
      return this;
    }
  }, {
    key: "on",
    value: function on(event, fn, issuer) {
      if (!(fn instanceof Function)) return this;
      event = event.toLowerCase(); // add

      if (!this._events[event]) this._events[event] = [];

      this._events[event].push({
        f: fn,
        i: issuer == null ? this : issuer
      });

      return this;
    }
  }, {
    key: "off",
    value: function off(event, fn) {
      event = event.toLowerCase();

      if (this._events[event]) {
        if (fn) {
          for (var i = 0; i < this._events[event].length; i++) {
            if (this._events[event][i].f == fn) this._events[event].splice(i--, 1);
          }
        } else {
          this._events[event] = [];
        }
      }
    }
  }], [{
    key: "_copy",
    value: function _copy(val) {
      if (_typeof(val) === 'object' && val !== null) {
        var rt = {};

        for (var i in val) {
          if (val[i] instanceof Array) // copy array
            rt[i] = _toConsumableArray(val[i]);else rt[i] = val[i];
        }

        return rt;
      } else return val;
    } // @TODO: Remove this when esiur adds suport to partially modified arrays with modified flag

  }, {
    key: "_areEqual",
    value: function _areEqual(ar1, ar2) {
      if (!(ar1 instanceof Array) || !(ar2 instanceof Array)) return false;
      if (ar1.length != ar2.length) return false;

      for (var i = 0; i < ar1.length; i++) {
        if (ar1[i] != ar2[i]) return false;
      }

      return true;
    }
  }]);

  return Modifiable;
}();

exports["default"] = Modifiable;

},{}],12:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Repeat, _IUIElement);

  var _super = _createSuper(Repeat);

  function Repeat() {
    var _this;

    _classCallCheck(this, Repeat);

    _this = _super.call(this, {
      _data: []
    });
    _this.list = [];
    return _this;
  }

  _createClass(Repeat, [{
    key: "_isDirectDecedent",
    value: function _isDirectDecedent(x) {
      while (x = x.parentElement) {
        if (x == this) return true;else if (x instanceof Repeat && x != this) return false;
      }
    }
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      //////////////
      /// Create ///
      //////////////
      if (this._created) debugger;
      this._created = true; // create template to speed avoid HTML parsing each time.

      var repeatables = this.querySelectorAll("*[repeat]");
      repeatables = Array.from(repeatables).filter(function (x) {
        return _this2._isDirectDecedent(x);
      });

      if (repeatables.length > 0) {
        this._repeatNode = repeatables[0].cloneNode(true);
        this._container = repeatables[0].parentElement;
        this._beforeNode = repeatables[0].nextSibling;
        repeatables[0].parentElement.removeChild(repeatables[0]);
      } else {
        if (this.children.length > 0) this._repeatNode = this.children[0].cloneNode(true);else this._repeatNode = document.createElement("div");
        this.innerHTML = "";
        this._container = this;
      } // var newElements = this.querySelectorAll("*");
      // for (var i = 0; i < newElements.length; i++)
      //     newElements[i].repeat = this;
      // var self = this;

      /*
      this._repeatModified = function(propertyName, value)
      {
            var bindings = self._repeatBindings.get(this);
            // update view
          for(var i = 0; i < bindings.length; i++)
          {
              if (bindings[i].props)
              {
                  for(var j = 0; j < bindings[i].props.length; j++)
                  {
                      if (bindings[i].props[j] == propertyName)
                      {
                          bindings[i].node.data = bindings[i].func.apply(self, 
                              [this, this, this, this, 0, 0]);
                            break;
                      }
                  }
              }
          }
      };
      */

    }
  }, {
    key: "clear",
    value: function clear() {
      for (var i = 0; i < this.list.length; i++) {
        this._container.removeChild(this.list[i]);
      }

      this.list = [];
      this._data = [];
    }
  }, {
    key: "data",
    get: function get() {
      return _get(_getPrototypeOf(Repeat.prototype), "data", this);
    }
  }, {
    key: "length",
    get: function get() {
      return this._data.length;
    }
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
        var _value;

        var i, _this$__i_bindings, _this$__i_bindings2, _this$__i_bindings2$s, _this$__i_bindings2$s2, e;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._busy) {
                  _context.next = 3;
                  break;
                }

                console.log("Busy", this);
                return _context.abrupt("return", false);

              case 3:
                this._busy = true; // clear

                this.clear();
                if (((_value = value) === null || _value === void 0 ? void 0 : _value.toArray) instanceof Function) value = value.toArray();else if (value == null || !(value instanceof Array || value instanceof Int32Array)) value = []; //debugger;

                _context.next = 8;
                return _get(_getPrototypeOf(Repeat.prototype), "setData", this).call(this, value);

              case 8:
                i = 0;

              case 9:
                if (!(i < value.length)) {
                  _context.next = 24;
                  break;
                }

                e = this._repeatNode.cloneNode(true);
                this.list.push(e);
                _context.next = 14;
                return _IUI.IUI.create(e);

              case 14:
                _IUI.IUI.bind(e, false, "repeat", _IUI.IUI.extend((_this$__i_bindings = this.__i_bindings) === null || _this$__i_bindings === void 0 ? void 0 : _this$__i_bindings.scope, {
                  index: i,
                  repeat: this
                }, true));

                this._container.insertBefore(e, this._beforeNode); // update referencing


                (_this$__i_bindings2 = this.__i_bindings) === null || _this$__i_bindings2 === void 0 ? void 0 : (_this$__i_bindings2$s = _this$__i_bindings2.scope) === null || _this$__i_bindings2$s === void 0 ? void 0 : (_this$__i_bindings2$s2 = _this$__i_bindings2$s.refs) === null || _this$__i_bindings2$s2 === void 0 ? void 0 : _this$__i_bindings2$s2._build();
                _context.next = 19;
                return _IUI.IUI.created(e);

              case 19:
                _context.next = 21;
                return _IUI.IUI.render(e, value[i], false);

              case 21:
                i++;
                _context.next = 9;
                break;

              case 24:
                // @TODO: check if this works for event names starting with ":"
                this._emit(":data", {
                  data: value
                }); // this._emit("modified", { data: value, property: "data" });


                this._busy = false;

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setData(_x) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }()
  }]);

  return Repeat;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],13:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(TableRow, _IUIElement);

  var _super = _createSuper(TableRow);

  function TableRow() {
    _classCallCheck(this, TableRow);

    return _super.call(this);
  }

  _createClass(TableRow, [{
    key: "create",
    value: function create() {
      //this.style.display = "none";
      this.style.display = "table-row";
      console.log("TR");
    }
  }]);

  return TableRow;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],14:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Link, _IUIElement);

  var _super = _createSuper(Link);

  function Link() {
    var _this;

    _classCallCheck(this, Link);

    //debugger;
    _this = _super.call(this, {
      cssClass: 'link'
    }); //      super({ cssClass: 'link' });

    _this._register("route");

    _this.addEventListener("click", function (e) {
      var r = _this.getBoundingClientRect();

      _this.style.setProperty("--x", e.x - r.x + "px");

      _this.style.setProperty("--y", e.y - r.y + "px");

      _this.style.setProperty("--w", r.width + "px");

      _this.style.setProperty("--h", r.height + "px");

      _this.classList.remove(_this.cssClass + "-clicked");

      void _this.offsetWidth;

      _this.classList.add(_this.cssClass + "-clicked");

      var url = _this.getAttribute("href");

      var ok = _this._emit("route", {
        url: url,
        cancelable: true,
        query: _this.query
      });

      if (!ok) return; //if (url == "#")
      //  url = router.current.link;
      // return;

      var target = _this.hasAttribute("target") ? document.getElementById(_this.getAttribute("target")) : null;

      if (url == ":back") {
        window.router.back();
        return;
      }

      if (_this.query) // || this.hasAttribute(":data"))
        window.router.navigate(url || router.current.url, _this.query, target);else if (url != null) window.router.navigate(url, undefined, target);
    }); //this._register("click");


    return _this;
  }

  _createClass(Link, [{
    key: "link",
    get: function get() {
      return this.getAttribute("href");
    },
    set: function set(value) {
      this.setAttribute("href", value);
    }
  }, {
    key: "create",
    value: function create() {}
  }]);

  return Link;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],15:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

var _Router = _interopRequireDefault(require("./Router.js"));

var _RefsCollection = _interopRequireDefault(require("../Core/RefsCollection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Route, _IUIElement);

  var _super = _createSuper(Route);

  function Route() {
    var _this;

    _classCallCheck(this, Route);

    _this = _super.call(this);
    _this.routes = [];
    _this.refs = new _RefsCollection["default"](_assertThisInitialized(_this));

    _this._register("show");

    _this._register("hide");

    return _this;
  }

  _createClass(Route, [{
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.hasAttribute("debug")) debugger;
                _context.next = 3;
                return _get(_getPrototypeOf(Route.prototype), "setData", this).call(this, value);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setData(_x) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }()
  }, {
    key: "scope",
    get: function get() {
      return {
        route: this,
        view: this
      };
    }
  }, {
    key: "_updateLinks",
    value: function _updateLinks() {
      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i] instanceof Route) {
          this.routes.push(this.children[i]);
          window.router.add(this.children[i], this);
          i--;
        }
      }
    }
  }, {
    key: "link",
    get: function get() {
      var link = this.name;
      var parent = this.parent;

      while (parent != null) {
        link = parent.name + "/" + link;
        parent = parent.parent;
      }

      return link;
    }
  }, {
    key: "name",
    get: function get() {
      return this.getAttribute("name");
    }
  }, {
    key: "src",
    get: function get() {
      return this.getAttribute("src");
    }
  }, {
    key: "dst",
    get: function get() {
      return this._dst || this.getAttribute("dst");
    },
    set: function set(value) {
      this._dst = value;
    }
  }, {
    key: "caption",
    get: function get() {
      return this.getAttribute("caption");
    }
  }, {
    key: "private",
    get: function get() {
      return this.hasAttribute("private");
    }
  }, {
    key: "icon",
    get: function get() {
      return this.getAttribute("icon");
    }
  }, {
    key: "_getParent",
    value: function _getParent() {
      var e = null; //this.parentElement;

      while (e = this.parentElement) {
        if (e instanceof Route || e instanceof _Router["default"]) return e;
      }

      return null;
    } // get route() {
    //     return this;
    // }
    // get view() {
    //     return this;
    // }

  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _window, _window$app;

        var _src, x, t;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //window.router.add(this);
                this._updateLinks();

                if (!this.hasAttribute("src")) {
                  _context2.next = 12;
                  break;
                }

                _src = this.getAttribute("src").replace(/^\/+|\/+$/g, '');
                _context2.next = 5;
                return fetch(_src);

              case 5:
                x = _context2.sent;

                if (!(x.status != 200)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return");

              case 8:
                _context2.next = 10;
                return x.text();

              case 10:
                t = _context2.sent;
                this.innerHTML = t; //let xeval = (code) => eval(code);

              case 12:
                if (!((_window = window) !== null && _window !== void 0 && (_window$app = _window.app) !== null && _window$app !== void 0 && _window$app.loaded)) {
                  _context2.next = 21;
                  break;
                }

                _context2.next = 15;
                return _IUI.IUI.create(this);

              case 15:
                _IUI.IUI.bind(this, true, "route:" + src, this.scope);

                this.refs._build();

                _context2.next = 19;
                return _IUI.IUI.created(this);

              case 19:
                _context2.next = 21;
                return _IUI.IUI.render(this, this._data, true);

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "created",
    value: function created() {
      this.refs._build();
    }
  }, {
    key: "set",
    value: function set(value) {
      if (value == this.visible) return;

      if (value) {
        this.setAttribute("selected", "");

        this._emit("show");
      } else {
        this.removeAttribute("selected");

        this._emit("hide");
      }
    }
  }, {
    key: "visible",
    get: function get() {
      return this.hasAttribute("selected");
    },
    set: function set(value) {
      this.set(value);
    }
  }]);

  return Route;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"../Core/RefsCollection.js":6,"./Router.js":16}],16:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement = _interopRequireDefault(require("../Core/IUIElement.js"));

var _Route = _interopRequireDefault(require("./Route.js"));

var _Target2 = _interopRequireDefault(require("./Target.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_Target) {
  _inherits(Router, _Target);

  var _super = _createSuper(Router);

  function Router() {
    var _this;

    _classCallCheck(this, Router);

    _this = _super.call(this, {
      routes: [],
      _states: new Map(),
      active: null,
      cssClass: "router"
    });
    _this._history = []; //IUI._router = this;
    //Object.defineProperty(window, "router", {
    //    get() {
    //        if (!IUI._router.isConnected)
    //            IUI._router = document.getElementsByTagName("i-router")[0];
    //        return IUI._router;
    //    }
    //});

    return _this;
  }

  _createClass(Router, [{
    key: "_getRouteParent",
    value: function _getRouteParent(route) {
      var e = null;

      while (e = route.parentElement) {
        if (e instanceof _Route["default"] || e instanceof Router) return e;
      }

      return null;
    }
  }, {
    key: "add",
    value: function add(route) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (parent == null) {
        this.routes.push(route);
      } else {
        route.parent = parent;
        this.appendChild(route); //parent.routes.push(route);
      }
    }
  }, {
    key: "_routeInPath",
    value: function _routeInPath(name, routes) {
      for (var i = 0; i < routes.length; i++) {
        if (routes[i].name == name) return routes[i];
      }

      return null;
    }
  }, {
    key: "getRoute",
    value: function getRoute(url, data) {
      var p = url.split("/");
      var searchRoutes = this.routes;

      for (var i = 0; i < p.length; i++) {
        var route = this._routeInPath(p[i], searchRoutes);

        if (route == null) return [null, null];

        if (i == p.length - 1) {
          // return [destination state route (link, icon,..etc) , actual route to view]
          if (route.dst == null) return [route, route];else {
            var dst = route.dst instanceof Function ? route.dst(data) : route.dst;

            var _url = dst.replace(/^[/]*(.*?)[/]*$/g, '$1').trim();

            return [route, this.getRoute(_url)[1]];
          }
        }

        searchRoutes = route.routes;
      }
    }
  }, {
    key: "back",
    value: function back() {
      //if (this._history.length > 1) {
      //    let last = this._history[this._history.length - 2];
      //    this.navigate(last.url, last.data, last.target);
      //}
      window.history.back();
    }
  }, {
    key: "_toQuery",
    value: function _toQuery(o) {
      var rt = [];

      for (var i in o) {
        if (o[i] == undefined) rt.push(i);else rt.push(i + "=" + encodeURI(o[i].toString().replace("&", "&&")));
      } ///encodeURIComponent(o[i]));


      return rt.join("&");
    }
  }, {
    key: "_fromQuery",
    value: function _fromQuery(q) {
      var kv = q.replace("&&", "\0").split('&');
      var rt = {};

      for (var i = 0; i < kv.length; i++) {
        var d = kv[i].replace("\0", "&").split('=', 2);
        var v = decodeURI(d[1] || ''); //decodeURIComponent(d[1] || '');

        if (v != null && v.trim() != '' && !isNaN(v)) v = new Number(v);
        rt[d[0]] = v;
      }

      return JSON.parse(JSON.stringify(rt));
    }
  }, {
    key: "navigate",
    value: function () {
      var _navigate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, data, target, state) {
        var dataToQuery,
            q,
            path,
            _this$getRoute,
            _this$getRoute2,
            stateRoute,
            viewRoute,
            ok,
            id,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dataToQuery = _args.length > 4 && _args[4] !== undefined ? _args[4] : true;
                q = url.match(/^\/*(.*?)\?(.*)$|^\/*(.*)$/); //debugger;

                // do we have a query string ?
                if (q[2] !== undefined) {
                  path = q[1];
                  data = this._fromQuery(q[2]);
                  url = path + "?" + q[2];
                } // do we have data ?
                else if (data !== undefined) {
                  path = q[3];
                  url = dataToQuery ? path + "?" + this._toQuery(data) : path;
                } else {
                  path = q[3];
                  url = path;
                }

                _this$getRoute = this.getRoute(path, data), _this$getRoute2 = _slicedToArray(_this$getRoute, 2), stateRoute = _this$getRoute2[0], viewRoute = _this$getRoute2[1];

                if (!(stateRoute == null)) {
                  _context.next = 7;
                  break;
                }

                console.warn("State not found ", path);
                return _context.abrupt("return");

              case 7:
                ok = this._emit("navigate", {
                  url: url,
                  stateRoute: stateRoute,
                  viewRoute: viewRoute,
                  base: path,
                  data: data,
                  cancelable: true
                });

                if (ok) {
                  _context.next = 11;
                  break;
                }

                console.warn("Route not allowed", path);
                return _context.abrupt("return");

              case 11:
                // destination view not found
                if (viewRoute == null) {
                  console.log("Destination route not found ".concat(stateRoute.dst));
                  viewRoute = stateRoute;
                } //let state = null;
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


                if (!(target instanceof _Target2["default"])) target = this;

                if (state == null) {
                  id = Math.random().toString(36).substr(2, 10);
                  state = {
                    id: id,
                    url: url,
                    data: data,
                    target: target,
                    stateRoute: stateRoute,
                    viewRoute: viewRoute
                  };

                  this._states.set(id, state);

                  history.pushState(id, stateRoute.caption, this._hash ? "#" + url : "/" + url);
                }

                this._history.push(state.id); // { url, data, target, stateRoute, viewRoute });


                target.show(viewRoute, this.active);
                viewRoute.set(true);
                this.active = viewRoute; //{ url: "/", data: null, target: null }; 

                this._emit("route", {
                  route: stateRoute
                });

                viewRoute.query = data || {};
                stateRoute.query = viewRoute.query;
                target.setLoading(true);

                if (!(stateRoute.dataMap != null)) {
                  _context.next = 33;
                  break;
                }

                _context.next = 25;
                return stateRoute.dataMap.render(data || {});

              case 25:
                if (_context.sent) {
                  _context.next = 28;
                  break;
                }

                _context.next = 28;
                return stateRoute.render();

              case 28:
                if (!(viewRoute != stateRoute)) {
                  _context.next = 31;
                  break;
                }

                _context.next = 31;
                return viewRoute.setData(stateRoute.data);

              case 31:
                _context.next = 35;
                break;

              case 33:
                _context.next = 35;
                return viewRoute.setData(data);

              case 35:
                target.setLoading(false);

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function navigate(_x, _x2, _x3, _x4) {
        return _navigate.apply(this, arguments);
      }

      return navigate;
    }()
  }, {
    key: "hide",
    value: function hide() {// do nothing, we're not here to hide.
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var state = this.current;
      this.navigate(state.url, state.data, state.target, state); //this.current.render();
      //this.current.data = this.current.data;
      //if (updateAttributes)
      //  this.current.updateAttributes(true);
    }
  }, {
    key: "show",
    value: function show(route, active) {
      _get(_getPrototypeOf(Router.prototype), "show", this).call(this, route, active);
    }
  }, {
    key: "current",
    get: function get() {
      return this._states.get(history.state); //.viewRoute;
      //return this._history[this._history.length - 1].viewRoute;
    }
  }, {
    key: "previous",
    get: function get() {
      if (this._history.length > 2) return this._states.get(this._history[this._history.length - 2]); //.viewRoute;
      else return null;
    }
  }, {
    key: "create",
    value: function create() {
      // save origin
      this.origin = window.location.pathname + window.location.search;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log("Destroyed", this);
    }
  }, {
    key: "created",
    value: function created() {
      if (this.hasAttribute("type") && this.getAttribute("type").toLowerCase() == "hash") this._hash = true; /// find all children

      for (var i = 0; i < this.children.length; i++) {
        var e = this.children[i];

        if (e instanceof _Route["default"]) {
          this.add(e);
          if (e.visible) this.navigate(e.name);
        }
      }

      this._emit("created"); //console.log("Router created", this);

    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      //console.log("New router", this);
      window.router = this;
      var self = this;
      window.addEventListener("popstate", function (event) {
        //console.log(event);
        var stateId = event.state;
        var path;

        if (self._hash) {
          path = window.location.hash;
          if (path.length > 0) path = path.substr(1);
        } else {
          path = window.location.pathname;
        }

        if (stateId != null) {
          if (stateId != self._history[self._history.length - 1]) {
            //this._lastStateId = stateId;
            var state = self._states.get(stateId);

            self.navigate(path, state.data, state.target, state);
          } else {
            console.log("SAME");
          }
        } else {
          this._lastState = null;
          self.navigate(path, undefined, undefined, {});
        } //alert("location: " + document.location + ", state: " + JSON.stringify(event.state));


        console.log(document.location.hash, event.state);
      });

      this._register("navigate");

      this._register("route");

      this._register("created");
    }
  }]);

  return Router;
}(_Target2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"./Route.js":15,"./Target.js":17}],17:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

var _Route = _interopRequireDefault(require("./Route.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Target, _IUIElement);

  var _super = _createSuper(Target);

  function Target(properties) {
    var _this;

    _classCallCheck(this, Target);

    _this = _super.call(this, _IUI.IUI.extend(properties, {
      cssClass: 'target'
    }));

    _this._register("show");

    _this._register("hide");

    return _this;
  }

  _createClass(Target, [{
    key: "setLoading",
    value: function setLoading(value) {
      if (value) this.classList.add(this.cssClass + "-loading");else this.classList.remove(this.cssClass + "-loading");
    }
  }, {
    key: "create",
    value: function create() {}
  }, {
    key: "show",
    value: function show(route, previous) {
      var previousTarget = previous === null || previous === void 0 ? void 0 : previous.target;
      route.target = this;

      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i] instanceof _Route["default"] && this.children[i] != route) {
          this.children[i].set(false);
        }
      } //if (previous != null && previous != route && previous.target == this) {
      //    previous.set(false);
      //}
      //else 


      if (previousTarget != null && previousTarget != this) {
        previousTarget.hide(this.active);
      }

      if (route.parentElement != this) this.appendChild(route);

      this._emit("show", {
        route: route,
        previous: previous
      });
    }
  }, {
    key: "hide",
    value: function hide(route) {
      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i] instanceof _Route["default"]) {
          this.children[i].set(false);
        }
      }

      this._emit("hide", {
        route: route
      });
    }
  }]);

  return Target;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"./Route.js":15}],18:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Background, _IUIElement);

  var _super = _createSuper(Background);

  function Background() {
    var _this;

    _classCallCheck(this, Background);

    _this = _super.call(this, {
      cssClass: 'background'
    });

    _this.classList.add(_this.cssClass);

    _this._register("visible");

    return _this;
  }

  _createClass(Background, [{
    key: "create",
    value: function create() {}
  }, {
    key: "hide",
    value: function hide() {
      return this.setVisible(false);
    }
  }, {
    key: "show",
    value: function show() {
      return this.setVisible(true);
    }
  }, {
    key: "setVisible",
    value: function setVisible(value) {
      this.visible = value;

      if (value) {
        this.classList.add(this.cssClass + "-visible");
      } else {
        this.classList.remove(this.cssClass + "-visible");
      }

      this._emit("visible", value);

      return this;
    }
  }]);

  return Background;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],19:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Button, _IUIElement);

  var _super = _createSuper(Button);

  function Button() {
    var _this;

    _classCallCheck(this, Button);

    _this = _super.call(this, {
      cssClass: 'button'
    });

    _this.addEventListener("mousedown", function (e) {
      var r = _this.getBoundingClientRect();

      _this.style.setProperty("--x", e.x - r.x + "px");

      _this.style.setProperty("--y", e.y - r.y + "px");

      _this.style.setProperty("--w", r.width + "px");

      _this.style.setProperty("--h", r.height + "px");

      _this.classList.remove(_this.cssClass + "-clicked");

      void _this.offsetWidth;

      _this.classList.add(_this.cssClass + "-clicked");
    }, true);

    _this._register("check");

    return _this;
  }

  _createClass(Button, [{
    key: "type",
    get: function get() {
      return this.getAttribute("type");
    },
    set: function set(value) {
      this.setAttribute("type", value);
    }
  }, {
    key: "checked",
    get: function get() {
      return this.hasAttribute("checked");
    },
    set: function set(value) {
      if (value) this.setAttribute("checked", "");else this.removeAttribute("checked");
    }
  }, {
    key: "disabled",
    get: function get() {
      return this.getAttribute("disabled");
    },
    set: function set(value) {
      this.setAttribute("disabled", value);
    }
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      if (this.type == "check") {
        this.addEventListener("click", function () {
          var checked = !_this2.checked;
          _this2.checked = checked;

          _this2._emit("check", {
            checked: checked
          });
        });
      } //this.classList.add(this.cssClass);

    }
  }]);

  return Button;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],20:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Check, _IUIElement);

  var _super = _createSuper(Check);

  function Check(properties) {
    var _this;

    _classCallCheck(this, Check);

    _this = _super.call(this, _IUI.IUI.extend(properties, {
      cssClass: 'check'
    }));

    _this._register("check");

    _this.on("click", function () {
      _this.checked = !_this.checked;
    });

    return _this;
  }

  _createClass(Check, [{
    key: "checked",
    get: function get() {
      return this.hasAttribute("checked");
    },
    set: function set(value) {
      this.check(value);

      this._emit("check", {
        checked: value
      });
    }
  }, {
    key: "check",
    value: function check(value) {
      if (value) this.setAttribute("checked", "checked");else this.removeAttribute("checked");
    }
  }, {
    key: "create",
    value: function create() {
      this.field = this.getAttribute("field");
    }
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(_getPrototypeOf(Check.prototype), "setData", this).call(this, value);

              case 2:
                if (value != null && this.field != null) this.value = value[this.field];else if (this.field != null) this.value = null;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setData(_x) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }()
  }, {
    key: "modified",
    value: function modified(name, value) {
      if (name == this.field) {
        this.value = value;
      }
    }
  }, {
    key: "value",
    get: function get() {
      return this.checked;
    },
    set: function set(value) {
      this.checked = value;
    }
  }]);

  return Check;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],21:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

var _RefsCollection = _interopRequireDefault(require("../Core/RefsCollection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(CodePreview, _IUIElement);

  var _super = _createSuper(CodePreview);

  function CodePreview() {
    var _this;

    _classCallCheck(this, CodePreview);

    _this = _super.call(this);
    _this.refs = new _RefsCollection["default"](_assertThisInitialized(_this));
    _this._code = _this.innerHTML.trim();
    _this.textContent = '';
    return _this;
  }

  _createClass(CodePreview, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var self;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.hasAttribute("debug")) debugger; //this._code = this.innerHTML.trim();
                //this.textContent = '';
                // create elements

                this.bar = document.createElement("div");
                this.bar.className = this.cssClass + "-bar";
                this.content = document.createElement("div");
                this.content.className = this.cssClass + "-content";
                this.editor = document.createElement("code");
                this.editor.className = this.cssClass + "-editor";
                this.editor.innerText = this._code;
                this.editor.contentEditable = true;
                this.editor.setAttribute("skip", true);
                self = this;
                this.editor.addEventListener("input", function () {
                  self._code = self.editor.textContent.trim();
                  self.updatePreview();
                }, false);
                this.preview = document.createElement("div");
                this.preview.className = this.cssClass + "-preview"; //this.preview.setAttribute(":content", "");

                this.content.append(this.editor);
                this.content.append(this.preview);
                this.append(this.bar);
                this.append(this.content);
                this.field = this.getAttribute("field"); //await this.updatePreview();

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "created",
    value: function () {
      var _created = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.updatePreview();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function created() {
        return _created.apply(this, arguments);
      }

      return created;
    }()
  }, {
    key: "scope",
    get: function get() {
      return {
        view: this,
        refs: this.refs
      };
    }
  }, {
    key: "updatePreview",
    value: function () {
      var _updatePreview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _window$app;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._updating) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                this._updating = true;
                this.preview.innerHTML = this._code; //this.editor.innerHTML = hljs.highlightAuto(this._code).value;
                //        this.editor.innerHTML = hljs.highlight(this._code, {language: 'html'}).value
                //     this.editor.innerHTML = hljs.highlightElement(this.editor, {language: 'html'}).value;

                if (!((_window$app = window.app) !== null && _window$app !== void 0 && _window$app.loaded)) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 7;
                return _IUI.IUI.create(this.preview);

              case 7:
                _context3.next = 9;
                return _IUI.IUI.created(this.preview);

              case 9:
                _IUI.IUI.bind(this.preview, true, "preview", this.scope);

                this.refs._build();

                _context3.next = 13;
                return _IUI.IUI.render(this.preview, this._data, true);

              case 13:
                this._updating = false;

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updatePreview() {
        return _updatePreview.apply(this, arguments);
      }

      return updatePreview;
    }()
  }]);

  return CodePreview;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"../Core/RefsCollection.js":6}],22:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(DateTimePicker, _IUIElement);

  var _super = _createSuper(DateTimePicker);

  function DateTimePicker() {
    _classCallCheck(this, DateTimePicker);

    return _super.call(this);
  }

  _createClass(DateTimePicker, [{
    key: "layout",
    get: function get() {
      return this._layout;
    },
    set: function set(value) {
      if (value == this._layout) return;
      this.innerHTML = "";
      this._layout = value;
      this.calendar = document.createElement("div");
      this.calendar.className = this.cssClass + "-calendar";
      this.calendarContent = document.createElement("div");
      this.calendarContent.className = this.cssClass + "-calendar-content";
      this.table = document.createElement("table");
      this.header = this.table.createTHead();
      this.body = this.table.createTBody();
      this.calendarContent.appendChild(this.table);
      var tr = this.header.insertRow();

      for (var i = 0; i < 7; i++) {
        var td = tr.insertCell();
        td.innerHTML = this.layout.day.formatter((i + this.layout.weekStart) % 7);
        td.className = this.cssClass + "-day";
      }

      this.tools = document.createElement("div");
      this.tools.className = this.cssClass + "-tools";
      this.month = document.createElement("div");
      this.month.className = this.cssClass + "-month";
      this.monthName = document.createElement("div");
      this.monthName.className = this.cssClass + "-name";
      this.nextMonth = document.createElement("div");
      this.nextMonth.className = this.cssClass + "-next";
      this.previousMonth = document.createElement("div");
      ;
      this.previousMonth.className = this.cssClass + "-previous";
      this.month.appendChild(this.previousMonth);
      this.month.appendChild(this.monthName);
      this.month.appendChild(this.nextMonth);
      this.year = document.createElement("div");
      this.year.className = this.cssClass + "-year";
      this.yearName = document.createElement("div");
      this.yearName.className = this.cssClass + "-name";
      this.nextYear = document.createElement("div");
      this.nextYear.className = this.cssClass + "-next";
      this.previousYear = document.createElement("div");
      this.previousYear.className = this.cssClass + "-previous";
      this.year.appendChild(this.previousYear);
      this.year.appendChild(this.yearName);
      this.year.appendChild(this.nextYear);
      this.tools.appendChild(this.month);
      this.tools.appendChild(this.year);
      var self = this;
      this.nextMonth.addEventListener("click", function () {
        self._month = (self._month + 1) % 12;
        self.render();
      });
      this.previousMonth.addEventListener("click", function () {
        self._month = (self._month + 11) % 12;
        self.render();
      });
      this.nextYear.addEventListener("click", function () {
        self._year++;
        self.render();
      });
      this.previousYear.addEventListener("click", function () {
        self._year--;
        self.render();
      });

      for (var _i = 0; _i < 6; _i++) {
        tr = this.body.insertRow();

        for (var j = 0; j < 7; j++) {
          var _td = tr.insertCell(tr);

          _td.className = this.cssClass + "-day";
          _td.innerHTML = _i + "x" + j;

          _td.addEventListener("click", function () {
            self._day = parseInt(this.getAttribute("data-day"));
            self._month = parseInt(this.getAttribute("data-month"));
            self._year = parseInt(this.getAttribute("data-year"));

            self._value.setDate(self._day);

            self._value.setFullYear(self._year);

            self._value.setMonth(self._month);

            self.render();

            self._emit("select", {
              value: self._value
            });

            self._emit(":value", {
              value: value
            });
          });
        }
      }

      this.calendar.appendChild(this.tools);
      this.calendar.appendChild(this.calendarContent);
      /*
      this.minutes = document.createElement("div");
      this.minutes.className = this.cssClass + "-clock";
        for (var i = 1; i < 61; i++) {
          var range = document.createElement("div");
            range.className = this.cssClass + "-time";
          range.innerHTML = i;
          this.minutes.appendChild(range);
        }
        this.hours = document.createElement("div");
      this.hours.className = this.cssClass + "-clock";
        for (var i = 1; i < 25; i++) {
          var range = document.createElement("div");
            range.className = this.cssClass + "-time";
          range.innerHTML = i;
          this.hours.appendChild(range);
          }
      */

      this.clock = document.createElement("div");
      this.clock.className = this.cssClass + "-clock";

      for (var _i2 = 0; _i2 < 1440; _i2 += this.layout.time.range) {
        var range = document.createElement("div");
        range.className = this.cssClass + "-time";
        range.innerHTML = this.layout.time.formatter(_i2);
        range.setAttribute("data-time", _i2);
        this.clock.appendChild(range);
        range.addEventListener("click", function () {
          var t = parseInt(this.getAttribute("data-time"));
          var h = Math.floor(t / 60);
          var m = Math.floor(t % 60);

          self._value.setHours(h);

          self._value.setMinutes(m);

          self._emit("select", self._value);

          self.render();
        });
      } //this.timeList = document.createElement("div");
      //this.timeList = 


      this.appendChild(this.calendar);
      this.appendChild(this.clock); //      this.appendChild(this.minutes);
      //        this.appendChild(this.hours);

      this.value = new Date();
    }
  }, {
    key: "create",
    value: function create() {
      var self = this;

      this._register("select");

      this.classList.add(this.cssClass);
      this.layout = {
        day: {
          formatter: function formatter(index) {
            return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]; //return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index];
          }
        },
        month: {
          formatter: function formatter(index) {
            return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][index];
          }
        },
        year: {
          formatter: function formatter(value) {
            return value;
          }
        },
        time: {
          formatter: function formatter(value) {
            var formatDigit = function formatDigit(d) {
              return d < 10 ? "0" + d : d;
            };

            var h = Math.floor(value / 60);
            var m = Math.floor(value % 60);
            return formatDigit(h) + ":" + formatDigit(m);
          },
          range: 15
        },
        weekStart: 5
      };
    }
  }, {
    key: "render",
    value: function render() {
      var start = new Date(this._year, this._month, 1);
      var offset = 1 - start.getDay() - (7 - this.layout.weekStart) % 7; //(this.weekStart > 3 ? (this.weekStart - 7) : this.weekStart);

      this.yearName.innerHTML = this.layout.year.formatter(this._year);
      this.monthName.innerHTML = this.layout.month.formatter(this._month);
      var today = new Date();

      for (var i = 0; i < 42; i++) {
        var rowIndex = Math.floor(i / 7);
        var cellIndex = i % 7;
        var td = this.body.rows[rowIndex].cells[cellIndex];
        var d = new Date(this._year, this._month, offset + i);
        td.classList.remove(this.cssClass + "-different-month"); // gray it

        if (d.getMonth() != this._month) td.classList.add(this.cssClass + "-different-month");
        if (d.getDate() == today.getDate() && d.getMonth() == today.getMonth() && d.getFullYear() == today.getFullYear()) td.classList.add(this.cssClass + "-day-today");else td.classList.remove(this.cssClass + "-day-today");
        if (d.getDate() == this._value.getDate() && d.getFullYear() == this._value.getFullYear() && d.getMonth() == this._value.getMonth()) td.classList.add(this.cssClass + "-day-selected");else td.classList.remove(this.cssClass + "-day-selected");
        td.setAttribute("data-day", d.getDate());
        td.setAttribute("data-month", d.getMonth());
        td.setAttribute("data-year", d.getFullYear());
        td.innerHTML = d.getDate();
      }

      for (var i = 0; i < this.clock.children.length; i++) {
        this.clock.children[i].classList.remove(this.cssClass + "-time-selected");
      }

      var time = this._value.getHours() * 60 + this._value.getMinutes();

      if (time % this.layout.time.range == 0) this.clock.children[time / this.layout.time.range].classList.add(this.cssClass + "-time-selected");
    }
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(_getPrototypeOf(DateTimePicker.prototype), "setData", this).call(this, value);

              case 2:
                if (value != null && this.field != null) this.value = this.data[this.field];

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setData(_x) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }()
  }, {
    key: "data",
    get: function get() {
      return _get(_getPrototypeOf(DateTimePicker.prototype), "data", this);
    }
  }, {
    key: "modified",
    value: function modified(name, value) {
      if (name == this.field) this.value = value;
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      if (value && !isNaN(value.getTime())) {
        this._value = value;
        this._month = value.getMonth();
        this._year = value.getFullYear();
        this._day = value.getDate();
        this.render();

        this._emit("select", {
          value: value
        });

        this._emit("modified", {
          value: value,
          property: "value"
        }); //this.modified("value", );
        //this.modified("modified", { value });

      }
    }
  }]);

  return DateTimePicker;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],23:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

var _Window = _interopRequireDefault(require("./Window.js"));

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _IUI.IUI.module((_temp = _class = /*#__PURE__*/function (_IUIWindow) {
  _inherits(IUIDialog, _IUIWindow);

  var _super = _createSuper(IUIDialog);

  function IUIDialog() {
    var _this;

    _classCallCheck(this, IUIDialog);

    _this = _super.call(this, {
      closeable: true,
      resizeable: true,
      draggable: false,
      _dragging: false,
      _expanding: false,
      x: 0,
      y: 0,
      visible: false,
      modal: false
    });

    var self = _assertThisInitialized(_this);

    _this._register("visible");

    _this._register("resize");

    _this.on("close", function () {
      self.hide();
    });

    return _this;
  }

  _createClass(IUIDialog, [{
    key: "create",
    value: function create() {
      _get(_getPrototypeOf(IUIDialog.prototype), "create", this).call(this);

      var self = this;

      if (this.modal) {
        this.background = iui("iui_app_background");

        if (!this.background) {
          var bg = document.createElement("div");
          bg.id = "iui_app_background";
          document.body.insertAdjacentElement("afterBegin", bg);
          this.background = iui(bg).background();
        } //		this.modal.className = this.customClass + "-modal-background";


        this.classList.add(this.customClass + "-modal");
      }

      this.loading = document.createElement("div");
      this.loading.className = this.customClass + "-loading";
      if (this.loadingText) this.loading.innerHTML = this.loadingText;else {
        var lc = document.createElement("div");
        lc.className = this.customClass + "-loading-content";
        this.loading.appendChild(lc);
      }
      this.body.appendChild(this.loading);

      if (this.draggable) {
        this.addEventListener("mousedown", function (e) {
          self._startDragging(e);
        });
      } else {
        this.header.addEventListener('mousedown', function (e) {
          self._startDragging(e);
        });
      }

      document.addEventListener('mouseup', function () {
        self._stopDragging();

        self._stopExpanding();
      });
      document.addEventListener('mousemove', function (e) {
        if (self._dragging) self._drag(e);else if (self._expanding) self._expand(e);
      });
      this.addEventListener("mousedown", function (e) {
        if (self.style.cursor == "nwse-resize") self._startExpanding(e);
      });
      this.addEventListener("mousemove", function (e) {
        if (self._dragging) return;

        if (!self._expanding) {
          var x = (e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft)) - self.offsetLeft;
          var y = (e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)) - self.offsetTop;

          if (self.clientWidth - x < 5 && self.clientHeight - y < 5) {
            self.style.cursor = "nwse-resize";
          } else {
            self.style.cursor = "";
          }
        }
      });
    }
  }, {
    key: "_startDragging",
    value: function _startDragging(e) {
      this._dragging = true;
      this._dragX = (e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft)) - this.offsetLeft;
      this._dragY = (e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)) - this.offsetTop; //corssbrowser mouse pointer values

      document.onselectstart = function () {
        return false;
      };
    }
  }, {
    key: "_drag",
    value: function _drag(e) {
      var x = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
      var y = e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
      this.style.top = y - this._dragY + "px"; // (y - self.y) + "px";

      this.style.left = x - this._dragX + "px"; //(x - self.x) + "px";

      this._emit("move", {
        left: this.offsetLeft,
        top: this.offsetTop
      });
    }
  }, {
    key: "_stopDragging",
    value: function _stopDragging() {
      this._dragging = false;
    }
  }, {
    key: "_startExpanding",
    value: function _startExpanding(e) {
      document.onselectstart = function () {
        return false;
      };

      this._expanding = true;
      this._dragX = (e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft)) - this.offsetLeft;
      this._dragY = (e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)) - this.offsetTop;
      this._width = this.clientWidth;
      this._height = this.clientHeight;
    }
  }, {
    key: "_expand",
    value: function _expand(e) {
      var x = (e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft)) - this.offsetLeft;
      var y = (e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)) - this.offsetTop;
      this.resize(this._width + x - this._dragX, this._height + y - this._dragY);
    }
  }, {
    key: "_stopExpanding",
    value: function _stopExpanding() {
      this._expanding = false;
      this.style.cursor = "";
      this._width = this.clientWidth;
      this._height = this.clientHeight;

      document.onselectstart = function () {
        return true;
      };
    }
  }, {
    key: "setLoading",
    value: function setLoading(visible) {
      if (this.footer) for (var i = 0; i < this.footer.children.length; i++) {
        if (this.footer.children[i].nodeName == "BUTTON") this.footer.children[i].disabled = visible;
      }
      if (visible) this.loading.classList.add(this.customClass + "-loading-visible");else this.loading.classList.remove(this.customClass + "-loading-visible");
      return this;
    }
  }, {
    key: "center",
    value: function center() {
      this._updateSize();

      return this.move(window.pageXOffset + window.innerWidth / 2 - this.offsetWidth / 2, window.pageYOffset + window.innerHeight / 2 - this.offsetHeight / 2);
    }
  }, {
    key: "setVisible",
    value: function setVisible(visible) {
      if (visible == this.visible) return;
      this.visible = visible;

      if (visible) {
        this.classList.add(this.customClass + "-visible");

        if (this.background) {
          this.background.setVisible(true);
        } //else


        if (!this._shown) {
          this._updateSize();

          this._shown = true;
        }

        this.setFocus(true);

        this._updateSize();
      } else {
        this._updateSize();

        this.classList.remove(this.customClass + "-visible");
        this.classList.remove(this.customClass + "-active");
        if (this.background) this.background.setVisible(false); //this.modal.classList.remove(this.customClass + "-modal-background-visible");

        this.setFocus(false);

        var i = _IUI.IUI._nav_list.indexOf(this);

        if (i > -1) _IUI.IUI._nav_list.splice(i, 1);
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

      this._emit("visible", {
        visible: visible
      });

      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.setVisible(false);
      return this;
    }
  }, {
    key: "show",
    value: function show() {
      this.setVisible(true);
      return this;
    }
  }]);

  return IUIDialog;
}(_Window["default"]), _defineProperty(_class, "moduleName", "dialog"), _temp));

exports["default"] = _default;
document.addEventListener("keydown", function (e) {
  if (e.keyCode === 27) {
    // ESC
    var dialogs = _IUI.IUI.registry.filter(function (o) {
      return o instanceof IUIDialog;
    }).filter(function (x) {
      return x.focus;
    });

    for (var i = 0; i < dialogs.length; i++) {
      dialogs[i].hide();
    }
  }
}); //IUI.module("dialog", IUIDialog, function(el, modal, properties){ return new IUIDialog(el, modal, properties);});

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"./Window.js":35}],24:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(DropDown, _IUIElement);

  var _super = _createSuper(DropDown);

  function DropDown() {
    var _this;

    _classCallCheck(this, DropDown);

    _this = _super.call(this, {
      "direction": "down"
    });

    var self = _assertThisInitialized(_this);

    _this._register("visible");

    _this.visible = false; // this.classList.add(this.cssClass + "-" + this.direction);

    _this.menu = _this.getElementsByClassName(_this.cssClass + "-menu")[0]; //this.arrow = document.createElement("div");
    //this.arrow.className = this.customClass + "-arrow";
    //this.el.appendChild(this.arrow);

    if (_this.getAttribute("fixed")) {
      _this._fixed = true;
      document.body.appendChild(_this.menu);
    } //this.el.appendChild(this.menu);


    _this.addEventListener("click", function (e) {
      var t = e.target;

      do {
        if (t == self.menu) return;
      } while (t = t.parentElement);

      self.setVisible(!self.visible);
    });

    _IUI.IUI._menus.push(_assertThisInitialized(_this));
    /*
    document.body.addEventListener("click", function(e)
        {
            if (!self.visible)
                return;
    	
            var x = e.target;
            do {
                if (x == self.menu || x == self.el)
                    return;
            } while (x = x.parentNode)
        	
            if (e.target.id == "iui_app_background")
                return;
                  self.setVisible(false);
        });*/


    return _this;
  }

  _createClass(DropDown, [{
    key: "fixed",
    get: function get() {
      return this._fixed;
    },
    set: function set(value) {
      if (value) document.body.appendChild(this.menu);
      this._fixed = value;
    }
  }, {
    key: "hide",
    value: function hide() {
      return this.setVisible(false);
    }
  }, {
    key: "show",
    value: function show() {
      return this.setVisible(true);
    }
  }, {
    key: "getOffset",
    value: function getOffset() {
      var el = this;
      var _x = 0;
      var _y = 0;

      while (!isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }

      _x += window.pageXOffset;
      _y += window.pageYOffset;
      return {
        top: _y,
        left: _x,
        width: this.clientWidth,
        height: this.clientHeight
      };
    }
  }, {
    key: "data",
    set: function set(value) {
      // console.log("DD", value);
      _set(_getPrototypeOf(DropDown.prototype), "data", value, this, true); //        console.log("VV", this._uiBindings, this._dataBindings);

    }
  }, {
    key: "setVisible",
    value: function setVisible(visible) {
      this.visible = visible;

      if (!this.fixed) {
        if (visible) {
          this.menu.classList.add(this.cssClass + "-menu-visible");
          this.classList.add(this.cssClass + "-visible");
        } else {
          this.menu.classList.remove(this.cssClass + "-menu-visible");
          this.classList.remove(this.cssClass + "-visible");
        }
      } else {
        if (visible) {
          var rect = this.getBoundingClientRect();
          var menuWidth = this.menu.clientWidth;
          var menuHeight = this.menu.clientHeight;

          if (menuWidth > document.body.clientWidth) {
            menuWidth = document.body.clientWidth - 10;
            this.menu.style.width = menuWidth + "px";
          }

          var startX = rect.left + (rect.width / 2 - menuWidth / 2);

          if (this.direction == "up") {
            //					var menuTop = rect.top - this.arrow.clientHeight - this.menu.clientHeight;
            var menuTop = rect.top - this.menu.clientHeight;

            if (menuTop < 0) {
              menuTop = 5; //						this.menu.style.height = (rect.top  - this.arrow.clientHeight ) + "px";

              this.menu.style.height = rect.top + "px";
              this.menu.classList.add(this.cssClass + "-menu-oversized");
            } else this.menu.classList.remove(this.cssClass + "-menu-oversized"); //this.arrow.classList.remove(this.customClass + "-arrow-down");
            //this.arrow.classList.add(this.customClass + "-arrow-up");
            //this.arrow.style.top = ( rect.top - this.arrow.clientHeight ) + "px";


            this.menu.style.top = menuTop + "px";
          } else {
            //var menuTop = rect.top + rect.height + this.arrow.clientHeight;
            var menuTop = rect.top + rect.height; //this.arrow.classList.remove(this.customClass + "-arrow-up");
            //this.arrow.classList.add(this.customClass + "-arrow-down");
            //this.arrow.style.top = ( rect.top + rect.height ) + "px";

            this.menu.style.top = menuTop + "px";

            if (menuTop + menuHeight > document.body.clientHeight) {
              this.menu.style.height = document.body.clientHeight - menuTop + "px";
              this.menu.classList.add(this.cssClass + "-menu-oversized");
            } else {
              this.menu.classList.remove(this.cssClass + "-menu-oversized");
            }
          }

          if (startX < 0) startX = 5;else if (startX + menuWidth > document.body.clientWidth) startX = document.body.clientWidth - menuWidth - 5; //this.arrow.style.left = (rect.left + (rect.width/2 - this.arrow.clientWidth/2)) + "px";

          this.menu.style.left = startX + "px"; //this.arrow.classList.add(this.customClass + "-arrow-visible");

          this.menu.classList.add(this.cssClass + "-menu-visible");
          this.classList.add(this.cssClass + "-visible");
        } else {
          //this.arrow.classList.remove(this.customClass + "-arrow-visible");
          this.menu.classList.remove(this.cssClass + "-menu-visible");
          this.classList.remove(this.cssClass + "-visible");
        }
      }

      this._emit("visible", {
        visible: visible
      });

      return this;
    }
  }]);

  return DropDown;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],25:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Grid, _IUIElement);

  var _super = _createSuper(Grid);

  function Grid() {
    var _this;

    _classCallCheck(this, Grid);

    _this = _super.call(this, {
      index: "iid",
      layout: {
        content: {
          field: "name",
          formatter: null
        },
        title: {
          field: "content",
          formatter: null
        },
        footer: {
          field: "footer",
          formatter: null
        }
      }
    });

    _this._register("add");

    _this._register("layout");

    _this._register("contextmenu");

    _this.windows = [];
    return _this;
  }

  _createClass(Grid, [{
    key: "create",
    value: function create() {
      for (var i = 0; i < this.children.length; i++) {
        this.add(this.children[i]);
      }
    }
  }, {
    key: "setGridLayout",
    value: function setGridLayout(style) {
      this.style.grid = style;

      this._emit("layout", style, this);

      return this;
    }
  }, {
    key: "add",
    value: function add(win) {
      var self = this;
      win.setAttribute("draggable", true);
      win.addEventListener("dragstart", function (e) {
        e.dataTransfer.effectAllowed = 'move';
        self._dragItem = this;
        this.classList.add(self.cssClass + '-window-drag');
      });
      win.addEventListener("dragover", function (e) {
        if (self._dragItem) {
          e.preventDefault();
          this.classList.add(self.cssClass + '-window-over');
          e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
        }
      });
      win.addEventListener("dragleave", function (e) {
        if (e.preventDefault) e.preventDefault();
        this.classList.remove(self.cssClass + "-window-over");
      });
      win.addEventListener("dragend", function (e) {
        this.classList.remove(self.cssClass + '-window-drag');
        self._dragItem = null;
      });
      win.addEventListener("drop", function (e) {
        self._dragItem.classList.remove(self.cssClass + "-window-drag");

        e.currentTarget.classList.remove(self.cssClass + "-window-over");

        for (var i = 0; i < self.children.length; i++) {
          if (self.children[i] == self._dragItem) {
            self.insertBefore(self._dragItem, e.currentTarget.nextSibling);
            break;
          } else if (self.children[i] == e.currentTarget) {
            self.insertBefore(self._dragItem, e.currentTarget);
            break;
          }
        }

        self._dragItem = null;
      });
      win.addEventListener("contextmenu", function (e) {
        self.selected = win;

        self._emit("contextmenu", {
          win: win
        });
      });
      win.on("close", function () {
        self.remove(win);
      });
    }
  }, {
    key: "addOld",
    value: function addOld(item) {
      var self = this;
      var li = item; //document.createElement("li");
      //li.setAttribute("data-id", item[this.index]);

      li.setAttribute("draggable", true);
      li.addEventListener("dragstart", function (e) {
        e.dataTransfer.effectAllowed = 'move';
        self._dragItem = this;
        this.classList.add(self.cssClass + '-window-drag');
      });
      li.addEventListener("dragover", function (e) {
        if (self._dragItem) {
          e.preventDefault();
          this.classList.add(self.cssClass + '-window-over');
          e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
        }
      });
      li.addEventListener("dragleave", function (e) {
        if (e.preventDefault) e.preventDefault();
        this.classList.remove(self.cssClass + "-window-over");
      });
      li.addEventListener("dragend", function (e) {
        this.classList.remove(self.cssClass + '-window-drag');
        self._dragItem = null;
      });
      li.addEventListener("drop", function (e) {
        self._dragItem.classList.remove(self.cssClass + "-window-drag");

        e.currentTarget.classList.remove(self.cssClass + "-window-over");

        for (var i = 0; i < self.children.length; i++) {
          if (self.children[i] == self._dragItem) {
            self.insertBefore(self._dragItem, e.currentTarget.nextSibling);
            break;
          } else if (self.children[i] == e.currentTarget) {
            self.insertBefore(self._dragItem, e.currentTarget);
            break;
          }
        }

        self._dragItem = null;
      });
      li.addEventListener("contextmenu", function (e) {
        self.selected = win;

        self._emit("contextmenu", item, win, this, e);
      });
      var win = iui(li).window({
        draggable: false,
        title: this.layout.title.formatter ? this.layout.title.formatter(item[this.layout.title.field], item) : item[this.layout.title.field]
      });
      var body = this.layout.content.formatter ? this.layout.content.formatter(item[this.layout.content.field], item, win, this) : item[this.layout.content.field];
      if (body instanceof HTMLElement) win.body.appendChild(body);else win.body.innerHTML = body;
      var footer = this.layout.footer.formatter ? this.layout.footer.formatter(item[this.layout.footer.field], item, win, this) : item[this.layout.footer.field];

      if (footer != null) {
        var fe = document.createElement("div");
        fe.className = "window-footer";
        if (footer instanceof HTMLElement) fe.appendChild(footer);else fe.innerHTML = footer;
        win.appendChild(fe);
      }

      win.on("close", function () {
        self.remove(win);
      });
      this.appendChild(li);
      win.control = item;
      this.windows.push(win);

      this._emit("add", item, win, this);

      return this; //win._updateSize();
    }
  }, {
    key: "remove",
    value: function remove(win) {
      win.destroy();
      this.removeChild(win);
    }
  }, {
    key: "clear",
    value: function clear() {
      while (this.children.length > 0) {
        this.removeChild(this.children[0]);
      }
    }
  }]);

  return Grid;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],26:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Input, _IUIElement);

  var _super = _createSuper(Input);

  function Input() {
    var _this;

    _classCallCheck(this, Input);

    _this = _super.call(this, {
      formatter: function formatter(x) {
        return x;
      }
    });

    _this._register("input");

    _this._register("change");

    return _this;
  }

  _createClass(Input, [{
    key: "_checkValidity",
    value: function _checkValidity() {
      if (this.validate != null) {
        try {
          var valid = this.validate.apply(this);

          if (!valid) {
            this.setAttribute("invalid", "");
            this.classList.add(this.cssClass + "-invalid");
            return false;
          } else {
            this.removeAttribute("invalid");
            this.classList.remove(this.cssClass + "-invalid");
            return true;
          }
        } catch (e) {
          console.log("Validation Error", e);
          return false;
        }
      }

      return true;
    }
  }, {
    key: "caption",
    get: function get() {
      return this.getAttribute("caption"); // this._span.innerHTML;
    },
    set: function set(value) {
      this.setAttribute("caption", value);
      this._span.innerHTML = value;
    }
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      this.isAuto = this.hasAttribute("auto");
      this.field = this.getAttribute("field");

      if (this.field != null) {
        this.setAttribute(":data", "d['".concat(this.field, "']"));
        this.setAttribute("async:revert", "d['".concat(this.field, "'] = await this.getData()"));
      }

      this._span = document.createElement("span");
      this._span.innerHTML = this.getAttribute("caption");
      this._input = document.createElement("input");
      this._input.placeholder = " ";
      var self = this;

      this._input.addEventListener("input", function () {
        if (self._checkValidity() && self.isAuto) _this2.revert(); //self.data[self.field] = self.value;
      });

      this._input.addEventListener("change", function () {
        self._emit("change", {
          value: self.value
        });
      });

      this.type = this.hasAttribute("type") ? this.getAttribute("type").toLowerCase() : "text";
      this.accept = this.getAttribute("accept");
      this.appendChild(this._input);
      this.appendChild(this._span);

      if (this.type == "password") {
        this._eye = document.createElement("div");
        this._eye.className = this.cssClass + "-eye";

        this._eye.addEventListener("mousedown", function () {
          self._input.type = "text";

          self._eye.classList.add(self.cssClass + "-eye-active");
        });

        this._eye.addEventListener("mouseup", function () {
          self._input.type = "password";

          self._eye.classList.remove(self.cssClass + "-eye-active");
        });

        this.appendChild(this._eye);
      }
    }
  }, {
    key: "updateAttributes",
    value: function () {
      var _updateAttributes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(deep, parentData) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(_getPrototypeOf(Input.prototype), "updateAttributes", this).call(this, deep, parentData);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateAttributes(_x, _x2) {
        return _updateAttributes.apply(this, arguments);
      }

      return updateAttributes;
    }()
  }, {
    key: "type",
    get: function get() {
      return this._input.type;
    },
    set: function set(value) {
      this._input.type = value;
    }
  }, {
    key: "accept",
    get: function get() {
      return this._input.accept;
    },
    set: function set(value) {
      this._input.accept = value;
    }
  }, {
    key: "disabled",
    get: function get() {
      return this._input.disabled;
    },
    set: function set(value) {
      if (value) this.setAttribute("disabled", "disabled");else this.removeAttribute("disabled");
      this._input.disabled = value;
    }
  }, {
    key: "enabled",
    get: function get() {
      return !this._input.disabled;
    },
    set: function set(value) {
      this.disabled = !value;
    }
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _get(_getPrototypeOf(Input.prototype), "setData", this).call(this, value);

              case 2:
                if (this.type == "checkbox") this._input.checked = value;else if (this.type == "date") this._input.value = value != null ? value.toISOString().slice(0, 10) : value;else if (this.type == null || this.type == "text" || this.type == "search" || this.type == "password") this._input.value = value == null ? '' : value;else this._input.value = value;
                if (this._checkValidity() && this.isAuto) this.revert();
                /*
                await super.setData(value);
                if (value != null && this.field != null)
                    this.value = value[this.field];
                else if (this.field != null)
                    this.value = null;
                    */

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setData(_x3) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }() // modified(name, value) {
    //     if (name == this.field) {
    //         this.value = value;
    //     }
    // }

  }, {
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.type == "checkbox")) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", this._input.checked);

              case 4:
                if (!(this.type == "date")) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", new Date(this._input.value));

              case 8:
                if (!(this.type == "file")) {
                  _context3.next = 16;
                  break;
                }

                _context3.t0 = Uint8Array;
                _context3.next = 12;
                return this._input.files[0].arrayBuffer();

              case 12:
                _context3.t1 = _context3.sent;
                return _context3.abrupt("return", new _context3.t0(_context3.t1));

              case 16:
                return _context3.abrupt("return", this._input.value);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getData() {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }, {
    key: "data",
    get: function get() {
      var _this3 = this;

      if (this.type == "checkbox") return this._input.checked;else if (this.type == "date") return new Date(this._input.value);else if (this.type == "file") {
        return new Promise(function (resolve) {
          _this3._input.files[0].arrayBuffer().then(function (x) {
            resolve(new Uint8Array(x));
          });
        });
      } else return this._input.value;
    }
    /*
    get data() {
        if (this.type == "checkbox")
            return this._input.checked;
        else if (this.type == "date")
            return new Date(this._input.value);
        else if (this.type == "file")
        {
          }
        else
            return this._input.value;
    }
    */
    // set value(value) {
    //     if (this.type == "checkbox")
    //         this._input.checked = value;
    //     else if (this.type == "date") 
    //         this._input.value = value != null ? value.toISOString().slice(0, 10) : value;
    //     else if (this.type == null || this.type == "text")
    //         this._input.value = value == null ? '' : value;
    //     else
    //         this._input.value = value;
    //     this._checkValidity();
    // }

  }]);

  return Input;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],27:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

var _Link = _interopRequireDefault(require("../Router/Link.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Location, _IUIElement);

  var _super = _createSuper(Location);

  function Location() {
    _classCallCheck(this, Location);

    return _super.call(this);
  }

  _createClass(Location, [{
    key: "create",
    value: function create() {
      var self = this;
      window.router.on("route", function (e) {
        self.textContent = ''; // clear everything

        var html = "";
        var route = e.route;
        var current = document.createElement("div");
        current.innerHTML = route.caption;
        self.append(current);

        while (route = route.parent) {
          var sep = document.createElement("span");
          self.prepend(sep);
          var link = new _Link["default"]();
          link.link = route.link;
          link.innerHTML = route.caption;
          self.prepend(link);
        }
      });
    }
  }]);

  return Location;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"../Router/Link.js":14}],28:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Login, _IUIElement);

  var _super = _createSuper(Login);

  function Login() {
    var _this;

    _classCallCheck(this, Login);

    _this = _super.call(this);
    var template = "<div class='body' style='box-shadow: 0 2px 2px rgba(0, 0, 0, .3);\n              background: white;\n              border-radius: 3px;\n              display: flex;\n              flex-direction: column;\n              user-select: none;\n              border: 1px solid #b4b4b4;'>\n\n            <div name=\"message\"></div>\n            <div style='display: flex; flex-direction: column;padding: 20px;'>\n\n                <label class=\"textbox-with-label\">\n                    <input name=\"txtUsername\" placeholder=\" \" autocomplete=\"no\" style=\"width: calc(100% - 10px);\">\n                        <span name=\"spnUsername\">Username</span>\n            </label>\n\n\n                    <label class=\"textbox-with-label\" >\n                        <input name=\"txtPassword\" style=\"width: calc(100% - 10px);\" type=\"password\" placeholder=\" \" \">\n                            <span name=\"spnPassword\">Password</span>\n            </label>\n\n                        <div style=\"display: flex\">\n                            \n                            <input type=\"checkbox\" name=\"remember\" >\n                            <label for=\"remember\" name=\"labelRemember\">Remember</label>\n            </div>\n\n                        </div>\n                        <div class='actions'>\n                            <button class='button' name=\"login\">Login</button>\n                        </div>\n          </div>";
    _this.innerHTML = template;
    _this._message = _this.querySelector("div[name='message']");
    _this._usernameText = _this.querySelector("span[name='spnUsername']");
    _this._passwordText = _this.querySelector("span[name='spnPassword']");
    _this._rememberText = _this.querySelector("label[name='labelRemember']");
    _this._username = _this.querySelector("input[name='txtUsername']");
    _this._password = _this.querySelector("input[name='txtPassword']");
    _this._remember = _this.querySelector("input[name='remember']");
    _this._login = _this.querySelector("button[name='login']");

    var self = _assertThisInitialized(_this);

    _this._password.addEventListener("keydown", function (e) {
      if (e.keyCode == 13) self.login();
    });

    if (_this.hasAttribute("message")) {
      _this._message.innerHTML = _this.getAttribute("message");
    }

    if (_this.hasAttribute("username")) {
      _this._usernameText.innerHTML = _this.getAttribute("username");
    }

    if (_this.hasAttribute("password")) {
      _this._passwordText.innerHTML = _this.getAttribute("password");
    }

    if (_this.hasAttribute("remember")) {
      _this._rememberText.innerHTML = _this.getAttribute("remember");
    }

    if (_this.hasAttribute("login")) {
      _this._login.innerHTML = _this.getAttribute("login");
    }

    var username = _this.username; // window.localStorage.getItem("iui.login.username");

    var password = _this.password; // window.localStorage.getItem("iui.login.password");

    if (username != "") {
      _this._username.value = username;
      _this._password.value = password;
      _this._remember.checked = true;
    }

    _this._login.addEventListener("click", function () {
      return _this.login();
    });

    _this._register("login");

    _this._register("logout");

    return _this;
  }

  _createClass(Login, [{
    key: "login",
    value: function login() {
      var username = this._username.value;
      var password = this._password.value;
      if (username == "" || password == "") return;

      if (this._remember.checked) {
        this.username = username;
        this.password = password; //window.localStorage.setItem("iui.login.username", username);
        //window.localStorage.setItem("iui.login.password", password);
      } else {
        window.localStorage.removeItem("iui.login.username");
        window.localStorage.removeItem("iui.login.password");
      }

      this._emit("login", {
        username: username,
        password: password
      });
    }
  }, {
    key: "username",
    get: function get() {
      return window.localStorage.getItem("iui.login.username");
    },
    set: function set(value) {
      return window.localStorage.setItem("iui.login.username", value);
    }
  }, {
    key: "password",
    get: function get() {
      return window.localStorage.getItem("iui.login.password");
    },
    set: function set(value) {
      return window.localStorage.setItem("iui.login.password", value);
    }
  }, {
    key: "token",
    get: function get() {
      return window.localStorage.getItem("iui.login.token");
    },
    set: function set(value) {
      return window.localStorage.setItem("iui.login.token", value);
    }
  }, {
    key: "message",
    get: function get() {
      return this._message.innerHTML;
    },
    set: function set(value) {
      this._message.innerHTML = value;
    }
  }, {
    key: "logout",
    value: function logout() {
      window.localStorage.removeItem("iui.login.username");
      window.localStorage.removeItem("iui.login.password");
      window.localStorage.removeItem("iui.login.token");
      this._username.value = "";
      this._password.value = "";
      this._remember.checked = false;

      this._emit("logout");
    }
  }, {
    key: "created",
    value: function created() {//if (this.hasAttribute("auto")) {
      //    let username = this.username;// window.localStorage.getItem("iui.login.username");
      //    let password = this.password;// window.localStorage.getItem("iui.login.password");
      //    if (this.username != "") {
      //        this._emit("login", { username, password });
      //    }
      //}
    }
  }]);

  return Login;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],29:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUI = require("../Core/IUI.js");

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _Background = _interopRequireDefault(require("./Background.js"));

var _DropDown = _interopRequireDefault(require("./DropDown.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Menu = /*#__PURE__*/function (_IUIElement) {
  _inherits(Menu, _IUIElement);

  var _super = _createSuper(Menu);

  function Menu(props) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this, _IUI.IUI.extend(props, {
      index: "iid",
      layout: {
        field: "name",
        formatter: null
      },
      visible: false,
      "static": false,
      "target-class": "selected"
    }));

    _this._register("visible");

    _this._register("select");

    _IUI.IUI._menus.push(_assertThisInitialized(_this));

    return _this;
  } // clear() {
  //     this.innerHTML = "";
  //     this._uiBindings = null;
  // }


  _createClass(Menu, [{
    key: "hide",
    value: function hide() {
      return this.setVisible(false);
    } //show(x, y, element) {
    //   return this.setVisible(true, x, y, element);
    //}

  }, {
    key: "show",
    value: function show(event) {
      event.preventDefault();
      var el = event.currentTarget;
      var x = event.pageX;
      var y = event.pageY;
      this.setVisible(true, x, y, el);
    }
  }, {
    key: "showModal",
    value: function () {
      var _showModal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(element) {
        var width;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(_getPrototypeOf(Menu.prototype), "setData", this).call(this, element.data);

              case 2:
                if (!this.background) {
                  this.background = document.getElementById("iui_app_background");

                  if (!this.background) {
                    this.background = new _Background["default"](); // document.createElement("div");

                    this.background.id = "iui_app_background";
                    document.body.insertAdjacentElement("afterBegin", this.background);
                  }
                }

                this.background.show();
                this.classList.add(this.cssClass + "-modal");
                this.classList.add(this.cssClass + "-visible");
                width = window.innerWidth * 0.8;
                this.style.width = width + "px";
                this.style.top = window.pageYOffset + window.innerHeight / 2 - this.offsetHeight / 2 + "px"; // (document.body.clientHeight / 2 - this.clientHeight / 2) + "px";

                this.style.left = window.pageXOffset + window.innerWidth / 2 - this.offsetWidth / 2 + "px"; //(document.body.clientWidth / 2 - width / 2) + "px";

                this.visible = true;

                this._emit("visible", {
                  visible: true
                });

                return _context.abrupt("return", this);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function showModal(_x) {
        return _showModal.apply(this, arguments);
      }

      return showModal;
    }()
  }, {
    key: "setVisible",
    value: function () {
      var _setVisible = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(visible, x, y, element) {
        var rect;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.visible = visible;

                if (this.target) {
                  if (this["target-class"] != null && this["target-class"] != "") this.target.classList.remove(this["target-class"]);
                  this.target = null;
                }

                if (!visible) {
                  _context2.next = 18;
                  break;
                }

                if (!element) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 6;
                return this.setData(element.data);

              case 6:
                this.target = element;
                if (this["target-class"] != null && this["target-class"] != "") this.target.classList.add(this["target-class"]);

              case 8:
                this._pass = true;

                if (!(_IUI.IUI.responsive && !this["static"])) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", this.showModal());

              case 11:
                this.classList.remove(this.cssClass + "-modal");
                rect = this.getBoundingClientRect();

                if (y != null) {
                  if (y + rect.height > document.documentElement.clientHeight) this.style.top = document.documentElement.clientHeight - rect.height + "px";else this.style.top = y + "px";
                }

                this.classList.add(this.cssClass + "-visible");

                if (x != null) {
                  if (x + rect.width > document.body.scrollWidth) this.style.left = document.body.scrollWidth - rect.width + "px"; //else if (x < 0)
                  //	this.style.left = "0px";
                  else this.style.left = x + "px";
                }

                _context2.next = 20;
                break;

              case 18:
                this.classList.remove(this.cssClass + "-visible");
                if (this.background) this.background.hide(); //await super.setData({});// = {};

              case 20:
                this._emit("visible", {
                  visible: visible
                });

                return _context2.abrupt("return", this);

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setVisible(_x2, _x3, _x4, _x5) {
        return _setVisible.apply(this, arguments);
      }

      return setVisible;
    }()
  }]);

  return Menu;
}(_IUIElement2["default"]);

exports["default"] = Menu;
;

_IUI.IUI.module(Menu);

_IUI.IUI.responsive = false;
window.addEventListener("load", function () {
  var handler = function handler(e) {
    if (e.target.id == "iui_app_background" && _IUI.IUI.responsive) {
      for (var i = 0; i < _IUI.IUI._menus.length; i++) {
        if (_IUI.IUI._menus[i] instanceof Menu) _IUI.IUI._menus[i].setVisible(false);
      }

      e.preventDefault();
      return;
    }

    for (var i = 0; i < _IUI.IUI._menus.length; i++) {
      if (_IUI.IUI._menus[i].visible) {
        var x = e.target;
        var m = _IUI.IUI._menus[i];

        if (m instanceof Menu) {
          if (m._pass) {
            m._pass = false;
            continue;
          } else if (m.visible) if (!m.contains(e.target)) m.setVisible(false);
        } else if (m instanceof _DropDown["default"]) {
          if (!(m.contains(e.target) || m.menu.contains(e.target))) m.setVisible(false);
        }
      }
    }
  };

  document.body.addEventListener("click", handler);
  document.body.addEventListener("touchstart", handler);
});

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"./Background.js":18,"./DropDown.js":24}],30:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

var _Link = _interopRequireDefault(require("../Router/Link.js"));

var _Check = _interopRequireDefault(require("./Check.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Navbar, _IUIElement);

  var _super = _createSuper(Navbar);

  function Navbar() {
    var _this;

    _classCallCheck(this, Navbar);

    _this = _super.call(this);
    _this._list = [];
    return _this;
  }

  _createClass(Navbar, [{
    key: "search_old",
    value: function search_old(text) {
      for (var i = 0; i < this._container.children.length; i++) {
        var el = this._container.children[i];

        if (el.title.toLowerCase().includes(text)) {
          el.text.innerHTML = el.title.replace(new RegExp(text, 'gi'), function (str) {
            return "<span>".concat(str, "</span>");
          });
          el.style.display = "";
          el.removeAttribute("hidden"); // make parents visible

          var level = parseInt(el.getAttribute("data-level"));

          for (var j = i - 1; j >= 0; j--) {
            var previous = this._container.children[j];
            var pLevel = parseInt(previous.getAttribute("data-level"));

            if (pLevel < level) {
              previous.removeAttribute("hidden");
              previous.style.display = "";
              if (previous.expand) previous.expand.checked = true;
              level = pLevel;
            }
          }
        } else {
          el.style.display = "none";
        }
      }
    }
  }, {
    key: "search",
    value: function search(text, within) {
      var menu = within == null ? this._container : within.menu;

      for (var i = 0; i < menu.children.length; i++) {
        var item = menu.children[i];
        var link = item.link;

        if (link.title.toLowerCase().includes(text)) {
          link.text.innerHTML = link.title.replace(new RegExp(text, 'gi'), function (str) {
            return "<span>".concat(str, "</span>");
          });
          item.style.display = ""; //if (within != null)
          //  within.removeAttribute("collapsed");
          // make parents visible

          var parent = within;

          while (parent != null && parent != this) {
            parent.expand.checked = true;
            parent.removeAttribute("collapsed");
            parent.style.display = "";
            parent = parent.parentElement.parentElement;
          }
        } else {
          item.style.display = "none";
        }

        if (item.menu != null) this.search(text, item);
      }
    }
  }, {
    key: "expand_old",
    value: function expand_old(link, value) {
      var next = link; // = link.nextElementSibling;

      var level = parseInt(link.getAttribute("data-level")); // save 
      //window.localStorage.setItem("iui.navbar/" + link.link, value);

      if (link.expand && link.expand.checked != value) link.expand.checked = value;

      while (next = next.nextElementSibling) {
        if (parseInt(next.getAttribute("data-level")) > level) {
          if (value) next.removeAttribute("hidden");else next.setAttribute("hidden", "");
          if (next.expand) next.expand.checked = value;
        } else break;
      }
    }
  }, {
    key: "expand",
    value: function expand(item, value) {
      if (value) item.removeAttribute("collapsed");else item.setAttribute("collapsed", "");
      item.expand.checked = value;
    }
  }, {
    key: "collapsed",
    get: function get() {
      return this.hasAttribute("collapsed");
    }
  }, {
    key: "auto",
    get: function get() {
      return this.hasAttribute("auto");
    }
  }, {
    key: "build",
    value: function build() {
      var _this2 = this;

      this.innerHTML = "";
      var roots = router.routes.filter(function (x) {
        return x.parent == null;
      });
      var self = this;
      this._search = document.createElement("input");
      this._search.type = "search";
      this._search.className = this.cssClass + "-search textbox";

      this._search.addEventListener("input", function (x) {
        self.search(_this2._search.value);
      });

      this.appendChild(this._search);
      this._container = document.createElement("div");
      this._container.className = this.cssClass + "-container";
      this.appendChild(this._container);
      var collapsed = this.collapsed;
      var auto = this.auto;

      var filterRoutes = function filterRoutes(routes) {
        return routes.filter(function (r) {
          if (r.hasAttribute("private")) return false;

          if (_this2["private"] instanceof Function) {
            try {
              if (_this2["private"](r)) {
                return false;
              }
            } catch (ex) {
              console.log(ex);
              debugger;
            }

            return true;
          }

          return true;
        });
      };

      var appendRoutes = function appendRoutes(routes, level, container) {
        var _loop = function _loop() {
          var item = document.createElement("div");
          item.className = _this2.cssClass + "-item";
          var link = new _Link["default"](); // document.createElement("i-link");

          item.setAttribute("level", level);
          link.link = routes[i].link;
          link.title = routes[i].caption;
          if (routes[i].icon != null) link.innerHTML = "<img src='" + routes[i].icon + "'>";
          link.text = document.createElement("span");
          link.text.innerHTML = link.title;
          link.appendChild(link.text);
          item.link = link;
          item.appendChild(link);
          container.appendChild(item);

          self._list.push(item);

          var subRoutes = filterRoutes(routes[i].routes);

          if (subRoutes.length > 0) {
            // append plus
            item.expand = new _Check["default"]({
              cssClass: _this2.cssClass + "-check"
            }); // document.createElement("i-check");

            item.expand.checked = _this2.collapsed ? false : true;
            item.expand.checked = !collapsed;
            if (collapsed) item.setAttribute("collapsed", "");
            link.appendChild(item.expand);
            item.menu = document.createElement("div");
            item.menu.className = _this2.cssClass + "-menu";
            item.appendChild(item.menu);
            item.expand.on("click", function (e) {
              self.expand(item, item.expand.checked);
              e.stopPropagation();
            });

            if (auto) {
              item.addEventListener("mouseenter", function () {
                return self.expand(item, true);
              });
              item.addEventListener("mouseleave", function () {
                return self.expand(item, false);
              });
            }

            appendRoutes(subRoutes, level + 1, item.menu);
          }
        };

        for (var i = 0; i < routes.length; i++) {
          _loop();
        }
      };

      appendRoutes(filterRoutes(roots), 0, this._container);
    }
  }, {
    key: "created",
    value: function created() {
      var _this3 = this;

      if (!this.hasAttribute("manual")) window.router.on("created", function () {
        return _this3.build();
      });
      window.router.on("navigate", function (e) {
        for (var i = 0; i < _this3._list.length; i++) {
          var el = _this3._list[i];
          if (el.link.link == e.base) el.setAttribute("selected", "");else el.removeAttribute("selected");
        }
      });
    }
  }]);

  return Navbar;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"../Router/Link.js":14,"./Check.js":20}],31:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUI = require("../Core/IUI.js");

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _Menu = _interopRequireDefault(require("../UI/Menu.js"));

var _Layout = _interopRequireDefault(require("../Data/Layout.js"));

var _Repeat = _interopRequireDefault(require("../Data/Repeat.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Select, _IUIElement);

  var _super = _createSuper(Select);

  function Select() {
    var _this;

    _classCallCheck(this, Select);

    _this = _super.call(this, {
      visible: false,
      searchlist: false,
      hasArrow: true,
      //hasAdd: false,
      updateTextBox: true,
      query: function query(x) {
        return null;
      },
      //_formatter: (x) => x,
      _autocomplete: false,
      cssClass: 'select'
    });

    _this._register("select");

    _this._register("input");

    _this._register("add");

    return _this;
  }

  _createClass(Select, [{
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      //console.log("Select removed", this);
      if (!this.searchlist && this.menu) app.removeChild(this.menu);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      _get(_getPrototypeOf(Select.prototype), "connectedCallback", this).call(this);

      if (!this.searchlist && this.menu) app.appendChild(this.menu);
    }
  }, {
    key: "autocomplete",
    get: function get() {
      return this._autocomplete;
    } // get formatter() {
    //     return this._formatter;
    // }
    // set formatter(value) {
    //     this._formatter = value;
    // }

  }, {
    key: "_checkValidity",
    value: function _checkValidity() {
      if (this.validate != null) {
        try {
          var valid = this.validate.apply(this);

          if (!valid) {
            this.setAttribute("invalid", "");
            this.classList.add(this.cssClass + "-invalid");
            return false;
          } else {
            this.removeAttribute("invalid");
            this.classList.remove(this.cssClass + "-invalid");
            return true;
          }
        } catch (ex) {
          console.log("Validation Error", ex);
          return false;
        }
      }

      return true;
    }
  }, {
    key: "hasAdd",
    get: function get() {
      return this.hasAttribute("add");
    },
    set: function set(value) {
      if (value) this.setAttribute("add", "add");else this.removeAttribute("add");
    }
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var self, layout;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.isAuto = this.hasAttribute("auto");
                this.field = this.getAttribute("field");

                if (this.field != null) {
                  this.setAttribute(":data", "d['".concat(this.field, "']"));
                  this.setAttribute(":revert", "d['".concat(this.field, "'] = this.data"));
                }

                this._autocomplete = this.hasAttribute("autocomplete"); //this.hasAdd = this.hasAttribute("add") || this.hasAdd;

                self = this; //if (this._autocomplete)
                //  this.cssClass += "-autocomplete";

                this.repeat = new _Repeat["default"]();
                this.repeat.cssClass = "select-menu-repeat"; //this.repeat.innerHTML = this.innerHTML;

                this.repeat.setAttribute(":data", "d[1]");
                this.counter = document.createElement("div");
                this.counter.className = this.cssClass + "-counter";
                this.counter.innerHTML = "${d[0]}";
                this.menu = new _Menu["default"]({
                  cssClass: this.cssClass + "-menu",
                  "target-class": ""
                });
                this.menu.on("click", /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!(e.target != self.textbox && e.target != self.counter && e.target !== self.menu)) {
                              _context.next = 5;
                              break;
                            }

                            _context.next = 3;
                            return self.setData(e.target.data);

                          case 3:
                            self._emit("input", {
                              value: e.target.data
                            });

                            self.hide();

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()).on("visible", function (x) {
                  if (!x.visible) self.hide();
                });

                if (this._autocomplete) {
                  this.textbox = document.createElement("input");
                  this.textbox.type = "search";
                  this.textbox.className = this.cssClass + "-textbox";
                  if (this.placeholder) this.textbox.placeholder = this.placeholder;
                  this.textbox.addEventListener("keyup", function (e) {
                    if (e.keyCode != 13) {
                      self._query(0, self.textbox.value);
                    }
                  });
                  this.textbox.addEventListener("search", function (e) {// console.log(e);
                  });
                  this.menu.appendChild(this.textbox);
                } // get collection


                layout = _Layout["default"].get(this, "div", true, true); //debugger;

                if (layout != null && layout.label != undefined && layout.menu != undefined) {
                  this.label = layout.label.node;
                  this.repeat.appendChild(layout.menu.node);
                } else if (layout != null && layout["null"] != null) {
                  this.label = layout["null"].node;
                  this.repeat.appendChild(layout["null"].node.cloneNode(true));
                } else {
                  this.label = document.createElement("div");
                  this.repeat.innerHTML = this.innerHTML;
                } // clear everything else
                //this.innerHTML = "";


                this.label.className = this.cssClass + "-label";
                this.appendChild(this.label);
                this.label.addEventListener("click", function (e) {
                  self.show();
                });
                this.menu.appendChild(this.repeat);
                this.menu.appendChild(this.counter);

                if (this.hasArrow) {
                  this.arrow = document.createElement("div");
                  this.arrow.className = this.cssClass + "-arrow";
                  this.appendChild(this.arrow);
                  this.arrow.addEventListener("click", function (e) {
                    if (self.visible) self.hide();else self.show();
                  });
                }

                if (this.hasAdd) {
                  this._add_button = document.createElement("div");
                  this._add_button.className = this.cssClass + "-add";
                  this.appendChild(this._add_button);

                  this._add_button.addEventListener("click", function (e) {
                    self._emit("add", {
                      value: self.data
                    });
                  });
                }

                if (!this.searchlist) {
                  _context2.next = 27;
                  break;
                }

                this.appendChild(this.menu);
                _context2.next = 34;
                break;

              case 27:
                app.appendChild(this.menu);

                if (!app.loaded) {
                  _context2.next = 34;
                  break;
                }

                _context2.next = 31;
                return this.menu.create();

              case 31:
                _IUI.IUI.bind(this.menu, false, "menu");

                _context2.next = 34;
                return _IUI.IUI.create(this.menu);

              case 34:
                this.addEventListener("click", function (e) {
                  if (e.target == self.textbox) self.show();
                });

              case 35:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "disabled",
    get: function get() {
      return this.hasAttribute("disabled");
    },
    set: function set(value) {
      if (this._autocomplete) {
        this.textbox.disabled = value;
      }

      if (value) {
        this.setAttribute("disabled", value);
      } else {
        this.removeAttribute("disabled");
      }
    }
    /*
    set(item) {
          if (this.autocomplete != undefined) {
            if (item != null)
                this.textbox.value = this.layout.text.formatter ? this.layout.text.formatter(item[this.layout.text.field], item) : item[this.layout.text.field];
            else
                this.textbox.value = "";
        } else {
            if (item != null)
                this.label.innerHTML = this.layout.text.formatter ? this.layout.text.formatter(item[this.layout.text.field], item) : item[this.layout.text.field];
            else
                this.label.innerHTML = "";
        }
          this.selected = item;
        this._emit("select", item);
    }
    */

  }, {
    key: "show",
    value: function show() {
      this.setVisible(true); //this.textbox.focus();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.setVisible(false); //this.textbox.focus();
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.autocomplete !== undefined) this.textbox.value = ""; //else
      //  this.label.innerHTML = "";
      //this.menu.clear();

      this.response.start = 0;
      this.selected = null;
    }
  }, {
    key: "_query",
    value: function () {
      var _query2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var self, text, res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._autocomplete) {
                  _context3.next = 3;
                  break;
                }

                if (!this.disabled) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return");

              case 3:
                self = this;
                text = this._autocomplete ? this.textbox.value : null;
                res = this.query(0, text);

                if (!(res instanceof Promise)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 9;
                return res;

              case 9:
                res = _context3.sent;

              case 10:
                if (!(res[1].length == 0)) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 13;
                return self.setData(null);

              case 13:
                _context3.next = 15;
                return this.menu.setData(res);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _query() {
        return _query2.apply(this, arguments);
      }

      return _query;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(value) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _get(_getPrototypeOf(Select.prototype), "setData", this).call(this, value);

              case 2:
                try {
                  //let text = this.formatter(value);
                  // this.label.innerHTML = text == null ? "" : text;
                  this._emit("select", {
                    value: value
                  });
                } catch (ex) {
                  //console.log(ex);
                  this._emit("select", {
                    value: value
                  });
                } //this._checkValidity();


                if (this._checkValidity() && this.isAuto) this.revert();

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setData(_x2) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }()
  }, {
    key: "setVisible",
    value: function setVisible(visible) {
      var _this2 = this;

      if (visible == this.visible) return; //console.log("SLCT: SetVisible", visible);

      if (visible) {
        this._query(0); // show menu


        var rect = this.getBoundingClientRect();
        this.menu.style.width = this.clientWidth - this._computeMenuOuterWidth() + "px";
        this.menu.style.paddingTop = rect.height + "px";
        this.menu.setVisible(true, rect.left, rect.top); //, this.menu);

        this.visible = true;
        this.classList.add(this.cssClass + "-visible");
        if (this._autocomplete) setTimeout(function () {
          _this2.textbox.focus();
        }, 100);
      } else {
        this.visible = false;
        this.classList.remove(this.cssClass + "-visible");
        this.menu.hide();
      } //this.textbox.focus();

    }
  }, {
    key: "_computeMenuOuterWidth",
    value: function _computeMenuOuterWidth() {
      return this.menu.offsetWidth - this.menu.clientWidth;
      /*
      var style = window.getComputedStyle(this.menu.el, null);
      var paddingLeft = style.getPropertyValue('padding-left');
      var paddingRight = style.getPropertyValue('padding-right');
      var borderLeft = style.getPropertyValue('border-left');
      var borderRight = style.getPropertyValue('border-right');
        paddingLeft = parseInt(paddingLeft.substr(0, paddingLeft.length - 2));
      paddingRight = parseInt(paddingRight.substr(0, paddingRight.length - 2));
      borderLeft = parseInt(borderLeft.substr(0, borderLeft.length - 2));
      borderRight = parseInt(borderRight.substr(0, borderRight.length - 2));
        return paddingLeft + paddingRight + borderLeft + borderRight;
      */
    }
  }]);

  return Select;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"../Data/Layout.js":10,"../Data/Repeat.js":12,"../UI/Menu.js":29}],32:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUI = require("../Core/IUI.js");

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Tab, _IUIElement);

  var _super = _createSuper(Tab);

  function Tab(properties) {
    _classCallCheck(this, Tab);

    return _super.call(this, properties);
  }

  _createClass(Tab, [{
    key: "create",
    value: function create() {}
  }, {
    key: "caption",
    get: function get() {
      return this.getAttribute("caption");
    }
  }, {
    key: "selected",
    get: function get() {
      return this.hasAttribute("selected"); // == "1" || selected == "yes" || selected == "true");
    }
  }]);

  return Tab;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],33:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

var _Layout = _interopRequireDefault(require("../Data/Layout.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Table, _IUIElement);

  var _super = _createSuper(Table);

  function Table() {
    var _this;

    _classCallCheck(this, Table);

    _this = _super.call(this, {
      indexer: function indexer(x) {
        var _x$instance$id, _x$instance;

        return (_x$instance$id = (_x$instance = x.instance) === null || _x$instance === void 0 ? void 0 : _x$instance.id) !== null && _x$instance$id !== void 0 ? _x$instance$id : x.id;
      },
      parents_getter: function parents_getter(x) {
        var _x$instance2;

        return (_x$instance2 = x.instance) === null || _x$instance2 === void 0 ? void 0 : _x$instance2.attributes.item("parents");
      },
      children_getter: function children_getter(x) {
        var _x$instance3;

        return (_x$instance3 = x.instance) === null || _x$instance3 === void 0 ? void 0 : _x$instance3.attributes.item("children");
      },
      parents_changed: function parents_changed(x, p) {
        return false;
      },
      _long_press_x: 0,
      _long_press_y: 0,
      updateOnModification: true,
      last_query: function last_query() {
        return true;
      }
    });

    var self = _assertThisInitialized(_this);

    _this.list = [];

    _this._register("click");

    _this._register("rowdblclick");

    _this._register("contextmenu");

    _this._register("expand");

    _this._register("enter");

    _this._register("leave");

    _this._register("touch"); //window.addEventListener("resize", function(e){
    //	self.updateSize();
    //});


    _this._resizing = false;
    _this._resizeX = 0;
    return _this;
  }

  _createClass(Table, [{
    key: "layout",
    get: function get() {
      return this._layout;
    },
    set: function set(value) {
      var _this2 = this;

      this._layout = value;
      if (!this._created) return;
      var self = this;
      this.header.innerHTML = "";
      var row = this.header.insertRow();

      var _loop = function _loop() {
        var column = value[i];
        var cell = row.insertCell();
        if (column.width && column.width.substring(column.width.length - 1) == "%") width = parseInt(column.width.substring(0, column.width.length - 1)) / 100 * _this2.clientWidth + "px";else width = column.width;
        cell.style.width = width; //cell.setAttribute("data-width", column.width);

        var hWrap = document.createElement("div");
        hWrap.className = _this2.cssClass + "-header-wrap";
        var resizer = document.createElement("div");
        resizer.className = _this2.cssClass + "-resizer";
        resizer.addEventListener("mousedown", function (e) {
          self.updateSize(); //corssbrowser mouse pointer values

          self._resizeX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
          self._resizingColumnWidth = cell.clientWidth;
          self._resizingTableWidth = self.table.clientWidth;
          self._resizing = true;
          self._resizingColumn = cell; // self.headers.indexOf(cell); 

          document.onselectstart = function () {
            return false;
          };
        });

        if (column.type && column.type == "search") {
          var input = document.createElement("input");
          input.type = "search";
          input.className = _this2.cssClass + "-header-input";
          input.placeholder = column.name;
          input.id = self.id + "_" + column.field;
          input.addEventListener("keyup", function () {
            self.search(column, input.value);
          });
          hWrap.appendChild(input);
        } else if (column.type && column.type == "select") {
          // filter out list
          column.filter = [];
          var select = document.createElement("div");
          select.id = self.id + "_" + column.field;
          select.className = self.cssClass + "-header-select";
          select.innerHTML = column.name;
          select.setAttribute("data-dir", "normal");
          menu = document.createElement("div");
          menu.className = self.cssClass + "-header-menu";
          select.addEventListener("click", function (e) {
            if (select.getAttribute("data-dir") == "down") self.sort(column, true);else self.sort(column, false);
          });
          tip = document.createElement("div");
          tip.className = self.cssClass + "-filter-menu";
          menu.appendChild(tip);
          menu.addEventListener("click", function (evt) {
            if (evt.target != menu) return;

            if (tip.style.display == "none") {
              var items = self.list.distinct(column.field);
              tip.innerHTML = "";
              var filters = [];

              for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var fc = document.createElement("input");
                fc.type = "checkbox";
                fc.checked = column.filter.indexOf(item) > -1 ? false : true; // add to filters list

                filters.push({
                  el: fc,
                  text: item
                }); // add to field.filter to be rendered by the grid

                fc.addEventListener("click", function () {
                  column.filter = [];
                  filters.forEach(function (filter) {
                    if (!filter.checked) column.filter.push(filter.text);
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
            } else {
              tip.style.display = "none";
            }
          });
          hWrap.appendChild(select);
          hWrap.appendChild(menu);
        } else {
          var text = document.createElement("div");
          text.className = self.cssClass + "-header-text";
          text.innerHTML = column.name;
          text.setAttribute("data-dir", "normal"); //var sort = ne("div");
          //sort.className = "grid-header-sort";

          hWrap.appendChild(text); //hWrap.appendChild(resizer);
          //hWrap.appendChild(sort);

          text.addEventListener("click", function (e) {
            if (text.getAttribute("data-dir") == "down") self.sort(column, true);else self.sort(column, false);
          });
        }

        hWrap.appendChild(resizer);
        cell.appendChild(hWrap);
      };

      for (var i = 0; i < value.length; i++) {
        var width;
        var menu;
        var tip;

        _loop();
      }
    }
  }, {
    key: "create",
    value: function create() {
      var self = this; // get layout

      this._layout = _Layout["default"].get(this, "td", true);
      this.table = document.createElement("table");
      this.table.className = this.cssClass + "-body";
      this.appendChild(this.table);
      this.body = this.table.createTBody();
      this.header = this.table.createTHead();
      this.header.className = this.cssClass + "-header";
      this.body.addEventListener("mousedown", function (e) {
        if (self.multiselect) {
          self._boxStartX = e.pageX;
          self._boxStartY = e.pageY;
          self._multiselecting = true;
          self.selectBox.classList.add(self.cssClass + "-select-box-visible");
        }
      });
      this.selectBox = document.createElement("div");
      this.selectBox.className = this.cssClass + "-select-box";
      this.appendChild(this.selectBox);
      this.body.addEventListener("mousemove", function (e) {
        if (self._multiselecting || self._multideselecting) {
          self._boxEndX = e.pageX;
          self._boxEndY = e.pageY;

          if (e.movementY > 0) {
            self._multiselecting = true;
            self._multideselecting = false;
          } else if (e.movementY < 0) {
            self._multiselecting = false;
            self._multideselecting = true;
          }

          if (self._boxEndX > self._boxStartX) {
            self.selectBox.style.left = self._boxStartX + "px";
            self.selectBox.style.width = self._boxEndX - self._boxStartX + "px";
          } else {
            self.selectBox.style.left = self._boxEndX + "px";
            self.selectBox.style.width = self._boxStartX - self._boxEndX + "px";
          }

          if (self._boxEndY > self._boxStartY) {
            self.selectBox.style.top = self._boxStartY + "px";
            self.selectBox.style.height = self._boxEndY - self._boxStartY + "px";
          } else {
            self.selectBox.style.top = self._boxEndY + "px";
            self.selectBox.style.height = self._boxStartY - self._boxEndY + "px";
          } // now lets look for all rows within this range


          var rect = self.body.getBoundingClientRect();
          var offset = {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
          };
          var by, sy;

          if (self._boxStartY > self._boxEndY) {
            by = self._boxStartY - offset.top;
            sy = self._boxEndY - offset.top;
          } else {
            by = self._boxEndY - offset.top;
            sy = self._boxStartY - offset.top;
          }

          var selected = [];

          for (var i = 0; i < self.body.rows.length; i++) {
            var top = self.body.rows[i].offsetTop;
            var bottom = top + self.body.rows[i].offsetHeight;

            if ((top > sy || bottom > sy) && (top < by || bottom < by)) {
              selected.push(self.body.rows[i]);
              self.body.rows[i].classList.add(self.cssClass + "-row-selected");
            } else {
              self.body.rows[i].classList.remove(self.cssClass + "-row-selected");
            }
          }

          for (var i = 0; i < selected.length; i++) {
            self._selectChildren(selected[i], true);
          }
        }
      });
      document.body.addEventListener("mouseup", function (e) {
        if (self._multiselecting || self._multideselecting) {
          self._multiselecting = false;
          self._multideselecting = false;
          self.selectBox.classList.remove(self.cssClass + "-select-box-visible");
          self.selectBox.style.width = "0px";
          self.selectBox.style.height = "0px";
        }
      });
      document.addEventListener('mouseup', function () {
        self._resizing = false;

        document.onselectstart = function () {
          return true;
        };
      });
      document.addEventListener('mousemove', function (e) {
        if (self._resizing) {
          var x = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft); //var y = e.pageY || e.clientY + (document.documentElement.scrollTop ?
          //  document.documentElement.scrollTop :
          //  document.body.scrollTop);

          var col = self._resizingColumn;
          var tw, cw;

          if (document.dir == "rtl") {
            tw = self._resizingTableWidth - (x - self._resizeX);
            cw = self._resizingColumnWidth - (x - self._resizeX);
          } else {
            tw = self._resizingTableWidth + (x - self._resizeX);
            cw = self._resizingColumnWidth + (x - self._resizeX);
          } // must have limits


          if (cw > 20) {
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
            col.style.width = cw + "px"; //dummy.style.width = cw + "px";// col.style.width;
          }
        }
      }); // load data
      //if (this.data)
      //	this.load(this.data);
      //this.updateSize();

      this._created = true;
      if (this._layout) this.layout = this._layout;
    }
  }, {
    key: "updateSize",
    value: function updateSize() {
      var totalWidth = 0;

      for (var i = 0; i < this.table.tHead.rows[0].cells.length; i++) {
        var header = this.table.tHead.rows[0].cells[i];
        var width = header.clientWidth + "px";

        if (width == "0px") {
          width = this.headers[i].getAttribute("data-width");
          if (width.substring(width.length - 1) == "%") width = parseInt(width.substring(0, width.length - 1)) / 100 * this.clientWidth + "px";
        }

        if (header.style.display != "none") totalWidth += parseInt(width.substr(0, width.length - 2));
        header.style.width = width;
      }

      if (this.clientWidth > 0) {
        this.body.style.width = this.table.tHead.clientWidth + "px";
        this.table.tHead.style.width = this.table.tHead.clientWidth + "px";
      } else {
        this.table.style.width = totalWidth + "px";
      }
    }
  }, {
    key: "sort",
    value: function sort(column, desc) {
      if (this.tree) return; //let column = this.layout[columnIndex];

      if (column.sorter) {
        this.list.sort(column.sorter);
      } else {
        this.list.sort(function (a, b) {
          if (typeof a[column.field] == "number" || a[column.field] instanceof Date) return a[column.field] - b[column.field];else return a[column.field].toString().localeCompare(b[column.field]);
        });
      }

      if (desc) this.list.reverse();

      for (var i = 0; i < this.list.length; i++) {
        var tr = this.getRows(this.indexer(this.list[i]))[0];
        this.body.insertAdjacentElement("beforeEnd", tr);
      }

      for (var i = 0; i < this.layout.length; i++) {
        var th = this.table.tHead.rows[0].cells[i];
        var txt = th.getElementsByClassName(this.cssClass + "-header-text")[0];
        if (column !== this.layout[i]) txt.setAttribute("data-dir", "normal");else if (desc) txt.setAttribute("data-dir", "up");else txt.setAttribute("data-dir", "down");
      }
    }
  }, {
    key: "setRowVisible",
    value: function setRowVisible(row, visible) {
      var level = parseInt(row.getAttribute("data-level"));

      if (visible) {
        row.classList.remove(this.cssClass + "-row-hidden");
        row.classList.remove(this.cssClass + "-row-selected"); // make sure parent is visible

        for (var i = row.rowIndex - 2; i >= 0; i--) {
          var lev = parseInt(this.body.rows[i].getAttribute("data-level"));
          if (lev > level) break;else if (lev < level) {
            this.setRowVisible(this.body.rows[i], true);
            break;
          }
        }
      } else {
        row.classList.add(this.cssClass + "-row-hidden"); // make sure children are visible

        for (var i = row.rowIndex; i < this.body.rows.length; i++) {
          var lev = parseInt(this.body.rows[i].getAttribute("data-level"));
          if (lev <= level) break;
          this.body.rows[i].classList.add(this.cssClass + "-row-hidden");
        }
      }
    }
  }, {
    key: "expand",
    value: function expand(row, visible) {
      var button = row.getElementsByClassName(this.cssClass + "-tree")[0];
      button.setAttribute("data-expand", visible ? 1 : 0);
      var level = parseInt(row.getAttribute("data-level"));

      for (var i = row.rowIndex; i < this.body.rows.length; i++) {
        var lev = parseInt(this.body.rows[i].getAttribute("data-level"));
        if (lev <= level) break;

        if (!visible) {
          button = this.body.rows[i].getElementsByClassName(this.cssClass + "-tree");
          if (button.length > 0) button[0].setAttribute("data-expand", 0);
          this.body.rows[i].classList.add(this.cssClass + "-row-hidden");
        } else if (lev == level + 1) this.body.rows[i].classList.remove(this.cssClass + "-row-hidden");
      } //this.updateSize();

    }
  }, {
    key: "filter",
    value: function filter(queryFunction) {
      if (queryFunction) {
        this.last_query = queryFunction;

        for (var i = 0; i < this.body.rows.length; i++) {
          var item = this.get(parseInt(this.body.rows[i].getAttribute("data-id")));
          var visible = queryFunction(item);
          this.setRowVisible(this.body.rows[i], visible);
        }
      } // restore default view
      else {
        this.last_query = function () {
          return true;
        }; // view all


        for (var i = 0; i < this.body.rows.length; i++) {
          this.body.rows[i].classList.remove(this.cssClass + "-row-hidden");
        } // hide non-expanded


        for (var i = 0; i < this.body.rows.length; i++) {
          var row = this.body.rows[i];
          var level = parseInt(row.getAttribute("data-level"));
          var button = row.getElementsByClassName(this.cssClass + "-tree");

          if (button.length > 0) {
            // hide ?
            if (button[0].getAttribute("data-expand") == '0') {
              for (i = i + 1; i < this.body.rows.length; i++) {
                var subRow = this.body.rows[i];
                var l = parseInt(subRow.getAttribute("data-level"));
                if (l > level) subRow.classList.add(this.cssClass + "-row-hidden");else {
                  i--;
                  break;
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: "_selectChildren",
    value: function _selectChildren(row, value) {
      var level = parseInt(row.getAttribute("data-level"));

      for (var i = row.rowIndex; i < this.body.rows.length; i++) {
        var subRow = this.body.rows[i];
        var l = parseInt(subRow.getAttribute("data-level"));

        if (l > level) {
          if (value) subRow.classList.add(this.cssClass + "-row-selected");else subRow.classList.remove(this.cssClass + "-row-selected");
        } else {
          break;
        }
      }
    }
  }, {
    key: "_select",
    value: function _select(row, item) {
      var multiple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (this.multiselect) {
        var checked = row.classList.contains(this.cssClass + "-row-selected"); // implement Microsoft Windows Explorer behaivor

        if (context) {
          multiple = checked || multiple;
          checked = !checked;
        }

        if (multiple) {
          var rows = this.getRows(this.indexer(item));
          if (checked) for (var i = 0; i < rows.length; i++) {
            rows[i].classList.remove(this.cssClass + "-row-selected");

            this._selectChildren(rows[i], false);
          } else for (var i = 0; i < rows.length; i++) {
            rows[i].classList.add(this.cssClass + "-row-selected");

            this._selectChildren(rows[i], true);
          }
        } else {
          for (var i = 0; i < this.body.rows.length; i++) {
            this.body.rows[i].classList.remove(this.cssClass + "-row-selected");
          }

          row.classList.add(this.cssClass + "-row-selected");

          this._selectChildren(row, true);
        }
      } else {
        for (var i = 0; i < this.body.rows.length; i++) {
          if (this.body.rows[i] == row) row.classList.add(this.cssClass + "-row-selected");else this.body.rows[i].classList.remove(this.cssClass + "-row-selected");
        }

        this._selected = item;
      }
    }
  }, {
    key: "selected",
    get: function get() {
      if (this.multiselect) {
        var rt = [];

        for (var i = 0; i < this.body.rows.length; i++) {
          if (this.body.rows[i].classList.contains(this.cssClass + "-row-selected")) {
            var item = this.get(this.body.rows[i].getAttribute("data-id"));
            if (rt.indexOf(item) < 0) rt.push(item);
          }
        }

        return rt;
      } else return this._selected;
    }
  }, {
    key: "_applyFilter",
    value: function _applyFilter() {
      for (var i = 0; i < this.list.length; i++) {
        var item = this.list[i];
        el = document.getElementById(this.id + "_" + this.indexer(item), this.body); // visible by default

        el.style.display = "";

        for (var j = 0; j < this.layout.length; j++) {
          var column = this.layout[j];
          if (column.filter) column.filter.forEach(function (filter) {
            if (item[column.field] == filter) {
              // hide this one
              el.style.display = "none";
            }
          });
        }
      }
    }
  }, {
    key: "get",
    value: function get(id) {
      for (var i = 0; i < this.list.length; i++) {
        if (this.indexer(this.list[i]) == id) return this.list[i];
      }

      return null;
    }
  }, {
    key: "setColumnVisible",
    value: function setColumnVisible(index, visible) {
      var display = visible ? "table-cell" : "none";
      var columnWidth = this.headers[index].clientWidth;

      for (var i = 0; i < this.table.rows.length; i++) {
        this.table.rows[i].cells[index].style.display = display;
      }

      this.headers[index].style.display = display; // shrink the table

      if (display == "none") {//this.header.width = (this.header.clientWidth - columnWidth) + "px";
      } //this.updateSize();

    }
  }, {
    key: "containsAny",
    value: function containsAny(items) {
      if (items == null) return false;

      for (var i = 0; i < items.length; i++) {
        if (this.list.indexOf(items[i]) > -1) return true;
      }

      return false;
    }
  }, {
    key: "_createTreeButton",
    value: function _createTreeButton(row, dynamicLoading, item) {
      var self = this;
      var button = document.createElement("div");
      button.className = this.cssClass + "-tree";
      button.setAttribute("data-expand", dynamicLoading ? 2 : 0);
      button.addEventListener("click", function () {
        var eState = this.getAttribute("data-expand");

        if (eState == '2') {
          var ev = {
            button: button,
            item: item,
            row: row,
            table: self,
            success: function success() {
              self.expand(this.button.parentNode.parentNode, 1);
            },
            failure: function failure(errorMsg) {
              this.setAttribute("data-expand", 2);
            }
          };
          this.setAttribute("data-expand", 3); // raise event 

          self._emit("expand", ev);
        } else if (eState == "0") {
          self.expand(this.parentNode.parentNode, true);
        } else if (eState == "1") {
          self.expand(this.parentNode.parentNode, false);
        }
      });
      row.cells[0].insertAdjacentElement("afterbegin", button);
    }
  }, {
    key: "add",
    value: function add(item, dynamicLoading) //fast)
    {
      this.list.push(item);
      var self = this;
      var parents = this.parents_getter(item);
      var newRow;

      if (this.containsAny(parents)) {
        for (var i = 0; i < parents.length; i++) {
          var parent = parents[i];
          var inListParents = this.getRows(this.indexer(parent));

          for (var j = 0; j < inListParents.length; j++) {
            var parentRow = inListParents[j]; // add expand button to parent

            var treeButton = parentRow.getElementsByClassName(this.cssClass + "-tree", parentRow);

            if (treeButton.length == 0) {
              this._createTreeButton(parentRow);

              newRow = this._addRow(item, parseInt(parentRow.getAttribute("data-level")) + 1, false, parentRow.rowIndex);
            } else {
              newRow = this._addRow(item, parseInt(parentRow.getAttribute("data-level")) + 1, treeButton[0].getAttribute("data-expand") == '1', parentRow.rowIndex);
            }
          } // perhaps parent row depends on children


          this.update(parent);
        }
      } else {
        newRow = this._addRow(item, 0, true);
      }

      if (dynamicLoading) this._createTreeButton(newRow, true, item); // @TODO: fix this since modified event is removed

      if (item.on) if (this.updateOnModification) item.on("modified", function (propertyName) {
        //console.log("render", propertyName, item);
        self.update(item, propertyName);
      }); //if (!fast)
      //	self.layout.forEach(function(field){
      //	if (field.type && field.type == "select")
      //{
      // calculate distinct
      //}
      //});
      //this.updateSize();

      return self;
    }
  }, {
    key: "_findIndexes",
    value: function _findIndexes(propertyIndex) {
      var rt = [];

      for (var i = 0; i < this.layout.length; i++) {
        if (this.layout[i].field == propertyIndex || this.layout[i].field == "_any") rt.push(i);
      }

      return rt;
    }
  }, {
    key: "_addRow",
    value: function _addRow(item, level, visible, index) {
      var _this3 = this;

      var self = this; // add item

      var tr = self.body.insertRow(index);
      tr.setAttribute("data-id", this.indexer(item));
      tr.setAttribute("data-level", level);
      if (visible) tr.className = this.cssClass + "-row";else tr.className = this.cssClass + "-row " + this.cssClass + "-row-hidden";

      var _loop2 = function _loop2() {
        var column = _this3.layout[i];
        var cl = column.node.cloneNode(true); // tr.insertCell();
        //this._make_bindings(cl)

        _IUI.IUI.bind(cl, false, "table", _IUI.IUI.extend(_this3.__i_bindings, {
          index: i
        }, true));

        tr.appendChild(cl);
        if (cl.dataMap != null) cl.dataMap.render(item).then(function () {
          return self._renderElement(cl, cl.data);
        });else {
          cl.data = item;

          _this3._renderElement(cl, cl.data);
        } //if (column.formatter)
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

        cl.style.display = _this3.table.tHead.rows[0].cells[i].style.display;
      };

      for (var i = 0; i < this.layout.length; i++) {
        _loop2();
      }

      tr.addEventListener("click", function (e) {
        self._select(tr, item, e.ctrlKey);

        self._emit("click", {
          data: item,
          row: tr,
          event: e
        });
      });
      tr.addEventListener("dblclick", function (e) {
        self._select(tr, item, e.ctrlKey);

        self._emit("rowdblclick", {
          data: item,
          row: tr,
          event: e
        });
      });
      tr.addEventListener("contextmenu", function (e) {
        self._select(tr, item, e.ctrlKey, true);

        self._emit("contextmenu", {
          data: item,
          row: tr,
          event: e
        });
      });
      tr.addEventListener("mouseleave", function (e) {
        //if (self._multideselecting)
        //	tr.classList.remove(self.cssClass + "-row-selected");
        self._emit("leave", {
          data: item,
          row: tr,
          event: e
        });
      });
      tr.addEventListener("mouseenter", function (e) {
        //if (self._multiselecting)
        //	tr.classList.add(self.cssClass + "-row-selected");
        //self._select(tr, item, true);
        self._emit("enter", {
          data: item,
          row: tr,
          event: e
        });
      });
      tr.addEventListener("touchstart", function (e) {
        self._tx = e.touches[0].clientX;
        self._ty = e.touches[0].clientY;
        self._long_press_item = item;
        self._long_press_x = e.touches[0].clientX;
        self._long_press_y = e.touches[0].clientY;
        if (self._long_press_timeout) clearTimeout(self._long_press_timeout);
        self._long_press_timeout = setTimeout(function () {
          if (self._long_press_item) {
            self._select(tr, self._long_press_item);

            self._emit("contextmenu", {
              data: self._long_press_item,
              event: e,
              row: tr
            });

            self._long_press_timeout = null;
            self._long_press_item = null;
          }
        }, 600);
      });
      this.addEventListener("touchmove", function (e) {
        if (Math.abs(e.touches[0].clientX - self._long_press_x) > 10 || Math.abs(e.touches[0].clientY - self._long_press_y) > 10) {
          self._long_press_item = null;
        }
      });
      tr.addEventListener("touchend", function (e) {
        var tx = e.changedTouches[0].clientX;
        var ty = e.changedTouches[0].clientY;

        if (Math.abs(tx - self._tx) < 10 && Math.abs(ty - self._ty) < 10) {
          self._select(tr, item);

          self._emit("touch", {
            data: item,
            event: e,
            row: tr
          });
        }

        if (self._long_press_timeout) clearTimeout(self._long_press_timeout);else e.preventDefault();
        self._long_press_item = null;
        self._long_press_timeout = null;
      });
      return tr;
    }
  }, {
    key: "getRows",
    value: function getRows(id) {
      var rt = [];

      for (var i = 0; i < this.body.rows.length; i++) {
        if (this.body.rows[i].getAttribute("data-id") == id) rt.push(this.body.rows[i]);
      }

      return rt;
    }
  }, {
    key: "toJSON",
    value: function toJSON(level) {
      //if (!level)
      //	level = 3;
      var headers = ["#"];
      var list = []; // make header

      for (var i = 0; i < this.layout.length; i++) {
        if (!(this.layout[i].noPrint || this.layout[i].noExport) && this.headers[i].style.display != "none") {
          headers.push(this.layout[i].name);
        }
      }

      var index = 1; // build table

      for (var i = 0; i < this.body.rows.length; i++) {
        var row = this.body.rows[i];
        var rowLevel = parseInt(row.getAttribute("data-level"));

        if (level) {
          if (rowLevel > level) continue;
        } else if (row.classList.contains(this.cssClass + "-row-hidden")) {
          continue;
        }

        var item = [rowLevel, index++];

        for (var j = 0; j < this.layout.length; j++) {
          if (!(this.layout[j].noPrint || this.layout[j].noExport) && this.headers[j].style.display != "none") {
            var text = "";

            for (var k = 0; k < row.cells[j].childNodes.length; k++) {
              if (row.cells[j].childNodes[k].nodeType == 3) {
                text = row.cells[j].childNodes[k].data;
                break;
              }
            }

            item.push(text); //row.cells[j].innerHTML);
          }
        }

        list.push(item);
      }

      return {
        headers: headers,
        data: list
      };
    }
  }, {
    key: "toTable",
    value: function toTable(level) {
      // create table
      var tbl = document.createElement("table");
      var header = tbl.createTHead();
      var body = tbl.createTBody();
      var tr = header.insertRow(); // make header

      for (var i = 0; i < this.layout.length; i++) {
        if (!this.layout[i].noPrint && this.headers[i].style.display != "none") {
          var th = tr.insertCell();
          th.innerHTML = this.layout[i].name;
        }
      } // build table


      for (var i = 0; i < this.body.rows.length; i++) {
        var row = this.body.rows[i];

        if (level) {
          if (parseInt(row.getAttribute("data-level")) > level) continue;
        } else if (row.classList.contains(this.cssClass + "-row-hidden")) {
          continue;
        }

        tr = body.insertRow();
        tr.classList.add("level-" + (parseInt(row.getAttribute("data-level")) + 1));

        for (var j = 0; j < this.layout.length; j++) {
          if (!this.layout[j].noPrint && this.headers[j].style.display != "none") {
            var td = tr.insertCell();
            td.innerHTML = row.cells[j].innerHTML;
          }
        }
      }

      return tbl;
    }
  }, {
    key: "_removeRow",
    value: function _removeRow(row) {
      var level = parseInt(row.getAttribute("data-level"));
      var nextIndex = row.rowIndex; // zero-indexed (dummy header included, so it's 1-indexed')
      // remove all children

      while (nextIndex < this.body.rows.length) {
        var r = this.body.rows[nextIndex];
        var l = parseInt(r.getAttribute("data-level"));
        if (l <= level) break;
        this.body.rows.deleteRow(nextIndex++);
      } // get parent row


      var parentRow = this._getParentRow(row); // remove row itself


      this.body.deleteRow(row.rowIndex - 1); // remove expand button from parent if it has no more children

      if (parentRow) {
        // last item ? means has no children
        if (parentRow.rowIndex == this.body.rows.length || parseInt(this.body.rows[parentRow.rowIndex].getAttribute("data-level")) <= parseInt(parentRow.getAttribute("data-level"))) {
          // remove expand button
          var button = parentRow.getElementsByClassName(this.cssClass + "-tree");
          if (button.length > 0) button[0].parentNode.removeChild(button[0]);
        } // render parent (in case formatter depends on children)
        //var parent = this.get(parseInt(parentRow.getAttribute("data-id")));
        //this._renderRow(parentRow, parent);

      }
    }
  }, {
    key: "_getById",
    value: function _getById(id) {
      for (var i = 0; i < this.list.length; i++) {
        if (this.indexer(this.list[i]) == id) return this.list[i];
      }

      return null; // this;
    }
  }, {
    key: "remove",
    value: function remove(item) {
      if (typeof item == "string" || typeof item == "number") item = this._getById(item);
      if (item == null) return;
      var rows = this.getRows(this.indexer(item)); // remove all occurrences

      for (var i = 0; i < rows.length; i++) {
        this._removeRow(rows[i]);
      }

      var i = this.list.indexOf(item);
      this.list.splice(i, 1);
      return this;
    }
  }, {
    key: "clear",
    value: function clear() {
      while (this.body.rows.length > 0) {
        this.body.deleteRow(0);
      }

      this.list = [];
      return this;
    } //_renderRow(row, item, propertyName)
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

  }, {
    key: "_getParentRow",
    value: function _getParentRow(row) {
      var level = parseInt(row.getAttribute("data-level"));

      for (var i = row.rowIndex - 2; i >= 0; i--) {
        if (parseInt(this.body.rows[i].getAttribute("data-level")) < level) return this.body.rows[i];
      }
    }
  }, {
    key: "_renderItem",
    value: function _renderItem(item) {
      var propertyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var rows = this.getRows(this.indexer(item));
      var removedRows = [];
      var self = this;
      var parentsChanged = this.parents_changed(item, propertyName);

      if (propertyName == null || parentsChanged) {
        var notModifiedParents = []; // remove from parents

        var parents = this.parents_getter(item);

        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          var level = parseInt(row.getAttribute("data-level")); // get parent row

          var parentRow = this._getParentRow(row);

          if (parentRow) {
            // parent found
            var parent = this.get(parseInt(parentRow.getAttribute("data-id")));

            if (parents == null || parents.indexOf(parent) == -1) {
              // remove this node
              this._removeRow(row);

              removedRows.push(row);
            } else notModifiedParents.push(parent);
          }
        } // add to new parents


        if (parents != null) {
          for (var i = 0; i < parents.length; i++) {
            var parent = parents[i];

            if (notModifiedParents.indexOf(parent) == -1 && this.list.indexOf(parent) > -1) {
              // add new row
              var inListParents = this.getRows(this.indexer(parent));

              for (var j = 0; j < inListParents.length; j++) {
                var parentRow = inListParents[j];
                var treeButton = parentRow.getElementsByClassName(this.cssClass + "-tree", parentRow);

                if (treeButton.length == 0) {
                  this._createTreeButton(parentRow);

                  this._addRow(item, parseInt(parentRow.getAttribute("data-level")) + 1, false, parentRow.rowIndex);
                } else {
                  this._addRow(item, parseInt(parentRow.getAttribute("data-level")) + 1, treeButton[0].getAttribute("data-expand") == '1', parentRow.rowIndex);
                }
              }
            }
          }
        }
      } else {// render parent (in case formatter depends on children)
        //for(var i = 0; i < rows.length; i++)
        //{
        //	var parentRow = this._getParentRow(rows[i]);
        //	if (parentRow)
        //	{
        //		var parent = this.get(parseInt(parentRow.getAttribute("data-id")));
        //		this._renderRow(parentRow, parent, propertyName);
        //	}
        //}
      } // render the non-removed rows.
      //for(var i = 0; i < rows.length; i++)
      //	if (removedRows.indexOf(rows[i]) == -1)
      //		this._renderRow(rows[i], item, propertyName);

    }
  }, {
    key: "update",
    value: function update(item, propertyName) {
      if (item) this._renderItem(item, propertyName);else {
        for (var i = 0; i < this.list.length; i++) {
          this._renderItem(this.list[i]);
        }
      }
      return this;
    }
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
        var self, loadFunction, i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(_getPrototypeOf(Table.prototype), "setData", this).call(this, value);

              case 2:
                this.clear();

                if (this.tree) {
                  self = this;

                  loadFunction = function loadFunction(items, level) {
                    for (var i = 0; i < items.length; i++) {
                      var item = items[i];
                      self.list.push(item);

                      var row = self._addRow(item, level, level == 0);

                      if (item.children && item.children.length > 0) {
                        self._createTreeButton(row); // load children


                        loadFunction(item.children, level + 1);
                      }
                    }
                  }; // recursively load items


                  loadFunction(value, 0);
                } else {
                  for (i = 0; i < value.length; i++) {
                    this.add(value[i]);
                  }
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setData(_x) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }()
  }]);

  return Table;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"../Data/Layout.js":10}],34:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _Tab = _interopRequireDefault(require("./Tab.js"));

var _IUI = require("../Core/IUI.js");

var _Check = _interopRequireDefault(require("./Check.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = _IUI.IUI.module( /*#__PURE__*/function (_IUIElement) {
  _inherits(Tabs, _IUIElement);

  var _super = _createSuper(Tabs);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _super.call(this, {
      selected: null,
      list: [],
      _y: 0,
      _x: 0,
      auto: true
    });
  }

  _createClass(Tabs, [{
    key: "create",
    value: function create() {
      var self = this;

      this._register("select");

      this._bar = document.createElement("div");

      this._bar.classList.add(this.cssClass + "-bar");

      this._ext = document.createElement("span");
      this._ext.className = this.cssClass + "-bar-ext";

      this._bar.appendChild(this._ext); //this.insertAdjacentElement("afterBegin", this._bar);


      this._body = document.createElement("div");
      this._body.className = this.cssClass + "-body";
      this.appendChild(this._bar);
      this.appendChild(this._body);
      var items = []; // this.getElementsByClassName("tab");

      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i] instanceof _Tab["default"]) items.push(this.children[i]);
      }

      this._observer = new ResizeObserver(function (x) {
        self._body.style.height = x[0].target.offsetHeight + "px"; // x[0].contentRect.height + "px";
      });
      items.map(function (x) {
        return self.add(x);
      });
      this.addEventListener("touchstart", function (e) {
        var x = e.target;

        do {
          if (x == self) break;
          var sy = window.getComputedStyle(x)["overflow-x"];
          if (x.scrollWidth > x.clientWidth && (sy == "scroll" || sy == "auto")) return;
        } while (x = x.parentElement);

        self._x = e.originalEvent ? e.originalEvent.touches[0].clientX : e.touches[0].clientX;
        self._y = e.originalEvent ? e.originalEvent.touches[0].clientY : e.touches[0].clientY;
      }, {
        passive: true
      });
      this.addEventListener("touchmove", function (e) {
        if (!self._x || !self._y) {
          return;
        }

        var xUp = e.originalEvent ? e.originalEvent.touches[0].clientX : e.touches[0].clientX;
        var yUp = e.originalEvent ? e.originalEvent.touches[0].clientY : e.touches[0].clientY;
        var xDiff = document.dir == "rtl" ? xUp - self._x : self._x - xUp;
        var yDiff = self._y - yUp;
        var index = self.list.indexOf(self.selected);

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          /*most significant*/
          if (xDiff > 0) {
            if (index < self.list.length - 1) {
              self.select(self.list[index + 1]); //self.selected.scrollIntoView();
            }
            /* left swipe */

          } else {
            if (index > 0) self.select(self.list[index - 1]);
            /* right swipe */
          }
        } else {
          if (yDiff > 0) {
            /* up swipe */
          } else {
            /* down swipe */
          }
        }
        /* reset values */


        self._x = null;
        self._y = null;
      }, {
        passive: true
      });
    }
  }, {
    key: "created",
    value: function created() {//this._updateSize();
    }
  }, {
    key: "add",
    value: function add(item) {
      var label = new _Check["default"](); // document.createElement("i-check");

      label.innerHTML = item.caption;

      this._ext.insertAdjacentElement("beforebegin", label);

      label.className = this.cssClass + "-button";
      item.classList.add(this.cssClass + "-content");
      label.content = item;
      item.label = label;

      this._body.append(item);

      this.list.push(item);
      var self = this;
      label.on("check", function (v) {
        //if (v && !self._neglect)
        self.select(item);
      });
      if (item.selected) this.select(item);
      return this;
    } //_updateSize() {
    //    for (var i = 0; i < this._body.children.length; i++) {
    //        if (this._body.clientHeight < this._body.children[i].offsetHeight) {
    //            this._body.style.height = this._body.children[i].offsetHeight + "px";
    //        }
    //    }
    //}

  }, {
    key: "select",
    value: function select(item) {
      var tab;
      if (item instanceof _Tab["default"]) tab = item;else if (typeof o === 'string' || o instanceof String) for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].id == item) {
          tab = item;
          break;
        } else if (!isNaN(item)) tab = this.list[i];
      } //this._neglect = true;

      var self = this;
      this.list.forEach(function (i) {
        if (i == tab) tab.label.check(true); // set(true, false);
        else {
          i.classList.remove(self.cssClass + "-content-active");
          i.label.check(false); // set(false, false);
        }
      }); //this._neglect = false;

      tab.classList.add(this.cssClass + "-content-active");
      if (this.selected != null) this._observer.unobserve(this.selected);
      this.selected = tab;

      this._observer.observe(this.selected);

      if (document.dir == "rtl") this._bar.scrollLeft = tab.label.offsetLeft + tab.label.clientWidth;else this._bar.scrollLeft = tab.label.offsetLeft - tab.label.clientWidth;

      this._emit("select", tab);

      return this;
    }
  }]);

  return Tabs;
}(_IUIElement2["default"]));

exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5,"./Check.js":20,"./Tab.js":32}],35:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IUIElement2 = _interopRequireDefault(require("../Core/IUIElement.js"));

var _IUI = require("../Core/IUI.js");

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _IUI.IUI.module((_temp = _class = /*#__PURE__*/function (_IUIElement) {
  _inherits(IUIWindow, _IUIElement);

  var _super = _createSuper(IUIWindow);

  function IUIWindow() {
    var _this;

    _classCallCheck(this, IUIWindow);

    _this = _super.call(this, {
      closeable: true,
      draggable: false,
      focus: false
    });

    _this._register("resize");

    _this._register("move");

    _this._register("close");

    _this._uid = "d:" + Math.random().toString(36).substring(2);
    return _this;
  }

  _createClass(IUIWindow, [{
    key: "create",
    value: function create() {
      var self = this;
      this.tabIndex = 0; // create header

      this._header = document.createElement("div");
      this._header.className = this.cssClass + "-header";
      if (this.draggable) this._header.setAttribute("draggable", true);
      var f = this.getElementsByClassName(this.cssClass + "-footer");
      this._footer = f.length > 0 ? f[0] : null;
      var b = this.getElementsByClassName(this.cssClass + "-body"); //this.body = b.length > 0 ? b[0]: null;

      if (b.length == 0) {
        this._body = document.createElement("div");
        this._body.className = this.cssClass + "-body";

        while (this.children.length > (this._footer == null ? 0 : 1)) {
          this._body.appendChild(this.children[0]);
        }

        this.insertAdjacentElement("afterBegin", this._body);
      } else this._body = b[0];

      if (this.icon) {
        this._icon = document.createElement("div");
        this._icon.className = this.cssClass + "-icon"; //this._icon.src = this.icon;

        this._icon.style.setProperty("--icon", "url('".concat(this.icon, "')"));

        this._header.appendChild(this._icon);
      }

      this._caption = document.createElement("div");
      this._caption.className = this.cssClass + "-caption";
      this._caption.innerHTML = this.caption;
      this._subtitle = document.createElement("div");
      this._subtitle.className = this.cssClass + "-subtitle";
      this._subtitle.innerHTML = this.subtitle;
      this._tools = document.createElement("div");
      this._tools.className = this.cssClass + "-tools";

      this._header.appendChild(this._caption);

      this._header.appendChild(this._subtitle);

      this._header.appendChild(this._tools);

      if (this.closeable) {
        this._close = document.createElement("div");
        this._close.className = this.cssClass + "-tools-close button";

        this._close.addEventListener("click", function () {
          self._emit("close");
        });
      } //this.addEventListener("mousedown", function (e) {
      //    self.setFocus(true);
      //});


      this.insertAdjacentElement("afterBegin", this._header);
    }
  }, {
    key: "setHeaderVisible",
    value: function setHeaderVisible(value) {
      this._header.style.display = value ? "" : "none"; //this._updateSize();
    }
  }, {
    key: "setCloseVisible",
    value: function setCloseVisible(value) {
      if (this.closeable) this._close.style.display = value ? "" : "none";
    }
  }, {
    key: "icon",
    get: function get() {
      return this.getAttribute("icon");
    }
    /*
    setFocus(v) {
        this.focus = v;
          var self = this;
          if (v) {
            this.classList.add(this.cssClass + "-active");
              return;
            var last = IUI._nav_list[IUI._nav_list.length - 1];
              if (last && last != this) {
                last.classList.remove(this.cssClass + "-active");
                last.focus = false;
            }
              if (last != this) {
                if (window.location.hash != "#" + this._uid) {
                    IUI._nav_ignore = true;
                    window.location.hash = this._uid;
                    //window.location.replace("#" + this._uid);
                }
            }
              var i = IUI._nav_list.indexOf(this);
            if (i > -1)
                IUI._nav_list.splice(i, 1);
              IUI._nav_list.push(this);
          }
        else {
            var last = IUI._nav_list[IUI._nav_list.length - 1];
            if (last == this) {
                IUI._nav_list.pop();
                last = IUI._nav_list.pop();
                  IUI._nav_list.push(this);
                    if (last) {
                    last.classList.add(this.cssClass + "-active");
                    last.focus = true;
                    IUI._nav_list.push(last);
                    if (window.location.hash != "#" + last._uid) {
                        IUI._nav_ignore = true;
                        window.location.hash = last._uid;
                        //window.location.replace("#" + last._uid);
                    }
                }
                else {
                    if (window.location.hash != "#") {
                        IUI._nav_ignore = true;
                        var x = window.scrollX;
                        var y = window.scrollY;
                          window.location.hash = "#";
                          window.scrollTo(x, y);
                        //window.location.replace("#");
                      }
                }
            }
              this.classList.remove(this.cssClass + "-active");
          }
          return this;
    }
    */

  }, {
    key: "show",
    value: function show() {
      //this.setFocus(true);
      return this;
    }
  }, {
    key: "move",
    value: function move(x, y) {
      this.style.left = x + "px";
      this.style.top = y + "px";

      this._emit("move", x, y);

      return this;
    }
  }, {
    key: "resize",
    value: function resize(width, height) {
      this.style.width = width + "px";
      this.style.height = height + "px";

      this._updateSize();

      this._emit("resize", this.clientWidth, this.clientHeight);

      return this;
    }
  }, {
    key: "_updateSize",
    value: function _updateSize() {
      if (_IUI.IUI.responsive) return;

      if (this._body) {
        if (this.clientWidth < this._body.scrollWidth) this.style.width = this._body.scrollWidth + 1 + "px";

        if (this._footer) {
          if (this.clientWidth < this._footer.offsetWidth) this.style.width = this._footer.offsetWidth + "px";
          if (this.clientHeight < this._header.offsetHeight + this._body.scrollHeight + this._footer.offsetHeight) this.style.height = this._header.offsetHeight + this._body.scrollHeight + this._footer.offsetHeight + "px";
        } else {
          if (this.clientHeight < this._header.offsetHeight + this._body.scrollHeight) this.style.height = this._header.offsetHeight + this._body.scrollHeight + 1 + "px";
        }
      } // handle windows exceeding document size


      if (this.clientHeight > document.body.clientHeight) {
        this.style.height = document.body.clientHeight + "px";
        if (this._footer) this._body.style.height = this.clientHeight - this._footer.clientHeight - this._header.clientHeight + "px";else this._body.style.height = this.clientHeight - this._header.clientHeight + "px";
      }

      if (this.clientWidth > document.body.clientWidth) this.style.width = document.body.clientWidth + 1 + "px";
    }
  }, {
    key: "caption",
    get: function get() {
      return this.getAttribute("caption");
    },
    set: function set(value) {
      this._caption.innerHTML = value;
      this.setAttribute("caption", value);
    }
  }, {
    key: "subtitle",
    get: function get() {
      return this.getAttribute("subtitle");
    },
    set: function set(value) {
      this._subtitle.innerHTML = value;
      this.setAttribute("subtitle", value);
    }
  }]);

  return IUIWindow;
}(_IUIElement2["default"]), _defineProperty(_class, "moduleName", "window"), _temp));
/*
IUI._nav_list = [];

window.addEventListener("hashchange", function(e){

   if (IUI._nav_ignore)
   {
       IUI._nav_ignore = false;
       return;
   }

   if (IUI.responsive)
   {
       var oldHash = e.oldURL.split("#");
       if (oldHash.length == 2)
       {
           var hash = oldHash[1];
           var dialogs = IUI.registry.filter(function(o){ return ( o instanceof IUIWindow); });
               dialogs.forEach(function(dlg){
               if (dlg._uid == hash)
                       dlg.hide();	
               });
       }
   }

   var newHash = e.newURL.split("#");	
   if (newHash.length == 2)
   {
       var hash = newHash[1];

       if (hash == "")
       {
           var dialogs = IUI.registry.filter(function(o){ return ( o instanceof IUIDialog); });
           dialogs.forEach(function(d){
               d.hide();
           });

           IUI._nav_list = [];

           return;
       }

       var dialogs = IUI.registry.filter(function(o){ return ( o instanceof IUIWindow); });

       dialogs.forEach(function(dlg){
          if (dlg._uid == hash)
               dlg.setFocus(true);	
       });
   }
});
*/


exports["default"] = _default;

},{"../Core/IUI.js":4,"../Core/IUIElement.js":5}],36:[function(require,module,exports){
"use strict";

var _IUI = require("./Core/IUI.js");

require("./Core/IUIElement.js");

require("./Core/App.js");

require("./Router/Router.js");

require("./Router/Route.js");

require("./Router/Link.js");

require("./Router/Target.js");

require("./Data/Repeat.js");

require("./Data/Include.js");

require("./Data/Form.js");

require("./UI/Login.js");

require("./UI/Window.js");

require("./UI/Dialog.js");

require("./UI/Input.js");

require("./UI/Tab.js");

require("./UI/Tabs.js");

require("./UI/Table.js");

require("./UI/Check.js");

require("./UI/Button.js");

require("./UI/Navbar.js");

require("./UI/DateTimePicker.js");

require("./Data/Layout.js");

require("./Data/Field.js");

require("./UI/Background.js");

require("./UI/Menu.js");

require("./Data/TableRow.js");

require("./UI/Select.js");

require("./UI/DropDown.js");

require("./UI/Grid.js");

require("./UI/Location.js");

require("./UI/CodePreview.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

window.addEventListener("beforeprint", function (e) {
  var viewRoute = router.current.viewRoute;
  viewRoute.style.height = "auto";
  router.style.height = viewRoute.clientHeight + "px";
});
window.addEventListener("afterprint", function (e) {
  var viewRoute = router.current.viewRoute;
  viewRoute.style.height = "";
  router.style.height = "";
});
window.addEventListener("load", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _IUI.IUI.create(document.body);

        case 2:
          _context.next = 4;
          return _IUI.IUI.created(document.body);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
window.iui = _IUI.iui;

},{"./Core/App.js":1,"./Core/IUI.js":4,"./Core/IUIElement.js":5,"./Data/Field.js":7,"./Data/Form.js":8,"./Data/Include.js":9,"./Data/Layout.js":10,"./Data/Repeat.js":12,"./Data/TableRow.js":13,"./Router/Link.js":14,"./Router/Route.js":15,"./Router/Router.js":16,"./Router/Target.js":17,"./UI/Background.js":18,"./UI/Button.js":19,"./UI/Check.js":20,"./UI/CodePreview.js":21,"./UI/DateTimePicker.js":22,"./UI/Dialog.js":23,"./UI/DropDown.js":24,"./UI/Grid.js":25,"./UI/Input.js":26,"./UI/Location.js":27,"./UI/Login.js":28,"./UI/Menu.js":29,"./UI/Navbar.js":30,"./UI/Select.js":31,"./UI/Tab.js":32,"./UI/Table.js":33,"./UI/Tabs.js":34,"./UI/Window.js":35}]},{},[36]);
