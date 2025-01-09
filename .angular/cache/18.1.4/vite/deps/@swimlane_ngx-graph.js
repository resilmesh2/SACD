import {
  bundle_default,
  day_default,
  line_default,
  monday,
  sinInOut,
  sunday,
  thursday,
  utcDay_default,
  utcMonday,
  utcSunday,
  utcThursday,
  utcYear_default,
  year_default
} from "./chunk-ROWZNKDH.js";
import {
  require_dagre
} from "./chunk-ILRQUXYH.js";
import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-Y3VWOF4Z.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-ZZYSP2DO.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  ViewChildren,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-QVSDJNBB.js";
import {
  fromEvent
} from "./chunk-N4YBMVXL.js";
import "./chunk-DVE26OTL.js";
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  first,
  of,
  takeUntil
} from "./chunk-LDBH3HRD.js";
import {
  __decorate
} from "./chunk-4FVJWPNW.js";
import {
  __commonJS,
  __export,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-VNZ2F6MF.js";

// node_modules/webcola/dist/src/powergraph.js
var require_powergraph = __commonJS({
  "node_modules/webcola/dist/src/powergraph.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PowerEdge = /* @__PURE__ */ function() {
      function PowerEdge2(source, target, type) {
        this.source = source;
        this.target = target;
        this.type = type;
      }
      return PowerEdge2;
    }();
    exports.PowerEdge = PowerEdge;
    var Configuration = function() {
      function Configuration2(n, edges, linkAccessor, rootGroup) {
        var _this = this;
        this.linkAccessor = linkAccessor;
        this.modules = new Array(n);
        this.roots = [];
        if (rootGroup) {
          this.initModulesFromGroup(rootGroup);
        } else {
          this.roots.push(new ModuleSet());
          for (var i = 0; i < n; ++i) this.roots[0].add(this.modules[i] = new Module(i));
        }
        this.R = edges.length;
        edges.forEach(function(e) {
          var s = _this.modules[linkAccessor.getSourceIndex(e)], t = _this.modules[linkAccessor.getTargetIndex(e)], type = linkAccessor.getType(e);
          s.outgoing.add(type, t);
          t.incoming.add(type, s);
        });
      }
      Configuration2.prototype.initModulesFromGroup = function(group) {
        var moduleSet = new ModuleSet();
        this.roots.push(moduleSet);
        for (var i = 0; i < group.leaves.length; ++i) {
          var node = group.leaves[i];
          var module2 = new Module(node.id);
          this.modules[node.id] = module2;
          moduleSet.add(module2);
        }
        if (group.groups) {
          for (var j = 0; j < group.groups.length; ++j) {
            var child = group.groups[j];
            var definition = {};
            for (var prop in child) if (prop !== "leaves" && prop !== "groups" && child.hasOwnProperty(prop)) definition[prop] = child[prop];
            moduleSet.add(new Module(-1 - j, new LinkSets(), new LinkSets(), this.initModulesFromGroup(child), definition));
          }
        }
        return moduleSet;
      };
      Configuration2.prototype.merge = function(a, b, k) {
        if (k === void 0) {
          k = 0;
        }
        var inInt = a.incoming.intersection(b.incoming), outInt = a.outgoing.intersection(b.outgoing);
        var children = new ModuleSet();
        children.add(a);
        children.add(b);
        var m = new Module(this.modules.length, outInt, inInt, children);
        this.modules.push(m);
        var update = function(s, i, o) {
          s.forAll(function(ms, linktype) {
            ms.forAll(function(n) {
              var nls = n[i];
              nls.add(linktype, m);
              nls.remove(linktype, a);
              nls.remove(linktype, b);
              a[o].remove(linktype, n);
              b[o].remove(linktype, n);
            });
          });
        };
        update(outInt, "incoming", "outgoing");
        update(inInt, "outgoing", "incoming");
        this.R -= inInt.count() + outInt.count();
        this.roots[k].remove(a);
        this.roots[k].remove(b);
        this.roots[k].add(m);
        return m;
      };
      Configuration2.prototype.rootMerges = function(k) {
        if (k === void 0) {
          k = 0;
        }
        var rs = this.roots[k].modules();
        var n = rs.length;
        var merges = new Array(n * (n - 1));
        var ctr = 0;
        for (var i = 0, i_ = n - 1; i < i_; ++i) {
          for (var j = i + 1; j < n; ++j) {
            var a = rs[i], b = rs[j];
            merges[ctr] = {
              id: ctr,
              nEdges: this.nEdges(a, b),
              a,
              b
            };
            ctr++;
          }
        }
        return merges;
      };
      Configuration2.prototype.greedyMerge = function() {
        for (var i = 0; i < this.roots.length; ++i) {
          if (this.roots[i].modules().length < 2) continue;
          var ms = this.rootMerges(i).sort(function(a, b) {
            return a.nEdges == b.nEdges ? a.id - b.id : a.nEdges - b.nEdges;
          });
          var m = ms[0];
          if (m.nEdges >= this.R) continue;
          this.merge(m.a, m.b, i);
          return true;
        }
      };
      Configuration2.prototype.nEdges = function(a, b) {
        var inInt = a.incoming.intersection(b.incoming), outInt = a.outgoing.intersection(b.outgoing);
        return this.R - inInt.count() - outInt.count();
      };
      Configuration2.prototype.getGroupHierarchy = function(retargetedEdges) {
        var _this = this;
        var groups = [];
        var root2 = {};
        toGroups(this.roots[0], root2, groups);
        var es = this.allEdges();
        es.forEach(function(e) {
          var a = _this.modules[e.source];
          var b = _this.modules[e.target];
          retargetedEdges.push(new PowerEdge(typeof a.gid === "undefined" ? e.source : groups[a.gid], typeof b.gid === "undefined" ? e.target : groups[b.gid], e.type));
        });
        return groups;
      };
      Configuration2.prototype.allEdges = function() {
        var es = [];
        Configuration2.getEdges(this.roots[0], es);
        return es;
      };
      Configuration2.getEdges = function(modules, es) {
        modules.forAll(function(m) {
          m.getEdges(es);
          Configuration2.getEdges(m.children, es);
        });
      };
      return Configuration2;
    }();
    exports.Configuration = Configuration;
    function toGroups(modules, group, groups) {
      modules.forAll(function(m) {
        if (m.isLeaf()) {
          if (!group.leaves) group.leaves = [];
          group.leaves.push(m.id);
        } else {
          var g = group;
          m.gid = groups.length;
          if (!m.isIsland() || m.isPredefined()) {
            g = {
              id: m.gid
            };
            if (m.isPredefined()) for (var prop in m.definition) g[prop] = m.definition[prop];
            if (!group.groups) group.groups = [];
            group.groups.push(m.gid);
            groups.push(g);
          }
          toGroups(m.children, g, groups);
        }
      });
    }
    var Module = function() {
      function Module2(id2, outgoing, incoming, children, definition) {
        if (outgoing === void 0) {
          outgoing = new LinkSets();
        }
        if (incoming === void 0) {
          incoming = new LinkSets();
        }
        if (children === void 0) {
          children = new ModuleSet();
        }
        this.id = id2;
        this.outgoing = outgoing;
        this.incoming = incoming;
        this.children = children;
        this.definition = definition;
      }
      Module2.prototype.getEdges = function(es) {
        var _this = this;
        this.outgoing.forAll(function(ms, edgetype) {
          ms.forAll(function(target) {
            es.push(new PowerEdge(_this.id, target.id, edgetype));
          });
        });
      };
      Module2.prototype.isLeaf = function() {
        return this.children.count() === 0;
      };
      Module2.prototype.isIsland = function() {
        return this.outgoing.count() === 0 && this.incoming.count() === 0;
      };
      Module2.prototype.isPredefined = function() {
        return typeof this.definition !== "undefined";
      };
      return Module2;
    }();
    exports.Module = Module;
    function intersection(m, n) {
      var i = {};
      for (var v in m) if (v in n) i[v] = m[v];
      return i;
    }
    var ModuleSet = function() {
      function ModuleSet2() {
        this.table = {};
      }
      ModuleSet2.prototype.count = function() {
        return Object.keys(this.table).length;
      };
      ModuleSet2.prototype.intersection = function(other) {
        var result = new ModuleSet2();
        result.table = intersection(this.table, other.table);
        return result;
      };
      ModuleSet2.prototype.intersectionCount = function(other) {
        return this.intersection(other).count();
      };
      ModuleSet2.prototype.contains = function(id2) {
        return id2 in this.table;
      };
      ModuleSet2.prototype.add = function(m) {
        this.table[m.id] = m;
      };
      ModuleSet2.prototype.remove = function(m) {
        delete this.table[m.id];
      };
      ModuleSet2.prototype.forAll = function(f) {
        for (var mid in this.table) {
          f(this.table[mid]);
        }
      };
      ModuleSet2.prototype.modules = function() {
        var vs = [];
        this.forAll(function(m) {
          if (!m.isPredefined()) vs.push(m);
        });
        return vs;
      };
      return ModuleSet2;
    }();
    exports.ModuleSet = ModuleSet;
    var LinkSets = function() {
      function LinkSets2() {
        this.sets = {};
        this.n = 0;
      }
      LinkSets2.prototype.count = function() {
        return this.n;
      };
      LinkSets2.prototype.contains = function(id2) {
        var result = false;
        this.forAllModules(function(m) {
          if (!result && m.id == id2) {
            result = true;
          }
        });
        return result;
      };
      LinkSets2.prototype.add = function(linktype, m) {
        var s = linktype in this.sets ? this.sets[linktype] : this.sets[linktype] = new ModuleSet();
        s.add(m);
        ++this.n;
      };
      LinkSets2.prototype.remove = function(linktype, m) {
        var ms = this.sets[linktype];
        ms.remove(m);
        if (ms.count() === 0) {
          delete this.sets[linktype];
        }
        --this.n;
      };
      LinkSets2.prototype.forAll = function(f) {
        for (var linktype in this.sets) {
          f(this.sets[linktype], Number(linktype));
        }
      };
      LinkSets2.prototype.forAllModules = function(f) {
        this.forAll(function(ms, lt) {
          return ms.forAll(f);
        });
      };
      LinkSets2.prototype.intersection = function(other) {
        var result = new LinkSets2();
        this.forAll(function(ms, lt) {
          if (lt in other.sets) {
            var i = ms.intersection(other.sets[lt]), n = i.count();
            if (n > 0) {
              result.sets[lt] = i;
              result.n += n;
            }
          }
        });
        return result;
      };
      return LinkSets2;
    }();
    exports.LinkSets = LinkSets;
    function getGroups(nodes, links, la, rootGroup) {
      var n = nodes.length, c = new Configuration(n, links, la, rootGroup);
      while (c.greedyMerge()) ;
      var powerEdges = [];
      var g = c.getGroupHierarchy(powerEdges);
      powerEdges.forEach(function(e) {
        var f = function(end) {
          var g2 = e[end];
          if (typeof g2 == "number") e[end] = nodes[g2];
        };
        f("source");
        f("target");
      });
      return {
        groups: g,
        powerEdges
      };
    }
    exports.getGroups = getGroups;
  }
});

// node_modules/webcola/dist/src/linklengths.js
var require_linklengths = __commonJS({
  "node_modules/webcola/dist/src/linklengths.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function unionCount(a, b) {
      var u = {};
      for (var i in a) u[i] = {};
      for (var i in b) u[i] = {};
      return Object.keys(u).length;
    }
    function intersectionCount(a, b) {
      var n = 0;
      for (var i in a) if (typeof b[i] !== "undefined") ++n;
      return n;
    }
    function getNeighbours(links, la) {
      var neighbours = {};
      var addNeighbours = function(u, v) {
        if (typeof neighbours[u] === "undefined") neighbours[u] = {};
        neighbours[u][v] = {};
      };
      links.forEach(function(e) {
        var u = la.getSourceIndex(e), v = la.getTargetIndex(e);
        addNeighbours(u, v);
        addNeighbours(v, u);
      });
      return neighbours;
    }
    function computeLinkLengths(links, w, f, la) {
      var neighbours = getNeighbours(links, la);
      links.forEach(function(l) {
        var a = neighbours[la.getSourceIndex(l)];
        var b = neighbours[la.getTargetIndex(l)];
        la.setLength(l, 1 + w * f(a, b));
      });
    }
    function symmetricDiffLinkLengths(links, la, w) {
      if (w === void 0) {
        w = 1;
      }
      computeLinkLengths(links, w, function(a, b) {
        return Math.sqrt(unionCount(a, b) - intersectionCount(a, b));
      }, la);
    }
    exports.symmetricDiffLinkLengths = symmetricDiffLinkLengths;
    function jaccardLinkLengths(links, la, w) {
      if (w === void 0) {
        w = 1;
      }
      computeLinkLengths(links, w, function(a, b) {
        return Math.min(Object.keys(a).length, Object.keys(b).length) < 1.1 ? 0 : intersectionCount(a, b) / unionCount(a, b);
      }, la);
    }
    exports.jaccardLinkLengths = jaccardLinkLengths;
    function generateDirectedEdgeConstraints(n, links, axis, la) {
      var components = stronglyConnectedComponents(n, links, la);
      var nodes = {};
      components.forEach(function(c, i) {
        return c.forEach(function(v) {
          return nodes[v] = i;
        });
      });
      var constraints = [];
      links.forEach(function(l) {
        var ui = la.getSourceIndex(l), vi = la.getTargetIndex(l), u = nodes[ui], v = nodes[vi];
        if (u !== v) {
          constraints.push({
            axis,
            left: ui,
            right: vi,
            gap: la.getMinSeparation(l)
          });
        }
      });
      return constraints;
    }
    exports.generateDirectedEdgeConstraints = generateDirectedEdgeConstraints;
    function stronglyConnectedComponents(numVertices, edges, la) {
      var nodes = [];
      var index2 = 0;
      var stack = [];
      var components = [];
      function strongConnect(v2) {
        v2.index = v2.lowlink = index2++;
        stack.push(v2);
        v2.onStack = true;
        for (var _i2 = 0, _a2 = v2.out; _i2 < _a2.length; _i2++) {
          var w2 = _a2[_i2];
          if (typeof w2.index === "undefined") {
            strongConnect(w2);
            v2.lowlink = Math.min(v2.lowlink, w2.lowlink);
          } else if (w2.onStack) {
            v2.lowlink = Math.min(v2.lowlink, w2.index);
          }
        }
        if (v2.lowlink === v2.index) {
          var component = [];
          while (stack.length) {
            w2 = stack.pop();
            w2.onStack = false;
            component.push(w2);
            if (w2 === v2) break;
          }
          components.push(component.map(function(v3) {
            return v3.id;
          }));
        }
      }
      for (var i = 0; i < numVertices; i++) {
        nodes.push({
          id: i,
          out: []
        });
      }
      for (var _i = 0, edges_1 = edges; _i < edges_1.length; _i++) {
        var e = edges_1[_i];
        var v_1 = nodes[la.getSourceIndex(e)], w = nodes[la.getTargetIndex(e)];
        v_1.out.push(w);
      }
      for (var _a = 0, nodes_1 = nodes; _a < nodes_1.length; _a++) {
        var v = nodes_1[_a];
        if (typeof v.index === "undefined") strongConnect(v);
      }
      return components;
    }
    exports.stronglyConnectedComponents = stronglyConnectedComponents;
  }
});

// node_modules/webcola/dist/src/descent.js
var require_descent = __commonJS({
  "node_modules/webcola/dist/src/descent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Locks = function() {
      function Locks2() {
        this.locks = {};
      }
      Locks2.prototype.add = function(id2, x3) {
        this.locks[id2] = x3;
      };
      Locks2.prototype.clear = function() {
        this.locks = {};
      };
      Locks2.prototype.isEmpty = function() {
        for (var l in this.locks) return false;
        return true;
      };
      Locks2.prototype.apply = function(f) {
        for (var l in this.locks) {
          f(Number(l), this.locks[l]);
        }
      };
      return Locks2;
    }();
    exports.Locks = Locks;
    var Descent = function() {
      function Descent2(x3, D, G) {
        if (G === void 0) {
          G = null;
        }
        this.D = D;
        this.G = G;
        this.threshold = 1e-4;
        this.numGridSnapNodes = 0;
        this.snapGridSize = 100;
        this.snapStrength = 1e3;
        this.scaleSnapByMaxH = false;
        this.random = new PseudoRandom();
        this.project = null;
        this.x = x3;
        this.k = x3.length;
        var n = this.n = x3[0].length;
        this.H = new Array(this.k);
        this.g = new Array(this.k);
        this.Hd = new Array(this.k);
        this.a = new Array(this.k);
        this.b = new Array(this.k);
        this.c = new Array(this.k);
        this.d = new Array(this.k);
        this.e = new Array(this.k);
        this.ia = new Array(this.k);
        this.ib = new Array(this.k);
        this.xtmp = new Array(this.k);
        this.locks = new Locks();
        this.minD = Number.MAX_VALUE;
        var i = n, j;
        while (i--) {
          j = n;
          while (--j > i) {
            var d = D[i][j];
            if (d > 0 && d < this.minD) {
              this.minD = d;
            }
          }
        }
        if (this.minD === Number.MAX_VALUE) this.minD = 1;
        i = this.k;
        while (i--) {
          this.g[i] = new Array(n);
          this.H[i] = new Array(n);
          j = n;
          while (j--) {
            this.H[i][j] = new Array(n);
          }
          this.Hd[i] = new Array(n);
          this.a[i] = new Array(n);
          this.b[i] = new Array(n);
          this.c[i] = new Array(n);
          this.d[i] = new Array(n);
          this.e[i] = new Array(n);
          this.ia[i] = new Array(n);
          this.ib[i] = new Array(n);
          this.xtmp[i] = new Array(n);
        }
      }
      Descent2.createSquareMatrix = function(n, f) {
        var M = new Array(n);
        for (var i = 0; i < n; ++i) {
          M[i] = new Array(n);
          for (var j = 0; j < n; ++j) {
            M[i][j] = f(i, j);
          }
        }
        return M;
      };
      Descent2.prototype.offsetDir = function() {
        var _this = this;
        var u = new Array(this.k);
        var l = 0;
        for (var i = 0; i < this.k; ++i) {
          var x3 = u[i] = this.random.getNextBetween(0.01, 1) - 0.5;
          l += x3 * x3;
        }
        l = Math.sqrt(l);
        return u.map(function(x4) {
          return x4 *= _this.minD / l;
        });
      };
      Descent2.prototype.computeDerivatives = function(x3) {
        var _this = this;
        var n = this.n;
        if (n < 1) return;
        var i;
        var d = new Array(this.k);
        var d2 = new Array(this.k);
        var Huu = new Array(this.k);
        var maxH = 0;
        for (var u = 0; u < n; ++u) {
          for (i = 0; i < this.k; ++i) Huu[i] = this.g[i][u] = 0;
          for (var v = 0; v < n; ++v) {
            if (u === v) continue;
            var maxDisplaces = n;
            while (maxDisplaces--) {
              var sd2 = 0;
              for (i = 0; i < this.k; ++i) {
                var dx = d[i] = x3[i][u] - x3[i][v];
                sd2 += d2[i] = dx * dx;
              }
              if (sd2 > 1e-9) break;
              var rd = this.offsetDir();
              for (i = 0; i < this.k; ++i) x3[i][v] += rd[i];
            }
            var l = Math.sqrt(sd2);
            var D = this.D[u][v];
            var weight = this.G != null ? this.G[u][v] : 1;
            if (weight > 1 && l > D || !isFinite(D)) {
              for (i = 0; i < this.k; ++i) this.H[i][u][v] = 0;
              continue;
            }
            if (weight > 1) {
              weight = 1;
            }
            var D2 = D * D;
            var gs = 2 * weight * (l - D) / (D2 * l);
            var l3 = l * l * l;
            var hs = 2 * -weight / (D2 * l3);
            if (!isFinite(gs)) console.log(gs);
            for (i = 0; i < this.k; ++i) {
              this.g[i][u] += d[i] * gs;
              Huu[i] -= this.H[i][u][v] = hs * (l3 + D * (d2[i] - sd2) + l * sd2);
            }
          }
          for (i = 0; i < this.k; ++i) maxH = Math.max(maxH, this.H[i][u][u] = Huu[i]);
        }
        var r = this.snapGridSize / 2;
        var g = this.snapGridSize;
        var w = this.snapStrength;
        var k = w / (r * r);
        var numNodes = this.numGridSnapNodes;
        for (var u = 0; u < numNodes; ++u) {
          for (i = 0; i < this.k; ++i) {
            var xiu = this.x[i][u];
            var m = xiu / g;
            var f = m % 1;
            var q = m - f;
            var a = Math.abs(f);
            var dx = a <= 0.5 ? xiu - q * g : xiu > 0 ? xiu - (q + 1) * g : xiu - (q - 1) * g;
            if (-r < dx && dx <= r) {
              if (this.scaleSnapByMaxH) {
                this.g[i][u] += maxH * k * dx;
                this.H[i][u][u] += maxH * k;
              } else {
                this.g[i][u] += k * dx;
                this.H[i][u][u] += k;
              }
            }
          }
        }
        if (!this.locks.isEmpty()) {
          this.locks.apply(function(u2, p) {
            for (i = 0; i < _this.k; ++i) {
              _this.H[i][u2][u2] += maxH;
              _this.g[i][u2] -= maxH * (p[i] - x3[i][u2]);
            }
          });
        }
      };
      Descent2.dotProd = function(a, b) {
        var x3 = 0, i = a.length;
        while (i--) x3 += a[i] * b[i];
        return x3;
      };
      Descent2.rightMultiply = function(m, v, r) {
        var i = m.length;
        while (i--) r[i] = Descent2.dotProd(m[i], v);
      };
      Descent2.prototype.computeStepSize = function(d) {
        var numerator = 0, denominator = 0;
        for (var i = 0; i < this.k; ++i) {
          numerator += Descent2.dotProd(this.g[i], d[i]);
          Descent2.rightMultiply(this.H[i], d[i], this.Hd[i]);
          denominator += Descent2.dotProd(d[i], this.Hd[i]);
        }
        if (denominator === 0 || !isFinite(denominator)) return 0;
        return 1 * numerator / denominator;
      };
      Descent2.prototype.reduceStress = function() {
        this.computeDerivatives(this.x);
        var alpha = this.computeStepSize(this.g);
        for (var i = 0; i < this.k; ++i) {
          this.takeDescentStep(this.x[i], this.g[i], alpha);
        }
        return this.computeStress();
      };
      Descent2.copy = function(a, b) {
        var m = a.length, n = b[0].length;
        for (var i = 0; i < m; ++i) {
          for (var j = 0; j < n; ++j) {
            b[i][j] = a[i][j];
          }
        }
      };
      Descent2.prototype.stepAndProject = function(x0, r, d, stepSize) {
        Descent2.copy(x0, r);
        this.takeDescentStep(r[0], d[0], stepSize);
        if (this.project) this.project[0](x0[0], x0[1], r[0]);
        this.takeDescentStep(r[1], d[1], stepSize);
        if (this.project) this.project[1](r[0], x0[1], r[1]);
        for (var i = 2; i < this.k; i++) this.takeDescentStep(r[i], d[i], stepSize);
      };
      Descent2.mApply = function(m, n, f) {
        var i = m;
        while (i-- > 0) {
          var j = n;
          while (j-- > 0) f(i, j);
        }
      };
      Descent2.prototype.matrixApply = function(f) {
        Descent2.mApply(this.k, this.n, f);
      };
      Descent2.prototype.computeNextPosition = function(x0, r) {
        var _this = this;
        this.computeDerivatives(x0);
        var alpha = this.computeStepSize(this.g);
        this.stepAndProject(x0, r, this.g, alpha);
        if (this.project) {
          this.matrixApply(function(i, j) {
            return _this.e[i][j] = x0[i][j] - r[i][j];
          });
          var beta = this.computeStepSize(this.e);
          beta = Math.max(0.2, Math.min(beta, 1));
          this.stepAndProject(x0, r, this.e, beta);
        }
      };
      Descent2.prototype.run = function(iterations) {
        var stress = Number.MAX_VALUE, converged = false;
        while (!converged && iterations-- > 0) {
          var s = this.rungeKutta();
          converged = Math.abs(stress / s - 1) < this.threshold;
          stress = s;
        }
        return stress;
      };
      Descent2.prototype.rungeKutta = function() {
        var _this = this;
        this.computeNextPosition(this.x, this.a);
        Descent2.mid(this.x, this.a, this.ia);
        this.computeNextPosition(this.ia, this.b);
        Descent2.mid(this.x, this.b, this.ib);
        this.computeNextPosition(this.ib, this.c);
        this.computeNextPosition(this.c, this.d);
        var disp = 0;
        this.matrixApply(function(i, j) {
          var x3 = (_this.a[i][j] + 2 * _this.b[i][j] + 2 * _this.c[i][j] + _this.d[i][j]) / 6, d = _this.x[i][j] - x3;
          disp += d * d;
          _this.x[i][j] = x3;
        });
        return disp;
      };
      Descent2.mid = function(a, b, m) {
        Descent2.mApply(a.length, a[0].length, function(i, j) {
          return m[i][j] = a[i][j] + (b[i][j] - a[i][j]) / 2;
        });
      };
      Descent2.prototype.takeDescentStep = function(x3, d, stepSize) {
        for (var i = 0; i < this.n; ++i) {
          x3[i] = x3[i] - stepSize * d[i];
        }
      };
      Descent2.prototype.computeStress = function() {
        var stress = 0;
        for (var u = 0, nMinus1 = this.n - 1; u < nMinus1; ++u) {
          for (var v = u + 1, n = this.n; v < n; ++v) {
            var l = 0;
            for (var i = 0; i < this.k; ++i) {
              var dx = this.x[i][u] - this.x[i][v];
              l += dx * dx;
            }
            l = Math.sqrt(l);
            var d = this.D[u][v];
            if (!isFinite(d)) continue;
            var rl = d - l;
            var d2 = d * d;
            stress += rl * rl / d2;
          }
        }
        return stress;
      };
      Descent2.zeroDistance = 1e-10;
      return Descent2;
    }();
    exports.Descent = Descent;
    var PseudoRandom = function() {
      function PseudoRandom2(seed) {
        if (seed === void 0) {
          seed = 1;
        }
        this.seed = seed;
        this.a = 214013;
        this.c = 2531011;
        this.m = 2147483648;
        this.range = 32767;
      }
      PseudoRandom2.prototype.getNext = function() {
        this.seed = (this.seed * this.a + this.c) % this.m;
        return (this.seed >> 16) / this.range;
      };
      PseudoRandom2.prototype.getNextBetween = function(min, max) {
        return min + this.getNext() * (max - min);
      };
      return PseudoRandom2;
    }();
    exports.PseudoRandom = PseudoRandom;
  }
});

// node_modules/webcola/dist/src/vpsc.js
var require_vpsc = __commonJS({
  "node_modules/webcola/dist/src/vpsc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PositionStats = function() {
      function PositionStats2(scale2) {
        this.scale = scale2;
        this.AB = 0;
        this.AD = 0;
        this.A2 = 0;
      }
      PositionStats2.prototype.addVariable = function(v) {
        var ai = this.scale / v.scale;
        var bi = v.offset / v.scale;
        var wi = v.weight;
        this.AB += wi * ai * bi;
        this.AD += wi * ai * v.desiredPosition;
        this.A2 += wi * ai * ai;
      };
      PositionStats2.prototype.getPosn = function() {
        return (this.AD - this.AB) / this.A2;
      };
      return PositionStats2;
    }();
    exports.PositionStats = PositionStats;
    var Constraint = function() {
      function Constraint2(left, right, gap, equality) {
        if (equality === void 0) {
          equality = false;
        }
        this.left = left;
        this.right = right;
        this.gap = gap;
        this.equality = equality;
        this.active = false;
        this.unsatisfiable = false;
        this.left = left;
        this.right = right;
        this.gap = gap;
        this.equality = equality;
      }
      Constraint2.prototype.slack = function() {
        return this.unsatisfiable ? Number.MAX_VALUE : this.right.scale * this.right.position() - this.gap - this.left.scale * this.left.position();
      };
      return Constraint2;
    }();
    exports.Constraint = Constraint;
    var Variable = function() {
      function Variable2(desiredPosition, weight, scale2) {
        if (weight === void 0) {
          weight = 1;
        }
        if (scale2 === void 0) {
          scale2 = 1;
        }
        this.desiredPosition = desiredPosition;
        this.weight = weight;
        this.scale = scale2;
        this.offset = 0;
      }
      Variable2.prototype.dfdv = function() {
        return 2 * this.weight * (this.position() - this.desiredPosition);
      };
      Variable2.prototype.position = function() {
        return (this.block.ps.scale * this.block.posn + this.offset) / this.scale;
      };
      Variable2.prototype.visitNeighbours = function(prev, f) {
        var ff = function(c, next) {
          return c.active && prev !== next && f(c, next);
        };
        this.cOut.forEach(function(c) {
          return ff(c, c.right);
        });
        this.cIn.forEach(function(c) {
          return ff(c, c.left);
        });
      };
      return Variable2;
    }();
    exports.Variable = Variable;
    var Block = function() {
      function Block2(v) {
        this.vars = [];
        v.offset = 0;
        this.ps = new PositionStats(v.scale);
        this.addVariable(v);
      }
      Block2.prototype.addVariable = function(v) {
        v.block = this;
        this.vars.push(v);
        this.ps.addVariable(v);
        this.posn = this.ps.getPosn();
      };
      Block2.prototype.updateWeightedPosition = function() {
        this.ps.AB = this.ps.AD = this.ps.A2 = 0;
        for (var i = 0, n = this.vars.length; i < n; ++i) this.ps.addVariable(this.vars[i]);
        this.posn = this.ps.getPosn();
      };
      Block2.prototype.compute_lm = function(v, u, postAction) {
        var _this = this;
        var dfdv = v.dfdv();
        v.visitNeighbours(u, function(c, next) {
          var _dfdv = _this.compute_lm(next, v, postAction);
          if (next === c.right) {
            dfdv += _dfdv * c.left.scale;
            c.lm = _dfdv;
          } else {
            dfdv += _dfdv * c.right.scale;
            c.lm = -_dfdv;
          }
          postAction(c);
        });
        return dfdv / v.scale;
      };
      Block2.prototype.populateSplitBlock = function(v, prev) {
        var _this = this;
        v.visitNeighbours(prev, function(c, next) {
          next.offset = v.offset + (next === c.right ? c.gap : -c.gap);
          _this.addVariable(next);
          _this.populateSplitBlock(next, v);
        });
      };
      Block2.prototype.traverse = function(visit, acc, v, prev) {
        var _this = this;
        if (v === void 0) {
          v = this.vars[0];
        }
        if (prev === void 0) {
          prev = null;
        }
        v.visitNeighbours(prev, function(c, next) {
          acc.push(visit(c));
          _this.traverse(visit, acc, next, v);
        });
      };
      Block2.prototype.findMinLM = function() {
        var m = null;
        this.compute_lm(this.vars[0], null, function(c) {
          if (!c.equality && (m === null || c.lm < m.lm)) m = c;
        });
        return m;
      };
      Block2.prototype.findMinLMBetween = function(lv, rv) {
        this.compute_lm(lv, null, function() {
        });
        var m = null;
        this.findPath(lv, null, rv, function(c, next) {
          if (!c.equality && c.right === next && (m === null || c.lm < m.lm)) m = c;
        });
        return m;
      };
      Block2.prototype.findPath = function(v, prev, to, visit) {
        var _this = this;
        var endFound = false;
        v.visitNeighbours(prev, function(c, next) {
          if (!endFound && (next === to || _this.findPath(next, v, to, visit))) {
            endFound = true;
            visit(c, next);
          }
        });
        return endFound;
      };
      Block2.prototype.isActiveDirectedPathBetween = function(u, v) {
        if (u === v) return true;
        var i = u.cOut.length;
        while (i--) {
          var c = u.cOut[i];
          if (c.active && this.isActiveDirectedPathBetween(c.right, v)) return true;
        }
        return false;
      };
      Block2.split = function(c) {
        c.active = false;
        return [Block2.createSplitBlock(c.left), Block2.createSplitBlock(c.right)];
      };
      Block2.createSplitBlock = function(startVar) {
        var b = new Block2(startVar);
        b.populateSplitBlock(startVar, null);
        return b;
      };
      Block2.prototype.splitBetween = function(vl, vr) {
        var c = this.findMinLMBetween(vl, vr);
        if (c !== null) {
          var bs = Block2.split(c);
          return {
            constraint: c,
            lb: bs[0],
            rb: bs[1]
          };
        }
        return null;
      };
      Block2.prototype.mergeAcross = function(b, c, dist) {
        c.active = true;
        for (var i = 0, n = b.vars.length; i < n; ++i) {
          var v = b.vars[i];
          v.offset += dist;
          this.addVariable(v);
        }
        this.posn = this.ps.getPosn();
      };
      Block2.prototype.cost = function() {
        var sum = 0, i = this.vars.length;
        while (i--) {
          var v = this.vars[i], d = v.position() - v.desiredPosition;
          sum += d * d * v.weight;
        }
        return sum;
      };
      return Block2;
    }();
    exports.Block = Block;
    var Blocks = function() {
      function Blocks2(vs) {
        this.vs = vs;
        var n = vs.length;
        this.list = new Array(n);
        while (n--) {
          var b = new Block(vs[n]);
          this.list[n] = b;
          b.blockInd = n;
        }
      }
      Blocks2.prototype.cost = function() {
        var sum = 0, i = this.list.length;
        while (i--) sum += this.list[i].cost();
        return sum;
      };
      Blocks2.prototype.insert = function(b) {
        b.blockInd = this.list.length;
        this.list.push(b);
      };
      Blocks2.prototype.remove = function(b) {
        var last = this.list.length - 1;
        var swapBlock = this.list[last];
        this.list.length = last;
        if (b !== swapBlock) {
          this.list[b.blockInd] = swapBlock;
          swapBlock.blockInd = b.blockInd;
        }
      };
      Blocks2.prototype.merge = function(c) {
        var l = c.left.block, r = c.right.block;
        var dist = c.right.offset - c.left.offset - c.gap;
        if (l.vars.length < r.vars.length) {
          r.mergeAcross(l, c, dist);
          this.remove(l);
        } else {
          l.mergeAcross(r, c, -dist);
          this.remove(r);
        }
      };
      Blocks2.prototype.forEach = function(f) {
        this.list.forEach(f);
      };
      Blocks2.prototype.updateBlockPositions = function() {
        this.list.forEach(function(b) {
          return b.updateWeightedPosition();
        });
      };
      Blocks2.prototype.split = function(inactive) {
        var _this = this;
        this.updateBlockPositions();
        this.list.forEach(function(b) {
          var v = b.findMinLM();
          if (v !== null && v.lm < Solver.LAGRANGIAN_TOLERANCE) {
            b = v.left.block;
            Block.split(v).forEach(function(nb) {
              return _this.insert(nb);
            });
            _this.remove(b);
            inactive.push(v);
          }
        });
      };
      return Blocks2;
    }();
    exports.Blocks = Blocks;
    var Solver = function() {
      function Solver2(vs, cs) {
        this.vs = vs;
        this.cs = cs;
        this.vs = vs;
        vs.forEach(function(v) {
          v.cIn = [], v.cOut = [];
        });
        this.cs = cs;
        cs.forEach(function(c) {
          c.left.cOut.push(c);
          c.right.cIn.push(c);
        });
        this.inactive = cs.map(function(c) {
          c.active = false;
          return c;
        });
        this.bs = null;
      }
      Solver2.prototype.cost = function() {
        return this.bs.cost();
      };
      Solver2.prototype.setStartingPositions = function(ps) {
        this.inactive = this.cs.map(function(c) {
          c.active = false;
          return c;
        });
        this.bs = new Blocks(this.vs);
        this.bs.forEach(function(b, i) {
          return b.posn = ps[i];
        });
      };
      Solver2.prototype.setDesiredPositions = function(ps) {
        this.vs.forEach(function(v, i) {
          return v.desiredPosition = ps[i];
        });
      };
      Solver2.prototype.mostViolated = function() {
        var minSlack = Number.MAX_VALUE, v = null, l = this.inactive, n = l.length, deletePoint = n;
        for (var i = 0; i < n; ++i) {
          var c = l[i];
          if (c.unsatisfiable) continue;
          var slack = c.slack();
          if (c.equality || slack < minSlack) {
            minSlack = slack;
            v = c;
            deletePoint = i;
            if (c.equality) break;
          }
        }
        if (deletePoint !== n && (minSlack < Solver2.ZERO_UPPERBOUND && !v.active || v.equality)) {
          l[deletePoint] = l[n - 1];
          l.length = n - 1;
        }
        return v;
      };
      Solver2.prototype.satisfy = function() {
        if (this.bs == null) {
          this.bs = new Blocks(this.vs);
        }
        this.bs.split(this.inactive);
        var v = null;
        while ((v = this.mostViolated()) && (v.equality || v.slack() < Solver2.ZERO_UPPERBOUND && !v.active)) {
          var lb = v.left.block, rb = v.right.block;
          if (lb !== rb) {
            this.bs.merge(v);
          } else {
            if (lb.isActiveDirectedPathBetween(v.right, v.left)) {
              v.unsatisfiable = true;
              continue;
            }
            var split = lb.splitBetween(v.left, v.right);
            if (split !== null) {
              this.bs.insert(split.lb);
              this.bs.insert(split.rb);
              this.bs.remove(lb);
              this.inactive.push(split.constraint);
            } else {
              v.unsatisfiable = true;
              continue;
            }
            if (v.slack() >= 0) {
              this.inactive.push(v);
            } else {
              this.bs.merge(v);
            }
          }
        }
      };
      Solver2.prototype.solve = function() {
        this.satisfy();
        var lastcost = Number.MAX_VALUE, cost = this.bs.cost();
        while (Math.abs(lastcost - cost) > 1e-4) {
          this.satisfy();
          lastcost = cost;
          cost = this.bs.cost();
        }
        return cost;
      };
      Solver2.LAGRANGIAN_TOLERANCE = -1e-4;
      Solver2.ZERO_UPPERBOUND = -1e-10;
      return Solver2;
    }();
    exports.Solver = Solver;
    function removeOverlapInOneDimension(spans, lowerBound, upperBound) {
      var vs = spans.map(function(s) {
        return new Variable(s.desiredCenter);
      });
      var cs = [];
      var n = spans.length;
      for (var i = 0; i < n - 1; i++) {
        var left = spans[i], right = spans[i + 1];
        cs.push(new Constraint(vs[i], vs[i + 1], (left.size + right.size) / 2));
      }
      var leftMost = vs[0], rightMost = vs[n - 1], leftMostSize = spans[0].size / 2, rightMostSize = spans[n - 1].size / 2;
      var vLower = null, vUpper = null;
      if (lowerBound) {
        vLower = new Variable(lowerBound, leftMost.weight * 1e3);
        vs.push(vLower);
        cs.push(new Constraint(vLower, leftMost, leftMostSize));
      }
      if (upperBound) {
        vUpper = new Variable(upperBound, rightMost.weight * 1e3);
        vs.push(vUpper);
        cs.push(new Constraint(rightMost, vUpper, rightMostSize));
      }
      var solver = new Solver(vs, cs);
      solver.solve();
      return {
        newCenters: vs.slice(0, spans.length).map(function(v) {
          return v.position();
        }),
        lowerBound: vLower ? vLower.position() : leftMost.position() - leftMostSize,
        upperBound: vUpper ? vUpper.position() : rightMost.position() + rightMostSize
      };
    }
    exports.removeOverlapInOneDimension = removeOverlapInOneDimension;
  }
});

