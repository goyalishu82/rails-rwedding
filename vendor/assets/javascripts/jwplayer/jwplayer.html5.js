(function(a) {
  a.html5 = {};
  a.html5.version = "6.1.2972"
})(jwplayer);
(function(a) {
  var g = document,
    e = window;
  a.serialize = function(j) {
    if(j == null) {
      return null
    } else {
      if(j.toString().toLowerCase() == "true") {
        return true
      } else {
        if(j.toString().toLowerCase() == "false") {
          return false
        } else {
          if(isNaN(Number(j)) || j.length > 5 || j.length == 0) {
            return j
          } else {
            return Number(j)
          }
        }
      }
    }
  };
  a.filterSources = function(k) {
    var o, p, j = a.extensionmap;
    if(k) {
      p = [];
      for(var m = 0; m < k.length; m++) {
        var n = k[m].type,
          l = k[m].file;
        if(!n) {
          n = j.extType(a.extension(l));
          k[m].type = n
        }
        if(c(n)) {
          if(!o) {
            o = n
          }
          if(n == o) {
            p.push(a.extend({}, k[m]))
          }
        }
      }
    }
    return p
  };

  function c(j) {
    var k = a.extensionmap.types[j];
    return( !! k && jwplayer.vid.canPlayType(k))
  }
  a.ajax = function(n, m, j) {
    var l;
    if(n.indexOf("#") > 0) {
      n = n.replace(/#.*$/, "")
    }
    if(b(n) && a.exists(e.XDomainRequest)) {
      l = new XDomainRequest();
      l.onload = f(l, n, m, j);
      l.onerror = d(j, n, l)
    } else {
      if(a.exists(e.XMLHttpRequest)) {
        l = new XMLHttpRequest();
        l.onreadystatechange = h(l, n, m, j);
        l.onerror = d(j, n)
      } else {
        if(j) {
          j()
        }
      }
    }
    try {
      l.open("GET", n, true);
      l.send(null)
    } catch(k) {
      if(j) {
        j(n)
      }
    }
    return l
  };

  function b(j) {
    if(j && j.indexOf("://") >= 0) {
      if(j.split("/")[2] != e.location.href.split("/")[2]) {
        return true
      }
    }
    return false
  }
  function d(j, l, k) {
    return function() {
      j("Error loading file")
    }
  }
  function h(k, m, l, j) {
    return function() {
      if(k.readyState === 4) {
        switch(k.status) {
        case 200:
          f(k, m, l, j)();
          break;
        case 404:
          j("File not found")
        }
      }
    }
  }
  function f(k, m, l, j) {
    return function() {
      try {
        var n = k.responseXML;
        if(n && n.firstChild) {
          return l(k)
        }
      } catch(p) {}
      var o = a.parseXML(k.responseText);
      if(o && o.firstChild) {
        k = a.extend({}, k, {
          responseXML: o
        })
      } else {
        if(j) {
          j(k.responseText ? "Invalid XML" : m)
        }
        return
      }
      l(k)
    }
  }
  a.parseXML = function(j) {
    try {
      var k;
      if(e.DOMParser) {
        k = (new DOMParser()).parseFromString(j, "text/xml");
        try {
          if(k.childNodes[0].firstChild.nodeName == "parsererror") {
            return
          }
        } catch(l) {}
      } else {
        k = new ActiveXObject("Microsoft.XMLDOM");
        k.async = "false";
        k.loadXML(j)
      }
      return k
    } catch(l) {
      return
    }
  };
  a.parseDimension = function(j) {
    if(typeof j == "string") {
      if(j === "") {
        return 0
      } else {
        if(j.lastIndexOf("%") > -1) {
          return j
        } else {
          return parseInt(j.replace("px", ""), 10)
        }
      }
    }
    return j
  };
  a.timeFormat = function(l) {
    if(l > 0) {
      var k = Math.floor(l / 3600),
        m = Math.floor((l - k * 3600) / 60),
        j = Math.floor(l % 60);
      return(k ? k + ":" : "") + (m < 10 ? "0" : "") + m + ":" + (j < 10 ? "0" : "") + j;
      return str
    } else {
      return "00:00"
    }
  };
  a.seconds = function(l) {
    l = l.replace(",", ".");
    var j = l.split(":");
    var k = 0;
    if(l.substr(-1) == "s") {
      k = Number(l.substr(0, l.length - 1))
    } else {
      if(l.substr(-1) == "m") {
        k = Number(l.substr(0, l.length - 1)) * 60
      } else {
        if(l.substr(-1) == "h") {
          k = Number(l.substr(0, l.length - 1)) * 3600
        } else {
          if(j.length > 1) {
            k = Number(j[j.length - 1]);
            k += Number(j[j.length - 2]) * 60;
            if(j.length == 3) {
              k += Number(j[j.length - 3]) * 3600
            }
          } else {
            k = Number(l)
          }
        }
      }
    }
    return k
  };
  a.bounds = function(k) {
    if(!k) {
      return {
        left: 0,
        right: 0,
        width: 0,
        height: 0,
        top: 0,
        bottom: 0
      }
    }
    var o = k,
      n = 0,
      m = 0,
      l = isNaN(k.offsetWidth) ? 0 : k.offsetWidth,
      j = isNaN(k.offsetHeight) ? 0 : k.offsetHeight;
    do {
      n += isNaN(o.offsetLeft) ? 0 : o.offsetLeft;
      m += isNaN(o.offsetTop) ? 0 : o.offsetTop
    } while (o = o.offsetParent);
    return {
      left: n,
      top: m,
      width: l,
      height: j,
      right: n + l,
      bottom: m + j
    }
  };
  a.empty = function(j) {
    if(!j) {
      return
    }
    while(j.childElementCount > 0) {
      j.removeChild(j.children[0])
    }
  }
})(jwplayer.utils);
(function(p) {
  var a = {},
    n, c = {},
    j = 0,
    o = p.exists,
    d = {},
    e = false,
    b = ".jwplayer ";

  function l() {
    var r = document.createElement("style");
    r.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(r);
    return r
  }
  var m = p.css = function(r, u, s) {
      if(!a[r]) {
        if(e) {
          a[r] = l()
        } else {
          if(!n || n.sheet.cssRules.length > 50000) {
            n = l()
          }
          a[r] = n
        }
      }
      if(!o(s)) {
        s = false
      }
      if(!c[r]) {
        c[r] = {}
      }
      for(var t in u) {
        var v = q(t, u[t], s);
        if(o(c[r][t]) && !o(v)) {
          delete c[r][t]
        } else {
          if(o(v)) {
            c[r][t] = v
          }
        }
      }
      if(j > 0) {
        return
      }
      k(r)
    };
  m.block = function() {
    j++
  };
  m.unblock = function() {
    j = Math.max(j - 1, 0);
    if(j == 0) {
      h()
    }
  };
  var h = function() {
      for(var r in a) {
        k(r)
      }
    };

  function q(t, u, r) {
    if(typeof u === "undefined") {
      return undefined
    }
    var s = r ? " !important" : "";
    if(!isNaN(u)) {
      switch(t) {
      case "z-index":
      case "opacity":
        return u + s;
        break;
      default:
        if(t.match(/color/i)) {
          return "#" + p.pad(u.toString(16).replace(/^0x/i, ""), 6) + s
        } else {
          if(u === 0) {
            return 0 + s
          } else {
            return Math.ceil(u) + "px" + s
          }
        }
        break
      }
    } else {
      if( !! u.match(/png|gif|jpe?g/i) && u.indexOf("url") < 0) {
        return "url(" + u + ")"
      }
      return u + s
    }
  }
  function k(r) {
    if(e) {
      a[r].innerHTML = f(r);
      return
    }
    var s = a[r].sheet,
      t = d[r];
    if(s) {
      var u = s.cssRules;
      if(p.exists(t) && t < u.length && u[t].selectorText == r) {
        s.deleteRule(t)
      } else {
        d[r] = u.length
      }
      s.insertRule(f(r), d[r])
    }
  }
  function f(r) {
    var s = r + "{\n";
    var u = c[r];
    for(var t in u) {
      s += "  " + t + ": " + u[t] + ";\n"
    }
    s += "}\n";
    return s
  }
  p.clearCss = function(s) {
    for(var t in c) {
      if(t.indexOf(s) >= 0) {
        delete c[t]
      }
    }
    for(var r in a) {
      if(r.indexOf(s) >= 0) {
        a[r].innerHTML = ""
      }
    }
  };
  p.transform = function(s, u) {
    var r = "-transform",
      t;
    u = u ? u : "";
    if(typeof s == "string") {
      t = {};
      t["-webkit" + r] = u;
      t["-ms" + r] = u;
      t["-moz" + r] = u;
      t["-o" + r] = u;
      p.css(s, t)
    } else {
      r = "Transform";
      t = s.style;
      t["webkit" + r] = u;
      t["Moz" + r] = u;
      t["ms" + r] = u;
      t["O" + r] = u
    }
  };
  p.dragStyle = function(r, s) {
    p.css(r, {
      "-webkit-user-select": s,
      "-moz-user-select": s,
      "-ms-user-select": s,
      "-webkit-user-drag": s,
      "user-select": s,
      "user-drag": s
    })
  };
  p.transitionStyle = function(r, s) {
    if(navigator.userAgent.match(/5\.\d(\.\d)? safari/i)) {
      return
    }
    p.css(r, {
      "-webkit-transition": s,
      "-moz-transition": s,
      "-o-transition": s
    })
  };
  p.rotate = function(r, s) {
    p.transform(r, "rotate(" + s + "deg)")
  };

  function g() {
    m(b + ["", "div", "span", "a", "img", "ul", "li", "video"].join("," + b) + ", .jwclick", {
      margin: 0,
      padding: 0,
      border: 0,
      color: "#000000",
      "font-size": "100%",
      font: "inherit",
      "vertical-align": "baseline",
      "background-color": "transparent",
      "text-align": "left"
    });
    m(b + "ul", {
      "list-style": "none"
    })
  }
  g()
})(jwplayer.utils);
(function(a) {
  a.scale = function(e, d, c, h, j) {
    var g, f = a.exists;
    if(!f(d)) {
      d = 1
    }
    if(!f(c)) {
      c = 1
    }
    if(!f(h)) {
      h = 0
    }
    if(!f(j)) {
      j = 0
    }
    if(d == 1 && c == 1 && h == 0 && j == 0) {
      g = ""
    } else {
      g = "scale(" + d + "," + c + ") translate(" + h + "px," + j + "px)"
    }
    a.transform(e, g)
  };
  a.stretch = function(l, q, p, h, n, j) {
    if(!q) {
      return
    }
    if(!l) {
      l = b.UNIFORM
    }
    if(!p || !h || !n || !j) {
      return
    }
    var d = p / n,
      g = h / j,
      o = 0,
      k = 0,
      c = {},
      e = (q.tagName.toLowerCase() == "video"),
      f = false,
      m;
    if(e) {
      a.transform(q)
    }
    m = "jw" + l.toLowerCase();
    switch(l.toLowerCase()) {
    case b.FILL:
      if(d > g) {
        n = n * d;
        j = j * d
      } else {
        n = n * g;
        j = j * g
      }
    case b.NONE:
      d = g = 1;
    case b.EXACTFIT:
      f = true;
      break;
    case b.UNIFORM:
    default:
      if(d > g) {
        if(n * g / p > 0.95) {
          f = true;
          m = "jwexactfit"
        } else {
          n = n * g;
          j = j * g
        }
      } else {
        if(j * d / h > 0.95) {
          f = true;
          m = "jwexactfit"
        } else {
          n = n * d;
          j = j * d
        }
      }
      if(f) {
        g = Math.ceil(100 * h / j) / 100;
        d = Math.ceil(100 * p / n) / 100
      }
      break
    }
    if(e) {
      if(f) {
        q.style.width = n + "px";
        q.style.height = j + "px";
        o = ((p - n) / 2) / d;
        k = ((h - j) / 2) / g;
        a.scale(q, d, g, o, k)
      } else {
        q.style.width = "";
        q.style.height = ""
      }
    } else {
      q.className = q.className.replace(/\s*jw(none|exactfit|uniform|fill)/g, "");
      q.className += " " + m
    }
  };
  var b = a.stretching = {
    NONE: "none",
    FILL: "fill",
    UNIFORM: "uniform",
    EXACTFIT: "exactfit"
  }
})(jwplayer.utils);
(function(a) {
  a.parsers = {
    localName: function(b) {
      if(!b) {
        return ""
      } else {
        if(b.localName) {
          return b.localName
        } else {
          if(b.baseName) {
            return b.baseName
          } else {
            return ""
          }
        }
      }
    },
    textContent: function(b) {
      if(!b) {
        return ""
      } else {
        if(b.textContent) {
          return b.textContent
        } else {
          if(b.text) {
            return b.text
          } else {
            return ""
          }
        }
      }
    },
    getChildNode: function(c, b) {
      return c.childNodes[b]
    },
    numChildren: function(b) {
      if(b.childNodes) {
        return b.childNodes.length
      } else {
        return 0
      }
    }
  }
})(jwplayer.html5);
(function(a) {
  a.dfxp = function(g, b) {
    var d, c, j = jwplayer.utils.seconds;

    function h(l) {
      if(l == 0) {
        b("Crossdomain loading denied: " + c)
      } else {
        if(l == 404) {
          b("DFXP File not found: " + c)
        } else {
          b("Error " + l + " loading DFXP file: " + c)
        }
      }
    }
    this.load = function(m) {
      c = m;
      try {
        d.open("GET", m, true);
        d.send(null)
      } catch(l) {
        b("Error loading DFXP File: " + m)
      }
    };

    function f(p) {
      var m = [{
        begin: 0,
        text: ""
      }];
      p = p.replace(/^\s+/, "").replace(/\s+$/, "");
      var o = p.split("</p>");
      var q = [];
      for(var l = 0; l < o.length; l++) {
        if(o[l].indexOf("<p") >= 0) {
          o[l] = o[l].substr(o[l].indexOf("<p") + 2).replace(/^\s+/, "").replace(/\s+$/, "");
          q.push(o[l])
        }
      }
      o = q;
      for(l = 0; l < o.length; l++) {
        var n = k(o[l]);
        if(n.text) {
          m.push(n);
          if(n.end) {
            m.push({
              begin: n.end,
              text: ""
            });
            delete n.end
          }
        }
      }
      if(m.length > 1) {
        g(m)
      } else {
        b("Invalid DFXP file: " + c)
      }
    }
    function k(o) {
      var n = {};
      try {
        var l = o.indexOf('begin="');
        o = o.substr(l + 7);
        l = o.indexOf('" end="');
        n.begin = j(o.substr(0, l));
        o = o.substr(l + 7);
        l = o.indexOf('">');
        n.end = j(o.substr(0, l));
        o = o.substr(l + 2);
        n.text = o
      } catch(m) {}
      return n
    }
    function e() {
      d = new XMLHttpRequest();
      d.onreadystatechange = function() {
        if(d.readyState === 4) {
          if(d.status === 200) {
            f(d.responseText)
          } else {
            h(d.status)
          }
        }
      }
    }
    e()
  }
})(jwplayer.html5.parsers);
(function(b) {
  var a = b.html5.parsers;
  var d = a.jwparser = function() {};
  var c = "jwplayer";
  d.parseEntry = function(h, j) {
    for(var f = 0; f < h.childNodes.length; f++) {
      var g = h.childNodes[f];
      if(g.prefix == c) {
        var e = a.localName(g);
        j[e] = b.utils.serialize(a.textContent(g));
        if(e == "file" && j.sources) {
          delete j.sources
        }
      }
      if(!j.file) {
        j.file = j.link
      }
    }
    return j
  }
})(jwplayer);
(function(e) {
  var b = jwplayer.utils,
    h = b.xmlAttribute,
    c = e.localName,
    a = e.textContent,
    d = e.numChildren;
  var g = e.mediaparser = function() {};
  var f = "media";
  g.parseGroup = function(o, q) {
    var n, l, j = [];

    function p(r) {
      var s = {
        zh: "Chinese",
        nl: "Dutch",
        en: "English",
        fr: "French",
        de: "German",
        it: "Italian",
        ja: "Japanese",
        pt: "Portuguese",
        ru: "Russian",
        es: "Spanish"
      };
      if(s[r]) {
        return s[r]
      }
      return r
    }
    for(l = 0; l < d(o); l++) {
      n = o.childNodes[l];
      if(n.prefix == f) {
        if(!c(n)) {
          continue
        }
        switch(c(n).toLowerCase()) {
        case "content":
          if(h(n, "duration")) {
            q.duration = b.seconds(h(n, "duration"))
          }
          if(d(n) > 0) {
            q = g.parseGroup(n, q)
          }
          if(h(n, "url")) {
            if(!q.sources) {
              q.sources = []
            }
            q.sources.push({
              file: h(n, "url"),
              type: h(n, "type"),
              width: h(n, "width"),
              label: h(n, "height") ? h(n, "height") + "p" : undefined
            })
          }
          break;
        case "title":
          q.title = a(n);
          break;
        case "description":
          q.description = a(n);
          break;
        case "guid":
          q.mediaid = a(n);
          break;
        case "thumbnail":
          q.image = h(n, "url");
          break;
        case "player":
          var k = n.url;
          break;
        case "group":
          g.parseGroup(n, q);
          break;
        case "subtitle":
          var m = {};
          m.file = h(n, "url");
          if(h(n, "lang").length > 0) {
            m.label = p(h(n, "lang"))
          }
          j.push(m)
        }
      }
    }
    if(j.length > 0) {
      q.captions = j
    }
    return q
  }
})(jwplayer.html5.parsers);
(function(g) {
  var b = jwplayer.utils,
    a = g.textContent,
    e = g.getChildNode,
    f = g.numChildren,
    d = g.localName;
  g.rssparser = {};
  g.rssparser.parse = function(o) {
    var h = [];
    for(var m = 0; m < f(o); m++) {
      var n = e(o, m),
        k = d(n).toLowerCase();
      if(k == "channel") {
        for(var l = 0; l < f(n); l++) {
          var p = e(n, l);
          if(d(p).toLowerCase() == "item") {
            h.push(c(p))
          }
        }
      }
    }
    return h
  };

  function c(l) {
    var m = {};
    for(var j = 0; j < l.childNodes.length; j++) {
      var k = l.childNodes[j];
      var h = d(k);
      if(!h) {
        continue
      }
      switch(h.toLowerCase()) {
      case "enclosure":
        m.file = b.xmlAttribute(k, "url");
        break;
      case "title":
        m.title = a(k);
        break;
      case "guid":
        m.mediaid = a(k);
        break;
      case "pubdate":
        m.date = a(k);
        break;
      case "description":
        m.description = a(k);
        break;
      case "link":
        m.link = a(k);
        break;
      case "category":
        if(m.tags) {
          m.tags += a(k)
        } else {
          m.tags = a(k)
        }
        break
      }
    }
    m = g.mediaparser.parseGroup(l, m);
    m = g.jwparser.parseEntry(l, m);
    return new jwplayer.playlist.item(m)
  }
})(jwplayer.html5.parsers);
(function(a) {
  a.srt = function(h, b) {
    var e, d, m = jwplayer.utils,
      l = m.seconds;

    function j(n) {
      if(n == 0) {
        b("Crossdomain loading denied: " + d)
      } else {
        if(n == 404) {
          b("SRT File not found: " + d)
        } else {
          b("Error " + n + " loading SRT file: " + d)
        }
      }
    }
    this.load = function(o) {
      d = o;
      try {
        if(c(o) && m.exists(window.XDomainRequest)) {
          e = new XDomainRequest();
          e.onload = function() {
            var p = e.responseText;
            g(p)
          };
          e.onerror = function() {
            var p = e.status;
            j(p)
          }
        }
        e.open("GET", o, true);
        e.send(null)
      } catch(n) {
        b("Error loading SRT File: " + o)
      }
    };

    function g(r) {
      var o = [{
        begin: 0,
        text: ""
      }];
      r = r.replace(/^\s+/, "").replace(/\s+$/, "");
      var q = r.split("\r\n\r\n");
      if(q.length == 1) {
        q = r.split("\n\n")
      }
      for(var n = 0; n < q.length; n++) {
        if(q[n] == "WEBVTT") {
          continue
        }
        var p = k(q[n]);
        if(p.text) {
          o.push(p);
          if(p.end) {
            o.push({
              begin: p.end,
              text: ""
            });
            delete p.end
          }
        }
      }
      if(o.length > 1) {
        h(o)
      } else {
        b("Invalid SRT file: " + d)
      }
    }
    function k(s) {
      var r = {};
      var t = s.split("\r\n");
      if(t.length == 1) {
        t = s.split("\n")
      }
      try {
        var n = 1;
        if(t[0].indexOf(" --> ") > 0) {
          n = 0
        }
        var p = t[n].indexOf(" --> ");
        if(p > 0) {
          r.begin = l(t[n].substr(0, p));
          r.end = l(t[n].substr(p + 5))
        }
        if(t[n + 1]) {
          r.text = t[n + 1];
          for(var q = n + 2; q < t.length; q++) {
            r.text += "<br/>" + t[q]
          }
        }
      } catch(o) {}
      return r
    }
    function c(n) {
      if(n && n.indexOf("://") >= 0) {
        if(n.split("/")[2] != window.location.href.split("/")[2]) {
          return true
        }
      }
      return false
    }
    function f() {
      e = new XMLHttpRequest();
      e.onreadystatechange = function() {
        if(e.readyState === 4) {
          if(e.status === 200) {
            g(e.responseText)
          } else {
            j(e.status)
          }
        }
      }
    }
    f()
  }
})(jwplayer.html5.parsers);
(function(e) {
  var k = jwplayer.utils,
    l = jwplayer.events,
    m = l.state,
    h = k.css,
    g = "playing",
    j = document,
    a = ".jwcaptions",
    b = "absolute",
    c = "none",
    f = "100%",
    d = "hidden";
  e.captions = function(H, u) {
    var N = H,
      v, w, K = {
        back: true,
        color: "#FFFFFF",
        fontSize: 15
      },
      J = {
        fontFamily: "Arial,sans-serif",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "none"
      },
      R, Q, y, s = [],
      r = 0,
      S = false,
      F, B = new l.eventdispatcher();
    k.extend(this, B);

    function D() {
      v = j.createElement("div");
      v.id = N.id + "_caption";
      v.className = "jwcaptions";
      N.jwAddEventListener(l.JWPLAYER_PLAYER_STATE, C);
      N.jwAddEventListener(l.JWPLAYER_PLAYLIST_ITEM, M);
      N.jwAddEventListener(l.JWPLAYER_MEDIA_ERROR, L);
      N.jwAddEventListener(l.JWPLAYER_ERROR, L);
      N.jwAddEventListener(l.JWPLAYER_READY, t);
      N.jwAddEventListener(l.JWPLAYER_MEDIA_TIME, n);
      N.jwAddEventListener(l.JWPLAYER_FULLSCREEN, x)
    }
    function L(U) {
      k.log("CAPTIONS(" + U + ")")
    }
    function G() {
      Q = "idle";
      q()
    }
    function C(U) {
      switch(U.newstate) {
      case m.IDLE:
        G();
        break;
      case m.PLAYING:
        A();
        break
      }
    }
    function x(U) {
      S = U.fullscreen;
      if(U.fullscreen) {
        I();
        setTimeout(I, 500)
      } else {
        q()
      }
    }
    function I() {
      var U = v.offsetHeight,
        V = v.offsetWidth;
      if(U != 0 && V != 0) {
        R.resize(V, Math.round(U * 0.94))
      }
    }
    function M(Z) {
      y = 0;
      s = [];
      R.update(0);
      var Y = N.jwGetPlaylist()[N.jwGetPlaylistIndex()],
        U = Y.captions,
        X = 0,
        V = "",
        W = "";
      if(U) {
        for(X = 0; X < U.length; X++) {
          W = U[X].file;
          if(W) {
            if(U[X].label) {
              s.push(U[X])
            } else {
              V = W.substring(W.lastIndexOf("/") + 1, W.indexOf("."));
              s.push({
                file: W,
                label: V
              })
            }
          }
        }
      }
      r = 0;
      q();
      O(l.JWPLAYER_CAPTIONS_LIST, p(), r)
    }
    function T(U) {
      F = U;
      k.ajax(U, z, E)
    }
    function z(V) {
      var W = V.responseXML.firstChild,
        U;
      if(e.parsers.localName(W) == "tt") {
        U = new jwplayer.html5.parsers.dfxp(P, L)
      } else {
        U = new jwplayer.html5.parsers.srt(P, L)
      }
      U.load(F)
    }
    function E(V) {
      var U = new jwplayer.html5.parsers.srt(P, L);
      U.load(F)
    }
    function P(U) {
      R.populate(U);
      s[y].data = U;
      q()
    }
    function A(U) {
      Q = g;
      q()
    }
    function q() {
      if(!s.length) {
        R.hide()
      } else {
        if(Q == g && r > 0) {
          R.show();
          if(S) {
            x({
              fullscreen: true
            });
            return
          }
          var U = N.jwGetWidth();
          if(N._model && N._model.config && N._model.config.listbar && N._model.config.listbar.size) {
            U = U - N._model.config.listbar.size
          }
          R.resize(U, Math.round(N.jwGetHeight() * 0.94))
        } else {
          R.hide()
        }
      }
    }
    function t() {
      for(var U in K) {
        if(u && u[U.toLowerCase()] != undefined) {
          if(U == "color") {
            J.color = "#" + String(u.color).substr(-6)
          } else {
            J[U] = u[U.toLowerCase()]
          }
        } else {
          J[U] = K[U]
        }
      }
      R = new jwplayer.html5.captions.renderer(J, v);
      q()
    }
    function o(U) {
      if(U > 0) {
        y = U - 1;
        r = U
      } else {
        r = 0
      }
      if(s[y].data) {
        R.populate(s[y].data)
      } else {
        T(s[y].file)
      }
      q()
    }
    function n(U) {
      R.update(U.position)
    }
    function O(X, W, V) {
      var U = {
        type: X,
        tracks: W,
        track: V
      };
      B.sendEvent(X, U)
    }
    function p() {
      var V = new Array();
      V.push({
        label: "(Off)"
      });
      for(var U = 0; U < s.length; U++) {
        V.push({
          label: s[U].label
        })
      }
      return V
    }
    this.element = function() {
      return v
    };
    this.getCaptionsList = function() {
      return p()
    };
    this.getCurrentCaptions = function() {
      return r
    };
    this.setCurrentCaptions = function(U) {
      if(U >= 0 && r != U && U <= s.length) {
        o(U);
        O(l.JWPLAYER_CAPTIONS_CHANGED, p(), r)
      }
    };
    D()
  };
  h(a, {
    position: b,
    cursor: "pointer",
    width: f,
    height: f,
    overflow: d
  })
})(jwplayer.html5);
(function(a) {
  a.captions.renderer = function(q, g) {
    var j, p, f, k, o, l, b = "visible",
      e;
    this.hide = function() {
      c({
        display: "none"
      })
    };
    this.populate = function(r) {
      k = -1;
      p = r;
      d()
    };

    function m(r) {
      c({
        left: "0px",
        top: "0px"
      });
      f.innerHTML = r;
      if(r == "") {
        b = "hidden"
      } else {
        b = "visible"
      }
      setTimeout(n, 20)
    }
    this.resize = function(s, r) {
      e = s;
      j = r;
      n()
    };

    function n() {
      c({
        left: "0px",
        top: "0px"
      });
      var s = Math.round(q.fontSize * Math.pow(e / 400, 0.6)),
        r = Math.round(s * 1.4),
        u, t;
      c({
        maxWidth: e + "px",
        fontSize: s + "px",
        lineHeight: r + "px",
        visibility: b
      });
      u = Math.round(e / 2 - f.clientWidth / 2);
      t = Math.round(j - f.clientHeight);
      c({
        left: u + "px",
        top: t + "px"
      })
    }
    function d() {
      var s = -1;
      for(var r = 0; r < p.length; r++) {
        if(p[r]["begin"] <= l && (r == p.length - 1 || p[r + 1]["begin"] >= l)) {
          s = r;
          break
        }
      }
      if(s == -1) {
        m("")
      } else {
        if(s != k) {
          k = s;
          m(p[r]["text"])
        }
      }
    }
    function h() {
      f = document.createElement("div");
      g.appendChild(f);
      c({
        color: "#" + q.color.substr(-6),
        display: "block",
        fontFamily: q.fontFamily,
        fontStyle: q.fontStyle,
        fontWeight: q.fontWeight,
        height: "auto",
        margin: "0 0 0 0",
        padding: "3px 9px",
        position: "absolute",
        textAlign: "center",
        textDecoration: q.textDecoration,
        wordWrap: "break-word",
        width: "auto"
      });
      if(q.back) {
        c({
          background: "#000"
        })
      } else {
        c({
          textShadow: "-2px 0px 1px #000,2px 0px 1px #000,0px -2px 1px #000,0px 2px 1px #000,-1px 1px 1px #000,1px 1px 1px #000,1px -1px 1px #000,1px 1px 1px #000"
        })
      }
    }
    h();
    this.show = function() {
      c({
        display: "block"
      });
      n()
    };

    function c(r) {
      for(var s in r) {
        f.style[s] = r[s]
      }
    }
    this.update = function(r) {
      l = r;
      if(p) {
        d()
      }
    }
  }
})(jwplayer.html5);
(function(q) {
  var m = q.html5,
    z = q.utils,
    c = q.events,
    g = c.state,
    t = z.css,
    C = z.transitionStyle,
    d = "button",
    s = "text",
    h = "divider",
    v = "slider",
    k = "relative",
    l = "absolute",
    b = "none",
    r = "block",
    A = "inline",
    p = "inline-block",
    n = "hidden",
    e = "left",
    F = "right",
    o = "100%",
    x = "opacity .15s, background .15s, visibility .15s",
    w = {
      display: b
    },
    a = {
      display: E
    },
    D = ".jwcontrolbar",
    u = false,
    j = true,
    B = null,
    E = undefined,
    y = window,
    f = document;
  m.controlbar = function(ai, aW) {
    var a7, Y, N = ao("divider", h),
      J = {
        margin: 8,
        maxwidth: 800,
        font: "Arial,sans-serif",
        fontsize: 11,
        fontcolor: parseInt("eeeeee", 16),
        fontweight: "bold",
        layout: {
          left: {
            position: "left",
            elements: [ao("play", d), N, ao("prev", d), ao("next", d), ao("divider", h, "nextdiv"), ao("elapsed", s)]
          },
          center: {
            position: "center",
            elements: [ao("time", v)]
          },
          right: {
            position: "right",
            elements: [ao("duration", s), N, ao("hd", d), ao("cc", d), N, ao("mute", d), ao("volume", v), N, ao("fullscreen", d)]
          }
        }
      },
      aH, ba, aw, R, bq, aM, bA, an, a5, ax, bm, ak, bt, bk, aL, aB, Z, bj, ap, by, U, aX, aC, M, a0, a6 = u,
      aV = u,
      aY = 0,
      W = 0,
      bu = {
        play: "pause",
        mute: "unmute",
        fullscreen: "normalscreen"
      },
      bF = {
        play: u,
        mute: u,
        fullscreen: u
      },
      bf = {
        play: al,
        mute: bB,
        fullscreen: aT,
        next: a8,
        prev: aK
      },
      bD = {
        time: bE,
        volume: aS
      },
      O = {},
      ah = this;

    function ao(bH, bJ, bI) {
      return {
        name: bH,
        type: bJ,
        className: bI
      }
    }
    function be() {
      aw = {};
      a7 = ai;
      aM = a7.id + "_controlbar";
      bA = an = 0;
      bq = aO();
      bq.id = aM;
      bq.className = "jwcontrolbar";
      Y = a7.skin;
      ba = Y.getComponentLayout("controlbar");
      if(!ba) {
        ba = J.layout
      }
      z.clearCss("#" + aM);
      bx();
      aZ();
      aa();
      setTimeout(function() {
        P();
        bz()
      }, 0);
      ah.visible = false
    }
    function aa() {
      a7.jwAddEventListener(c.JWPLAYER_MEDIA_TIME, bh);
      a7.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, ad);
      a7.jwAddEventListener(c.JWPLAYER_MEDIA_MUTE, bz);
      a7.jwAddEventListener(c.JWPLAYER_MEDIA_VOLUME, P);
      a7.jwAddEventListener(c.JWPLAYER_MEDIA_BUFFER, ag);
      a7.jwAddEventListener(c.JWPLAYER_FULLSCREEN, ay);
      a7.jwAddEventListener(c.JWPLAYER_PLAYLIST_LOADED, ar);
      a7.jwAddEventListener(c.JWPLAYER_MEDIA_LEVELS, bC);
      a7.jwAddEventListener(c.JWPLAYER_MEDIA_LEVEL_CHANGED, bc);
      a7.jwAddEventListener(c.JWPLAYER_CAPTIONS_LIST, bs);
      a7.jwAddEventListener(c.JWPLAYER_CAPTIONS_CHANGED, am);
      bq.addEventListener("mouseover", function() {
        y.addEventListener("mousemove", T, u);
        y.addEventListener("mouseup", T, u);
        y.addEventListener("mousedown", aE, u)
      }, false);
      bq.addEventListener("mouseout", function() {
        y.removeEventListener("mousemove", T);
        y.removeEventListener("mouseup", T);
        y.removeEventListener("mousedown", aE);
        f.onselectstart = null
      }, false)
    }
    function bh(bI) {
      var bH = u,
        bJ;
      if(aw.elapsed) {
        bJ = z.timeFormat(bI.position);
        aw.elapsed.innerHTML = bJ;
        bH = (bJ.length != z.timeFormat(an).length)
      }
      if(aw.duration) {
        bJ = z.timeFormat(bI.duration);
        aw.duration.innerHTML = bJ;
        bH = (bH || (bJ.length != z.timeFormat(bA).length))
      }
      if(bI.duration > 0) {
        au(bI.position / bI.duration)
      } else {
        au(0)
      }
      bA = bI.duration;
      an = bI.position;
      if(bH) {
        aR()
      }
    }
    function ad(bH) {
      switch(bH.newstate) {
      case g.BUFFERING:
      case g.PLAYING:
        t(aU(".jwtimeSliderThumb"), {
          opacity: 1
        });
        L("play", j);
        break;
      case g.PAUSED:
        if(!aV) {
          L("play", u)
        }
        break;
      case g.IDLE:
        L("play", u);
        t(aU(".jwtimeSliderThumb"), {
          opacity: 0
        });
        if(aw.timeRail) {
          aw.timeRail.className = "jwrail";
          setTimeout(function() {
            aw.timeRail.className += " jwsmooth"
          }, 100)
        }
        at(0);
        bh({
          position: 0,
          duration: 0
        });
        break
      }
    }
    function bz() {
      var bH = a7.jwGetMute();
      L("mute", bH);
      H(bH ? 0 : bt)
    }
    function P() {
      bt = a7.jwGetVolume() / 100;
      H(bt)
    }
    function ag(bH) {
      at(bH.bufferPercent / 100)
    }
    function ay(bH) {
      L("fullscreen", bH.fullscreen);
      bo()
    }
    function ar(bH) {
      t(aU(".jwhd"), w);
      t(aU(".jwcc"), w);
      bo();
      aR()
    }
    function bC(bH) {
      a5 = bH.levels;
      if(a5 && a5.length > 1 && U) {
        t(aU(".jwhd"), {
          display: E
        });
        U.clearOptions();
        for(var bI = 0; bI < a5.length; bI++) {
          U.addOption(a5[bI].label, bI)
        }
        bc(bH)
      } else {
        t(aU(".jwhd"), {
          display: "none"
        })
      }
      aR()
    }
    function bc(bH) {
      ax = bH.currentQuality;
      if(U && ax >= 0) {
        U.setActive(bH.currentQuality)
      }
    }
    function bs(bH) {
      bm = bH.tracks;
      if(bm && bm.length > 1 && aC) {
        t(aU(".jwcc"), {
          display: E
        });
        aC.clearOptions();
        for(var bI = 0; bI < bm.length; bI++) {
          aC.addOption(bm[bI].label, bI)
        }
        am(bH)
      } else {
        t(aU(".jwcc"), {
          display: "none"
        })
      }
      aR()
    }
    function am(bH) {
      if(!bm) {
        return
      }
      ak = bH.track;
      if(aC && ak >= 0) {
        aC.setActive(bH.track)
      }
    }
    function bn() {
      return( !! f.querySelector("#" + a7.id + " .jwplaylist") && !a7.jwGetFullscreen())
    }
    function bx() {
      aH = z.extend({}, J, Y.getComponentSettings("controlbar"), aW);
      R = aI("background").height;
      t("#" + aM, {
        height: R,
        bottom: a6 ? 0 : aH.margin
      });
      t(aU(".jwtext"), {
        font: aH.fontsize + "px/" + aI("background").height + "px " + aH.font,
        color: aH.fontcolor,
        "font-weight": aH.fontweight
      });
      t(aU(".jwoverlay"), {
        bottom: R
      });
      if(aH.maxwidth > 0) {
        t(aU(), {
          "max-width": aH.maxwidth
        })
      }
    }
    function aU(bH) {
      return "#" + aM + (bH ? " " + bH : "")
    }
    function aO() {
      return br("span")
    }
    function br(bH) {
      return f.createElement(bH)
    }
    function aZ() {
      var bJ = aq("capLeft");
      var bI = aq("capRight");
      var bH = aq("background", {
        position: l,
        left: aI("capLeft").width,
        right: aI("capRight").width,
        "background-repeat": "repeat-x"
      }, j);
      if(bH) {
        a1(bq, bH)
      }
      if(bJ) {
        a1(bq, bJ)
      }
      bg();
      if(bI) {
        a1(bq, bI)
      }
    }
    function aQ(bH) {
      switch(bH.type) {
      case h:
        return aA(bH);
        break;
      case s:
        return bG(bH.name);
        break;
      case d:
        if(bH.name != "blank") {
          return X(bH.name)
        }
        break;
      case v:
        return av(bH.name);
        break
      }
    }
    function aq(bJ, bI, bK, bO, bL) {
      var bN = aO();
      bN.className = "jw" + bJ;
      var bH = bO ? " left center" : " center";
      var bP = aI(bJ);
      bN.innerHTML = "&nbsp;";
      if(!bP || bP.src == "") {
        return
      }
      var bM;
      if(bK) {
        bM = {
          background: "url('" + bP.src + "') repeat-x " + bH,
          height: bL ? bP.height : E
        }
      } else {
        bM = {
          background: "url('" + bP.src + "') no-repeat" + bH,
          width: bP.width,
          height: bL ? bP.height : E
        }
      }
      bN.skin = bP;
      t(aU(".jw" + bJ), z.extend(bM, bI));
      aw[bJ] = bN;
      return bN
    }
    function X(bJ) {
      if(!aI(bJ + "Button").src) {
        return B
      }
      var bL = aO();
      bL.className = "jw" + bJ + " jwbuttoncontainer";
      var bK = br("button");
      bK.addEventListener("click", aj(bJ), u);
      bK.innerHTML = "&nbsp;";
      a1(bL, bK);
      var bM = aI(bJ + "Button");
      var bI = aI(bJ + "ButtonOver");
      bb(aU(".jw" + bJ + " button"), bM, bI);
      var bH = bu[bJ];
      if(bH) {
        bb(aU(".jw" + bJ + ".jwtoggle button"), aI(bH + "Button"), aI(bH + "ButtonOver"))
      }
      aw[bJ] = bL;
      return bL
    }
    function bb(bH, bI, bJ) {
      if(!bI.src) {
        return
      }
      t(bH, {
        width: bI.width,
        background: "url(" + bI.src + ") center no-repeat"
      });
      if(bJ.src) {
        t(bH + ":hover", {
          background: "url(" + bJ.src + ") center no-repeat"
        })
      }
    }
    function aj(bH) {
      return function() {
        if(bf[bH]) {
          bf[bH]()
        }
      }
    }
    function al() {
      if(bF.play) {
        a7.jwPause()
      } else {
        a7.jwPlay()
      }
    }
    function bB() {
      a7.jwSetMute();
      bz({
        mute: bF.mute
      })
    }
    function aP(bI) {
      for(var bH in O) {
        if(bH != bI && O.hasOwnProperty(bH)) {
          O[bH].hide()
        }
      }
    }
    function V() {
      if(a6) {
        return
      }
      bk.show();
      aP("volume")
    }
    function aS(bH) {
      H(bH);
      if(bH < 0.1) {
        bH = 0
      }
      if(bH > 0.9) {
        bH = 1
      }
      a7.jwSetVolume(bH * 100)
    }
    function bp() {
      if(a6) {
        return
      }
      M.show();
      aP("fullscreen")
    }
    function bE(bH) {
      a7.jwSeek(bH * bA)
    }
    function aT() {
      a7.jwSetFullscreen()
    }
    function a8() {
      a7.jwPlaylistNext()
    }
    function aK() {
      a7.jwPlaylistPrev()
    }
    function L(bH, bI) {
      if(!z.exists(bI)) {
        bI = !bF[bH]
      }
      if(aw[bH]) {
        aw[bH].className = "jw" + bH + (bI ? " jwtoggle jwtoggling" : " jwtoggling");
        setTimeout(function() {
          aw[bH].className = aw[bH].className.replace(" jwtoggling", "")
        }, 100)
      }
      bF[bH] = bI
    }
    function az(bH) {
      return aM + "_" + bH
    }
    function bG(bH, bL) {
      var bJ = {};
      var bK = aI(bH + "Background");
      if(bK.src) {
        var bI = aO();
        bI.id = az(bH);
        bI.className = "jwtext jw" + bH;
        bJ.background = "url(" + bK.src + ") no-repeat center";
        bJ["background-size"] = "100% " + aI("background").height + "px";
        t(aU(".jw" + bH), bJ);
        bI.innerHTML = "00:00";
        aw[bH] = bI;
        return bI
      }
      return null
    }
    function aA(bI) {
      var bH;
      if(bI.width) {
        bH = aO();
        bH.className = "jwblankDivider";
        t(bH, {
          width: parseInt(bI.width)
        })
      } else {
        if(bI.element) {
          bH = aq(bI.element)
        } else {
          bH = aq(bI.name);
          if(!bH) {
            bH = aO();
            bH.className = "jwblankDivider"
          }
        }
      }
      if(bI.className) {
        bH.className += " " + bI.className
      }
      return bH
    }
    function aF() {
      if(a5 && a5.length > 1) {
        if(by) {
          clearTimeout(by);
          by = undefined
        }
        U.show();
        aP("hd")
      }
    }
    function af() {
      if(bm && bm.length > 1) {
        if(aX) {
          clearTimeout(aX);
          aX = undefined
        }
        aC.show();
        aP("cc")
      }
    }
    function a3(bH) {
      if(bH >= 0 && bH < a5.length) {
        a7.jwSetCurrentQuality(bH);
        U.hide()
      }
    }
    function ae(bH) {
      if(bH >= 0 && bH < bm.length) {
        a7.jwSetCurrentCaptions(bH);
        aC.hide()
      }
    }
    function aJ() {
      L("cc")
    }
    function av(bH) {
      var bJ = aO(),
        bK = bH + (bH == "time" ? "Slider" : ""),
        bQ = bK + "Cap",
        bM = bH == "volume",
        bL = bM ? "Top" : "Left",
        bS = bM ? "Bottom" : "Right",
        bO = aq(bQ + bL, B, u, u, bM),
        bP = aq(bQ + bS, B, u, u, bM),
        bI = a9(bH, bM, bL, bS),
        bT = aI(bQ + bL),
        bR = aI(bQ + bL),
        bN = aI(bH + "SliderRail");
      bJ.className = "jwslider jw" + bH;
      if(bO) {
        a1(bJ, bO)
      }
      a1(bJ, bI);
      if(bP) {
        if(bM) {
          bP.className += " jwcapBottom"
        }
        a1(bJ, bP)
      }
      t(aU(".jw" + bH + " .jwrail"), {
        left: bM ? E : bT.width,
        right: bM ? E : bR.width,
        top: bM ? bT.height : E,
        bottom: bM ? bR.height : E,
        width: bM ? o : E,
        height: bM ? "auto" : E
      });
      aw[bH] = bJ;
      bJ.vertical = bM;
      if(bH == "time") {
        bj = new m.overlay(aM + "_timetooltip", Y);
        ap = br("div");
        ap.className = "jwoverlaytext";
        bj.setContents(ap);
        aB = bI;
        Q(0);
        a1(bI, bj.element());
        bv(bJ);
        au(0);
        at(0)
      } else {
        if(bH == "volume") {
          ac(bJ, bM, bL, bS)
        }
      }
      return bJ
    }
    function a9(bI, bN, bM, bW) {
      var bJ = aO(),
        bP = ["Rail", "Buffer", "Progress"],
        bT;
      bJ.className = "jwrail jwsmooth";
      for(var bR = 0; bR < bP.length; bR++) {
        var bL = (bI == "time" ? "Slider" : ""),
          bS = bI + bL + bP[bR],
          bQ = aq(bS, B, !bN, (bI == "volume")),
          bO = aq(bS + "Cap" + bM, B, u, u, bN),
          bU = aq(bS + "Cap" + bW, B, u, u, bN),
          bX = aI(bS + "Cap" + bM),
          bV = aI(bS + "Cap" + bW);
        if(bQ) {
          var bK = aO();
          bK.className = "jwrailgroup " + bP[bR];
          if(bO) {
            a1(bK, bO)
          }
          a1(bK, bQ);
          if(bU) {
            a1(bK, bU);
            bU.className += " jwcap" + (bN ? "Bottom" : "Right")
          }
          t(aU(".jwrailgroup." + bP[bR]), {
            "min-width": (bN ? E : bX.width + bV.width)
          });
          bK.capSize = bN ? bX.height + bV.height : bX.width + bV.width;
          t(aU("." + bQ.className), {
            left: bN ? E : bX.width,
            right: bN ? E : bV.width,
            top: bN ? bX.height : E,
            bottom: bN ? bV.height : E,
            height: bN ? "auto" : E
          });
          if(bR == 2) {
            bT = bK
          }
          aw[bS] = bK;
          a1(bJ, bK)
        }
      }
      var bH = aq(bI + bL + "Thumb", B, u, u, bN);
      if(bH) {
        t(aU("." + bH.className), {
          opacity: bI == "time" ? 0 : 1,
          "margin-top": bN ? bH.skin.height / -2 : E
        });
        bH.className += " jwthumb";
        a1(bN && bT ? bT : bJ, bH)
      }
      bJ.addEventListener("mousedown", a4(bI), u);
      if(bI == "time") {
        bJ.addEventListener("mousemove", bd, u);
        bJ.addEventListener("mouseout", ab, u)
      }
      aw[bI + "Rail"] = bJ;
      return bJ
    }
    function a2() {
      var bH = a7.jwGetState();
      return(bH == g.IDLE)
    }
    function aE(bH) {
      bH.preventDefault();
      f.onselectstart = function() {
        return u
      }
    }
    function a4(bH) {
      return(function(bI) {
        if(bI.button != 0) {
          return
        }
        aw[bH + "Rail"].className = "jwrail";
        if(bH == "time") {
          if(!a2()) {
            a7.jwSeekDrag(j);
            aV = bH
          }
        } else {
          aV = bH
        }
      })
    }
    function T(bH) {
      var bJ = (new Date()).getTime();
      if(bJ - W > 50) {
        aN(bH);
        W = bJ
      }
      if(!aV || bH.button != 0) {
        return
      }
      var bL = aw[aV].getElementsByClassName("jwrail")[0],
        bM = z.bounds(bL),
        bI = aV,
        bK = aw[bI].vertical ? (bM.bottom - bH.pageY) / bM.height : (bH.pageX - bM.left) / bM.width;
      if(bH.type == "mouseup") {
        if(bI == "time") {
          a7.jwSeekDrag(u)
        }
        aw[bI + "Rail"].className = "jwrail jwsmooth";
        aV = B;
        bD[bI](bK)
      } else {
        if(aV == "time") {
          au(bK)
        } else {
          H(bK)
        }
        if(bJ - aY > 500) {
          aY = bJ;
          bD[aV](bK)
        }
      }
      return false
    }
    function bd(bH) {
      if(bj && bA && !a6) {
        bj.show()
      }
    }
    function ab(bH) {
      if(bj) {
        bj.hide()
      }
    }
    function aN(bI) {
      Z = z.bounds(aB);
      if(!Z || Z.width == 0) {
        return
      }
      var bJ = bj.element(),
        bH = (bI.pageX - Z.left) - y.pageXOffset;
      if(bH >= 0 && bH <= Z.width) {
        bJ.style.left = Math.round(bH) + "px";
        Q(bA * bH / Z.width)
      }
    }
    function Q(bH) {
      ap.innerHTML = z.timeFormat(bH)
    }
    function bv(bH) {
      if(aw.timeSliderThumb) {
        t(aU(".jwtimeSliderThumb"), {
          "margin-left": (aI("timeSliderThumb").width / -2)
        })
      }
      at(0);
      au(0)
    }
    function ac(bJ, bH, bL, bI) {
      var bK = "volume";
      t(aU(".jwvolume"), {
        width: aI(bK + "Rail").width + (bH ? 0 : aI(bK + "Cap" + bL).width + aI(bK + "Cap" + bI).width),
        height: bH ? (aI(bK + "Cap" + bL).height + aI(bK + "Rail").height + aI(bK + "RailCap" + bL).height + aI(bK + "RailCap" + bI).height + aI(bK + "Cap" + bI).height) : E
      });
      if(bH) {
        bJ.className += " jwvertical"
      }
    }
    var S = {};

    function bg() {
      G("left");
      G("center");
      G("right");
      a1(bq, S.left);
      a1(bq, S.center);
      a1(bq, S.right);
      bl();
      t(aU(".jwright"), {
        right: aI("capRight").width
      })
    }
    function bl() {
      if(aw.hd) {
        U = new m.menu("hd", aM + "_hd", Y, a3);
        bw(U, aw.hd, aF, K);
        O.hd = U
      }
      if(aw.cc) {
        aC = new m.menu("cc", aM + "_cc", Y, ae);
        bw(aC, aw.cc, af, bi);
        O.cc = aC
      }
      if(aw.mute && aw.volume && aw.volume.vertical) {
        bk = new m.overlay(aM + "_volumeoverlay", Y);
        bk.setContents(aw.volume);
        bw(bk, aw.mute, V);
        O.volume = bk
      }
      if(aw.fullscreen) {
        M = new m.overlay(aM + "_fullscreenoverlay", Y);
        var bH = br("div");
        bH.className = "jwoverlaytext";
        bH.innerHTML = "Fullscreen";
        M.setContents(bH);
        bw(M, aw.fullscreen, bp);
        O.fullscreen = M
      }
    }
    function bi() {
      aX = setTimeout(aC.hide, 500)
    }
    function K() {
      by = setTimeout(U.hide, 500)
    }
    function bw(bH, bJ, bK, bL) {
      var bI = bH.element();
      a1(bJ, bI);
      bJ.addEventListener("mousemove", bK, u);
      if(bL) {
        bJ.addEventListener("mouseout", bL, u)
      } else {
        bJ.addEventListener("mouseout", bH.hide, u)
      }
      t("#" + bI.id, {
        left: "50%"
      })
    }
    function G(bI) {
      var bH = aO();
      bH.className = "jwgroup jw" + bI;
      S[bI] = bH;
      if(ba[bI]) {
        I(ba[bI], S[bI])
      }
    }
    function I(bK, bH) {
      if(bK && bK.elements.length > 0) {
        for(var bJ = 0; bJ < bK.elements.length; bJ++) {
          var bI = aQ(bK.elements[bJ]);
          if(bI) {
            if(bK.elements[bJ].name == "volume" && bI.vertical) {
              bk = new m.overlay(aM + "_volumeOverlay", Y);
              bk.setContents(bI)
            } else {
              a1(bH, bI)
            }
          }
        }
      }
    }
    var aR = function() {
        clearTimeout(a0);
        a0 = setTimeout(ah.redraw, 0)
      };
    ah.redraw = function() {
      bx();
      var bJ = aI("capLeft"),
        bI = aI("capRight");
      t(aU(".jwgroup.jwcenter"), {
        left: Math.round(z.parseDimension(S.left.offsetWidth) + bJ.width),
        right: Math.round(z.parseDimension(S.right.offsetWidth) + bI.width)
      });
      var bH = (bq.parentNode.clientWidth > aH.maxwidth),
        bK = a6 ? 0 : aH.margin;
      t(aU(), {
        left: bH ? "50%" : bK,
        right: bH ? E : bK,
        "margin-left": bH ? bq.clientWidth / -2 : E,
        width: bH ? o : E
      });
      aD()
    };

    function bo() {
      if(a7.jwGetPlaylist().length > 1 && !bn()) {
        t(aU(".jwnext"), a);
        t(aU(".jwprev"), a);
        t(aU(".nextdiv"), a)
      } else {
        t(aU(".jwnext"), w);
        t(aU(".jwprev"), w);
        t(aU(".nextdiv"), w)
      }
    }
    function aD() {
      var bJ, bI, bH;
      aL = z.bounds(bq);
      for(bI in O) {
        bH = O[bI];
        bH.offsetX(0);
        bJ = z.bounds(bH.element());
        if(bJ.right > aL.right) {
          bH.offsetX(aL.right - bJ.right)
        } else {
          if(bJ.left < aL.left) {
            bH.offsetX(aL.left - bJ.left)
          }
        }
      }
    }
    ah.audioMode = function(bH) {
      if(bH != a6) {
        a6 = bH;
        t(aU(".jwfullscreen"), {
          display: bH ? b : E
        });
        t(aU(".jwhd"), {
          display: bH ? b : E
        });
        t(aU(".jwcc"), {
          display: bH ? b : E
        });
        aR()
      }
    };
    ah.element = function() {
      return bq
    };
    ah.margin = function() {
      return parseInt(aH.margin)
    };

    function at(bH) {
      bH = Math.min(Math.max(0, bH), 1);
      if(aw.timeSliderBuffer) {
        aw.timeSliderBuffer.style.width = bH * 100 + "%";
        aw.timeSliderBuffer.style.opacity = bH > 0 ? 1 : 0
      }
    }
    function aG(bK, bO) {
      var bI = aw[bK].vertical,
        bN = bK + (bK == "time" ? "Slider" : ""),
        bM = 100 * Math.min(Math.max(0, bO), 1) + "%",
        bJ = aw[bN + "Progress"],
        bH = aw[bN + "Thumb"],
        bL = u;
      if(bJ) {
        if(bI) {
          bJ.style.height = bM;
          bJ.style.bottom = 0;
          if(bJ.clientHeight <= bJ.capSize) {
            bL = j
          }
        } else {
          bJ.style.width = bM;
          if(bJ.clientWidth <= bJ.capSize) {
            bL = j
          }
        }
        bJ.style.opacity = ((!bL && bO > 0) || aV) ? 1 : 0
      }
      if(bH) {
        if(bI) {
          bH.style.top = 0
        } else {
          bH.style.left = bM
        }
      }
    }
    function H(bH) {
      aG("volume", bH)
    }
    function au(bH) {
      aG("time", bH)
    }
    function aI(bH) {
      var bI = Y.getSkinElement(bH.indexOf("volume") == 0 ? "tooltip" : "controlbar", bH);
      if(bI) {
        return bI
      } else {
        return {
          width: 0,
          height: 0,
          src: "",
          image: E,
          ready: u
        }
      }
    }
    function a1(bH, bI) {
      bH.appendChild(bI)
    }
    ah.show = function() {
      ah.visible = true;
      bq.style.opacity = 1
    };
    ah.hide = function() {
      ah.visible = false;
      bq.style.opacity = 0
    };
    be()
  };
  t(D, {
    position: l,
    opacity: 0
  });
  t(D + " span", {
    height: o
  });
  z.dragStyle(D + " span", b);
  t(D + " .jwgroup", {
    display: A
  });
  t(D + " span, " + D + " .jwgroup button," + D + " .jwleft", {
    position: k,
    "float": e
  });
  t(D + " .jwright", {
    position: l
  });
  t(D + " .jwcenter", {
    position: l
  });
  t(D + " buttoncontainer," + D + " button", {
    display: p,
    height: o,
    border: b,
    cursor: "pointer"
  });
  t(D + " .jwcapRight," + D + " .jwtimeSliderCapRight," + D + " .jwvolumeCapRight", {
    right: 0,
    position: l
  });
  t(D + " .jwcapBottom", {
    bottom: 0,
    position: l
  });
  t(D + " .jwtime", {
    position: l,
    height: o,
    width: o,
    left: 0
  });
  t(D + " .jwthumb", {
    position: l,
    height: o,
    cursor: "pointer"
  });
  t(D + " .jwrail", {
    position: l,
    cursor: "pointer"
  });
  t(D + " .jwrailgroup", {
    position: l,
    width: o
  });
  t(D + " .jwrailgroup span", {
    position: l
  });
  t(D + " .jwdivider+.jwdivider", {
    display: b
  });
  t(D + " .jwtext", {
    padding: "0 5px",
    "text-align": "center"
  });
  t(D + " .jwoverlaytext", {
    padding: 3
  });
  t(D + " .jwvertical *", {
    display: r
  });
  C(D, x);
  C(D + " button", x);
  C(D + " .jwtime .jwsmooth span", x + ", width .15s linear, left .15s linear");
  C(D + " .jwtoggling", b)
})(jwplayer);
(function(d) {
  var c = d.html5,
    a = d.utils,
    e = d.events,
    b = e.state;
  c.controller = function(j, k) {
    var o = j,
      l = k,
      s = j.getVideo(),
      z = this,
      L = new e.eventdispatcher(o.id, o.config.debug),
      u = false,
      p = -1,
      D, M, g, B = [];
    a.extend(this, L);

    function Q() {
      o.addEventListener(e.JWPLAYER_MEDIA_BUFFER_FULL, t);
      o.addEventListener(e.JWPLAYER_MEDIA_COMPLETE, function(U) {
        setTimeout(G, 25)
      });
      o.addEventListener(e.JWPLAYER_MEDIA_ERROR, function(V) {
        var U = a.extend({}, V);
        U.type = e.JWPLAYER_ERROR;
        L.sendEvent(U.type, U)
      })
    }
    function v(U) {
      if(!u) {
        l.completeSetup();
        L.sendEvent(U.type, U);
        if(d.utils.exists(window.jwplayer.playerReady)) {
          d.playerReady(U)
        }
        o.addGlobalListener(q);
        l.addGlobalListener(q);
        L.sendEvent(d.events.JWPLAYER_PLAYLIST_LOADED, {
          playlist: o.playlist
        });
        L.sendEvent(d.events.JWPLAYER_PLAYLIST_ITEM, {
          index: o.item
        });
        O();
        if(o.autostart && !a.isMobile()) {
          H()
        }
        u = true;
        while(B.length > 0) {
          var V = B.shift();
          F(V.method, V.arguments)
        }
      }
    }
    function q(U) {
      L.sendEvent(U.type, U)
    }
    function t(U) {
      s.play()
    }
    function O(U) {
      A();
      switch(a.typeOf(U)) {
      case "string":
        S(U);
        break;
      case "object":
      case "array":
        o.setPlaylist(new d.playlist(U));
        break;
      case "number":
        o.setItem(U);
        break
      }
    }
    function S(V) {
      var U = new c.playlistloader();
      U.addEventListener(e.JWPLAYER_PLAYLIST_LOADED, function(W) {
        O(W.playlist)
      });
      U.addEventListener(e.JWPLAYER_ERROR, function(W) {
        O([]);
        W.message = "Could not load playlist: " + W.message;
        q(W)
      });
      U.load(V)
    }
    function H(V) {
      if(!a.exists(V)) {
        V = true
      }
      if(!V) {
        return h()
      }
      try {
        if(p >= 0) {
          O(p);
          p = -1
        }
        M = H;
        if(!D) {
          D = true;
          L.sendEvent(e.JWPLAYER_MEDIA_BEFOREPLAY);
          D = false;
          if(g) {
            g = false;
            M = null;
            return
          }
        }
        if(f()) {
          if(o.playlist.length == 0) {
            return false
          }
          s.load(o.playlist[o.item])
        } else {
          if(o.state == b.PAUSED) {
            s.play()
          }
        }
        return true
      } catch(U) {
        L.sendEvent(e.JWPLAYER_ERROR, U);
        M = null
      }
      return false
    }
    function A() {
      M = null;
      try {
        if(!f()) {
          s.stop()
        }
        if(D) {
          g = true
        }
        return true
      } catch(U) {
        L.sendEvent(e.JWPLAYER_ERROR, U)
      }
      return false
    }
    function h(V) {
      if(!a.exists(V)) {
        V = true
      }
      if(!V) {
        return H()
      }
      try {
        switch(o.state) {
        case b.PLAYING:
        case b.BUFFERING:
          s.pause();
          break;
        default:
          if(D) {
            g = true
          }
        }
        return true
      } catch(U) {
        L.sendEvent(e.JWPLAYER_ERROR, U)
      }
      return false;
      if(o.state == b.PLAYING || o.state == b.BUFFERING) {
        s.pause()
      }
    }
    function f() {
      return(o.state == b.IDLE)
    }
    function C(U) {
      if(o.state != b.PLAYING) {
        H(true)
      }
      s.seek(U)
    }
    function x(U) {
      l.fullscreen(U)
    }
    function r(U) {
      o.stretching = U;
      l.resize()
    }
    function I(U) {
      O(U);
      H()
    }
    function J() {
      I(o.item - 1)
    }
    function m() {
      I(o.item + 1)
    }
    function G() {
      if(!f()) {
        return
      }
      M = G;
      if(o.repeat) {
        m()
      } else {
        if(o.item == o.playlist.length - 1) {
          p = 0;
          A();
          setTimeout(function() {
            L.sendEvent(e.JWPLAYER_PLAYLIST_COMPLETE)
          }, 0)
        } else {
          m()
        }
      }
    }
    function y(U) {
      s.setCurrentQuality(U)
    }
    function R() {
      if(s) {
        return s.getCurrentQuality()
      } else {
        return -1
      }
    }
    function P() {
      if(s) {
        return s.getQualityLevels()
      } else {
        return null
      }
    }
    function T(U) {
      l.setCurrentCaptions(U)
    }
    function K() {
      return l.getCurrentCaptions()
    }
    function E() {
      return l.getCaptionsList()
    }
    function w() {
      try {
        return o.getVideo().detachMedia()
      } catch(U) {
        return null
      }
    }
    function n() {
      try {
        var U = o.getVideo().attachMedia();
        if(typeof M == "function") {
          M()
        }
      } catch(V) {
        return null
      }
    }
    function N(U) {
      return function() {
        if(u) {
          F(U, arguments)
        } else {
          B.push({
            method: U,
            arguments: arguments
          })
        }
      }
    }
    function F(W, V) {
      var U = [];
      for(i = 0; i < V.length; i++) {
        U.push(V[i])
      }
      W.apply(this, U)
    }
    this.play = N(H);
    this.pause = N(h);
    this.seek = N(C);
    this.stop = N(A);
    this.load = N(O);
    this.next = N(m);
    this.prev = N(J);
    this.item = N(I);
    this.setVolume = N(o.setVolume);
    this.setMute = N(o.setMute);
    this.setFullscreen = N(x);
    this.setStretching = N(r);
    this.detachMedia = w;
    this.attachMedia = n;
    this.setCurrentQuality = N(y);
    this.getCurrentQuality = R;
    this.getQualityLevels = P;
    this.setCurrentCaptions = N(T);
    this.getCurrentCaptions = K;
    this.getCaptionsList = E;
    this.playerReady = v;
    Q()
  }
})(jwplayer);
(function(a) {
  a.html5.defaultskin = function() {
    this.text = '<?xml version="1.0" ?><skin author="LongTail Video" name="Six" version="2.0" target="6.0"><components><component name="controlbar"><settings><setting name="margin" value="8"/><setting name="fontcolor" value="eeeeee"/><setting name="fontsize" value="11"/><setting name="fontweight" value="bold"/><setting name="maxwidth" value="800"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAIAAAD5ZqGGAAAAJklEQVR42mNKSUlhevToEdPXr1+Z/v37RxH+//8/htjv379BZgMA4j5LOzqaqAsAAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAaCAYAAAB/75arAAAAh0lEQVR42t2RywnDMAxAhSbJRukGPtgDdJSO0k7U4IOPBhuM8b9SIAG3p0JPFTwETxJICIFCSrkqpZ7EYFAIsbbW7s65RWsNDJK4ee/BGAMhhB2stS7WWui9n7CEGOMsaXwSZ+d/yR+cOcaY+HL8vcByyzl/7HllyX8qpexgSulBhQvl7XjxCydafIt3Z4BrAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAaCAYAAAB/75arAAAAjUlEQVR42tWRywnDMAxAhSbJRukGPtgDdJSO0k7U4INPvthgjP+VSlsSkkvpqYKH4EnCFkKl1Hhxl1LOQIFaa2Ccc1Nr7SqEmDGEAIwxBrz3QIUL9t7hjbUWaq3TRqaUWMJGMjS+l4edfy2/XHOMAWt+eJ3FTuacWS5YSgEmxviU9M/z58R0tIXEifLtATSUfIsSwhegAAAAAElFTkSuQmCC"/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="playButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAdUlEQVR42u2TsQ3AIAwE2YARMkJGyCiMwiiMwgjUFMAIjOC8lMJdiIjd+aSrr3i9MwzjHXoYMOgFmAIvvQCT4aEXYNLvEK2ZMEKvFODQVqC1Rl/sve8Faq20cMIIvUYgQR5ZMJDh6RixQIF8NMHAgMEZhrHNDU+1T3s3o0CaAAAAAElFTkSuQmCC"/><element name="playButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAABhUlEQVR42uXVzUoCYRTGcXNGR3HSDPtASyIhrIjaFJlBRBRUdAUGQQurdVfSrl2LuhEvYxR1IYroRhCEWU1/4R2Yxcz4MUlQB34bGc6D58y8r+/vl2EYczNpKvitzN9/orEEGUEoQhAyJDNs2gAJCiKIYVGIQUUIAWvQNM2jWMEGtoRNpJBAFOGJgsRDAahYRRbHuMAVznGEHaSxZBNkvyPLQhXEkUEew+riE88o4AYn2BVBCcxDgWz+G6fxhLGMPdzBWh184RUPuEUOWaSwgBBkpwAZESRxiALsqoV3EXSPSxwgLUIUc1xOAWvI4RFupeENRVxjH0moCMBvF6BiHXkUMap0lPCCM2QQh2LuwingFE8Ytwa4wTYSCEEaGVCtVo1x1Gq1CQPEiDRNM9yUy2W92WyWdF13HJHrkt2aNxoNbTAYuC555Gtq17her7f6/f7HmK+p+4dmbcysO71ez8OHZnNUDBtXKpVuu932clTM/rCb/XHt/cL5/SvT+6XvKcz3r+sbpPMfjCOvfIMAAAAASUVORK5CYII="/><element name="pauseButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAN0lEQVR42u3NoQ0AMAwDwe6/YYBncWlUyQFBBX+SickfADM/0k+AQCbJffHfqir3hZ/ADwEAowtQ1mmQzb8rQgAAAABJRU5ErkJggg=="/><element name="pauseButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAABdUlEQVR42t2WzWrCQBSFq1FSaSjaFi1iF6UFtdBdF6WhC0Hoym3BlSAu+wbddSF9xfyTJ7k9gRMJuY2Oi2w88BG5zLlHZiYzOTttiUijyP768Y2bxCKVv0nD+B/T2AY2OAcdPnOKNZtjrdx/KMCi6QJ0wTW44fOKFGtdjrXzEJPml2AA7sEEPIExeCRj1iYcM6CnOoTz2AYOuAVT8Arm4APMwDuZsTbnmCk9Dns0qxbVBj3wAFzR+iRlufT02IOLrqenA/rgGSxE64uUtaCnzx7WfwEtLtYQvIClaH2Tspb0DNmjtS9gxHldidYPKWtFz+hQgAPuwBtYi9aWlLXOPPQ6JgEu2IjWLylrQ89xAVEUSRzHkiSJpGm6C8jqBVSA8RR5nie+70sQBHmjbUZWL6CmyHiRVQAXWQfoRTbapiqA21QH6G1q9KJl5jwkDMPdi6YCzF40fVSoAB4VKqDiqKj1sKv9uK71wqn9yqzt0q/vs+Wk9QeSkdKwXIKzCgAAAABJRU5ErkJggg=="/><element name="prevButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAfUlEQVR42u2MwQnAIAxFu4EjOIIjOFJH6EiCF8fw7BQZwf5AegkU2tje8uGR5Afe5vH8mTHGZG5+EXSzSPoMCEyzCPd+9SYRZgCFb7MIJNB5XxURT7OotTYFkql5Jqq1TiGBzrvinUj2AMqSSHXHikj3GZBVpH8R9M3j+Tgn8lcGnlSSd08AAAAASUVORK5CYII="/><element name="prevButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAABhUlEQVR42uXUz0oCURTH8VKz/BNFmZJ/iMAoEmohlRRI7Yp2Qa0igyJc9Qot2vUGbnwB3yJXPYKaCi5m62LQzSymr3KE09hAi1nVgQ93hnv4wZ259878o7Jte/YXfADPcAvwIeDgFwHMKYFJoDPILw0hREQYCyKMKBZlDCEIvzMkiAhWEEdCxlURRwoZJBGTwOA4SC0nLJMb2MGujFlsIYc8DrCPrIRHZtR3mccSMtI0qTMUcYoLXKGMTxxiE8t6WSHEsI2iCirhDg94RgVDmTtHDmvjILWsBPZwqYJe8Io3vEPXDfJY10ERJGXiWjVXUYMBZ5VQQMoZlMIRblVzHSZ+qkccI62DokijgHvVbMGtnnCCjGtQu922R7rdriXPU3SQ69IajYY9MhgM6p1Ox5R3zbE0l4+tmquWZdV6vZ7hDNIf2/X3T5r17zcM40MH6d/vuiGleWpD9vv9SrPZHDLn2JAuR0QFTR0R0zTLrVbr2xHx7NB6do14drF5dtV6c/n/7foCpva8IJ04vWUAAAAASUVORK5CYII="/><element name="nextButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAdklEQVR42u3OwQnAIAyF4WzgCB3BERypI3QkwYtjeHaKjGBfIeClFmvaWx58KAg/ks329WqtBbbBW7vMhhowBH2o2/WhLoJTh0QBrw4JfhXKObcBlnMulFJqNwp4uS+HIjjCNKGDZKshhkCYJlRge/ot2Ww/7gSJGQaejWvrvwAAAABJRU5ErkJggg=="/><element name="nextButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAABjElEQVR42uXUPUvDQBwGcNvUatOK4kuKfUEERVGwg/iCguimuAk6iQqKOPkVHLr5DVz8An4LO/kR2jQtZMjaIbRLhvOpPOHOJMahnfQPP5IcyXO5S+5G/ngJIRKUpMRvwiEyIAWjPl5rlApIhgJ5YxoykIMJHnUYJx2ylGFHWjAozQdnoQBlKIIBM2RAnsdpBqa/hbHRgCWowBZswjoss30V1nhcYKe6P0w/aAoWYRua8ABncAKHcABHQlaFbz0JY/589YPm2Psxb+zBCzzCLVzBtWAxeIVvlQHND5rnUC5ArXd4hio8Ke2nsAF5OTwEcWJ32WuwHHiDV6XtnB0XIKsGlWAP7iCqXKgp15ewA8VgUBn24R5+Kk85v+EISpCLDLIsS0Rpt9sez+OC5NDq9boIarVabrfbrfE6bmhysoMhtm07nud9TTbb4iZbfn41xHGcD/Xzsz3u88sfsn9jo9HodTqd0A/JoLgfUi4R0zSbrutGLhEGxS2RwRftMLeRwTe2oW21g2/+/6c+AdO5vCABA1zBAAAAAElFTkSuQmCC"/><element name="elapsedBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="timeSliderCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcCAYAAABCgc61AAAAD0lEQVQoFWNgGAWjYGgCAAK8AAEb3eOQAAAAAElFTkSuQmCC"/><element name="timeSliderCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcCAYAAABCgc61AAAAD0lEQVQoFWNgGAWjYGgCAAK8AAEb3eOQAAAAAElFTkSuQmCC"/><element name="timeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAALElEQVQY02NkQAOMg1aAmZn5P4oALy8vqoCYmBiqgIKCAqqAmpoaxQJDJsQA+54Krz/ExkoAAAAASUVORK5CYII="/><element name="timeSliderRailCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAWklEQVR42tWLsQlAIQwFBcVKGyEGK61cJ/tXGeVptPjwN/DgQnIQ9xYxRgkhqPceLqUkW5g5Z7g91BYiQq31BDAzxhjmDb13zDnN+/IP0lr7glFKkX3oCc+wAHpnIpi5hlqoAAAAAElFTkSuQmCC"/><element name="timeSliderRailCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAVklEQVR42tXJMQ4AIQhEURKMFZZCrLDyOty/4ijsYuJWewEn+c0buGeIGKUUr7XahtZaENHJgJmj9x7vkTnMOSMTkY2w1opMVX/BPxhjJNgBFxGDq/YAy/oipxG/oRoAAAAASUVORK5CYII="/><element name="timeSliderBuffer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAE0lEQVQYV2NgGErgPxoeKIGhAQB1/x/hLROY4wAAAABJRU5ErkJggg=="/><element name="timeSliderBufferCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAJ0lEQVQYlWNgGGrAH4jvA/F/GOc/EobLwAX+ExTA0IJhKIa1QwMAAIX5GqOIS3lSAAAAAElFTkSuQmCC"/><element name="timeSliderBufferCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAJ0lEQVQY02NgGErgPxDfB2J/ZAEY9kcXuI8u8J+gwH2chqJYOzQAALXhGqOFxXzUAAAAAElFTkSuQmCC"/><element name="timeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAALUlEQVQYV2NgGCqA8T8QIAuwoPEZWD58+IAq8Pr1a1IF3r59iyrw9+9fhqEJABv9F+gP7YohAAAAAElFTkSuQmCC"/><element name="timeSliderProgressCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAASklEQVR42tXDQQ0AIAwDwDqcPhLQgAlM8JqDORilnyVY4JLDX0iaOgWZaeccVkSEKyv23nxjrcU35pyurBhjWO+dFZDWmqkr8Y0Lr65i67XRzKcAAAAASUVORK5CYII="/><element name="timeSliderProgressCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAS0lEQVQY09XDQQ0AIRAEwXa4+iYBDZjABC8c4ADmHheStUAlBc/wb9oOAM45vvfewVrL6WSM4Zzeu3Naa04npRTftdZAkiVNScFTPhkFYuvY2zeUAAAAAElFTkSuQmCC"/><element name="timeSliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAcCAYAAABYvS47AAAAwElEQVR42tWTPQrCQBCF84OsYJCIYEQrsZAU6QKx9xheyG4L6zTZs3iInGZ9Tx4iAWHaDHwwvPlgyWY2mVvFGNNf/gmZyEUm0q+kwQI4sBROWf6R2ShcgRJsRanM0UnUrEEFTuBC1FeaOYoF2IMaXMGNqK81KyhuwDmEcB/H8RVV7JlxRofiDjTe+0eclLKGDsUDaPu+91NRWUuH4hF0wzA8p6Kyjo5ZNB9t/hjz9Zgv3PwLzUthXjPT4hqewrzqDfMnQ2tu8Pr1AAAAAElFTkSuQmCC"/><element name="durationBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="hdButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAMAAACu5JSlAAAAZlBMVEUAAACysrLZ2dkmJiYuLi4xMTE3Nzc8PDxAQEBJSUlRUVFSUlJaWlpdXV1jY2NpaWlsbGx0dHR3d3d4eHh9fX2KioqPj4+SkpKVlZWXl5ehoaGpqamsrKyysrK3t7fCwsLNzc3Z2dkN+/dcAAAAA3RSTlMAf3+Sa81KAAAAh0lEQVQoU+3J0RpCQBCA0dW/i02KpEIzzPu/ZJc+7CM4t8e5k3PuYgmX9VNttv2W2iww9gDhe/iK3mZYHhRVIBwe+l9PYQWjzbB/BYB6gdl096ra4WP0PD/kqh25qq4vIjfuIvBuuMrkaURk8yUvGUAiefSU0/5hkJZSPECcZP8J62epztzpDzcuFrDsGN7pAAAAAElFTkSuQmCC"/><element name="hdButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAYAAACZOmSXAAACFUlEQVR42u2WsWoCQRCGE42I5AikkSBaGSwsAiIpQi4BK0vF+qwEjb1gaWMlaGfvA5xYWvgCNraChY0+gU+wmR3+DcPGC0lQrnHg43bvbv5/d25v764uYYdS6voc/MY0AqLEzYmICt3roJlGiRgRJxLELXD+g8hPQDPGHnIAwjiOpHsiSaSINMj8CeRBIwlNBx7RY8Z3xAORJZ6IZ+KFeCXcP/KK3GdoZbU2POLGPIJyOLiYJ96ICuERDaJJtIiPX9JCTgMaFWjm4eHIBRZHWR6Jd8JXpw8f2o/aS5Y8QSRRnqo6X1ThkTTmN1iRKTwfz87o9/sql8updrutTBSLRT63WCzUZDLhtoCvT6dTW8qDR8o2T2OBNL5leJ4WZBMd+/3+y+RwOKhut8vtUqnE92JgfLSiAY+0NHeIDFZo085gI5gvl0s+GjMKPpoq2IOzogmPzDFzl1eriPV6zSI2eAw8c/TZ1M6RAW33R/PtdqsMo9GIRQqFgqrVagy1+dxwOFSz2YzbrutaOeIckOaBZd9sNgro2bFQp9Mx575m5fu+6vV63K7X63xttVqZwfE1qSXLHrjgZEK5XGah8XjM/fl8bsx1nyuBWcqq6DweiNSSCy7wVZMJMNKm3B8MBkac+zCT8CBgLLFetYBNBjefHLnJBG6vu93OP7Wx1pTba6gfllA/qaH+TIT6GxXaD2Q4v86XoPgE1h55oNE1QD4AAAAASUVORK5CYII="/><element name="ccButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAMAAACqEUSYAAAAXVBMVEUAAACysrLZ2dkmJiYuLi4xMTFAQEBHR0dJSUlKSkpRUVFSUlJaWlpdXV1jY2N0dHR9fX1/f3+Pj4+SkpKVlZWXl5ehoaGpqamsrKytra2ysrK3t7fCwsLNzc3Z2dky1qB2AAAAA3RSTlMAf3+Sa81KAAAAe0lEQVR42uXNQRKCMBAAQWCCIgGCGEU3sv9/JpXykCLxB8y1D1OdsEaLmqT6p6M6wKn6FuyWaUQL9zdcW2yuLV49dmTUL2S6gcYsr+IbwgdC7MYj/EoqIoZFHF1PL08QkYNO0MG8wMUw5LoOwCQyG+jWTMuS1iXW1SnbAaDLE32SOX+lAAAAAElFTkSuQmCC"/><element name="ccButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAB8UlEQVR42uWWsWoCQRCGEzUcEhFsQpCzUiwsBBGLoElrp0HbsxI09j6ClaXgW5xYWvgCNhaWFjb6BD7BZmb5HWSXXAw5rnHg43bd3f/fG+f27uE+Qyn1GCa3mMVAnEj8k7jowdwyxKQnwiGSxDNI/Qmsg4YDzbh15/jRwaIM8UJkCRfkbsQFWWhkoOmwh2nqEGnilcgTZaJGvBF1onEjdaypQSMPzbRlzLvBYIl4J9qER/SJATEkvn5hiLl9rG1DqwTtFFId06ZIQ4H4IHwVXvjQLMDDkcJC/svEpwo5oFmGR1JSjD++ptNixGQyUcViUeD+JRaLhapWqzLmeZ46n8+mhAftLKo6cTF1UQB921AEpT2bzdRms5F+q9Vic5lnRB/armmaI+ooBAkI6TvCnYnwaDTitr5ynE4n2YQRA9aGR8o0baAKOXSaRMQOufP1eq2CApqNQNPD4aCY3W4nptS36Ha7emy5XHL/R4JNkd79fq8uVCoVLez7vu5Pp1Pd73Q6qtfrcZuvemy1WskmrzQC0yuFdL1gPB5rERhJez6f80ak32w29QbxHxumdiFZj8z1gu12KwUD9EYwzuYwk43xGsPUfmSswwGTwyLwcJBj8Hg8+mEZklbgMRj9gR/9qy36l3j0nyuRfphF+wl69/ENcVv6gzz3ulwAAAAASUVORK5CYII="/><element name="muteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAA30lEQVR42u2UzQmEMBCFtwNLsARLSAkpwVJSwpZgCQEv6skS5iieLCElzL6FJwxCDlllT3nwkb8hXxLQV01Nzc/Z9739l8gBBRE0j94AiBk3oAceJCCPCM2GauY6zh3AsR/vit5AT8zzBbZCoWdNWypQS0YmQM2tekpDkWzbNs1xqRMQwGraMtk8z5rD1k3TJJgLYF2WZfi2oEw2jqPm4HoHhHMOJNCDAxTLnGHIyALXhRLPmnsfOU+dTpkRJooc+/F1N/bpzLjhITxFAp77i1w3440UxALRzQPU1NTk8gF0y3zyjAvd3AAAAABJRU5ErkJggg=="/><element name="muteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAC2UlEQVR42u3WPUwTYRzHcWmBFnqKBYpAHVSQoEB8QTQaiMSILhgDiiFxUBMSlUETnYiDg9GJmDA44OCgo8bF18EFibq5MEBpeUsDIaVAm6P02qTUb5N/k5P2oNg46ZN88tz1yT2//p9e77lt/1u6Fo/Hc9L5GwEmmJGrY4bpz0JlcoOAPFhRCAU2FMAi46YtBa4LyEM+LBKwHSUoh1OUYaeM5yUDtxpSAAVFKJZJd6MGh9GEY6jHXjigpAQaBskySQWlcMpE+3FQJj+DDtxBN9pxCjUogw25yEkJEWbkw4ZiqaBWJm9GK86jEz0YRKKNok9Cm1El11th/i1QF2TBDuxCtYS0oQv3MIObuI+nGMIwIljAQ1xGI5xQINWlBhXBiTqclgtv4xXCUsUTDOADotAwIsce9OIsqmFHPkzJsORvpKACDVLNNfThJ/TtBb7ADRfCEjQm4/3okHkcyaXU3xAW2FEtFW3U3uAbVDn3IQYvQhjGVTSiHIX6MDMK4EA9LsRisbgR2jt8wg/OtbW1NZU+Qu+nX6T/zth1nEBl8q5cH1aGQ+icmpqKG9GHeb1ebWlpSZ2bm4v4fL7A7OzsIn1GYQ7Uod3lcsWN0N6GQqGhyclJNXG+srLic7vdseXlZa/H4wkRnLKMRr9ZFVr8fv8jLh4MBAKv+fbudWEvCfs8Pz/vUVXVRbXaxMRENBgMjiXGV1dX094g6e7GcqmuFVfQiwcszfvx8fGwhPXjGYEf+SxKNRqhI4nj6elpw1vf6A9dgRo0yUWXcINv/piJvRzfRV80Gh1gBb6yAsMERahugc82/FOnC1RQonvYHkELzoXD4S76i+jGLYKeJ6qlolGCtvC4gv5Jr9tGKrEPB9CAoziJNnRqmtaz2YM40+3FCgV2OHT71x7UStXH0ZTJFpNpqEWqtUnFRShFxWabZ1bvHLpd2yrhijB4LcjyXSSLF56sw4WE/HPtFwoiecfnKRGcAAAAAElFTkSuQmCC"/><element name="unmuteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAk0lEQVR42u2NwQnDMAxFtUFH6AgdISN0hI6UEf4Oxgdvkas9RUZQ/yEBYdChgoZC9eCBLBs/SZLkjxlj3Ol2RehJd6rfDq1UT81eKcwZVCMB9Zw/p7CzfErvXT2ndzB3kAitNfUUQ60V555zLFZKUU/zBscOdo7EFiOcmFLMcQli4y+6Bz4LBx90E3JV8CZJkvwsb8qa9F25tXYIAAAAAElFTkSuQmCC"/><element name="unmuteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAACOUlEQVR42u3WS2sTURjG8ZqJuTSJTW1T26YqrWmN1jt2ISpWTb1ABS3iRkS84WUndlNQFN34Fdy5d+U36MJVQVroKgnmvgqBZBV3Gf8DTyQMzMggRZC+8CNnJsn75CRnzqRvu/6/Mk1zRw8fwBhbEeSDAT92ih+cU7D8dYiahxFFTPoR1HOG+Fxm7h6kRiE1H8Y49iKJEcQRRRghhQegmTuFKkQMBBDBbkwgjVOY0+Mh7McoEhjSa+OIIawehluYgSB2YQ9SOI0MbuEFfuCizs8ijYOYwRSSCo8g0J2hU9AAkmp0AbfxDJ/RhlV3sYgFZPR4GedwApMKDMNvD+v+RlGM4aga3McKvqO3XuKhxt/wFI+xClOBScTU12dfEEEMIqUZudU7vMKajjewrvGqZjiFOAL2MANhJHAENzqdjumE+ojXeMvxJkyxAh/hEqYxiKBT2AiOY6lQKJhOesNqtdpm93y1WvUUlsAsFrPZrOmEeo/lcrm8Zh1XKpUNxuvWuFgsun6N9t/sAM43Go0PzWbzU6vV+sInztvClvHEGpdKpd8LxArinPMCsa9GjGp287iD51ip1+tfc7ncTzV7gJu4igVc8bL07Rf0GGYwhwyWcI9Zvsnn80XG13EGx3AYafzxonYKjOoNE2pyEmcx3263r2nLmu7ZJ4e9b1ew7fQxhY5jUgEp7FPIAPq9bcTut5cQoohjSOKIIKjGhrjeYryEBhWMnnuZ9+buoaJgUcjW/xeRvu36F/ULlStUoyVtQSYAAAAASUVORK5CYII="/><element name="fullscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAbElEQVR42u2R0QnAIAxEu1lWc5/+ZYKs4TTWjwS0qIFrP+/BkYMLOdCLELKn1tpG5TleYF2yyMUzvCAOZDtwgU85PJGE/+NPyuTJG1Uts/9+sI0+y6GCrtunLHKJHbjAZYcd8x28IJTmhJAtD4gEt9ueDIktAAAAAElFTkSuQmCC"/><element name="fullscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAACFUlEQVR42t2W324SURCHhS67VCoFbYhRkbQsaCwVSwgUaZP2yia9Mb6MN41vYfpIfYIm5QIegJfA3yTfSU52c1i98KabfGGYmd+cPX+Gw7On+2w2m5JPUfxfC5dhB8pQKooXvjGCiohFFRJ8EVTwVSHGtxOckSuOsCb2xUsDe0/swl42jiZxg2wr/kK0REf0DOzX4hXIzsVbaPODsH4VUSOxL8biwsD+SCEhOx/vo61Rq5zd1JipdhBkn6k4hmk2iKZDjdhtuj9Awnqm4twTPopf4lKM4BLfo0tCk1IjCQ3QFF0xR+QK/BBXYgxX+PycOdpmaAC3RG1xiui7uMWeic8ww3dLzgZNO7tEoU1OxYhpX7Dmd+KDgT0ldk5umt/k/DGtioZ4y/E7EUMx4JQcQR/fkJwemgY1OKbhAd6wnscU+ESRQ+jhOyGniyY4QFlE4rk4sCKIJyzFaLVa/XaNhT0iNiH30LTUiEJ9UGeqg8ViYRv3TVxjj80PY3zXloM9QFvf1gcN3mRiIr3pvX2u1+ufHMMvMDefn2MatI2iPjgSZyYylsvlg77fiK/umGLfWMzlmQbt3/UBQoc7530IxLf3QeT3AYIZbzbE9w5SfGfknGb6IAr1Qez9XL8XXabdxtc0sNvEuuS20MZFd0LsXThNqOOrQg0fcS6cXPHiKzOB2L8yg3GKG4WXfoBSUfz//W15ss8fvEcYMYnLr+AAAAAASUVORK5CYII="/><element name="normalscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAbElEQVR42u2Q0QnAMAhEu5kD588JXMNpbIUEpCBpe5+9B4JczF3MQQjpcfeBz+4vxpMe2ULSIF9YjaqWM+hXWRrdA2YZah61Wv2/qGrU6nQkQK6yLmCeCbzFCmk02FxWX/WyYXw1H69mCSEtJ16St50Fqd0HAAAAAElFTkSuQmCC"/><element name="normalscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAACDUlEQVR42u2Vy0ojURCGZ9Kmk4A63cYLMhdE28tCECUgxCuzGBDc6AgO7uYizKAP4NKNb6S+g08gSZO8QZ7h+Bd8ScDDIZmsLfhIpc7/V53uPnS/e4uRwjn3vsto2sHiggdrw2iGaT4miiKGEhShBDEU8YSH9Jr3G4yLSZGID+Q9qCXk0rIBhoSaj4kyxlnxUXyBz+ITKKcuDdoEb+9KQrufEHPiXqyLLVETmwDUpEE7h7cYGhBxmQk72xAWR+KY/Bs4akfkG3gSekTebaJYFlWxKLbFDQ2e+P0BvRqabTxVekT+M+gPmBKZ2BWn4tn146czCNa+o83wlkNXUGAxRVx3fvyC11HHk9KjQFtvQIxoSeyIE/Fb/BWX5EK5auQnaJfwxsMMyMSeOKPZVX8IzVUjP0Ob+QP8Y1rhPq6Kg2az6Yw8z12j0XCKf4blVuuum9Y8eCvBY8ritFgTXzudzl273c4VzlBcG93/tmYa05oHb2XQMZ0RK2JfnFujVquVs9M/huVWY+g52hXzDjqmJe7jgqhZI+3wVvkFA04N8gtbI6/hSekRhV4VMS+vee3uAeOeOOSs1w3yQ9Zq0j6aB2/sPwP/ZTeFYUEsc/mZWISM2jKaeTzeyy50FWV2k/LgquQJpNSmySfxeLsPfnAQlzCC1dgAoInxDP9Vg8gAauG1//82I/ZM1DztW4wSL9xQTRdfTNL0AAAAAElFTkSuQmCC"/></elements></component><component name="display"><settings><setting name="bufferinterval" value="100"/><setting name="bufferrotation" value="45"/><setting name="fontcolor" value="cccccc"/><setting name="overcolor" value="ffffff"/><setting name="fontsize" value="15"/><setting name="fontweight" value="normal"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA8CAIAAAAok0etAAAAJUlEQVR42mNKTU1lunnzJtP///+ZGBgYwDQ6xiVOrhw1zSNRPQBu5Zagca3K1AAAAABJRU5ErkJggg=="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA8CAYAAABfESsNAAAAnElEQVR42u2WvQ2DMBCFv8I1M3gjMoTpMwqjkI1S0RnJEhaiuZcFEuyCBCnyqz+9+9XpHMAwDD0wAp4PciGEXtK0risxRvZ9fw+a2ZhzZp5njuTMzC/LQklOEtu21YGSyqCZ1YHfcazR1Tle6FjVnr+q+vz2XJxjW4p2Utr2tFn/OvT5s5b0BHwJdmZ2Bybg0NmllB5d190kHb5cL8J5WhbWZJeBAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA8CAYAAABfESsNAAAAmklEQVR42mNKTU39jwffB2J/BiBgunnzJgM2/PjxY4bPnz8r/P//f0NKSoo/E5DBgA1//fqV4enTpyDFDP/+/ZvAxEAAvHnzBqRQAaeJMPzz508wTVAhDBOlEGg1LUxkIAIMtBsH0ERigmf4+XpggodGbhxNFKNFymiRMhrXA1Gk0D+uoQH+gIkIRSCrC5gIeOIBkA74+PHjRgDhswBcaL43lQAAAABJRU5ErkJggg=="/><element name="bufferIcon" src="data:image/png;base64,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"/><element name="errorIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACL0lEQVR42u2T64nCUBCF7SAlpIQtISVYQkrYElKCJaSElHBL8LfPKD7wyUXxgYrOzkCyHC6b3LgasywOfBDuOTNzcklq73rXfygiqjMxk1YsZ38lXIOyq1F1OI/s5VUZsAlBNOMlaDhvVhXOZ7B80D4ztNeV+VNY9VdUzg3VM/5srM9XhXOMb0zleJXxjTqlB7xer8HtdiPAy/KKhl7pLTXc5XJxGc1QggJNIXgOfs24pQU8nU4hQynn89kFjZD0XDyGFpYS7nA4uMfjkYAQddQEQwtRk1lPD7jb7SKGUvb7vWvoTdCbqIkXNCF6arjNZuNtt1sCAtPDZwp09YMe4AyZ+bSAWmvFUILm4Y7Fo0xderQUep5Rq9XKW6/XBAQ/+fi8AZ5GhicwZj1+i4vFIl4ul5QQZ/lYC8AX5Pi+58nsh8LNZjOfoZT5fO7neAPwZgaUGeIB/F+Fm0wmznQ6jRlKyH1b1uvgred5zbmy6+6Ao9EoGI/HBHh5ftF/6SXZdVe44XDoMJqhBFWgxwO/V8CvwK+Z4rfY7/eDOI4JsC4cDAYO4yVYl8lM3CE7C4XrdrsuQym9Xi+qlVQyW3YArrWp3W6HDKV0Oh1usler1fLTHnku0iOzxQ+EtiUfDAHYYOsl5I6+0Oj9yDNHYNSM84KADqOhNyq65K5fX/wP9tpfznrV9kWu7dbtn1bxgCHj1sorfKmwaEDFUMUo21XrCsNpyVD4yl8GflLvetcfqy+dCCa6ODMoXAAAAABJRU5ErkJggg=="/><element name="playIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAArElEQVR42u3YywnAIBBFUTtJaSnFUqzLhVjKZDZmI8HfGx3CPLj7AyKIjoic5pwBDWhAA+oBei5wlxMYClgGh6KBcKgUEAaVBi5DdwGnobuBw9BTwG7oaWATqgX4CdUGrKBagWX3MjCl5DmSKOe8Dowxeo7ABQ5zxGDgC4NdEhCwgmkBfsJOA5uwU8Bu2G7gMGwXcBomDVyGSQFhMDQQDkO+ZuxnwYAGNOAfgQ8LTbXBn1RvGQAAAABJRU5ErkJggg=="/><element name="playIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACJElEQVR42u2YS0sCURTHNc3sTWEPelMQUQQtKnptIojosWgdFLTIFu2qdZ8i6Cv0BVq3KUi3IqgI4hN0rS5v/xtnahh1Gqd7Z0bowA/EWcyPM/ece+9xMcZcTsbVcoJ6gedul4VhSJBLEW0a3LKFdQVVYh7gBT7QQfjoP48ia5egh4S6QT8YJPjvHuAH7bJEGwpq5PrACJgB88QsGAcBet4pQ1RPsI1eyLM0ChbABtgD+2AXrINFMAWGZIg2ajNKQfDsDYA5sA2ewRt4ANfgDByCLbAEpkWL6gl66CXDYBmcgBf2E1HwCG7BBTiWIaon6KXCGANrlK1XVhtx8ATuZYgaEZwAm+ASvLPGkZAh+psgL5BJWn9X4IP9HkJFjQrugCAIMeMhRLQZQV61YdZ86Ikq7amXGr5XK2mFYCPRI1rbi/QOvjt1UTa/Ja0U1IregXNwAFZpZwpoJe0QVLcn3kdvwCntUrOUST+tSVsFlYjQzsQ3ghXquz2URUcIKvFEa3Kaqlv5zMYFi8ViOJlMMhmUSqW/CxYKhXAsFmMiSafTkXK5LOYTixTMZDLxSqUitkhECEIsUa1W5bSZvwiqxOQ1ajOCdcSkbXVBCIYEiQk/LHwdt/L5/IdVYqYOrBB8t0rM1JE/l8u91msXMsRMXZqy2eyLqsFGqY/ZdmmquXZC6jmVSr1R57fv2un4i3tLjD4cPzxqifGb4weYjh0B/0/5m+QT3Dh1BNFdpj4AAAAASUVORK5CYII="/><element name="replayIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABxUlEQVR42u2XwY3CMBBF0wElpARKcAkpISWkhJRACS5hS3AJnOHAwoEDB2QOHJCQmP2DcrBGycZ2BtiVMtKTEGLe/NixJYq55prrxUVEBjSgBStgu88NMJ8KVXZBPI2XBxaU7wi2AJbyy7LjVeGWwNP08uzSDlcDPzLUCcZ+X79j5RyofumtgNNeSfnO+QG5SfCYIc+kd3LgQKxzpNzT9cqy2VfJ4BPr70iptXpG42JXWcXH4+EBBbhCqdgl3D5JcL/fDSBBpRWQXT3++N253W4NoABfKBc7xYwmuvl6vbaAApx2QHaKGW108+VysYAC1AOyU8yID3g+n1eAAtQDslPMiA94Op1aQAHqAdkpZsQHPB6PDaAA9UPCTjEj/pAcDgcDSJB1zez3e9Pjr3r8Jkm82+08oADe5lSH6Xqt+N4Jd/oObbdbCyhks9mYREcd9D9DskN6gU0OCFEJSODBIsGxEv22c5Ag7/9KJyTBV0K/AzSCLXKLV6vnieuEftkr+RY7khVyGQyqJ74iEp0/TxBVTGKPedX2aj1UC+jPhuTDBEgvpH7AdUJA/4GAw2GAAy2oNQ7KlEt+DWwXxoBFMddc/6x+ACbEv+zn5grUAAAAAElFTkSuQmCC"/><element name="replayIconOver" src="data:image/png;base64,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"/></elements></component><component name="dock"><settings><setting name="iconalpha" value="0.75"/><setting name="iconalphaactive" value="0.5"/><setting name="iconalphaover" value="1"/><setting name="margin" value="8"/></settings><elements><element name="button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVR42u2WQQqDMBBFQ4pQeoVueiN7BtG9R+lR7IlaAllnIZaCxHR+KWLpou7mCxE+Jm7m8b+TiTXy1HVdim5N0yQNoTYYwGKrqiqnaer6vj865x4aQm0wgMXGGC/yYfTeP4dhiBpCbTCAxQrZKYQwppSMpsAAFgAZJiGy90LbITCAhc8hBneWLs2RMegrMgZ3ZodYIuP8qSnbfpmhln66jO5gpOsyhsh4HaI7qfMs29Qsy5H9iyxfYddMe8r7EFWX5cg2FVkeritO6rtsCoILWgEWONRiY4zZy3unoU9tmNLaEMJVFmeRl48HDaE2GMDyAjEWKwKFLBqcAAAAAElFTkSuQmCC"/><element name="buttonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVR42u2WQQqDMBBFQ4pQeoVueiN7BtG9R+lR7IlaAllnIZaCxHR+KWLpou7mCxE+Jm7m8b+TiTXy1HVdim5N0yQNoTYYwGKrqiqnaer6vj865x4aQm0wgMXGGC/yYfTeP4dhiBpCbTCAxQrZKYQwppSMpsAAFgAZJiGy90LbITCAhc8hBneWLs2RMegrMgZ3ZodYIuP8qSnbfpmhln66jO5gpOsyhsh4HaI7qfMs29Qsy5H9iyxfYddMe8r7EFWX5cg2FVkeritO6rtsCoILWgEWONRiY4zZy3unoU9tmNLaEMJVFmeRl48HDaE2GMDyAjEWKwKFLBqcAAAAAElFTkSuQmCC"/><element name="buttonActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABD0lEQVR42u2XQQ6CMBREm97BeCnjIQjcxLt4KVckrKuphYIC/jEtKRu3fxaSDGlh0ZeZ/2mxRq66rs+iW9M0bw1hbTCAxVZVdVqW5eq9P7Rte9cQ1gYDWOw8zxd5ELque4QQeg1hbTCAxQrZ0Tn3XNd11BQYwAKgkUmI7DsQyklTYAALn0Nyi4lyVBZciltkDNpFpu3QrqizZcoiLeqi7dUj2xxKFa6q/C3idIiyywgiI3ZIBi9th8BQdhmFdl3GuJepn4fy8eMf2c/IEtBEENnEu9uz1BBvlzFGRvHXwRmZUMU0icpCUUfL4E7pEhwayvOIllLbD3DIY2KMUSvsvDZYrHPuLYM+v9BQgunB8gFJekgEq5c0PwAAAABJRU5ErkJggg=="/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVR42mP4//8/AzJmIF0AAHImL9Fd8LZHAAAAAElFTkSuQmCC"/></elements></component><component name="playlist"><settings><setting name="activecolor" value="bfbfbf"/><setting name="backgroundcolor" value="262626"/><setting name="fontcolor" value="999999"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/><setting name="overcolor" value="cccccc"/><setting name="titlecolor" value="cccccc"/><setting name="titleactivecolor" value="ffffff"/><setting name="titleovercolor" value="ffffff"/><setting name="titlesize" value="13"/><setting name="titleweight" value="normal"/></settings><elements><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAACCAIAAABANcwGAAAAKElEQVR42mNhGPqAmZmZiYkJQsIZuLgsvr6+Q9q3/2Dg79+/yAxcXADiODDtLQ68BAAAAABJRU5ErkJggg=="/><element name="item" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAMElEQVR42u3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAXA2RQAAEB5C4HAAAAAElFTkSuQmCC"/><element name="itemActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAkklEQVR42u3QsQkAIAxFQQsHy/4LqYWohYW9IAj34ENIeTkiRvq7vlb3ynHXB/+Wk64CCBAgQIACCBAgQAEECBCgAAIECFAAAQIEKIAAAQIUQIAAAQogQIAABRAgQIACCBAgQAEECBAgQAEECBCgAAIECFAAAQIEKIAAAQIUQIAAAQogQIAABRAgQIACCBAgQJ1NmcoiAdM9H4IAAAAASUVORK5CYII="/><element name="itemImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAAAAACpLjUBAAAAeklEQVR42mPiJQswMXCSARiYGFjIAEBtZAEmRnJ0MZJrG321jfpt1G+DzW8jMUj2lzMwlO8n2W87PMrLPXaQ7LfOHR4eOzpJ99vLe/deku63eItDhyziSfab5fGFC49bkuy3jIUMDAszRtPkaDYd9duo34aT3/6TARgA1wJNszqw3XsAAAAASUVORK5CYII="/><element name="sliderCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"/><element name="sliderCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"/><element name="sliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAAEElEQVR42mNiIA78J4AJAgCXsgf7Men2/QAAAABJRU5ErkJggg=="/><element name="sliderRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAJklEQVR42mNgIA78J4CpBu7jseQ+NS3yx2ORPwOVgT+az+6TYgkAKMIaoyp3CGoAAAAASUVORK5CYII="/><element name="sliderRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAALElEQVR42mNgIB74A/F9IP4PxfehYlQF/kgWoGOqWnYfj0X3qWnRfwKYIAAAPu0ao3yGmCgAAAAASUVORK5CYII="/><element name="sliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAAMElEQVR42mP+//8/Q0NDA16sqqr6Pycnp6G0tLShqqqqoba2tgEEGhsbG6CgkZAZAEhcK/uBtK2eAAAAAElFTkSuQmCC"/><element name="sliderThumbCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAUElEQVR42q3NoREAIQwEwHSYJjOo1IBIDfEx+EgEDMfLVwyCbWDphoig1gp3R2sNmYneO+acWGuBXimlxCEKekVV+RAxvWRm/EXxi2KMcZ1sxLJpnEUZrv0AAAAASUVORK5CYII="/><element name="sliderThumbCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAUklEQVR42q3NoREAIQwFUTpMk0wUNSBSAz4mPhIBk8/JUwwiW8C+8pqI0BhDzQzujjmnrrWoZNZao947Pgg/CHtvREQexsx6gTQNqrXiAuHlcQDl9mmceNYnwwAAAABJRU5ErkJggg=="/></elements></component><component name="tooltip"><settings><setting name="fontcase" value="normal"/><setting name="fontcolor" value="cccccc"/><setting name="fontsize" value="12"/><setting name="fontweight" value="normal"/><setting name="activecolor" value="cccccc"/><setting name="overcolor" value="ffffff"/></settings><elements><element name="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAASklEQVR42p3KQQ2AMAAEwXOAi/lWSqUgpZIqASmVAN+GNECYZH8bHDhfOoLyYSxJEuwP054Z+mLqucOGMU0DW1ZQp7HmCRpa/roABHU6b1RN/woAAAAASUVORK5CYII="/><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capTopLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVR42mNgAAI1NTV/IL4PxP9hnP8wzACTQRb4j4wBSrYUAF5mO7QAAAAASUVORK5CYII="/><element name="capTopRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVR42mNQU1P7D8T3gdifAQSgAjDsjy5wH13gPwBoAhQA/dBvkQAAAABJRU5ErkJggg=="/><element name="capBottomLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAHUlEQVR42mNQU1P7j4wZgMR9dAF/FAEQgAqCVQIAxzkUAKo9yiMAAAAASUVORK5CYII="/><element name="capBottomRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAHElEQVR42mNQU1P7j4wZ0ATuowv4wwTugzlAAADkhRQAhODqdgAAAABJRU5ErkJggg=="/><element name="menuTopHD" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAYCAYAAABtGnqsAAABKUlEQVR42u2WYQ2DMBSEcYCESuAHAioBCZOAhOFgEiahEpCAhEpAQtcu1+TSwSDbfrDtvuQFWtpHe7lXqCohhBAPDMPQxBhjhBhzjDM9O3MbfWmspfYVc82zeegPlCMUkfpc8f4aa2qOKl5eYI+2iTHlTewU0Mc4bQnPAq6No/UYtN1SniMJmDbuFhzp9wgYr11yIO6ndwWknPd3cM6jCrhValsCJod0VMrduwJS3nDY0qWF9tlB1Gf2OBDlVp5j7kMCpvzjN3xATD6kIYjjcwclPi6dUXhWiu/x7D8EJJFmOMvDSX3hOI/rTOJOuWRp7CWLQnPGLMZPCkjOsuTEtLG6+LDY4lfFruRp4ELLsTQH48xaHv1kCiGEECLStm1QvB5ykBBCiJe5AX69621Fd8YvAAAAAElFTkSuQmCC"/><element name="menuTopCC" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAABjklEQVR42u1X3c2DMAzsBhmBEXhggIzACIzACGUDRmCEjsAIGSEjMAIfkS7oegr0oQ/9IvkkC2HH+fHZDjweBoPBYDAIpmlqD1kP2Q/ZDhnEPsA2kM5Dt5PfWNBnSfpnEpojvUfYwyE92ZJulPXWi/3ONQff5eDhvcG7pzGvFJwcAA2I+DUcRFnrJABkhTwe8yX/lgiIYl9pP0/af9CkqYmAlN0v0TV08HTASAdvSgRAF4S4OwJiDjbZEykLVwAFnQlYMJfT/dZIwFtbKNjHXOIga6aAxOyPoATxvSNgL6zFQd7xXLEu2xzmCpCTjBoJOLNOKqClrH7r9RcEjBqEDwRsmrVcjURAbm09V4O00EXPUBMBDfde7rGwRRm/aEbezH1HwMxBo17eqy9d1iu1r/6ujdZ4D2wo94inQ5BmGdvD/i0BDkTn9d6+Zgq+Qb6CNmpBm94ntX4NeamEttRbMc59OjS3iqvLEjpfaF/+qi3KPrz9SBgMBoPBYDD8a3Rdt5v8TiwDDQaDwWD4Ef4AO4h4lB2vwSEAAAAASUVORK5CYII="/><element name="menuOption" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAuElEQVR42u2SQQqGIBCF/wOU1UYUMjAiQdSTeI4O2DnmUL9PatVq3AUNPBhEPt6bmd9XL6u+77uiXHRAV9+1wvais4iEEFXor7e9xdkJiJSSjDG0LAsppWgYhgplOb2iVdi2bRRCqHLOkdb6dpo5wAPu4AyglFJVjJGstTSOI+EPF4iYD+C6rjRNExuIyJgZYgJU5b2neZ7vBWX2UrAAzAwx4QwwuLuX0no2mBlAcMY4G85hf/Wu+gNm+kvWRCvtuQAAAABJRU5ErkJggg=="/><element name="menuOptionOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfklEQVR42r2VTWqDUBSFG6v5KcVJsWTWaUZdRLuNbsNxt5CZ4/xsIJhAkGQJ3UBCcCA6UhBJQDDk9h04giREKQkVPpD37j3cc+/z+dD0iEirSn10s4hGHokG/iReEdIVbUVH0SMdrumlcKMYKzEUTwpT8aKwAN9N7hmMbdWKsYJnCrwpBop3MuCaxZh2KXrNpsHAPpK32+2H4zjfw+HQAXjHGoX7jDUu7FNQpxULCa7rftm2/TMajeLZbJaB8XgcYw17FLWYo58LaizfhCVVxScSl8vlYbPZSBiGEkWR7HY78TzvgD3E0L7JXO3cbpdNH8AaqoFYmqZSFIUcj0fZ7/fi+75MJpMYMYhlTre0XR1GT/GK5qNfsIjKIFY+p9NJ4jiW1Wp1QAximdODRqMgbKKyqmCSJLJYLLJrgrWW0TPYhBDI81yCIJDpdHrVcu1QMAD0DDZRGcTW63XdUJqPDSqdz+cZ+oZhNB6b+x/s+396t18Od72+/vuCvf0X8At7J48fIgP61QAAAABJRU5ErkJggg=="/><element name="menuOptionActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfklEQVR42r2VTWqDUBSFG6v5KcVJsWTWaUZdRLuNbsNxt5CZ4/xsIJhAkGQJ3UBCcCA6UhBJQDDk9h04giREKQkVPpD37j3cc+/z+dD0iEirSn10s4hGHokG/iReEdIVbUVH0SMdrumlcKMYKzEUTwpT8aKwAN9N7hmMbdWKsYJnCrwpBop3MuCaxZh2KXrNpsHAPpK32+2H4zjfw+HQAXjHGoX7jDUu7FNQpxULCa7rftm2/TMajeLZbJaB8XgcYw17FLWYo58LaizfhCVVxScSl8vlYbPZSBiGEkWR7HY78TzvgD3E0L7JXO3cbpdNH8AaqoFYmqZSFIUcj0fZ7/fi+75MJpMYMYhlTre0XR1GT/GK5qNfsIjKIFY+p9NJ4jiW1Wp1QAximdODRqMgbKKyqmCSJLJYLLJrgrWW0TPYhBDI81yCIJDpdHrVcu1QMAD0DDZRGcTW63XdUJqPDSqdz+cZ+oZhNB6b+x/s+396t18Od72+/vuCvf0X8At7J48fIgP61QAAAABJRU5ErkJggg=="/><element name="volumeCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAAFUlEQVR42mP4//8/AzUxw6iBg89AACt1ZqjY29nMAAAAAElFTkSuQmCC"/><element name="volumeCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAAFUlEQVR42mP4//8/AzUxw6iBg89AACt1ZqjY29nMAAAAAElFTkSuQmCC"/><element name="volumeRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAAPklEQVR42u3MoREAIAwDQDpI95+xVwG2AjziY3IR+ViPZOaeu7tXVc2O2y+AQCAQCAQCgUAgEAgEAoHAP8ADVGLAaqN7TdUAAAAASUVORK5CYII="/><element name="volumeRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAXklEQVR42pXOMQrAIAyFYUGSIeqQuLh4Ju8/eZRXIhQ6WMHhhxDIRwKAsKv3jm+tNagqcs4gIvzdhQM4d2BKCcw8r8FSyqi1Lsgzs/WdgzHGcQ2+qIhMhzyffXe6eQBmfbZnUQ+tqAAAAABJRU5ErkJggg=="/><element name="volumeRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAX0lEQVR42p2OsQrAIAxEhRAHoxB1cfGb/P/JTzkboVsttMODcOEe5wC4EymlEUKYMUYYdlv21jk+VHXUWtFa25RStlREQETjs7D3Pi9wY9Kc8xZ67+cfIZ6EtpKZceot+LS2cEn/XGYAAAAASUVORK5CYII="/><element name="volumeProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAASUlEQVR42u3MQQ0AUQjE0CFYgARQjGvWwBewh/beZ3enV7t77q7MVFWpuzUzigiZmSTZ6zNAQEBAQEBAQEBAQEBAQEBAQMB/gB8nJqOYNsUfIAAAAABJRU5ErkJggg=="/><element name="volumeProgressCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAVUlEQVR42pXMwQkAIQxE0XSYshQtImXYhh3kKFiD+L3s3iTgwBz/E0BuTylRSsHMaK3Re2fOyd6bb9dOAtAD0J/BnLMGoD6DgNRa1cz8B8cYvtbSqDn4F/TaDHcq1wAAAABJRU5ErkJggg=="/><element name="volumeProgressCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAVElEQVR42mP5//8/Ay7Q09PjLyIiMkFCQkJBUlKSQVxc/IGoqGgBMzPzRlx6WHBJdHZ2+jMxMW1AFgMapAAVCwDijSQZCHT5BAbcYALJBgKBAjlyAHZIEpxZZYn/AAAAAElFTkSuQmCC"/><element name="volumeThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAnklEQVR42mP4//8/AxbMBMTsQMwHxMJALALFwlAxdqgaDL24DOMGYoVly5ZFVldXz6ysrFwOwiA2SAwkB1XDRMhARqjtigcPHsw/d+7c9Z9A8B8KQGyQGEgOpAaqlpGQgSAv2Vy7du38fxwAKmcDVYvXQCZoOHkjuwwdQOW8oWqZCBkICvyA/4RBAFQt/Q2kqpepHilUTzZUT9gUZz0ACDf945eBHBQAAAAASUVORK5CYII="/></elements></component></components></skin>';
    this.xml = a.utils.parseXML(this.text);
    return this
  }
})(jwplayer);
(function(g) {
  var o = jwplayer.utils,
    p = jwplayer.events,
    q = p.state,
    m = o.css,
    n = document,
    a = ".jwdisplay",
    j = ".jwpreview",
    l = ".jwerror",
    d = true,
    k = false,
    b = "absolute",
    c = "none",
    h = "100%",
    e = "hidden",
    f = "opacity .25s, background-image .25s, color .25s";
  g.display = function(u, M) {
    var t = u,
      F = u.skin,
      X, aa, J, w, H, S, V, r = k,
      ab = {},
      Q = k,
      W = k,
      T = {},
      s, K, Y = o.extend({
        showicons: d,
        bufferrotation: 45,
        bufferinterval: 100,
        fontcolor: "#ccc",
        overcolor: "#fff",
        fontsize: 15,
        fontweight: ""
      }, F.getComponentSettings("display"), M),
      O = new p.eventdispatcher();
    o.extend(this, O);

    function U() {
      X = n.createElement("div");
      X.id = t.id + "_display";
      X.className = "jwdisplay";
      aa = n.createElement("div");
      aa.className = "jwpreview jw" + t.jwGetStretching();
      X.appendChild(aa);
      t.jwAddEventListener(p.JWPLAYER_PLAYER_STATE, z);
      t.jwAddEventListener(p.JWPLAYER_PLAYLIST_ITEM, x);
      t.jwAddEventListener(p.JWPLAYER_PLAYLIST_COMPLETE, P);
      t.jwAddEventListener(p.JWPLAYER_MEDIA_ERROR, y);
      t.jwAddEventListener(p.JWPLAYER_ERROR, y);
      X.addEventListener("click", Z, k);
      R();
      z({
        newstate: q.IDLE
      })
    }
    function Z(ac) {
      switch(t.jwGetState()) {
      case q.PLAYING:
      case q.BUFFERING:
        t.jwPause();
        break;
      default:
        t.jwPlay();
        break
      }
      O.sendEvent(p.JWPLAYER_DISPLAY_CLICK)
    }
    this.clickHandler = Z;

    function R() {
      var ac = {
        font: Y.fontweight + " " + Y.fontsize + "px/" + (parseInt(Y.fontsize) + 3) + "px Arial,Helvetica,sans-serif",
        color: Y.fontcolor
      },
        ad = {
          color: Y.overcolor
        };
      K = new g.displayicon(X.id + "_button", t, ac, ad);
      X.appendChild(K.element())
    }
    function B(ac, ad) {
      if(!Y.showicons) {
        return
      }
      if(ac || ad) {
        K.setRotation(ac == "buffer" ? parseInt(Y.bufferrotation) : 0, parseInt(Y.bufferinterval));
        K.setIcon(ac);
        K.setText(ad)
      } else {
        K.hide()
      }
    }
    function x() {
      C();
      J = t.jwGetPlaylist()[t.jwGetPlaylistIndex()];
      var ac = J ? J.image : "";
      v(ac)
    }
    function v(ac) {
      if(w != ac) {
        if(w) {
          L(j, k)
        }
        w = ac;
        I()
      } else {
        if(w) {
          L(j, d)
        }
      }
      A(t.jwGetState())
    }
    function P() {
      W = d;
      B("replay");
      var ac = t.jwGetPlaylist()[0];
      v(ac.image)
    }
    var G;

    function z(ac) {
      clearTimeout(G);
      G = setTimeout(function() {
        A(ac.newstate)
      }, 100)
    }
    function A(ac) {
      if(K) {
        K.setRotation(0)
      }
      switch(ac) {
      case q.IDLE:
        if(!Q && !W) {
          if(w && !r) {
            L(j, d)
          }
          B("play", J ? J.title : "")
        }
        break;
      case q.BUFFERING:
        C();
        W = k;
        B("buffer");
        break;
      case q.PLAYING:
        B();
        break;
      case q.PAUSED:
        B("play");
        break
      }
    }
    this.hidePreview = function(ac) {
      r = ac;
      L(j, !ac)
    };
    this.element = function() {
      return X
    };

    function N(ac) {
      return "#" + X.id + " " + ac
    }
    function I() {
      if(w) {
        var ac = new Image();
        ac.addEventListener("load", E, k);
        ac.src = w
      } else {
        m(N(j), {
          "background-image": undefined
        });
        L(j, k);
        H = S = 0
      }
    }
    function E() {
      H = this.width;
      S = this.height;
      A(t.jwGetState());
      D();
      if(w) {
        m(N(j), {
          "background-image": "url(" + w + ")"
        })
      }
    }
    function y(ac) {
      Q = d;
      B("error", ac.message)
    }
    function C() {
      Q = k;
      if(ab.error) {
        ab.error.setText()
      }
    }
    function D() {
      if(X.clientWidth * X.clientHeight > 0) {
        o.stretch(t.jwGetStretching(), aa, X.clientWidth, X.clientHeight, H, S)
      }
    }
    this.redraw = D;

    function L(ac, ad) {
      if(!o.exists(T[ac])) {
        T[ac] = false
      }
      if(T[ac] != ad) {
        T[ac] = ad;
        m(N(ac), {
          opacity: ad ? 1 : 0,
          visibility: ad ? "visible" : "hidden"
        })
      }
    }
    this.show = function() {
      if(K && t.jwGetState() != q.PLAYING) {
        K.show()
      }
    };
    this.hide = function() {
      if(K) {
        K.hide()
      }
    };
    this.setAlternateClickHandler = function(ac) {
      _alternateClickHandler = ac
    };
    this.revertAlternateClickHandler = function() {
      _alternateClickHandler = undefined
    };
    U()
  };
  m(a, {
    position: b,
    cursor: "pointer",
    width: h,
    height: h,
    overflow: e
  });
  m(a + " .jwpreview", {
    position: b,
    width: h,
    height: h,
    background: "no-repeat center",
    overflow: e,
    opacity: 0
  });
  m(a + ", " + a + " *", {
    "-webkit-transition": f,
    "-moz-transition": f,
    "-o-transition": f
  })
})(jwplayer.html5);
(function(d) {
  var j = jwplayer.utils,
    l = jwplayer.events,
    m = l.state,
    g = j.css,
    c = ".jwdisplayIcon",
    f = undefined,
    h = document,
    b = "none",
    e = "100%",
    k = "center",
    a = "absolute";
  d.displayicon = function(K, F, v, C) {
    var L = F,
      y = L.skin,
      r = K,
      z, M, R, B, x, q, D, H, G = 0;

    function A() {
      z = O("jwdisplayIcon");
      z.id = r;
      w();
      q = O("jwtext", z, v, C);
      D = O("icon", z);
      o();
      p()
    }
    function t(S, T) {
      return "#" + r + (T ? ":hover" : "") + " " + (S ? S : "")
    }
    function O(T, V, U, S) {
      var W = h.createElement("div");
      W.className = T;
      if(V) {
        V.appendChild(W)
      }
      P(T, "." + T, U, S);
      return W
    }
    function w() {
      M = I("background");
      R = I("capLeft");
      B = I("capRight");
      x = (R.width * B.width > 0);
      var S = {
        "background-image": "url(" + R.src + "), url(" + M.src + "), url(" + B.src + ")",
        "background-position": "left,center,right",
        "background-repeat": "no-repeat",
        padding: "0 " + B.width + "px 0 " + R.width + "px",
        height: M.height,
        "margin-top": M.height / -2
      };
      g(t(), S);
      if(M.overSrc) {
        S["background-image"] = "url(" + R.overSrc + "), url(" + M.overSrc + "), url(" + B.overSrc + ")"
      }
      g("#" + L.id + " .jwdisplay:hover " + t(), S)
    }
    function P(U, S, W, T) {
      var V = I(U);
      if(U == "replayIcon" && !V.src) {
        V = I("playIcon")
      }
      W = j.extend({}, W);
      if(U.indexOf("Icon") > 0) {
        G = V.width
      }
      if(V.src) {
        W["background-image"] = "url(" + V.src + ")";
        W.width = V.width
      }
      g(t(S), W);
      T = j.extend({}, T);
      if(V.overSrc) {
        T["background-image"] = "url(" + V.overSrc + ")"
      }
      H = V;
      g("#" + L.id + " .jwdisplay:hover " + (S ? S : t()), T)
    }
    function I(T) {
      var U = y.getSkinElement("display", T),
        S = y.getSkinElement("display", T + "Over");
      if(U) {
        U.overSrc = (S && S.src) ? S.src : "";
        return U
      }
      return {
        src: "",
        overSrc: "",
        width: 0,
        height: 0
      }
    }
    function p() {
      var T = x || (G == 0),
        U = "px " + e,
        S;
      g(t(".jwtext"), {
        display: (q.innerHTML && T) ? f : b
      });
      setTimeout(function() {
        S = Math.max(H.width, j.bounds(z).width - B.width - R.width);
        if(j.isFF() || j.isIE()) {
          S++
        }
        if(j.isChrome() && z.parentNode.clientWidth % 2 == 1) {
          S++
        }
        g(t(), {
          "background-size": [R.width + U, S + U, B.width + U].join(",")
        }, true)
      }, 0)
    }
    this.element = function() {
      return z
    };
    this.setText = function(T) {
      var S = q.style;
      q.innerHTML = T ? T.replace(":", ":<br>") : "";
      S.height = "0";
      S.display = "block";
      if(T) {
        while(n(q) > 2) {
          q.innerHTML = q.innerHTML.replace(/(.*) .*$/, "$1...")
        }
      }
      S.height = "";
      S.display = "";
      p()
    };
    this.setIcon = function(T) {
      var S = O("icon");
      S.id = z.id + "_" + T;
      P(T + "Icon", "#" + S.id);
      z.replaceChild(S, D);
      D = S
    };
    var u, s = 0,
      Q;

    function J(T, S) {
      clearInterval(u);
      Q = 0;
      s = T;
      if(T == 0) {
        N()
      } else {
        u = setInterval(N, S)
      }
    }
    function N() {
      Q = (Q + s) % 360;
      j.rotate(D, Q)
    }
    this.setRotation = J;

    function n(S) {
      return Math.floor(S.scrollHeight / h.defaultView.getComputedStyle(S, null).lineHeight.replace("px", ""))
    }
    var o = this.hide = function() {
        z.style.opacity = 0
      };
    var E = this.show = function() {
        z.style.opacity = 1
      };
    A()
  };
  g(c, {
    display: "table",
    cursor: "pointer",
    position: "relative",
    "margin-left": "auto",
    "margin-right": "auto",
    top: "50%"
  }, true);
  g(c + " div", {
    position: "relative",
    display: "table-cell",
    "vertical-align": "middle",
    "background-repeat": "no-repeat",
    "background-position": k
  });
  g(c + " div", {
    "vertical-align": "middle"
  }, true);
  g(c + " .jwtext", {
    color: "#fff",
    padding: "0 1px",
    "max-width": "300px",
    "overflow-y": "hidden",
    "text-align": k,
    "-webkit-user-select": b,
    "-moz-user-select": b,
    "-ms-user-select": b,
    "user-select": b
  })
})(jwplayer.html5);
(function(e) {
  var l = jwplayer.utils,
    n = jwplayer.events,
    o = n.state,
    j = l.css,
    d = l.bounds,
    a = ".jwdock",
    h = ".jwdockbuttons",
    g = undefined,
    k = document,
    c = "none",
    f = "100%",
    m = "center",
    b = "absolute";
  e.dock = function(z, I) {
    var C = z,
      B = {
        iconalpha: 0.75,
        iconalphaactive: 0.5,
        iconalphaover: 1,
        margin: 8
      },
      u = l.extend({}, B, I),
      p = C.id + "_dock",
      v = C.skin,
      K, E = 0,
      s = {},
      t = {},
      w, F, J, D = this;

    function x() {
      D.visible = false;
      w = H("div", "jwdock");
      F = H("div", "jwdockbuttons");
      w.appendChild(F);
      w.id = p;
      y();
      setTimeout(function() {
        J = d(w)
      })
    }
    function y() {
      var M = A("button"),
        N = A("buttonOver"),
        O = A("buttonActive");
      if(!M) {
        return
      }
      j(q(), {
        height: M.height,
        padding: u.margin
      });
      j(h, {
        height: M.height
      });
      j(q("button"), {
        width: M.width,
        cursor: "pointer",
        border: "none",
        background: M.src
      });
      if(N.src) {
        j(q("button:hover"), {
          background: N.src
        })
      }
      if(O.src) {
        j(q("button:active"), {
          background: O.src
        })
      }
      j(q("button>div"), {
        opacity: u.iconalpha
      });
      j(q("button:hover>div"), {
        opacity: u.iconalphaover
      });
      j(q("button:active>div"), {
        opacity: u.iconalphaactive
      });
      j(q(".jwoverlay"), {
        top: u.margin + M.height
      });
      G("capLeft", F);
      G("capRight", F);
      G("divider")
    }
    function G(O, N) {
      var M = A(O);
      j(q("." + O), {
        width: M.width,
        background: M.src
      });
      return H("div", O, N)
    }
    function q(M, N) {
      return "#" + p + " " + (M ? M : "")
    }
    function H(O, M, N) {
      var P = k.createElement(O);
      if(M) {
        P.className = M
      }
      if(N) {
        N.appendChild(P)
      }
      return P
    }
    function A(M) {
      var N = v.getSkinElement("dock", M);
      return N ? N : {
        width: 0,
        height: 0,
        src: ""
      }
    }
    D.redraw = function() {
      J = d(w)
    };

    function L(N) {
      var Q = t[N],
        M, P = s[N],
        R, O = d(P.icon);
      Q.offsetX(0);
      R = d(w);
      j("#" + Q.element().id, {
        left: O.left - R.left + O.width / 2
      });
      M = d(Q.element());
      if(R.left > M.left) {
        Q.offsetX(R.left - M.left + 8)
      }
    }
    D.element = function() {
      return w
    };
    D.offset = function(M) {
      j(q(), {
        "margin-left": M
      })
    };
    D.hide = function() {
      D.visible = false;
      w.style.opacity = 0;
      w.style.visibility = "hidden"
    };
    D.show = function() {
      D.visible = true;
      w.style.opacity = 1;
      w.style.visibility = "visible"
    };
    D.addButton = function(M, U, Q, N) {
      if(s[N]) {
        return
      }
      var O = H("div", "divider", F),
        P = H("button", null, F),
        T = H("div", null, P);
      T.id = p + "_" + N;
      T.innerHTML = "&nbsp;";
      j("#" + T.id, {
        "background-image": M
      });
      if(typeof Q == "string") {
        Q = new Function(Q)
      }
      P.addEventListener("click", Q);
      s[N] = {
        element: P,
        label: U,
        divider: O,
        icon: T
      };
      if(U) {
        var V = new e.overlay(T.id + "_tooltip", v, true),
          R = H("div");
        R.id = V.id + "_label";
        R.innerHTML = U;
        j("#" + R.id, {
          padding: 3
        });
        V.setContents(R);
        var S;
        P.addEventListener("mouseover", function() {
          clearTimeout(S);
          L(N);
          V.show();
          for(var W in t) {
            if(W != N) {
              t[W].hide()
            }
          }
        }, false);
        P.addEventListener("mouseout", function() {
          S = setTimeout(V.hide, 100)
        }, false);
        w.appendChild(V.element());
        t[N] = V
      }
      E++;
      r()
    };
    D.removeButton = function(M) {
      if(s[M]) {
        F.removeChild(s[M].element);
        F.removeChild(s[M].divider);
        delete s[M];
        E--;
        r()
      }
    };
    D.numButtons = function() {
      return E
    };

    function r() {
      j(h + " .capLeft, " + h + " .capRight", {
        display: E ? "block" : "none"
      })
    }
    x()
  };
  j(a, {
    position: "absolute",
    width: f,
    opacity: 0,
  });
  j(a + " > *", {
    height: f,
    "float": "left"
  });
  j(a + " > .jwoverlay", {
    height: "auto",
    "float": "none",
    "z-index": 99
  });
  j(h, {
    position: "absolute"
  });
  j(h + " button", {
    position: "relative"
  });
  j(h + " > *", {
    height: f,
    "float": "left"
  });
  j(h + " .divider", {
    display: "none"
  });
  j(h + " button ~ .divider", {
    display: "block"
  });
  j(h + " .capLeft, " + h + " .capRight", {
    display: "none"
  });
  j(h + " .capRight", {
    "float": "right"
  });
  j(h + " button > div", {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 5,
    position: "absolute",
    "background-position": "center",
    "background-repeat": "no-repeat"
  });
  l.transitionStyle(a, "background .15s, opacity .15s");
  l.transitionStyle(a + " .jwoverlay", "opacity .15s");
  l.transitionStyle(h + " button div", "opacity .15s")
})(jwplayer.html5);
(function(a) {
  var e = jwplayer,
    c = e.utils,
    d = e.events,
    b = d.state,
    f = e.playlist;
  a.instream = function(C, q, B, D) {
    var x = {
      controlbarseekable: "always",
      controlbarpausable: true,
      controlbarstoppable: true,
      playlistclickable: true
    };
    var z, E, G = C,
      I = q,
      n = B,
      A = D,
      v, L, s, K, j, k, l, p, u, m = false,
      o, h, r = this;
    this.load = function(P, O) {
      g();
      m = true;
      E = c.extend(x, O);
      z = new f.item(P);
      J();
      h = document.createElement("div");
      h.id = r.id + "_instream_container";
      A.detachMedia();
      v = l.getTag();
      k = I.playlist[I.item];
      j = G.jwGetState();
      if(j == b.BUFFERING || j == b.PLAYING) {
        v.pause()
      }
      L = v.src ? v.src : v.currentSrc;
      s = v.innerHTML;
      K = v.currentTime;
      u = new a.display(r);
      u.setAlternateClickHandler(function(Q) {
        if(_fakemodel.state == b.PAUSED) {
          r.jwInstreamPlay()
        } else {
          H(d.JWPLAYER_INSTREAM_CLICK, Q)
        }
      });
      h.appendChild(u.element());
      if(!c.isMobile()) {
        p = new a.controlbar(r);
        h.appendChild(p.element())
      }
      n.setupInstream(h, v);
      t();
      l.load(z)
    };
    this.jwInstreamDestroy = function(O) {
      if(!m) {
        return
      }
      m = false;
      if(j != b.IDLE) {
        l.load(k, false)
      } else {
        l.stop(true)
      }
      l.detachMedia();
      n.destroyInstream();
      if(p) {
        try {
          p.element().parentNode.removeChild(p.getDisplayElement())
        } catch(P) {}
      }
      H(d.JWPLAYER_INSTREAM_DESTROYED, {
        reason: (O ? "complete" : "destroyed")
      }, true);
      A.attachMedia();
      if(j == b.BUFFERING || j == b.PLAYING) {
        v.play();
        if(I.playlist[I.item] == k) {
          I.getVideo().seek(K)
        }
      }
      return
    };
    this.jwInstreamAddEventListener = function(O, P) {
      o.addEventListener(O, P)
    };
    this.jwInstreamRemoveEventListener = function(O, P) {
      o.removeEventListener(O, P)
    };
    this.jwInstreamPlay = function() {
      if(!m) {
        return
      }
      l.play(true)
    };
    this.jwInstreamPause = function() {
      if(!m) {
        return
      }
      l.pause(true)
    };
    this.jwInstreamSeek = function(O) {
      if(!m) {
        return
      }
      l.seek(O)
    };
    this.jwInstreamGetState = function() {
      if(!m) {
        return undefined
      }
      return _fakemodel.state
    };
    this.jwInstreamGetPosition = function() {
      if(!m) {
        return undefined
      }
      return _fakemodel.position
    };
    this.jwInstreamGetDuration = function() {
      if(!m) {
        return undefined
      }
      return _fakemodel.duration
    };
    this.playlistClickable = function() {
      return(!m || E.playlistclickable.toString().toLowerCase() == "true")
    };

    function w() {
      _fakemodel = new a.model({});
      o = new d.eventdispatcher();
      G.jwAddEventListener(d.JWPLAYER_RESIZE, t);
      G.jwAddEventListener(d.JWPLAYER_FULLSCREEN, t)
    }
    function g() {
      A.setMute(I.mute);
      A.setVolume(I.volume)
    }
    function J() {
      if(!l) {
        l = new a.video(I.getVideo().getTag());
        l.addGlobalListener(M);
        l.addEventListener(d.JWPLAYER_MEDIA_META, N);
        l.addEventListener(d.JWPLAYER_MEDIA_COMPLETE, y);
        l.addEventListener(d.JWPLAYER_MEDIA_BUFFER_FULL, F)
      }
      l.attachMedia()
    }
    function M(O) {
      if(m) {
        H(O.type, O)
      }
    }
    function F(O) {
      if(m) {
        l.play()
      }
    }
    function y(O) {
      if(m) {
        setTimeout(function() {
          r.jwInstreamDestroy(true)
        }, 10)
      }
    }
    function N(O) {
      if(O.metadata.width && O.metadata.height) {
        n.resizeMedia()
      }
    }
    function H(O, P, Q) {
      if(m || Q) {
        o.sendEvent(O, P)
      }
    }
    function t() {
      if(p) {
        p.redraw()
      }
      if(u) {
        u.redraw()
      }
    }
    this.jwPlay = function(O) {
      if(E.controlbarpausable.toString().toLowerCase() == "true") {
        this.jwInstreamPlay()
      }
    };
    this.jwPause = function(O) {
      if(E.controlbarpausable.toString().toLowerCase() == "true") {
        this.jwInstreamPause()
      }
    };
    this.jwStop = function() {
      if(E.controlbarstoppable.toString().toLowerCase() == "true") {
        this.jwInstreamDestroy();
        G.jwStop()
      }
    };
    this.jwSeek = function(O) {
      switch(E.controlbarseekable.toLowerCase()) {
      case "always":
        this.jwInstreamSeek(O);
        break;
      case "backwards":
        if(_fakemodel.position > O) {
          this.jwInstreamSeek(O)
        }
        break
      }
    };
    this.jwGetPosition = function() {};
    this.jwGetDuration = function() {};
    this.jwGetWidth = G.jwGetWidth;
    this.jwGetHeight = G.jwGetHeight;
    this.jwGetFullscreen = G.jwGetFullscreen;
    this.jwSetFullscreen = G.jwSetFullscreen;
    this.jwGetVolume = function() {
      return I.volume
    };
    this.jwSetVolume = function(O) {
      l.volume(O);
      G.jwSetVolume(O)
    };
    this.jwGetMute = function() {
      return I.mute
    };
    this.jwSetMute = function(O) {
      l.mute(O);
      G.jwSetMute(O)
    };
    this.jwGetState = function() {
      return _fakemodel.state
    };
    this.jwGetPlaylist = function() {
      return [z]
    };
    this.jwGetPlaylistIndex = function() {
      return 0
    };
    this.jwGetStretching = function() {
      return I.config.stretching
    };
    this.jwAddEventListener = function(P, O) {
      o.addEventListener(P, O)
    };
    this.jwRemoveEventListener = function(P, O) {
      o.removeEventListener(P, O)
    };
    this.skin = G.skin;
    this.id = G.id + "_instream";
    w();
    return this
  }
})(jwplayer.html5);
(function(c) {
  var n = c.utils,
    h = c.html5,
    m = n.css,
    j = undefined,
    k = "free",
    f = "pro",
    g = "premium",
    o = "ads",
    e = "open",
    p = "http://www.longtailvideo.com/jwpabout/?a=l&v=",
    a = "visible",
    d = "hidden",
    l = ".jwlogo";
  var b = h.logo = function(x, y) {
      var D = x,
        E = D.id + "_logo",
        t, r, u = b.defaults,
        C = false;

      function v() {
        B();
        s()
      }
      function B() {
        if(u.prefix) {
          var F = c.version.split(/\W/).splice(0, 2).join("/");
          if(u.prefix.indexOf(F) < 0) {
            u.prefix += F + "/"
          }
        }
        try {
          if(n.isHTTPS()) {
            u.prefix = u.prefix.replace("http://", "https://ssl.")
          }
        } catch(H) {}
        var G = z(w());
        u.link = p + c.version + "&m=h&e=" + G;
        t = n.extend({}, u, y);
        t.hide = (t.hide.toString() == "true")
      }
      function s() {
        r = document.createElement("img");
        r.className = "jwlogo";
        r.id = E;
        if(!t.file) {
          r.style.display = "none";
          return
        }
        var F = (/(\w+)-(\w+)/).exec(t.position),
          G = {},
          H = t.margin;
        if(F.length == 3) {
          G[F[1]] = H;
          G[F[2]] = H
        } else {
          G.top = G.right = H
        }
        m(q(), G);
        r.src = (t.prefix ? t.prefix : "") + t.file;
        r.onclick = A
      }
      this.resize = function(G, F) {};
      this.element = function() {
        return r
      };
      this.offset = function(F) {
        m(q(), {
          "margin-bottom": F
        })
      };
      this.position = function() {
        return t.position
      };
      this.margin = function() {
        return parseInt(t.margin)
      };

      function A(F) {
        if(n.exists(F)) {
          F.stopPropagation()
        }
        if(C && t.link) {
          D.jwPause();
          D.jwSetFullscreen(false);
          window.open(t.link, t.linktarget)
        }
        return
      }
      function w() {
        if(c().config.key) {
          var F = new n.key(c().config.key);
          return F.edition()
        } else {
          return e
        }
      }
      function z(F) {
        if(F == f) {
          return "p"
        } else {
          if(F == g) {
            return "r"
          } else {
            if(F == o) {
              return "a"
            } else {
              if(F == e) {
                return "o"
              } else {
                return "f"
              }
            }
          }
        }
      }
      function q(F) {
        return "#" + E + " " + (F ? F : "")
      }
      this.hide = function(F) {
        if(t.hide || F) {
          C = false;
          r.style.visibility = "hidden";
          r.style.opacity = 0
        }
      };
      this.show = function() {
        C = true;
        r.style.visibility = "visible";
        r.style.opacity = 1
      };
      v();
      return this
    };
  b.defaults = {
    prefix: "http://wedding.andxyz.com/",
    file: false,
    link: p + c.version + "&m=h&e=f",
    linktarget: "_top",
    margin: 8,
    hide: false,
    position: "top-right"
  };
  m(l, {
    cursor: "pointer",
    position: "absolute",
    "z-index": 100,
    opacity: 0
  });
  n.transitionStyle(l, "visibility .15s, opacity .15s")
})(jwplayer);
(function(c) {
  var f = c.html5,
    k = c.utils,
    j = k.css,
    h = "jwmenu",
    d = "jwoption",
    g = undefined,
    a = "#ffffff",
    b = "#cccccc";
  f.menu = function(m, n, B, t) {
    var x = B,
      z = m,
      y = n,
      o = t,
      q = new f.overlay(y + "_overlay", B),
      r = k.extend({
        fontcase: g,
        fontcolor: b,
        fontsize: 11,
        fontweight: g,
        activecolor: a,
        overcolor: a
      }, B.getComponentSettings("tooltip")),
      p, A = [];

    function w() {
      p = u(h);
      p.id = y;
      var G = s("menuTop" + m),
        E = s("menuOption"),
        D = s("menuOptionOver"),
        F = s("menuOptionActive");
      if(G) {
        p.appendChild(G.image)
      }
      if(E) {
        var C = "#" + n + " ." + d;
        j(C, {
          "background-image": E.src,
          height: E.height,
          color: r.fontcolor,
          "padding-left": E.width,
          font: r.fontweight + " " + r.fontsize + "px Arial,Helvetica,sans-serif",
          "line-height": E.height,
          "text-transform": (r.fontcase == "upper") ? "uppercase" : g
        });
        j(C + ":hover", {
          "background-image": D.src ? D.src : g,
          color: r.overcolor
        });
        j(C + ".active", {
          "background-image": F.src ? F.src : g,
          color: r.activecolor
        })
      }
      q.setContents(p)
    }
    this.element = function() {
      return q.element()
    };
    this.addOption = function(C, E) {
      var D = u(d, p);
      D.id = y + "_option_" + E;
      D.innerHTML = C;
      D.addEventListener("click", v(A.length, E));
      A.push(D)
    };

    function v(C, D) {
      return function() {
        l(C);
        if(o) {
          o(D)
        }
      }
    }
    this.clearOptions = function() {
      while(A.length > 0) {
        p.removeChild(A.pop())
      }
    };
    var l = this.setActive = function(C) {
        for(var D = 0; D < A.length; D++) {
          var E = A[D];
          E.className = E.className.replace(" active", "");
          if(D == C) {
            E.className += " active"
          }
        }
      };

    function u(D, C) {
      var E = document.createElement("div");
      if(D) {
        E.className = D
      }
      if(C) {
        C.appendChild(E)
      }
      return E
    }
    function s(C) {
      var D = B.getSkinElement("tooltip", C);
      return D ? D : {
        width: 0,
        height: 0,
        src: g
      }
    }
    this.show = q.show;
    this.hide = q.hide;
    this.offsetX = q.offsetX;
    w()
  };

  function e(l) {
    return "." + l.replace(/ /g, " .")
  }
  j(e(h + " " + d), {
    "background-repeat": "no-repeat",
    cursor: "pointer",
    position: "relative"
  })
})(jwplayer);
(function(b) {
  var a = jwplayer.utils,
    d = jwplayer.events,
    e = undefined,
    c = true,
    f = false;
  b.model = function(j) {
    var p = this,
      l, r, s = a.getCookies(),
      g = {
        controlbar: {},
        display: {}
      },
      n = {
        autostart: f,
        controls: c,
        debug: e,
        fullscreen: f,
        height: 320,
        mobilecontrols: f,
        mute: f,
        playlist: [],
        playlistposition: "none",
        playlistsize: 180,
        repeat: f,
        skin: e,
        stretching: a.stretching.UNIFORM,
        width: 480,
        volume: 90
      };

    function o(t) {
      for(var u in t) {
        t[u] = a.serialize(t[u])
      }
      return t
    }
    function q() {
      a.extend(p, new d.eventdispatcher());
      p.config = o(a.extend({}, n, s, j));
      a.extend(p, {
        id: j.id,
        state: d.state.IDLE,
        duration: -1,
        position: 0,
        buffer: 0
      }, p.config);
      p.playlist = [];
      p.setItem(0);
      r = document.createElement("video");
      l = new b.video(r);
      l.volume(p.volume);
      l.mute(p.mute);
      l.addGlobalListener(k)
    }
    var m = {};
    m[d.JWPLAYER_MEDIA_MUTE] = "mute";
    m[d.JWPLAYER_MEDIA_VOLUME] = "volume";
    m[d.JWPLAYER_PLAYER_STATE] = "newstate->state";
    m[d.JWPLAYER_MEDIA_BUFFER] = "bufferPercent->buffer";
    m[d.JWPLAYER_MEDIA_TIME] = "position,duration";

    function k(t) {
      var A = (m[t.type] ? m[t.type].split(",") : []),
        x, z;
      if(A.length > 0) {
        for(x = 0; x < A.length; x++) {
          var v = A[x],
            w = v.split("->"),
            y = w[0],
            u = w[1] ? w[1] : y;
          if(p[u] != t[y]) {
            p[u] = t[y];
            z = true
          }
        }
        if(z) {
          p.sendEvent(t.type, t)
        }
      } else {
        p.sendEvent(t.type, t)
      }
    }
    p.getVideo = function() {
      return l
    };
    p.seekDrag = function(t) {
      l.seekDrag(t)
    };
    p.setFullscreen = function(t) {
      if(t != p.fullscreen) {
        p.fullscreen = t;
        p.sendEvent(d.JWPLAYER_FULLSCREEN, {
          fullscreen: t
        })
      }
    };
    p.setPlaylist = function(t) {
      p.playlist = h(t);
      if(p.playlist.length == 0) {
        p.sendEvent(d.JWPLAYER_ERROR, {
          message: "Error loading playlist: No playable sources found"
        })
      } else {
        p.sendEvent(d.JWPLAYER_PLAYLIST_LOADED, {
          playlist: t
        });
        p.item = -1;
        p.setItem(0)
      }
    };

    function h(w) {
      var u = [];
      for(var t = 0; t < w.length; t++) {
        var v = a.extend({}, w[t]);
        v.sources = a.filterSources(v.sources);
        if(v.sources.length > 0) {
          u.push(v)
        }
      }
      return u
    }
    p.setItem = function(t) {
      var u;
      if(t == p.playlist.length || t < -1) {
        u = 0
      } else {
        if(t == -1 || t > p.playlist.length) {
          u = p.playlist.length - 1
        } else {
          u = t
        }
      }
      if(u != p.item) {
        p.item = u;
        p.sendEvent(d.JWPLAYER_PLAYLIST_ITEM, {
          index: p.item
        })
      }
    };
    p.setVolume = function(t) {
      if(p.mute && t > 0) {
        p.setMute(f)
      }
      t = Math.round(t);
      if(!p.mute) {
        a.saveCookie("volume", t)
      }
      l.volume(t)
    };
    p.setMute = function(t) {
      if(!a.exists(t)) {
        t = !p.mute
      }
      a.saveCookie("mute", t);
      l.mute(t)
    };
    p.componentConfig = function(t) {
      return g[t]
    };
    q()
  }
})(jwplayer.html5);
(function(k) {
  var e = k.html5,
    r = k.utils,
    n = r.css,
    s = r.transitionStyle,
    c = "relative",
    d = "absolute",
    g = "hidden",
    j = "100%",
    q = "opacity .15s, visibility .15s, left .01s linear",
    l = ".jwoverlay",
    a = "jwcontents",
    p = "top",
    f = "bottom",
    h = "right",
    m = "left",
    t = "#ffffff",
    u = undefined,
    b = document,
    o = {
      fontcase: u,
      fontcolor: t,
      fontsize: 12,
      fontweight: u,
      activecolor: t,
      overcolor: t
    };
  e.overlay = function(H, K, E) {
    var B = K,
      x = H,
      C, Q, I = 0,
      J, N, M = E,
      v = r.extend({}, o, B.getComponentSettings("tooltip")),
      z = {},
      L = this;

    function D() {
      C = O(l.replace(".", ""));
      C.id = x;
      J = y("arrow", "jwarrow")[1];
      N = J.height;
      n(A("jwarrow"), {
        position: d,
        bottom: M ? u : 0,
        top: M ? 0 : u,
        width: J.width,
        height: N,
        left: "50%"
      });
      P(p, m);
      P(f, m);
      P(p, h);
      P(f, h);
      P(m);
      P(h);
      P(p);
      P(f);
      y("background", "jwback");
      n(A("jwback"), {
        left: z.left,
        right: z.right,
        top: z.top,
        bottom: z.bottom
      });
      Q = O(a, C);
      n(A(a) + " *", {
        color: v.fontcolor,
        font: v.fontweight + " " + (v.fontsize) + "px Arial,Helvetica,sans-serif",
        "text-transform": (v.fontcase == "upper") ? "uppercase" : u
      });
      if(M) {
        r.transform(A("jwarrow"), "rotate(180deg)")
      }
      n(A(), {
        padding: (z.top + 1) + "px " + z.right + "px " + (z.bottom + 1) + "px " + z.left + "px"
      });
      L.showing = false
    }
    function A(R) {
      return "#" + x + (R ? " ." + R : "")
    }
    function O(S, R) {
      var T = b.createElement("div");
      if(S) {
        T.className = S
      }
      if(R) {
        R.appendChild(T)
      }
      return T
    }
    function y(R, T) {
      var S = G(R),
        U = O(T, C);
      n(A(T.replace(" ", ".")), {
        "background-image": S.src
      });
      return [U, S]
    }
    function P(X, W) {
      if(!W) {
        W = ""
      }
      var T = y("cap" + X + W, "jwborder jw" + X + (W ? W : "")),
        R = T[0],
        U = T[1],
        S = {
          "background-image": U.src,
          width: (X == m || W == m || X == h || W == h) ? U.width : u,
          height: (X == p || W == p || X == f || W == f) ? U.height : u
        };
      S[X] = ((X == f && !M) || (X == p && M)) ? N : 0;
      if(W) {
        S[W] = 0
      }
      n(A(R.className.replace(/ /g, ".")), S);
      var V = {},
        Z = {},
        Y = {
          left: U.width,
          right: U.width,
          top: (M ? N : 0) + U.height,
          bottom: (M ? 0 : N) + U.height
        };
      if(W) {
        V[W] = Y[W];
        V[X] = 0;
        Z[X] = Y[X];
        Z[W] = 0;
        n(A("jw" + X), V);
        n(A("jw" + W), Z);
        z[X] = Y[X];
        z[W] = Y[W]
      }
    }
    L.element = function() {
      return C
    };
    var F;
    L.setContents = function(R) {
      r.empty(Q);
      Q.appendChild(R);
      clearTimeout(F);
      F = setTimeout(w, 0)
    };
    L.offsetX = function(R) {
      I = R;
      clearTimeout(F);
      w()
    };

    function w() {
      if(C.clientWidth == 0) {
        return
      }
      n(A(), {
        "margin-left": Math.round(I - C.clientWidth / 2)
      });
      n(A("jwarrow"), {
        "margin-left": Math.round((J.width / -2) - I)
      })
    }
    L.borderWidth = function() {
      return z.left
    };

    function G(R) {
      var S = B.getSkinElement("tooltip", R);
      if(S) {
        return S
      } else {
        return {
          width: 0,
          height: 0,
          src: "",
          image: u,
          ready: false
        }
      }
    }
    L.show = function() {
      L.showing = true;
      C.style.opacity = 1;
      C.style.visibility = "visible"
    };
    L.hide = function() {
      L.showing = false;
      C.style.opacity = 0;
      C.style.visibility = g
    };
    D()
  };
  n(l, {
    position: d,
    visibility: g,
    opacity: 0
  });
  n(l + " .jwcontents", {
    position: c,
    "z-index": 1
  });
  n(l + " .jwborder", {
    position: d,
    "background-size": j + " " + j
  }, true);
  n(l + " .jwback", {
    position: d,
    "background-size": j + " " + j
  });
  s(l, q)
})(jwplayer);
(function(b) {
  var a = jwplayer.utils;
  b.player = function(d) {
    var n = this,
      l, h, j, c;

    function m() {
      l = new b.model(d);
      n.id = l.id;
      h = new b.view(n, l);
      j = new b.controller(l, h);
      n._model = l;
      jwplayer.utils.css.block();
      e();
      var o = new b.setup(l, h, j);
      o.addEventListener(jwplayer.events.JWPLAYER_READY, f);
      o.addEventListener(jwplayer.events.JWPLAYER_ERROR, k);
      o.start()
    }
    function f(o) {
      j.playerReady(o);
      a.css.unblock()
    }
    function k(o) {
      a.log("There was a problem setting up the player: ", o);
      a.css.unblock()
    }
    function e() {
      n.jwPlay = j.play;
      n.jwPause = j.pause;
      n.jwStop = j.stop;
      n.jwSeek = j.seek;
      n.jwSetVolume = j.setVolume;
      n.jwSetMute = j.setMute;
      n.jwLoad = j.load;
      n.jwPlaylistNext = j.next;
      n.jwPlaylistPrev = j.prev;
      n.jwPlaylistItem = j.item;
      n.jwSetFullscreen = j.setFullscreen;
      n.jwResize = h.resize;
      n.jwSeekDrag = l.seekDrag;
      n.jwSetStretching = j.setStretching;
      n.jwGetQualityLevels = j.getQualityLevels;
      n.jwGetCurrentQuality = j.getCurrentQuality;
      n.jwSetCurrentQuality = j.setCurrentQuality;
      n.jwGetCaptionsList = j.getCaptionsList;
      n.jwGetCurrentCaptions = j.getCurrentCaptions;
      n.jwSetCurrentCaptions = j.setCurrentCaptions;
      n.jwSetControls = h.setControls;
      n.jwGetSafeRegion = h.getSafeRegion;
      n.jwGetPlaylistIndex = g("item");
      n.jwGetPosition = g("position");
      n.jwGetDuration = g("duration");
      n.jwGetBuffer = g("buffer");
      n.jwGetWidth = g("width");
      n.jwGetHeight = g("height");
      n.jwGetFullscreen = g("fullscreen");
      n.jwGetVolume = g("volume");
      n.jwGetMute = g("mute");
      n.jwGetState = g("state");
      n.jwGetStretching = g("stretching");
      n.jwGetPlaylist = g("playlist");
      n.jwGetControls = g("controls");
      n.jwDetachMedia = j.detachMedia;
      n.jwAttachMedia = j.attachMedia;
      n.jwLoadInstream = function(p, o) {
        if(!c) {
          c = new b.instream(n, l, h, j)
        }
        setTimeout(function() {
          c.load(p, o)
        }, 10)
      };
      n.jwInstreamDestroy = function() {
        if(c) {
          c.jwInstreamDestroy()
        }
      };
      n.jwPlayerDestroy = function() {
        if(h) {
          h.destroy()
        }
      };
      n.jwAddEventListener = j.addEventListener;
      n.jwRemoveEventListener = j.removeEventListener;
      n.jwDockAddButton = h.addButton;
      n.jwDockRemoveButton = h.removeButton
    }
    function g(o) {
      return function() {
        return l[o]
      }
    }
    m()
  }
})(jwplayer.html5);
(function(g) {
  var b = "#FFFFFF",
    d = "#CCCCCC",
    l = "#333333",
    h = "#999999",
    k = "normal",
    f = {
      size: 180,
      backgroundcolor: l,
      fontcolor: h,
      overcolor: d,
      activecolor: d,
      titlecolor: d,
      titleovercolor: b,
      titleactivecolor: b,
      fontweight: k,
      titleweight: k,
      fontsize: 11,
      titlesize: 13
    },
    q = jwplayer.events,
    o = jwplayer.utils,
    m = o.css,
    p = ".jwplaylist",
    n = document,
    a = "absolute",
    c = "relative",
    e = "hidden",
    j = "100%";
  g.playlistcomponent = function(I, T) {
    var N = I,
      B = N.skin,
      s = o.extend({}, f, N.skin.getComponentSettings("playlist"), T),
      O, C, r, w, u, A = -1,
      D, t, v = 60,
      x = {
        background: undefined,
        divider: undefined,
        item: undefined,
        itemOver: undefined,
        itemImage: undefined,
        itemActive: undefined
      };
    this.element = function() {
      return O
    };
    this.redraw = function() {
      if(t) {
        t.redraw()
      }
    };
    this.show = function() {
      _show(O)
    };
    this.hide = function() {
      _hide(O)
    };

    function y() {
      O = R("div", "jwplaylist");
      O.id = N.id + "_jwplayer_playlistcomponent";
      C = R("div", "jwlistcontainer");
      S(O, C);
      Q();
      if(x.item) {
        v = x.item.height
      }
      G();
      N.jwAddEventListener(q.JWPLAYER_PLAYLIST_LOADED, J);
      N.jwAddEventListener(q.JWPLAYER_PLAYLIST_ITEM, L)
    }
    function z(U) {
      return "#" + O.id + (U ? " ." + U : "")
    }
    function G() {
      var X = 0,
        W = 0,
        U = 0;
      o.clearCss(z());
      m(z(), {
        "background-color": s.backgroundcolor
      });
      m(z("jwlist"), {
        "background-image": x.background ? " url(" + x.background.src + ")" : ""
      });
      m(z("jwlist *"), {
        color: s.fontcolor,
        font: s.fontweight + " " + s.fontsize + "px Arial, Helvetica, sans-serif"
      });
      if(x.itemImage) {
        X = (v - x.itemImage.height) / 2 + "px ";
        W = x.itemImage.width;
        U = x.itemImage.height
      } else {
        W = v * 4 / 3;
        U = v
      }
      if(x.divider) {
        m(z("jwplaylistdivider"), {
          "background-image": "url(" + x.divider.src + ")",
          "background-size": j + " " + x.divider.height + "px",
          width: j,
          height: x.divider.height
        })
      }
      m(z("jwplaylistimg"), {
        height: U,
        width: W,
        margin: X ? (X + X + X + X) : "0 5px 0 0"
      });
      m(z("jwlist li"), {
        "background-image": x.item ? "url(" + x.item.src + ")" : "",
        height: v,
        "background-size": j + " " + v + "px",
        cursor: "pointer"
      });
      var V = {
        overflow: "hidden"
      };
      if(s.activecolor !== "") {
        V.color = s.activecolor
      }
      if(x.itemActive) {
        V["background-image"] = "url(" + x.itemActive.src + ")"
      }
      m(z("jwlist li.active"), V);
      m(z("jwlist li.active .jwtitle"), {
        color: s.titleactivecolor
      });
      var Y = {
        overflow: "hidden"
      };
      if(s.overcolor !== "") {
        Y.color = s.overcolor
      }
      if(x.itemOver) {
        Y["background-image"] = "url(" + x.itemOver.src + ")"
      }
      m(z("jwlist li:hover"), Y);
      m(z("jwlist li:hover .jwtitle"), {
        color: s.titleovercolor
      });
      m(z("jwtextwrapper"), {
        height: v - 5,
        position: c
      });
      m(z("jwtitle"), {
        height: 15,
        overflow: "hidden",
        display: "inline-block",
        width: j,
        color: s.titlecolor,
        "margin-top": X ? X : 7,
        "line-height": 13,
        "font-size": s.titlesize,
        "font-weight": s.titleweight
      });
      m(z("jwdescription"), {
        display: "block",
        "font-size": s.fontsize,
        "line-height": 19,
        "margin-top": 5,
        overflow: "hidden",
        height: v,
        position: c
      })
    }
    function F() {
      var U = R("ul", "jwlist");
      U.id = O.id + "_ul" + Math.round(Math.random() * 10000000);
      return U
    }
    function H(X) {
      var ac = r[X],
        ab = R("li", "jwitem"),
        V;
      ab.id = u.id + "_item_" + X;
      if(X > 0) {
        V = R("div", "jwplaylistdivider");
        S(ab, V)
      }
      var Y = R("div", "jwplaylistimg jwfill");
      if(M() && (ac.image || ac["playlist.image"] || x.itemImage)) {
        var Z;
        if(ac["playlist.image"]) {
          Z = ac["playlist.image"]
        } else {
          if(ac.image) {
            Z = ac.image
          } else {
            if(x.itemImage) {
              Z = x.itemImage.src
            }
          }
        }
        m("#" + ab.id + " .jwplaylistimg", {
          "background-image": Z ? "url(" + Z + ")" : null
        });
        S(ab, Y)
      }
      var U = R("div", "jwtextwrapper");
      var aa = R("span", "jwtitle");
      aa.innerHTML = (ac && ac.title) ? ac.title : "";
      S(U, aa);
      if(ac.description) {
        var W = R("span", "jwdescription");
        W.innerHTML = ac.description;
        S(U, W)
      }
      S(ab, U);
      return ab
    }
    function R(V, U) {
      var W = n.createElement(V);
      if(U) {
        W.className = U
      }
      return W
    }
    function S(U, V) {
      U.appendChild(V)
    }
    function J(V) {
      C.innerHTML = "";
      r = K();
      if(!r) {
        return
      }
      items = [];
      u = F();
      for(var W = 0; W < r.length; W++) {
        var U = H(W);
        U.onclick = P(W);
        S(u, U);
        items.push(U)
      }
      A = N.jwGetPlaylistIndex();
      if(o.isIOS() && window.iScroll) {
        O.innerHTML = "";
        S(O, u);
        u.style.height = v * r.length + "px";
        var X = new iScroll(O.id)
      } else {
        S(C, u);
        t = new g.playlistslider(O.id + "_slider", N.skin, O, u)
      }
    }
    function K() {
      var V = N.jwGetPlaylist();
      var W = [];
      for(var U = 0; U < V.length; U++) {
        if(!V[U]["ova.hidden"]) {
          W.push(V[U])
        }
      }
      return W
    }
    function P(U) {
      return function() {
        D = U;
        N.jwPlaylistItem(U);
        N.jwPlay(true)
      }
    }
    function E() {
      var U = N.jwGetPlaylistIndex();
      if(U == D) {
        return
      }
      D = -1;
      if(o.isIOS() && window.iScroll) {
        u.scrollTop = U * v
      } else {
        if(t && t.visible()) {
          t.thumbPosition(U / (N.jwGetPlaylist().length - 1))
        }
      }
    }
    function M() {
      return true
    }
    function L(U) {
      if(A >= 0) {
        n.getElementById(u.id + "_item_" + A).className = "jwitem";
        A = U.index
      }
      n.getElementById(u.id + "_item_" + U.index).className = "jwitem active";
      E()
    }
    function Q() {
      for(var U in x) {
        x[U] = B.getSkinElement("playlist", U)
      }
    }
    y();
    return this
  };
  m(p, {
    position: a,
    width: j,
    height: j
  });
  o.dragStyle(p, "none");
  m(p + " .jwplaylistimg", {
    position: c,
    width: j,
    "float": "left",
    margin: "0 5px 0 0",
    background: "#000",
    overflow: e
  });
  m(p + " .jwlist", {
    position: a,
    width: j,
    "list-style": "none",
    margin: 0,
    padding: 0
  });
  m(p + " .jwlistcontainer", {
    position: a,
    overflow: e,
    width: j,
    height: j
  });
  m(p + " .jwlist li", {
    width: j
  });
  m(p + " .jwtextwrapper", {
    overflow: e
  });
  m(p + " .jwplaylistdivider", {
    position: a
  })
})(jwplayer.html5);
(function(b) {
  var d = jwplayer,
    a = d.utils,
    c = d.events;
  b.playlistloader = function() {
    var g = new c.eventdispatcher();
    a.extend(this, g);
    this.load = function(k) {
      a.ajax(k, h, f)
    };

    function h(k) {
      try {
        var n = k.responseXML.firstChild;
        if(b.parsers.localName(n) == "xml") {
          n = n.nextSibling
        }
        if(b.parsers.localName(n) != "rss") {
          e("Not a valid RSS feed");
          return
        }
        var m = new d.playlist(b.parsers.rssparser.parse(n));
        m = j(m);
        if(m && m.length && m[0].sources && m[0].sources.length && m[0].sources[0].file) {
          g.sendEvent(c.JWPLAYER_PLAYLIST_LOADED, {
            playlist: m
          })
        } else {
          e("No playable sources found")
        }
      } catch(l) {
        e()
      }
    }
    function j(o) {
      if(!o) {
        return
      }
      var m = [],
        l, n, k;
      for(l = 0; l < o.length; l++) {
        n = o[l];
        k = a.filterSources(n.sources);
        if(k && k.length) {
          n.sources = k;
          m.push(n)
        }
      }
      return m
    }
    function f(k) {
      e(k.match(/invalid/i) ? "Not a valid RSS feed" : "")
    }
    function e(k) {
      g.sendEvent(c.JWPLAYER_ERROR, {
        message: k ? k : "Error loading file"
      })
    }
  }
})(jwplayer.html5);
(function(k) {
  var a = jwplayer.events,
    r = jwplayer.utils,
    n = r.css,
    b = "jwslider",
    p = "jwslidertop",
    h = "jwsliderbottom",
    f = "jwrail",
    q = "jwrailtop",
    o = "jwrailback",
    m = "jwrailbottom",
    c = "jwthumb",
    u = "jwthumbtop",
    j = "jwthumbback",
    t = "jwthumbbottom",
    e = document,
    s = window,
    v = undefined,
    g = "absolute",
    l = "100%";
  k.playlistslider = function(T, K, H, X) {
    var M = K,
      V = T,
      Y = X,
      af, C, ac, Q, ag = 0,
      U, ad, ai = true,
      D, P, ab, y, aa, w, E, O, S, ae, J;
    this.element = function() {
      return af
    };
    this.visible = function() {
      return ai
    };

    function G() {
      var ak, aj;
      af = ah(b, null, H);
      af.id = T;
      af.addEventListener("mousedown", B, false);
      af.addEventListener("click", Z, false);
      N();
      S = D.height;
      ae = P.height;
      n(W(), {
        width: ab.width
      });
      n(W(f), {
        top: S,
        bottom: ae
      });
      n(W(c), {
        top: S
      });
      ak = ah(p, D, af);
      aj = ah(h, P, af);
      C = ah(f, null, af);
      ac = ah(c, null, af);
      ak.addEventListener("mousedown", x(-1), false);
      aj.addEventListener("mousedown", x(1), false);
      ah(q, y, C);
      ah(o, ab, C, true);
      ah(m, aa, C);
      n(W(o), {
        top: y.height,
        bottom: aa.height
      });
      ah(u, E, ac);
      ah(j, w, ac, true);
      ah(t, O, ac);
      n(W(j), {
        top: E.height,
        bottom: O.height
      });
      I();
      if(Y) {
        Y.addEventListener("mousewheel", A, false);
        Y.addEventListener("DOMMouseScroll", A, false)
      }
    }
    function W(aj) {
      return "#" + af.id + (aj ? " ." + aj : "")
    }
    function ah(am, al, ak, aj) {
      var an = e.createElement("div");
      if(am) {
        an.className = am;
        if(al) {
          n(W(am), {
            "background-image": al.src ? al.src : v,
            "background-repeat": aj ? "repeat-y" : "no-repeat",
            height: aj ? v : al.height
          })
        }
      }
      if(ak) {
        ak.appendChild(an)
      }
      return an
    }
    function N() {
      D = F("sliderCapTop");
      P = F("sliderCapBottom");
      ab = F("sliderRail");
      y = F("sliderRailCapTop");
      aa = F("sliderRailCapBottom");
      w = F("sliderThumb");
      E = F("sliderThumbCapTop");
      O = F("sliderThumbCapBottom")
    }
    function F(aj) {
      var ak = M.getSkinElement("playlist", aj);
      return ak ? ak : {
        width: 0,
        height: 0,
        src: v
      }
    }
    var I = this.redraw = function() {
        clearTimeout(J);
        J = setTimeout(function() {
          if(Y && Y.clientHeight) {
            R(Y.parentNode.clientHeight / Y.clientHeight)
          } else {
            J = setTimeout(I, 10)
          }
        }, 0)
      };

    function A(aj) {
      if(!ai) {
        return
      }
      aj = aj ? aj : s.event;
      var ak = aj.detail ? aj.detail * -1 : aj.wheelDelta / 40;
      L(ag - ak / 10);
      if(aj.stopPropagation) {
        aj.stopPropagation()
      }
      if(aj.preventDefault) {
        aj.preventDefault()
      }
      aj.cancelBubble = true;
      aj.cancel = true;
      aj.returnValue = false;
      return false
    }
    function R(aj) {
      if(aj < 0) {
        aj = 0
      }
      if(aj > 1) {
        ai = false
      } else {
        ai = true;
        n(W(c), {
          height: Math.max(C.clientHeight * aj, E.height + O.height)
        })
      }
      n(W(), {
        visibility: ai ? "visible" : "hidden"
      });
      if(Y) {
        Y.style.width = ai ? Y.parentElement.clientWidth - ab.width + "px" : ""
      }
    }
    var L = this.thumbPosition = function(aj) {
        if(isNaN(aj)) {
          aj = 0
        }
        ag = Math.max(0, Math.min(1, aj));
        n(W(c), {
          top: S + (C.clientHeight - ac.clientHeight) * ag
        });
        if(X) {
          X.style.top = (af.clientHeight - X.scrollHeight) * ag + "px"
        }
      };

    function B(aj) {
      if(aj.button == 0) {
        Q = true
      }
      e.onselectstart = function() {
        return false
      };
      s.addEventListener("mousemove", Z, false);
      s.addEventListener("mouseup", z, false)
    }
    function Z(aj) {
      if(Q || aj.type == "click") {
        var ao = r.bounds(C),
          al = ac.clientHeight / 2,
          ak = ao.height - al,
          an = aj.pageY - ao.top,
          am = (an - al) / (ak - al);
        L(am)
      }
    }
    function x(aj) {
      return function(ak) {
        if(ak.button > 0) {
          return
        }
        L(ag + (aj * 0.05));
        U = setTimeout(function() {
          ad = setInterval(function() {
            L(ag + (aj * 0.05))
          }, 50)
        }, 500)
      }
    }
    function z() {
      Q = false;
      s.removeEventListener("mousemove", Z);
      s.removeEventListener("mouseup", z);
      e.onselectstart = v;
      clearTimeout(U);
      clearInterval(ad)
    }
    G();
    return this
  };

  function d() {
    var w = [],
      x;
    for(x = 0; x < arguments.length; x++) {
      w.push(".jwplaylist ." + arguments[x])
    }
    return w.join(",")
  }
  n(d(b), {
    position: g,
    height: l,
    visibility: "hidden",
    right: 0,
    top: 0,
    cursor: "pointer",
    "z-index": 1
  });
  n(d(b) + " *", {
    position: g,
    width: l,
    "background-position": "center",
    "background-size": l + " " + l
  });
  n(d(p, q, u), {
    top: 0
  });
  n(d(h, m, t), {
    bottom: 0
  })
})(jwplayer.html5);
(function(e) {
  var l = jwplayer.utils,
    j = l.css,
    a = "About JW Player ",
    m = "http://www.longtailvideo.com/jwpabout/?a=r&v=",
    k = document,
    h = ".jwclick",
    g = h + "_item",
    f = "100%",
    b = "none",
    d = "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
    c = "#FFF";
  e.rightclick = function(r, p) {
    var x = r,
      q, w = l.extend({
        aboutlink: m + e.version + "&m=h&e=o",
        abouttext: a + e.version + "..."
      }, p),
      n = false,
      y, s;

    function v() {
      q = k.getElementById(x.id);
      y = t(h);
      y.id = x.id + "_menu";
      y.style.display = b;
      q.oncontextmenu = o;
      y.onmouseover = function() {
        n = true
      };
      y.onmouseout = function() {
        n = false
      };
      k.addEventListener("mousedown", z, false);
      s = t(g);
      s.innerHTML = w.abouttext;
      s.onclick = u;
      y.appendChild(s);
      q.appendChild(y)
    }
    function t(A) {
      var B = k.createElement("div");
      B.className = A.replace(".", "");
      return B
    }
    function u() {
      window.location.href = w.aboutlink
    }
    function o(A) {
      if(n) {
        return
      }
      if(A == null) {
        A = window.event
      }
      var D = A.target != null ? A.target : A.srcElement,
        B = l.bounds(q),
        C = B.top,
        E = B.left;
      y.style.display = b;
      y.style.left = A.pageX - E + "px";
      y.style.top = A.pageY - C + "px";
      y.style.display = "block";
      A.preventDefault()
    }
    function z() {
      if(n) {
        return
      } else {
        y.style.display = b
      }
    }
    this.element = function() {
      return y
    };
    this.destroy = function() {
      k.removeEventListener("mousedown", z, false)
    };
    v()
  };
  j(h, {
    "background-color": c,
    "-webkit-border-radius": 5,
    "-moz-border-radius": 5,
    "border-radius": 5,
    height: "auto",
    border: "1px solid #bcbcbc",
    "font-family": '"MS Sans Serif", "Geneva", sans-serif',
    "font-size": 10,
    width: 320,
    "-webkit-box-shadow": d,
    "-moz-box-shadow": d,
    "box-shadow": d,
    position: "absolute",
    "z-index": 999
  }, true);
  j(h + " div", {
    padding: "8px 21px",
    margin: "0px",
    "background-color": c,
    border: "none",
    "font-family": '"MS Sans Serif", "Geneva", sans-serif',
    "font-size": 10,
    color: "inherit"
  }, true);
  j(g, {
    padding: "8px 21px",
    "text-align": "left",
    cursor: "pointer"
  }, true);
  j(g + ":hover", {
    "background-color": "#595959",
    color: c
  }, true);
  j(g + " a", {
    "text-decoration": b,
    color: "#000"
  }, true);
  j(h + " hr", {
    width: f,
    padding: 0,
    margin: 0,
    border: "1px #e9e9e9 solid"
  }, true)
})(jwplayer.html5);
(function(f) {
  var h = jwplayer,
    l = h.utils,
    m = h.events,
    a = h.playlist,
    j = 1,
    e = 2,
    d = 3,
    k = 4,
    c = 5,
    b = 6,
    g = 7;
  f.setup = function(t, I, J) {
    var M = t,
      q = I,
      G = J,
      v = {},
      D = {},
      B, A = new m.eventdispatcher(),
      w = false,
      x = [];

    function u() {
      s(j, p);
      s(e, R, j);
      s(d, z, j);
      s(k, L, d);
      s(c, Q, k + "," + e);
      s(b, K, c + "," + d);
      s(g, E, b)
    }
    function s(S, U, T) {
      x.push({
        name: S,
        method: U,
        depends: T
      })
    }
    function H() {
      for(var U = 0; U < x.length; U++) {
        var S = x[U];
        if(P(S.depends)) {
          x.splice(U, 1);
          try {
            S.method();
            H()
          } catch(T) {
            y(T.message)
          }
          return
        }
      }
      if(x.length > 0 && !w) {
        setTimeout(H, 500)
      }
    }
    function P(U) {
      if(!U) {
        return true
      }
      var T = U.toString().split(",");
      for(var S = 0; S < T.length; S++) {
        if(!v[T[S]]) {
          return false
        }
      }
      return true
    }
    function o(S) {
      v[S] = true
    }
    function p() {
      o(j)
    }
    function R() {
      B = new f.skin();
      B.load(M.config.skin, C, O)
    }
    function C(S) {
      o(e)
    }
    function O(S) {
      y("Error loading skin: " + S)
    }
    function z() {
      switch(l.typeOf(M.config.playlist)) {
      case "string":
        var S = new f.playlistloader();
        S.addEventListener(m.JWPLAYER_PLAYLIST_LOADED, n);
        S.addEventListener(m.JWPLAYER_ERROR, F);
        S.load(M.config.playlist);
        break;
      case "array":
        r(new a(M.config.playlist))
      }
    }
    function n(S) {
      r(S.playlist)
    }
    function r(S) {
      M.setPlaylist(S);
      if(M.playlist[0].sources.length == 0) {
        y("Error loading playlist: No playable sources found")
      } else {
        o(d)
      }
    }
    function F(S) {
      y("Error loading playlist: " + S.message)
    }
    function L() {
      var T = M.playlist[M.item].image;
      if(T) {
        var S = new Image();
        S.addEventListener("load", N, false);
        S.addEventListener("error", N, false);
        S.src = T;
        setTimeout(N, 500)
      } else {
        o(k)
      }
    }
    function N() {
      o(k)
    }
    function Q() {
      q.setup(B);
      o(c)
    }
    function K() {
      o(b)
    }
    function E() {
      A.sendEvent(m.JWPLAYER_READY);
      o(g)
    }
    function y(S) {
      w = true;
      A.sendEvent(m.JWPLAYER_ERROR, {
        message: S
      });
      q.setupError(S)
    }
    l.extend(this, A);
    this.start = H;
    u()
  }
})(jwplayer.html5);
(function(a) {
  a.skin = function() {
    var b = {};
    var d = false;
    this.load = function(g, f, e) {
      new a.skinloader(g, function(h) {
        d = true;
        b = h;
        if(typeof f == "function") {
          f()
        }
      }, function(h) {
        if(typeof e == "function") {
          e(h)
        }
      })
    };
    this.getSkinElement = function(e, f) {
      e = c(e);
      f = c(f);
      if(d) {
        try {
          return b[e].elements[f]
        } catch(g) {
          jwplayer.utils.log("No such skin component / element: ", [e, f])
        }
      }
      return null
    };
    this.getComponentSettings = function(e) {
      e = c(e);
      if(d && b && b[e]) {
        return b[e].settings
      }
      return null
    };
    this.getComponentLayout = function(e) {
      e = c(e);
      if(d) {
        var f = b[e].layout;
        if(f && (f.left || f.right || f.center)) {
          return b[e].layout
        }
      }
      return null
    };

    function c(e) {
      return e.toLowerCase()
    }
  }
})(jwplayer.html5);
(function(b) {
  var a = jwplayer.utils,
    c = "Skin formatting error";
  b.skinloader = function(f, l, h) {
    var j = {},
      n = l,
      v = h,
      s = true,
      w, x = f,
      g = false,
      u;

    function z() {
      if(typeof x != "string" || x === "") {
        y(b.defaultskin().xml)
      } else {
        if(a.extension(x) != "xml") {
          v("Skin not a valid file type");
          return
        }
        var A = new b.skinloader("", o, v)
      }
    }
    function o(A) {
      j = A;
      a.ajax(a.getAbsolutePath(x), function(B) {
        try {
          if(a.exists(B.responseXML)) {
            y(B.responseXML);
            return
          }
        } catch(C) {
          v(c)
        }
      }, function(B) {
        v(B)
      })
    }
    function m(A, B) {
      return A ? A.getElementsByTagName(B) : null
    }
    function y(F) {
      var E = m(F, "skin")[0],
        M = m(E, "component"),
        Y = E.getAttribute("target");
      if(!Y || parseFloat(Y) > parseFloat(jwplayer.version)) {
        v("Incompatible player version")
      }
      if(M.length === 0) {
        n(j);
        return
      }
      for(var P = 0; P < M.length; P++) {
        var K = k(M[P].getAttribute("name")),
          J = {
            settings: {},
            elements: {},
            layout: {}
          },
          O = m(m(M[P], "elements")[0], "element");
        j[K] = J;
        for(var N = 0; N < O.length; N++) {
          q(O[N], K)
        }
        var G = m(M[P], "settings")[0];
        if(G && G.childNodes.length > 0) {
          var S = m(G, "setting");
          for(var X = 0; X < S.length; X++) {
            var Z = S[X].getAttribute("name");
            var Q = S[X].getAttribute("value");
            if(/color$/.test(Z)) {
              Q = a.stringToColor(Q)
            }
            J.settings[k(Z)] = Q
          }
        }
        var T = m(M[P], "layout")[0];
        if(T && T.childNodes.length > 0) {
          var U = m(T, "group");
          for(var D = 0; D < U.length; D++) {
            var I = U[D],
              H = {
                elements: []
              };
            J.layout[k(I.getAttribute("position"))] = H;
            for(var W = 0; W < I.attributes.length; W++) {
              var L = I.attributes[W];
              H[L.name] = L.value
            }
            var V = m(I, "*");
            for(var C = 0; C < V.length; C++) {
              var A = V[C];
              H.elements.push({
                type: A.tagName
              });
              for(var B = 0; B < A.attributes.length; B++) {
                var R = A.attributes[B];
                H.elements[C][k(R.name)] = R.value
              }
              if(!a.exists(H.elements[C].name)) {
                H.elements[C].name = A.tagName
              }
            }
          }
        }
        s = false;
        p()
      }
    }
    function p() {
      clearInterval(w);
      if(!g) {
        w = setInterval(function() {
          e()
        }, 100)
      }
    }
    function q(F, E) {
      E = k(E);
      var D = new Image(),
        A = k(F.getAttribute("name")),
        C = F.getAttribute("src"),
        H;
      if(C.indexOf("data:image/png;base64,") === 0) {
        H = C
      } else {
        var B = a.getAbsolutePath(x);
        var G = B.substr(0, B.lastIndexOf("/"));
        H = [G, E, C].join("/")
      }
      j[E].elements[A] = {
        height: 0,
        width: 0,
        src: "",
        ready: false,
        image: D
      };
      D.onload = function(I) {
        r(D, A, E)
      };
      D.onerror = function(I) {
        g = true;
        p();
        v("Skin image not found: " + this.src)
      };
      D.src = H
    }
    function d() {
      for(var B in j) {
        var D = j[B];
        for(var A in D.elements) {
          var E = D.elements[A];
          var C = E.image;
          C.onload = null;
          C.onerror = null;
          delete E.image;
          delete D.elements[A]
        }
        delete j[B]
      }
    }
    function e() {
      for(var A in j) {
        if(A != "properties") {
          for(var B in j[A].elements) {
            if(!t(A, B).ready) {
              return
            }
          }
        }
      }
      if(s == false) {
        clearInterval(w);
        n(j)
      }
    }
    function r(B, D, C) {
      var A = t(C, D);
      if(A) {
        A.height = B.height;
        A.width = B.width;
        A.src = B.src;
        A.ready = true;
        p()
      } else {
        a.log("Loaded an image for a missing element: " + C + "." + D)
      }
    }
    function t(A, B) {
      return j[k(A)] ? j[k(A)].elements[k(B)] : null
    }
    function k(A) {
      return A ? A.toLowerCase() : ""
    }
    z()
  }
})(jwplayer.html5);
(function(c) {
  var a = c.utils,
    d = c.events,
    b = d.state;
  c.html5.video = function(X) {
    var R = {
      abort: A,
      canplay: r,
      canplaythrough: A,
      durationchange: D,
      emptied: A,
      ended: m,
      error: n,
      loadeddata: A,
      loadedmetadata: r,
      loadstart: A,
      pause: W,
      play: W,
      playing: W,
      progress: E,
      ratechange: A,
      readystatechange: A,
      seeked: I,
      seeking: A,
      stalled: A,
      suspend: A,
      timeupdate: Y,
      volumechange: k,
      waiting: v
    },
      y = a.extensionmap,
      G, M, ae, w, ad, p, U, ac, L, S, H, e = b.IDLE,
      N, o = -1,
      K = -1,
      O = new d.eventdispatcher(),
      t = false,
      J, F = -1,
      g = this;
    a.extend(g, O);

    function Z(af) {
      w = af;
      T();
      w.controls = true;
      w.controls = false;
      t = true
    }
    function T() {
      for(var af in R) {
        w.addEventListener(af, R[af], false)
      }
    }
    function s(af, ag) {
      if(t) {
        O.sendEvent(af, ag)
      }
    }
    function A(af) {}
    function D(ag) {
      if(!t) {
        return
      }
      var af = ab(w.duration);
      if(ad != af) {
        ad = af
      }
      Y()
    }
    function Y(af) {
      if(!t) {
        return
      }
      if(e == b.PLAYING && !H) {
        p = ab(w.currentTime);
        s(d.JWPLAYER_MEDIA_TIME, {
          position: p,
          duration: ad
        });
        if(p >= ad && ad > 3 && !a.isAndroid(2.3)) {
          V()
        }
      }
    }
    function ab(af) {
      return Number(af.toFixed(1))
    }
    function r(af) {
      A(af);
      if(!t) {
        return
      }
      if(!ac) {
        ac = true;
        q()
      }
    }
    function E(af) {
      if(ac && S > 0) {
        setTimeout(function() {
          B(S)
        }, 200)
      }
    }
    function q() {
      if(!L) {
        L = true;
        s(d.JWPLAYER_MEDIA_BUFFER_FULL)
      }
    }
    function W(af) {
      if(!t || H) {
        return
      }
      if(w.paused) {
        if(w.currentTime == w.duration && w.duration > 3) {
          V()
        } else {
          f()
        }
      } else {
        x(b.PLAYING)
      }
    }
    function v(af) {
      if(!t) {
        return
      }
      x(b.BUFFERING)
    }
    function n(af) {
      if(!t) {
        return
      }
      a.log("Error playing media: %o", w.error);
      O.sendEvent(d.JWPLAYER_MEDIA_ERROR, {
        message: "Error loading media: File could not be played"
      });
      x(b.IDLE)
    }
    function l(ai) {
      var af;
      if(a.typeOf(ai) == "array" && ai.length > 0) {
        af = [];
        for(var ah = 0; ah < ai.length; ah++) {
          var aj = ai[ah],
            ag = {};
          ag.label = Q(aj) ? Q(aj) : ah;
          if(aj.width) {
            ag.width = aj.width
          }
          if(aj.height) {
            ag.height = aj.height
          }
          if(aj.bitrate) {
            ag.bitrate = aj.bitrate
          }
          af[ah] = ag
        }
      }
      return af
    }
    function j(ag) {
      var af = l(ag);
      if(af) {
        O.sendEvent(d.JWPLAYER_MEDIA_LEVELS, {
          levels: af,
          currentQuality: F
        })
      }
    }
    function Q(af) {
      if(af.label) {
        return af.label
      } else {
        if(af.height) {
          return af.height + "p"
        } else {
          if(af.width) {
            return Math.round(af.width * 9 / 16) + "p"
          } else {
            if(af.bitrate) {
              return af.bitrate + "kbps"
            } else {
              return 0
            }
          }
        }
      }
    }
    g.load = function(af) {
      if(!t) {
        return
      }
      G = af;
      S = 0;
      ad = af.duration ? af.duration : -1;
      p = 0;
      J = G.sources;
      C();
      j(J);
      u()
    };

    function C() {
      if(F < 0) {
        F = 0
      }
      var ah = J.slice(0).sort(function(ak, aj) {
        return Number(aj.width) - Number(ak.width)
      }),
        ag = a.bounds(w),
        af, ai;
      for(af = 0; af < ah.length; af++) {
        ai = ah[af];
        if(ai.width && ai.width <= ag.width) {
          F = J.indexOf(ai);
          break
        }
      }
    }
    function u() {
      ac = false;
      L = false;
      M = J[F];
      x(b.BUFFERING);
      w.src = M.file;
      w.load();
      o = setInterval(h, 100);
      if(a.isIPod() || a.isAndroid(2.3)) {
        q()
      }
    }
    var z = g.stop = function() {
        if(!t) {
          return
        }
        w.removeAttribute("src");
        if(!a.isIE()) {
          w.load()
        }
        F = -1;
        clearInterval(o);
        x(b.IDLE)
      };
    g.play = function() {
      if(t && !H) {
        w.play()
      }
    };
    var f = g.pause = function() {
        if(t) {
          w.pause();
          x(b.PAUSED)
        }
      };
    g.seekDrag = function(af) {
      if(!t) {
        return
      }
      H = af;
      if(af) {
        w.pause()
      } else {
        w.play()
      }
    };
    var B = g.seek = function(af) {
        if(!t) {
          return
        }
        if(ac) {
          S = 0;
          w.currentTime = af
        } else {
          S = af
        }
      };

    function I() {
      if(!H) {
        s(d.JWPLAYER_MEDIA_SEEK, {
          position: p,
          offset: w.currentTime
        })
      }
    }
    var aa = g.volume = function(af) {
        w.volume = Math.min(Math.max(0, af / 100), 1)
      };

    function k(af) {
      s(d.JWPLAYER_MEDIA_VOLUME, {
        volume: Math.round(w.volume * 100)
      });
      s(d.JWPLAYER_MEDIA_MUTE, {
        mute: w.muted
      })
    }
    g.mute = function(af) {
      if(!a.exists(af)) {
        af = !w.mute
      }
      if(af) {
        if(!w.muted) {
          N = w.volume * 100;
          w.muted = true;
          aa(0)
        }
      } else {
        if(w.muted) {
          aa(N);
          w.muted = false
        }
      }
    };

    function x(af) {
      if(af == b.PAUSED && e == b.IDLE) {
        return
      }
      if(H) {
        return
      }
      if(e != af) {
        var ag = e;
        e = af;
        s(d.JWPLAYER_PLAYER_STATE, {
          oldstate: ag,
          newstate: af
        })
      }
    }
    function h() {
      if(!t) {
        return
      }
      var af = P();
      if(af != K) {
        K = af;
        s(d.JWPLAYER_MEDIA_BUFFER, {
          bufferPercent: Math.round(K * 100)
        })
      }
      if(af >= 1) {
        clearInterval(o)
      }
    }
    function P() {
      if(w.buffered.length == 0 || w.duration == 0) {
        return 0
      } else {
        return w.buffered.end(w.buffered.length - 1) / w.duration
      }
    }
    function m() {
      if(a.isAndroid(2.3)) {
        V()
      }
    }
    function V() {
      if(e != b.IDLE) {
        F = -1;
        x(b.IDLE);
        s(d.JWPLAYER_MEDIA_BEFORECOMPLETE);
        s(d.JWPLAYER_MEDIA_COMPLETE)
      }
    }
    g.detachMedia = function() {
      t = false;
      return w
    };
    g.attachMedia = function() {
      t = true
    };
    g.getTag = function() {
      return w
    };
    g.audioMode = function() {
      if(!J) {
        return false
      }
      var af = J[0].type;
      return(af == "aac" || af == "mp3" || af == "vorbis")
    };
    g.setCurrentQuality = function(ag) {
      if(F == ag) {
        return
      }
      ag = parseInt(ag);
      if(ag >= 0) {
        if(J && J.length > ag) {
          F = ag;
          s(d.JWPLAYER_MEDIA_LEVEL_CHANGED, {
            currentQuality: ag,
            levels: l(J)
          });
          var af = w.currentTime;
          u();
          g.seek(af)
        }
      }
    };
    g.getCurrentQuality = function() {
      return F
    };
    g.getQualityLevels = function() {
      return l(J)
    };
    Z(X)
  }
})(jwplayer);
(function(l) {
  var p = jwplayer,
    x = p.utils,
    a = jwplayer.events,
    f = a.state,
    r = x.css,
    t = x.bounds,
    w = x.isMobile(),
    d = x.isIPad(),
    A = x.isIPod(),
    h = x.isAndroid(),
    g = document,
    o = "jwplayer",
    b = "." + o + ".jwfullscreen",
    q = "jwmain",
    z = "jwinstream",
    y = "jwvideo",
    c = "jwcontrols",
    e = "jwplaylistcontainer",
    k = true,
    s = false,
    v = "opacity .5s ease",
    n = "100%",
    j = "absolute",
    u = " !important",
    m = "hidden";
  l.view = function(M, H) {
    var L = M,
      J = H,
      am, Y, W, at, D = 0,
      aF = 2000,
      F, aO, R, aE, aP, aA, ap, aw = x.extend({}, J.componentConfig("logo")),
      an, aJ, T, ag = (J.mobilecontrols),
      aG = s,
      ah, P, au, aB, aC = s,
      ax = new a.eventdispatcher();
    x.extend(this, ax);

    function aL() {
      am = aI("div", o);
      am.id = L.id;
      ai(J.width, J.height);
      var aS = document.getElementById(L.id);
      aS.parentNode.replaceChild(am, aS)
    }
    this.getCurrentCaptions = function() {
      return an.getCurrentCaptions()
    };
    this.setCurrentCaptions = function(aS) {
      an.setCurrentCaptions(aS)
    };
    this.getCaptionsList = function() {
      return an.getCaptionsList()
    };
    this.setup = function(aT) {
      if(aG) {
        return
      }
      L.skin = aT;
      Y = aI("span", q);
      aO = aI("span", y);
      F = J.getVideo().getTag();
      aO.appendChild(F);
      W = aI("span", c);
      R = aI("span", z);
      at = aI("span", e);
      C();
      Y.appendChild(aO);
      Y.appendChild(W);
      Y.appendChild(R);
      var aS = aI("div");
      aS.style.position = "absolute";
      aS.style.width = "100%";
      aS.style.height = "100%";
      aS.appendChild(Y);
      aS.appendChild(at);
      am.appendChild(aS);
      g.addEventListener("webkitfullscreenchange", aK, s);
      F.addEventListener("webkitbeginfullscreen", aK, s);
      F.addEventListener("webkitendfullscreen", aK, s);
      g.addEventListener("mozfullscreenchange", aK, s);
      g.addEventListener("keydown", ay, s);
      L.jwAddEventListener(a.JWPLAYER_PLAYER_READY, aH);
      L.jwAddEventListener(a.JWPLAYER_PLAYER_STATE, O);
      L.jwAddEventListener(a.JWPLAYER_PLAYLIST_COMPLETE, aD);
      O({
        newstate: f.IDLE
      });
      W.addEventListener("mouseout", av, s);
      W.addEventListener("mousemove", aQ, s);
      if(x.isIE()) {
        aO.addEventListener("mousemove", aQ, s);
        aO.addEventListener("click", aP.clickHandler)
      }
      N(aE);
      N(aA);
      N(ap)
    };

    function N(aS) {
      if(aS) {
        aS.element().addEventListener("mousemove", ak, s);
        aS.element().addEventListener("mouseout", aN, s)
      }
    }
    function aI(aT, aS) {
      var aU = g.createElement(aT);
      if(aS) {
        aU.className = aS
      }
      return aU
    }
    function aQ() {
      clearTimeout(D);
      if(L.jwGetState() == f.PLAYING || L.jwGetState() == f.PAUSED) {
        az();
        if(!aC) {
          D = setTimeout(av, aF)
        }
      }
    }
    function ak() {
      clearTimeout(D);
      aC = k
    }
    function aN() {
      aC = s
    }
    function av() {
      if(L.jwGetState() != f.BUFFERING) {
        Q();
        ac();
        aa()
      }
      clearTimeout(D);
      D = 0
    }
    function ao(aS) {
      ax.sendEvent(aS.type, aS)
    }
    function C() {
      var aU = J.width,
        aS = J.height,
        aV = J.componentConfig("controlbar"),
        aT = J.componentConfig("display");
      G(aS);
      an = new l.captions(L, J.captions);
      an.addEventListener(a.JWPLAYER_CAPTIONS_LIST, ao);
      an.addEventListener(a.JWPLAYER_CAPTIONS_CHANGED, ao);
      W.appendChild(an.element());
      aP = new l.display(L, aT);
      aP.addEventListener(a.JWPLAYER_DISPLAY_CLICK, ao);
      if(T) {
        aP.hidePreview(k)
      }
      W.appendChild(aP.element());
      ap = new l.logo(L, aw);
      W.appendChild(ap.element());
      aA = new l.dock(L, J.componentConfig("dock"));
      W.appendChild(aA.element());
      if(L.edition) {
        au = new l.rightclick(L, {
          abouttext: J.abouttext,
          aboutlink: J.aboutlink
        })
      } else {
        au = new l.rightclick(L, {})
      }
      if(J.playlistsize && J.playlistposition && J.playlistposition != "none") {
        aJ = new l.playlistcomponent(L, {});
        at.appendChild(aJ.element())
      }
      if(!w || ag) {
        aE = new l.controlbar(L, aV);
        W.appendChild(aE.element());
        if(ag) {
          az()
        }
      }
      setTimeout(function() {
        ai(J.width, J.height)
      }, 0)
    }
    var ad = this.fullscreen = function(aS) {
        if(!x.exists(aS)) {
          aS = !J.fullscreen
        }
        if(aS) {
          if(!J.fullscreen) {
            if(!d) {
              aj(k)
            }
            if(am.requestFullScreen) {
              am.requestFullScreen()
            } else {
              if(am.mozRequestFullScreen) {
                am.mozRequestFullScreen()
              } else {
                if(am.webkitRequestFullScreen) {
                  am.webkitRequestFullScreen()
                }
              }
            }
            J.setFullscreen(k)
          }
        } else {
          if(!d) {
            aj(s)
          }
          if(J.fullscreen) {
            J.setFullscreen(s);
            if(g.cancelFullScreen) {
              g.cancelFullScreen()
            } else {
              if(g.mozCancelFullScreen) {
                g.mozCancelFullScreen()
              } else {
                if(g.webkitCancelFullScreen) {
                  g.webkitCancelFullScreen()
                } else {
                  if(F.webkitExitFullScreen) {
                    F.webkitExitFullScreen()
                  }
                }
              }
            }
          }
          if(d && L.jwGetState() == f.PAUSED) {
            setTimeout(E, 500)
          }
        }
        af(aE);
        af(aP);
        af(aA);
        K();
        if(J.fullscreen) {
          aB = setInterval(K, 200)
        } else {
          clearInterval(aB)
        }
        setTimeout(function() {
          var aT = x.bounds(Y);
          J.width = aT.width;
          J.height = aT.height;
          ax.sendEvent(a.JWPLAYER_RESIZE)
        }, 0)
      };

    function af(aS) {
      if(aS) {
        aS.redraw()
      }
    }
    function ai(aU, aS) {
      if(x.exists(aU) && x.exists(aS)) {
        J.width = aU;
        J.height = aS
      }
      am.style.width = isNaN(aU) ? aU : aU + "px";
      am.style.height = isNaN(aS) ? aS : aS + "px";
      if(aP) {
        aP.redraw()
      }
      if(aE) {
        aE.redraw()
      }
      if(ap) {
        setTimeout(function() {
          ap.offset(aE && ap.position().indexOf("bottom") >= 0 ? aE.element().clientHeight + aE.margin() : 0);
          if(aA) {
            aA.offset(ap.position() == "top-left" ? ap.element().clientWidth + ap.margin() : 0)
          }
        }, 500)
      }
      var aW = J.playlistsize,
        aX = J.playlistposition;
      if(aJ && aW && (aX == "right" || aX == "bottom")) {
        aJ.redraw();
        var aT = {
          display: "block"
        },
          aV = {};
        aT[aX] = 0;
        aV[aX] = aW;
        if(aX == "right") {
          aT.width = aW
        } else {
          aT.height = aW
        }
        r(ar(e), aT);
        r(ar(q), aV)
      }
      G(aS);
      K();
      ax.sendEvent(a.JWPLAYER_RESIZE);
      return
    }
    function G(aS) {
      T = ((!w || ag) && aS <= 40 && aS.toString().indexOf("%") < 0);
      if(aE) {
        if(T) {
          aE.audioMode(k);
          az();
          aP.hidePreview(k);
          U();
          Z(s)
        } else {
          aE.audioMode(s);
          aM(L.jwGetState())
        }
      }
      if(ap && T) {
        aa()
      }
      am.style.backgroundColor = T ? "transparent" : "#000"
    }
    function K() {
      if(F) {
        x.stretch(J.stretching, F, aO.clientWidth, aO.clientHeight, F.videoWidth, F.videoHeight)
      }
    }
    this.resize = ai;
    this.resizeMedia = K;
    var al = this.completeSetup = function() {
        r(ar(), {
          opacity: 1
        })
      };

    function ay(aS) {
      if(J.fullscreen) {
        switch(aS.keyCode) {
        case 27:
          ad(s);
          break
        }
      }
    }
    function aj(aS) {
      if(aS) {
        am.className += " jwfullscreen";
        (g.getElementsByTagName("body")[0]).style["overflow-y"] = "hidden"
      } else {
        am.className = am.className.replace(/\s+jwfullscreen/, "");
        (g.getElementsByTagName("body")[0]).style["overflow-y"] = ""
      }
    }
    function aR() {
      var aS = [g.mozFullScreenElement, g.webkitCurrentFullScreenElement, F.webkitDisplayingFullscreen];
      for(var aT = 0; aT < aS.length; aT++) {
        if(aS[aT] && (!aS[aT].id || aS[aT].id == L.id)) {
          return k
        }
      }
      return s
    }
    function aK(aS) {
      var aT = aR();
      if(J.fullscreen != aT) {
        ad(aT)
      }
    }
    function V() {
      if(aE) {
        aE.show()
      }
    }
    function Q() {
      if(aE && !T && !ag) {
        aE.hide()
      }
    }
    function I() {
      if(aA && !T && (!w || ah)) {
        aA.show()
      }
    }
    function ac() {
      if(aA && !(ah || ag)) {
        aA.hide()
      }
    }
    function B() {
      if(ap && !T) {
        ap.show()
      }
    }
    function aa() {
      if(ap && (!ag || T)) {
        ap.hide(T)
      }
    }
    function E() {
      if(aP && J.controls && !T) {
        if(!A || L.jwGetState() == f.IDLE) {
          aP.show()
        }
      }
      if(w && !ag) {
        if(h) {
          W.style.display = "block"
        }
        if(!(w && J.fullscreen)) {
          F.controls = false
        }
      }
    }
    function U() {
      if(aP) {
        if(w && !ag) {
          if(h) {
            W.style.display = "none"
          }
          F.controls = true
        }
        aP.hide()
      }
    }
    function S() {
      Q();
      ac();
      aa()
    }
    function az() {
      if(J.controls || T) {
        V();
        I()
      }
      B()
    }
    function X(aT, aS) {
      if(aS.right < aT.left || aS.left > aT.right) {
        return aT
      }
      if(aS.bottom < aT.top || aS.top > aT.bottom) {
        return aT
      }
      var aU = (aS.y > aS.height / 2),
        aV = {
          x: aT.x,
          y: aU ? aT.y : aS.bottom,
          width: aT.width
        }
    }
    function Z(aS) {
      aS = aS && !T;
      r(ar(y), {
        visibility: aS ? "visible" : "hidden",
        opacity: aS ? 1 : 0
      })
    }
    function aD() {
      ah = k;
      ad(false);
      if(J.controls) {
        I()
      }
    }
    function aH(aS) {
      P = k
    }
    var ab;

    function O(aS) {
      ah = s;
      clearTimeout(ab);
      ab = setTimeout(function() {
        aM(aS.newstate)
      }, 100)
    }
    function aM(aS) {
      switch(aS) {
      case f.PLAYING:
        if(!J.getVideo().audioMode() || w) {
          Z(k);
          K();
          aP.hidePreview(k);
          if(w) {
            if(!(d && ag)) {
              U()
            }
          }
        } else {
          Z(s);
          aP.hidePreview(T)
        }
        aQ();
        break;
      case f.IDLE:
        if(!h) {
          Z(s)
        }
        av();
        if(!T) {
          aP.hidePreview(s);
          E();
          if(!aw.hide) {
            B()
          }
        }
        break;
      case f.BUFFERING:
        E();
        if(w) {
          Z(k)
        } else {
          az()
        }
        break;
      case f.PAUSED:
        E();
        if(!w || ag) {
          az()
        }
        break
      }
    }
    function ar(aS) {
      return "#" + L.id + (aS ? " ." + aS : "")
    }
    this.setupInstream = function(aS, aT) {
      aq(ar(z), k);
      aq(ar(c), s);
      R.appendChild(aS);
      _instreamVideo = aT;
      O({
        newstate: f.PLAYING
      });
      _instreamMode = k
    };
    var ae = this.destroyInstream = function() {
        aq(ar(z), s);
        aq(ar(c), k);
        R.innerHTML = "";
        _instreamVideo = null;
        _instreamMode = s;
        ai(J.width, J.height)
      };
    this.setupError = function(aS) {
      aG = true;
      jwplayer.embed.errorScreen(am, aS);
      al()
    };

    function aq(aS, aT) {
      r(aS, {
        display: aT ? "block" : "none"
      })
    }
    this.addButton = function(aU, aS, aT, aV) {
      if(aA) {
        aA.addButton(aU, aS, aT, aV)
      }
    };
    this.removeButton = function(aS) {
      if(aA) {
        aA.removeButton(aS)
      }
    };
    this.setControls = function(aT) {
      var aU = J.controls,
        aS = aT ? k : s;
      J.controls = aS;
      if(aS != aU) {
        if(aS) {
          E()
        } else {
          S();
          U()
        }
        ax.sendEvent(a.JWPLAYER_CONTROLS, {
          controls: aS
        })
      }
    };
    this.getSafeRegion = function() {
      var aZ = J.controls,
        a0 = x.bounds(Y),
        aU = a0.top,
        aX = x.bounds(aE ? aE.element() : null),
        aT = (aA.numButtons() > 0),
        aW = x.bounds(aA.element()),
        aV = x.bounds(ap.element()),
        aY = (ap.position().indexOf("top") == 0),
        aS = {};
      aS.x = 0;
      aS.y = Math.max(aT ? (aW.top + aW.height - aU) : 0, aY ? (aV.top + aV.height - aU) : 0);
      aS.width = a0.width;
      if(aX.height) {
        aS.height = (aY ? aX.top : aV.top) - aS.y - aU
      } else {
        aS.height = a0.height - aS.y
      }
      return {
        x: 0,
        y: aZ ? aS.y : 0,
        width: aZ ? aS.width : 0,
        height: aZ ? aS.height : 0
      }
    };
    this.destroy = function() {
      g.removeEventListener("webkitfullscreenchange", aK, s);
      g.removeEventListener("mozfullscreenchange", aK, s);
      F.removeEventListener("webkitbeginfullscreen", aK, s);
      F.removeEventListener("webkitendfullscreen", aK, s);
      g.removeEventListener("keydown", ay, s);
      if(au) {
        au.destroy()
      }
    };
    aL()
  };
  r("." + o, {
    position: "relative",
    opacity: 0,
    "min-height": x.isMobile() ? 200 : 0,
    "-webkit-transition": v,
    "-moz-transition": v,
    "-o-transition": v
  });
  r("." + q, {
    position: j,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    "-webkit-transition": v,
    "-moz-transition": v,
    "-o-transition": v
  });
  r("." + y + " ,." + c, {
    position: j,
    height: n,
    width: n,
    "-webkit-transition": v,
    "-moz-transition": v,
    "-o-transition": v
  });
  r("." + y, {
    visibility: "hidden",
    overflow: "hidden",
    cursor: "pointer"
  });
  r("." + y + " video", {
    background: "transparent",
    width: n,
    height: n
  });
  r("." + e, {
    position: j,
    height: n,
    width: n,
    display: "none"
  });
  r("." + z, {
    position: j,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: "none"
  });
  r(b, {
    width: n,
    height: n,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    "z-index": 1000,
    position: "fixed"
  }, k);
  r(b + " ." + q, {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }, k);
  r(b + " ." + e, {
    display: "none"
  }, k);
  r("." + o + " .jwuniform", {
    "background-size": "contain" + u
  });
  r("." + o + " .jwfill", {
    "background-size": "cover" + u,
    "background-position": "center"
  });
  r("." + o + " .jwexactfit", {
    "background-size": n + " " + n + u
  })
})(jwplayer.html5);
(function(b) {
  var d = jwplayer.utils.extend,
    c = b.logo,
    a;
  a = function(f, e) {
    if(f.edition() == "free") {
      e = null
    } else {
      c.defaults.file = "";
      c.defaults.prefix = ""
    }
    d(this, new c(f, e))
  };
  a.defaults = {
    prefix: "",
    file: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAATCAYAAACa0IPnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUVGQjQ0N0ZEOThDMTFFMUFDMUZCMzY5RkYyQkY5NDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUVGQjQ0ODBEOThDMTFFMUFDMUZCMzY5RkYyQkY5NDUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RUZCNDQ3REQ5OEMxMUUxQUMxRkIzNjlGRjJCRjk0NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RUZCNDQ3RUQ5OEMxMUUxQUMxRkIzNjlGRjJCRjk0NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr5HQqEAAArQSURBVHja3JkJUNT3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%3D%3D",
  };
  d(a.defaults, c.defaults);
  b.logo = a
})(jwplayer.html5);
(function(a) {
  var b = a.model,
    c;
  c = function(e) {
    var f = new jwplayer.utils.key(e.key),
      g = new b(e),
      d = g.componentConfig;
    g.edition = function() {
      return f.edition()
    };
    g.componentConfig = function(h) {
      if(h == "logo") {
        return g.logo
      } else {
        return d(h)
      }
    };
    return g
  };
  a.model = c
})(jwplayer.html5);
(function(a) {
  a.player.prototype.edition = function() {
    return this._model.edition()
  }
})(jwplayer.html5);
(function(e) {
  var g = jwplayer.utils.extend,
    h = e.rightclick,
    k, f = "free",
    c = "pro",
    d = "premium",
    j = "ads",
    b = "open",
    a = "About JW Player ",
    l = "http://www.longtailvideo.com/jwpabout/?a=r&v=";
  k = function(n, m) {
    if(n.edition() == "free") {
      m.aboutlink = l + e.version + "&m=h&e=f";
      delete m.abouttext
    } else {
      if(!m.aboutlink) {
        m.aboutlink = l + e.version + "&m=h&e=" + p(n.edition())
      }
      if(m.abouttext) {
        m.abouttext = "About " + m.abouttext + " ..."
      } else {
        var o = n.edition();
        o = o.charAt(0).toUpperCase() + o.substr(1);
        m.abouttext = a + e.version + " (" + o + " edition)"
      }
    }
    function p(q) {
      if(q == c) {
        return "p"
      } else {
        if(q == d) {
          return "r"
        } else {
          if(q == j) {
            return "a"
          } else {
            return "f"
          }
        }
      }
    }
    g(this, new h(n, m))
  };
  e.rightclick = k
})(jwplayer.html5);
(function(b) {
  var a = b.view,
    c = function(f, d) {
      var g = new a(f, d),
        e = d.edition();
      if(e == "invalid") {
        g.setupError("Error setting up player: Invalid license key")
      }
      return g
    };
  b.view = c
})(jwplayer.html5);