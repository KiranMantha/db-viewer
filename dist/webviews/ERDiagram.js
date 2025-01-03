"use strict";
(() => {
  // node_modules/d3-dispatch/src/dispatch.js
  var noop = { value: () => {
  } };
  function dispatch() {
    for (var i3 = 0, n2 = arguments.length, _2 = {}, t3; i3 < n2; ++i3) {
      if (!(t3 = arguments[i3] + "") || t3 in _2 || /[\s.]/.test(t3)) throw new Error("illegal type: " + t3);
      _2[t3] = [];
    }
    return new Dispatch(_2);
  }
  function Dispatch(_2) {
    this._ = _2;
  }
  function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t3) {
      var name = "", i3 = t3.indexOf(".");
      if (i3 >= 0) name = t3.slice(i3 + 1), t3 = t3.slice(0, i3);
      if (t3 && !types.hasOwnProperty(t3)) throw new Error("unknown type: " + t3);
      return { type: t3, name };
    });
  }
  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _2 = this._, T3 = parseTypenames(typename + "", _2), t3, i3 = -1, n2 = T3.length;
      if (arguments.length < 2) {
        while (++i3 < n2) if ((t3 = (typename = T3[i3]).type) && (t3 = get(_2[t3], typename.name))) return t3;
        return;
      }
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i3 < n2) {
        if (t3 = (typename = T3[i3]).type) _2[t3] = set(_2[t3], typename.name, callback);
        else if (callback == null) for (t3 in _2) _2[t3] = set(_2[t3], typename.name, null);
      }
      return this;
    },
    copy: function() {
      var copy = {}, _2 = this._;
      for (var t3 in _2) copy[t3] = _2[t3].slice();
      return new Dispatch(copy);
    },
    call: function(type2, that) {
      if ((n2 = arguments.length - 2) > 0) for (var args = new Array(n2), i3 = 0, n2, t3; i3 < n2; ++i3) args[i3] = arguments[i3 + 2];
      if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
      for (t3 = this._[type2], i3 = 0, n2 = t3.length; i3 < n2; ++i3) t3[i3].value.apply(that, args);
    },
    apply: function(type2, that, args) {
      if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
      for (var t3 = this._[type2], i3 = 0, n2 = t3.length; i3 < n2; ++i3) t3[i3].value.apply(that, args);
    }
  };
  function get(type2, name) {
    for (var i3 = 0, n2 = type2.length, c3; i3 < n2; ++i3) {
      if ((c3 = type2[i3]).name === name) {
        return c3.value;
      }
    }
  }
  function set(type2, name, callback) {
    for (var i3 = 0, n2 = type2.length; i3 < n2; ++i3) {
      if (type2[i3].name === name) {
        type2[i3] = noop, type2 = type2.slice(0, i3).concat(type2.slice(i3 + 1));
        break;
      }
    }
    if (callback != null) type2.push({ name, value: callback });
    return type2;
  }
  var dispatch_default = dispatch;

  // node_modules/d3-selection/src/namespaces.js
  var xhtml = "http://www.w3.org/1999/xhtml";
  var namespaces_default = {
    svg: "http://www.w3.org/2000/svg",
    xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  // node_modules/d3-selection/src/namespace.js
  function namespace_default(name) {
    var prefix = name += "", i3 = prefix.indexOf(":");
    if (i3 >= 0 && (prefix = name.slice(0, i3)) !== "xmlns") name = name.slice(i3 + 1);
    return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
  }

  // node_modules/d3-selection/src/creator.js
  function creatorInherit(name) {
    return function() {
      var document2 = this.ownerDocument, uri = this.namespaceURI;
      return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
    };
  }
  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }
  function creator_default(name) {
    var fullname = namespace_default(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
  }

  // node_modules/d3-selection/src/selector.js
  function none() {
  }
  function selector_default(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  // node_modules/d3-selection/src/selection/select.js
  function select_default(select) {
    if (typeof select !== "function") select = selector_default(select);
    for (var groups = this._groups, m3 = groups.length, subgroups = new Array(m3), j3 = 0; j3 < m3; ++j3) {
      for (var group = groups[j3], n2 = group.length, subgroup = subgroups[j3] = new Array(n2), node, subnode, i3 = 0; i3 < n2; ++i3) {
        if ((node = group[i3]) && (subnode = select.call(node, node.__data__, i3, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i3] = subnode;
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }

  // node_modules/d3-selection/src/array.js
  function array(x2) {
    return x2 == null ? [] : Array.isArray(x2) ? x2 : Array.from(x2);
  }

  // node_modules/d3-selection/src/selectorAll.js
  function empty() {
    return [];
  }
  function selectorAll_default(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  // node_modules/d3-selection/src/selection/selectAll.js
  function arrayAll(select) {
    return function() {
      return array(select.apply(this, arguments));
    };
  }
  function selectAll_default(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = selectorAll_default(select);
    for (var groups = this._groups, m3 = groups.length, subgroups = [], parents = [], j3 = 0; j3 < m3; ++j3) {
      for (var group = groups[j3], n2 = group.length, node, i3 = 0; i3 < n2; ++i3) {
        if (node = group[i3]) {
          subgroups.push(select.call(node, node.__data__, i3, group));
          parents.push(node);
        }
      }
    }
    return new Selection(subgroups, parents);
  }

  // node_modules/d3-selection/src/matcher.js
  function matcher_default(selector) {
    return function() {
      return this.matches(selector);
    };
  }
  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  // node_modules/d3-selection/src/selection/selectChild.js
  var find = Array.prototype.find;
  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }
  function childFirst() {
    return this.firstElementChild;
  }
  function selectChild_default(match) {
    return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  // node_modules/d3-selection/src/selection/selectChildren.js
  var filter = Array.prototype.filter;
  function children() {
    return Array.from(this.children);
  }
  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }
  function selectChildren_default(match) {
    return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  // node_modules/d3-selection/src/selection/filter.js
  function filter_default(match) {
    if (typeof match !== "function") match = matcher_default(match);
    for (var groups = this._groups, m3 = groups.length, subgroups = new Array(m3), j3 = 0; j3 < m3; ++j3) {
      for (var group = groups[j3], n2 = group.length, subgroup = subgroups[j3] = [], node, i3 = 0; i3 < n2; ++i3) {
        if ((node = group[i3]) && match.call(node, node.__data__, i3, group)) {
          subgroup.push(node);
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }

  // node_modules/d3-selection/src/selection/sparse.js
  function sparse_default(update) {
    return new Array(update.length);
  }

  // node_modules/d3-selection/src/selection/enter.js
  function enter_default() {
    return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
  }
  function EnterNode(parent, datum2) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum2;
  }
  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) {
      return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function(child, next) {
      return this._parent.insertBefore(child, next);
    },
    querySelector: function(selector) {
      return this._parent.querySelector(selector);
    },
    querySelectorAll: function(selector) {
      return this._parent.querySelectorAll(selector);
    }
  };

  // node_modules/d3-selection/src/constant.js
  function constant_default(x2) {
    return function() {
      return x2;
    };
  }

  // node_modules/d3-selection/src/selection/data.js
  function bindIndex(parent, group, enter, update, exit, data) {
    var i3 = 0, node, groupLength = group.length, dataLength = data.length;
    for (; i3 < dataLength; ++i3) {
      if (node = group[i3]) {
        node.__data__ = data[i3];
        update[i3] = node;
      } else {
        enter[i3] = new EnterNode(parent, data[i3]);
      }
    }
    for (; i3 < groupLength; ++i3) {
      if (node = group[i3]) {
        exit[i3] = node;
      }
    }
  }
  function bindKey(parent, group, enter, update, exit, data, key) {
    var i3, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    for (i3 = 0; i3 < groupLength; ++i3) {
      if (node = group[i3]) {
        keyValues[i3] = keyValue = key.call(node, node.__data__, i3, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i3] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }
    for (i3 = 0; i3 < dataLength; ++i3) {
      keyValue = key.call(parent, data[i3], i3, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i3] = node;
        node.__data__ = data[i3];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i3] = new EnterNode(parent, data[i3]);
      }
    }
    for (i3 = 0; i3 < groupLength; ++i3) {
      if ((node = group[i3]) && nodeByKeyValue.get(keyValues[i3]) === node) {
        exit[i3] = node;
      }
    }
  }
  function datum(node) {
    return node.__data__;
  }
  function data_default(value, key) {
    if (!arguments.length) return Array.from(this, datum);
    var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
    if (typeof value !== "function") value = constant_default(value);
    for (var m3 = groups.length, update = new Array(m3), enter = new Array(m3), exit = new Array(m3), j3 = 0; j3 < m3; ++j3) {
      var parent = parents[j3], group = groups[j3], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j3, parents)), dataLength = data.length, enterGroup = enter[j3] = new Array(dataLength), updateGroup = update[j3] = new Array(dataLength), exitGroup = exit[j3] = new Array(groupLength);
      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
          previous._next = next || null;
        }
      }
    }
    update = new Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }
  function arraylike(data) {
    return typeof data === "object" && "length" in data ? data : Array.from(data);
  }

  // node_modules/d3-selection/src/selection/exit.js
  function exit_default() {
    return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
  }

  // node_modules/d3-selection/src/selection/join.js
  function join_default(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter) enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update) update = update.selection();
    }
    if (onexit == null) exit.remove();
    else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  // node_modules/d3-selection/src/selection/merge.js
  function merge_default(context) {
    var selection2 = context.selection ? context.selection() : context;
    for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m3 = Math.min(m0, m1), merges = new Array(m0), j3 = 0; j3 < m3; ++j3) {
      for (var group0 = groups0[j3], group1 = groups1[j3], n2 = group0.length, merge = merges[j3] = new Array(n2), node, i3 = 0; i3 < n2; ++i3) {
        if (node = group0[i3] || group1[i3]) {
          merge[i3] = node;
        }
      }
    }
    for (; j3 < m0; ++j3) {
      merges[j3] = groups0[j3];
    }
    return new Selection(merges, this._parents);
  }

  // node_modules/d3-selection/src/selection/order.js
  function order_default() {
    for (var groups = this._groups, j3 = -1, m3 = groups.length; ++j3 < m3; ) {
      for (var group = groups[j3], i3 = group.length - 1, next = group[i3], node; --i3 >= 0; ) {
        if (node = group[i3]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  }

  // node_modules/d3-selection/src/selection/sort.js
  function sort_default(compare) {
    if (!compare) compare = ascending;
    function compareNode(a3, b) {
      return a3 && b ? compare(a3.__data__, b.__data__) : !a3 - !b;
    }
    for (var groups = this._groups, m3 = groups.length, sortgroups = new Array(m3), j3 = 0; j3 < m3; ++j3) {
      for (var group = groups[j3], n2 = group.length, sortgroup = sortgroups[j3] = new Array(n2), node, i3 = 0; i3 < n2; ++i3) {
        if (node = group[i3]) {
          sortgroup[i3] = node;
        }
      }
      sortgroup.sort(compareNode);
    }
    return new Selection(sortgroups, this._parents).order();
  }
  function ascending(a3, b) {
    return a3 < b ? -1 : a3 > b ? 1 : a3 >= b ? 0 : NaN;
  }

  // node_modules/d3-selection/src/selection/call.js
  function call_default() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  // node_modules/d3-selection/src/selection/nodes.js
  function nodes_default() {
    return Array.from(this);
  }

  // node_modules/d3-selection/src/selection/node.js
  function node_default() {
    for (var groups = this._groups, j3 = 0, m3 = groups.length; j3 < m3; ++j3) {
      for (var group = groups[j3], i3 = 0, n2 = group.length; i3 < n2; ++i3) {
        var node = group[i3];
        if (node) return node;
      }
    }
    return null;
  }

  // node_modules/d3-selection/src/selection/size.js
  function size_default() {
    let size = 0;
    for (const node of this) ++size;
    return size;
  }

  // node_modules/d3-selection/src/selection/empty.js
  function empty_default() {
    return !this.node();
  }

  // node_modules/d3-selection/src/selection/each.js
  function each_default(callback) {
    for (var groups = this._groups, j3 = 0, m3 = groups.length; j3 < m3; ++j3) {
      for (var group = groups[j3], i3 = 0, n2 = group.length, node; i3 < n2; ++i3) {
        if (node = group[i3]) callback.call(node, node.__data__, i3, group);
      }
    }
    return this;
  }

  // node_modules/d3-selection/src/selection/attr.js
  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }
  function attrConstantNS(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }
  function attrFunction(name, value) {
    return function() {
      var v3 = value.apply(this, arguments);
      if (v3 == null) this.removeAttribute(name);
      else this.setAttribute(name, v3);
    };
  }
  function attrFunctionNS(fullname, value) {
    return function() {
      var v3 = value.apply(this, arguments);
      if (v3 == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v3);
    };
  }
  function attr_default(name, value) {
    var fullname = namespace_default(name);
    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }
    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
  }

  // node_modules/d3-selection/src/window.js
  function window_default(node) {
    return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
  }

  // node_modules/d3-selection/src/selection/style.js
  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }
  function styleFunction(name, value, priority) {
    return function() {
      var v3 = value.apply(this, arguments);
      if (v3 == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v3, priority);
    };
  }
  function style_default(name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
  }
  function styleValue(node, name) {
    return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  // node_modules/d3-selection/src/selection/property.js
  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }
  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }
  function propertyFunction(name, value) {
    return function() {
      var v3 = value.apply(this, arguments);
      if (v3 == null) delete this[name];
      else this[name] = v3;
    };
  }
  function property_default(name, value) {
    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
  }

  // node_modules/d3-selection/src/selection/classed.js
  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }
  function classList(node) {
    return node.classList || new ClassList(node);
  }
  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }
  ClassList.prototype = {
    add: function(name) {
      var i3 = this._names.indexOf(name);
      if (i3 < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i3 = this._names.indexOf(name);
      if (i3 >= 0) {
        this._names.splice(i3, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };
  function classedAdd(node, names) {
    var list = classList(node), i3 = -1, n2 = names.length;
    while (++i3 < n2) list.add(names[i3]);
  }
  function classedRemove(node, names) {
    var list = classList(node), i3 = -1, n2 = names.length;
    while (++i3 < n2) list.remove(names[i3]);
  }
  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }
  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }
  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }
  function classed_default(name, value) {
    var names = classArray(name + "");
    if (arguments.length < 2) {
      var list = classList(this.node()), i3 = -1, n2 = names.length;
      while (++i3 < n2) if (!list.contains(names[i3])) return false;
      return true;
    }
    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
  }

  // node_modules/d3-selection/src/selection/text.js
  function textRemove() {
    this.textContent = "";
  }
  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction(value) {
    return function() {
      var v3 = value.apply(this, arguments);
      this.textContent = v3 == null ? "" : v3;
    };
  }
  function text_default(value) {
    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
  }

  // node_modules/d3-selection/src/selection/html.js
  function htmlRemove() {
    this.innerHTML = "";
  }
  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }
  function htmlFunction(value) {
    return function() {
      var v3 = value.apply(this, arguments);
      this.innerHTML = v3 == null ? "" : v3;
    };
  }
  function html_default(value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
  }

  // node_modules/d3-selection/src/selection/raise.js
  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }
  function raise_default() {
    return this.each(raise);
  }

  // node_modules/d3-selection/src/selection/lower.js
  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function lower_default() {
    return this.each(lower);
  }

  // node_modules/d3-selection/src/selection/append.js
  function append_default(name) {
    var create2 = typeof name === "function" ? name : creator_default(name);
    return this.select(function() {
      return this.appendChild(create2.apply(this, arguments));
    });
  }

  // node_modules/d3-selection/src/selection/insert.js
  function constantNull() {
    return null;
  }
  function insert_default(name, before) {
    var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
    return this.select(function() {
      return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  // node_modules/d3-selection/src/selection/remove.js
  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }
  function remove_default() {
    return this.each(remove);
  }

  // node_modules/d3-selection/src/selection/clone.js
  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function clone_default(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  // node_modules/d3-selection/src/selection/datum.js
  function datum_default(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
  }

  // node_modules/d3-selection/src/selection/on.js
  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }
  function parseTypenames2(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t3) {
      var name = "", i3 = t3.indexOf(".");
      if (i3 >= 0) name = t3.slice(i3 + 1), t3 = t3.slice(0, i3);
      return { type: t3, name };
    });
  }
  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on) return;
      for (var j3 = 0, i3 = -1, m3 = on.length, o3; j3 < m3; ++j3) {
        if (o3 = on[j3], (!typename.type || o3.type === typename.type) && o3.name === typename.name) {
          this.removeEventListener(o3.type, o3.listener, o3.options);
        } else {
          on[++i3] = o3;
        }
      }
      if (++i3) on.length = i3;
      else delete this.__on;
    };
  }
  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o3, listener = contextListener(value);
      if (on) for (var j3 = 0, m3 = on.length; j3 < m3; ++j3) {
        if ((o3 = on[j3]).type === typename.type && o3.name === typename.name) {
          this.removeEventListener(o3.type, o3.listener, o3.options);
          this.addEventListener(o3.type, o3.listener = listener, o3.options = options);
          o3.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o3 = { type: typename.type, name: typename.name, value, listener, options };
      if (!on) this.__on = [o3];
      else on.push(o3);
    };
  }
  function on_default(typename, value, options) {
    var typenames = parseTypenames2(typename + ""), i3, n2 = typenames.length, t3;
    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on) for (var j3 = 0, m3 = on.length, o3; j3 < m3; ++j3) {
        for (i3 = 0, o3 = on[j3]; i3 < n2; ++i3) {
          if ((t3 = typenames[i3]).type === o3.type && t3.name === o3.name) {
            return o3.value;
          }
        }
      }
      return;
    }
    on = value ? onAdd : onRemove;
    for (i3 = 0; i3 < n2; ++i3) this.each(on(typenames[i3], value, options));
    return this;
  }

  // node_modules/d3-selection/src/selection/dispatch.js
  function dispatchEvent(node, type2, params) {
    var window2 = window_default(node), event = window2.CustomEvent;
    if (typeof event === "function") {
      event = new event(type2, params);
    } else {
      event = window2.document.createEvent("Event");
      if (params) event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
      else event.initEvent(type2, false, false);
    }
    node.dispatchEvent(event);
  }
  function dispatchConstant(type2, params) {
    return function() {
      return dispatchEvent(this, type2, params);
    };
  }
  function dispatchFunction(type2, params) {
    return function() {
      return dispatchEvent(this, type2, params.apply(this, arguments));
    };
  }
  function dispatch_default2(type2, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
  }

  // node_modules/d3-selection/src/selection/iterator.js
  function* iterator_default() {
    for (var groups = this._groups, j3 = 0, m3 = groups.length; j3 < m3; ++j3) {
      for (var group = groups[j3], i3 = 0, n2 = group.length, node; i3 < n2; ++i3) {
        if (node = group[i3]) yield node;
      }
    }
  }

  // node_modules/d3-selection/src/selection/index.js
  var root = [null];
  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }
  function selection() {
    return new Selection([[document.documentElement]], root);
  }
  function selection_selection() {
    return this;
  }
  Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: select_default,
    selectAll: selectAll_default,
    selectChild: selectChild_default,
    selectChildren: selectChildren_default,
    filter: filter_default,
    data: data_default,
    enter: enter_default,
    exit: exit_default,
    join: join_default,
    merge: merge_default,
    selection: selection_selection,
    order: order_default,
    sort: sort_default,
    call: call_default,
    nodes: nodes_default,
    node: node_default,
    size: size_default,
    empty: empty_default,
    each: each_default,
    attr: attr_default,
    style: style_default,
    property: property_default,
    classed: classed_default,
    text: text_default,
    html: html_default,
    raise: raise_default,
    lower: lower_default,
    append: append_default,
    insert: insert_default,
    remove: remove_default,
    clone: clone_default,
    datum: datum_default,
    on: on_default,
    dispatch: dispatch_default2,
    [Symbol.iterator]: iterator_default
  };
  var selection_default = selection;

  // node_modules/d3-selection/src/select.js
  function select_default2(selector) {
    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
  }

  // node_modules/d3-color/src/define.js
  function define_default(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  // node_modules/d3-color/src/color.js
  function Color() {
  }
  var darker = 0.7;
  var brighter = 1 / darker;
  var reI = "\\s*([+-]?\\d+)\\s*";
  var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
  var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
  var reHex = /^#([0-9a-f]{3,8})$/;
  var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
  var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
  var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
  var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
  var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
  var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
  var named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  define_default(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });
  function color_formatHex() {
    return this.rgb().formatHex();
  }
  function color_formatHex8() {
    return this.rgb().formatHex8();
  }
  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }
  function color_formatRgb() {
    return this.rgb().formatRgb();
  }
  function color(format) {
    var m3, l3;
    format = (format + "").trim().toLowerCase();
    return (m3 = reHex.exec(format)) ? (l3 = m3[1].length, m3 = parseInt(m3[1], 16), l3 === 6 ? rgbn(m3) : l3 === 3 ? new Rgb(m3 >> 8 & 15 | m3 >> 4 & 240, m3 >> 4 & 15 | m3 & 240, (m3 & 15) << 4 | m3 & 15, 1) : l3 === 8 ? rgba(m3 >> 24 & 255, m3 >> 16 & 255, m3 >> 8 & 255, (m3 & 255) / 255) : l3 === 4 ? rgba(m3 >> 12 & 15 | m3 >> 8 & 240, m3 >> 8 & 15 | m3 >> 4 & 240, m3 >> 4 & 15 | m3 & 240, ((m3 & 15) << 4 | m3 & 15) / 255) : null) : (m3 = reRgbInteger.exec(format)) ? new Rgb(m3[1], m3[2], m3[3], 1) : (m3 = reRgbPercent.exec(format)) ? new Rgb(m3[1] * 255 / 100, m3[2] * 255 / 100, m3[3] * 255 / 100, 1) : (m3 = reRgbaInteger.exec(format)) ? rgba(m3[1], m3[2], m3[3], m3[4]) : (m3 = reRgbaPercent.exec(format)) ? rgba(m3[1] * 255 / 100, m3[2] * 255 / 100, m3[3] * 255 / 100, m3[4]) : (m3 = reHslPercent.exec(format)) ? hsla(m3[1], m3[2] / 100, m3[3] / 100, 1) : (m3 = reHslaPercent.exec(format)) ? hsla(m3[1], m3[2] / 100, m3[3] / 100, m3[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }
  function rgbn(n2) {
    return new Rgb(n2 >> 16 & 255, n2 >> 8 & 255, n2 & 255, 1);
  }
  function rgba(r3, g2, b, a3) {
    if (a3 <= 0) r3 = g2 = b = NaN;
    return new Rgb(r3, g2, b, a3);
  }
  function rgbConvert(o3) {
    if (!(o3 instanceof Color)) o3 = color(o3);
    if (!o3) return new Rgb();
    o3 = o3.rgb();
    return new Rgb(o3.r, o3.g, o3.b, o3.opacity);
  }
  function rgb(r3, g2, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r3) : new Rgb(r3, g2, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r3, g2, b, opacity) {
    this.r = +r3;
    this.g = +g2;
    this.b = +b;
    this.opacity = +opacity;
  }
  define_default(Rgb, rgb, extend(Color, {
    brighter(k3) {
      k3 = k3 == null ? brighter : Math.pow(brighter, k3);
      return new Rgb(this.r * k3, this.g * k3, this.b * k3, this.opacity);
    },
    darker(k3) {
      k3 = k3 == null ? darker : Math.pow(darker, k3);
      return new Rgb(this.r * k3, this.g * k3, this.b * k3, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));
  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }
  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }
  function rgb_formatRgb() {
    const a3 = clampa(this.opacity);
    return `${a3 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a3 === 1 ? ")" : `, ${a3})`}`;
  }
  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }
  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }
  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }
  function hsla(h2, s3, l3, a3) {
    if (a3 <= 0) h2 = s3 = l3 = NaN;
    else if (l3 <= 0 || l3 >= 1) h2 = s3 = NaN;
    else if (s3 <= 0) h2 = NaN;
    return new Hsl(h2, s3, l3, a3);
  }
  function hslConvert(o3) {
    if (o3 instanceof Hsl) return new Hsl(o3.h, o3.s, o3.l, o3.opacity);
    if (!(o3 instanceof Color)) o3 = color(o3);
    if (!o3) return new Hsl();
    if (o3 instanceof Hsl) return o3;
    o3 = o3.rgb();
    var r3 = o3.r / 255, g2 = o3.g / 255, b = o3.b / 255, min2 = Math.min(r3, g2, b), max2 = Math.max(r3, g2, b), h2 = NaN, s3 = max2 - min2, l3 = (max2 + min2) / 2;
    if (s3) {
      if (r3 === max2) h2 = (g2 - b) / s3 + (g2 < b) * 6;
      else if (g2 === max2) h2 = (b - r3) / s3 + 2;
      else h2 = (r3 - g2) / s3 + 4;
      s3 /= l3 < 0.5 ? max2 + min2 : 2 - max2 - min2;
      h2 *= 60;
    } else {
      s3 = l3 > 0 && l3 < 1 ? 0 : h2;
    }
    return new Hsl(h2, s3, l3, o3.opacity);
  }
  function hsl(h2, s3, l3, opacity) {
    return arguments.length === 1 ? hslConvert(h2) : new Hsl(h2, s3, l3, opacity == null ? 1 : opacity);
  }
  function Hsl(h2, s3, l3, opacity) {
    this.h = +h2;
    this.s = +s3;
    this.l = +l3;
    this.opacity = +opacity;
  }
  define_default(Hsl, hsl, extend(Color, {
    brighter(k3) {
      k3 = k3 == null ? brighter : Math.pow(brighter, k3);
      return new Hsl(this.h, this.s, this.l * k3, this.opacity);
    },
    darker(k3) {
      k3 = k3 == null ? darker : Math.pow(darker, k3);
      return new Hsl(this.h, this.s, this.l * k3, this.opacity);
    },
    rgb() {
      var h2 = this.h % 360 + (this.h < 0) * 360, s3 = isNaN(h2) || isNaN(this.s) ? 0 : this.s, l3 = this.l, m22 = l3 + (l3 < 0.5 ? l3 : 1 - l3) * s3, m1 = 2 * l3 - m22;
      return new Rgb(
        hsl2rgb(h2 >= 240 ? h2 - 240 : h2 + 120, m1, m22),
        hsl2rgb(h2, m1, m22),
        hsl2rgb(h2 < 120 ? h2 + 240 : h2 - 120, m1, m22),
        this.opacity
      );
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a3 = clampa(this.opacity);
      return `${a3 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a3 === 1 ? ")" : `, ${a3})`}`;
    }
  }));
  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }
  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }
  function hsl2rgb(h2, m1, m22) {
    return (h2 < 60 ? m1 + (m22 - m1) * h2 / 60 : h2 < 180 ? m22 : h2 < 240 ? m1 + (m22 - m1) * (240 - h2) / 60 : m1) * 255;
  }

  // node_modules/d3-interpolate/src/basis.js
  function basis(t1, v0, v1, v22, v3) {
    var t22 = t1 * t1, t3 = t22 * t1;
    return ((1 - 3 * t1 + 3 * t22 - t3) * v0 + (4 - 6 * t22 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t22 - 3 * t3) * v22 + t3 * v3) / 6;
  }
  function basis_default(values) {
    var n2 = values.length - 1;
    return function(t3) {
      var i3 = t3 <= 0 ? t3 = 0 : t3 >= 1 ? (t3 = 1, n2 - 1) : Math.floor(t3 * n2), v1 = values[i3], v22 = values[i3 + 1], v0 = i3 > 0 ? values[i3 - 1] : 2 * v1 - v22, v3 = i3 < n2 - 1 ? values[i3 + 2] : 2 * v22 - v1;
      return basis((t3 - i3 / n2) * n2, v0, v1, v22, v3);
    };
  }

  // node_modules/d3-interpolate/src/basisClosed.js
  function basisClosed_default(values) {
    var n2 = values.length;
    return function(t3) {
      var i3 = Math.floor(((t3 %= 1) < 0 ? ++t3 : t3) * n2), v0 = values[(i3 + n2 - 1) % n2], v1 = values[i3 % n2], v22 = values[(i3 + 1) % n2], v3 = values[(i3 + 2) % n2];
      return basis((t3 - i3 / n2) * n2, v0, v1, v22, v3);
    };
  }

  // node_modules/d3-interpolate/src/constant.js
  var constant_default2 = (x2) => () => x2;

  // node_modules/d3-interpolate/src/color.js
  function linear(a3, d3) {
    return function(t3) {
      return a3 + t3 * d3;
    };
  }
  function exponential(a3, b, y3) {
    return a3 = Math.pow(a3, y3), b = Math.pow(b, y3) - a3, y3 = 1 / y3, function(t3) {
      return Math.pow(a3 + t3 * b, y3);
    };
  }
  function gamma(y3) {
    return (y3 = +y3) === 1 ? nogamma : function(a3, b) {
      return b - a3 ? exponential(a3, b, y3) : constant_default2(isNaN(a3) ? b : a3);
    };
  }
  function nogamma(a3, b) {
    var d3 = b - a3;
    return d3 ? linear(a3, d3) : constant_default2(isNaN(a3) ? b : a3);
  }

  // node_modules/d3-interpolate/src/rgb.js
  var rgb_default = function rgbGamma(y3) {
    var color2 = gamma(y3);
    function rgb2(start2, end) {
      var r3 = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g2 = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
      return function(t3) {
        start2.r = r3(t3);
        start2.g = g2(t3);
        start2.b = b(t3);
        start2.opacity = opacity(t3);
        return start2 + "";
      };
    }
    rgb2.gamma = rgbGamma;
    return rgb2;
  }(1);
  function rgbSpline(spline) {
    return function(colors) {
      var n2 = colors.length, r3 = new Array(n2), g2 = new Array(n2), b = new Array(n2), i3, color2;
      for (i3 = 0; i3 < n2; ++i3) {
        color2 = rgb(colors[i3]);
        r3[i3] = color2.r || 0;
        g2[i3] = color2.g || 0;
        b[i3] = color2.b || 0;
      }
      r3 = spline(r3);
      g2 = spline(g2);
      b = spline(b);
      color2.opacity = 1;
      return function(t3) {
        color2.r = r3(t3);
        color2.g = g2(t3);
        color2.b = b(t3);
        return color2 + "";
      };
    };
  }
  var rgbBasis = rgbSpline(basis_default);
  var rgbBasisClosed = rgbSpline(basisClosed_default);

  // node_modules/d3-interpolate/src/number.js
  function number_default(a3, b) {
    return a3 = +a3, b = +b, function(t3) {
      return a3 * (1 - t3) + b * t3;
    };
  }

  // node_modules/d3-interpolate/src/string.js
  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  var reB = new RegExp(reA.source, "g");
  function zero(b) {
    return function() {
      return b;
    };
  }
  function one(b) {
    return function(t3) {
      return b(t3) + "";
    };
  }
  function string_default(a3, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i3 = -1, s3 = [], q2 = [];
    a3 = a3 + "", b = b + "";
    while ((am = reA.exec(a3)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.slice(bi, bs);
        if (s3[i3]) s3[i3] += bs;
        else s3[++i3] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        if (s3[i3]) s3[i3] += bm;
        else s3[++i3] = bm;
      } else {
        s3[++i3] = null;
        q2.push({ i: i3, x: number_default(am, bm) });
      }
      bi = reB.lastIndex;
    }
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s3[i3]) s3[i3] += bs;
      else s3[++i3] = bs;
    }
    return s3.length < 2 ? q2[0] ? one(q2[0].x) : zero(b) : (b = q2.length, function(t3) {
      for (var i4 = 0, o3; i4 < b; ++i4) s3[(o3 = q2[i4]).i] = o3.x(t3);
      return s3.join("");
    });
  }

  // node_modules/d3-interpolate/src/transform/decompose.js
  var degrees = 180 / Math.PI;
  var identity = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };
  function decompose_default(a3, b, c3, d3, e3, f3) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a3 * a3 + b * b)) a3 /= scaleX, b /= scaleX;
    if (skewX = a3 * c3 + b * d3) c3 -= a3 * skewX, d3 -= b * skewX;
    if (scaleY = Math.sqrt(c3 * c3 + d3 * d3)) c3 /= scaleY, d3 /= scaleY, skewX /= scaleY;
    if (a3 * d3 < b * c3) a3 = -a3, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e3,
      translateY: f3,
      rotate: Math.atan2(b, a3) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX,
      scaleY
    };
  }

  // node_modules/d3-interpolate/src/transform/parse.js
  var svgNode;
  function parseCss(value) {
    const m3 = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m3.isIdentity ? identity : decompose_default(m3.a, m3.b, m3.c, m3.d, m3.e, m3.f);
  }
  function parseSvg(value) {
    if (value == null) return identity;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
    value = value.matrix;
    return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  // node_modules/d3-interpolate/src/transform/index.js
  function interpolateTransform(parse, pxComma, pxParen, degParen) {
    function pop(s3) {
      return s3.length ? s3.pop() + " " : "";
    }
    function translate(xa, ya, xb, yb, s3, q2) {
      if (xa !== xb || ya !== yb) {
        var i3 = s3.push("translate(", null, pxComma, null, pxParen);
        q2.push({ i: i3 - 4, x: number_default(xa, xb) }, { i: i3 - 2, x: number_default(ya, yb) });
      } else if (xb || yb) {
        s3.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }
    function rotate(a3, b, s3, q2) {
      if (a3 !== b) {
        if (a3 - b > 180) b += 360;
        else if (b - a3 > 180) a3 += 360;
        q2.push({ i: s3.push(pop(s3) + "rotate(", null, degParen) - 2, x: number_default(a3, b) });
      } else if (b) {
        s3.push(pop(s3) + "rotate(" + b + degParen);
      }
    }
    function skewX(a3, b, s3, q2) {
      if (a3 !== b) {
        q2.push({ i: s3.push(pop(s3) + "skewX(", null, degParen) - 2, x: number_default(a3, b) });
      } else if (b) {
        s3.push(pop(s3) + "skewX(" + b + degParen);
      }
    }
    function scale(xa, ya, xb, yb, s3, q2) {
      if (xa !== xb || ya !== yb) {
        var i3 = s3.push(pop(s3) + "scale(", null, ",", null, ")");
        q2.push({ i: i3 - 4, x: number_default(xa, xb) }, { i: i3 - 2, x: number_default(ya, yb) });
      } else if (xb !== 1 || yb !== 1) {
        s3.push(pop(s3) + "scale(" + xb + "," + yb + ")");
      }
    }
    return function(a3, b) {
      var s3 = [], q2 = [];
      a3 = parse(a3), b = parse(b);
      translate(a3.translateX, a3.translateY, b.translateX, b.translateY, s3, q2);
      rotate(a3.rotate, b.rotate, s3, q2);
      skewX(a3.skewX, b.skewX, s3, q2);
      scale(a3.scaleX, a3.scaleY, b.scaleX, b.scaleY, s3, q2);
      a3 = b = null;
      return function(t3) {
        var i3 = -1, n2 = q2.length, o3;
        while (++i3 < n2) s3[(o3 = q2[i3]).i] = o3.x(t3);
        return s3.join("");
      };
    };
  }
  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  // node_modules/d3-timer/src/timer.js
  var frame = 0;
  var timeout = 0;
  var interval = 0;
  var pokeDelay = 1e3;
  var taskHead;
  var taskTail;
  var clockLast = 0;
  var clockNow = 0;
  var clockSkew = 0;
  var clock = typeof performance === "object" && performance.now ? performance : Date;
  var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f3) {
    setTimeout(f3, 17);
  };
  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }
  function clearNow() {
    clockNow = 0;
  }
  function Timer() {
    this._call = this._time = this._next = null;
  }
  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };
  function timer(callback, delay, time) {
    var t3 = new Timer();
    t3.restart(callback, delay, time);
    return t3;
  }
  function timerFlush() {
    now();
    ++frame;
    var t3 = taskHead, e3;
    while (t3) {
      if ((e3 = clockNow - t3._time) >= 0) t3._call.call(void 0, e3);
      t3 = t3._next;
    }
    --frame;
  }
  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }
  function poke() {
    var now2 = clock.now(), delay = now2 - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
  }
  function nap() {
    var t0, t1 = taskHead, t22, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t22 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t22 : taskHead = t22;
      }
    }
    taskTail = t0;
    sleep(time);
  }
  function sleep(time) {
    if (frame) return;
    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow;
    if (delay > 24) {
      if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  // node_modules/d3-timer/src/timeout.js
  function timeout_default(callback, delay, time) {
    var t3 = new Timer();
    delay = delay == null ? 0 : +delay;
    t3.restart((elapsed) => {
      t3.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t3;
  }

  // node_modules/d3-transition/src/transition/schedule.js
  var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
  var emptyTween = [];
  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;
  function schedule_default(node, name, id2, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id2 in schedules) return;
    create(node, id2, {
      name,
      index,
      // For context during callback.
      group,
      // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }
  function init(node, id2) {
    var schedule = get2(node, id2);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }
  function set2(node, id2) {
    var schedule = get2(node, id2);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }
  function get2(node, id2) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id2])) throw new Error("transition not found");
    return schedule;
  }
  function create(node, id2, self) {
    var schedules = node.__transition, tween;
    schedules[id2] = self;
    self.timer = timer(schedule, 0, self.time);
    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start2, self.delay, self.time);
      if (self.delay <= elapsed) start2(elapsed - self.delay);
    }
    function start2(elapsed) {
      var i3, j3, n2, o3;
      if (self.state !== SCHEDULED) return stop();
      for (i3 in schedules) {
        o3 = schedules[i3];
        if (o3.name !== self.name) continue;
        if (o3.state === STARTED) return timeout_default(start2);
        if (o3.state === RUNNING) {
          o3.state = ENDED;
          o3.timer.stop();
          o3.on.call("interrupt", node, node.__data__, o3.index, o3.group);
          delete schedules[i3];
        } else if (+i3 < id2) {
          o3.state = ENDED;
          o3.timer.stop();
          o3.on.call("cancel", node, node.__data__, o3.index, o3.group);
          delete schedules[i3];
        }
      }
      timeout_default(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING) return;
      self.state = STARTED;
      tween = new Array(n2 = self.tween.length);
      for (i3 = 0, j3 = -1; i3 < n2; ++i3) {
        if (o3 = self.tween[i3].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j3] = o3;
        }
      }
      tween.length = j3 + 1;
    }
    function tick(elapsed) {
      var t3 = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i3 = -1, n2 = tween.length;
      while (++i3 < n2) {
        tween[i3].call(node, t3);
      }
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }
    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id2];
      for (var i3 in schedules) return;
      delete node.__transition;
    }
  }

  // node_modules/d3-transition/src/interrupt.js
  function interrupt_default(node, name) {
    var schedules = node.__transition, schedule, active, empty2 = true, i3;
    if (!schedules) return;
    name = name == null ? null : name + "";
    for (i3 in schedules) {
      if ((schedule = schedules[i3]).name !== name) {
        empty2 = false;
        continue;
      }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i3];
    }
    if (empty2) delete node.__transition;
  }

  // node_modules/d3-transition/src/selection/interrupt.js
  function interrupt_default2(name) {
    return this.each(function() {
      interrupt_default(this, name);
    });
  }

  // node_modules/d3-transition/src/transition/tween.js
  function tweenRemove(id2, name) {
    var tween0, tween1;
    return function() {
      var schedule = set2(this, id2), tween = schedule.tween;
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i3 = 0, n2 = tween1.length; i3 < n2; ++i3) {
          if (tween1[i3].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i3, 1);
            break;
          }
        }
      }
      schedule.tween = tween1;
    };
  }
  function tweenFunction(id2, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error();
    return function() {
      var schedule = set2(this, id2), tween = schedule.tween;
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t3 = { name, value }, i3 = 0, n2 = tween1.length; i3 < n2; ++i3) {
          if (tween1[i3].name === name) {
            tween1[i3] = t3;
            break;
          }
        }
        if (i3 === n2) tween1.push(t3);
      }
      schedule.tween = tween1;
    };
  }
  function tween_default(name, value) {
    var id2 = this._id;
    name += "";
    if (arguments.length < 2) {
      var tween = get2(this.node(), id2).tween;
      for (var i3 = 0, n2 = tween.length, t3; i3 < n2; ++i3) {
        if ((t3 = tween[i3]).name === name) {
          return t3.value;
        }
      }
      return null;
    }
    return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
  }
  function tweenValue(transition2, name, value) {
    var id2 = transition2._id;
    transition2.each(function() {
      var schedule = set2(this, id2);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });
    return function(node) {
      return get2(node, id2).value[name];
    };
  }

  // node_modules/d3-transition/src/transition/interpolate.js
  function interpolate_default(a3, b) {
    var c3;
    return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c3 = color(b)) ? (b = c3, rgb_default) : string_default)(a3, b);
  }

  // node_modules/d3-transition/src/transition/attr.js
  function attrRemove2(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS2(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant2(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function attrConstantNS2(fullname, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function attrFunction2(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function attrFunctionNS2(fullname, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function attr_default2(name, value) {
    var fullname = namespace_default(name), i3 = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
    return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i3, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i3, value));
  }

  // node_modules/d3-transition/src/transition/attrTween.js
  function attrInterpolate(name, i3) {
    return function(t3) {
      this.setAttribute(name, i3.call(this, t3));
    };
  }
  function attrInterpolateNS(fullname, i3) {
    return function(t3) {
      this.setAttributeNS(fullname.space, fullname.local, i3.call(this, t3));
    };
  }
  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i3 = value.apply(this, arguments);
      if (i3 !== i0) t0 = (i0 = i3) && attrInterpolateNS(fullname, i3);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i3 = value.apply(this, arguments);
      if (i3 !== i0) t0 = (i0 = i3) && attrInterpolate(name, i3);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function attrTween_default(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error();
    var fullname = namespace_default(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  // node_modules/d3-transition/src/transition/delay.js
  function delayFunction(id2, value) {
    return function() {
      init(this, id2).delay = +value.apply(this, arguments);
    };
  }
  function delayConstant(id2, value) {
    return value = +value, function() {
      init(this, id2).delay = value;
    };
  }
  function delay_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
  }

  // node_modules/d3-transition/src/transition/duration.js
  function durationFunction(id2, value) {
    return function() {
      set2(this, id2).duration = +value.apply(this, arguments);
    };
  }
  function durationConstant(id2, value) {
    return value = +value, function() {
      set2(this, id2).duration = value;
    };
  }
  function duration_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
  }

  // node_modules/d3-transition/src/transition/ease.js
  function easeConstant(id2, value) {
    if (typeof value !== "function") throw new Error();
    return function() {
      set2(this, id2).ease = value;
    };
  }
  function ease_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
  }

  // node_modules/d3-transition/src/transition/easeVarying.js
  function easeVarying(id2, value) {
    return function() {
      var v3 = value.apply(this, arguments);
      if (typeof v3 !== "function") throw new Error();
      set2(this, id2).ease = v3;
    };
  }
  function easeVarying_default(value) {
    if (typeof value !== "function") throw new Error();
    return this.each(easeVarying(this._id, value));
  }

  // node_modules/d3-transition/src/transition/filter.js
  function filter_default2(match) {
    if (typeof match !== "function") match = matcher_default(match);
    for (var groups = this._groups, m3 = groups.length, subgroups = new Array(m3), j3 = 0; j3 < m3; ++j3) {
      for (var group = groups[j3], n2 = group.length, subgroup = subgroups[j3] = [], node, i3 = 0; i3 < n2; ++i3) {
        if ((node = group[i3]) && match.call(node, node.__data__, i3, group)) {
          subgroup.push(node);
        }
      }
    }
    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  // node_modules/d3-transition/src/transition/merge.js
  function merge_default2(transition2) {
    if (transition2._id !== this._id) throw new Error();
    for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m3 = Math.min(m0, m1), merges = new Array(m0), j3 = 0; j3 < m3; ++j3) {
      for (var group0 = groups0[j3], group1 = groups1[j3], n2 = group0.length, merge = merges[j3] = new Array(n2), node, i3 = 0; i3 < n2; ++i3) {
        if (node = group0[i3] || group1[i3]) {
          merge[i3] = node;
        }
      }
    }
    for (; j3 < m0; ++j3) {
      merges[j3] = groups0[j3];
    }
    return new Transition(merges, this._parents, this._name, this._id);
  }

  // node_modules/d3-transition/src/transition/on.js
  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t3) {
      var i3 = t3.indexOf(".");
      if (i3 >= 0) t3 = t3.slice(0, i3);
      return !t3 || t3 === "start";
    });
  }
  function onFunction(id2, name, listener) {
    var on0, on1, sit = start(name) ? init : set2;
    return function() {
      var schedule = sit(this, id2), on = schedule.on;
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
      schedule.on = on1;
    };
  }
  function on_default2(name, listener) {
    var id2 = this._id;
    return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
  }

  // node_modules/d3-transition/src/transition/remove.js
  function removeFunction(id2) {
    return function() {
      var parent = this.parentNode;
      for (var i3 in this.__transition) if (+i3 !== id2) return;
      if (parent) parent.removeChild(this);
    };
  }
  function remove_default2() {
    return this.on("end.remove", removeFunction(this._id));
  }

  // node_modules/d3-transition/src/transition/select.js
  function select_default3(select) {
    var name = this._name, id2 = this._id;
    if (typeof select !== "function") select = selector_default(select);
    for (var groups = this._groups, m3 = groups.length, subgroups = new Array(m3), j3 = 0; j3 < m3; ++j3) {
      for (var group = groups[j3], n2 = group.length, subgroup = subgroups[j3] = new Array(n2), node, subnode, i3 = 0; i3 < n2; ++i3) {
        if ((node = group[i3]) && (subnode = select.call(node, node.__data__, i3, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i3] = subnode;
          schedule_default(subgroup[i3], name, id2, i3, subgroup, get2(node, id2));
        }
      }
    }
    return new Transition(subgroups, this._parents, name, id2);
  }

  // node_modules/d3-transition/src/transition/selectAll.js
  function selectAll_default2(select) {
    var name = this._name, id2 = this._id;
    if (typeof select !== "function") select = selectorAll_default(select);
    for (var groups = this._groups, m3 = groups.length, subgroups = [], parents = [], j3 = 0; j3 < m3; ++j3) {
      for (var group = groups[j3], n2 = group.length, node, i3 = 0; i3 < n2; ++i3) {
        if (node = group[i3]) {
          for (var children2 = select.call(node, node.__data__, i3, group), child, inherit2 = get2(node, id2), k3 = 0, l3 = children2.length; k3 < l3; ++k3) {
            if (child = children2[k3]) {
              schedule_default(child, name, id2, k3, children2, inherit2);
            }
          }
          subgroups.push(children2);
          parents.push(node);
        }
      }
    }
    return new Transition(subgroups, parents, name, id2);
  }

  // node_modules/d3-transition/src/transition/selection.js
  var Selection2 = selection_default.prototype.constructor;
  function selection_default2() {
    return new Selection2(this._groups, this._parents);
  }

  // node_modules/d3-transition/src/transition/style.js
  function styleNull(name, interpolate) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }
  function styleRemove2(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant2(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function styleFunction2(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function styleMaybeRemove(id2, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
    return function() {
      var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
      schedule.on = on1;
    };
  }
  function style_default2(name, value, priority) {
    var i3 = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
    return value == null ? this.styleTween(name, styleNull(name, i3)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i3, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i3, value), priority).on("end.style." + name, null);
  }

  // node_modules/d3-transition/src/transition/styleTween.js
  function styleInterpolate(name, i3, priority) {
    return function(t3) {
      this.style.setProperty(name, i3.call(this, t3), priority);
    };
  }
  function styleTween(name, value, priority) {
    var t3, i0;
    function tween() {
      var i3 = value.apply(this, arguments);
      if (i3 !== i0) t3 = (i0 = i3) && styleInterpolate(name, i3, priority);
      return t3;
    }
    tween._value = value;
    return tween;
  }
  function styleTween_default(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error();
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  // node_modules/d3-transition/src/transition/text.js
  function textConstant2(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction2(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }
  function text_default2(value) {
    return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
  }

  // node_modules/d3-transition/src/transition/textTween.js
  function textInterpolate(i3) {
    return function(t3) {
      this.textContent = i3.call(this, t3);
    };
  }
  function textTween(value) {
    var t0, i0;
    function tween() {
      var i3 = value.apply(this, arguments);
      if (i3 !== i0) t0 = (i0 = i3) && textInterpolate(i3);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function textTween_default(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error();
    return this.tween(key, textTween(value));
  }

  // node_modules/d3-transition/src/transition/transition.js
  function transition_default() {
    var name = this._name, id0 = this._id, id1 = newId();
    for (var groups = this._groups, m3 = groups.length, j3 = 0; j3 < m3; ++j3) {
      for (var group = groups[j3], n2 = group.length, node, i3 = 0; i3 < n2; ++i3) {
        if (node = group[i3]) {
          var inherit2 = get2(node, id0);
          schedule_default(node, name, id1, i3, group, {
            time: inherit2.time + inherit2.delay + inherit2.duration,
            delay: 0,
            duration: inherit2.duration,
            ease: inherit2.ease
          });
        }
      }
    }
    return new Transition(groups, this._parents, name, id1);
  }

  // node_modules/d3-transition/src/transition/end.js
  function end_default() {
    var on0, on1, that = this, id2 = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = { value: reject }, end = { value: function() {
        if (--size === 0) resolve();
      } };
      that.each(function() {
        var schedule = set2(this, id2), on = schedule.on;
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }
        schedule.on = on1;
      });
      if (size === 0) resolve();
    });
  }

  // node_modules/d3-transition/src/transition/index.js
  var id = 0;
  function Transition(groups, parents, name, id2) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id2;
  }
  function transition(name) {
    return selection_default().transition(name);
  }
  function newId() {
    return ++id;
  }
  var selection_prototype = selection_default.prototype;
  Transition.prototype = transition.prototype = {
    constructor: Transition,
    select: select_default3,
    selectAll: selectAll_default2,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: filter_default2,
    merge: merge_default2,
    selection: selection_default2,
    transition: transition_default,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: on_default2,
    attr: attr_default2,
    attrTween: attrTween_default,
    style: style_default2,
    styleTween: styleTween_default,
    text: text_default2,
    textTween: textTween_default,
    remove: remove_default2,
    tween: tween_default,
    delay: delay_default,
    duration: duration_default,
    ease: ease_default,
    easeVarying: easeVarying_default,
    end: end_default,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  // node_modules/d3-ease/src/cubic.js
  function cubicInOut(t3) {
    return ((t3 *= 2) <= 1 ? t3 * t3 * t3 : (t3 -= 2) * t3 * t3 + 2) / 2;
  }

  // node_modules/d3-transition/src/selection/transition.js
  var defaultTiming = {
    time: null,
    // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };
  function inherit(node, id2) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id2])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id2} not found`);
      }
    }
    return timing;
  }
  function transition_default2(name) {
    var id2, timing;
    if (name instanceof Transition) {
      id2 = name._id, name = name._name;
    } else {
      id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }
    for (var groups = this._groups, m3 = groups.length, j3 = 0; j3 < m3; ++j3) {
      for (var group = groups[j3], n2 = group.length, node, i3 = 0; i3 < n2; ++i3) {
        if (node = group[i3]) {
          schedule_default(node, name, id2, i3, group, timing || inherit(node, id2));
        }
      }
    }
    return new Transition(groups, this._parents, name, id2);
  }

  // node_modules/d3-transition/src/selection/index.js
  selection_default.prototype.interrupt = interrupt_default2;
  selection_default.prototype.transition = transition_default2;

  // node_modules/d3-brush/src/brush.js
  var { abs, max, min } = Math;
  function number1(e3) {
    return [+e3[0], +e3[1]];
  }
  function number2(e3) {
    return [number1(e3[0]), number1(e3[1])];
  }
  var X = {
    name: "x",
    handles: ["w", "e"].map(type),
    input: function(x2, e3) {
      return x2 == null ? null : [[+x2[0], e3[0][1]], [+x2[1], e3[1][1]]];
    },
    output: function(xy) {
      return xy && [xy[0][0], xy[1][0]];
    }
  };
  var Y = {
    name: "y",
    handles: ["n", "s"].map(type),
    input: function(y3, e3) {
      return y3 == null ? null : [[e3[0][0], +y3[0]], [e3[1][0], +y3[1]]];
    },
    output: function(xy) {
      return xy && [xy[0][1], xy[1][1]];
    }
  };
  var XY = {
    name: "xy",
    handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
    input: function(xy) {
      return xy == null ? null : number2(xy);
    },
    output: function(xy) {
      return xy;
    }
  };
  function type(t3) {
    return { type: t3 };
  }

  // node_modules/d3-zoom/src/transform.js
  function Transform(k3, x2, y3) {
    this.k = k3;
    this.x = x2;
    this.y = y3;
  }
  Transform.prototype = {
    constructor: Transform,
    scale: function(k3) {
      return k3 === 1 ? this : new Transform(this.k * k3, this.x, this.y);
    },
    translate: function(x2, y3) {
      return x2 === 0 & y3 === 0 ? this : new Transform(this.k, this.x + this.k * x2, this.y + this.k * y3);
    },
    apply: function(point) {
      return [point[0] * this.k + this.x, point[1] * this.k + this.y];
    },
    applyX: function(x2) {
      return x2 * this.k + this.x;
    },
    applyY: function(y3) {
      return y3 * this.k + this.y;
    },
    invert: function(location) {
      return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
    },
    invertX: function(x2) {
      return (x2 - this.x) / this.k;
    },
    invertY: function(y3) {
      return (y3 - this.y) / this.k;
    },
    rescaleX: function(x2) {
      return x2.copy().domain(x2.range().map(this.invertX, this).map(x2.invert, x2));
    },
    rescaleY: function(y3) {
      return y3.copy().domain(y3.range().map(this.invertY, this).map(y3.invert, y3));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };
  var identity2 = new Transform(1, 0, 0);
  transform.prototype = Transform.prototype;
  function transform(node) {
    while (!node.__zoom) if (!(node = node.parentNode)) return identity2;
    return node.__zoom;
  }

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var r;
  var o;
  var e;
  var f;
  var c;
  var s;
  var a;
  var h;
  var p = {};
  var v = [];
  var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var d = Array.isArray;
  function w(n2, l3) {
    for (var u3 in l3) n2[u3] = l3[u3];
    return n2;
  }
  function _(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function g(l3, u3, t3) {
    var i3, r3, o3, e3 = {};
    for (o3 in u3) "key" == o3 ? i3 = u3[o3] : "ref" == o3 ? r3 = u3[o3] : e3[o3] = u3[o3];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
    return m(l3, e3, i3, r3, null);
  }
  function m(n2, t3, i3, r3, o3) {
    var e3 = { type: n2, props: t3, key: i3, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e3), e3;
  }
  function k(n2) {
    return n2.children;
  }
  function x(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function C(n2, l3) {
    if (null == l3) return n2.__ ? C(n2.__, n2.__i + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++) if (null != (u3 = n2.__k[l3]) && null != u3.__e) return u3.__e;
    return "function" == typeof n2.type ? C(n2) : null;
  }
  function S(n2) {
    var l3, u3;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++) if (null != (u3 = n2.__k[l3]) && null != u3.__e) {
        n2.__e = n2.__c.base = u3.__e;
        break;
      }
      return S(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !P.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(P);
  }
  function P() {
    var n2, u3, t3, r3, o3, f3, c3, s3;
    for (i.sort(e); n2 = i.shift(); ) n2.__d && (u3 = i.length, r3 = void 0, f3 = (o3 = (t3 = n2).__v).__e, c3 = [], s3 = [], t3.__P && ((r3 = w({}, o3)).__v = o3.__v + 1, l.vnode && l.vnode(r3), j(t3.__P, r3, o3, t3.__n, t3.__P.namespaceURI, 32 & o3.__u ? [f3] : null, c3, null == f3 ? C(o3) : f3, !!(32 & o3.__u), s3), r3.__v = o3.__v, r3.__.__k[r3.__i] = r3, z(c3, r3, s3), r3.__e != f3 && S(r3)), i.length > u3 && i.sort(e));
    P.__r = 0;
  }
  function $(n2, l3, u3, t3, i3, r3, o3, e3, f3, c3, s3) {
    var a3, h2, y3, d3, w3, _2, g2 = t3 && t3.__k || v, m3 = l3.length;
    for (f3 = I(u3, l3, g2, f3, m3), a3 = 0; a3 < m3; a3++) null != (y3 = u3.__k[a3]) && (h2 = -1 === y3.__i ? p : g2[y3.__i] || p, y3.__i = a3, _2 = j(n2, y3, h2, i3, r3, o3, e3, f3, c3, s3), d3 = y3.__e, y3.ref && h2.ref != y3.ref && (h2.ref && V(h2.ref, null, y3), s3.push(y3.ref, y3.__c || d3, y3)), null == w3 && null != d3 && (w3 = d3), 4 & y3.__u || h2.__k === y3.__k ? f3 = A(y3, f3, n2) : "function" == typeof y3.type && void 0 !== _2 ? f3 = _2 : d3 && (f3 = d3.nextSibling), y3.__u &= -7);
    return u3.__e = w3, f3;
  }
  function I(n2, l3, u3, t3, i3) {
    var r3, o3, e3, f3, c3, s3 = u3.length, a3 = s3, h2 = 0;
    for (n2.__k = new Array(i3), r3 = 0; r3 < i3; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? (f3 = r3 + h2, (o3 = n2.__k[r3] = "string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? m(null, o3, null, null, null) : d(o3) ? m(k, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? m(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : o3).__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 !== (c3 = o3.__i = L(o3, u3, f3, a3)) && (a3--, (e3 = u3[c3]) && (e3.__u |= 2)), null == e3 || null === e3.__v ? (-1 == c3 && h2--, "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f3 && (c3 == f3 - 1 ? h2-- : c3 == f3 + 1 ? h2++ : (c3 > f3 ? h2-- : h2++, o3.__u |= 4))) : n2.__k[r3] = null;
    if (a3) for (r3 = 0; r3 < s3; r3++) null != (e3 = u3[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = C(e3)), q(e3, e3));
    return t3;
  }
  function A(n2, l3, u3) {
    var t3, i3;
    if ("function" == typeof n2.type) {
      for (t3 = n2.__k, i3 = 0; t3 && i3 < t3.length; i3++) t3[i3] && (t3[i3].__ = n2, l3 = A(t3[i3], l3, u3));
      return l3;
    }
    n2.__e != l3 && (l3 && n2.type && !u3.contains(l3) && (l3 = C(n2)), u3.insertBefore(n2.__e, l3 || null), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function L(n2, l3, u3, t3) {
    var i3, r3, o3 = n2.key, e3 = n2.type, f3 = l3[u3];
    if (null === f3 || f3 && o3 == f3.key && e3 === f3.type && 0 == (2 & f3.__u)) return u3;
    if (t3 > (null != f3 && 0 == (2 & f3.__u) ? 1 : 0)) for (i3 = u3 - 1, r3 = u3 + 1; i3 >= 0 || r3 < l3.length; ) {
      if (i3 >= 0) {
        if ((f3 = l3[i3]) && 0 == (2 & f3.__u) && o3 == f3.key && e3 === f3.type) return i3;
        i3--;
      }
      if (r3 < l3.length) {
        if ((f3 = l3[r3]) && 0 == (2 & f3.__u) && o3 == f3.key && e3 === f3.type) return r3;
        r3++;
      }
    }
    return -1;
  }
  function T(n2, l3, u3) {
    "-" == l3[0] ? n2.setProperty(l3, null == u3 ? "" : u3) : n2[l3] = null == u3 ? "" : "number" != typeof u3 || y.test(l3) ? u3 : u3 + "px";
  }
  function F(n2, l3, u3, t3, i3) {
    var r3;
    n: if ("style" == l3) if ("string" == typeof u3) n2.style.cssText = u3;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u3 && l3 in u3 || T(n2.style, l3, "");
      if (u3) for (l3 in u3) t3 && u3[l3] === t3[l3] || T(n2.style, l3, u3[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(f, "$1")), l3 = l3.toLowerCase() in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u3, u3 ? t3 ? u3.u = t3.u : (u3.u = c, n2.addEventListener(l3, r3 ? a : s, r3)) : n2.removeEventListener(l3, r3 ? a : s, r3);
    else {
      if ("http://www.w3.org/2000/svg" == i3) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == u3 ? "" : u3;
        break n;
      } catch (n3) {
      }
      "function" == typeof u3 || (null == u3 || false === u3 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u3 ? "" : u3));
    }
  }
  function O(n2) {
    return function(u3) {
      if (this.l) {
        var t3 = this.l[u3.type + n2];
        if (null == u3.t) u3.t = c++;
        else if (u3.t < t3.u) return;
        return t3(l.event ? l.event(u3) : u3);
      }
    };
  }
  function j(n2, u3, t3, i3, r3, o3, e3, f3, c3, s3) {
    var a3, h2, p2, v3, y3, g2, m3, b, C3, S2, M2, P2, I2, A3, H, L2, T3, F2 = u3.type;
    if (void 0 !== u3.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f3 = u3.__e = t3.__e]), (a3 = l.__b) && a3(u3);
    n: if ("function" == typeof F2) try {
      if (b = u3.props, C3 = "prototype" in F2 && F2.prototype.render, S2 = (a3 = F2.contextType) && i3[a3.__c], M2 = a3 ? S2 ? S2.props.value : a3.__ : i3, t3.__c ? m3 = (h2 = u3.__c = t3.__c).__ = h2.__E : (C3 ? u3.__c = h2 = new F2(b, M2) : (u3.__c = h2 = new x(b, M2), h2.constructor = F2, h2.render = B), S2 && S2.sub(h2), h2.props = b, h2.state || (h2.state = {}), h2.context = M2, h2.__n = i3, p2 = h2.__d = true, h2.__h = [], h2._sb = []), C3 && null == h2.__s && (h2.__s = h2.state), C3 && null != F2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = w({}, h2.__s)), w(h2.__s, F2.getDerivedStateFromProps(b, h2.__s))), v3 = h2.props, y3 = h2.state, h2.__v = u3, p2) C3 && null == F2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), C3 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
      else {
        if (C3 && null == F2.getDerivedStateFromProps && b !== v3 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(b, M2), !h2.__e && (null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(b, h2.__s, M2) || u3.__v == t3.__v)) {
          for (u3.__v != t3.__v && (h2.props = b, h2.state = h2.__s, h2.__d = false), u3.__e = t3.__e, u3.__k = t3.__k, u3.__k.some(function(n3) {
            n3 && (n3.__ = u3);
          }), P2 = 0; P2 < h2._sb.length; P2++) h2.__h.push(h2._sb[P2]);
          h2._sb = [], h2.__h.length && e3.push(h2);
          break n;
        }
        null != h2.componentWillUpdate && h2.componentWillUpdate(b, h2.__s, M2), C3 && null != h2.componentDidUpdate && h2.__h.push(function() {
          h2.componentDidUpdate(v3, y3, g2);
        });
      }
      if (h2.context = M2, h2.props = b, h2.__P = n2, h2.__e = false, I2 = l.__r, A3 = 0, C3) {
        for (h2.state = h2.__s, h2.__d = false, I2 && I2(u3), a3 = h2.render(h2.props, h2.state, h2.context), H = 0; H < h2._sb.length; H++) h2.__h.push(h2._sb[H]);
        h2._sb = [];
      } else do {
        h2.__d = false, I2 && I2(u3), a3 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
      } while (h2.__d && ++A3 < 25);
      h2.state = h2.__s, null != h2.getChildContext && (i3 = w(w({}, i3), h2.getChildContext())), C3 && !p2 && null != h2.getSnapshotBeforeUpdate && (g2 = h2.getSnapshotBeforeUpdate(v3, y3)), f3 = $(n2, d(L2 = null != a3 && a3.type === k && null == a3.key ? a3.props.children : a3) ? L2 : [L2], u3, t3, i3, r3, o3, e3, f3, c3, s3), h2.base = u3.__e, u3.__u &= -161, h2.__h.length && e3.push(h2), m3 && (h2.__E = h2.__ = null);
    } catch (n3) {
      if (u3.__v = null, c3 || null != o3) if (n3.then) {
        for (u3.__u |= c3 ? 160 : 128; f3 && 8 == f3.nodeType && f3.nextSibling; ) f3 = f3.nextSibling;
        o3[o3.indexOf(f3)] = null, u3.__e = f3;
      } else for (T3 = o3.length; T3--; ) _(o3[T3]);
      else u3.__e = t3.__e, u3.__k = t3.__k;
      l.__e(n3, u3, t3);
    }
    else null == o3 && u3.__v == t3.__v ? (u3.__k = t3.__k, u3.__e = t3.__e) : f3 = u3.__e = N(t3.__e, u3, t3, i3, r3, o3, e3, c3, s3);
    return (a3 = l.diffed) && a3(u3), 128 & u3.__u ? void 0 : f3;
  }
  function z(n2, u3, t3) {
    for (var i3 = 0; i3 < t3.length; i3++) V(t3[i3], t3[++i3], t3[++i3]);
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function N(u3, t3, i3, r3, o3, e3, f3, c3, s3) {
    var a3, h2, v3, y3, w3, g2, m3, b = i3.props, k3 = t3.props, x2 = t3.type;
    if ("svg" == x2 ? o3 = "http://www.w3.org/2000/svg" : "math" == x2 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (a3 = 0; a3 < e3.length; a3++) if ((w3 = e3[a3]) && "setAttribute" in w3 == !!x2 && (x2 ? w3.localName == x2 : 3 == w3.nodeType)) {
        u3 = w3, e3[a3] = null;
        break;
      }
    }
    if (null == u3) {
      if (null == x2) return document.createTextNode(k3);
      u3 = document.createElementNS(o3, x2, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
    }
    if (null === x2) b === k3 || c3 && u3.data === k3 || (u3.data = k3);
    else {
      if (e3 = e3 && n.call(u3.childNodes), b = i3.props || p, !c3 && null != e3) for (b = {}, a3 = 0; a3 < u3.attributes.length; a3++) b[(w3 = u3.attributes[a3]).name] = w3.value;
      for (a3 in b) if (w3 = b[a3], "children" == a3) ;
      else if ("dangerouslySetInnerHTML" == a3) v3 = w3;
      else if (!(a3 in k3)) {
        if ("value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3) continue;
        F(u3, a3, null, w3, o3);
      }
      for (a3 in k3) w3 = k3[a3], "children" == a3 ? y3 = w3 : "dangerouslySetInnerHTML" == a3 ? h2 = w3 : "value" == a3 ? g2 = w3 : "checked" == a3 ? m3 = w3 : c3 && "function" != typeof w3 || b[a3] === w3 || F(u3, a3, w3, b[a3], o3);
      if (h2) c3 || v3 && (h2.__html === v3.__html || h2.__html === u3.innerHTML) || (u3.innerHTML = h2.__html), t3.__k = [];
      else if (v3 && (u3.innerHTML = ""), $(u3, d(y3) ? y3 : [y3], t3, i3, r3, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o3, e3, f3, e3 ? e3[0] : i3.__k && C(i3, 0), c3, s3), null != e3) for (a3 = e3.length; a3--; ) _(e3[a3]);
      c3 || (a3 = "value", "progress" == x2 && null == g2 ? u3.removeAttribute("value") : void 0 !== g2 && (g2 !== u3[a3] || "progress" == x2 && !g2 || "option" == x2 && g2 !== b[a3]) && F(u3, a3, g2, b[a3], o3), a3 = "checked", void 0 !== m3 && m3 !== u3[a3] && F(u3, a3, m3, b[a3], o3));
    }
    return u3;
  }
  function V(n2, u3, t3) {
    try {
      if ("function" == typeof n2) {
        var i3 = "function" == typeof n2.__u;
        i3 && n2.__u(), i3 && null == u3 || (n2.__u = n2(u3));
      } else n2.current = u3;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function q(n2, u3, t3) {
    var i3, r3;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current !== n2.__e || V(i3, null, u3)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u3);
      }
      i3.base = i3.__P = null;
    }
    if (i3 = n2.__k) for (r3 = 0; r3 < i3.length; r3++) i3[r3] && q(i3[r3], u3, t3 || "function" != typeof n2.type);
    t3 || _(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function B(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  n = v.slice, l = { __e: function(n2, l3, u3, t3) {
    for (var i3, r3, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
      if ((r3 = i3.constructor) && null != r3.getDerivedStateFromError && (i3.setState(r3.getDerivedStateFromError(n2)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), o3 = i3.__d), o3) return i3.__E = i3;
    } catch (l4) {
      n2 = l4;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && null == n2.constructor;
  }, x.prototype.setState = function(n2, l3) {
    var u3;
    u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n2 && (n2 = n2(w({}, u3), this.props)), n2 && w(u3, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), M(this));
  }, x.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
    return n2.__v.__b - l3.__v.__b;
  }, P.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = O(false), a = O(true), h = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = l;
  var e2 = c2.__b;
  var a2 = c2.__r;
  var v2 = c2.diffed;
  var l2 = c2.__c;
  var m2 = c2.unmount;
  var s2 = c2.__;
  function d2(n2, t3) {
    c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
    var u3 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u3.__.length && u3.__.push({}), u3.__[n2];
  }
  function y2(n2, u3) {
    var i3 = d2(t2++, 3);
    !c2.__s && C2(i3.__H, u3) && (i3.__ = n2, i3.i = u3, r2.__H.__h.push(i3));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function T2(n2, r3) {
    var u3 = d2(t2++, 7);
    return C2(u3.__H, r3) && (u3.__ = n2(), u3.__H = r3, u3.__h = n2), u3.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
      n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
    } catch (t3) {
      n2.__H.__h = [], c2.__e(t3, n2.__v);
    }
  }
  c2.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, c2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
  }, c2.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i3 = (r2 = n2.__c).__H;
    i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.i = n3.__N = void 0;
    })) : (i3.__h.forEach(z2), i3.__h.forEach(B2), i3.__h = [], t2 = 0)), u2 = r2;
  }, c2.diffed = function(n2) {
    v2 && v2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
      n3.i && (n3.__H = n3.i), n3.i = void 0;
    })), u2 = r2 = null;
  }, c2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r3) {
        t3.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t3 = [], c2.__e(r3, n3.__v);
      }
    }), l2 && l2(n2, t3);
  }, c2.unmount = function(n2) {
    m2 && m2(n2);
    var t3, r3 = n2.__c;
    r3 && r3.__H && (r3.__H.__.forEach(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t3 = n4;
      }
    }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n2) {
    var t3, r3 = function() {
      clearTimeout(u3), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u3 = setTimeout(r3, 100);
    k2 && (t3 = requestAnimationFrame(r3));
  }
  function z2(n2) {
    var t3 = r2, u3 = n2.__c;
    "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }

  // webviews/src/pages/ERDiagram.tsx
  var ERDiagram = ({ schema }) => {
    const svgRef = A2(null);
    y2(() => {
      if (svgRef.current) {
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;
        const svg = select_default2(svgRef.current).attr("width", width).attr("height", height);
        const tablePositions = {
          users: { x: 100, y: 100 },
          orders: { x: 300, y: 100 },
          order_items: { x: 500, y: 100 }
        };
        const tables = svg.selectAll(".table").data(Object.keys(schema)).enter().append("g").attr("class", "table").attr("transform", (d3) => `translate(${tablePositions[d3].x}, ${tablePositions[d3].y})`);
        tables.append("rect").attr("width", 150).attr("height", (d3) => 100 + schema[d3].columns.length * 20).attr("fill", "lightblue").attr("stroke", "black");
        tables.append("text").attr("x", 75).attr("y", 20).attr("text-anchor", "middle").text((d3) => d3);
        tables.selectAll(".column").data((d3) => schema[d3].columns).enter().append("text").attr("class", "column").attr("x", 75).attr("y", (d3, i3) => 40 + i3 * 20).attr("text-anchor", "middle").text((d3) => `${d3.name} (${d3.type})`);
        Object.keys(schema).forEach((tableName) => {
          const table = schema[tableName];
          table.foreignKeys.forEach((fk) => {
            const fromColumns = fk.fromColumns;
            const toTable = fk.toTable;
            const toColumns = fk.toColumns;
            const fromTablePosition = tablePositions[tableName];
            const toTablePosition = tablePositions[toTable];
            fromColumns.forEach((fromColumn, idx) => {
              const fromColumnPosition = {
                x: fromTablePosition.x + 75,
                // Center of the source column
                y: fromTablePosition.y + 40 + idx * 20
                // Adjust Y based on column index
              };
              toColumns.forEach((toColumn, j3) => {
                const toColumnPosition = {
                  x: toTablePosition.x + 75,
                  // Center of the destination column
                  y: toTablePosition.y + 40 + j3 * 20
                  // Adjust Y based on column index
                };
                svg.append("line").attr("x1", fromColumnPosition.x).attr("y1", fromColumnPosition.y).attr("x2", toColumnPosition.x).attr("y2", toColumnPosition.y).attr("stroke", "black").attr("stroke-width", 2).attr("marker-end", "url(#arrowhead)");
                svg.append("text").attr("x", (fromColumnPosition.x + toColumnPosition.x) / 2).attr("y", (fromColumnPosition.y + toColumnPosition.y) / 2 - 10).attr("text-anchor", "middle").text(`${fromColumn} -> ${toColumn}`);
              });
            });
          });
        });
        svg.append("defs").append("marker").attr("id", "arrowhead").attr("viewBox", "0 0 10 10").attr("refX", 5).attr("refY", 5).attr("orient", "auto").attr("markerWidth", 4).attr("markerHeight", 4).append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("fill", "black");
      }
    }, [schema]);
    return /* @__PURE__ */ g("svg", { ref: svgRef, style: { width: "100%", height: "600px" } });
  };
})();