// node_modules/webcola/dist/src/rbtree.js
var require_rbtree = __commonJS({
  "node_modules/webcola/dist/src/rbtree.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TreeBase = function() {
      function TreeBase2() {
        this.findIter = function(data) {
          var res = this._root;
          var iter = this.iterator();
          while (res !== null) {
            var c = this._comparator(data, res.data);
            if (c === 0) {
              iter._cursor = res;
              return iter;
            } else {
              iter._ancestors.push(res);
              res = res.get_child(c > 0);
            }
          }
          return null;
        };
      }
      TreeBase2.prototype.clear = function() {
        this._root = null;
        this.size = 0;
      };
      ;
      TreeBase2.prototype.find = function(data) {
        var res = this._root;
        while (res !== null) {
          var c = this._comparator(data, res.data);
          if (c === 0) {
            return res.data;
          } else {
            res = res.get_child(c > 0);
          }
        }
        return null;
      };
      ;
      TreeBase2.prototype.lowerBound = function(data) {
        return this._bound(data, this._comparator);
      };
      ;
      TreeBase2.prototype.upperBound = function(data) {
        var cmp = this._comparator;
        function reverse_cmp(a, b) {
          return cmp(b, a);
        }
        return this._bound(data, reverse_cmp);
      };
      ;
      TreeBase2.prototype.min = function() {
        var res = this._root;
        if (res === null) {
          return null;
        }
        while (res.left !== null) {
          res = res.left;
        }
        return res.data;
      };
      ;
      TreeBase2.prototype.max = function() {
        var res = this._root;
        if (res === null) {
          return null;
        }
        while (res.right !== null) {
          res = res.right;
        }
        return res.data;
      };
      ;
      TreeBase2.prototype.iterator = function() {
        return new Iterator(this);
      };
      ;
      TreeBase2.prototype.each = function(cb) {
        var it = this.iterator(), data;
        while ((data = it.next()) !== null) {
          cb(data);
        }
      };
      ;
      TreeBase2.prototype.reach = function(cb) {
        var it = this.iterator(), data;
        while ((data = it.prev()) !== null) {
          cb(data);
        }
      };
      ;
      TreeBase2.prototype._bound = function(data, cmp) {
        var cur = this._root;
        var iter = this.iterator();
        while (cur !== null) {
          var c = this._comparator(data, cur.data);
          if (c === 0) {
            iter._cursor = cur;
            return iter;
          }
          iter._ancestors.push(cur);
          cur = cur.get_child(c > 0);
        }
        for (var i = iter._ancestors.length - 1; i >= 0; --i) {
          cur = iter._ancestors[i];
          if (cmp(data, cur.data) > 0) {
            iter._cursor = cur;
            iter._ancestors.length = i;
            return iter;
          }
        }
        iter._ancestors.length = 0;
        return iter;
      };
      ;
      return TreeBase2;
    }();
    exports.TreeBase = TreeBase;
    var Iterator = function() {
      function Iterator2(tree) {
        this._tree = tree;
        this._ancestors = [];
        this._cursor = null;
      }
      Iterator2.prototype.data = function() {
        return this._cursor !== null ? this._cursor.data : null;
      };
      ;
      Iterator2.prototype.next = function() {
        if (this._cursor === null) {
          var root2 = this._tree._root;
          if (root2 !== null) {
            this._minNode(root2);
          }
        } else {
          if (this._cursor.right === null) {
            var save;
            do {
              save = this._cursor;
              if (this._ancestors.length) {
                this._cursor = this._ancestors.pop();
              } else {
                this._cursor = null;
                break;
              }
            } while (this._cursor.right === save);
          } else {
            this._ancestors.push(this._cursor);
            this._minNode(this._cursor.right);
          }
        }
        return this._cursor !== null ? this._cursor.data : null;
      };
      ;
      Iterator2.prototype.prev = function() {
        if (this._cursor === null) {
          var root2 = this._tree._root;
          if (root2 !== null) {
            this._maxNode(root2);
          }
        } else {
          if (this._cursor.left === null) {
            var save;
            do {
              save = this._cursor;
              if (this._ancestors.length) {
                this._cursor = this._ancestors.pop();
              } else {
                this._cursor = null;
                break;
              }
            } while (this._cursor.left === save);
          } else {
            this._ancestors.push(this._cursor);
            this._maxNode(this._cursor.left);
          }
        }
        return this._cursor !== null ? this._cursor.data : null;
      };
      ;
      Iterator2.prototype._minNode = function(start) {
        while (start.left !== null) {
          this._ancestors.push(start);
          start = start.left;
        }
        this._cursor = start;
      };
      ;
      Iterator2.prototype._maxNode = function(start) {
        while (start.right !== null) {
          this._ancestors.push(start);
          start = start.right;
        }
        this._cursor = start;
      };
      ;
      return Iterator2;
    }();
    exports.Iterator = Iterator;
    var Node = function() {
      function Node2(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.red = true;
      }
      Node2.prototype.get_child = function(dir) {
        return dir ? this.right : this.left;
      };
      ;
      Node2.prototype.set_child = function(dir, val) {
        if (dir) {
          this.right = val;
        } else {
          this.left = val;
        }
      };
      ;
      return Node2;
    }();
    var RBTree = function(_super) {
      __extends(RBTree2, _super);
      function RBTree2(comparator) {
        var _this = _super.call(this) || this;
        _this._root = null;
        _this._comparator = comparator;
        _this.size = 0;
        return _this;
      }
      RBTree2.prototype.insert = function(data) {
        var ret = false;
        if (this._root === null) {
          this._root = new Node(data);
          ret = true;
          this.size++;
        } else {
          var head = new Node(void 0);
          var dir = false;
          var last = false;
          var gp = null;
          var ggp = head;
          var p = null;
          var node = this._root;
          ggp.right = this._root;
          while (true) {
            if (node === null) {
              node = new Node(data);
              p.set_child(dir, node);
              ret = true;
              this.size++;
            } else if (RBTree2.is_red(node.left) && RBTree2.is_red(node.right)) {
              node.red = true;
              node.left.red = false;
              node.right.red = false;
            }
            if (RBTree2.is_red(node) && RBTree2.is_red(p)) {
              var dir2 = ggp.right === gp;
              if (node === p.get_child(last)) {
                ggp.set_child(dir2, RBTree2.single_rotate(gp, !last));
              } else {
                ggp.set_child(dir2, RBTree2.double_rotate(gp, !last));
              }
            }
            var cmp = this._comparator(node.data, data);
            if (cmp === 0) {
              break;
            }
            last = dir;
            dir = cmp < 0;
            if (gp !== null) {
              ggp = gp;
            }
            gp = p;
            p = node;
            node = node.get_child(dir);
          }
          this._root = head.right;
        }
        this._root.red = false;
        return ret;
      };
      ;
      RBTree2.prototype.remove = function(data) {
        if (this._root === null) {
          return false;
        }
        var head = new Node(void 0);
        var node = head;
        node.right = this._root;
        var p = null;
        var gp = null;
        var found = null;
        var dir = true;
        while (node.get_child(dir) !== null) {
          var last = dir;
          gp = p;
          p = node;
          node = node.get_child(dir);
          var cmp = this._comparator(data, node.data);
          dir = cmp > 0;
          if (cmp === 0) {
            found = node;
          }
          if (!RBTree2.is_red(node) && !RBTree2.is_red(node.get_child(dir))) {
            if (RBTree2.is_red(node.get_child(!dir))) {
              var sr = RBTree2.single_rotate(node, dir);
              p.set_child(last, sr);
              p = sr;
            } else if (!RBTree2.is_red(node.get_child(!dir))) {
              var sibling = p.get_child(!last);
              if (sibling !== null) {
                if (!RBTree2.is_red(sibling.get_child(!last)) && !RBTree2.is_red(sibling.get_child(last))) {
                  p.red = false;
                  sibling.red = true;
                  node.red = true;
                } else {
                  var dir2 = gp.right === p;
                  if (RBTree2.is_red(sibling.get_child(last))) {
                    gp.set_child(dir2, RBTree2.double_rotate(p, last));
                  } else if (RBTree2.is_red(sibling.get_child(!last))) {
                    gp.set_child(dir2, RBTree2.single_rotate(p, last));
                  }
                  var gpc = gp.get_child(dir2);
                  gpc.red = true;
                  node.red = true;
                  gpc.left.red = false;
                  gpc.right.red = false;
                }
              }
            }
          }
        }
        if (found !== null) {
          found.data = node.data;
          p.set_child(p.right === node, node.get_child(node.left === null));
          this.size--;
        }
        this._root = head.right;
        if (this._root !== null) {
          this._root.red = false;
        }
        return found !== null;
      };
      ;
      RBTree2.is_red = function(node) {
        return node !== null && node.red;
      };
      RBTree2.single_rotate = function(root2, dir) {
        var save = root2.get_child(!dir);
        root2.set_child(!dir, save.get_child(dir));
        save.set_child(dir, root2);
        root2.red = true;
        save.red = false;
        return save;
      };
      RBTree2.double_rotate = function(root2, dir) {
        root2.set_child(!dir, RBTree2.single_rotate(root2.get_child(!dir), !dir));
        return RBTree2.single_rotate(root2, dir);
      };
      return RBTree2;
    }(TreeBase);
    exports.RBTree = RBTree;
  }
});

// node_modules/webcola/dist/src/rectangle.js
var require_rectangle = __commonJS({
  "node_modules/webcola/dist/src/rectangle.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var vpsc_1 = require_vpsc();
    var rbtree_1 = require_rbtree();
    function computeGroupBounds(g) {
      g.bounds = typeof g.leaves !== "undefined" ? g.leaves.reduce(function(r, c) {
        return c.bounds.union(r);
      }, Rectangle.empty()) : Rectangle.empty();
      if (typeof g.groups !== "undefined") g.bounds = g.groups.reduce(function(r, c) {
        return computeGroupBounds(c).union(r);
      }, g.bounds);
      g.bounds = g.bounds.inflate(g.padding);
      return g.bounds;
    }
    exports.computeGroupBounds = computeGroupBounds;
    var Rectangle = function() {
      function Rectangle2(x3, X, y3, Y) {
        this.x = x3;
        this.X = X;
        this.y = y3;
        this.Y = Y;
      }
      Rectangle2.empty = function() {
        return new Rectangle2(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
      };
      Rectangle2.prototype.cx = function() {
        return (this.x + this.X) / 2;
      };
      Rectangle2.prototype.cy = function() {
        return (this.y + this.Y) / 2;
      };
      Rectangle2.prototype.overlapX = function(r) {
        var ux = this.cx(), vx = r.cx();
        if (ux <= vx && r.x < this.X) return this.X - r.x;
        if (vx <= ux && this.x < r.X) return r.X - this.x;
        return 0;
      };
      Rectangle2.prototype.overlapY = function(r) {
        var uy = this.cy(), vy = r.cy();
        if (uy <= vy && r.y < this.Y) return this.Y - r.y;
        if (vy <= uy && this.y < r.Y) return r.Y - this.y;
        return 0;
      };
      Rectangle2.prototype.setXCentre = function(cx) {
        var dx = cx - this.cx();
        this.x += dx;
        this.X += dx;
      };
      Rectangle2.prototype.setYCentre = function(cy) {
        var dy = cy - this.cy();
        this.y += dy;
        this.Y += dy;
      };
      Rectangle2.prototype.width = function() {
        return this.X - this.x;
      };
      Rectangle2.prototype.height = function() {
        return this.Y - this.y;
      };
      Rectangle2.prototype.union = function(r) {
        return new Rectangle2(Math.min(this.x, r.x), Math.max(this.X, r.X), Math.min(this.y, r.y), Math.max(this.Y, r.Y));
      };
      Rectangle2.prototype.lineIntersections = function(x1, y1, x22, y22) {
        var sides = [[this.x, this.y, this.X, this.y], [this.X, this.y, this.X, this.Y], [this.X, this.Y, this.x, this.Y], [this.x, this.Y, this.x, this.y]];
        var intersections = [];
        for (var i = 0; i < 4; ++i) {
          var r = Rectangle2.lineIntersection(x1, y1, x22, y22, sides[i][0], sides[i][1], sides[i][2], sides[i][3]);
          if (r !== null) intersections.push({
            x: r.x,
            y: r.y
          });
        }
        return intersections;
      };
      Rectangle2.prototype.rayIntersection = function(x22, y22) {
        var ints = this.lineIntersections(this.cx(), this.cy(), x22, y22);
        return ints.length > 0 ? ints[0] : null;
      };
      Rectangle2.prototype.vertices = function() {
        return [{
          x: this.x,
          y: this.y
        }, {
          x: this.X,
          y: this.y
        }, {
          x: this.X,
          y: this.Y
        }, {
          x: this.x,
          y: this.Y
        }];
      };
      Rectangle2.lineIntersection = function(x1, y1, x22, y22, x3, y3, x4, y4) {
        var dx12 = x22 - x1, dx34 = x4 - x3, dy12 = y22 - y1, dy34 = y4 - y3, denominator = dy34 * dx12 - dx34 * dy12;
        if (denominator == 0) return null;
        var dx31 = x1 - x3, dy31 = y1 - y3, numa = dx34 * dy31 - dy34 * dx31, a = numa / denominator, numb = dx12 * dy31 - dy12 * dx31, b = numb / denominator;
        if (a >= 0 && a <= 1 && b >= 0 && b <= 1) {
          return {
            x: x1 + a * dx12,
            y: y1 + a * dy12
          };
        }
        return null;
      };
      Rectangle2.prototype.inflate = function(pad2) {
        return new Rectangle2(this.x - pad2, this.X + pad2, this.y - pad2, this.Y + pad2);
      };
      return Rectangle2;
    }();
    exports.Rectangle = Rectangle;
    function makeEdgeBetween(source, target, ah) {
      var si = source.rayIntersection(target.cx(), target.cy()) || {
        x: source.cx(),
        y: source.cy()
      }, ti = target.rayIntersection(source.cx(), source.cy()) || {
        x: target.cx(),
        y: target.cy()
      }, dx = ti.x - si.x, dy = ti.y - si.y, l = Math.sqrt(dx * dx + dy * dy), al = l - ah;
      return {
        sourceIntersection: si,
        targetIntersection: ti,
        arrowStart: {
          x: si.x + al * dx / l,
          y: si.y + al * dy / l
        }
      };
    }
    exports.makeEdgeBetween = makeEdgeBetween;
    function makeEdgeTo(s, target, ah) {
      var ti = target.rayIntersection(s.x, s.y);
      if (!ti) ti = {
        x: target.cx(),
        y: target.cy()
      };
      var dx = ti.x - s.x, dy = ti.y - s.y, l = Math.sqrt(dx * dx + dy * dy);
      return {
        x: ti.x - ah * dx / l,
        y: ti.y - ah * dy / l
      };
    }
    exports.makeEdgeTo = makeEdgeTo;
    var Node = /* @__PURE__ */ function() {
      function Node2(v, r, pos) {
        this.v = v;
        this.r = r;
        this.pos = pos;
        this.prev = makeRBTree();
        this.next = makeRBTree();
      }
      return Node2;
    }();
    var Event = /* @__PURE__ */ function() {
      function Event2(isOpen, v, pos) {
        this.isOpen = isOpen;
        this.v = v;
        this.pos = pos;
      }
      return Event2;
    }();
    function compareEvents(a, b) {
      if (a.pos > b.pos) {
        return 1;
      }
      if (a.pos < b.pos) {
        return -1;
      }
      if (a.isOpen) {
        return -1;
      }
      if (b.isOpen) {
        return 1;
      }
      return 0;
    }
    function makeRBTree() {
      return new rbtree_1.RBTree(function(a, b) {
        return a.pos - b.pos;
      });
    }
    var xRect = {
      getCentre: function(r) {
        return r.cx();
      },
      getOpen: function(r) {
        return r.y;
      },
      getClose: function(r) {
        return r.Y;
      },
      getSize: function(r) {
        return r.width();
      },
      makeRect: function(open, close, center, size) {
        return new Rectangle(center - size / 2, center + size / 2, open, close);
      },
      findNeighbours: findXNeighbours
    };
    var yRect = {
      getCentre: function(r) {
        return r.cy();
      },
      getOpen: function(r) {
        return r.x;
      },
      getClose: function(r) {
        return r.X;
      },
      getSize: function(r) {
        return r.height();
      },
      makeRect: function(open, close, center, size) {
        return new Rectangle(open, close, center - size / 2, center + size / 2);
      },
      findNeighbours: findYNeighbours
    };
    function generateGroupConstraints(root2, f, minSep, isContained) {
      if (isContained === void 0) {
        isContained = false;
      }
      var padding = root2.padding, gn = typeof root2.groups !== "undefined" ? root2.groups.length : 0, ln = typeof root2.leaves !== "undefined" ? root2.leaves.length : 0, childConstraints = !gn ? [] : root2.groups.reduce(function(ccs, g) {
        return ccs.concat(generateGroupConstraints(g, f, minSep, true));
      }, []), n = (isContained ? 2 : 0) + ln + gn, vs = new Array(n), rs = new Array(n), i = 0, add2 = function(r, v) {
        rs[i] = r;
        vs[i++] = v;
      };
      if (isContained) {
        var b = root2.bounds, c = f.getCentre(b), s = f.getSize(b) / 2, open = f.getOpen(b), close = f.getClose(b), min = c - s + padding / 2, max = c + s - padding / 2;
        root2.minVar.desiredPosition = min;
        add2(f.makeRect(open, close, min, padding), root2.minVar);
        root2.maxVar.desiredPosition = max;
        add2(f.makeRect(open, close, max, padding), root2.maxVar);
      }
      if (ln) root2.leaves.forEach(function(l) {
        return add2(l.bounds, l.variable);
      });
      if (gn) root2.groups.forEach(function(g) {
        var b2 = g.bounds;
        add2(f.makeRect(f.getOpen(b2), f.getClose(b2), f.getCentre(b2), f.getSize(b2)), g.minVar);
      });
      var cs = generateConstraints(rs, vs, f, minSep);
      if (gn) {
        vs.forEach(function(v) {
          v.cOut = [], v.cIn = [];
        });
        cs.forEach(function(c2) {
          c2.left.cOut.push(c2), c2.right.cIn.push(c2);
        });
        root2.groups.forEach(function(g) {
          var gapAdjustment = (g.padding - f.getSize(g.bounds)) / 2;
          g.minVar.cIn.forEach(function(c2) {
            return c2.gap += gapAdjustment;
          });
          g.minVar.cOut.forEach(function(c2) {
            c2.left = g.maxVar;
            c2.gap += gapAdjustment;
          });
        });
      }
      return childConstraints.concat(cs);
    }
    function generateConstraints(rs, vars, rect, minSep) {
      var i, n = rs.length;
      var N = 2 * n;
      console.assert(vars.length >= n);
      var events = new Array(N);
      for (i = 0; i < n; ++i) {
        var r = rs[i];
        var v = new Node(vars[i], r, rect.getCentre(r));
        events[i] = new Event(true, v, rect.getOpen(r));
        events[i + n] = new Event(false, v, rect.getClose(r));
      }
      events.sort(compareEvents);
      var cs = new Array();
      var scanline = makeRBTree();
      for (i = 0; i < N; ++i) {
        var e = events[i];
        var v = e.v;
        if (e.isOpen) {
          scanline.insert(v);
          rect.findNeighbours(v, scanline);
        } else {
          scanline.remove(v);
          var makeConstraint = function(l, r2) {
            var sep = (rect.getSize(l.r) + rect.getSize(r2.r)) / 2 + minSep;
            cs.push(new vpsc_1.Constraint(l.v, r2.v, sep));
          };
          var visitNeighbours = function(forward, reverse, mkcon) {
            var u, it = v[forward].iterator();
            while ((u = it[forward]()) !== null) {
              mkcon(u, v);
              u[reverse].remove(v);
            }
          };
          visitNeighbours("prev", "next", function(u, v2) {
            return makeConstraint(u, v2);
          });
          visitNeighbours("next", "prev", function(u, v2) {
            return makeConstraint(v2, u);
          });
        }
      }
      console.assert(scanline.size === 0);
      return cs;
    }
    function findXNeighbours(v, scanline) {
      var f = function(forward, reverse) {
        var it = scanline.findIter(v);
        var u;
        while ((u = it[forward]()) !== null) {
          var uovervX = u.r.overlapX(v.r);
          if (uovervX <= 0 || uovervX <= u.r.overlapY(v.r)) {
            v[forward].insert(u);
            u[reverse].insert(v);
          }
          if (uovervX <= 0) {
            break;
          }
        }
      };
      f("next", "prev");
      f("prev", "next");
    }
    function findYNeighbours(v, scanline) {
      var f = function(forward, reverse) {
        var u = scanline.findIter(v)[forward]();
        if (u !== null && u.r.overlapX(v.r) > 0) {
          v[forward].insert(u);
          u[reverse].insert(v);
        }
      };
      f("next", "prev");
      f("prev", "next");
    }
    function generateXConstraints(rs, vars) {
      return generateConstraints(rs, vars, xRect, 1e-6);
    }
    exports.generateXConstraints = generateXConstraints;
    function generateYConstraints(rs, vars) {
      return generateConstraints(rs, vars, yRect, 1e-6);
    }
    exports.generateYConstraints = generateYConstraints;
    function generateXGroupConstraints(root2) {
      return generateGroupConstraints(root2, xRect, 1e-6);
    }
    exports.generateXGroupConstraints = generateXGroupConstraints;
    function generateYGroupConstraints(root2) {
      return generateGroupConstraints(root2, yRect, 1e-6);
    }
    exports.generateYGroupConstraints = generateYGroupConstraints;
    function removeOverlaps(rs) {
      var vs = rs.map(function(r) {
        return new vpsc_1.Variable(r.cx());
      });
      var cs = generateXConstraints(rs, vs);
      var solver = new vpsc_1.Solver(vs, cs);
      solver.solve();
      vs.forEach(function(v, i) {
        return rs[i].setXCentre(v.position());
      });
      vs = rs.map(function(r) {
        return new vpsc_1.Variable(r.cy());
      });
      cs = generateYConstraints(rs, vs);
      solver = new vpsc_1.Solver(vs, cs);
      solver.solve();
      vs.forEach(function(v, i) {
        return rs[i].setYCentre(v.position());
      });
    }
    exports.removeOverlaps = removeOverlaps;
    var IndexedVariable = function(_super) {
      __extends(IndexedVariable2, _super);
      function IndexedVariable2(index2, w) {
        var _this = _super.call(this, 0, w) || this;
        _this.index = index2;
        return _this;
      }
      return IndexedVariable2;
    }(vpsc_1.Variable);
    exports.IndexedVariable = IndexedVariable;
    var Projection = function() {
      function Projection2(nodes, groups, rootGroup, constraints, avoidOverlaps) {
        var _this = this;
        if (rootGroup === void 0) {
          rootGroup = null;
        }
        if (constraints === void 0) {
          constraints = null;
        }
        if (avoidOverlaps === void 0) {
          avoidOverlaps = false;
        }
        this.nodes = nodes;
        this.groups = groups;
        this.rootGroup = rootGroup;
        this.avoidOverlaps = avoidOverlaps;
        this.variables = nodes.map(function(v, i2) {
          return v.variable = new IndexedVariable(i2, 1);
        });
        if (constraints) this.createConstraints(constraints);
        if (avoidOverlaps && rootGroup && typeof rootGroup.groups !== "undefined") {
          nodes.forEach(function(v) {
            if (!v.width || !v.height) {
              v.bounds = new Rectangle(v.x, v.x, v.y, v.y);
              return;
            }
            var w2 = v.width / 2, h2 = v.height / 2;
            v.bounds = new Rectangle(v.x - w2, v.x + w2, v.y - h2, v.y + h2);
          });
          computeGroupBounds(rootGroup);
          var i = nodes.length;
          groups.forEach(function(g) {
            _this.variables[i] = g.minVar = new IndexedVariable(i++, typeof g.stiffness !== "undefined" ? g.stiffness : 0.01);
            _this.variables[i] = g.maxVar = new IndexedVariable(i++, typeof g.stiffness !== "undefined" ? g.stiffness : 0.01);
          });
        }
      }
      Projection2.prototype.createSeparation = function(c) {
        return new vpsc_1.Constraint(this.nodes[c.left].variable, this.nodes[c.right].variable, c.gap, typeof c.equality !== "undefined" ? c.equality : false);
      };
      Projection2.prototype.makeFeasible = function(c) {
        var _this = this;
        if (!this.avoidOverlaps) return;
        var axis = "x", dim = "width";
        if (c.axis === "x") axis = "y", dim = "height";
        var vs = c.offsets.map(function(o) {
          return _this.nodes[o.node];
        }).sort(function(a, b) {
          return a[axis] - b[axis];
        });
        var p = null;
        vs.forEach(function(v) {
          if (p) {
            var nextPos = p[axis] + p[dim];
            if (nextPos > v[axis]) {
              v[axis] = nextPos;
            }
          }
          p = v;
        });
      };
      Projection2.prototype.createAlignment = function(c) {
        var _this = this;
        var u = this.nodes[c.offsets[0].node].variable;
        this.makeFeasible(c);
        var cs = c.axis === "x" ? this.xConstraints : this.yConstraints;
        c.offsets.slice(1).forEach(function(o) {
          var v = _this.nodes[o.node].variable;
          cs.push(new vpsc_1.Constraint(u, v, o.offset, true));
        });
      };
      Projection2.prototype.createConstraints = function(constraints) {
        var _this = this;
        var isSep = function(c) {
          return typeof c.type === "undefined" || c.type === "separation";
        };
        this.xConstraints = constraints.filter(function(c) {
          return c.axis === "x" && isSep(c);
        }).map(function(c) {
          return _this.createSeparation(c);
        });
        this.yConstraints = constraints.filter(function(c) {
          return c.axis === "y" && isSep(c);
        }).map(function(c) {
          return _this.createSeparation(c);
        });
        constraints.filter(function(c) {
          return c.type === "alignment";
        }).forEach(function(c) {
          return _this.createAlignment(c);
        });
      };
      Projection2.prototype.setupVariablesAndBounds = function(x0, y0, desired, getDesired) {
        this.nodes.forEach(function(v, i) {
          if (v.fixed) {
            v.variable.weight = v.fixedWeight ? v.fixedWeight : 1e3;
            desired[i] = getDesired(v);
          } else {
            v.variable.weight = 1;
          }
          var w = (v.width || 0) / 2, h = (v.height || 0) / 2;
          var ix = x0[i], iy = y0[i];
          v.bounds = new Rectangle(ix - w, ix + w, iy - h, iy + h);
        });
      };
      Projection2.prototype.xProject = function(x0, y0, x3) {
        if (!this.rootGroup && !(this.avoidOverlaps || this.xConstraints)) return;
        this.project(x0, y0, x0, x3, function(v) {
          return v.px;
        }, this.xConstraints, generateXGroupConstraints, function(v) {
          return v.bounds.setXCentre(x3[v.variable.index] = v.variable.position());
        }, function(g) {
          var xmin = x3[g.minVar.index] = g.minVar.position();
          var xmax = x3[g.maxVar.index] = g.maxVar.position();
          var p2 = g.padding / 2;
          g.bounds.x = xmin - p2;
          g.bounds.X = xmax + p2;
        });
      };
      Projection2.prototype.yProject = function(x0, y0, y3) {
        if (!this.rootGroup && !this.yConstraints) return;
        this.project(x0, y0, y0, y3, function(v) {
          return v.py;
        }, this.yConstraints, generateYGroupConstraints, function(v) {
          return v.bounds.setYCentre(y3[v.variable.index] = v.variable.position());
        }, function(g) {
          var ymin = y3[g.minVar.index] = g.minVar.position();
          var ymax = y3[g.maxVar.index] = g.maxVar.position();
          var p2 = g.padding / 2;
          g.bounds.y = ymin - p2;
          ;
          g.bounds.Y = ymax + p2;
        });
      };
      Projection2.prototype.projectFunctions = function() {
        var _this = this;
        return [function(x0, y0, x3) {
          return _this.xProject(x0, y0, x3);
        }, function(x0, y0, y3) {
          return _this.yProject(x0, y0, y3);
        }];
      };
      Projection2.prototype.project = function(x0, y0, start, desired, getDesired, cs, generateConstraints2, updateNodeBounds, updateGroupBounds) {
        this.setupVariablesAndBounds(x0, y0, desired, getDesired);
        if (this.rootGroup && this.avoidOverlaps) {
          computeGroupBounds(this.rootGroup);
          cs = cs.concat(generateConstraints2(this.rootGroup));
        }
        this.solve(this.variables, cs, start, desired);
        this.nodes.forEach(updateNodeBounds);
        if (this.rootGroup && this.avoidOverlaps) {
          this.groups.forEach(updateGroupBounds);
          computeGroupBounds(this.rootGroup);
        }
      };
      Projection2.prototype.solve = function(vs, cs, starting, desired) {
        var solver = new vpsc_1.Solver(vs, cs);
        solver.setStartingPositions(starting);
        solver.setDesiredPositions(desired);
        solver.solve();
      };
      return Projection2;
    }();
    exports.Projection = Projection;
  }
});

// node_modules/webcola/dist/src/pqueue.js
var require_pqueue = __commonJS({
  "node_modules/webcola/dist/src/pqueue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PairingHeap = function() {
      function PairingHeap2(elem) {
        this.elem = elem;
        this.subheaps = [];
      }
      PairingHeap2.prototype.toString = function(selector) {
        var str = "", needComma = false;
        for (var i = 0; i < this.subheaps.length; ++i) {
          var subheap = this.subheaps[i];
          if (!subheap.elem) {
            needComma = false;
            continue;
          }
          if (needComma) {
            str = str + ",";
          }
          str = str + subheap.toString(selector);
          needComma = true;
        }
        if (str !== "") {
          str = "(" + str + ")";
        }
        return (this.elem ? selector(this.elem) : "") + str;
      };
      PairingHeap2.prototype.forEach = function(f) {
        if (!this.empty()) {
          f(this.elem, this);
          this.subheaps.forEach(function(s) {
            return s.forEach(f);
          });
        }
      };
      PairingHeap2.prototype.count = function() {
        return this.empty() ? 0 : 1 + this.subheaps.reduce(function(n, h) {
          return n + h.count();
        }, 0);
      };
      PairingHeap2.prototype.min = function() {
        return this.elem;
      };
      PairingHeap2.prototype.empty = function() {
        return this.elem == null;
      };
      PairingHeap2.prototype.contains = function(h) {
        if (this === h) return true;
        for (var i = 0; i < this.subheaps.length; i++) {
          if (this.subheaps[i].contains(h)) return true;
        }
        return false;
      };
      PairingHeap2.prototype.isHeap = function(lessThan) {
        var _this = this;
        return this.subheaps.every(function(h) {
          return lessThan(_this.elem, h.elem) && h.isHeap(lessThan);
        });
      };
      PairingHeap2.prototype.insert = function(obj, lessThan) {
        return this.merge(new PairingHeap2(obj), lessThan);
      };
      PairingHeap2.prototype.merge = function(heap2, lessThan) {
        if (this.empty()) return heap2;
        else if (heap2.empty()) return this;
        else if (lessThan(this.elem, heap2.elem)) {
          this.subheaps.push(heap2);
          return this;
        } else {
          heap2.subheaps.push(this);
          return heap2;
        }
      };
      PairingHeap2.prototype.removeMin = function(lessThan) {
        if (this.empty()) return null;
        else return this.mergePairs(lessThan);
      };
      PairingHeap2.prototype.mergePairs = function(lessThan) {
        if (this.subheaps.length == 0) return new PairingHeap2(null);
        else if (this.subheaps.length == 1) {
          return this.subheaps[0];
        } else {
          var firstPair = this.subheaps.pop().merge(this.subheaps.pop(), lessThan);
          var remaining = this.mergePairs(lessThan);
          return firstPair.merge(remaining, lessThan);
        }
      };
      PairingHeap2.prototype.decreaseKey = function(subheap, newValue, setHeapNode, lessThan) {
        var newHeap = subheap.removeMin(lessThan);
        subheap.elem = newHeap.elem;
        subheap.subheaps = newHeap.subheaps;
        if (setHeapNode !== null && newHeap.elem !== null) {
          setHeapNode(subheap.elem, subheap);
        }
        var pairingNode = new PairingHeap2(newValue);
        if (setHeapNode !== null) {
          setHeapNode(newValue, pairingNode);
        }
        return this.merge(pairingNode, lessThan);
      };
      return PairingHeap2;
    }();
    exports.PairingHeap = PairingHeap;
    var PriorityQueue = function() {
      function PriorityQueue2(lessThan) {
        this.lessThan = lessThan;
      }
      PriorityQueue2.prototype.top = function() {
        if (this.empty()) {
          return null;
        }
        return this.root.elem;
      };
      PriorityQueue2.prototype.push = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var pairingNode;
        for (var i = 0, arg; arg = args[i]; ++i) {
          pairingNode = new PairingHeap(arg);
          this.root = this.empty() ? pairingNode : this.root.merge(pairingNode, this.lessThan);
        }
        return pairingNode;
      };
      PriorityQueue2.prototype.empty = function() {
        return !this.root || !this.root.elem;
      };
      PriorityQueue2.prototype.isHeap = function() {
        return this.root.isHeap(this.lessThan);
      };
      PriorityQueue2.prototype.forEach = function(f) {
        this.root.forEach(f);
      };
      PriorityQueue2.prototype.pop = function() {
        if (this.empty()) {
          return null;
        }
        var obj = this.root.min();
        this.root = this.root.removeMin(this.lessThan);
        return obj;
      };
      PriorityQueue2.prototype.reduceKey = function(heapNode, newKey, setHeapNode) {
        if (setHeapNode === void 0) {
          setHeapNode = null;
        }
        this.root = this.root.decreaseKey(heapNode, newKey, setHeapNode, this.lessThan);
      };
      PriorityQueue2.prototype.toString = function(selector) {
        return this.root.toString(selector);
      };
      PriorityQueue2.prototype.count = function() {
        return this.root.count();
      };
      return PriorityQueue2;
    }();
    exports.PriorityQueue = PriorityQueue;
  }
});

