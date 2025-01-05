"use strict";
(() => {
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
  function w(n2, l2) {
    for (var u3 in l2) n2[u3] = l2[u3];
    return n2;
  }
  function _(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function g(l2, u3, t2) {
    var i3, r2, o2, e2 = {};
    for (o2 in u3) "key" == o2 ? i3 = u3[o2] : "ref" == o2 ? r2 = u3[o2] : e2[o2] = u3[o2];
    if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
    return m(l2, e2, i3, r2, null);
  }
  function m(n2, t2, i3, r2, o2) {
    var e2 = { type: n2, props: t2, key: i3, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u : o2, __i: -1, __u: 0 };
    return null == o2 && null != l.vnode && l.vnode(e2), e2;
  }
  function k(n2) {
    return n2.children;
  }
  function x(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function C(n2, l2) {
    if (null == l2) return n2.__ ? C(n2.__, n2.__i + 1) : null;
    for (var u3; l2 < n2.__k.length; l2++) if (null != (u3 = n2.__k[l2]) && null != u3.__e) return u3.__e;
    return "function" == typeof n2.type ? C(n2) : null;
  }
  function S(n2) {
    var l2, u3;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++) if (null != (u3 = n2.__k[l2]) && null != u3.__e) {
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
    var n2, u3, t2, r2, o2, f3, c2, s2;
    for (i.sort(e); n2 = i.shift(); ) n2.__d && (u3 = i.length, r2 = void 0, f3 = (o2 = (t2 = n2).__v).__e, c2 = [], s2 = [], t2.__P && ((r2 = w({}, o2)).__v = o2.__v + 1, l.vnode && l.vnode(r2), j(t2.__P, r2, o2, t2.__n, t2.__P.namespaceURI, 32 & o2.__u ? [f3] : null, c2, null == f3 ? C(o2) : f3, !!(32 & o2.__u), s2), r2.__v = o2.__v, r2.__.__k[r2.__i] = r2, z(c2, r2, s2), r2.__e != f3 && S(r2)), i.length > u3 && i.sort(e));
    P.__r = 0;
  }
  function $(n2, l2, u3, t2, i3, r2, o2, e2, f3, c2, s2) {
    var a2, h2, y2, d2, w2, _2, g2 = t2 && t2.__k || v, m2 = l2.length;
    for (f3 = I(u3, l2, g2, f3, m2), a2 = 0; a2 < m2; a2++) null != (y2 = u3.__k[a2]) && (h2 = -1 === y2.__i ? p : g2[y2.__i] || p, y2.__i = a2, _2 = j(n2, y2, h2, i3, r2, o2, e2, f3, c2, s2), d2 = y2.__e, y2.ref && h2.ref != y2.ref && (h2.ref && V(h2.ref, null, y2), s2.push(y2.ref, y2.__c || d2, y2)), null == w2 && null != d2 && (w2 = d2), 4 & y2.__u || h2.__k === y2.__k ? f3 = A(y2, f3, n2) : "function" == typeof y2.type && void 0 !== _2 ? f3 = _2 : d2 && (f3 = d2.nextSibling), y2.__u &= -7);
    return u3.__e = w2, f3;
  }
  function I(n2, l2, u3, t2, i3) {
    var r2, o2, e2, f3, c2, s2 = u3.length, a2 = s2, h2 = 0;
    for (n2.__k = new Array(i3), r2 = 0; r2 < i3; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? (f3 = r2 + h2, (o2 = n2.__k[r2] = "string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? m(null, o2, null, null, null) : d(o2) ? m(k, { children: o2 }, null, null, null) : void 0 === o2.constructor && o2.__b > 0 ? m(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : o2).__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 !== (c2 = o2.__i = L(o2, u3, f3, a2)) && (a2--, (e2 = u3[c2]) && (e2.__u |= 2)), null == e2 || null === e2.__v ? (-1 == c2 && h2--, "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f3 && (c2 == f3 - 1 ? h2-- : c2 == f3 + 1 ? h2++ : (c2 > f3 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
    if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u3[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = C(e2)), q(e2, e2));
    return t2;
  }
  function A(n2, l2, u3) {
    var t2, i3;
    if ("function" == typeof n2.type) {
      for (t2 = n2.__k, i3 = 0; t2 && i3 < t2.length; i3++) t2[i3] && (t2[i3].__ = n2, l2 = A(t2[i3], l2, u3));
      return l2;
    }
    n2.__e != l2 && (l2 && n2.type && !u3.contains(l2) && (l2 = C(n2)), u3.insertBefore(n2.__e, l2 || null), l2 = n2.__e);
    do {
      l2 = l2 && l2.nextSibling;
    } while (null != l2 && 8 == l2.nodeType);
    return l2;
  }
  function L(n2, l2, u3, t2) {
    var i3, r2, o2 = n2.key, e2 = n2.type, f3 = l2[u3];
    if (null === f3 || f3 && o2 == f3.key && e2 === f3.type && 0 == (2 & f3.__u)) return u3;
    if (t2 > (null != f3 && 0 == (2 & f3.__u) ? 1 : 0)) for (i3 = u3 - 1, r2 = u3 + 1; i3 >= 0 || r2 < l2.length; ) {
      if (i3 >= 0) {
        if ((f3 = l2[i3]) && 0 == (2 & f3.__u) && o2 == f3.key && e2 === f3.type) return i3;
        i3--;
      }
      if (r2 < l2.length) {
        if ((f3 = l2[r2]) && 0 == (2 & f3.__u) && o2 == f3.key && e2 === f3.type) return r2;
        r2++;
      }
    }
    return -1;
  }
  function T(n2, l2, u3) {
    "-" == l2[0] ? n2.setProperty(l2, null == u3 ? "" : u3) : n2[l2] = null == u3 ? "" : "number" != typeof u3 || y.test(l2) ? u3 : u3 + "px";
  }
  function F(n2, l2, u3, t2, i3) {
    var r2;
    n: if ("style" == l2) if ("string" == typeof u3) n2.style.cssText = u3;
    else {
      if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u3 && l2 in u3 || T(n2.style, l2, "");
      if (u3) for (l2 in u3) t2 && u3[l2] === t2[l2] || T(n2.style, l2, u3[l2]);
    }
    else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(f, "$1")), l2 = l2.toLowerCase() in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u3, u3 ? t2 ? u3.u = t2.u : (u3.u = c, n2.addEventListener(l2, r2 ? a : s, r2)) : n2.removeEventListener(l2, r2 ? a : s, r2);
    else {
      if ("http://www.w3.org/2000/svg" == i3) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
        n2[l2] = null == u3 ? "" : u3;
        break n;
      } catch (n3) {
      }
      "function" == typeof u3 || (null == u3 || false === u3 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u3 ? "" : u3));
    }
  }
  function O(n2) {
    return function(u3) {
      if (this.l) {
        var t2 = this.l[u3.type + n2];
        if (null == u3.t) u3.t = c++;
        else if (u3.t < t2.u) return;
        return t2(l.event ? l.event(u3) : u3);
      }
    };
  }
  function j(n2, u3, t2, i3, r2, o2, e2, f3, c2, s2) {
    var a2, h2, p2, v2, y2, g2, m2, b, C2, S2, M2, P2, I2, A2, H, L2, T2, F2 = u3.type;
    if (void 0 !== u3.constructor) return null;
    128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f3 = u3.__e = t2.__e]), (a2 = l.__b) && a2(u3);
    n: if ("function" == typeof F2) try {
      if (b = u3.props, C2 = "prototype" in F2 && F2.prototype.render, S2 = (a2 = F2.contextType) && i3[a2.__c], M2 = a2 ? S2 ? S2.props.value : a2.__ : i3, t2.__c ? m2 = (h2 = u3.__c = t2.__c).__ = h2.__E : (C2 ? u3.__c = h2 = new F2(b, M2) : (u3.__c = h2 = new x(b, M2), h2.constructor = F2, h2.render = B), S2 && S2.sub(h2), h2.props = b, h2.state || (h2.state = {}), h2.context = M2, h2.__n = i3, p2 = h2.__d = true, h2.__h = [], h2._sb = []), C2 && null == h2.__s && (h2.__s = h2.state), C2 && null != F2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = w({}, h2.__s)), w(h2.__s, F2.getDerivedStateFromProps(b, h2.__s))), v2 = h2.props, y2 = h2.state, h2.__v = u3, p2) C2 && null == F2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), C2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
      else {
        if (C2 && null == F2.getDerivedStateFromProps && b !== v2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(b, M2), !h2.__e && (null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(b, h2.__s, M2) || u3.__v == t2.__v)) {
          for (u3.__v != t2.__v && (h2.props = b, h2.state = h2.__s, h2.__d = false), u3.__e = t2.__e, u3.__k = t2.__k, u3.__k.some(function(n3) {
            n3 && (n3.__ = u3);
          }), P2 = 0; P2 < h2._sb.length; P2++) h2.__h.push(h2._sb[P2]);
          h2._sb = [], h2.__h.length && e2.push(h2);
          break n;
        }
        null != h2.componentWillUpdate && h2.componentWillUpdate(b, h2.__s, M2), C2 && null != h2.componentDidUpdate && h2.__h.push(function() {
          h2.componentDidUpdate(v2, y2, g2);
        });
      }
      if (h2.context = M2, h2.props = b, h2.__P = n2, h2.__e = false, I2 = l.__r, A2 = 0, C2) {
        for (h2.state = h2.__s, h2.__d = false, I2 && I2(u3), a2 = h2.render(h2.props, h2.state, h2.context), H = 0; H < h2._sb.length; H++) h2.__h.push(h2._sb[H]);
        h2._sb = [];
      } else do {
        h2.__d = false, I2 && I2(u3), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
      } while (h2.__d && ++A2 < 25);
      h2.state = h2.__s, null != h2.getChildContext && (i3 = w(w({}, i3), h2.getChildContext())), C2 && !p2 && null != h2.getSnapshotBeforeUpdate && (g2 = h2.getSnapshotBeforeUpdate(v2, y2)), f3 = $(n2, d(L2 = null != a2 && a2.type === k && null == a2.key ? a2.props.children : a2) ? L2 : [L2], u3, t2, i3, r2, o2, e2, f3, c2, s2), h2.base = u3.__e, u3.__u &= -161, h2.__h.length && e2.push(h2), m2 && (h2.__E = h2.__ = null);
    } catch (n3) {
      if (u3.__v = null, c2 || null != o2) if (n3.then) {
        for (u3.__u |= c2 ? 160 : 128; f3 && 8 == f3.nodeType && f3.nextSibling; ) f3 = f3.nextSibling;
        o2[o2.indexOf(f3)] = null, u3.__e = f3;
      } else for (T2 = o2.length; T2--; ) _(o2[T2]);
      else u3.__e = t2.__e, u3.__k = t2.__k;
      l.__e(n3, u3, t2);
    }
    else null == o2 && u3.__v == t2.__v ? (u3.__k = t2.__k, u3.__e = t2.__e) : f3 = u3.__e = N(t2.__e, u3, t2, i3, r2, o2, e2, c2, s2);
    return (a2 = l.diffed) && a2(u3), 128 & u3.__u ? void 0 : f3;
  }
  function z(n2, u3, t2) {
    for (var i3 = 0; i3 < t2.length; i3++) V(t2[i3], t2[++i3], t2[++i3]);
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
  function N(u3, t2, i3, r2, o2, e2, f3, c2, s2) {
    var a2, h2, v2, y2, w2, g2, m2, b = i3.props, k2 = t2.props, x2 = t2.type;
    if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
      for (a2 = 0; a2 < e2.length; a2++) if ((w2 = e2[a2]) && "setAttribute" in w2 == !!x2 && (x2 ? w2.localName == x2 : 3 == w2.nodeType)) {
        u3 = w2, e2[a2] = null;
        break;
      }
    }
    if (null == u3) {
      if (null == x2) return document.createTextNode(k2);
      u3 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l.__m && l.__m(t2, e2), c2 = false), e2 = null;
    }
    if (null === x2) b === k2 || c2 && u3.data === k2 || (u3.data = k2);
    else {
      if (e2 = e2 && n.call(u3.childNodes), b = i3.props || p, !c2 && null != e2) for (b = {}, a2 = 0; a2 < u3.attributes.length; a2++) b[(w2 = u3.attributes[a2]).name] = w2.value;
      for (a2 in b) if (w2 = b[a2], "children" == a2) ;
      else if ("dangerouslySetInnerHTML" == a2) v2 = w2;
      else if (!(a2 in k2)) {
        if ("value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2) continue;
        F(u3, a2, null, w2, o2);
      }
      for (a2 in k2) w2 = k2[a2], "children" == a2 ? y2 = w2 : "dangerouslySetInnerHTML" == a2 ? h2 = w2 : "value" == a2 ? g2 = w2 : "checked" == a2 ? m2 = w2 : c2 && "function" != typeof w2 || b[a2] === w2 || F(u3, a2, w2, b[a2], o2);
      if (h2) c2 || v2 && (h2.__html === v2.__html || h2.__html === u3.innerHTML) || (u3.innerHTML = h2.__html), t2.__k = [];
      else if (v2 && (u3.innerHTML = ""), $(u3, d(y2) ? y2 : [y2], t2, i3, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f3, e2 ? e2[0] : i3.__k && C(i3, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) _(e2[a2]);
      c2 || (a2 = "value", "progress" == x2 && null == g2 ? u3.removeAttribute("value") : void 0 !== g2 && (g2 !== u3[a2] || "progress" == x2 && !g2 || "option" == x2 && g2 !== b[a2]) && F(u3, a2, g2, b[a2], o2), a2 = "checked", void 0 !== m2 && m2 !== u3[a2] && F(u3, a2, m2, b[a2], o2));
    }
    return u3;
  }
  function V(n2, u3, t2) {
    try {
      if ("function" == typeof n2) {
        var i3 = "function" == typeof n2.__u;
        i3 && n2.__u(), i3 && null == u3 || (n2.__u = n2(u3));
      } else n2.current = u3;
    } catch (n3) {
      l.__e(n3, t2);
    }
  }
  function q(n2, u3, t2) {
    var i3, r2;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current !== n2.__e || V(i3, null, u3)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u3);
      }
      i3.base = i3.__P = null;
    }
    if (i3 = n2.__k) for (r2 = 0; r2 < i3.length; r2++) i3[r2] && q(i3[r2], u3, t2 || "function" != typeof n2.type);
    t2 || _(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function B(n2, l2, u3) {
    return this.constructor(n2, u3);
  }
  function D(u3, t2, i3) {
    var r2, o2, e2, f3;
    t2 == document && (t2 = document.documentElement), l.__ && l.__(u3, t2), o2 = (r2 = "function" == typeof i3) ? null : i3 && i3.__k || t2.__k, e2 = [], f3 = [], j(t2, u3 = (!r2 && i3 || t2).__k = g(k, null, [u3]), o2 || p, p, t2.namespaceURI, !r2 && i3 ? [i3] : o2 ? null : t2.firstChild ? n.call(t2.childNodes) : null, e2, !r2 && i3 ? i3 : o2 ? o2.__e : t2.firstChild, r2, f3), z(e2, u3, f3);
  }
  n = v.slice, l = { __e: function(n2, l2, u3, t2) {
    for (var i3, r2, o2; l2 = l2.__; ) if ((i3 = l2.__c) && !i3.__) try {
      if ((r2 = i3.constructor) && null != r2.getDerivedStateFromError && (i3.setState(r2.getDerivedStateFromError(n2)), o2 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t2 || {}), o2 = i3.__d), o2) return i3.__E = i3;
    } catch (l3) {
      n2 = l3;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && null == n2.constructor;
  }, x.prototype.setState = function(n2, l2) {
    var u3;
    u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n2 && (n2 = n2(w({}, u3), this.props)), n2 && w(u3, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), M(this));
  }, x.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l2) {
    return n2.__v.__b - l2.__v.__b;
  }, P.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = O(false), a = O(true), h = 0;

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var f2 = 0;
  var i2 = Array.isArray;
  function u2(e2, t2, n2, o2, i3, u3) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i3, __self: u3 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return l.vnode && l.vnode(l2), l2;
  }

  // webviews/src/pages/QueryResults.tsx
  function QueryResults({ tableName, rows, columns }) {
    if (rows.length === 0) {
      return /* @__PURE__ */ u2("p", { children: "No data available." });
    }
    const headers = columns;
    const onFormSubmit = (e2) => {
      e2.preventDefault();
      const formData = new FormData(e2.currentTarget);
      console.log(JSON.stringify(Object.fromEntries(formData), null, 4));
    };
    return /* @__PURE__ */ u2("div", { children: [
      /* @__PURE__ */ u2("h2", { children: [
        /* @__PURE__ */ u2("span", {}),
        tableName,
        " Results"
      ] }),
      /* @__PURE__ */ u2("table", { children: [
        /* @__PURE__ */ u2("thead", { children: /* @__PURE__ */ u2("tr", { children: [
          headers.map((header) => /* @__PURE__ */ u2("th", { children: header }, header)),
          /* @__PURE__ */ u2("th", {})
        ] }) }),
        /* @__PURE__ */ u2("tbody", { children: rows.map((row, index) => /* @__PURE__ */ u2("tr", { children: [
          headers.map((header, headerIndex) => /* @__PURE__ */ u2("td", { children: headerIndex === 0 ? /* @__PURE__ */ u2(k, { children: [
            /* @__PURE__ */ u2("form", { method: "GET", id: `inline-form-${row[headers[0]] ?? ""}`, onSubmit: onFormSubmit }),
            /* @__PURE__ */ u2(
              "input",
              {
                type: "hidden",
                name: header,
                defaultValue: row[header] ?? "",
                form: `inline-form-${row[headers[0]] ?? ""}`
              }
            ),
            row[header] ?? ""
          ] }) : /* @__PURE__ */ u2(
            "input",
            {
              type: "text",
              name: header,
              defaultValue: row[header] ?? "",
              form: `inline-form-${row[headers[0]] ?? ""}`
            }
          ) }, header)),
          /* @__PURE__ */ u2("td", { children: /* @__PURE__ */ u2("button", { title: "Save Record", className: "inline", form: `inline-form-${row[headers[0]] ?? ""}`, children: /* @__PURE__ */ u2(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "currentColor",
              children: /* @__PURE__ */ u2(
                "path",
                {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d: "M13.353 1.146l1.5 1.5L15 3v11.5l-.5.5h-13l-.5-.5v-13l.5-.5H13l.353.146zM2 2v12h12V3.208L12.793 2H11v4H4V2H2zm6 0v3h2V2H8z"
                }
              )
            }
          ) }) })
        ] }, index)) })
      ] })
    ] });
  }
  window.addEventListener("message", (event) => {
    console.log("queryresults.js", event);
    const { tableName, rows, columns } = event.data;
    D(
      /* @__PURE__ */ u2(QueryResults, { tableName, rows, columns }),
      document.getElementById("app")
    );
  });
})();