// node_modules/webcola/dist/src/shortestpaths.js
var require_shortestpaths = __commonJS({
  "node_modules/webcola/dist/src/shortestpaths.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var pqueue_1 = require_pqueue();
    var Neighbour = /* @__PURE__ */ function() {
      function Neighbour2(id2, distance) {
        this.id = id2;
        this.distance = distance;
      }
      return Neighbour2;
    }();
    var Node = /* @__PURE__ */ function() {
      function Node2(id2) {
        this.id = id2;
        this.neighbours = [];
      }
      return Node2;
    }();
    var QueueEntry = /* @__PURE__ */ function() {
      function QueueEntry2(node, prev, d) {
        this.node = node;
        this.prev = prev;
        this.d = d;
      }
      return QueueEntry2;
    }();
    var Calculator = function() {
      function Calculator2(n, es, getSourceIndex, getTargetIndex, getLength) {
        this.n = n;
        this.es = es;
        this.neighbours = new Array(this.n);
        var i = this.n;
        while (i--) this.neighbours[i] = new Node(i);
        i = this.es.length;
        while (i--) {
          var e = this.es[i];
          var u = getSourceIndex(e), v = getTargetIndex(e);
          var d = getLength(e);
          this.neighbours[u].neighbours.push(new Neighbour(v, d));
          this.neighbours[v].neighbours.push(new Neighbour(u, d));
        }
      }
      Calculator2.prototype.DistanceMatrix = function() {
        var D = new Array(this.n);
        for (var i = 0; i < this.n; ++i) {
          D[i] = this.dijkstraNeighbours(i);
        }
        return D;
      };
      Calculator2.prototype.DistancesFromNode = function(start) {
        return this.dijkstraNeighbours(start);
      };
      Calculator2.prototype.PathFromNodeToNode = function(start, end) {
        return this.dijkstraNeighbours(start, end);
      };
      Calculator2.prototype.PathFromNodeToNodeWithPrevCost = function(start, end, prevCost) {
        var q = new pqueue_1.PriorityQueue(function(a, b) {
          return a.d <= b.d;
        }), u = this.neighbours[start], qu = new QueueEntry(u, null, 0), visitedFrom = {};
        q.push(qu);
        while (!q.empty()) {
          qu = q.pop();
          u = qu.node;
          if (u.id === end) {
            break;
          }
          var i = u.neighbours.length;
          while (i--) {
            var neighbour = u.neighbours[i], v = this.neighbours[neighbour.id];
            if (qu.prev && v.id === qu.prev.node.id) continue;
            var viduid = v.id + "," + u.id;
            if (viduid in visitedFrom && visitedFrom[viduid] <= qu.d) continue;
            var cc = qu.prev ? prevCost(qu.prev.node.id, u.id, v.id) : 0, t = qu.d + neighbour.distance + cc;
            visitedFrom[viduid] = t;
            q.push(new QueueEntry(v, qu, t));
          }
        }
        var path = [];
        while (qu.prev) {
          qu = qu.prev;
          path.push(qu.node.id);
        }
        return path;
      };
      Calculator2.prototype.dijkstraNeighbours = function(start, dest) {
        if (dest === void 0) {
          dest = -1;
        }
        var q = new pqueue_1.PriorityQueue(function(a, b) {
          return a.d <= b.d;
        }), i = this.neighbours.length, d = new Array(i);
        while (i--) {
          var node = this.neighbours[i];
          node.d = i === start ? 0 : Number.POSITIVE_INFINITY;
          node.q = q.push(node);
        }
        while (!q.empty()) {
          var u = q.pop();
          d[u.id] = u.d;
          if (u.id === dest) {
            var path = [];
            var v = u;
            while (typeof v.prev !== "undefined") {
              path.push(v.prev.id);
              v = v.prev;
            }
            return path;
          }
          i = u.neighbours.length;
          while (i--) {
            var neighbour = u.neighbours[i];
            var v = this.neighbours[neighbour.id];
            var t = u.d + neighbour.distance;
            if (u.d !== Number.MAX_VALUE && v.d > t) {
              v.d = t;
              v.prev = u;
              q.reduceKey(v.q, v, function(e, q2) {
                return e.q = q2;
              });
            }
          }
        }
        return d;
      };
      return Calculator2;
    }();
    exports.Calculator = Calculator;
  }
});

// node_modules/webcola/dist/src/geom.js
var require_geom = __commonJS({
  "node_modules/webcola/dist/src/geom.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var rectangle_1 = require_rectangle();
    var Point = /* @__PURE__ */ function() {
      function Point2() {
      }
      return Point2;
    }();
    exports.Point = Point;
    var LineSegment = /* @__PURE__ */ function() {
      function LineSegment2(x1, y1, x22, y22) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x22;
        this.y2 = y22;
      }
      return LineSegment2;
    }();
    exports.LineSegment = LineSegment;
    var PolyPoint = function(_super) {
      __extends(PolyPoint2, _super);
      function PolyPoint2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return PolyPoint2;
    }(Point);
    exports.PolyPoint = PolyPoint;
    function isLeft(P0, P1, P2) {
      return (P1.x - P0.x) * (P2.y - P0.y) - (P2.x - P0.x) * (P1.y - P0.y);
    }
    exports.isLeft = isLeft;
    function above(p, vi, vj) {
      return isLeft(p, vi, vj) > 0;
    }
    function below(p, vi, vj) {
      return isLeft(p, vi, vj) < 0;
    }
    function ConvexHull(S) {
      var P = S.slice(0).sort(function(a, b) {
        return a.x !== b.x ? b.x - a.x : b.y - a.y;
      });
      var n = S.length, i;
      var minmin = 0;
      var xmin = P[0].x;
      for (i = 1; i < n; ++i) {
        if (P[i].x !== xmin) break;
      }
      var minmax = i - 1;
      var H = [];
      H.push(P[minmin]);
      if (minmax === n - 1) {
        if (P[minmax].y !== P[minmin].y) H.push(P[minmax]);
      } else {
        var maxmin, maxmax = n - 1;
        var xmax = P[n - 1].x;
        for (i = n - 2; i >= 0; i--) if (P[i].x !== xmax) break;
        maxmin = i + 1;
        i = minmax;
        while (++i <= maxmin) {
          if (isLeft(P[minmin], P[maxmin], P[i]) >= 0 && i < maxmin) continue;
          while (H.length > 1) {
            if (isLeft(H[H.length - 2], H[H.length - 1], P[i]) > 0) break;
            else H.length -= 1;
          }
          if (i != minmin) H.push(P[i]);
        }
        if (maxmax != maxmin) H.push(P[maxmax]);
        var bot = H.length;
        i = maxmin;
        while (--i >= minmax) {
          if (isLeft(P[maxmax], P[minmax], P[i]) >= 0 && i > minmax) continue;
          while (H.length > bot) {
            if (isLeft(H[H.length - 2], H[H.length - 1], P[i]) > 0) break;
            else H.length -= 1;
          }
          if (i != minmin) H.push(P[i]);
        }
      }
      return H;
    }
    exports.ConvexHull = ConvexHull;
    function clockwiseRadialSweep(p, P, f) {
      P.slice(0).sort(function(a, b) {
        return Math.atan2(a.y - p.y, a.x - p.x) - Math.atan2(b.y - p.y, b.x - p.x);
      }).forEach(f);
    }
    exports.clockwiseRadialSweep = clockwiseRadialSweep;
    function tangent_PointPolyC(P, V) {
      var Vclosed = V.slice(0);
      Vclosed.push(V[0]);
      return {
        rtan: Rtangent_PointPolyC(P, Vclosed),
        ltan: Ltangent_PointPolyC(P, Vclosed)
      };
    }
    function Rtangent_PointPolyC(P, V) {
      var n = V.length - 1;
      var a, b, c;
      var upA, dnC;
      if (below(P, V[1], V[0]) && !above(P, V[n - 1], V[0])) return 0;
      for (a = 0, b = n; ; ) {
        if (b - a === 1) if (above(P, V[a], V[b])) return a;
        else return b;
        c = Math.floor((a + b) / 2);
        dnC = below(P, V[c + 1], V[c]);
        if (dnC && !above(P, V[c - 1], V[c])) return c;
        upA = above(P, V[a + 1], V[a]);
        if (upA) {
          if (dnC) b = c;
          else {
            if (above(P, V[a], V[c])) b = c;
            else a = c;
          }
        } else {
          if (!dnC) a = c;
          else {
            if (below(P, V[a], V[c])) b = c;
            else a = c;
          }
        }
      }
    }
    function Ltangent_PointPolyC(P, V) {
      var n = V.length - 1;
      var a, b, c;
      var dnA, dnC;
      if (above(P, V[n - 1], V[0]) && !below(P, V[1], V[0])) return 0;
      for (a = 0, b = n; ; ) {
        if (b - a === 1) if (below(P, V[a], V[b])) return a;
        else return b;
        c = Math.floor((a + b) / 2);
        dnC = below(P, V[c + 1], V[c]);
        if (above(P, V[c - 1], V[c]) && !dnC) return c;
        dnA = below(P, V[a + 1], V[a]);
        if (dnA) {
          if (!dnC) b = c;
          else {
            if (below(P, V[a], V[c])) b = c;
            else a = c;
          }
        } else {
          if (dnC) a = c;
          else {
            if (above(P, V[a], V[c])) b = c;
            else a = c;
          }
        }
      }
    }
    function tangent_PolyPolyC(V, W, t1, t2, cmp1, cmp2) {
      var ix1, ix2;
      ix1 = t1(W[0], V);
      ix2 = t2(V[ix1], W);
      var done = false;
      while (!done) {
        done = true;
        while (true) {
          if (ix1 === V.length - 1) ix1 = 0;
          if (cmp1(W[ix2], V[ix1], V[ix1 + 1])) break;
          ++ix1;
        }
        while (true) {
          if (ix2 === 0) ix2 = W.length - 1;
          if (cmp2(V[ix1], W[ix2], W[ix2 - 1])) break;
          --ix2;
          done = false;
        }
      }
      return {
        t1: ix1,
        t2: ix2
      };
    }
    exports.tangent_PolyPolyC = tangent_PolyPolyC;
    function LRtangent_PolyPolyC(V, W) {
      var rl = RLtangent_PolyPolyC(W, V);
      return {
        t1: rl.t2,
        t2: rl.t1
      };
    }
    exports.LRtangent_PolyPolyC = LRtangent_PolyPolyC;
    function RLtangent_PolyPolyC(V, W) {
      return tangent_PolyPolyC(V, W, Rtangent_PointPolyC, Ltangent_PointPolyC, above, below);
    }
    exports.RLtangent_PolyPolyC = RLtangent_PolyPolyC;
    function LLtangent_PolyPolyC(V, W) {
      return tangent_PolyPolyC(V, W, Ltangent_PointPolyC, Ltangent_PointPolyC, below, below);
    }
    exports.LLtangent_PolyPolyC = LLtangent_PolyPolyC;
    function RRtangent_PolyPolyC(V, W) {
      return tangent_PolyPolyC(V, W, Rtangent_PointPolyC, Rtangent_PointPolyC, above, above);
    }
    exports.RRtangent_PolyPolyC = RRtangent_PolyPolyC;
    var BiTangent = /* @__PURE__ */ function() {
      function BiTangent2(t1, t2) {
        this.t1 = t1;
        this.t2 = t2;
      }
      return BiTangent2;
    }();
    exports.BiTangent = BiTangent;
    var BiTangents = /* @__PURE__ */ function() {
      function BiTangents2() {
      }
      return BiTangents2;
    }();
    exports.BiTangents = BiTangents;
    var TVGPoint = function(_super) {
      __extends(TVGPoint2, _super);
      function TVGPoint2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return TVGPoint2;
    }(Point);
    exports.TVGPoint = TVGPoint;
    var VisibilityVertex = /* @__PURE__ */ function() {
      function VisibilityVertex2(id2, polyid, polyvertid, p) {
        this.id = id2;
        this.polyid = polyid;
        this.polyvertid = polyvertid;
        this.p = p;
        p.vv = this;
      }
      return VisibilityVertex2;
    }();
    exports.VisibilityVertex = VisibilityVertex;
    var VisibilityEdge = function() {
      function VisibilityEdge2(source, target) {
        this.source = source;
        this.target = target;
      }
      VisibilityEdge2.prototype.length = function() {
        var dx = this.source.p.x - this.target.p.x;
        var dy = this.source.p.y - this.target.p.y;
        return Math.sqrt(dx * dx + dy * dy);
      };
      return VisibilityEdge2;
    }();
    exports.VisibilityEdge = VisibilityEdge;
    var TangentVisibilityGraph = function() {
      function TangentVisibilityGraph2(P, g0) {
        this.P = P;
        this.V = [];
        this.E = [];
        if (!g0) {
          var n = P.length;
          for (var i = 0; i < n; i++) {
            var p = P[i];
            for (var j = 0; j < p.length; ++j) {
              var pj = p[j], vv = new VisibilityVertex(this.V.length, i, j, pj);
              this.V.push(vv);
              if (j > 0) this.E.push(new VisibilityEdge(p[j - 1].vv, vv));
            }
            if (p.length > 1) this.E.push(new VisibilityEdge(p[0].vv, p[p.length - 1].vv));
          }
          for (var i = 0; i < n - 1; i++) {
            var Pi = P[i];
            for (var j = i + 1; j < n; j++) {
              var Pj = P[j], t = tangents(Pi, Pj);
              for (var q in t) {
                var c = t[q], source = Pi[c.t1], target = Pj[c.t2];
                this.addEdgeIfVisible(source, target, i, j);
              }
            }
          }
        } else {
          this.V = g0.V.slice(0);
          this.E = g0.E.slice(0);
        }
      }
      TangentVisibilityGraph2.prototype.addEdgeIfVisible = function(u, v, i1, i2) {
        if (!this.intersectsPolys(new LineSegment(u.x, u.y, v.x, v.y), i1, i2)) {
          this.E.push(new VisibilityEdge(u.vv, v.vv));
        }
      };
      TangentVisibilityGraph2.prototype.addPoint = function(p, i1) {
        var n = this.P.length;
        this.V.push(new VisibilityVertex(this.V.length, n, 0, p));
        for (var i = 0; i < n; ++i) {
          if (i === i1) continue;
          var poly = this.P[i], t = tangent_PointPolyC(p, poly);
          this.addEdgeIfVisible(p, poly[t.ltan], i1, i);
          this.addEdgeIfVisible(p, poly[t.rtan], i1, i);
        }
        return p.vv;
      };
      TangentVisibilityGraph2.prototype.intersectsPolys = function(l, i1, i2) {
        for (var i = 0, n = this.P.length; i < n; ++i) {
          if (i != i1 && i != i2 && intersects(l, this.P[i]).length > 0) {
            return true;
          }
        }
        return false;
      };
      return TangentVisibilityGraph2;
    }();
    exports.TangentVisibilityGraph = TangentVisibilityGraph;
    function intersects(l, P) {
      var ints = [];
      for (var i = 1, n = P.length; i < n; ++i) {
        var int = rectangle_1.Rectangle.lineIntersection(l.x1, l.y1, l.x2, l.y2, P[i - 1].x, P[i - 1].y, P[i].x, P[i].y);
        if (int) ints.push(int);
      }
      return ints;
    }
    function tangents(V, W) {
      var m = V.length - 1, n = W.length - 1;
      var bt = new BiTangents();
      for (var i = 0; i < m; ++i) {
        for (var j = 0; j < n; ++j) {
          var v1 = V[i == 0 ? m - 1 : i - 1];
          var v2 = V[i];
          var v3 = V[i + 1];
          var w1 = W[j == 0 ? n - 1 : j - 1];
          var w2 = W[j];
          var w3 = W[j + 1];
          var v1v2w2 = isLeft(v1, v2, w2);
          var v2w1w2 = isLeft(v2, w1, w2);
          var v2w2w3 = isLeft(v2, w2, w3);
          var w1w2v2 = isLeft(w1, w2, v2);
          var w2v1v2 = isLeft(w2, v1, v2);
          var w2v2v3 = isLeft(w2, v2, v3);
          if (v1v2w2 >= 0 && v2w1w2 >= 0 && v2w2w3 < 0 && w1w2v2 >= 0 && w2v1v2 >= 0 && w2v2v3 < 0) {
            bt.ll = new BiTangent(i, j);
          } else if (v1v2w2 <= 0 && v2w1w2 <= 0 && v2w2w3 > 0 && w1w2v2 <= 0 && w2v1v2 <= 0 && w2v2v3 > 0) {
            bt.rr = new BiTangent(i, j);
          } else if (v1v2w2 <= 0 && v2w1w2 > 0 && v2w2w3 <= 0 && w1w2v2 >= 0 && w2v1v2 < 0 && w2v2v3 >= 0) {
            bt.rl = new BiTangent(i, j);
          } else if (v1v2w2 >= 0 && v2w1w2 < 0 && v2w2w3 >= 0 && w1w2v2 <= 0 && w2v1v2 > 0 && w2v2v3 <= 0) {
            bt.lr = new BiTangent(i, j);
          }
        }
      }
      return bt;
    }
    exports.tangents = tangents;
    function isPointInsidePoly(p, poly) {
      for (var i = 1, n = poly.length; i < n; ++i) if (below(poly[i - 1], poly[i], p)) return false;
      return true;
    }
    function isAnyPInQ(p, q) {
      return !p.every(function(v) {
        return !isPointInsidePoly(v, q);
      });
    }
    function polysOverlap(p, q) {
      if (isAnyPInQ(p, q)) return true;
      if (isAnyPInQ(q, p)) return true;
      for (var i = 1, n = p.length; i < n; ++i) {
        var v = p[i], u = p[i - 1];
        if (intersects(new LineSegment(u.x, u.y, v.x, v.y), q).length > 0) return true;
      }
      return false;
    }
    exports.polysOverlap = polysOverlap;
  }
});

// node_modules/webcola/dist/src/handledisconnected.js
var require_handledisconnected = __commonJS({
  "node_modules/webcola/dist/src/handledisconnected.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var packingOptions = {
      PADDING: 10,
      GOLDEN_SECTION: (1 + Math.sqrt(5)) / 2,
      FLOAT_EPSILON: 1e-4,
      MAX_INERATIONS: 100
    };
    function applyPacking(graphs, w, h, node_size, desired_ratio, centerGraph) {
      if (desired_ratio === void 0) {
        desired_ratio = 1;
      }
      if (centerGraph === void 0) {
        centerGraph = true;
      }
      var init_x = 0, init_y = 0, svg_width = w, svg_height = h, desired_ratio = typeof desired_ratio !== "undefined" ? desired_ratio : 1, node_size = typeof node_size !== "undefined" ? node_size : 0, real_width = 0, real_height = 0, min_width = 0, global_bottom = 0, line = [];
      if (graphs.length == 0) return;
      calculate_bb(graphs);
      apply(graphs, desired_ratio);
      if (centerGraph) {
        put_nodes_to_right_positions(graphs);
      }
      function calculate_bb(graphs2) {
        graphs2.forEach(function(g) {
          calculate_single_bb(g);
        });
        function calculate_single_bb(graph) {
          var min_x = Number.MAX_VALUE, min_y = Number.MAX_VALUE, max_x = 0, max_y = 0;
          graph.array.forEach(function(v) {
            var w2 = typeof v.width !== "undefined" ? v.width : node_size;
            var h2 = typeof v.height !== "undefined" ? v.height : node_size;
            w2 /= 2;
            h2 /= 2;
            max_x = Math.max(v.x + w2, max_x);
            min_x = Math.min(v.x - w2, min_x);
            max_y = Math.max(v.y + h2, max_y);
            min_y = Math.min(v.y - h2, min_y);
          });
          graph.width = max_x - min_x;
          graph.height = max_y - min_y;
        }
      }
      function put_nodes_to_right_positions(graphs2) {
        graphs2.forEach(function(g) {
          var center = {
            x: 0,
            y: 0
          };
          g.array.forEach(function(node) {
            center.x += node.x;
            center.y += node.y;
          });
          center.x /= g.array.length;
          center.y /= g.array.length;
          var corner = {
            x: center.x - g.width / 2,
            y: center.y - g.height / 2
          };
          var offset = {
            x: g.x - corner.x + svg_width / 2 - real_width / 2,
            y: g.y - corner.y + svg_height / 2 - real_height / 2
          };
          g.array.forEach(function(node) {
            node.x += offset.x;
            node.y += offset.y;
          });
        });
      }
      function apply(data, desired_ratio2) {
        var curr_best_f = Number.POSITIVE_INFINITY;
        var curr_best = 0;
        data.sort(function(a, b) {
          return b.height - a.height;
        });
        min_width = data.reduce(function(a, b) {
          return a.width < b.width ? a.width : b.width;
        });
        var left = x1 = min_width;
        var right = x22 = get_entire_width(data);
        var iterationCounter = 0;
        var f_x1 = Number.MAX_VALUE;
        var f_x2 = Number.MAX_VALUE;
        var flag = -1;
        var dx = Number.MAX_VALUE;
        var df = Number.MAX_VALUE;
        while (dx > min_width || df > packingOptions.FLOAT_EPSILON) {
          if (flag != 1) {
            var x1 = right - (right - left) / packingOptions.GOLDEN_SECTION;
            var f_x1 = step(data, x1);
          }
          if (flag != 0) {
            var x22 = left + (right - left) / packingOptions.GOLDEN_SECTION;
            var f_x2 = step(data, x22);
          }
          dx = Math.abs(x1 - x22);
          df = Math.abs(f_x1 - f_x2);
          if (f_x1 < curr_best_f) {
            curr_best_f = f_x1;
            curr_best = x1;
          }
          if (f_x2 < curr_best_f) {
            curr_best_f = f_x2;
            curr_best = x22;
          }
          if (f_x1 > f_x2) {
            left = x1;
            x1 = x22;
            f_x1 = f_x2;
            flag = 1;
          } else {
            right = x22;
            x22 = x1;
            f_x2 = f_x1;
            flag = 0;
          }
          if (iterationCounter++ > 100) {
            break;
          }
        }
        step(data, curr_best);
      }
      function step(data, max_width) {
        line = [];
        real_width = 0;
        real_height = 0;
        global_bottom = init_y;
        for (var i = 0; i < data.length; i++) {
          var o = data[i];
          put_rect(o, max_width);
        }
        return Math.abs(get_real_ratio() - desired_ratio);
      }
      function put_rect(rect, max_width) {
        var parent = void 0;
        for (var i = 0; i < line.length; i++) {
          if (line[i].space_left >= rect.height && line[i].x + line[i].width + rect.width + packingOptions.PADDING - max_width <= packingOptions.FLOAT_EPSILON) {
            parent = line[i];
            break;
          }
        }
        line.push(rect);
        if (parent !== void 0) {
          rect.x = parent.x + parent.width + packingOptions.PADDING;
          rect.y = parent.bottom;
          rect.space_left = rect.height;
          rect.bottom = rect.y;
          parent.space_left -= rect.height + packingOptions.PADDING;
          parent.bottom += rect.height + packingOptions.PADDING;
        } else {
          rect.y = global_bottom;
          global_bottom += rect.height + packingOptions.PADDING;
          rect.x = init_x;
          rect.bottom = rect.y;
          rect.space_left = rect.height;
        }
        if (rect.y + rect.height - real_height > -packingOptions.FLOAT_EPSILON) real_height = rect.y + rect.height - init_y;
        if (rect.x + rect.width - real_width > -packingOptions.FLOAT_EPSILON) real_width = rect.x + rect.width - init_x;
      }
      ;
      function get_entire_width(data) {
        var width = 0;
        data.forEach(function(d) {
          return width += d.width + packingOptions.PADDING;
        });
        return width;
      }
      function get_real_ratio() {
        return real_width / real_height;
      }
    }
    exports.applyPacking = applyPacking;
    function separateGraphs(nodes, links) {
      var marks = {};
      var ways = {};
      var graphs = [];
      var clusters = 0;
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var n1 = link.source;
        var n2 = link.target;
        if (ways[n1.index]) ways[n1.index].push(n2);
        else ways[n1.index] = [n2];
        if (ways[n2.index]) ways[n2.index].push(n1);
        else ways[n2.index] = [n1];
      }
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (marks[node.index]) continue;
        explore_node(node, true);
      }
      function explore_node(n, is_new) {
        if (marks[n.index] !== void 0) return;
        if (is_new) {
          clusters++;
          graphs.push({
            array: []
          });
        }
        marks[n.index] = clusters;
        graphs[clusters - 1].array.push(n);
        var adjacent = ways[n.index];
        if (!adjacent) return;
        for (var j = 0; j < adjacent.length; j++) {
          explore_node(adjacent[j], false);
        }
      }
      return graphs;
    }
    exports.separateGraphs = separateGraphs;
  }
});

// node_modules/webcola/dist/src/layout.js
var require_layout = __commonJS({
  "node_modules/webcola/dist/src/layout.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var powergraph = require_powergraph();
    var linklengths_1 = require_linklengths();
    var descent_1 = require_descent();
    var rectangle_1 = require_rectangle();
    var shortestpaths_1 = require_shortestpaths();
    var geom_1 = require_geom();
    var handledisconnected_1 = require_handledisconnected();
    var EventType;
    (function(EventType2) {
      EventType2[EventType2["start"] = 0] = "start";
      EventType2[EventType2["tick"] = 1] = "tick";
      EventType2[EventType2["end"] = 2] = "end";
    })(EventType = exports.EventType || (exports.EventType = {}));
    function isGroup(g) {
      return typeof g.leaves !== "undefined" || typeof g.groups !== "undefined";
    }
    var Layout = function() {
      function Layout2() {
        var _this = this;
        this._canvasSize = [1, 1];
        this._linkDistance = 20;
        this._defaultNodeSize = 10;
        this._linkLengthCalculator = null;
        this._linkType = null;
        this._avoidOverlaps = false;
        this._handleDisconnected = true;
        this._running = false;
        this._nodes = [];
        this._groups = [];
        this._rootGroup = null;
        this._links = [];
        this._constraints = [];
        this._distanceMatrix = null;
        this._descent = null;
        this._directedLinkConstraints = null;
        this._threshold = 0.01;
        this._visibilityGraph = null;
        this._groupCompactness = 1e-6;
        this.event = null;
        this.linkAccessor = {
          getSourceIndex: Layout2.getSourceIndex,
          getTargetIndex: Layout2.getTargetIndex,
          setLength: Layout2.setLinkLength,
          getType: function(l) {
            return typeof _this._linkType === "function" ? _this._linkType(l) : 0;
          }
        };
      }
      Layout2.prototype.on = function(e, listener) {
        if (!this.event) this.event = {};
        if (typeof e === "string") {
          this.event[EventType[e]] = listener;
        } else {
          this.event[e] = listener;
        }
        return this;
      };
      Layout2.prototype.trigger = function(e) {
        if (this.event && typeof this.event[e.type] !== "undefined") {
          this.event[e.type](e);
        }
      };
      Layout2.prototype.kick = function() {
        while (!this.tick()) ;
      };
      Layout2.prototype.tick = function() {
        if (this._alpha < this._threshold) {
          this._running = false;
          this.trigger({
            type: EventType.end,
            alpha: this._alpha = 0,
            stress: this._lastStress
          });
          return true;
        }
        var n = this._nodes.length, m = this._links.length;
        var o, i;
        this._descent.locks.clear();
        for (i = 0; i < n; ++i) {
          o = this._nodes[i];
          if (o.fixed) {
            if (typeof o.px === "undefined" || typeof o.py === "undefined") {
              o.px = o.x;
              o.py = o.y;
            }
            var p = [o.px, o.py];
            this._descent.locks.add(i, p);
          }
        }
        var s1 = this._descent.rungeKutta();
        if (s1 === 0) {
          this._alpha = 0;
        } else if (typeof this._lastStress !== "undefined") {
          this._alpha = s1;
        }
        this._lastStress = s1;
        this.updateNodePositions();
        this.trigger({
          type: EventType.tick,
          alpha: this._alpha,
          stress: this._lastStress
        });
        return false;
      };
      Layout2.prototype.updateNodePositions = function() {
        var x3 = this._descent.x[0], y3 = this._descent.x[1];
        var o, i = this._nodes.length;
        while (i--) {
          o = this._nodes[i];
          o.x = x3[i];
          o.y = y3[i];
        }
      };
      Layout2.prototype.nodes = function(v) {
        if (!v) {
          if (this._nodes.length === 0 && this._links.length > 0) {
            var n = 0;
            this._links.forEach(function(l) {
              n = Math.max(n, l.source, l.target);
            });
            this._nodes = new Array(++n);
            for (var i = 0; i < n; ++i) {
              this._nodes[i] = {};
            }
          }
          return this._nodes;
        }
        this._nodes = v;
        return this;
      };
      Layout2.prototype.groups = function(x3) {
        var _this = this;
        if (!x3) return this._groups;
        this._groups = x3;
        this._rootGroup = {};
        this._groups.forEach(function(g) {
          if (typeof g.padding === "undefined") g.padding = 1;
          if (typeof g.leaves !== "undefined") {
            g.leaves.forEach(function(v, i) {
              if (typeof v === "number") (g.leaves[i] = _this._nodes[v]).parent = g;
            });
          }
          if (typeof g.groups !== "undefined") {
            g.groups.forEach(function(gi, i) {
              if (typeof gi === "number") (g.groups[i] = _this._groups[gi]).parent = g;
            });
          }
        });
        this._rootGroup.leaves = this._nodes.filter(function(v) {
          return typeof v.parent === "undefined";
        });
        this._rootGroup.groups = this._groups.filter(function(g) {
          return typeof g.parent === "undefined";
        });
        return this;
      };
      Layout2.prototype.powerGraphGroups = function(f) {
        var g = powergraph.getGroups(this._nodes, this._links, this.linkAccessor, this._rootGroup);
        this.groups(g.groups);
        f(g);
        return this;
      };
      Layout2.prototype.avoidOverlaps = function(v) {
        if (!arguments.length) return this._avoidOverlaps;
        this._avoidOverlaps = v;
        return this;
      };
      Layout2.prototype.handleDisconnected = function(v) {
        if (!arguments.length) return this._handleDisconnected;
        this._handleDisconnected = v;
        return this;
      };
      Layout2.prototype.flowLayout = function(axis, minSeparation) {
        if (!arguments.length) axis = "y";
        this._directedLinkConstraints = {
          axis,
          getMinSeparation: typeof minSeparation === "number" ? function() {
            return minSeparation;
          } : minSeparation
        };
        return this;
      };
      Layout2.prototype.links = function(x3) {
        if (!arguments.length) return this._links;
        this._links = x3;
        return this;
      };
      Layout2.prototype.constraints = function(c) {
        if (!arguments.length) return this._constraints;
        this._constraints = c;
        return this;
      };
      Layout2.prototype.distanceMatrix = function(d) {
        if (!arguments.length) return this._distanceMatrix;
        this._distanceMatrix = d;
        return this;
      };
      Layout2.prototype.size = function(x3) {
        if (!x3) return this._canvasSize;
        this._canvasSize = x3;
        return this;
      };
      Layout2.prototype.defaultNodeSize = function(x3) {
        if (!x3) return this._defaultNodeSize;
        this._defaultNodeSize = x3;
        return this;
      };
      Layout2.prototype.groupCompactness = function(x3) {
        if (!x3) return this._groupCompactness;
        this._groupCompactness = x3;
        return this;
      };
      Layout2.prototype.linkDistance = function(x3) {
        if (!x3) {
          return this._linkDistance;
        }
        this._linkDistance = typeof x3 === "function" ? x3 : +x3;
        this._linkLengthCalculator = null;
        return this;
      };
      Layout2.prototype.linkType = function(f) {
        this._linkType = f;
        return this;
      };
      Layout2.prototype.convergenceThreshold = function(x3) {
        if (!x3) return this._threshold;
        this._threshold = typeof x3 === "function" ? x3 : +x3;
        return this;
      };
      Layout2.prototype.alpha = function(x3) {
        if (!arguments.length) return this._alpha;
        else {
          x3 = +x3;
          if (this._alpha) {
            if (x3 > 0) this._alpha = x3;
            else this._alpha = 0;
          } else if (x3 > 0) {
            if (!this._running) {
              this._running = true;
              this.trigger({
                type: EventType.start,
                alpha: this._alpha = x3
              });
              this.kick();
            }
          }
          return this;
        }
      };
      Layout2.prototype.getLinkLength = function(link) {
        return typeof this._linkDistance === "function" ? +this._linkDistance(link) : this._linkDistance;
      };
      Layout2.setLinkLength = function(link, length) {
        link.length = length;
      };
      Layout2.prototype.getLinkType = function(link) {
        return typeof this._linkType === "function" ? this._linkType(link) : 0;
      };
      Layout2.prototype.symmetricDiffLinkLengths = function(idealLength, w) {
        var _this = this;
        if (w === void 0) {
          w = 1;
        }
        this.linkDistance(function(l) {
          return idealLength * l.length;
        });
        this._linkLengthCalculator = function() {
          return linklengths_1.symmetricDiffLinkLengths(_this._links, _this.linkAccessor, w);
        };
        return this;
      };
      Layout2.prototype.jaccardLinkLengths = function(idealLength, w) {
        var _this = this;
        if (w === void 0) {
          w = 1;
        }
        this.linkDistance(function(l) {
          return idealLength * l.length;
        });
        this._linkLengthCalculator = function() {
          return linklengths_1.jaccardLinkLengths(_this._links, _this.linkAccessor, w);
        };
        return this;
      };
      Layout2.prototype.start = function(initialUnconstrainedIterations, initialUserConstraintIterations, initialAllConstraintsIterations, gridSnapIterations, keepRunning, centerGraph) {
        var _this = this;
        if (initialUnconstrainedIterations === void 0) {
          initialUnconstrainedIterations = 0;
        }
        if (initialUserConstraintIterations === void 0) {
          initialUserConstraintIterations = 0;
        }
        if (initialAllConstraintsIterations === void 0) {
          initialAllConstraintsIterations = 0;
        }
        if (gridSnapIterations === void 0) {
          gridSnapIterations = 0;
        }
        if (keepRunning === void 0) {
          keepRunning = true;
        }
        if (centerGraph === void 0) {
          centerGraph = true;
        }
        var i, j, n = this.nodes().length, N = n + 2 * this._groups.length, m = this._links.length, w = this._canvasSize[0], h = this._canvasSize[1];
        var x3 = new Array(N), y3 = new Array(N);
        var G = null;
        var ao = this._avoidOverlaps;
        this._nodes.forEach(function(v, i2) {
          v.index = i2;
          if (typeof v.x === "undefined") {
            v.x = w / 2, v.y = h / 2;
          }
          x3[i2] = v.x, y3[i2] = v.y;
        });
        if (this._linkLengthCalculator) this._linkLengthCalculator();
        var distances;
        if (this._distanceMatrix) {
          distances = this._distanceMatrix;
        } else {
          distances = new shortestpaths_1.Calculator(N, this._links, Layout2.getSourceIndex, Layout2.getTargetIndex, function(l) {
            return _this.getLinkLength(l);
          }).DistanceMatrix();
          G = descent_1.Descent.createSquareMatrix(N, function() {
            return 2;
          });
          this._links.forEach(function(l) {
            if (typeof l.source == "number") l.source = _this._nodes[l.source];
            if (typeof l.target == "number") l.target = _this._nodes[l.target];
          });
          this._links.forEach(function(e) {
            var u = Layout2.getSourceIndex(e), v = Layout2.getTargetIndex(e);
            G[u][v] = G[v][u] = e.weight || 1;
          });
        }
        var D = descent_1.Descent.createSquareMatrix(N, function(i2, j2) {
          return distances[i2][j2];
        });
        if (this._rootGroup && typeof this._rootGroup.groups !== "undefined") {
          var i = n;
          var addAttraction = function(i2, j2, strength, idealDistance) {
            G[i2][j2] = G[j2][i2] = strength;
            D[i2][j2] = D[j2][i2] = idealDistance;
          };
          this._groups.forEach(function(g) {
            addAttraction(i, i + 1, _this._groupCompactness, 0.1);
            x3[i] = 0, y3[i++] = 0;
            x3[i] = 0, y3[i++] = 0;
          });
        } else this._rootGroup = {
          leaves: this._nodes,
          groups: []
        };
        var curConstraints = this._constraints || [];
        if (this._directedLinkConstraints) {
          this.linkAccessor.getMinSeparation = this._directedLinkConstraints.getMinSeparation;
          curConstraints = curConstraints.concat(linklengths_1.generateDirectedEdgeConstraints(n, this._links, this._directedLinkConstraints.axis, this.linkAccessor));
        }
        this.avoidOverlaps(false);
        this._descent = new descent_1.Descent([x3, y3], D);
        this._descent.locks.clear();
        for (var i = 0; i < n; ++i) {
          var o = this._nodes[i];
          if (o.fixed) {
            o.px = o.x;
            o.py = o.y;
            var p = [o.x, o.y];
            this._descent.locks.add(i, p);
          }
        }
        this._descent.threshold = this._threshold;
        this.initialLayout(initialUnconstrainedIterations, x3, y3);
        if (curConstraints.length > 0) this._descent.project = new rectangle_1.Projection(this._nodes, this._groups, this._rootGroup, curConstraints).projectFunctions();
        this._descent.run(initialUserConstraintIterations);
        this.separateOverlappingComponents(w, h, centerGraph);
        this.avoidOverlaps(ao);
        if (ao) {
          this._nodes.forEach(function(v, i2) {
            v.x = x3[i2], v.y = y3[i2];
          });
          this._descent.project = new rectangle_1.Projection(this._nodes, this._groups, this._rootGroup, curConstraints, true).projectFunctions();
          this._nodes.forEach(function(v, i2) {
            x3[i2] = v.x, y3[i2] = v.y;
          });
        }
        this._descent.G = G;
        this._descent.run(initialAllConstraintsIterations);
        if (gridSnapIterations) {
          this._descent.snapStrength = 1e3;
          this._descent.snapGridSize = this._nodes[0].width;
          this._descent.numGridSnapNodes = n;
          this._descent.scaleSnapByMaxH = n != N;
          var G0 = descent_1.Descent.createSquareMatrix(N, function(i2, j2) {
            if (i2 >= n || j2 >= n) return G[i2][j2];
            return 0;
          });
          this._descent.G = G0;
          this._descent.run(gridSnapIterations);
        }
        this.updateNodePositions();
        this.separateOverlappingComponents(w, h, centerGraph);
        return keepRunning ? this.resume() : this;
      };
      Layout2.prototype.initialLayout = function(iterations, x3, y3) {
        if (this._groups.length > 0 && iterations > 0) {
          var n = this._nodes.length;
          var edges = this._links.map(function(e) {
            return {
              source: e.source.index,
              target: e.target.index
            };
          });
          var vs = this._nodes.map(function(v) {
            return {
              index: v.index
            };
          });
          this._groups.forEach(function(g, i) {
            vs.push({
              index: g.index = n + i
            });
          });
          this._groups.forEach(function(g, i) {
            if (typeof g.leaves !== "undefined") g.leaves.forEach(function(v) {
              return edges.push({
                source: g.index,
                target: v.index
              });
            });
            if (typeof g.groups !== "undefined") g.groups.forEach(function(gg) {
              return edges.push({
                source: g.index,
                target: gg.index
              });
            });
          });
          new Layout2().size(this.size()).nodes(vs).links(edges).avoidOverlaps(false).linkDistance(this.linkDistance()).symmetricDiffLinkLengths(5).convergenceThreshold(1e-4).start(iterations, 0, 0, 0, false);
          this._nodes.forEach(function(v) {
            x3[v.index] = vs[v.index].x;
            y3[v.index] = vs[v.index].y;
          });
        } else {
          this._descent.run(iterations);
        }
      };
      Layout2.prototype.separateOverlappingComponents = function(width, height, centerGraph) {
        var _this = this;
        if (centerGraph === void 0) {
          centerGraph = true;
        }
        if (!this._distanceMatrix && this._handleDisconnected) {
          var x_1 = this._descent.x[0], y_1 = this._descent.x[1];
          this._nodes.forEach(function(v, i) {
            v.x = x_1[i], v.y = y_1[i];
          });
          var graphs = handledisconnected_1.separateGraphs(this._nodes, this._links);
          handledisconnected_1.applyPacking(graphs, width, height, this._defaultNodeSize, 1, centerGraph);
          this._nodes.forEach(function(v, i) {
            _this._descent.x[0][i] = v.x, _this._descent.x[1][i] = v.y;
            if (v.bounds) {
              v.bounds.setXCentre(v.x);
              v.bounds.setYCentre(v.y);
            }
          });
        }
      };
      Layout2.prototype.resume = function() {
        return this.alpha(0.1);
      };
      Layout2.prototype.stop = function() {
        return this.alpha(0);
      };
      Layout2.prototype.prepareEdgeRouting = function(nodeMargin) {
        if (nodeMargin === void 0) {
          nodeMargin = 0;
        }
        this._visibilityGraph = new geom_1.TangentVisibilityGraph(this._nodes.map(function(v) {
          return v.bounds.inflate(-nodeMargin).vertices();
        }));
      };
      Layout2.prototype.routeEdge = function(edge, ah, draw) {
        if (ah === void 0) {
          ah = 5;
        }
        var lineData = [];
        var vg2 = new geom_1.TangentVisibilityGraph(this._visibilityGraph.P, {
          V: this._visibilityGraph.V,
          E: this._visibilityGraph.E
        }), port1 = {
          x: edge.source.x,
          y: edge.source.y
        }, port2 = {
          x: edge.target.x,
          y: edge.target.y
        }, start = vg2.addPoint(port1, edge.source.index), end = vg2.addPoint(port2, edge.target.index);
        vg2.addEdgeIfVisible(port1, port2, edge.source.index, edge.target.index);
        if (typeof draw !== "undefined") {
          draw(vg2);
        }
        var sourceInd = function(e) {
          return e.source.id;
        }, targetInd = function(e) {
          return e.target.id;
        }, length = function(e) {
          return e.length();
        }, spCalc = new shortestpaths_1.Calculator(vg2.V.length, vg2.E, sourceInd, targetInd, length), shortestPath = spCalc.PathFromNodeToNode(start.id, end.id);
        if (shortestPath.length === 1 || shortestPath.length === vg2.V.length) {
          var route = rectangle_1.makeEdgeBetween(edge.source.innerBounds, edge.target.innerBounds, ah);
          lineData = [route.sourceIntersection, route.arrowStart];
        } else {
          var n = shortestPath.length - 2, p = vg2.V[shortestPath[n]].p, q = vg2.V[shortestPath[0]].p, lineData = [edge.source.innerBounds.rayIntersection(p.x, p.y)];
          for (var i = n; i >= 0; --i) lineData.push(vg2.V[shortestPath[i]].p);
          lineData.push(rectangle_1.makeEdgeTo(q, edge.target.innerBounds, ah));
        }
        return lineData;
      };
      Layout2.getSourceIndex = function(e) {
        return typeof e.source === "number" ? e.source : e.source.index;
      };
      Layout2.getTargetIndex = function(e) {
        return typeof e.target === "number" ? e.target : e.target.index;
      };
      Layout2.linkId = function(e) {
        return Layout2.getSourceIndex(e) + "-" + Layout2.getTargetIndex(e);
      };
      Layout2.dragStart = function(d) {
        if (isGroup(d)) {
          Layout2.storeOffset(d, Layout2.dragOrigin(d));
        } else {
          Layout2.stopNode(d);
          d.fixed |= 2;
        }
      };
      Layout2.stopNode = function(v) {
        v.px = v.x;
        v.py = v.y;
      };
      Layout2.storeOffset = function(d, origin) {
        if (typeof d.leaves !== "undefined") {
          d.leaves.forEach(function(v) {
            v.fixed |= 2;
            Layout2.stopNode(v);
            v._dragGroupOffsetX = v.x - origin.x;
            v._dragGroupOffsetY = v.y - origin.y;
          });
        }
        if (typeof d.groups !== "undefined") {
          d.groups.forEach(function(g) {
            return Layout2.storeOffset(g, origin);
          });
        }
      };
      Layout2.dragOrigin = function(d) {
        if (isGroup(d)) {
          return {
            x: d.bounds.cx(),
            y: d.bounds.cy()
          };
        } else {
          return d;
        }
      };
      Layout2.drag = function(d, position) {
        if (isGroup(d)) {
          if (typeof d.leaves !== "undefined") {
            d.leaves.forEach(function(v) {
              d.bounds.setXCentre(position.x);
              d.bounds.setYCentre(position.y);
              v.px = v._dragGroupOffsetX + position.x;
              v.py = v._dragGroupOffsetY + position.y;
            });
          }
          if (typeof d.groups !== "undefined") {
            d.groups.forEach(function(g) {
              return Layout2.drag(g, position);
            });
          }
        } else {
          d.px = position.x;
          d.py = position.y;
        }
      };
      Layout2.dragEnd = function(d) {
        if (isGroup(d)) {
          if (typeof d.leaves !== "undefined") {
            d.leaves.forEach(function(v) {
              Layout2.dragEnd(v);
              delete v._dragGroupOffsetX;
              delete v._dragGroupOffsetY;
            });
          }
          if (typeof d.groups !== "undefined") {
            d.groups.forEach(Layout2.dragEnd);
          }
        } else {
          d.fixed &= ~6;
        }
      };
      Layout2.mouseOver = function(d) {
        d.fixed |= 4;
        d.px = d.x, d.py = d.y;
      };
      Layout2.mouseOut = function(d) {
        d.fixed &= ~4;
      };
      return Layout2;
    }();
    exports.Layout = Layout;
  }
});

// node_modules/webcola/dist/src/adaptor.js
var require_adaptor = __commonJS({
  "node_modules/webcola/dist/src/adaptor.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var layout_1 = require_layout();
    var LayoutAdaptor = function(_super) {
      __extends(LayoutAdaptor2, _super);
      function LayoutAdaptor2(options) {
        var _this = _super.call(this) || this;
        var self = _this;
        var o = options;
        if (o.trigger) {
          _this.trigger = o.trigger;
        }
        if (o.kick) {
          _this.kick = o.kick;
        }
        if (o.drag) {
          _this.drag = o.drag;
        }
        if (o.on) {
          _this.on = o.on;
        }
        _this.dragstart = _this.dragStart = layout_1.Layout.dragStart;
        _this.dragend = _this.dragEnd = layout_1.Layout.dragEnd;
        return _this;
      }
      LayoutAdaptor2.prototype.trigger = function(e) {
      };
      ;
      LayoutAdaptor2.prototype.kick = function() {
      };
      ;
      LayoutAdaptor2.prototype.drag = function() {
      };
      ;
      LayoutAdaptor2.prototype.on = function(eventType, listener) {
        return this;
      };
      ;
      return LayoutAdaptor2;
    }(layout_1.Layout);
    exports.LayoutAdaptor = LayoutAdaptor;
    function adaptor(options) {
      return new LayoutAdaptor(options);
    }
    exports.adaptor = adaptor;
  }
});

// node_modules/webcola/dist/src/d3v3adaptor.js
var require_d3v3adaptor = __commonJS({
  "node_modules/webcola/dist/src/d3v3adaptor.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var layout_1 = require_layout();
    var D3StyleLayoutAdaptor = function(_super) {
      __extends(D3StyleLayoutAdaptor2, _super);
      function D3StyleLayoutAdaptor2() {
        var _this = _super.call(this) || this;
        _this.event = d3.dispatch(layout_1.EventType[layout_1.EventType.start], layout_1.EventType[layout_1.EventType.tick], layout_1.EventType[layout_1.EventType.end]);
        var d3layout = _this;
        var drag;
        _this.drag = function() {
          if (!drag2) {
            var drag2 = d3.behavior.drag().origin(layout_1.Layout.dragOrigin).on("dragstart.d3adaptor", layout_1.Layout.dragStart).on("drag.d3adaptor", function(d) {
              layout_1.Layout.drag(d, d3.event);
              d3layout.resume();
            }).on("dragend.d3adaptor", layout_1.Layout.dragEnd);
          }
          if (!arguments.length) return drag2;
          this.call(drag2);
        };
        return _this;
      }
      D3StyleLayoutAdaptor2.prototype.trigger = function(e) {
        var d3event = {
          type: layout_1.EventType[e.type],
          alpha: e.alpha,
          stress: e.stress
        };
        this.event[d3event.type](d3event);
      };
      D3StyleLayoutAdaptor2.prototype.kick = function() {
        var _this = this;
        d3.timer(function() {
          return _super.prototype.tick.call(_this);
        });
      };
      D3StyleLayoutAdaptor2.prototype.on = function(eventType, listener) {
        if (typeof eventType === "string") {
          this.event.on(eventType, listener);
        } else {
          this.event.on(layout_1.EventType[eventType], listener);
        }
        return this;
      };
      return D3StyleLayoutAdaptor2;
    }(layout_1.Layout);
    exports.D3StyleLayoutAdaptor = D3StyleLayoutAdaptor;
    function d3adaptor2() {
      return new D3StyleLayoutAdaptor();
    }
    exports.d3adaptor = d3adaptor2;
  }
});

// node_modules/webcola/dist/src/d3v4adaptor.js
var require_d3v4adaptor = __commonJS({
  "node_modules/webcola/dist/src/d3v4adaptor.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var layout_1 = require_layout();
    var D3StyleLayoutAdaptor = function(_super) {
      __extends(D3StyleLayoutAdaptor2, _super);
      function D3StyleLayoutAdaptor2(d3Context) {
        var _this = _super.call(this) || this;
        _this.d3Context = d3Context;
        _this.event = d3Context.dispatch(layout_1.EventType[layout_1.EventType.start], layout_1.EventType[layout_1.EventType.tick], layout_1.EventType[layout_1.EventType.end]);
        var d3layout = _this;
        var drag;
        _this.drag = function() {
          if (!drag2) {
            var drag2 = d3Context.drag().subject(layout_1.Layout.dragOrigin).on("start.d3adaptor", layout_1.Layout.dragStart).on("drag.d3adaptor", function(d) {
              layout_1.Layout.drag(d, d3Context.event);
              d3layout.resume();
            }).on("end.d3adaptor", layout_1.Layout.dragEnd);
          }
          if (!arguments.length) return drag2;
          arguments[0].call(drag2);
        };
        return _this;
      }
      D3StyleLayoutAdaptor2.prototype.trigger = function(e) {
        var d3event = {
          type: layout_1.EventType[e.type],
          alpha: e.alpha,
          stress: e.stress
        };
        this.event.call(d3event.type, d3event);
      };
      D3StyleLayoutAdaptor2.prototype.kick = function() {
        var _this = this;
        var t = this.d3Context.timer(function() {
          return _super.prototype.tick.call(_this) && t.stop();
        });
      };
      D3StyleLayoutAdaptor2.prototype.on = function(eventType, listener) {
        if (typeof eventType === "string") {
          this.event.on(eventType, listener);
        } else {
          this.event.on(layout_1.EventType[eventType], listener);
        }
        return this;
      };
      return D3StyleLayoutAdaptor2;
    }(layout_1.Layout);
    exports.D3StyleLayoutAdaptor = D3StyleLayoutAdaptor;
  }
});

// node_modules/webcola/dist/src/d3adaptor.js
var require_d3adaptor = __commonJS({
  "node_modules/webcola/dist/src/d3adaptor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var d3v3 = require_d3v3adaptor();
    var d3v4 = require_d3v4adaptor();
    function d3adaptor2(d3Context) {
      if (!d3Context || isD3V3(d3Context)) {
        return new d3v3.D3StyleLayoutAdaptor();
      }
      return new d3v4.D3StyleLayoutAdaptor(d3Context);
    }
    exports.d3adaptor = d3adaptor2;
    function isD3V3(d3Context) {
      var v3exp = /^3\./;
      return d3Context.version && d3Context.version.match(v3exp) !== null;
    }
  }
});

// node_modules/webcola/dist/src/gridrouter.js
var require_gridrouter = __commonJS({
  "node_modules/webcola/dist/src/gridrouter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var rectangle_1 = require_rectangle();
    var vpsc_1 = require_vpsc();
    var shortestpaths_1 = require_shortestpaths();
    var NodeWrapper = /* @__PURE__ */ function() {
      function NodeWrapper2(id2, rect, children) {
        this.id = id2;
        this.rect = rect;
        this.children = children;
        this.leaf = typeof children === "undefined" || children.length === 0;
      }
      return NodeWrapper2;
    }();
    exports.NodeWrapper = NodeWrapper;
    var Vert = /* @__PURE__ */ function() {
      function Vert2(id2, x3, y3, node, line) {
        if (node === void 0) {
          node = null;
        }
        if (line === void 0) {
          line = null;
        }
        this.id = id2;
        this.x = x3;
        this.y = y3;
        this.node = node;
        this.line = line;
      }
      return Vert2;
    }();
    exports.Vert = Vert;
    var LongestCommonSubsequence = function() {
      function LongestCommonSubsequence2(s, t) {
        this.s = s;
        this.t = t;
        var mf = LongestCommonSubsequence2.findMatch(s, t);
        var tr = t.slice(0).reverse();
        var mr = LongestCommonSubsequence2.findMatch(s, tr);
        if (mf.length >= mr.length) {
          this.length = mf.length;
          this.si = mf.si;
          this.ti = mf.ti;
          this.reversed = false;
        } else {
          this.length = mr.length;
          this.si = mr.si;
          this.ti = t.length - mr.ti - mr.length;
          this.reversed = true;
        }
      }
      LongestCommonSubsequence2.findMatch = function(s, t) {
        var m = s.length;
        var n = t.length;
        var match = {
          length: 0,
          si: -1,
          ti: -1
        };
        var l = new Array(m);
        for (var i = 0; i < m; i++) {
          l[i] = new Array(n);
          for (var j = 0; j < n; j++) if (s[i] === t[j]) {
            var v = l[i][j] = i === 0 || j === 0 ? 1 : l[i - 1][j - 1] + 1;
            if (v > match.length) {
              match.length = v;
              match.si = i - v + 1;
              match.ti = j - v + 1;
            }
            ;
          } else l[i][j] = 0;
        }
        return match;
      };
      LongestCommonSubsequence2.prototype.getSequence = function() {
        return this.length >= 0 ? this.s.slice(this.si, this.si + this.length) : [];
      };
      return LongestCommonSubsequence2;
    }();
    exports.LongestCommonSubsequence = LongestCommonSubsequence;
    var GridRouter = function() {
      function GridRouter2(originalnodes, accessor, groupPadding) {
        var _this = this;
        if (groupPadding === void 0) {
          groupPadding = 12;
        }
        this.originalnodes = originalnodes;
        this.groupPadding = groupPadding;
        this.leaves = null;
        this.nodes = originalnodes.map(function(v, i) {
          return new NodeWrapper(i, accessor.getBounds(v), accessor.getChildren(v));
        });
        this.leaves = this.nodes.filter(function(v) {
          return v.leaf;
        });
        this.groups = this.nodes.filter(function(g) {
          return !g.leaf;
        });
        this.cols = this.getGridLines("x");
        this.rows = this.getGridLines("y");
        this.groups.forEach(function(v) {
          return v.children.forEach(function(c) {
            return _this.nodes[c].parent = v;
          });
        });
        this.root = {
          children: []
        };
        this.nodes.forEach(function(v) {
          if (typeof v.parent === "undefined") {
            v.parent = _this.root;
            _this.root.children.push(v.id);
          }
          v.ports = [];
        });
        this.backToFront = this.nodes.slice(0);
        this.backToFront.sort(function(x3, y3) {
          return _this.getDepth(x3) - _this.getDepth(y3);
        });
        var frontToBackGroups = this.backToFront.slice(0).reverse().filter(function(g) {
          return !g.leaf;
        });
        frontToBackGroups.forEach(function(v) {
          var r = rectangle_1.Rectangle.empty();
          v.children.forEach(function(c) {
            return r = r.union(_this.nodes[c].rect);
          });
          v.rect = r.inflate(_this.groupPadding);
        });
        var colMids = this.midPoints(this.cols.map(function(r) {
          return r.pos;
        }));
        var rowMids = this.midPoints(this.rows.map(function(r) {
          return r.pos;
        }));
        var rowx = colMids[0], rowX = colMids[colMids.length - 1];
        var coly = rowMids[0], colY = rowMids[rowMids.length - 1];
        var hlines = this.rows.map(function(r) {
          return {
            x1: rowx,
            x2: rowX,
            y1: r.pos,
            y2: r.pos
          };
        }).concat(rowMids.map(function(m) {
          return {
            x1: rowx,
            x2: rowX,
            y1: m,
            y2: m
          };
        }));
        var vlines = this.cols.map(function(c) {
          return {
            x1: c.pos,
            x2: c.pos,
            y1: coly,
            y2: colY
          };
        }).concat(colMids.map(function(m) {
          return {
            x1: m,
            x2: m,
            y1: coly,
            y2: colY
          };
        }));
        var lines = hlines.concat(vlines);
        lines.forEach(function(l) {
          return l.verts = [];
        });
        this.verts = [];
        this.edges = [];
        hlines.forEach(function(h) {
          return vlines.forEach(function(v) {
            var p = new Vert(_this.verts.length, v.x1, h.y1);
            h.verts.push(p);
            v.verts.push(p);
            _this.verts.push(p);
            var i = _this.backToFront.length;
            while (i-- > 0) {
              var node = _this.backToFront[i], r = node.rect;
              var dx = Math.abs(p.x - r.cx()), dy = Math.abs(p.y - r.cy());
              if (dx < r.width() / 2 && dy < r.height() / 2) {
                p.node = node;
                break;
              }
            }
          });
        });
        lines.forEach(function(l, li) {
          _this.nodes.forEach(function(v2, i2) {
            v2.rect.lineIntersections(l.x1, l.y1, l.x2, l.y2).forEach(function(intersect, j) {
              var p = new Vert(_this.verts.length, intersect.x, intersect.y, v2, l);
              _this.verts.push(p);
              l.verts.push(p);
              v2.ports.push(p);
            });
          });
          var isHoriz = Math.abs(l.y1 - l.y2) < 0.1;
          var delta = function(a, b) {
            return isHoriz ? b.x - a.x : b.y - a.y;
          };
          l.verts.sort(delta);
          for (var i = 1; i < l.verts.length; i++) {
            var u = l.verts[i - 1], v = l.verts[i];
            if (u.node && u.node === v.node && u.node.leaf) continue;
            _this.edges.push({
              source: u.id,
              target: v.id,
              length: Math.abs(delta(u, v))
            });
          }
        });
      }
      GridRouter2.prototype.avg = function(a) {
        return a.reduce(function(x3, y3) {
          return x3 + y3;
        }) / a.length;
      };
      GridRouter2.prototype.getGridLines = function(axis) {
        var columns = [];
        var ls = this.leaves.slice(0, this.leaves.length);
        while (ls.length > 0) {
          var overlapping = ls.filter(function(v) {
            return v.rect["overlap" + axis.toUpperCase()](ls[0].rect);
          });
          var col = {
            nodes: overlapping,
            pos: this.avg(overlapping.map(function(v) {
              return v.rect["c" + axis]();
            }))
          };
          columns.push(col);
          col.nodes.forEach(function(v) {
            return ls.splice(ls.indexOf(v), 1);
          });
        }
        columns.sort(function(a, b) {
          return a.pos - b.pos;
        });
        return columns;
      };
      GridRouter2.prototype.getDepth = function(v) {
        var depth = 0;
        while (v.parent !== this.root) {
          depth++;
          v = v.parent;
        }
        return depth;
      };
      GridRouter2.prototype.midPoints = function(a) {
        var gap = a[1] - a[0];
        var mids = [a[0] - gap / 2];
        for (var i = 1; i < a.length; i++) {
          mids.push((a[i] + a[i - 1]) / 2);
        }
        mids.push(a[a.length - 1] + gap / 2);
        return mids;
      };
      GridRouter2.prototype.findLineage = function(v) {
        var lineage = [v];
        do {
          v = v.parent;
          lineage.push(v);
        } while (v !== this.root);
        return lineage.reverse();
      };
      GridRouter2.prototype.findAncestorPathBetween = function(a, b) {
        var aa = this.findLineage(a), ba = this.findLineage(b), i = 0;
        while (aa[i] === ba[i]) i++;
        return {
          commonAncestor: aa[i - 1],
          lineages: aa.slice(i).concat(ba.slice(i))
        };
      };
      GridRouter2.prototype.siblingObstacles = function(a, b) {
        var _this = this;
        var path = this.findAncestorPathBetween(a, b);
        var lineageLookup = {};
        path.lineages.forEach(function(v) {
          return lineageLookup[v.id] = {};
        });
        var obstacles = path.commonAncestor.children.filter(function(v) {
          return !(v in lineageLookup);
        });
        path.lineages.filter(function(v) {
          return v.parent !== path.commonAncestor;
        }).forEach(function(v) {
          return obstacles = obstacles.concat(v.parent.children.filter(function(c) {
            return c !== v.id;
          }));
        });
        return obstacles.map(function(v) {
          return _this.nodes[v];
        });
      };
      GridRouter2.getSegmentSets = function(routes, x3, y3) {
        var vsegments = [];
        for (var ei = 0; ei < routes.length; ei++) {
          var route = routes[ei];
          for (var si = 0; si < route.length; si++) {
            var s = route[si];
            s.edgeid = ei;
            s.i = si;
            var sdx = s[1][x3] - s[0][x3];
            if (Math.abs(sdx) < 0.1) {
              vsegments.push(s);
            }
          }
        }
        vsegments.sort(function(a, b) {
          return a[0][x3] - b[0][x3];
        });
        var vsegmentsets = [];
        var segmentset = null;
        for (var i = 0; i < vsegments.length; i++) {
          var s = vsegments[i];
          if (!segmentset || Math.abs(s[0][x3] - segmentset.pos) > 0.1) {
            segmentset = {
              pos: s[0][x3],
              segments: []
            };
            vsegmentsets.push(segmentset);
          }
          segmentset.segments.push(s);
        }
        return vsegmentsets;
      };
      GridRouter2.nudgeSegs = function(x3, y3, routes, segments, leftOf, gap) {
        var n = segments.length;
        if (n <= 1) return;
        var vs = segments.map(function(s) {
          return new vpsc_1.Variable(s[0][x3]);
        });
        var cs = [];
        for (var i = 0; i < n; i++) {
          for (var j = 0; j < n; j++) {
            if (i === j) continue;
            var s1 = segments[i], s2 = segments[j], e1 = s1.edgeid, e2 = s2.edgeid, lind = -1, rind = -1;
            if (x3 == "x") {
              if (leftOf(e1, e2)) {
                if (s1[0][y3] < s1[1][y3]) {
                  lind = j, rind = i;
                } else {
                  lind = i, rind = j;
                }
              }
            } else {
              if (leftOf(e1, e2)) {
                if (s1[0][y3] < s1[1][y3]) {
                  lind = i, rind = j;
                } else {
                  lind = j, rind = i;
                }
              }
            }
            if (lind >= 0) {
              cs.push(new vpsc_1.Constraint(vs[lind], vs[rind], gap));
            }
          }
        }
        var solver = new vpsc_1.Solver(vs, cs);
        solver.solve();
        vs.forEach(function(v, i2) {
          var s = segments[i2];
          var pos = v.position();
          s[0][x3] = s[1][x3] = pos;
          var route = routes[s.edgeid];
          if (s.i > 0) route[s.i - 1][1][x3] = pos;
          if (s.i < route.length - 1) route[s.i + 1][0][x3] = pos;
        });
      };
      GridRouter2.nudgeSegments = function(routes, x3, y3, leftOf, gap) {
        var vsegmentsets = GridRouter2.getSegmentSets(routes, x3, y3);
        for (var i = 0; i < vsegmentsets.length; i++) {
          var ss = vsegmentsets[i];
          var events = [];
          for (var j = 0; j < ss.segments.length; j++) {
            var s = ss.segments[j];
            events.push({
              type: 0,
              s,
              pos: Math.min(s[0][y3], s[1][y3])
            });
            events.push({
              type: 1,
              s,
              pos: Math.max(s[0][y3], s[1][y3])
            });
          }
          events.sort(function(a, b) {
            return a.pos - b.pos + a.type - b.type;
          });
          var open = [];
          var openCount = 0;
          events.forEach(function(e) {
            if (e.type === 0) {
              open.push(e.s);
              openCount++;
            } else {
              openCount--;
            }
            if (openCount == 0) {
              GridRouter2.nudgeSegs(x3, y3, routes, open, leftOf, gap);
              open = [];
            }
          });
        }
      };
      GridRouter2.prototype.routeEdges = function(edges, nudgeGap, source, target) {
        var _this = this;
        var routePaths = edges.map(function(e) {
          return _this.route(source(e), target(e));
        });
        var order = GridRouter2.orderEdges(routePaths);
        var routes = routePaths.map(function(e) {
          return GridRouter2.makeSegments(e);
        });
        GridRouter2.nudgeSegments(routes, "x", "y", order, nudgeGap);
        GridRouter2.nudgeSegments(routes, "y", "x", order, nudgeGap);
        GridRouter2.unreverseEdges(routes, routePaths);
        return routes;
      };
      GridRouter2.unreverseEdges = function(routes, routePaths) {
        routes.forEach(function(segments, i) {
          var path = routePaths[i];
          if (path.reversed) {
            segments.reverse();
            segments.forEach(function(segment) {
              segment.reverse();
            });
          }
        });
      };
      GridRouter2.angleBetween2Lines = function(line1, line2) {
        var angle1 = Math.atan2(line1[0].y - line1[1].y, line1[0].x - line1[1].x);
        var angle2 = Math.atan2(line2[0].y - line2[1].y, line2[0].x - line2[1].x);
        var diff = angle1 - angle2;
        if (diff > Math.PI || diff < -Math.PI) {
          diff = angle2 - angle1;
        }
        return diff;
      };
      GridRouter2.isLeft = function(a, b, c) {
        return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) <= 0;
      };
      GridRouter2.getOrder = function(pairs) {
        var outgoing = {};
        for (var i = 0; i < pairs.length; i++) {
          var p = pairs[i];
          if (typeof outgoing[p.l] === "undefined") outgoing[p.l] = {};
          outgoing[p.l][p.r] = true;
        }
        return function(l, r) {
          return typeof outgoing[l] !== "undefined" && outgoing[l][r];
        };
      };
      GridRouter2.orderEdges = function(edges) {
        var edgeOrder = [];
        for (var i = 0; i < edges.length - 1; i++) {
          for (var j = i + 1; j < edges.length; j++) {
            var e = edges[i], f = edges[j], lcs = new LongestCommonSubsequence(e, f);
            var u, vi, vj;
            if (lcs.length === 0) continue;
            if (lcs.reversed) {
              f.reverse();
              f.reversed = true;
              lcs = new LongestCommonSubsequence(e, f);
            }
            if ((lcs.si <= 0 || lcs.ti <= 0) && (lcs.si + lcs.length >= e.length || lcs.ti + lcs.length >= f.length)) {
              edgeOrder.push({
                l: i,
                r: j
              });
              continue;
            }
            if (lcs.si + lcs.length >= e.length || lcs.ti + lcs.length >= f.length) {
              u = e[lcs.si + 1];
              vj = e[lcs.si - 1];
              vi = f[lcs.ti - 1];
            } else {
              u = e[lcs.si + lcs.length - 2];
              vi = e[lcs.si + lcs.length];
              vj = f[lcs.ti + lcs.length];
            }
            if (GridRouter2.isLeft(u, vi, vj)) {
              edgeOrder.push({
                l: j,
                r: i
              });
            } else {
              edgeOrder.push({
                l: i,
                r: j
              });
            }
          }
        }
        return GridRouter2.getOrder(edgeOrder);
      };
      GridRouter2.makeSegments = function(path) {
        function copyPoint(p) {
          return {
            x: p.x,
            y: p.y
          };
        }
        var isStraight = function(a2, b2, c2) {
          return Math.abs((b2.x - a2.x) * (c2.y - a2.y) - (b2.y - a2.y) * (c2.x - a2.x)) < 1e-3;
        };
        var segments = [];
        var a = copyPoint(path[0]);
        for (var i = 1; i < path.length; i++) {
          var b = copyPoint(path[i]), c = i < path.length - 1 ? path[i + 1] : null;
          if (!c || !isStraight(a, b, c)) {
            segments.push([a, b]);
            a = b;
          }
        }
        return segments;
      };
      GridRouter2.prototype.route = function(s, t) {
        var _this = this;
        var source = this.nodes[s], target = this.nodes[t];
        this.obstacles = this.siblingObstacles(source, target);
        var obstacleLookup = {};
        this.obstacles.forEach(function(o) {
          return obstacleLookup[o.id] = o;
        });
        this.passableEdges = this.edges.filter(function(e) {
          var u2 = _this.verts[e.source], v2 = _this.verts[e.target];
          return !(u2.node && u2.node.id in obstacleLookup || v2.node && v2.node.id in obstacleLookup);
        });
        for (var i = 1; i < source.ports.length; i++) {
          var u = source.ports[0].id;
          var v = source.ports[i].id;
          this.passableEdges.push({
            source: u,
            target: v,
            length: 0
          });
        }
        for (var i = 1; i < target.ports.length; i++) {
          var u = target.ports[0].id;
          var v = target.ports[i].id;
          this.passableEdges.push({
            source: u,
            target: v,
            length: 0
          });
        }
        var getSource = function(e) {
          return e.source;
        }, getTarget = function(e) {
          return e.target;
        }, getLength = function(e) {
          return e.length;
        };
        var shortestPathCalculator = new shortestpaths_1.Calculator(this.verts.length, this.passableEdges, getSource, getTarget, getLength);
        var bendPenalty = function(u2, v2, w) {
          var a = _this.verts[u2], b = _this.verts[v2], c = _this.verts[w];
          var dx = Math.abs(c.x - a.x), dy = Math.abs(c.y - a.y);
          if (a.node === source && a.node === b.node || b.node === target && b.node === c.node) return 0;
          return dx > 1 && dy > 1 ? 1e3 : 0;
        };
        var shortestPath = shortestPathCalculator.PathFromNodeToNodeWithPrevCost(source.ports[0].id, target.ports[0].id, bendPenalty);
        var pathPoints = shortestPath.reverse().map(function(vi) {
          return _this.verts[vi];
        });
        pathPoints.push(this.nodes[target.id].ports[0]);
        return pathPoints.filter(function(v2, i2) {
          return !(i2 < pathPoints.length - 1 && pathPoints[i2 + 1].node === source && v2.node === source || i2 > 0 && v2.node === target && pathPoints[i2 - 1].node === target);
        });
      };
      GridRouter2.getRoutePath = function(route, cornerradius, arrowwidth, arrowheight) {
        var result = {
          routepath: "M " + route[0][0].x + " " + route[0][0].y + " ",
          arrowpath: ""
        };
        if (route.length > 1) {
          for (var i = 0; i < route.length; i++) {
            var li = route[i];
            var x3 = li[1].x, y3 = li[1].y;
            var dx = x3 - li[0].x;
            var dy = y3 - li[0].y;
            if (i < route.length - 1) {
              if (Math.abs(dx) > 0) {
                x3 -= dx / Math.abs(dx) * cornerradius;
              } else {
                y3 -= dy / Math.abs(dy) * cornerradius;
              }
              result.routepath += "L " + x3 + " " + y3 + " ";
              var l = route[i + 1];
              var x0 = l[0].x, y0 = l[0].y;
              var x1 = l[1].x;
              var y1 = l[1].y;
              dx = x1 - x0;
              dy = y1 - y0;
              var angle = GridRouter2.angleBetween2Lines(li, l) < 0 ? 1 : 0;
              var x22, y22;
              if (Math.abs(dx) > 0) {
                x22 = x0 + dx / Math.abs(dx) * cornerradius;
                y22 = y0;
              } else {
                x22 = x0;
                y22 = y0 + dy / Math.abs(dy) * cornerradius;
              }
              var cx = Math.abs(x22 - x3);
              var cy = Math.abs(y22 - y3);
              result.routepath += "A " + cx + " " + cy + " 0 0 " + angle + " " + x22 + " " + y22 + " ";
            } else {
              var arrowtip = [x3, y3];
              var arrowcorner1, arrowcorner2;
              if (Math.abs(dx) > 0) {
                x3 -= dx / Math.abs(dx) * arrowheight;
                arrowcorner1 = [x3, y3 + arrowwidth];
                arrowcorner2 = [x3, y3 - arrowwidth];
              } else {
                y3 -= dy / Math.abs(dy) * arrowheight;
                arrowcorner1 = [x3 + arrowwidth, y3];
                arrowcorner2 = [x3 - arrowwidth, y3];
              }
              result.routepath += "L " + x3 + " " + y3 + " ";
              if (arrowheight > 0) {
                result.arrowpath = "M " + arrowtip[0] + " " + arrowtip[1] + " L " + arrowcorner1[0] + " " + arrowcorner1[1] + " L " + arrowcorner2[0] + " " + arrowcorner2[1];
              }
            }
          }
        } else {
          var li = route[0];
          var x3 = li[1].x, y3 = li[1].y;
          var dx = x3 - li[0].x;
          var dy = y3 - li[0].y;
          var arrowtip = [x3, y3];
          var arrowcorner1, arrowcorner2;
          if (Math.abs(dx) > 0) {
            x3 -= dx / Math.abs(dx) * arrowheight;
            arrowcorner1 = [x3, y3 + arrowwidth];
            arrowcorner2 = [x3, y3 - arrowwidth];
          } else {
            y3 -= dy / Math.abs(dy) * arrowheight;
            arrowcorner1 = [x3 + arrowwidth, y3];
            arrowcorner2 = [x3 - arrowwidth, y3];
          }
          result.routepath += "L " + x3 + " " + y3 + " ";
          if (arrowheight > 0) {
            result.arrowpath = "M " + arrowtip[0] + " " + arrowtip[1] + " L " + arrowcorner1[0] + " " + arrowcorner1[1] + " L " + arrowcorner2[0] + " " + arrowcorner2[1];
          }
        }
        return result;
      };
      return GridRouter2;
    }();
    exports.GridRouter = GridRouter;
  }
});

// node_modules/webcola/dist/src/layout3d.js
var require_layout3d = __commonJS({
  "node_modules/webcola/dist/src/layout3d.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var shortestpaths_1 = require_shortestpaths();
    var descent_1 = require_descent();
    var rectangle_1 = require_rectangle();
    var linklengths_1 = require_linklengths();
    var Link3D = function() {
      function Link3D2(source, target) {
        this.source = source;
        this.target = target;
      }
      Link3D2.prototype.actualLength = function(x3) {
        var _this = this;
        return Math.sqrt(x3.reduce(function(c, v) {
          var dx = v[_this.target] - v[_this.source];
          return c + dx * dx;
        }, 0));
      };
      return Link3D2;
    }();
    exports.Link3D = Link3D;
    var Node3D = /* @__PURE__ */ function() {
      function Node3D2(x3, y3, z) {
        if (x3 === void 0) {
          x3 = 0;
        }
        if (y3 === void 0) {
          y3 = 0;
        }
        if (z === void 0) {
          z = 0;
        }
        this.x = x3;
        this.y = y3;
        this.z = z;
      }
      return Node3D2;
    }();
    exports.Node3D = Node3D;
    var Layout3D = function() {
      function Layout3D2(nodes, links, idealLinkLength) {
        var _this = this;
        if (idealLinkLength === void 0) {
          idealLinkLength = 1;
        }
        this.nodes = nodes;
        this.links = links;
        this.idealLinkLength = idealLinkLength;
        this.constraints = null;
        this.useJaccardLinkLengths = true;
        this.result = new Array(Layout3D2.k);
        for (var i = 0; i < Layout3D2.k; ++i) {
          this.result[i] = new Array(nodes.length);
        }
        nodes.forEach(function(v, i2) {
          for (var _i = 0, _a = Layout3D2.dims; _i < _a.length; _i++) {
            var dim = _a[_i];
            if (typeof v[dim] == "undefined") v[dim] = Math.random();
          }
          _this.result[0][i2] = v.x;
          _this.result[1][i2] = v.y;
          _this.result[2][i2] = v.z;
        });
      }
      ;
      Layout3D2.prototype.linkLength = function(l) {
        return l.actualLength(this.result);
      };
      Layout3D2.prototype.start = function(iterations) {
        var _this = this;
        if (iterations === void 0) {
          iterations = 100;
        }
        var n = this.nodes.length;
        var linkAccessor = new LinkAccessor();
        if (this.useJaccardLinkLengths) linklengths_1.jaccardLinkLengths(this.links, linkAccessor, 1.5);
        this.links.forEach(function(e) {
          return e.length *= _this.idealLinkLength;
        });
        var distanceMatrix = new shortestpaths_1.Calculator(n, this.links, function(e) {
          return e.source;
        }, function(e) {
          return e.target;
        }, function(e) {
          return e.length;
        }).DistanceMatrix();
        var D = descent_1.Descent.createSquareMatrix(n, function(i2, j) {
          return distanceMatrix[i2][j];
        });
        var G = descent_1.Descent.createSquareMatrix(n, function() {
          return 2;
        });
        this.links.forEach(function(_a) {
          var source = _a.source, target = _a.target;
          return G[source][target] = G[target][source] = 1;
        });
        this.descent = new descent_1.Descent(this.result, D);
        this.descent.threshold = 1e-3;
        this.descent.G = G;
        if (this.constraints) this.descent.project = new rectangle_1.Projection(this.nodes, null, null, this.constraints).projectFunctions();
        for (var i = 0; i < this.nodes.length; i++) {
          var v = this.nodes[i];
          if (v.fixed) {
            this.descent.locks.add(i, [v.x, v.y, v.z]);
          }
        }
        this.descent.run(iterations);
        return this;
      };
      Layout3D2.prototype.tick = function() {
        this.descent.locks.clear();
        for (var i = 0; i < this.nodes.length; i++) {
          var v = this.nodes[i];
          if (v.fixed) {
            this.descent.locks.add(i, [v.x, v.y, v.z]);
          }
        }
        return this.descent.rungeKutta();
      };
      Layout3D2.dims = ["x", "y", "z"];
      Layout3D2.k = Layout3D2.dims.length;
      return Layout3D2;
    }();
    exports.Layout3D = Layout3D;
    var LinkAccessor = function() {
      function LinkAccessor2() {
      }
      LinkAccessor2.prototype.getSourceIndex = function(e) {
        return e.source;
      };
      LinkAccessor2.prototype.getTargetIndex = function(e) {
        return e.target;
      };
      LinkAccessor2.prototype.getLength = function(e) {
        return e.length;
      };
      LinkAccessor2.prototype.setLength = function(e, l) {
        e.length = l;
      };
      return LinkAccessor2;
    }();
  }
});

// node_modules/webcola/dist/src/batch.js
var require_batch = __commonJS({
  "node_modules/webcola/dist/src/batch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var layout_1 = require_layout();
    var gridrouter_1 = require_gridrouter();
    function gridify(pgLayout, nudgeGap, margin, groupMargin) {
      pgLayout.cola.start(0, 0, 0, 10, false);
      var gridrouter = route(pgLayout.cola.nodes(), pgLayout.cola.groups(), margin, groupMargin);
      return gridrouter.routeEdges(pgLayout.powerGraph.powerEdges, nudgeGap, function(e) {
        return e.source.routerNode.id;
      }, function(e) {
        return e.target.routerNode.id;
      });
    }
    exports.gridify = gridify;
    function route(nodes, groups, margin, groupMargin) {
      nodes.forEach(function(d) {
        d.routerNode = {
          name: d.name,
          bounds: d.bounds.inflate(-margin)
        };
      });
      groups.forEach(function(d) {
        d.routerNode = {
          bounds: d.bounds.inflate(-groupMargin),
          children: (typeof d.groups !== "undefined" ? d.groups.map(function(c) {
            return nodes.length + c.id;
          }) : []).concat(typeof d.leaves !== "undefined" ? d.leaves.map(function(c) {
            return c.index;
          }) : [])
        };
      });
      var gridRouterNodes = nodes.concat(groups).map(function(d, i) {
        d.routerNode.id = i;
        return d.routerNode;
      });
      return new gridrouter_1.GridRouter(gridRouterNodes, {
        getChildren: function(v) {
          return v.children;
        },
        getBounds: function(v) {
          return v.bounds;
        }
      }, margin - groupMargin);
    }
    function powerGraphGridLayout(graph, size, grouppadding) {
      var powerGraph;
      graph.nodes.forEach(function(v, i) {
        return v.index = i;
      });
      new layout_1.Layout().avoidOverlaps(false).nodes(graph.nodes).links(graph.links).powerGraphGroups(function(d) {
        powerGraph = d;
        powerGraph.groups.forEach(function(v) {
          return v.padding = grouppadding;
        });
      });
      var n = graph.nodes.length;
      var edges = [];
      var vs = graph.nodes.slice(0);
      vs.forEach(function(v, i) {
        return v.index = i;
      });
      powerGraph.groups.forEach(function(g) {
        var sourceInd = g.index = g.id + n;
        vs.push(g);
        if (typeof g.leaves !== "undefined") g.leaves.forEach(function(v) {
          return edges.push({
            source: sourceInd,
            target: v.index
          });
        });
        if (typeof g.groups !== "undefined") g.groups.forEach(function(gg) {
          return edges.push({
            source: sourceInd,
            target: gg.id + n
          });
        });
      });
      powerGraph.powerEdges.forEach(function(e) {
        edges.push({
          source: e.source.index,
          target: e.target.index
        });
      });
      new layout_1.Layout().size(size).nodes(vs).links(edges).avoidOverlaps(false).linkDistance(30).symmetricDiffLinkLengths(5).convergenceThreshold(1e-4).start(100, 0, 0, 0, false);
      return {
        cola: new layout_1.Layout().convergenceThreshold(1e-3).size(size).avoidOverlaps(true).nodes(graph.nodes).links(graph.links).groupCompactness(1e-4).linkDistance(30).symmetricDiffLinkLengths(5).powerGraphGroups(function(d) {
          powerGraph = d;
          powerGraph.groups.forEach(function(v) {
            v.padding = grouppadding;
          });
        }).start(50, 0, 100, 0, false),
        powerGraph
      };
    }
    exports.powerGraphGridLayout = powerGraphGridLayout;
  }
});

// node_modules/webcola/dist/index.js
var require_dist = __commonJS({
  "node_modules/webcola/dist/index.js"(exports) {
    "use strict";
    function __export2(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __export2(require_adaptor());
    __export2(require_d3adaptor());
    __export2(require_descent());
    __export2(require_geom());
    __export2(require_gridrouter());
    __export2(require_handledisconnected());
    __export2(require_layout());
    __export2(require_layout3d());
    __export2(require_linklengths());
    __export2(require_powergraph());
    __export2(require_pqueue());
    __export2(require_rbtree());
    __export2(require_rectangle());
    __export2(require_shortestpaths());
    __export2(require_vpsc());
    __export2(require_batch());
  }
});

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix2 = name += "", i = prefix2.indexOf(":");
  if (i >= 0 && (prefix2 = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix2) ? {
    space: namespaces_default[prefix2],
    local: name
  } : name;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/creator.js
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

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function") select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/selectAll.js
function selectAll_default(select) {
  if (typeof select !== "function") select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
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

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/constant.js
function constant_default(x3) {
  return function() {
    return x3;
  };
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/data.js
var keyPrefix = "$";
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = {}, groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
      exit[i] = node;
    }
  }
}
function data_default(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) {
      data[++j] = d;
    });
    return data;
  }
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant_default(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = value.call(parent, parent && parent.__data__, j, parents), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
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

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/merge.js
function merge_default(selection2) {
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() {
    nodes[++i] = this;
  });
  return nodes;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/size.js
function size_default() {
  var size = 0;
  this.each(function() {
    ++size;
  });
  return size;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/attr.js
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
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
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

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/style.js
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
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/property.js
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
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/classed.js
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
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
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
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/text.js
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
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/html.js
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
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/clone.js
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

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/on.js
var filterEvents = {};
var event = null;
if (typeof document !== "undefined") {
  element = document.documentElement;
  if (!("onmouseenter" in element)) {
    filterEvents = {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    };
  }
}
var element;
function filterContextListener(listener, index2, group) {
  listener = contextListener(listener, index2, group);
  return function(event2) {
    var related = event2.relatedTarget;
    if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
      listener.call(this, event2);
    }
  };
}
function contextListener(listener, index2, group) {
  return function(event1) {
    var event0 = event;
    event = event1;
    try {
      listener.call(this, this.__data__, index2, group);
    } finally {
      event = event0;
    }
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name
    };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}
function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {
      type: typename.type,
      name: typename.name,
      value,
      listener,
      capture
    };
    if (!on) this.__on = [o];
    else on.push(o);
  };
}
function on_default(typename, value, capture) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type, params) {
  var window2 = window_default(node), event2 = window2.CustomEvent;
  if (typeof event2 === "function") {
    event2 = new event2(type, params);
  } else {
    event2 = window2.document.createEvent("Event");
    if (params) event2.initEvent(type, params.bubbles, params.cancelable), event2.detail = params.detail;
    else event2.initEvent(type, false, false);
  }
  node.dispatchEvent(event2);
}
function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}
function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}
function dispatch_default(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
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
  dispatch: dispatch_default
};

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-selection/src/local.js
var nextId = 0;
function local() {
  return new Local();
}
function Local() {
  this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id2 = this._;
    while (!(id2 in node)) if (!(node = node.parentNode)) return;
    return node[id2];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};

// node_modules/transformation-matrix/build-es/identity.js
function identity() {
  return {
    a: 1,
    c: 0,
    e: 0,
    b: 0,
    d: 1,
    f: 0
  };
}

// node_modules/transformation-matrix/build-es/utils.js
function isUndefined(val) {
  return typeof val === "undefined";
}

// node_modules/transformation-matrix/build-es/translate.js
function translate(tx) {
  var ty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return {
    a: 1,
    c: 0,
    e: tx,
    b: 0,
    d: 1,
    f: ty
  };
}

// node_modules/transformation-matrix/build-es/transform.js
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}
function transform() {
  for (var _len = arguments.length, matrices = Array(_len), _key = 0; _key < _len; _key++) {
    matrices[_key] = arguments[_key];
  }
  matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;
  var multiply = function multiply2(m12, m22) {
    return {
      a: m12.a * m22.a + m12.c * m22.b,
      c: m12.a * m22.c + m12.c * m22.d,
      e: m12.a * m22.e + m12.c * m22.f + m12.e,
      b: m12.b * m22.a + m12.d * m22.b,
      d: m12.b * m22.c + m12.d * m22.d,
      f: m12.b * m22.e + m12.d * m22.f + m12.f
    };
  };
  switch (matrices.length) {
    case 0:
      throw new Error("no matrices provided");
    case 1:
      return matrices[0];
    case 2:
      return multiply(matrices[0], matrices[1]);
    default:
      var _matrices = matrices, _matrices2 = _toArray(_matrices), m1 = _matrices2[0], m2 = _matrices2[1], rest = _matrices2.slice(2);
      var m = multiply(m1, m2);
      return transform.apply(void 0, [m].concat(_toConsumableArray(rest)));
  }
}

// node_modules/transformation-matrix/build-es/scale.js
function scale(sx) {
  var sy = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
  if (isUndefined(sy)) sy = sx;
  return {
    a: sx,
    c: 0,
    e: 0,
    b: 0,
    d: sy,
    f: 0
  };
}

// node_modules/transformation-matrix/build-es/toString.js
function toSVG(matrix) {
  return toString(matrix);
}
function toString(matrix) {
  return "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
}

// node_modules/transformation-matrix/build-es/smoothMatrix.js
function smoothMatrix(m) {
  var precision = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e10;
  return {
    a: Math.round(m.a * precision) / precision,
    b: Math.round(m.b * precision) / precision,
    c: Math.round(m.c * precision) / precision,
    d: Math.round(m.d * precision) / precision,
    e: Math.round(m.e * precision) / precision,
    f: Math.round(m.f * precision) / precision
  };
}

// node_modules/d3-scale/src/init.js
function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range).domain(domain);
      break;
  }
  return this;
}

// node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");
function ordinal() {
  var index2 = /* @__PURE__ */ new Map(), domain = [], range = [], unknown = implicit;
  function scale2(d) {
    var key = d + "", i = index2.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index2.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }
  scale2.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index2 = /* @__PURE__ */ new Map();
    for (const value of _) {
      const key = value + "";
      if (index2.has(key)) continue;
      index2.set(key, domain.push(value));
    }
    return scale2;
  };
  scale2.range = function(_) {
    return arguments.length ? (range = Array.from(_), scale2) : range.slice();
  };
  scale2.unknown = function(_) {
    return arguments.length ? (unknown = _, scale2) : unknown;
  };
  scale2.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };
  initRange.apply(scale2, arguments);
  return scale2;
}

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x3) {
  return Math.abs(x3 = Math.round(x3)) >= 1e21 ? x3.toLocaleString("en").replace(/,/g, "") : x3.toString(10);
}
function formatDecimalParts(x3, p) {
  if ((i = (x3 = p ? x3.toExponential(p - 1) : x3.toExponential()).indexOf("e")) < 0) return null;
  var i, coefficient = x3.slice(0, i);
  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x3.slice(i + 1)];
}

// node_modules/d3-format/src/exponent.js
function exponent_default(x3) {
  return x3 = formatDecimalParts(Math.abs(x3)), x3 ? x3[1] : NaN;
}

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

// node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x3, p) {
  var d = formatDecimalParts(x3, p);
  if (!d) return x3 + "";
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x3, Math.max(0, p + i - 1))[0];
}

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x3, p) {
  var d = formatDecimalParts(x3, p);
  if (!d) return x3 + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x3, p) => (x3 * 100).toFixed(p),
  "b": (x3) => Math.round(x3).toString(2),
  "c": (x3) => x3 + "",
  "d": formatDecimal_default,
  "e": (x3, p) => x3.toExponential(p),
  "f": (x3, p) => x3.toFixed(p),
  "g": (x3, p) => x3.toPrecision(p),
  "o": (x3) => Math.round(x3).toString(8),
  "p": (x3, p) => formatRounded_default(x3 * 100, p),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x3) => Math.round(x3).toString(16).toUpperCase(),
  "x": (x3) => Math.round(x3).toString(16)
};

// node_modules/d3-format/src/identity.js
function identity_default(x3) {
  return x3;
}

// node_modules/d3-format/src/locale.js
var map = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale3) {
  var group = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default : formatGroup_default(map.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default : formatNumerals_default(map.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "−" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n") comma = true, type = "g";
    else if (!formatTypes_default[type]) precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";
    var prefix2 = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
    var formatType = formatTypes_default[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix2, valueSuffix = suffix, i, n, c;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim) value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero) value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), prefix2 = prefixes[8 + e / 3];
    return function(value2) {
      return f(k * value2) + prefix2;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/d3-time-format/src/locale.js
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y3, m, d) {
  return {
    y: y3,
    m,
    d,
    H: 0,
    M: 0,
    S: 0,
    L: 0
  };
}
function formatLocale(locale3) {
  var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date) {
      var string = [], i = -1, j = 0, n = specifier.length, c, pad2, format2;
      if (!(date instanceof Date)) date = /* @__PURE__ */ new Date(+date);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad2 = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad2 = c === "e" ? " " : "0";
          if (format2 = formats2[c]) c = format2(date, pad2);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
      if (i != string.length) return null;
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z && !("Z" in d)) d.Z = 0;
      if ("p" in d) d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0) d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay_default.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? monday.ceil(week) : monday(week);
          week = day_default.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j) {
    var i = 0, n = specifier.length, m = string.length, c, parse;
    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || (j = parse(d, string, j)) < 0) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }
  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }
  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() {
        return specifier;
      };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() {
        return specifier;
      };
      return p;
    }
  };
}
var pads = {
  "-": "",
  "_": " ",
  "0": "0"
};
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s) {
  return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad(1 + day_default.count(year_default(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
  return pad(sunday.count(year_default(d) - 1, d), p, 2);
}
function dISO(d) {
  var day = d.getDay();
  return day >= 4 || day === 0 ? thursday(d) : thursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(thursday.count(year_default(d), d) + (year_default(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad(monday.count(year_default(d) - 1, d), p, 2);
}
function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? thursday(d) : thursday.ceil(d);
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay_default.count(utcYear_default(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear_default(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day = d.getUTCDay();
  return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear_default(d), d) + (utcYear_default(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear_default(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}

// node_modules/d3-time-format/src/defaultLocale.js
var locale2;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale2(definition) {
  locale2 = formatLocale(definition);
  timeFormat = locale2.format;
  timeParse = locale2.parse;
  utcFormat = locale2.utcFormat;
  utcParse = locale2.utcParse;
  return locale2;
}

// node_modules/d3-time-format/src/isoFormat.js
var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date) {
  return date.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

// node_modules/d3-time-format/src/isoParse.js
function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}
var parseIso = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

// node_modules/@swimlane/ngx-graph/fesm2020/swimlane-ngx-graph.mjs
var dagre = __toESM(require_dagre(), 1);

// node_modules/d3-force/src/index.js
var src_exports = {};
__export(src_exports, {
  forceCenter: () => center_default,
  forceCollide: () => collide_default,
  forceLink: () => link_default,
  forceManyBody: () => manyBody_default,
  forceRadial: () => radial_default,
  forceSimulation: () => simulation_default,
  forceX: () => x_default2,
  forceY: () => y_default2
});

// node_modules/d3-force/src/center.js
function center_default(x3, y3) {
  var nodes;
  if (x3 == null) x3 = 0;
  if (y3 == null) y3 = 0;
  function force() {
    var i, n = nodes.length, node, sx = 0, sy = 0;
    for (i = 0; i < n; ++i) {
      node = nodes[i], sx += node.x, sy += node.y;
    }
    for (sx = sx / n - x3, sy = sy / n - y3, i = 0; i < n; ++i) {
      node = nodes[i], node.x -= sx, node.y -= sy;
    }
  }
  force.initialize = function(_) {
    nodes = _;
  };
  force.x = function(_) {
    return arguments.length ? (x3 = +_, force) : x3;
  };
  force.y = function(_) {
    return arguments.length ? (y3 = +_, force) : y3;
  };
  return force;
}

// node_modules/d3-force/src/constant.js
function constant_default2(x3) {
  return function() {
    return x3;
  };
}

// node_modules/d3-force/src/jiggle.js
function jiggle_default() {
  return (Math.random() - 0.5) * 1e-6;
}

// node_modules/d3-quadtree/src/add.js
function add_default(d) {
  var x3 = +this._x.call(null, d), y3 = +this._y.call(null, d);
  return add(this.cover(x3, y3), x3, y3, d);
}
function add(tree, x3, y3, d) {
  if (isNaN(x3) || isNaN(y3)) return tree;
  var parent, node = tree._root, leaf = {
    data: d
  }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j;
  if (!node) return tree._root = leaf, tree;
  while (node.length) {
    if (right = x3 >= (xm = (x0 + x1) / 2)) x0 = xm;
    else x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2)) y0 = ym;
    else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x3 === xp && y3 === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x3 >= (xm = (x0 + x1) / 2)) x0 = xm;
    else x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2)) y0 = ym;
    else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
  return parent[j] = node, parent[i] = leaf, tree;
}
function addAll(data) {
  var d, i, n = data.length, x3, y3, xz = new Array(n), yz = new Array(n), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (i = 0; i < n; ++i) {
    if (isNaN(x3 = +this._x.call(null, d = data[i])) || isNaN(y3 = +this._y.call(null, d))) continue;
    xz[i] = x3;
    yz[i] = y3;
    if (x3 < x0) x0 = x3;
    if (x3 > x1) x1 = x3;
    if (y3 < y0) y0 = y3;
    if (y3 > y1) y1 = y3;
  }
  if (x0 > x1 || y0 > y1) return this;
  this.cover(x0, y0).cover(x1, y1);
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }
  return this;
}

// node_modules/d3-quadtree/src/cover.js
function cover_default(x3, y3) {
  if (isNaN(x3 = +x3) || isNaN(y3 = +y3)) return this;
  var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x3)) + 1;
    y1 = (y0 = Math.floor(y3)) + 1;
  } else {
    var z = x1 - x0, node = this._root, parent, i;
    while (x0 > x3 || x3 >= x1 || y0 > y3 || y3 >= y1) {
      i = (y3 < y0) << 1 | x3 < x0;
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0:
          x1 = x0 + z, y1 = y0 + z;
          break;
        case 1:
          x0 = x1 - z, y1 = y0 + z;
          break;
        case 2:
          x1 = x0 + z, y0 = y1 - z;
          break;
        case 3:
          x0 = x1 - z, y0 = y1 - z;
          break;
      }
    }
    if (this._root && this._root.length) this._root = node;
  }
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}

// node_modules/d3-quadtree/src/data.js
function data_default2() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do
      data.push(node.data);
    while (node = node.next);
  });
  return data;
}

// node_modules/d3-quadtree/src/extent.js
function extent_default(_) {
  return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}

// node_modules/d3-quadtree/src/quad.js
function quad_default(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

// node_modules/d3-quadtree/src/find.js
function find_default(x3, y3, radius) {
  var data, x0 = this._x0, y0 = this._y0, x1, y1, x22, y22, x32 = this._x1, y32 = this._y1, quads = [], node = this._root, q, i;
  if (node) quads.push(new quad_default(node, x0, y0, x32, y32));
  if (radius == null) radius = Infinity;
  else {
    x0 = x3 - radius, y0 = y3 - radius;
    x32 = x3 + radius, y32 = y3 + radius;
    radius *= radius;
  }
  while (q = quads.pop()) {
    if (!(node = q.node) || (x1 = q.x0) > x32 || (y1 = q.y0) > y32 || (x22 = q.x1) < x0 || (y22 = q.y1) < y0) continue;
    if (node.length) {
      var xm = (x1 + x22) / 2, ym = (y1 + y22) / 2;
      quads.push(new quad_default(node[3], xm, ym, x22, y22), new quad_default(node[2], x1, ym, xm, y22), new quad_default(node[1], xm, y1, x22, ym), new quad_default(node[0], x1, y1, xm, ym));
      if (i = (y3 >= ym) << 1 | x3 >= xm) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    } else {
      var dx = x3 - +this._x.call(null, node.data), dy = y3 - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x3 - d, y0 = y3 - d;
        x32 = x3 + d, y32 = y3 + d;
        data = node.data;
      }
    }
  }
  return data;
}

// node_modules/d3-quadtree/src/remove.js
function remove_default2(d) {
  if (isNaN(x3 = +this._x.call(null, d)) || isNaN(y3 = +this._y.call(null, d))) return this;
  var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x3, y3, xm, ym, right, bottom, i, j;
  if (!node) return this;
  if (node.length) while (true) {
    if (right = x3 >= (xm = (x0 + x1) / 2)) x0 = xm;
    else x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2)) y0 = ym;
    else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3]) retainer = parent, j = i;
  }
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;
  if (previous) return next ? previous.next = next : delete previous.next, this;
  if (!parent) return this._root = next, this;
  next ? parent[i] = next : delete parent[i];
  if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }
  return this;
}
function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}

// node_modules/d3-quadtree/src/root.js
function root_default() {
  return this._root;
}

// node_modules/d3-quadtree/src/size.js
function size_default2() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do
      ++size;
    while (node = node.next);
  });
  return size;
}

// node_modules/d3-quadtree/src/visit.js
function visit_default(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new quad_default(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new quad_default(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new quad_default(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new quad_default(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new quad_default(child, x0, y0, xm, ym));
    }
  }
  return this;
}

// node_modules/d3-quadtree/src/visitAfter.js
function visitAfter_default(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new quad_default(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new quad_default(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new quad_default(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new quad_default(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new quad_default(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}

// node_modules/d3-quadtree/src/x.js
function defaultX(d) {
  return d[0];
}
function x_default(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}

// node_modules/d3-quadtree/src/y.js
function defaultY(d) {
  return d[1];
}
function y_default(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}

// node_modules/d3-quadtree/src/quadtree.js
function quadtree(nodes, x3, y3) {
  var tree = new Quadtree(x3 == null ? defaultX : x3, y3 == null ? defaultY : y3, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x3, y3, x0, y0, x1, y1) {
  this._x = x3;
  this._y = y3;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = void 0;
}
function leaf_copy(leaf) {
  var copy3 = {
    data: leaf.data
  }, next = copy3;
  while (leaf = leaf.next) next = next.next = {
    data: leaf.data
  };
  return copy3;
}
var treeProto = quadtree.prototype = Quadtree.prototype;
treeProto.copy = function() {
  var copy3 = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
  if (!node) return copy3;
  if (!node.length) return copy3._root = leaf_copy(node), copy3;
  nodes = [{
    source: node,
    target: copy3._root = new Array(4)
  }];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({
          source: child,
          target: node.target[i] = new Array(4)
        });
        else node.target[i] = leaf_copy(child);
      }
    }
  }
  return copy3;
};
treeProto.add = add_default;
treeProto.addAll = addAll;
treeProto.cover = cover_default;
treeProto.data = data_default2;
treeProto.extent = extent_default;
treeProto.find = find_default;
treeProto.remove = remove_default2;
treeProto.removeAll = removeAll;
treeProto.root = root_default;
treeProto.size = size_default2;
treeProto.visit = visit_default;
treeProto.visitAfter = visitAfter_default;
treeProto.x = x_default;
treeProto.y = y_default;

// node_modules/d3-force/src/collide.js
function x(d) {
  return d.x + d.vx;
}
function y(d) {
  return d.y + d.vy;
}
function collide_default(radius) {
  var nodes, radii, strength = 1, iterations = 1;
  if (typeof radius !== "function") radius = constant_default2(radius == null ? 1 : +radius);
  function force() {
    var i, n = nodes.length, tree, node, xi, yi, ri, ri2;
    for (var k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }
    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x3 = xi - data.x - data.vx, y3 = yi - data.y - data.vy, l = x3 * x3 + y3 * y3;
          if (l < r * r) {
            if (x3 === 0) x3 = jiggle_default(), l += x3 * x3;
            if (y3 === 0) y3 = jiggle_default(), l += y3 * y3;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x3 *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y3 *= l) * r;
            data.vx -= x3 * (r = 1 - r);
            data.vy -= y3 * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }
  function prepare(quad) {
    if (quad.data) return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };
  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default2(+_), initialize(), force) : radius;
  };
  return force;
}

// node_modules/d3-collection/src/map.js
var prefix = "$";
function Map2() {
}
Map2.prototype = map2.prototype = {
  constructor: Map2,
  has: function(key) {
    return prefix + key in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function() {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({
      key: property.slice(1),
      value: this[property]
    });
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function(f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};
function map2(object, f) {
  var map3 = new Map2();
  if (object instanceof Map2) object.each(function(value, key2) {
    map3.set(key2, value);
  });
  else if (Array.isArray(object)) {
    var i = -1, n = object.length, o;
    if (f == null) while (++i < n) map3.set(i, object[i]);
    else while (++i < n) map3.set(f(o = object[i], i, object), o);
  } else if (object) for (var key in object) map3.set(key, object[key]);
  return map3;
}
var map_default = map2;

// node_modules/d3-collection/src/set.js
function Set2() {
}
var proto = map_default.prototype;
Set2.prototype = set.prototype = {
  constructor: Set2,
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};
function set(object, f) {
  var set4 = new Set2();
  if (object instanceof Set2) object.each(function(value) {
    set4.add(value);
  });
  else if (object) {
    var i = -1, n = object.length;
    if (f == null) while (++i < n) set4.add(object[i]);
    else while (++i < n) set4.add(f(object[i], i, object));
  }
  return set4;
}

// node_modules/d3-force/src/link.js
function index(d) {
  return d.index;
}
function find(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node) throw new Error("missing: " + nodeId);
  return node;
}
function link_default(links) {
  var id2 = index, strength = defaultStrength, strengths, distance = constant_default2(30), distances, nodes, count, bias, iterations = 1;
  if (links == null) links = [];
  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }
  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x3, y3, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x3 = target.x + target.vx - source.x - source.vx || jiggle_default();
        y3 = target.y + target.vy - source.y - source.vy || jiggle_default();
        l = Math.sqrt(x3 * x3 + y3 * y3);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x3 *= l, y3 *= l;
        target.vx -= x3 * (b = bias[i]);
        target.vy -= y3 * b;
        source.vx += x3 * (b = 1 - b);
        source.vy += y3 * b;
      }
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, m = links.length, nodeById = map_default(nodes, id2), link;
    for (i = 0, count = new Array(n); i < m; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object") link.source = find(nodeById, link.source);
      if (typeof link.target !== "object") link.target = find(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }
    for (i = 0, bias = new Array(m); i < m; ++i) {
      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }
    strengths = new Array(m), initializeStrength();
    distances = new Array(m), initializeDistance();
  }
  function initializeStrength() {
    if (!nodes) return;
    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }
  function initializeDistance() {
    if (!nodes) return;
    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };
  force.id = function(_) {
    return arguments.length ? (id2 = _, force) : id2;
  };
  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default2(+_), initializeStrength(), force) : strength;
  };
  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : constant_default2(+_), initializeDistance(), force) : distance;
  };
  return force;
}

// node_modules/d3-force/node_modules/d3-dispatch/src/dispatch.js
var noop = {
  value: function() {
  }
};
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames2(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {
      type: t,
      name
    };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames2(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set2(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set2(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy3 = {}, _ = this._;
    for (var t in _) copy3[t] = _[t].slice();
    return new Dispatch(copy3);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}
function set2(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({
    name,
    value: callback
  });
  return type;
}
var dispatch_default2 = dispatch;

// node_modules/d3-force/node_modules/d3-timer/src/timer.js
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
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
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
  restart: function(callback, delay, time2) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time2 = (time2 == null ? now() : +time2) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time2;
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
function timer(callback, delay, time2) {
  var t = new Timer();
  t.restart(callback, delay, time2);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
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
  var now3 = clock.now(), delay = now3 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now3;
}
function nap() {
  var t0, t1 = taskHead, t2, time2 = Infinity;
  while (t1) {
    if (t1._call) {
      if (time2 > t1._time) time2 = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time2);
}
function sleep(time2) {
  if (frame) return;
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time2 - clockNow;
  if (delay > 24) {
    if (time2 < Infinity) timeout = setTimeout(wake, time2 - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/d3-force/src/simulation.js
function x2(d) {
  return d.x;
}
function y2(d) {
  return d.y;
}
var initialRadius = 10;
var initialAngle = Math.PI * (3 - Math.sqrt(5));
function simulation_default(nodes) {
  var simulation, alpha = 1, alphaMin = 1e-3, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = map_default(), stepper = timer(step), event2 = dispatch_default2("tick", "end");
  if (nodes == null) nodes = [];
  function step() {
    tick();
    event2.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event2.call("end", simulation);
    }
  }
  function tick(iterations) {
    var i, n = nodes.length, node;
    if (iterations === void 0) iterations = 1;
    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;
      forces.each(function(force) {
        force(alpha);
      });
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        if (node.fx == null) node.x += node.vx *= velocityDecay;
        else node.x = node.fx, node.vx = 0;
        if (node.fy == null) node.y += node.vy *= velocityDecay;
        else node.y = node.fy, node.vy = 0;
      }
    }
    return simulation;
  }
  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }
  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes);
    return force;
  }
  initializeNodes();
  return simulation = {
    tick,
    restart: function() {
      return stepper.restart(step), simulation;
    },
    stop: function() {
      return stepper.stop(), simulation;
    },
    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.each(initializeForce), simulation) : nodes;
    },
    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },
    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },
    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },
    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },
    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },
    force: function(name, _) {
      return arguments.length > 1 ? (_ == null ? forces.remove(name) : forces.set(name, initializeForce(_)), simulation) : forces.get(name);
    },
    find: function(x3, y3, radius) {
      var i = 0, n = nodes.length, dx, dy, d2, node, closest;
      if (radius == null) radius = Infinity;
      else radius *= radius;
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x3 - node.x;
        dy = y3 - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }
      return closest;
    },
    on: function(name, _) {
      return arguments.length > 1 ? (event2.on(name, _), simulation) : event2.on(name);
    }
  };
}

// node_modules/d3-force/src/manyBody.js
function manyBody_default() {
  var nodes, node, alpha, strength = constant_default2(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = 0.81;
  function force(_) {
    var i, n = nodes.length, tree = quadtree(nodes, x2, y2).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node2;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node2 = nodes[i], strengths[node2.index] = +strength(node2, i, nodes);
  }
  function accumulate(quad) {
    var strength2 = 0, q, c, weight = 0, x3, y3, i;
    if (quad.length) {
      for (x3 = y3 = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c = Math.abs(q.value))) {
          strength2 += q.value, weight += c, x3 += c * q.x, y3 += c * q.y;
        }
      }
      quad.x = x3 / weight;
      quad.y = y3 / weight;
    } else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do
        strength2 += strengths[q.data.index];
      while (q = q.next);
    }
    quad.value = strength2;
  }
  function apply(quad, x1, _, x22) {
    if (!quad.value) return true;
    var x3 = quad.x - node.x, y3 = quad.y - node.y, w = x22 - x1, l = x3 * x3 + y3 * y3;
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x3 === 0) x3 = jiggle_default(), l += x3 * x3;
        if (y3 === 0) y3 = jiggle_default(), l += y3 * y3;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        node.vx += x3 * quad.value * alpha / l;
        node.vy += y3 * quad.value * alpha / l;
      }
      return true;
    } else if (quad.length || l >= distanceMax2) return;
    if (quad.data !== node || quad.next) {
      if (x3 === 0) x3 = jiggle_default(), l += x3 * x3;
      if (y3 === 0) y3 = jiggle_default(), l += y3 * y3;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }
    do
      if (quad.data !== node) {
        w = strengths[quad.data.index] * alpha / l;
        node.vx += x3 * w;
        node.vy += y3 * w;
      }
    while (quad = quad.next);
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default2(+_), initialize(), force) : strength;
  };
  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };
  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };
  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };
  return force;
}

// node_modules/d3-force/src/radial.js
function radial_default(radius, x3, y3) {
  var nodes, strength = constant_default2(0.1), strengths, radiuses;
  if (typeof radius !== "function") radius = constant_default2(+radius);
  if (x3 == null) x3 = 0;
  if (y3 == null) y3 = 0;
  function force(alpha) {
    for (var i = 0, n = nodes.length; i < n; ++i) {
      var node = nodes[i], dx = node.x - x3 || 1e-6, dy = node.y - y3 || 1e-6, r = Math.sqrt(dx * dx + dy * dy), k = (radiuses[i] - r) * strengths[i] * alpha / r;
      node.vx += dx * k;
      node.vy += dy * k;
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    radiuses = new Array(n);
    for (i = 0; i < n; ++i) {
      radiuses[i] = +radius(nodes[i], i, nodes);
      strengths[i] = isNaN(radiuses[i]) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _, initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default2(+_), initialize(), force) : strength;
  };
  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default2(+_), initialize(), force) : radius;
  };
  force.x = function(_) {
    return arguments.length ? (x3 = +_, force) : x3;
  };
  force.y = function(_) {
    return arguments.length ? (y3 = +_, force) : y3;
  };
  return force;
}

// node_modules/d3-force/src/x.js
function x_default2(x3) {
  var strength = constant_default2(0.1), nodes, strengths, xz;
  if (typeof x3 !== "function") x3 = constant_default2(x3 == null ? 0 : +x3);
  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    xz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(xz[i] = +x3(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default2(+_), initialize(), force) : strength;
  };
  force.x = function(_) {
    return arguments.length ? (x3 = typeof _ === "function" ? _ : constant_default2(+_), initialize(), force) : x3;
  };
  return force;
}

// node_modules/d3-force/src/y.js
function y_default2(y3) {
  var strength = constant_default2(0.1), nodes, strengths, yz;
  if (typeof y3 !== "function") y3 = constant_default2(y3 == null ? 0 : +y3);
  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    yz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(yz[i] = +y3(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default2(+_), initialize(), force) : strength;
  };
  force.y = function(_) {
    return arguments.length ? (y3 = typeof _ === "function" ? _ : constant_default2(+_), initialize(), force) : y3;
  };
  return force;
}

// node_modules/@swimlane/ngx-graph/fesm2020/swimlane-ngx-graph.mjs
var import_webcola = __toESM(require_dist(), 1);

// node_modules/@swimlane/ngx-graph/node_modules/d3-dispatch/src/index.js
var src_exports2 = {};
__export(src_exports2, {
  dispatch: () => dispatch_default3
});

// node_modules/@swimlane/ngx-graph/node_modules/d3-dispatch/src/dispatch.js
var noop2 = {
  value: function() {
  }
};
function dispatch2() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch2(_);
}
function Dispatch2(_) {
  this._ = _;
}
function parseTypenames3(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {
      type: t,
      name
    };
  });
}
Dispatch2.prototype = dispatch2.prototype = {
  constructor: Dispatch2,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames3(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get2(_[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set3(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set3(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy3 = {}, _ = this._;
    for (var t in _) copy3[t] = _[t].slice();
    return new Dispatch2(copy3);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get2(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}
function set3(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop2, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({
    name,
    value: callback
  });
  return type;
}
var dispatch_default3 = dispatch2;

// node_modules/@swimlane/ngx-graph/node_modules/d3-timer/src/index.js
var src_exports3 = {};
__export(src_exports3, {
  interval: () => interval_default2,
  now: () => now2,
  timeout: () => timeout_default2,
  timer: () => timer2,
  timerFlush: () => timerFlush2
});

// node_modules/@swimlane/ngx-graph/node_modules/d3-timer/src/timer.js
var frame2 = 0;
var timeout2 = 0;
var interval2 = 0;
var pokeDelay2 = 1e3;
var taskHead2;
var taskTail2;
var clockLast2 = 0;
var clockNow2 = 0;
var clockSkew2 = 0;
var clock2 = typeof performance === "object" && performance.now ? performance : Date;
var setFrame2 = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now2() {
  return clockNow2 || (setFrame2(clearNow2), clockNow2 = clock2.now() + clockSkew2);
}
function clearNow2() {
  clockNow2 = 0;
}
function Timer2() {
  this._call = this._time = this._next = null;
}
Timer2.prototype = timer2.prototype = {
  constructor: Timer2,
  restart: function(callback, delay, time2) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time2 = (time2 == null ? now2() : +time2) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail2 !== this) {
      if (taskTail2) taskTail2._next = this;
      else taskHead2 = this;
      taskTail2 = this;
    }
    this._call = callback;
    this._time = time2;
    sleep2();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep2();
    }
  }
};
function timer2(callback, delay, time2) {
  var t = new Timer2();
  t.restart(callback, delay, time2);
  return t;
}
function timerFlush2() {
  now2();
  ++frame2;
  var t = taskHead2, e;
  while (t) {
    if ((e = clockNow2 - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame2;
}
function wake2() {
  clockNow2 = (clockLast2 = clock2.now()) + clockSkew2;
  frame2 = timeout2 = 0;
  try {
    timerFlush2();
  } finally {
    frame2 = 0;
    nap2();
    clockNow2 = 0;
  }
}
function poke2() {
  var now3 = clock2.now(), delay = now3 - clockLast2;
  if (delay > pokeDelay2) clockSkew2 -= delay, clockLast2 = now3;
}
function nap2() {
  var t0, t1 = taskHead2, t2, time2 = Infinity;
  while (t1) {
    if (t1._call) {
      if (time2 > t1._time) time2 = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead2 = t2;
    }
  }
  taskTail2 = t0;
  sleep2(time2);
}
function sleep2(time2) {
  if (frame2) return;
  if (timeout2) timeout2 = clearTimeout(timeout2);
  var delay = time2 - clockNow2;
  if (delay > 24) {
    if (time2 < Infinity) timeout2 = setTimeout(wake2, time2 - clock2.now() - clockSkew2);
    if (interval2) interval2 = clearInterval(interval2);
  } else {
    if (!interval2) clockLast2 = clock2.now(), interval2 = setInterval(poke2, pokeDelay2);
    frame2 = 1, setFrame2(wake2);
  }
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-timer/src/timeout.js
function timeout_default2(callback, delay, time2) {
  var t = new Timer2();
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time2);
  return t;
}

// node_modules/@swimlane/ngx-graph/node_modules/d3-timer/src/interval.js
function interval_default2(callback, delay, time2) {
  var t = new Timer2(), total = delay;
  if (delay == null) return t.restart(callback, delay, time2), t;
  delay = +delay, time2 = time2 == null ? now2() : +time2;
  t.restart(function tick(elapsed) {
    elapsed += total;
    t.restart(tick, total += delay, time2);
    callback(elapsed);
  }, delay, time2);
  return t;
}

// node_modules/@swimlane/ngx-graph/fesm2020/swimlane-ngx-graph.mjs
var _c0 = ["linkTemplate"];
var _c1 = ["nodeTemplate"];
var _c2 = ["clusterTemplate"];
var _c3 = ["defsTemplate"];
var _c4 = ["miniMapNodeTemplate"];
var _c5 = ["nodeElement"];
var _c6 = ["linkElement"];
var _c7 = ["*"];
var _c8 = (a0) => ({
  $implicit: a0
});
function GraphComponent__svg_g_2__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 18);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.defsTemplate);
  }
}
function GraphComponent__svg_g_2__svg_path_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "path", 19);
  }
  if (rf & 2) {
    const link_r3 = ctx.$implicit;
    ɵɵattribute("d", link_r3.textPath)("id", link_r3.id);
  }
}
function GraphComponent__svg_g_2__svg_g_7__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 23);
  }
  if (rf & 2) {
    const node_r5 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.clusterTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, node_r5));
  }
}
function GraphComponent__svg_g_2__svg_g_7__svg_g_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 24);
    ɵɵelement(1, "rect");
    ɵɵelementStart(2, "text", 25);
    ɵɵtext(3);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const node_r5 = ɵɵnextContext().$implicit;
    ɵɵadvance();
    ɵɵattribute("width", node_r5.dimension.width)("height", node_r5.dimension.height)("fill", node_r5.data == null ? null : node_r5.data.color);
    ɵɵadvance();
    ɵɵattribute("x", 10)("y", node_r5.dimension.height / 2);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", node_r5.label, " ");
  }
}
function GraphComponent__svg_g_2__svg_g_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 20, 0);
    ɵɵlistener("click", function GraphComponent__svg_g_2__svg_g_7_Template_g_click_0_listener() {
      const node_r5 = ɵɵrestoreView(_r4).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onClick(node_r5));
    });
    ɵɵtemplate(2, GraphComponent__svg_g_2__svg_g_7__svg_ng_container_2_Template, 1, 4, "ng-container", 21)(3, GraphComponent__svg_g_2__svg_g_7__svg_g_3_Template, 4, 6, "g", 22);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const node_r5 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassProp("old-node", ctx_r1.animate && ctx_r1.oldClusters.has(node_r5.id));
    ɵɵproperty("id", node_r5.id);
    ɵɵattribute("transform", node_r5.transform);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.clusterTemplate && !node_r5.hidden);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.clusterTemplate);
  }
}
function GraphComponent__svg_g_2__svg_g_9__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 23);
  }
  if (rf & 2) {
    const node_r7 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.nodeTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, node_r7));
  }
}
function GraphComponent__svg_g_2__svg_g_9__svg_g_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 28);
    ɵɵelement(1, "rect");
    ɵɵelementStart(2, "text", 25);
    ɵɵtext(3);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const node_r7 = ɵɵnextContext().$implicit;
    ɵɵadvance();
    ɵɵattribute("width", node_r7.dimension.width)("height", node_r7.dimension.height)("fill", node_r7.data == null ? null : node_r7.data.color);
    ɵɵadvance();
    ɵɵattribute("x", 10)("y", node_r7.dimension.height / 2);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", node_r7.label, " ");
  }
}
function GraphComponent__svg_g_2__svg_g_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 26, 1);
    ɵɵlistener("click", function GraphComponent__svg_g_2__svg_g_9_Template_g_click_0_listener() {
      const node_r7 = ɵɵrestoreView(_r6).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onClick(node_r7));
    })("mousedown", function GraphComponent__svg_g_2__svg_g_9_Template_g_mousedown_0_listener($event) {
      const node_r7 = ɵɵrestoreView(_r6).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onNodeMouseDown($event, node_r7));
    });
    ɵɵtemplate(2, GraphComponent__svg_g_2__svg_g_9__svg_ng_container_2_Template, 1, 4, "ng-container", 21)(3, GraphComponent__svg_g_2__svg_g_9__svg_g_3_Template, 4, 6, "g", 27);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const node_r7 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassProp("old-node", ctx_r1.animate && ctx_r1.oldCompoundNodes.has(node_r7.id));
    ɵɵproperty("id", node_r7.id);
    ɵɵattribute("transform", node_r7.transform);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.nodeTemplate && !node_r7.hidden);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.nodeTemplate);
  }
}
function GraphComponent__svg_g_2__svg_g_11__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 23);
  }
  if (rf & 2) {
    const link_r8 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.linkTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, link_r8));
  }
}
function GraphComponent__svg_g_2__svg_g_11__svg_path_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "path", 31);
  }
  if (rf & 2) {
    const link_r8 = ɵɵnextContext().$implicit;
    ɵɵattribute("d", link_r8.line);
  }
}
function GraphComponent__svg_g_2__svg_g_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 29, 2);
    ɵɵtemplate(2, GraphComponent__svg_g_2__svg_g_11__svg_ng_container_2_Template, 1, 4, "ng-container", 21)(3, GraphComponent__svg_g_2__svg_g_11__svg_path_3_Template, 1, 1, "path", 30);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const link_r8 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("id", link_r8.id);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.linkTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.linkTemplate);
  }
}
function GraphComponent__svg_g_2__svg_g_13__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 23);
  }
  if (rf & 2) {
    const node_r10 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.nodeTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, node_r10));
  }
}
function GraphComponent__svg_g_2__svg_g_13__svg_circle_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "circle", 33);
  }
  if (rf & 2) {
    const node_r10 = ɵɵnextContext().$implicit;
    ɵɵattribute("cx", node_r10.dimension.width / 2)("cy", node_r10.dimension.height / 2)("fill", node_r10.data == null ? null : node_r10.data.color);
  }
}
function GraphComponent__svg_g_2__svg_g_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 26, 1);
    ɵɵlistener("click", function GraphComponent__svg_g_2__svg_g_13_Template_g_click_0_listener() {
      const node_r10 = ɵɵrestoreView(_r9).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onClick(node_r10));
    })("mousedown", function GraphComponent__svg_g_2__svg_g_13_Template_g_mousedown_0_listener($event) {
      const node_r10 = ɵɵrestoreView(_r9).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onNodeMouseDown($event, node_r10));
    });
    ɵɵtemplate(2, GraphComponent__svg_g_2__svg_g_13__svg_ng_container_2_Template, 1, 4, "ng-container", 21)(3, GraphComponent__svg_g_2__svg_g_13__svg_circle_3_Template, 1, 3, "circle", 32);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const node_r10 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassProp("old-node", ctx_r1.animate && ctx_r1.oldNodes.has(node_r10.id));
    ɵɵproperty("id", node_r10.id);
    ɵɵattribute("transform", node_r10.transform);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.nodeTemplate && !node_r10.hidden);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.nodeTemplate);
  }
}
function GraphComponent__svg_g_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 7);
    ɵɵlistener("touchstart", function GraphComponent__svg_g_2_Template_g_touchstart_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onTouchStart($event));
    })("touchend", function GraphComponent__svg_g_2_Template_g_touchend_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onTouchEnd($event));
    });
    ɵɵelementStart(1, "defs");
    ɵɵtemplate(2, GraphComponent__svg_g_2__svg_ng_container_2_Template, 1, 1, "ng-container", 8)(3, GraphComponent__svg_g_2__svg_path_3_Template, 1, 2, "path", 9);
    ɵɵelementEnd();
    ɵɵelementStart(4, "rect", 10);
    ɵɵlistener("mousedown", function GraphComponent__svg_g_2_Template_rect_mousedown_4_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.isPanning = true);
    });
    ɵɵelementEnd();
    ɵɵprojection(5);
    ɵɵelementStart(6, "g", 11);
    ɵɵtemplate(7, GraphComponent__svg_g_2__svg_g_7_Template, 4, 6, "g", 12);
    ɵɵelementEnd();
    ɵɵelementStart(8, "g", 13);
    ɵɵtemplate(9, GraphComponent__svg_g_2__svg_g_9_Template, 4, 6, "g", 14);
    ɵɵelementEnd();
    ɵɵelementStart(10, "g", 15);
    ɵɵtemplate(11, GraphComponent__svg_g_2__svg_g_11_Template, 4, 3, "g", 16);
    ɵɵelementEnd();
    ɵɵelementStart(12, "g", 17);
    ɵɵtemplate(13, GraphComponent__svg_g_2__svg_g_13_Template, 4, 6, "g", 14);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵattribute("transform", ctx_r1.transform);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.defsTemplate);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.graph.edges);
    ɵɵadvance();
    ɵɵattribute("width", ctx_r1.dims.width * 100)("height", ctx_r1.dims.height * 100)("transform", "translate(" + (-ctx_r1.dims.width || 0) * 50 + "," + (-ctx_r1.dims.height || 0) * 50 + ")");
    ɵɵadvance(3);
    ɵɵproperty("ngForOf", ctx_r1.graph.clusters)("ngForTrackBy", ctx_r1.trackNodeBy);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.graph.compoundNodes)("ngForTrackBy", ctx_r1.trackNodeBy);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.graph.edges)("ngForTrackBy", ctx_r1.trackLinkBy);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.graph.nodes)("ngForTrackBy", ctx_r1.trackNodeBy);
  }
}
function GraphComponent__svg_g_5__svg_g_4__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 23);
  }
  if (rf & 2) {
    const node_r12 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.miniMapNodeTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, node_r12));
  }
}
function GraphComponent__svg_g_5__svg_g_4__svg_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 23);
  }
  if (rf & 2) {
    const node_r12 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.nodeTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, node_r12));
  }
}
function GraphComponent__svg_g_5__svg_g_4__svg_circle_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "circle", 33);
  }
  if (rf & 2) {
    const node_r12 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵattribute("cx", node_r12.dimension.width / 2 / ctx_r1.minimapScaleCoefficient)("cy", node_r12.dimension.height / 2 / ctx_r1.minimapScaleCoefficient)("fill", node_r12.data == null ? null : node_r12.data.color);
  }
}
function GraphComponent__svg_g_5__svg_g_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 39, 1);
    ɵɵtemplate(2, GraphComponent__svg_g_5__svg_g_4__svg_ng_container_2_Template, 1, 4, "ng-container", 21)(3, GraphComponent__svg_g_5__svg_g_4__svg_ng_container_3_Template, 1, 4, "ng-container", 21)(4, GraphComponent__svg_g_5__svg_g_4__svg_circle_4_Template, 1, 3, "circle", 32);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const node_r12 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassProp("old-node", ctx_r1.animate && ctx_r1.oldNodes.has(node_r12.id));
    ɵɵproperty("id", node_r12.id);
    ɵɵattribute("transform", node_r12.transform);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.miniMapNodeTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.miniMapNodeTemplate && ctx_r1.nodeTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.nodeTemplate && !ctx_r1.miniMapNodeTemplate);
  }
}
function GraphComponent__svg_g_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 34)(1, "rect", 35);
    ɵɵlistener("mousedown", function GraphComponent__svg_g_5_Template_rect_mousedown_1_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onMinimapPanTo($event));
    });
    ɵɵelementEnd();
    ɵɵelementStart(2, "g")(3, "g", 36);
    ɵɵtemplate(4, GraphComponent__svg_g_5__svg_g_4_Template, 5, 7, "g", 37);
    ɵɵelementEnd();
    ɵɵelementStart(5, "rect", 38);
    ɵɵlistener("mousedown", function GraphComponent__svg_g_5_Template_rect_mousedown_5_listener() {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onMinimapDragMouseDown());
    });
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵattribute("transform", ctx_r1.minimapTransform)("clip-path", "url(#" + ctx_r1.minimapClipPathId + ")");
    ɵɵadvance();
    ɵɵattribute("width", ctx_r1.graphDims.width / ctx_r1.minimapScaleCoefficient)("height", ctx_r1.graphDims.height / ctx_r1.minimapScaleCoefficient);
    ɵɵadvance();
    ɵɵstyleProp("transform", "translate(" + -ctx_r1.minimapOffsetX / ctx_r1.minimapScaleCoefficient + "px," + -ctx_r1.minimapOffsetY / ctx_r1.minimapScaleCoefficient + "px)");
    ɵɵadvance();
    ɵɵstyleProp("transform", "scale(" + 1 / ctx_r1.minimapScaleCoefficient + ")");
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.graph.nodes)("ngForTrackBy", ctx_r1.trackNodeBy);
    ɵɵadvance();
    ɵɵclassProp("panning", ctx_r1.isMinimapPanning);
    ɵɵattribute("transform", "translate(" + ctx_r1.panOffsetX / ctx_r1.zoomLevel / -ctx_r1.minimapScaleCoefficient + "," + ctx_r1.panOffsetY / ctx_r1.zoomLevel / -ctx_r1.minimapScaleCoefficient + ")")("width", ctx_r1.width / ctx_r1.minimapScaleCoefficient / ctx_r1.zoomLevel)("height", ctx_r1.height / ctx_r1.minimapScaleCoefficient / ctx_r1.zoomLevel);
  }
}
var cache = {};
function id() {
  let newId = ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
  newId = `a${newId}`;
  if (!cache[newId]) {
    cache[newId] = true;
    return newId;
  }
  return id();
}
var PanningAxis;
(function(PanningAxis2) {
  PanningAxis2["Both"] = "both";
  PanningAxis2["Horizontal"] = "horizontal";
  PanningAxis2["Vertical"] = "vertical";
})(PanningAxis || (PanningAxis = {}));
var MiniMapPosition;
(function(MiniMapPosition2) {
  MiniMapPosition2["UpperLeft"] = "UpperLeft";
  MiniMapPosition2["UpperRight"] = "UpperRight";
})(MiniMapPosition || (MiniMapPosition = {}));
function throttle(func, wait, options) {
  options = options || {};
  let context;
  let args;
  let result;
  let timeout3 = null;
  let previous = 0;
  function later() {
    previous = options.leading === false ? 0 : +/* @__PURE__ */ new Date();
    timeout3 = null;
    result = func.apply(context, args);
  }
  return function(..._arguments) {
    const now3 = +/* @__PURE__ */ new Date();
    if (!previous && options.leading === false) {
      previous = now3;
    }
    const remaining = wait - (now3 - previous);
    context = this;
    args = _arguments;
    if (remaining <= 0) {
      clearTimeout(timeout3);
      timeout3 = null;
      previous = now3;
      result = func.apply(context, args);
    } else if (!timeout3 && options.trailing !== false) {
      timeout3 = setTimeout(later, remaining);
    }
    return result;
  };
}
function throttleable(duration, options) {
  return function innerDecorator(target, key, descriptor) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: throttle(descriptor.value, duration, options)
        });
        return this[key];
      }
    };
  };
}
var colorSets = [{
  name: "vivid",
  selectable: true,
  group: "Ordinal",
  domain: ["#647c8a", "#3f51b5", "#2196f3", "#00b862", "#afdf0a", "#a7b61a", "#f3e562", "#ff9800", "#ff5722", "#ff4514"]
}, {
  name: "natural",
  selectable: true,
  group: "Ordinal",
  domain: ["#bf9d76", "#e99450", "#d89f59", "#f2dfa7", "#a5d7c6", "#7794b1", "#afafaf", "#707160", "#ba9383", "#d9d5c3"]
}, {
  name: "cool",
  selectable: true,
  group: "Ordinal",
  domain: ["#a8385d", "#7aa3e5", "#a27ea8", "#aae3f5", "#adcded", "#a95963", "#8796c0", "#7ed3ed", "#50abcc", "#ad6886"]
}, {
  name: "fire",
  selectable: true,
  group: "Ordinal",
  domain: ["#ff3d00", "#bf360c", "#ff8f00", "#ff6f00", "#ff5722", "#e65100", "#ffca28", "#ffab00"]
}, {
  name: "solar",
  selectable: true,
  group: "Continuous",
  domain: ["#fff8e1", "#ffecb3", "#ffe082", "#ffd54f", "#ffca28", "#ffc107", "#ffb300", "#ffa000", "#ff8f00", "#ff6f00"]
}, {
  name: "air",
  selectable: true,
  group: "Continuous",
  domain: ["#e1f5fe", "#b3e5fc", "#81d4fa", "#4fc3f7", "#29b6f6", "#03a9f4", "#039be5", "#0288d1", "#0277bd", "#01579b"]
}, {
  name: "aqua",
  selectable: true,
  group: "Continuous",
  domain: ["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f", "#006064"]
}, {
  name: "flame",
  selectable: false,
  group: "Ordinal",
  domain: ["#A10A28", "#D3342D", "#EF6D49", "#FAAD67", "#FDDE90", "#DBED91", "#A9D770", "#6CBA67", "#2C9653", "#146738"]
}, {
  name: "ocean",
  selectable: false,
  group: "Ordinal",
  domain: ["#1D68FB", "#33C0FC", "#4AFFFE", "#AFFFFF", "#FFFC63", "#FDBD2D", "#FC8A25", "#FA4F1E", "#FA141B", "#BA38D1"]
}, {
  name: "forest",
  selectable: false,
  group: "Ordinal",
  domain: ["#55C22D", "#C1F33D", "#3CC099", "#AFFFFF", "#8CFC9D", "#76CFFA", "#BA60FB", "#EE6490", "#C42A1C", "#FC9F32"]
}, {
  name: "horizon",
  selectable: false,
  group: "Ordinal",
  domain: ["#2597FB", "#65EBFD", "#99FDD0", "#FCEE4B", "#FEFCFA", "#FDD6E3", "#FCB1A8", "#EF6F7B", "#CB96E8", "#EFDEE0"]
}, {
  name: "neons",
  selectable: false,
  group: "Ordinal",
  domain: ["#FF3333", "#FF33FF", "#CC33FF", "#0000FF", "#33CCFF", "#33FFFF", "#33FF66", "#CCFF33", "#FFCC00", "#FF6600"]
}, {
  name: "picnic",
  selectable: false,
  group: "Ordinal",
  domain: ["#FAC51D", "#66BD6D", "#FAA026", "#29BB9C", "#E96B56", "#55ACD2", "#B7332F", "#2C83C9", "#9166B8", "#92E7E8"]
}, {
  name: "night",
  selectable: false,
  group: "Ordinal",
  domain: ["#2B1B5A", "#501356", "#183356", "#28203F", "#391B3C", "#1E2B3C", "#120634", "#2D0432", "#051932", "#453080", "#75267D", "#2C507D", "#4B3880", "#752F7D", "#35547D"]
}, {
  name: "nightLights",
  selectable: false,
  group: "Ordinal",
  domain: ["#4e31a5", "#9c25a7", "#3065ab", "#57468b", "#904497", "#46648b", "#32118d", "#a00fb3", "#1052a2", "#6e51bd", "#b63cc3", "#6c97cb", "#8671c1", "#b455be", "#7496c3"]
}];
var ColorHelper = class {
  constructor(scheme, domain, customColors) {
    if (typeof scheme === "string") {
      scheme = colorSets.find((cs) => {
        return cs.name === scheme;
      });
    }
    this.colorDomain = scheme.domain;
    this.domain = domain;
    this.customColors = customColors;
    this.scale = this.generateColorScheme(scheme, this.domain);
  }
  generateColorScheme(scheme, domain) {
    if (typeof scheme === "string") {
      scheme = colorSets.find((cs) => {
        return cs.name === scheme;
      });
    }
    return ordinal().range(scheme.domain).domain(domain);
  }
  getColor(value) {
    if (value === void 0 || value === null) {
      throw new Error("Value can not be null");
    }
    if (typeof this.customColors === "function") {
      return this.customColors(value);
    }
    const formattedValue = value.toString();
    let found;
    if (this.customColors && this.customColors.length > 0) {
      found = this.customColors.find((mapping) => {
        return mapping.name.toLowerCase() === formattedValue.toLowerCase();
      });
    }
    if (found) {
      return found.value;
    } else {
      return this.scale(value);
    }
  }
};
function calculateViewDimensions({
  width,
  height
}) {
  let chartWidth = width;
  let chartHeight = height;
  chartWidth = Math.max(0, chartWidth);
  chartHeight = Math.max(0, chartHeight);
  return {
    width: Math.floor(chartWidth),
    height: Math.floor(chartHeight)
  };
}
var VisibilityObserver = class {
  constructor(element, zone) {
    this.element = element;
    this.zone = zone;
    this.visible = new EventEmitter();
    this.isVisible = false;
    this.runCheck();
  }
  destroy() {
    clearTimeout(this.timeout);
  }
  onVisibilityChange() {
    this.zone.run(() => {
      this.isVisible = true;
      this.visible.emit(true);
    });
  }
  runCheck() {
    const check = () => {
      if (!this.element) {
        return;
      }
      const {
        offsetHeight,
        offsetWidth
      } = this.element.nativeElement;
      if (offsetHeight && offsetWidth) {
        clearTimeout(this.timeout);
        this.onVisibilityChange();
      } else {
        clearTimeout(this.timeout);
        this.zone.runOutsideAngular(() => {
          this.timeout = setTimeout(() => check(), 100);
        });
      }
    };
    this.zone.runOutsideAngular(() => {
      this.timeout = setTimeout(() => check());
    });
  }
};
VisibilityObserver.ɵfac = function VisibilityObserver_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || VisibilityObserver)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
VisibilityObserver.ɵdir = ɵɵdefineDirective({
  type: VisibilityObserver,
  selectors: [["visibility-observer"]],
  outputs: {
    visible: "visible"
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VisibilityObserver, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "visibility-observer"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, {
    visible: [{
      type: Output
    }]
  });
})();
var Orientation;
(function(Orientation2) {
  Orientation2["LEFT_TO_RIGHT"] = "LR";
  Orientation2["RIGHT_TO_LEFT"] = "RL";
  Orientation2["TOP_TO_BOTTOM"] = "TB";
  Orientation2["BOTTOM_TO_TOM"] = "BT";
})(Orientation || (Orientation = {}));
var Alignment;
(function(Alignment2) {
  Alignment2["CENTER"] = "C";
  Alignment2["UP_LEFT"] = "UL";
  Alignment2["UP_RIGHT"] = "UR";
  Alignment2["DOWN_LEFT"] = "DL";
  Alignment2["DOWN_RIGHT"] = "DR";
})(Alignment || (Alignment = {}));
var DagreLayout = class {
  constructor() {
    this.defaultSettings = {
      orientation: Orientation.LEFT_TO_RIGHT,
      marginX: 20,
      marginY: 20,
      edgePadding: 100,
      rankPadding: 100,
      nodePadding: 50,
      multigraph: true,
      compound: true
    };
    this.settings = {};
  }
  run(graph) {
    this.createDagreGraph(graph);
    dagre.layout(this.dagreGraph);
    graph.edgeLabels = this.dagreGraph._edgeLabels;
    for (const dagreNodeId in this.dagreGraph._nodes) {
      const dagreNode = this.dagreGraph._nodes[dagreNodeId];
      const node = graph.nodes.find((n) => n.id === dagreNode.id);
      node.position = {
        x: dagreNode.x,
        y: dagreNode.y
      };
      node.dimension = {
        width: dagreNode.width,
        height: dagreNode.height
      };
    }
    return graph;
  }
  updateEdge(graph, edge) {
    const sourceNode = graph.nodes.find((n) => n.id === edge.source);
    const targetNode = graph.nodes.find((n) => n.id === edge.target);
    const dir = sourceNode.position.y <= targetNode.position.y ? -1 : 1;
    const startingPoint = {
      x: sourceNode.position.x,
      y: sourceNode.position.y - dir * (sourceNode.dimension.height / 2)
    };
    const endingPoint = {
      x: targetNode.position.x,
      y: targetNode.position.y + dir * (targetNode.dimension.height / 2)
    };
    edge.points = [startingPoint, endingPoint];
    return graph;
  }
  createDagreGraph(graph) {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    this.dagreGraph = new dagre.graphlib.Graph({
      compound: settings.compound,
      multigraph: settings.multigraph
    });
    this.dagreGraph.setGraph({
      rankdir: settings.orientation,
      marginx: settings.marginX,
      marginy: settings.marginY,
      edgesep: settings.edgePadding,
      ranksep: settings.rankPadding,
      nodesep: settings.nodePadding,
      align: settings.align,
      acyclicer: settings.acyclicer,
      ranker: settings.ranker,
      multigraph: settings.multigraph,
      compound: settings.compound
    });
    this.dagreGraph.setDefaultEdgeLabel(() => {
      return {
        /* empty */
      };
    });
    this.dagreNodes = graph.nodes.map((n) => {
      const node = Object.assign({}, n);
      node.width = n.dimension.width;
      node.height = n.dimension.height;
      node.x = n.position.x;
      node.y = n.position.y;
      return node;
    });
    this.dagreEdges = graph.edges.map((l) => {
      const newLink = Object.assign({}, l);
      if (!newLink.id) {
        newLink.id = id();
      }
      return newLink;
    });
    for (const node of this.dagreNodes) {
      if (!node.width) {
        node.width = 20;
      }
      if (!node.height) {
        node.height = 30;
      }
      this.dagreGraph.setNode(node.id, node);
    }
    for (const edge of this.dagreEdges) {
      if (settings.multigraph) {
        this.dagreGraph.setEdge(edge.source, edge.target, edge, edge.id);
      } else {
        this.dagreGraph.setEdge(edge.source, edge.target);
      }
    }
    return this.dagreGraph;
  }
};
var DagreClusterLayout = class {
  constructor() {
    this.defaultSettings = {
      orientation: Orientation.LEFT_TO_RIGHT,
      marginX: 20,
      marginY: 20,
      edgePadding: 100,
      rankPadding: 100,
      nodePadding: 50,
      multigraph: true,
      compound: true
    };
    this.settings = {};
  }
  run(graph) {
    this.createDagreGraph(graph);
    dagre.layout(this.dagreGraph);
    graph.edgeLabels = this.dagreGraph._edgeLabels;
    const dagreToOutput = (node) => {
      const dagreNode = this.dagreGraph._nodes[node.id];
      return __spreadProps(__spreadValues({}, node), {
        position: {
          x: dagreNode.x,
          y: dagreNode.y
        },
        dimension: {
          width: dagreNode.width,
          height: dagreNode.height
        }
      });
    };
    graph.clusters = (graph.clusters || []).map(dagreToOutput);
    graph.nodes = graph.nodes.map(dagreToOutput);
    return graph;
  }
  updateEdge(graph, edge) {
    const sourceNode = graph.nodes.find((n) => n.id === edge.source);
    const targetNode = graph.nodes.find((n) => n.id === edge.target);
    const dir = sourceNode.position.y <= targetNode.position.y ? -1 : 1;
    const startingPoint = {
      x: sourceNode.position.x,
      y: sourceNode.position.y - dir * (sourceNode.dimension.height / 2)
    };
    const endingPoint = {
      x: targetNode.position.x,
      y: targetNode.position.y + dir * (targetNode.dimension.height / 2)
    };
    edge.points = [startingPoint, endingPoint];
    return graph;
  }
  createDagreGraph(graph) {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    this.dagreGraph = new dagre.graphlib.Graph({
      compound: settings.compound,
      multigraph: settings.multigraph
    });
    this.dagreGraph.setGraph({
      rankdir: settings.orientation,
      marginx: settings.marginX,
      marginy: settings.marginY,
      edgesep: settings.edgePadding,
      ranksep: settings.rankPadding,
      nodesep: settings.nodePadding,
      align: settings.align,
      acyclicer: settings.acyclicer,
      ranker: settings.ranker,
      multigraph: settings.multigraph,
      compound: settings.compound
    });
    this.dagreGraph.setDefaultEdgeLabel(() => {
      return {
        /* empty */
      };
    });
    this.dagreNodes = graph.nodes.map((n) => {
      const node = Object.assign({}, n);
      node.width = n.dimension.width;
      node.height = n.dimension.height;
      node.x = n.position.x;
      node.y = n.position.y;
      return node;
    });
    this.dagreClusters = graph.clusters || [];
    this.dagreEdges = graph.edges.map((l) => {
      const newLink = Object.assign({}, l);
      if (!newLink.id) {
        newLink.id = id();
      }
      return newLink;
    });
    for (const node of this.dagreNodes) {
      this.dagreGraph.setNode(node.id, node);
    }
    for (const cluster of this.dagreClusters) {
      this.dagreGraph.setNode(cluster.id, cluster);
      cluster.childNodeIds.forEach((childNodeId) => {
        this.dagreGraph.setParent(childNodeId, cluster.id);
      });
    }
    for (const edge of this.dagreEdges) {
      if (settings.multigraph) {
        this.dagreGraph.setEdge(edge.source, edge.target, edge, edge.id);
      } else {
        this.dagreGraph.setEdge(edge.source, edge.target);
      }
    }
    return this.dagreGraph;
  }
};
var DEFAULT_EDGE_NAME = "\0";
var EDGE_KEY_DELIM = "";
var DagreNodesOnlyLayout = class {
  constructor() {
    this.defaultSettings = {
      orientation: Orientation.LEFT_TO_RIGHT,
      marginX: 20,
      marginY: 20,
      edgePadding: 100,
      rankPadding: 100,
      nodePadding: 50,
      curveDistance: 20,
      multigraph: true,
      compound: true
    };
    this.settings = {};
  }
  run(graph) {
    this.createDagreGraph(graph);
    dagre.layout(this.dagreGraph);
    graph.edgeLabels = this.dagreGraph._edgeLabels;
    for (const dagreNodeId in this.dagreGraph._nodes) {
      const dagreNode = this.dagreGraph._nodes[dagreNodeId];
      const node = graph.nodes.find((n) => n.id === dagreNode.id);
      node.position = {
        x: dagreNode.x,
        y: dagreNode.y
      };
      node.dimension = {
        width: dagreNode.width,
        height: dagreNode.height
      };
    }
    for (const edge of graph.edges) {
      this.updateEdge(graph, edge);
    }
    return graph;
  }
  updateEdge(graph, edge) {
    const sourceNode = graph.nodes.find((n) => n.id === edge.source);
    const targetNode = graph.nodes.find((n) => n.id === edge.target);
    const rankAxis = this.settings.orientation === "BT" || this.settings.orientation === "TB" ? "y" : "x";
    const orderAxis = rankAxis === "y" ? "x" : "y";
    const rankDimension = rankAxis === "y" ? "height" : "width";
    const dir = sourceNode.position[rankAxis] <= targetNode.position[rankAxis] ? -1 : 1;
    const startingPoint = {
      [orderAxis]: sourceNode.position[orderAxis],
      [rankAxis]: sourceNode.position[rankAxis] - dir * (sourceNode.dimension[rankDimension] / 2)
    };
    const endingPoint = {
      [orderAxis]: targetNode.position[orderAxis],
      [rankAxis]: targetNode.position[rankAxis] + dir * (targetNode.dimension[rankDimension] / 2)
    };
    const curveDistance = this.settings.curveDistance || this.defaultSettings.curveDistance;
    edge.points = [startingPoint, {
      [orderAxis]: startingPoint[orderAxis],
      [rankAxis]: startingPoint[rankAxis] - dir * curveDistance
    }, {
      [orderAxis]: endingPoint[orderAxis],
      [rankAxis]: endingPoint[rankAxis] + dir * curveDistance
    }, endingPoint];
    const edgeLabelId = `${edge.source}${EDGE_KEY_DELIM}${edge.target}${EDGE_KEY_DELIM}${DEFAULT_EDGE_NAME}`;
    const matchingEdgeLabel = graph.edgeLabels[edgeLabelId];
    if (matchingEdgeLabel) {
      matchingEdgeLabel.points = edge.points;
    }
    return graph;
  }
  createDagreGraph(graph) {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    this.dagreGraph = new dagre.graphlib.Graph({
      compound: settings.compound,
      multigraph: settings.multigraph
    });
    this.dagreGraph.setGraph({
      rankdir: settings.orientation,
      marginx: settings.marginX,
      marginy: settings.marginY,
      edgesep: settings.edgePadding,
      ranksep: settings.rankPadding,
      nodesep: settings.nodePadding,
      align: settings.align,
      acyclicer: settings.acyclicer,
      ranker: settings.ranker,
      multigraph: settings.multigraph,
      compound: settings.compound
    });
    this.dagreGraph.setDefaultEdgeLabel(() => {
      return {
        /* empty */
      };
    });
    this.dagreNodes = graph.nodes.map((n) => {
      const node = Object.assign({}, n);
      node.width = n.dimension.width;
      node.height = n.dimension.height;
      node.x = n.position.x;
      node.y = n.position.y;
      return node;
    });
    this.dagreEdges = graph.edges.map((l) => {
      const newLink = Object.assign({}, l);
      if (!newLink.id) {
        newLink.id = id();
      }
      return newLink;
    });
    for (const node of this.dagreNodes) {
      if (!node.width) {
        node.width = 20;
      }
      if (!node.height) {
        node.height = 30;
      }
      this.dagreGraph.setNode(node.id, node);
    }
    for (const edge of this.dagreEdges) {
      if (settings.multigraph) {
        this.dagreGraph.setEdge(edge.source, edge.target, edge, edge.id);
      } else {
        this.dagreGraph.setEdge(edge.source, edge.target);
      }
    }
    return this.dagreGraph;
  }
};
function toD3Node(maybeNode) {
  if (typeof maybeNode === "string") {
    return {
      id: maybeNode,
      x: 0,
      y: 0
    };
  }
  return maybeNode;
}
var D3ForceDirectedLayout = class {
  constructor() {
    this.defaultSettings = {
      force: simulation_default().force("charge", manyBody_default().strength(-150)).force("collide", collide_default(5)),
      forceLink: link_default().id((node) => node.id).distance(() => 100)
    };
    this.settings = {};
    this.outputGraph$ = new Subject();
  }
  run(graph) {
    this.inputGraph = graph;
    this.d3Graph = {
      nodes: [...this.inputGraph.nodes.map((n) => __spreadValues({}, n))],
      edges: [...this.inputGraph.edges.map((e) => __spreadValues({}, e))]
    };
    this.outputGraph = {
      nodes: [],
      edges: [],
      edgeLabels: []
    };
    this.outputGraph$.next(this.outputGraph);
    this.settings = Object.assign({}, this.defaultSettings, this.settings);
    if (this.settings.force) {
      this.settings.force.nodes(this.d3Graph.nodes).force("link", this.settings.forceLink.links(this.d3Graph.edges)).alpha(0.5).restart().on("tick", () => {
        this.outputGraph$.next(this.d3GraphToOutputGraph(this.d3Graph));
      });
    }
    return this.outputGraph$.asObservable();
  }
  updateEdge(graph, edge) {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    if (settings.force) {
      settings.force.nodes(this.d3Graph.nodes).force("link", settings.forceLink.links(this.d3Graph.edges)).alpha(0.5).restart().on("tick", () => {
        this.outputGraph$.next(this.d3GraphToOutputGraph(this.d3Graph));
      });
    }
    return this.outputGraph$.asObservable();
  }
  d3GraphToOutputGraph(d3Graph) {
    this.outputGraph.nodes = this.d3Graph.nodes.map((node) => __spreadProps(__spreadValues({}, node), {
      id: node.id || id(),
      position: {
        x: node.x,
        y: node.y
      },
      dimension: {
        width: node.dimension && node.dimension.width || 20,
        height: node.dimension && node.dimension.height || 20
      },
      transform: `translate(${node.x - (node.dimension && node.dimension.width || 20) / 2 || 0}, ${node.y - (node.dimension && node.dimension.height || 20) / 2 || 0})`
    }));
    this.outputGraph.edges = this.d3Graph.edges.map((edge) => __spreadProps(__spreadValues({}, edge), {
      source: toD3Node(edge.source).id,
      target: toD3Node(edge.target).id,
      points: [{
        x: toD3Node(edge.source).x,
        y: toD3Node(edge.source).y
      }, {
        x: toD3Node(edge.target).x,
        y: toD3Node(edge.target).y
      }]
    }));
    this.outputGraph.edgeLabels = this.outputGraph.edges;
    return this.outputGraph;
  }
  onDragStart(draggingNode, $event) {
    this.settings.force.alphaTarget(0.3).restart();
    const node = this.d3Graph.nodes.find((d3Node) => d3Node.id === draggingNode.id);
    if (!node) {
      return;
    }
    this.draggingStart = {
      x: $event.x - node.x,
      y: $event.y - node.y
    };
    node.fx = $event.x - this.draggingStart.x;
    node.fy = $event.y - this.draggingStart.y;
  }
  onDrag(draggingNode, $event) {
    if (!draggingNode) {
      return;
    }
    const node = this.d3Graph.nodes.find((d3Node) => d3Node.id === draggingNode.id);
    if (!node) {
      return;
    }
    node.fx = $event.x - this.draggingStart.x;
    node.fy = $event.y - this.draggingStart.y;
  }
  onDragEnd(draggingNode, $event) {
    if (!draggingNode) {
      return;
    }
    const node = this.d3Graph.nodes.find((d3Node) => d3Node.id === draggingNode.id);
    if (!node) {
      return;
    }
    this.settings.force.alphaTarget(0);
    node.fx = void 0;
    node.fy = void 0;
  }
};
function toNode(nodes, nodeRef) {
  if (typeof nodeRef === "number") {
    return nodes[nodeRef];
  }
  return nodeRef;
}
var ColaForceDirectedLayout = class {
  constructor() {
    this.defaultSettings = {
      force: (0, import_webcola.d3adaptor)(__spreadValues(__spreadValues(__spreadValues({}, src_exports2), src_exports), src_exports3)).linkDistance(150).avoidOverlaps(true),
      viewDimensions: {
        width: 600,
        height: 600
      }
    };
    this.settings = {};
    this.outputGraph$ = new Subject();
  }
  run(graph) {
    this.inputGraph = graph;
    if (!this.inputGraph.clusters) {
      this.inputGraph.clusters = [];
    }
    this.internalGraph = {
      nodes: [...this.inputGraph.nodes.map((n) => __spreadProps(__spreadValues({}, n), {
        width: n.dimension ? n.dimension.width : 20,
        height: n.dimension ? n.dimension.height : 20
      }))],
      groups: [...this.inputGraph.clusters.map((cluster) => ({
        padding: 5,
        groups: cluster.childNodeIds.map((nodeId) => this.inputGraph.clusters.findIndex((node) => node.id === nodeId)).filter((x3) => x3 >= 0),
        leaves: cluster.childNodeIds.map((nodeId) => this.inputGraph.nodes.findIndex((node) => node.id === nodeId)).filter((x3) => x3 >= 0)
      }))],
      links: [...this.inputGraph.edges.map((e) => {
        const sourceNodeIndex = this.inputGraph.nodes.findIndex((node) => e.source === node.id);
        const targetNodeIndex = this.inputGraph.nodes.findIndex((node) => e.target === node.id);
        if (sourceNodeIndex === -1 || targetNodeIndex === -1) {
          return void 0;
        }
        return __spreadProps(__spreadValues({}, e), {
          source: sourceNodeIndex,
          target: targetNodeIndex
        });
      }).filter((x3) => !!x3)],
      groupLinks: [...this.inputGraph.edges.map((e) => {
        const sourceNodeIndex = this.inputGraph.nodes.findIndex((node) => e.source === node.id);
        const targetNodeIndex = this.inputGraph.nodes.findIndex((node) => e.target === node.id);
        if (sourceNodeIndex >= 0 && targetNodeIndex >= 0) {
          return void 0;
        }
        return e;
      }).filter((x3) => !!x3)]
    };
    this.outputGraph = {
      nodes: [],
      clusters: [],
      edges: [],
      edgeLabels: []
    };
    this.outputGraph$.next(this.outputGraph);
    this.settings = Object.assign({}, this.defaultSettings, this.settings);
    if (this.settings.force) {
      this.settings.force = this.settings.force.nodes(this.internalGraph.nodes).groups(this.internalGraph.groups).links(this.internalGraph.links).alpha(0.5).on("tick", () => {
        if (this.settings.onTickListener) {
          this.settings.onTickListener(this.internalGraph);
        }
        this.outputGraph$.next(this.internalGraphToOutputGraph(this.internalGraph));
      });
      if (this.settings.viewDimensions) {
        this.settings.force = this.settings.force.size([this.settings.viewDimensions.width, this.settings.viewDimensions.height]);
      }
      if (this.settings.forceModifierFn) {
        this.settings.force = this.settings.forceModifierFn(this.settings.force);
      }
      this.settings.force.start();
    }
    return this.outputGraph$.asObservable();
  }
  updateEdge(graph, edge) {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    if (settings.force) {
      settings.force.start();
    }
    return this.outputGraph$.asObservable();
  }
  internalGraphToOutputGraph(internalGraph) {
    this.outputGraph.nodes = internalGraph.nodes.map((node) => __spreadProps(__spreadValues({}, node), {
      id: node.id || id(),
      position: {
        x: node.x,
        y: node.y
      },
      dimension: {
        width: node.dimension && node.dimension.width || 20,
        height: node.dimension && node.dimension.height || 20
      },
      transform: `translate(${node.x - (node.dimension && node.dimension.width || 20) / 2 || 0}, ${node.y - (node.dimension && node.dimension.height || 20) / 2 || 0})`
    }));
    this.outputGraph.edges = internalGraph.links.map((edge) => {
      const source = toNode(internalGraph.nodes, edge.source);
      const target = toNode(internalGraph.nodes, edge.target);
      return __spreadProps(__spreadValues({}, edge), {
        source: source.id,
        target: target.id,
        points: [source.bounds.rayIntersection(target.bounds.cx(), target.bounds.cy()), target.bounds.rayIntersection(source.bounds.cx(), source.bounds.cy())]
      });
    }).concat(internalGraph.groupLinks.map((groupLink) => {
      const sourceNode = internalGraph.nodes.find((foundNode) => foundNode.id === groupLink.source);
      const targetNode = internalGraph.nodes.find((foundNode) => foundNode.id === groupLink.target);
      const source = sourceNode || internalGraph.groups.find((foundGroup) => foundGroup.id === groupLink.source);
      const target = targetNode || internalGraph.groups.find((foundGroup) => foundGroup.id === groupLink.target);
      return __spreadProps(__spreadValues({}, groupLink), {
        source: source.id,
        target: target.id,
        points: [source.bounds.rayIntersection(target.bounds.cx(), target.bounds.cy()), target.bounds.rayIntersection(source.bounds.cx(), source.bounds.cy())]
      });
    }));
    this.outputGraph.clusters = internalGraph.groups.map((group, index2) => {
      const inputGroup = this.inputGraph.clusters[index2];
      return __spreadProps(__spreadValues({}, inputGroup), {
        dimension: {
          width: group.bounds ? group.bounds.width() : 20,
          height: group.bounds ? group.bounds.height() : 20
        },
        position: {
          x: group.bounds ? group.bounds.x + group.bounds.width() / 2 : 0,
          y: group.bounds ? group.bounds.y + group.bounds.height() / 2 : 0
        }
      });
    });
    this.outputGraph.edgeLabels = this.outputGraph.edges;
    return this.outputGraph;
  }
  onDragStart(draggingNode, $event) {
    const nodeIndex = this.outputGraph.nodes.findIndex((foundNode) => foundNode.id === draggingNode.id);
    const node = this.internalGraph.nodes[nodeIndex];
    if (!node) {
      return;
    }
    this.draggingStart = {
      x: node.x - $event.x,
      y: node.y - $event.y
    };
    node.fixed = 1;
    this.settings.force.start();
  }
  onDrag(draggingNode, $event) {
    if (!draggingNode) {
      return;
    }
    const nodeIndex = this.outputGraph.nodes.findIndex((foundNode) => foundNode.id === draggingNode.id);
    const node = this.internalGraph.nodes[nodeIndex];
    if (!node) {
      return;
    }
    node.x = this.draggingStart.x + $event.x;
    node.y = this.draggingStart.y + $event.y;
  }
  onDragEnd(draggingNode, $event) {
    if (!draggingNode) {
      return;
    }
    const nodeIndex = this.outputGraph.nodes.findIndex((foundNode) => foundNode.id === draggingNode.id);
    const node = this.internalGraph.nodes[nodeIndex];
    if (!node) {
      return;
    }
    node.fixed = 0;
  }
};
var layouts = {
  dagre: DagreLayout,
  dagreCluster: DagreClusterLayout,
  dagreNodesOnly: DagreNodesOnlyLayout,
  d3ForceDirected: D3ForceDirectedLayout,
  colaForceDirected: ColaForceDirectedLayout
};
var LayoutService = class {
  getLayout(name) {
    if (layouts[name]) {
      return new layouts[name]();
    } else {
      throw new Error(`Unknown layout type '${name}'`);
    }
  }
};
LayoutService.ɵfac = function LayoutService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LayoutService)();
};
LayoutService.ɵprov = ɵɵdefineInjectable({
  token: LayoutService,
  factory: LayoutService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutService, [{
    type: Injectable
  }], null, null);
})();
var MouseWheelDirective = class {
  constructor() {
    this.mouseWheelUp = new EventEmitter();
    this.mouseWheelDown = new EventEmitter();
  }
  onMouseWheelChrome(event2) {
    this.mouseWheelFunc(event2);
  }
  onMouseWheelFirefox(event2) {
    this.mouseWheelFunc(event2);
  }
  onWheel(event2) {
    this.mouseWheelFunc(event2);
  }
  onMouseWheelIE(event2) {
    this.mouseWheelFunc(event2);
  }
  mouseWheelFunc(event2) {
    if (window.event) {
      event2 = window.event;
    }
    const delta = Math.max(-1, Math.min(1, event2.wheelDelta || -event2.detail || event2.deltaY || event2.deltaX));
    const isWheelMouseUp = event2.wheelDelta ? delta > 0 : delta < 0;
    const isWheelMouseDown = event2.wheelDelta ? delta < 0 : delta > 0;
    if (isWheelMouseUp) {
      this.mouseWheelUp.emit(event2);
    } else if (isWheelMouseDown) {
      this.mouseWheelDown.emit(event2);
    }
    event2.returnValue = false;
    if (event2.preventDefault) {
      event2.preventDefault();
    }
  }
};
MouseWheelDirective.ɵfac = function MouseWheelDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MouseWheelDirective)();
};
MouseWheelDirective.ɵdir = ɵɵdefineDirective({
  type: MouseWheelDirective,
  selectors: [["", "mouseWheel", ""]],
  hostBindings: function MouseWheelDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("mousewheel", function MouseWheelDirective_mousewheel_HostBindingHandler($event) {
        return ctx.onMouseWheelChrome($event);
      })("DOMMouseScroll", function MouseWheelDirective_DOMMouseScroll_HostBindingHandler($event) {
        return ctx.onMouseWheelFirefox($event);
      })("wheel", function MouseWheelDirective_wheel_HostBindingHandler($event) {
        return ctx.onWheel($event);
      })("onmousewheel", function MouseWheelDirective_onmousewheel_HostBindingHandler($event) {
        return ctx.onMouseWheelIE($event);
      });
    }
  },
  outputs: {
    mouseWheelUp: "mouseWheelUp",
    mouseWheelDown: "mouseWheelDown"
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MouseWheelDirective, [{
    type: Directive,
    args: [{
      selector: "[mouseWheel]"
    }]
  }], null, {
    mouseWheelUp: [{
      type: Output
    }],
    mouseWheelDown: [{
      type: Output
    }],
    onMouseWheelChrome: [{
      type: HostListener,
      args: ["mousewheel", ["$event"]]
    }],
    onMouseWheelFirefox: [{
      type: HostListener,
      args: ["DOMMouseScroll", ["$event"]]
    }],
    onWheel: [{
      type: HostListener,
      args: ["wheel", ["$event"]]
    }],
    onMouseWheelIE: [{
      type: HostListener,
      args: ["onmousewheel", ["$event"]]
    }]
  });
})();
var NgxGraphStates;
(function(NgxGraphStates2) {
  NgxGraphStates2["Init"] = "init";
  NgxGraphStates2["Subscribe"] = "subscribe";
  NgxGraphStates2["Transform"] = "transform";
})(NgxGraphStates || (NgxGraphStates = {}));
var GraphComponent = class {
  constructor(el, zone, cd, layoutService) {
    this.el = el;
    this.zone = zone;
    this.cd = cd;
    this.layoutService = layoutService;
    this.nodes = [];
    this.clusters = [];
    this.compoundNodes = [];
    this.links = [];
    this.activeEntries = [];
    this.draggingEnabled = true;
    this.panningEnabled = true;
    this.panningAxis = PanningAxis.Both;
    this.enableZoom = true;
    this.zoomSpeed = 0.1;
    this.minZoomLevel = 0.1;
    this.maxZoomLevel = 4;
    this.autoZoom = false;
    this.panOnZoom = true;
    this.animate = false;
    this.autoCenter = false;
    this.enableTrackpadSupport = false;
    this.showMiniMap = false;
    this.miniMapMaxWidth = 100;
    this.miniMapPosition = MiniMapPosition.UpperRight;
    this.scheme = "cool";
    this.animations = true;
    this.deferDisplayUntilPosition = false;
    this.centerNodesOnPositionChange = true;
    this.enablePreUpdateTransform = true;
    this.select = new EventEmitter();
    this.activate = new EventEmitter();
    this.deactivate = new EventEmitter();
    this.zoomChange = new EventEmitter();
    this.clickHandler = new EventEmitter();
    this.stateChange = new EventEmitter();
    this.isMouseMoveCalled = false;
    this.graphSubscription = new Subscription();
    this.isPanning = false;
    this.isDragging = false;
    this.initialized = false;
    this.graphDims = {
      width: 0,
      height: 0
    };
    this._oldLinks = [];
    this.oldNodes = /* @__PURE__ */ new Set();
    this.oldClusters = /* @__PURE__ */ new Set();
    this.oldCompoundNodes = /* @__PURE__ */ new Set();
    this.transformationMatrix = identity();
    this._touchLastX = null;
    this._touchLastY = null;
    this.minimapScaleCoefficient = 3;
    this.minimapOffsetX = 0;
    this.minimapOffsetY = 0;
    this.isMinimapPanning = false;
    this.destroy$ = new Subject();
    this.groupResultsBy = (node) => node.label;
  }
  /**
   * Get the current zoom level
   */
  get zoomLevel() {
    return this.transformationMatrix.a;
  }
  /**
   * Set the current zoom level
   */
  set zoomLevel(level) {
    this.zoomTo(Number(level));
  }
  /**
   * Get the current `x` position of the graph
   */
  get panOffsetX() {
    return this.transformationMatrix.e;
  }
  /**
   * Set the current `x` position of the graph
   */
  set panOffsetX(x3) {
    this.panTo(Number(x3), null);
  }
  /**
   * Get the current `y` position of the graph
   */
  get panOffsetY() {
    return this.transformationMatrix.f;
  }
  /**
   * Set the current `y` position of the graph
   */
  set panOffsetY(y3) {
    this.panTo(null, Number(y3));
  }
  /**
   * Angular lifecycle event
   *
   *
   * @memberOf GraphComponent
   */
  ngOnInit() {
    if (this.update$) {
      this.update$.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.update();
      });
    }
    if (this.center$) {
      this.center$.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.center();
      });
    }
    if (this.zoomToFit$) {
      this.zoomToFit$.pipe(takeUntil(this.destroy$)).subscribe((options) => {
        this.zoomToFit(options ? options : {});
      });
    }
    if (this.panToNode$) {
      this.panToNode$.pipe(takeUntil(this.destroy$)).subscribe((nodeId) => {
        this.panToNodeId(nodeId);
      });
    }
    this.minimapClipPathId = `minimapClip${id()}`;
    this.stateChange.emit({
      state: NgxGraphStates.Subscribe
    });
  }
  ngOnChanges(changes) {
    this.basicUpdate();
    const {
      layout: layout2,
      layoutSettings,
      nodes,
      clusters,
      links,
      compoundNodes
    } = changes;
    this.setLayout(this.layout);
    if (layoutSettings) {
      this.setLayoutSettings(this.layoutSettings);
    }
    this.update();
  }
  setLayout(layout2) {
    this.initialized = false;
    if (!layout2) {
      layout2 = "dagre";
    }
    if (typeof layout2 === "string") {
      this.layout = this.layoutService.getLayout(layout2);
      this.setLayoutSettings(this.layoutSettings);
    }
  }
  setLayoutSettings(settings) {
    if (this.layout && typeof this.layout !== "string") {
      this.layout.settings = settings;
    }
  }
  /**
   * Angular lifecycle event
   *
   *
   * @memberOf GraphComponent
   */
  ngOnDestroy() {
    this.unbindEvents();
    if (this.visibilityObserver) {
      this.visibilityObserver.visible.unsubscribe();
      this.visibilityObserver.destroy();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Angular lifecycle event
   *
   *
   * @memberOf GraphComponent
   */
  ngAfterViewInit() {
    this.bindWindowResizeEvent();
    this.visibilityObserver = new VisibilityObserver(this.el, this.zone);
    this.visibilityObserver.visible.subscribe(this.update.bind(this));
    setTimeout(() => this.update());
  }
  /**
   * Base class update implementation for the dag graph
   *
   * @memberOf GraphComponent
   */
  update() {
    this.basicUpdate();
    if (!this.curve) {
      this.curve = bundle_default.beta(1);
    }
    this.zone.run(() => {
      this.dims = calculateViewDimensions({
        width: this.width,
        height: this.height
      });
      this.seriesDomain = this.getSeriesDomain();
      this.setColors();
      this.createGraph();
      this.updateTransform();
      if (!this.initialized) {
        this.stateChange.emit({
          state: NgxGraphStates.Init
        });
      }
      this.initialized = true;
    });
  }
  /**
   * Creates the dagre graph engine
   *
   * @memberOf GraphComponent
   */
  createGraph() {
    this.graphSubscription.unsubscribe();
    this.graphSubscription = new Subscription();
    const initializeNode = (n) => {
      if (!n.meta) {
        n.meta = {};
      }
      if (!n.id) {
        n.id = id();
      }
      if (!n.dimension) {
        n.dimension = {
          width: this.nodeWidth ? this.nodeWidth : 30,
          height: this.nodeHeight ? this.nodeHeight : 30
        };
        n.meta.forceDimensions = false;
      } else {
        n.meta.forceDimensions = n.meta.forceDimensions === void 0 ? true : n.meta.forceDimensions;
      }
      if (!n.position) {
        n.position = {
          x: 0,
          y: 0
        };
        if (this.deferDisplayUntilPosition) {
          n.hidden = true;
        }
      }
      n.data = n.data ? n.data : {};
      return n;
    };
    this.graph = {
      nodes: this.nodes.length > 0 ? [...this.nodes].map(initializeNode) : [],
      clusters: this.clusters && this.clusters.length > 0 ? [...this.clusters].map(initializeNode) : [],
      compoundNodes: this.compoundNodes && this.compoundNodes.length > 0 ? [...this.compoundNodes].map(initializeNode) : [],
      edges: this.links.length > 0 ? [...this.links].map((e) => {
        if (!e.id) {
          e.id = id();
        }
        return e;
      }) : []
    };
    requestAnimationFrame(() => this.draw());
  }
  /**
   * Draws the graph using dagre layouts
   *
   *
   * @memberOf GraphComponent
   */
  draw() {
    if (!this.layout || typeof this.layout === "string") {
      return;
    }
    this.applyNodeDimensions();
    const result = this.layout.run(this.graph);
    const result$ = result instanceof Observable ? result : of(result);
    this.graphSubscription.add(result$.subscribe((graph) => {
      this.graph = graph;
      this.tick();
    }));
    if (this.graph.nodes.length === 0 && this.graph.compoundNodes?.length === 0) {
      return;
    }
    result$.pipe(first()).subscribe(() => this.applyNodeDimensions());
  }
  tick() {
    const oldNodes = /* @__PURE__ */ new Set();
    this.graph.nodes.map((n) => {
      n.transform = `translate(${n.position.x - (this.centerNodesOnPositionChange ? n.dimension.width / 2 : 0) || 0}, ${n.position.y - (this.centerNodesOnPositionChange ? n.dimension.height / 2 : 0) || 0})`;
      if (!n.data) {
        n.data = {};
      }
      n.data.color = this.colors.getColor(this.groupResultsBy(n));
      if (this.deferDisplayUntilPosition) {
        n.hidden = false;
      }
      oldNodes.add(n.id);
    });
    const oldClusters = /* @__PURE__ */ new Set();
    const oldCompoundNodes = /* @__PURE__ */ new Set();
    (this.graph.clusters || []).map((n) => {
      n.transform = `translate(${n.position.x - (this.centerNodesOnPositionChange ? n.dimension.width / 2 : 0) || 0}, ${n.position.y - (this.centerNodesOnPositionChange ? n.dimension.height / 2 : 0) || 0})`;
      if (!n.data) {
        n.data = {};
      }
      n.data.color = this.colors.getColor(this.groupResultsBy(n));
      if (this.deferDisplayUntilPosition) {
        n.hidden = false;
      }
      oldClusters.add(n.id);
    });
    (this.graph.compoundNodes || []).map((n) => {
      n.transform = `translate(${n.position.x - (this.centerNodesOnPositionChange ? n.dimension.width / 2 : 0) || 0}, ${n.position.y - (this.centerNodesOnPositionChange ? n.dimension.height / 2 : 0) || 0})`;
      if (!n.data) {
        n.data = {};
      }
      n.data.color = this.colors.getColor(this.groupResultsBy(n));
      if (this.deferDisplayUntilPosition) {
        n.hidden = false;
      }
      oldCompoundNodes.add(n.id);
    });
    setTimeout(() => {
      this.oldNodes = oldNodes;
      this.oldClusters = oldClusters;
      this.oldCompoundNodes = oldCompoundNodes;
    }, 500);
    const newLinks = [];
    for (const edgeLabelId in this.graph.edgeLabels) {
      const edgeLabel = this.graph.edgeLabels[edgeLabelId];
      const normKey = edgeLabelId.replace(/[^\w-]*/g, "");
      const isMultigraph = this.layout && typeof this.layout !== "string" && this.layout.settings && this.layout.settings.multigraph;
      let oldLink = isMultigraph ? this._oldLinks.find((ol) => `${ol.source}${ol.target}${ol.id}` === normKey) : this._oldLinks.find((ol) => `${ol.source}${ol.target}` === normKey);
      const linkFromGraph = isMultigraph ? this.graph.edges.find((nl) => `${nl.source}${nl.target}${nl.id}` === normKey) : this.graph.edges.find((nl) => `${nl.source}${nl.target}` === normKey);
      if (!oldLink) {
        oldLink = linkFromGraph || edgeLabel;
      } else if (oldLink.data && linkFromGraph && linkFromGraph.data && JSON.stringify(oldLink.data) !== JSON.stringify(linkFromGraph.data)) {
        oldLink.data = linkFromGraph.data;
      }
      oldLink.oldLine = oldLink.line;
      const points = edgeLabel.points;
      const line = this.generateLine(points);
      const newLink = Object.assign({}, oldLink);
      newLink.line = line;
      newLink.points = points;
      this.updateMidpointOnEdge(newLink, points);
      const textPos = points[Math.floor(points.length / 2)];
      if (textPos) {
        newLink.textTransform = `translate(${textPos.x || 0},${textPos.y || 0})`;
      }
      newLink.textAngle = 0;
      if (!newLink.oldLine) {
        newLink.oldLine = newLink.line;
      }
      this.calcDominantBaseline(newLink);
      newLinks.push(newLink);
    }
    this.graph.edges = newLinks;
    if (this.graph.edges) {
      this._oldLinks = this.graph.edges.map((l) => {
        const newL = Object.assign({}, l);
        newL.oldLine = l.line;
        return newL;
      });
    }
    this.updateMinimap();
    if (this.autoZoom) {
      this.zoomToFit();
    }
    if (this.autoCenter) {
      this.center();
    }
    requestAnimationFrame(() => this.redrawLines());
    this.cd.markForCheck();
  }
  getMinimapTransform() {
    switch (this.miniMapPosition) {
      case MiniMapPosition.UpperLeft: {
        return "";
      }
      case MiniMapPosition.UpperRight: {
        return "translate(" + (this.dims.width - this.graphDims.width / this.minimapScaleCoefficient) + ",0)";
      }
      default: {
        return "";
      }
    }
  }
  updateGraphDims() {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < this.graph.nodes.length; i++) {
      const node = this.graph.nodes[i];
      minX = node.position.x < minX ? node.position.x : minX;
      minY = node.position.y < minY ? node.position.y : minY;
      maxX = node.position.x + node.dimension.width > maxX ? node.position.x + node.dimension.width : maxX;
      maxY = node.position.y + node.dimension.height > maxY ? node.position.y + node.dimension.height : maxY;
    }
    minX -= 100;
    minY -= 100;
    maxX += 100;
    maxY += 100;
    this.graphDims.width = maxX - minX;
    this.graphDims.height = maxY - minY;
    this.minimapOffsetX = minX;
    this.minimapOffsetY = minY;
  }
  updateMinimap() {
    if (this.graph.nodes && this.graph.nodes.length) {
      this.updateGraphDims();
      if (this.miniMapMaxWidth) {
        this.minimapScaleCoefficient = this.graphDims.width / this.miniMapMaxWidth;
      }
      if (this.miniMapMaxHeight) {
        this.minimapScaleCoefficient = Math.max(this.minimapScaleCoefficient, this.graphDims.height / this.miniMapMaxHeight);
      }
      this.minimapTransform = this.getMinimapTransform();
    }
  }
  /**
   * Measures the node element and applies the dimensions
   *
   * @memberOf GraphComponent
   */
  applyNodeDimensions() {
    if (this.nodeElements && this.nodeElements.length) {
      this.nodeElements.map((elem) => {
        const nativeElement = elem.nativeElement;
        const node = this.graph.nodes.find((n) => n.id === nativeElement.id);
        if (!node) {
          return;
        }
        let dims;
        try {
          dims = nativeElement.getBBox();
          if (!dims.width || !dims.height) {
            return;
          }
        } catch (ex) {
          return;
        }
        if (this.nodeHeight) {
          node.dimension.height = node.dimension.height && node.meta.forceDimensions ? node.dimension.height : this.nodeHeight;
        } else {
          node.dimension.height = node.dimension.height && node.meta.forceDimensions ? node.dimension.height : dims.height;
        }
        if (this.nodeMaxHeight) {
          node.dimension.height = Math.max(node.dimension.height, this.nodeMaxHeight);
        }
        if (this.nodeMinHeight) {
          node.dimension.height = Math.min(node.dimension.height, this.nodeMinHeight);
        }
        if (this.nodeWidth) {
          node.dimension.width = node.dimension.width && node.meta.forceDimensions ? node.dimension.width : this.nodeWidth;
        } else {
          if (nativeElement.getElementsByTagName("text").length) {
            let maxTextDims;
            try {
              for (const textElem of nativeElement.getElementsByTagName("text")) {
                const currentBBox = textElem.getBBox();
                if (!maxTextDims) {
                  maxTextDims = currentBBox;
                } else {
                  if (currentBBox.width > maxTextDims.width) {
                    maxTextDims.width = currentBBox.width;
                  }
                  if (currentBBox.height > maxTextDims.height) {
                    maxTextDims.height = currentBBox.height;
                  }
                }
              }
            } catch (ex) {
              return;
            }
            node.dimension.width = node.dimension.width && node.meta.forceDimensions ? node.dimension.width : maxTextDims.width + 20;
          } else {
            node.dimension.width = node.dimension.width && node.meta.forceDimensions ? node.dimension.width : dims.width;
          }
        }
        if (this.nodeMaxWidth) {
          node.dimension.width = Math.max(node.dimension.width, this.nodeMaxWidth);
        }
        if (this.nodeMinWidth) {
          node.dimension.width = Math.min(node.dimension.width, this.nodeMinWidth);
        }
      });
    }
  }
  /**
   * Redraws the lines when dragged or viewport updated
   *
   * @memberOf GraphComponent
   */
  redrawLines(_animate = this.animate) {
    this.linkElements.map((linkEl) => {
      const edge = this.graph.edges.find((lin) => lin.id === linkEl.nativeElement.id);
      if (edge) {
        const linkSelection = select_default2(linkEl.nativeElement).select(".line");
        linkSelection.attr("d", edge.oldLine).transition().ease(sinInOut).duration(_animate ? 500 : 0).attr("d", edge.line);
        const textPathSelection = select_default2(this.el.nativeElement).select(`#${edge.id}`);
        textPathSelection.attr("d", edge.oldTextPath).transition().ease(sinInOut).duration(_animate ? 500 : 0).attr("d", edge.textPath);
        this.updateMidpointOnEdge(edge, edge.points);
      }
    });
  }
  /**
   * Calculate the text directions / flipping
   *
   * @memberOf GraphComponent
   */
  calcDominantBaseline(link) {
    const firstPoint = link.points[0];
    const lastPoint = link.points[link.points.length - 1];
    link.oldTextPath = link.textPath;
    if (lastPoint.x < firstPoint.x) {
      link.dominantBaseline = "text-before-edge";
      link.textPath = this.generateLine([...link.points].reverse());
    } else {
      link.dominantBaseline = "text-after-edge";
      link.textPath = link.line;
    }
  }
  /**
   * Generate the new line path
   *
   * @memberOf GraphComponent
   */
  generateLine(points) {
    const lineFunction = line_default().x((d) => d.x).y((d) => d.y).curve(this.curve);
    return lineFunction(points);
  }
  /**
   * Zoom was invoked from event
   *
   * @memberOf GraphComponent
   */
  onZoom($event, direction) {
    if (this.enableTrackpadSupport && !$event.ctrlKey) {
      this.pan($event.deltaX * -1, $event.deltaY * -1);
      return;
    }
    const zoomFactor = 1 + (direction === "in" ? this.zoomSpeed : -this.zoomSpeed);
    const newZoomLevel = this.zoomLevel * zoomFactor;
    if (newZoomLevel <= this.minZoomLevel || newZoomLevel >= this.maxZoomLevel) {
      return;
    }
    if (!this.enableZoom) {
      return;
    }
    if (this.panOnZoom === true && $event) {
      const mouseX = $event.clientX;
      const mouseY = $event.clientY;
      const svg = this.el.nativeElement.querySelector("svg");
      const svgGroup = svg.querySelector("g.chart");
      const point2 = svg.createSVGPoint();
      point2.x = mouseX;
      point2.y = mouseY;
      const svgPoint = point2.matrixTransform(svgGroup.getScreenCTM().inverse());
      this.pan(svgPoint.x, svgPoint.y, true);
      this.zoom(zoomFactor);
      this.pan(-svgPoint.x, -svgPoint.y, true);
    } else {
      this.zoom(zoomFactor);
    }
  }
  /**
   * Pan by x/y
   *
   * @param x
   * @param y
   */
  pan(x3, y3, ignoreZoomLevel = false) {
    const zoomLevel = ignoreZoomLevel ? 1 : this.zoomLevel;
    this.transformationMatrix = transform(this.transformationMatrix, translate(x3 / zoomLevel, y3 / zoomLevel));
    this.updateTransform();
  }
  /**
   * Pan to a fixed x/y
   *
   */
  panTo(x3, y3) {
    if (x3 === null || x3 === void 0 || isNaN(x3) || y3 === null || y3 === void 0 || isNaN(y3)) {
      return;
    }
    const panX = -this.panOffsetX - x3 * this.zoomLevel + this.dims.width / 2;
    const panY = -this.panOffsetY - y3 * this.zoomLevel + this.dims.height / 2;
    this.transformationMatrix = transform(this.transformationMatrix, translate(panX / this.zoomLevel, panY / this.zoomLevel));
    this.updateTransform();
  }
  /**
   * Zoom by a factor
   *
   */
  zoom(factor) {
    this.transformationMatrix = transform(this.transformationMatrix, scale(factor, factor));
    this.zoomChange.emit(this.zoomLevel);
    this.updateTransform();
  }
  /**
   * Zoom to a fixed level
   *
   */
  zoomTo(level) {
    this.transformationMatrix.a = isNaN(level) ? this.transformationMatrix.a : Number(level);
    this.transformationMatrix.d = isNaN(level) ? this.transformationMatrix.d : Number(level);
    this.zoomChange.emit(this.zoomLevel);
    if (this.enablePreUpdateTransform) {
      this.updateTransform();
    }
    this.update();
  }
  /**
   * Drag was invoked from an event
   *
   * @memberOf GraphComponent
   */
  onDrag(event2) {
    if (!this.draggingEnabled) {
      return;
    }
    const node = this.draggingNode;
    if (this.layout && typeof this.layout !== "string" && this.layout.onDrag) {
      this.layout.onDrag(node, event2);
    }
    node.position.x += event2.movementX / this.zoomLevel;
    node.position.y += event2.movementY / this.zoomLevel;
    const x3 = node.position.x - (this.centerNodesOnPositionChange ? node.dimension.width / 2 : 0);
    const y3 = node.position.y - (this.centerNodesOnPositionChange ? node.dimension.height / 2 : 0);
    node.transform = `translate(${x3}, ${y3})`;
    for (const link of this.graph.edges) {
      if (link.target === node.id || link.source === node.id || link.target.id === node.id || link.source.id === node.id) {
        if (this.layout && typeof this.layout !== "string") {
          const result = this.layout.updateEdge(this.graph, link);
          const result$ = result instanceof Observable ? result : of(result);
          this.graphSubscription.add(result$.subscribe((graph) => {
            this.graph = graph;
            this.redrawEdge(link);
          }));
        }
      }
    }
    this.redrawLines(false);
    this.updateMinimap();
  }
  redrawEdge(edge) {
    const line = this.generateLine(edge.points);
    this.calcDominantBaseline(edge);
    edge.oldLine = edge.line;
    edge.line = line;
  }
  /**
   * Update the entire view for the new pan position
   *
   *
   * @memberOf GraphComponent
   */
  updateTransform() {
    this.transform = toSVG(smoothMatrix(this.transformationMatrix, 100));
    this.stateChange.emit({
      state: NgxGraphStates.Transform
    });
  }
  /**
   * Node was clicked
   *
   *
   * @memberOf GraphComponent
   */
  onClick(event2) {
    this.select.emit(event2);
  }
  /**
   * Node was focused
   *
   *
   * @memberOf GraphComponent
   */
  onActivate(event2) {
    if (this.activeEntries.indexOf(event2) > -1) {
      return;
    }
    this.activeEntries = [event2, ...this.activeEntries];
    this.activate.emit({
      value: event2,
      entries: this.activeEntries
    });
  }
  /**
   * Node was defocused
   *
   * @memberOf GraphComponent
   */
  onDeactivate(event2) {
    const idx = this.activeEntries.indexOf(event2);
    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];
    this.deactivate.emit({
      value: event2,
      entries: this.activeEntries
    });
  }
  /**
   * Get the domain series for the nodes
   *
   * @memberOf GraphComponent
   */
  getSeriesDomain() {
    return this.nodes.map((d) => this.groupResultsBy(d)).reduce((nodes, node) => nodes.indexOf(node) !== -1 ? nodes : nodes.concat([node]), []).sort();
  }
  /**
   * Tracking for the link
   *
   *
   * @memberOf GraphComponent
   */
  trackLinkBy(index2, link) {
    return link.id;
  }
  /**
   * Tracking for the node
   *
   *
   * @memberOf GraphComponent
   */
  trackNodeBy(index2, node) {
    return node.id;
  }
  /**
   * Sets the colors the nodes
   *
   *
   * @memberOf GraphComponent
   */
  setColors() {
    this.colors = new ColorHelper(this.scheme, this.seriesDomain, this.customColors);
  }
  /**
   * On mouse move event, used for panning and dragging.
   *
   * @memberOf GraphComponent
   */
  onMouseMove($event) {
    this.isMouseMoveCalled = true;
    if ((this.isPanning || this.isMinimapPanning) && this.panningEnabled) {
      this.panWithConstraints(this.panningAxis, $event);
    } else if (this.isDragging && this.draggingEnabled) {
      this.onDrag($event);
    }
  }
  onMouseDown(event2) {
    this.isMouseMoveCalled = false;
  }
  graphClick(event2) {
    if (!this.isMouseMoveCalled) this.clickHandler.emit(event2);
  }
  /**
   * On touch start event to enable panning.
   *
   * @memberOf GraphComponent
   */
  onTouchStart(event2) {
    this._touchLastX = event2.changedTouches[0].clientX;
    this._touchLastY = event2.changedTouches[0].clientY;
    this.isPanning = true;
  }
  /**
   * On touch move event, used for panning.
   *
   */
  onTouchMove($event) {
    if (this.isPanning && this.panningEnabled) {
      const clientX = $event.changedTouches[0].clientX;
      const clientY = $event.changedTouches[0].clientY;
      const movementX = clientX - this._touchLastX;
      const movementY = clientY - this._touchLastY;
      this._touchLastX = clientX;
      this._touchLastY = clientY;
      this.pan(movementX, movementY);
    }
  }
  /**
   * On touch end event to disable panning.
   *
   * @memberOf GraphComponent
   */
  onTouchEnd(event2) {
    this.isPanning = false;
  }
  /**
   * On mouse up event to disable panning/dragging.
   *
   * @memberOf GraphComponent
   */
  onMouseUp(event2) {
    this.isDragging = false;
    this.isPanning = false;
    this.isMinimapPanning = false;
    if (this.layout && typeof this.layout !== "string" && this.layout.onDragEnd) {
      this.layout.onDragEnd(this.draggingNode, event2);
    }
  }
  /**
   * On node mouse down to kick off dragging
   *
   * @memberOf GraphComponent
   */
  onNodeMouseDown(event2, node) {
    if (!this.draggingEnabled) {
      return;
    }
    this.isDragging = true;
    this.draggingNode = node;
    if (this.layout && typeof this.layout !== "string" && this.layout.onDragStart) {
      this.layout.onDragStart(node, event2);
    }
  }
  /**
   * On minimap drag mouse down to kick off minimap panning
   *
   * @memberOf GraphComponent
   */
  onMinimapDragMouseDown() {
    this.isMinimapPanning = true;
  }
  /**
   * On minimap pan event. Pans the graph to the clicked position
   *
   * @memberOf GraphComponent
   */
  onMinimapPanTo(event2) {
    const x3 = event2.offsetX - (this.dims.width - (this.graphDims.width + this.minimapOffsetX) / this.minimapScaleCoefficient);
    const y3 = event2.offsetY + this.minimapOffsetY / this.minimapScaleCoefficient;
    this.panTo(x3 * this.minimapScaleCoefficient, y3 * this.minimapScaleCoefficient);
    this.isMinimapPanning = true;
  }
  /**
   * Center the graph in the viewport
   */
  center() {
    this.panTo(this.graphDims.width / 2, this.graphDims.height / 2);
  }
  /**
   * Zooms to fit the entire graph
   */
  zoomToFit(zoomOptions) {
    this.updateGraphDims();
    const heightZoom = this.dims.height / this.graphDims.height;
    const widthZoom = this.dims.width / this.graphDims.width;
    let zoomLevel = Math.min(heightZoom, widthZoom, 1);
    if (zoomLevel < this.minZoomLevel) {
      zoomLevel = this.minZoomLevel;
    }
    if (zoomLevel > this.maxZoomLevel) {
      zoomLevel = this.maxZoomLevel;
    }
    if (zoomOptions?.force === true || zoomLevel !== this.zoomLevel) {
      this.zoomLevel = zoomLevel;
      if (zoomOptions?.autoCenter !== true) {
        this.updateTransform();
      }
      if (zoomOptions?.autoCenter === true) {
        this.center();
      }
      this.zoomChange.emit(this.zoomLevel);
    }
  }
  /**
   * Pans to the node
   * @param nodeId
   */
  panToNodeId(nodeId) {
    const node = this.graph.nodes.find((n) => n.id === nodeId);
    if (!node) {
      return;
    }
    this.panTo(node.position.x, node.position.y);
  }
  getCompoundNodeChildren(ids) {
    return this.nodes.filter((node) => ids.includes(node.id));
  }
  panWithConstraints(key, event2) {
    let x3 = event2.movementX;
    let y3 = event2.movementY;
    if (this.isMinimapPanning) {
      x3 = -this.minimapScaleCoefficient * x3 * this.zoomLevel;
      y3 = -this.minimapScaleCoefficient * y3 * this.zoomLevel;
    }
    switch (key) {
      case PanningAxis.Horizontal:
        this.pan(x3, 0);
        break;
      case PanningAxis.Vertical:
        this.pan(0, y3);
        break;
      default:
        this.pan(x3, y3);
        break;
    }
  }
  updateMidpointOnEdge(edge, points) {
    if (!edge || !points) {
      return;
    }
    if (points.length % 2 === 1) {
      edge.midPoint = points[Math.floor(points.length / 2)];
    } else {
      if (this.layout?.settings?.properties?.["elk.direction"]) {
        this._calcMidPointElk(edge, points);
      } else {
        const _first = points[points.length / 2];
        const _second = points[points.length / 2 - 1];
        edge.midPoint = {
          x: (_first.x + _second.x) / 2,
          y: (_first.y + _second.y) / 2
        };
      }
    }
  }
  _calcMidPointElk(edge, points) {
    let _firstX = null;
    let _secondX = null;
    let _firstY = null;
    let _secondY = null;
    const orientation = this.layout.settings?.properties["elk.direction"];
    const hasBend = orientation === "RIGHT" ? points.some((p) => p.y !== points[0].y) : points.some((p) => p.x !== points[0].x);
    if (hasBend) {
      _firstX = points[points.length - 1];
      _secondX = points[points.length - 2];
      _firstY = points[points.length - 1];
      _secondY = points[points.length - 2];
    } else {
      if (orientation === "RIGHT") {
        _firstX = points[0];
        _secondX = points[points.length - 1];
        _firstY = points[points.length / 2];
        _secondY = points[points.length / 2 - 1];
      } else {
        _firstX = points[points.length / 2];
        _secondX = points[points.length / 2 - 1];
        _firstY = points[0];
        _secondY = points[points.length - 1];
      }
    }
    edge.midPoint = {
      x: (_firstX.x + _secondX.x) / 2,
      y: (_firstY.y + _secondY.y) / 2
    };
  }
  basicUpdate() {
    if (this.view) {
      this.width = this.view[0];
      this.height = this.view[1];
    } else {
      const dims = this.getContainerDims();
      if (dims) {
        this.width = dims.width;
        this.height = dims.height;
      }
    }
    if (!this.width) {
      this.width = 600;
    }
    if (!this.height) {
      this.height = 400;
    }
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    if (this.cd) {
      this.cd.markForCheck();
    }
  }
  getContainerDims() {
    let width;
    let height;
    const hostElem = this.el.nativeElement;
    if (hostElem.parentNode !== null) {
      const dims = hostElem.parentNode.getBoundingClientRect();
      width = dims.width;
      height = dims.height;
    }
    if (width && height) {
      return {
        width,
        height
      };
    }
    return null;
  }
  /**
   * Checks if the graph has dimensions
   */
  hasGraphDims() {
    return this.graphDims.width > 0 && this.graphDims.height > 0;
  }
  /**
   * Checks if all nodes have dimension
   */
  hasNodeDims() {
    return this.graph.nodes?.every((node) => node.dimension.width > 0 && node.dimension.height > 0);
  }
  /**
   * Checks if all compound nodes have dimension
   */
  hasCompoundNodeDims() {
    return this.graph.compoundNodes?.every((node) => node.dimension.width > 0 && node.dimension.height > 0);
  }
  /**
   * Checks if the graph and all nodes have dimension.
   */
  hasDims() {
    return this.hasGraphDims() && this.hasNodeDims() && this.hasCompoundNodeDims();
  }
  unbindEvents() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
  bindWindowResizeEvent() {
    const source = fromEvent(window, "resize");
    const subscription = source.pipe(debounceTime(200)).subscribe((e) => {
      this.update();
      if (this.cd) {
        this.cd.markForCheck();
      }
    });
    this.resizeSubscription = subscription;
  }
};
GraphComponent.ɵfac = function GraphComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || GraphComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(LayoutService));
};
GraphComponent.ɵcmp = ɵɵdefineComponent({
  type: GraphComponent,
  selectors: [["ngx-graph"]],
  contentQueries: function GraphComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c0, 5);
      ɵɵcontentQuery(dirIndex, _c1, 5);
      ɵɵcontentQuery(dirIndex, _c2, 5);
      ɵɵcontentQuery(dirIndex, _c3, 5);
      ɵɵcontentQuery(dirIndex, _c4, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.linkTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nodeTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clusterTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.defsTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.miniMapNodeTemplate = _t.first);
    }
  },
  viewQuery: function GraphComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c5, 5);
      ɵɵviewQuery(_c6, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nodeElements = _t);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.linkElements = _t);
    }
  },
  hostBindings: function GraphComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("mousemove", function GraphComponent_mousemove_HostBindingHandler($event) {
        return ctx.onMouseMove($event);
      }, false, ɵɵresolveDocument)("mousedown", function GraphComponent_mousedown_HostBindingHandler($event) {
        return ctx.onMouseDown($event);
      }, false, ɵɵresolveDocument)("click", function GraphComponent_click_HostBindingHandler($event) {
        return ctx.graphClick($event);
      }, false, ɵɵresolveDocument)("touchmove", function GraphComponent_touchmove_HostBindingHandler($event) {
        return ctx.onTouchMove($event);
      }, false, ɵɵresolveDocument)("mouseup", function GraphComponent_mouseup_HostBindingHandler($event) {
        return ctx.onMouseUp($event);
      }, false, ɵɵresolveDocument);
    }
  },
  inputs: {
    nodes: "nodes",
    clusters: "clusters",
    compoundNodes: "compoundNodes",
    links: "links",
    activeEntries: "activeEntries",
    curve: "curve",
    draggingEnabled: "draggingEnabled",
    nodeHeight: "nodeHeight",
    nodeMaxHeight: "nodeMaxHeight",
    nodeMinHeight: "nodeMinHeight",
    nodeWidth: "nodeWidth",
    nodeMinWidth: "nodeMinWidth",
    nodeMaxWidth: "nodeMaxWidth",
    panningEnabled: "panningEnabled",
    panningAxis: "panningAxis",
    enableZoom: "enableZoom",
    zoomSpeed: "zoomSpeed",
    minZoomLevel: "minZoomLevel",
    maxZoomLevel: "maxZoomLevel",
    autoZoom: "autoZoom",
    panOnZoom: "panOnZoom",
    animate: "animate",
    autoCenter: "autoCenter",
    update$: "update$",
    center$: "center$",
    zoomToFit$: "zoomToFit$",
    panToNode$: "panToNode$",
    layout: "layout",
    layoutSettings: "layoutSettings",
    enableTrackpadSupport: "enableTrackpadSupport",
    showMiniMap: "showMiniMap",
    miniMapMaxWidth: "miniMapMaxWidth",
    miniMapMaxHeight: "miniMapMaxHeight",
    miniMapPosition: "miniMapPosition",
    view: "view",
    scheme: "scheme",
    customColors: "customColors",
    animations: "animations",
    deferDisplayUntilPosition: "deferDisplayUntilPosition",
    centerNodesOnPositionChange: "centerNodesOnPositionChange",
    enablePreUpdateTransform: "enablePreUpdateTransform",
    groupResultsBy: "groupResultsBy",
    zoomLevel: "zoomLevel",
    panOffsetX: "panOffsetX",
    panOffsetY: "panOffsetY"
  },
  outputs: {
    select: "select",
    activate: "activate",
    deactivate: "deactivate",
    zoomChange: "zoomChange",
    clickHandler: "clickHandler",
    stateChange: "stateChange"
  },
  features: [ɵɵNgOnChangesFeature],
  ngContentSelectors: _c7,
  decls: 6,
  vars: 11,
  consts: [["clusterElement", ""], ["nodeElement", ""], ["linkElement", ""], ["mouseWheel", "", 1, "ngx-graph-outer", 3, "mouseWheelUp", "mouseWheelDown"], [1, "ngx-graph"], ["class", "graph chart", 3, "touchstart", "touchend", 4, "ngIf"], ["class", "minimap", 4, "ngIf"], [1, "graph", "chart", 3, "touchstart", "touchend"], [3, "ngTemplateOutlet", 4, "ngIf"], ["class", "text-path", 4, "ngFor", "ngForOf"], [1, "panning-rect", 3, "mousedown"], [1, "clusters"], ["class", "node-group", 3, "old-node", "id", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "compound-nodes"], ["class", "node-group", 3, "old-node", "id", "click", "mousedown", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "links"], ["class", "link-group", 3, "id", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "nodes"], [3, "ngTemplateOutlet"], [1, "text-path"], [1, "node-group", 3, "click", "id"], [3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], ["class", "node cluster", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "node", "cluster"], ["alignment-baseline", "central"], [1, "node-group", 3, "click", "mousedown", "id"], ["class", "node compound-node", 4, "ngIf"], [1, "node", "compound-node"], [1, "link-group", 3, "id"], ["class", "edge", 4, "ngIf"], [1, "edge"], ["r", "10", 4, "ngIf"], ["r", "10"], [1, "minimap"], [1, "minimap-background", 3, "mousedown"], [1, "minimap-nodes"], ["class", "node-group", 3, "old-node", "id", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "minimap-drag", 3, "mousedown"], [1, "node-group", 3, "id"]],
  template: function GraphComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div", 3);
      ɵɵlistener("mouseWheelUp", function GraphComponent_Template_div_mouseWheelUp_0_listener($event) {
        return ctx.onZoom($event, "in");
      })("mouseWheelDown", function GraphComponent_Template_div_mouseWheelDown_0_listener($event) {
        return ctx.onZoom($event, "out");
      });
      ɵɵnamespaceSVG();
      ɵɵelementStart(1, "svg", 4);
      ɵɵtemplate(2, GraphComponent__svg_g_2_Template, 14, 14, "g", 5);
      ɵɵelementStart(3, "clipPath");
      ɵɵelement(4, "rect");
      ɵɵelementEnd();
      ɵɵtemplate(5, GraphComponent__svg_g_5_Template, 6, 15, "g", 6);
      ɵɵelementEnd()();
    }
    if (rf & 2) {
      ɵɵstyleProp("width", ctx.width, "px");
      ɵɵproperty("@animationState", "active")("@.disabled", !ctx.animations);
      ɵɵadvance();
      ɵɵattribute("width", ctx.width)("height", ctx.height);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.initialized && ctx.graph);
      ɵɵadvance();
      ɵɵattribute("id", ctx.minimapClipPathId);
      ɵɵadvance();
      ɵɵattribute("width", ctx.graphDims.width / ctx.minimapScaleCoefficient)("height", ctx.graphDims.height / ctx.minimapScaleCoefficient);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.showMiniMap);
    }
  },
  dependencies: [MouseWheelDirective, NgIf, NgTemplateOutlet, NgForOf],
  styles: [".minimap .minimap-background{fill:#0000001a}.minimap .minimap-drag{fill:#0003;stroke:#fff;stroke-width:1px;stroke-dasharray:2px;stroke-dashoffset:2px;cursor:pointer}.minimap .minimap-drag.panning{fill:#0000004d}.minimap .minimap-nodes{opacity:.5;pointer-events:none}.graph{-webkit-user-select:none;-moz-user-select:none;user-select:none}.graph .edge{stroke:#666;fill:none}.graph .edge .edge-label{stroke:none;font-size:12px;fill:#251e1e}.graph .panning-rect{fill:#0000;cursor:move}.graph .node-group.old-node{transition:transform .5s ease-in-out}.graph .node-group .node:focus{outline:none}.graph .compound-node rect{opacity:.5}.graph .cluster rect{opacity:.2}\n"],
  encapsulation: 2,
  data: {
    animation: [trigger("animationState", [transition(":enter", [style({
      opacity: 0
    }), animate("500ms 100ms", style({
      opacity: 1
    }))])])]
  },
  changeDetection: 0
});
__decorate([throttleable(500)], GraphComponent.prototype, "updateMinimap", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GraphComponent, [{
    type: Component,
    args: [{
      selector: "ngx-graph",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      animations: [trigger("animationState", [transition(":enter", [style({
        opacity: 0
      }), animate("500ms 100ms", style({
        opacity: 1
      }))])])],
      template: `<div
  class="ngx-graph-outer"
  [style.width.px]="width"
  [@animationState]="'active'"
  [@.disabled]="!animations"
  (mouseWheelUp)="onZoom($event, 'in')"
  (mouseWheelDown)="onZoom($event, 'out')"
  mouseWheel
>
  <svg:svg class="ngx-graph" [attr.width]="width" [attr.height]="height">
    <svg:g
      *ngIf="initialized && graph"
      [attr.transform]="transform"
      (touchstart)="onTouchStart($event)"
      (touchend)="onTouchEnd($event)"
      class="graph chart"
    >
      <defs>
        <ng-container *ngIf="defsTemplate" [ngTemplateOutlet]="defsTemplate"></ng-container>
        <svg:path
          class="text-path"
          *ngFor="let link of graph.edges"
          [attr.d]="link.textPath"
          [attr.id]="link.id"
        ></svg:path>
      </defs>

      <svg:rect
        class="panning-rect"
        [attr.width]="dims.width * 100"
        [attr.height]="dims.height * 100"
        [attr.transform]="'translate(' + (-dims.width || 0) * 50 + ',' + (-dims.height || 0) * 50 + ')'"
        (mousedown)="isPanning = true"
      />

      <ng-content></ng-content>

      <svg:g class="clusters">
        <svg:g
          #clusterElement
          *ngFor="let node of graph.clusters; trackBy: trackNodeBy"
          class="node-group"
          [class.old-node]="animate && oldClusters.has(node.id)"
          [id]="node.id"
          [attr.transform]="node.transform"
          (click)="onClick(node)"
        >
          <ng-container
            *ngIf="clusterTemplate && !node.hidden"
            [ngTemplateOutlet]="clusterTemplate"
            [ngTemplateOutletContext]="{ $implicit: node }"
          ></ng-container>
          <svg:g *ngIf="!clusterTemplate" class="node cluster">
            <svg:rect
              [attr.width]="node.dimension.width"
              [attr.height]="node.dimension.height"
              [attr.fill]="node.data?.color"
            />
            <svg:text alignment-baseline="central" [attr.x]="10" [attr.y]="node.dimension.height / 2">
              {{ node.label }}
            </svg:text>
          </svg:g>
        </svg:g>
      </svg:g>

      <svg:g class="compound-nodes">
        <svg:g
          #nodeElement
          *ngFor="let node of graph.compoundNodes; trackBy: trackNodeBy"
          class="node-group"
          [class.old-node]="animate && oldCompoundNodes.has(node.id)"
          [id]="node.id"
          [attr.transform]="node.transform"
          (click)="onClick(node)"
          (mousedown)="onNodeMouseDown($event, node)"
        >
          <ng-container
            *ngIf="nodeTemplate && !node.hidden"
            [ngTemplateOutlet]="nodeTemplate"
            [ngTemplateOutletContext]="{ $implicit: node }"
          ></ng-container>
          <svg:g *ngIf="!nodeTemplate" class="node compound-node">
            <svg:rect
              [attr.width]="node.dimension.width"
              [attr.height]="node.dimension.height"
              [attr.fill]="node.data?.color"
            />
            <svg:text alignment-baseline="central" [attr.x]="10" [attr.y]="node.dimension.height / 2">
              {{ node.label }}
            </svg:text>
          </svg:g>
        </svg:g>
      </svg:g>

      <svg:g class="links">
        <svg:g #linkElement *ngFor="let link of graph.edges; trackBy: trackLinkBy" class="link-group" [id]="link.id">
          <ng-container
            *ngIf="linkTemplate"
            [ngTemplateOutlet]="linkTemplate"
            [ngTemplateOutletContext]="{ $implicit: link }"
          ></ng-container>
          <svg:path *ngIf="!linkTemplate" class="edge" [attr.d]="link.line" />
        </svg:g>
      </svg:g>

      <svg:g class="nodes">
        <svg:g
          #nodeElement
          *ngFor="let node of graph.nodes; trackBy: trackNodeBy"
          class="node-group"
          [class.old-node]="animate && oldNodes.has(node.id)"
          [id]="node.id"
          [attr.transform]="node.transform"
          (click)="onClick(node)"
          (mousedown)="onNodeMouseDown($event, node)"
        >
          <ng-container
            *ngIf="nodeTemplate && !node.hidden"
            [ngTemplateOutlet]="nodeTemplate"
            [ngTemplateOutletContext]="{ $implicit: node }"
          ></ng-container>
          <svg:circle
            *ngIf="!nodeTemplate"
            r="10"
            [attr.cx]="node.dimension.width / 2"
            [attr.cy]="node.dimension.height / 2"
            [attr.fill]="node.data?.color"
          />
        </svg:g>
      </svg:g>
    </svg:g>

    <svg:clipPath [attr.id]="minimapClipPathId">
      <svg:rect
        [attr.width]="graphDims.width / minimapScaleCoefficient"
        [attr.height]="graphDims.height / minimapScaleCoefficient"
      ></svg:rect>
    </svg:clipPath>

    <svg:g
      class="minimap"
      *ngIf="showMiniMap"
      [attr.transform]="minimapTransform"
      [attr.clip-path]="'url(#' + minimapClipPathId + ')'"
    >
      <svg:rect
        class="minimap-background"
        [attr.width]="graphDims.width / minimapScaleCoefficient"
        [attr.height]="graphDims.height / minimapScaleCoefficient"
        (mousedown)="onMinimapPanTo($event)"
      ></svg:rect>

      <svg:g
        [style.transform]="
          'translate(' +
          -minimapOffsetX / minimapScaleCoefficient +
          'px,' +
          -minimapOffsetY / minimapScaleCoefficient +
          'px)'
        "
      >
        <svg:g class="minimap-nodes" [style.transform]="'scale(' + 1 / minimapScaleCoefficient + ')'">
          <svg:g
            #nodeElement
            *ngFor="let node of graph.nodes; trackBy: trackNodeBy"
            class="node-group"
            [class.old-node]="animate && oldNodes.has(node.id)"
            [id]="node.id"
            [attr.transform]="node.transform"
          >
            <ng-container
              *ngIf="miniMapNodeTemplate"
              [ngTemplateOutlet]="miniMapNodeTemplate"
              [ngTemplateOutletContext]="{ $implicit: node }"
            ></ng-container>
            <ng-container
              *ngIf="!miniMapNodeTemplate && nodeTemplate"
              [ngTemplateOutlet]="nodeTemplate"
              [ngTemplateOutletContext]="{ $implicit: node }"
            ></ng-container>
            <svg:circle
              *ngIf="!nodeTemplate && !miniMapNodeTemplate"
              r="10"
              [attr.cx]="node.dimension.width / 2 / minimapScaleCoefficient"
              [attr.cy]="node.dimension.height / 2 / minimapScaleCoefficient"
              [attr.fill]="node.data?.color"
            />
          </svg:g>
        </svg:g>

        <svg:rect
          [attr.transform]="
            'translate(' +
            panOffsetX / zoomLevel / -minimapScaleCoefficient +
            ',' +
            panOffsetY / zoomLevel / -minimapScaleCoefficient +
            ')'
          "
          class="minimap-drag"
          [class.panning]="isMinimapPanning"
          [attr.width]="width / minimapScaleCoefficient / zoomLevel"
          [attr.height]="height / minimapScaleCoefficient / zoomLevel"
          (mousedown)="onMinimapDragMouseDown()"
        ></svg:rect>
      </svg:g>
    </svg:g>
  </svg:svg>
</div>
`,
      styles: [".minimap .minimap-background{fill:#0000001a}.minimap .minimap-drag{fill:#0003;stroke:#fff;stroke-width:1px;stroke-dasharray:2px;stroke-dashoffset:2px;cursor:pointer}.minimap .minimap-drag.panning{fill:#0000004d}.minimap .minimap-nodes{opacity:.5;pointer-events:none}.graph{-webkit-user-select:none;-moz-user-select:none;user-select:none}.graph .edge{stroke:#666;fill:none}.graph .edge .edge-label{stroke:none;font-size:12px;fill:#251e1e}.graph .panning-rect{fill:#0000;cursor:move}.graph .node-group.old-node{transition:transform .5s ease-in-out}.graph .node-group .node:focus{outline:none}.graph .compound-node rect{opacity:.5}.graph .cluster rect{opacity:.2}\n"]
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgZone
    }, {
      type: ChangeDetectorRef
    }, {
      type: LayoutService
    }];
  }, {
    nodes: [{
      type: Input
    }],
    clusters: [{
      type: Input
    }],
    compoundNodes: [{
      type: Input
    }],
    links: [{
      type: Input
    }],
    activeEntries: [{
      type: Input
    }],
    curve: [{
      type: Input
    }],
    draggingEnabled: [{
      type: Input
    }],
    nodeHeight: [{
      type: Input
    }],
    nodeMaxHeight: [{
      type: Input
    }],
    nodeMinHeight: [{
      type: Input
    }],
    nodeWidth: [{
      type: Input
    }],
    nodeMinWidth: [{
      type: Input
    }],
    nodeMaxWidth: [{
      type: Input
    }],
    panningEnabled: [{
      type: Input
    }],
    panningAxis: [{
      type: Input
    }],
    enableZoom: [{
      type: Input
    }],
    zoomSpeed: [{
      type: Input
    }],
    minZoomLevel: [{
      type: Input
    }],
    maxZoomLevel: [{
      type: Input
    }],
    autoZoom: [{
      type: Input
    }],
    panOnZoom: [{
      type: Input
    }],
    animate: [{
      type: Input
    }],
    autoCenter: [{
      type: Input
    }],
    update$: [{
      type: Input
    }],
    center$: [{
      type: Input
    }],
    zoomToFit$: [{
      type: Input
    }],
    panToNode$: [{
      type: Input
    }],
    layout: [{
      type: Input
    }],
    layoutSettings: [{
      type: Input
    }],
    enableTrackpadSupport: [{
      type: Input
    }],
    showMiniMap: [{
      type: Input
    }],
    miniMapMaxWidth: [{
      type: Input
    }],
    miniMapMaxHeight: [{
      type: Input
    }],
    miniMapPosition: [{
      type: Input
    }],
    view: [{
      type: Input
    }],
    scheme: [{
      type: Input
    }],
    customColors: [{
      type: Input
    }],
    animations: [{
      type: Input
    }],
    deferDisplayUntilPosition: [{
      type: Input
    }],
    centerNodesOnPositionChange: [{
      type: Input
    }],
    enablePreUpdateTransform: [{
      type: Input
    }],
    select: [{
      type: Output
    }],
    activate: [{
      type: Output
    }],
    deactivate: [{
      type: Output
    }],
    zoomChange: [{
      type: Output
    }],
    clickHandler: [{
      type: Output
    }],
    stateChange: [{
      type: Output
    }],
    linkTemplate: [{
      type: ContentChild,
      args: ["linkTemplate"]
    }],
    nodeTemplate: [{
      type: ContentChild,
      args: ["nodeTemplate"]
    }],
    clusterTemplate: [{
      type: ContentChild,
      args: ["clusterTemplate"]
    }],
    defsTemplate: [{
      type: ContentChild,
      args: ["defsTemplate"]
    }],
    miniMapNodeTemplate: [{
      type: ContentChild,
      args: ["miniMapNodeTemplate"]
    }],
    nodeElements: [{
      type: ViewChildren,
      args: ["nodeElement"]
    }],
    linkElements: [{
      type: ViewChildren,
      args: ["linkElement"]
    }],
    groupResultsBy: [{
      type: Input
    }],
    zoomLevel: [{
      type: Input,
      args: ["zoomLevel"]
    }],
    panOffsetX: [{
      type: Input,
      args: ["panOffsetX"]
    }],
    panOffsetY: [{
      type: Input,
      args: ["panOffsetY"]
    }],
    updateMinimap: [],
    onMouseMove: [{
      type: HostListener,
      args: ["document:mousemove", ["$event"]]
    }],
    onMouseDown: [{
      type: HostListener,
      args: ["document:mousedown", ["$event"]]
    }],
    graphClick: [{
      type: HostListener,
      args: ["document:click", ["$event"]]
    }],
    onTouchMove: [{
      type: HostListener,
      args: ["document:touchmove", ["$event"]]
    }],
    onMouseUp: [{
      type: HostListener,
      args: ["document:mouseup", ["$event"]]
    }]
  });
})();
var GraphModule = class {
};
GraphModule.ɵfac = function GraphModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || GraphModule)();
};
GraphModule.ɵmod = ɵɵdefineNgModule({
  type: GraphModule,
  declarations: [GraphComponent, MouseWheelDirective, VisibilityObserver],
  imports: [CommonModule],
  exports: [GraphComponent, MouseWheelDirective]
});
GraphModule.ɵinj = ɵɵdefineInjector({
  providers: [LayoutService],
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GraphModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [GraphComponent, MouseWheelDirective, VisibilityObserver],
      exports: [GraphComponent, MouseWheelDirective],
      providers: [LayoutService]
    }]
  }], null, null);
})();
var NgxGraphModule = class {
};
NgxGraphModule.ɵfac = function NgxGraphModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxGraphModule)();
};
NgxGraphModule.ɵmod = ɵɵdefineNgModule({
  type: NgxGraphModule,
  imports: [CommonModule],
  exports: [GraphModule]
});
NgxGraphModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule], GraphModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxGraphModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [GraphModule]
    }]
  }], null, null);
})();
export {
  Alignment,
  ColaForceDirectedLayout,
  D3ForceDirectedLayout,
  DagreClusterLayout,
  DagreLayout,
  DagreNodesOnlyLayout,
  GraphComponent,
  GraphModule,
  MiniMapPosition,
  MouseWheelDirective,
  NgxGraphModule,
  NgxGraphStates,
  Orientation,
  PanningAxis,
  toD3Node,
  toNode
};
//# sourceMappingURL=@swimlane_ngx-graph.js.map
