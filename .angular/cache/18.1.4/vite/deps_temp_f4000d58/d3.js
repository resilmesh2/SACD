import {
  center_default,
  collide_default,
  entries_default,
  keys_default,
  link_default,
  manyBody_default,
  map_default,
  nest_default,
  quadtree,
  radial_default,
  set_default,
  simulation_default,
  values_default,
  x_default,
  y_default
} from "./chunk-NRNLND2T.js";
import {
  appearance_default,
  arc_default,
  areaRadial_default,
  area_default,
  ascending_default,
  backIn,
  backInOut,
  backOut,
  basisClosed_default,
  basisOpen_default,
  basis_default,
  bounceIn,
  bounceInOut,
  bounceOut,
  bundle_default,
  cardinalClosed_default,
  cardinalOpen_default,
  cardinal_default,
  catmullRomClosed_default,
  catmullRomOpen_default,
  catmullRom_default,
  circleIn,
  circleInOut,
  circleOut,
  circle_default,
  cross_default,
  cubicIn,
  cubicInOut,
  cubicOut,
  descending_default,
  diamond_default,
  diverging_default,
  elasticIn,
  elasticInOut,
  elasticOut,
  expIn,
  expInOut,
  expOut,
  expand_default,
  insideOut_default,
  lineRadial_default,
  line_default,
  linear,
  linearClosed_default,
  linear_default,
  linkHorizontal,
  linkRadial,
  linkVertical,
  monotoneX,
  monotoneY,
  natural_default,
  none_default,
  none_default2,
  path_default,
  pie_default,
  pointRadial_default,
  polyIn,
  polyInOut,
  polyOut,
  quadIn,
  quadInOut,
  quadOut,
  reverse_default,
  silhouette_default,
  sinIn,
  sinInOut,
  sinOut,
  square_default,
  stack_default,
  star_default,
  stepAfter,
  stepBefore,
  step_default,
  symbol_default,
  symbols,
  triangle_default,
  wiggle_default,
  wye_default
} from "./chunk-RJSNDACT.js";
import "./chunk-VNZ2F6MF.js";

// node_modules/d3/dist/package.js
var version = "5.16.0";

// node_modules/d3/node_modules/d3-array/src/ascending.js
function ascending_default2(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3/node_modules/d3-array/src/bisector.js
function bisector_default(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x2, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x2) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x2, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x2) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
}
function ascendingComparator(f) {
  return function(d, x2) {
    return ascending_default2(f(d), x2);
  };
}

// node_modules/d3/node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector_default(ascending_default2);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisect_default = bisectRight;

// node_modules/d3/node_modules/d3-array/src/pairs.js
function pairs_default(array7, f) {
  if (f == null) f = pair;
  var i = 0, n = array7.length - 1, p = array7[0], pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = f(p, p = array7[++i]);
  return pairs;
}
function pair(a, b) {
  return [a, b];
}

// node_modules/d3/node_modules/d3-array/src/cross.js
function cross_default2(values0, values1, reduce) {
  var n0 = values0.length, n1 = values1.length, values = new Array(n0 * n1), i0, i1, i, value0;
  if (reduce == null) reduce = pair;
  for (i0 = i = 0; i0 < n0; ++i0) {
    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
      values[i] = reduce(value0, values1[i1]);
    }
  }
  return values;
}

// node_modules/d3/node_modules/d3-array/src/descending.js
function descending_default2(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

// node_modules/d3/node_modules/d3-array/src/number.js
function number_default(x2) {
  return x2 === null ? NaN : +x2;
}

// node_modules/d3/node_modules/d3-array/src/variance.js
function variance_default(values, valueof) {
  var n = values.length, m = 0, i = -1, mean = 0, value, delta, sum2 = 0;
  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number_default(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum2 += delta * (value - mean);
      }
    }
  } else {
    while (++i < n) {
      if (!isNaN(value = number_default(valueof(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum2 += delta * (value - mean);
      }
    }
  }
  if (m > 1) return sum2 / (m - 1);
}

// node_modules/d3/node_modules/d3-array/src/deviation.js
function deviation_default(array7, f) {
  var v = variance_default(array7, f);
  return v ? Math.sqrt(v) : v;
}

// node_modules/d3/node_modules/d3-array/src/extent.js
function extent_default(values, valueof) {
  var n = values.length, i = -1, value, min, max2;
  if (valueof == null) {
    while (++i < n) {
      if ((value = values[i]) != null && value >= value) {
        min = max2 = value;
        while (++i < n) {
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max2 < value) max2 = value;
          }
        }
      }
    }
  } else {
    while (++i < n) {
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max2 = value;
        while (++i < n) {
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max2 < value) max2 = value;
          }
        }
      }
    }
  }
  return [min, max2];
}

// node_modules/d3/node_modules/d3-array/src/array.js
var array = Array.prototype;
var slice = array.slice;
var map = array.map;

// node_modules/d3/node_modules/d3-array/src/constant.js
function constant_default(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3/node_modules/d3-array/src/identity.js
function identity_default(x2) {
  return x2;
}

// node_modules/d3/node_modules/d3-array/src/range.js
function range_default(start4, stop, step) {
  start4 = +start4, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start4, start4 = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop - start4) / step)) | 0, range2 = new Array(n);
  while (++i < n) {
    range2[i] = start4 + i * step;
  }
  return range2;
}

// node_modules/d3/node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function ticks_default(start4, stop, count2) {
  var reverse, i = -1, n, ticks, step;
  stop = +stop, start4 = +start4, count2 = +count2;
  if (start4 === stop && count2 > 0) return [start4];
  if (reverse = stop < start4) n = start4, start4 = stop, stop = n;
  if ((step = tickIncrement(start4, stop, count2)) === 0 || !isFinite(step)) return [];
  if (step > 0) {
    start4 = Math.ceil(start4 / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start4 + 1));
    while (++i < n) ticks[i] = (start4 + i) * step;
  } else {
    start4 = Math.floor(start4 * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start4 - stop + 1));
    while (++i < n) ticks[i] = (start4 - i) / step;
  }
  if (reverse) ticks.reverse();
  return ticks;
}
function tickIncrement(start4, stop, count2) {
  var step = (stop - start4) / Math.max(0, count2), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start4, stop, count2) {
  var step0 = Math.abs(stop - start4) / Math.max(0, count2), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start4 ? -step1 : step1;
}

// node_modules/d3/node_modules/d3-array/src/threshold/sturges.js
function sturges_default(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
}

// node_modules/d3/node_modules/d3-array/src/histogram.js
function histogram_default() {
  var value = identity_default, domain = extent_default, threshold2 = sturges_default;
  function histogram(data) {
    var i, n = data.length, x2, values = new Array(n);
    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }
    var xz = domain(values), x06 = xz[0], x12 = xz[1], tz = threshold2(values, x06, x12);
    if (!Array.isArray(tz)) {
      tz = tickStep(x06, x12, tz);
      tz = range_default(Math.ceil(x06 / tz) * tz, x12, tz);
    }
    var m = tz.length;
    while (tz[0] <= x06) tz.shift(), --m;
    while (tz[m - 1] > x12) tz.pop(), --m;
    var bins = new Array(m + 1), bin;
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x06;
      bin.x1 = i < m ? tz[i] : x12;
    }
    for (i = 0; i < n; ++i) {
      x2 = values[i];
      if (x06 <= x2 && x2 <= x12) {
        bins[bisect_default(tz, x2, 0, m)].push(data[i]);
      }
    }
    return bins;
  }
  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant_default(_), histogram) : value;
  };
  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : constant_default([_[0], _[1]]), histogram) : domain;
  };
  histogram.thresholds = function(_) {
    return arguments.length ? (threshold2 = typeof _ === "function" ? _ : Array.isArray(_) ? constant_default(slice.call(_)) : constant_default(_), histogram) : threshold2;
  };
  return histogram;
}

// node_modules/d3/node_modules/d3-array/src/quantile.js
function quantile_default(values, p, valueof) {
  if (valueof == null) valueof = number_default;
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = +valueof(values[i0], i0, values), value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}

// node_modules/d3/node_modules/d3-array/src/threshold/freedmanDiaconis.js
function freedmanDiaconis_default(values, min, max2) {
  values = map.call(values, number_default).sort(ascending_default2);
  return Math.ceil((max2 - min) / (2 * (quantile_default(values, 0.75) - quantile_default(values, 0.25)) * Math.pow(values.length, -1 / 3)));
}

// node_modules/d3/node_modules/d3-array/src/threshold/scott.js
function scott_default(values, min, max2) {
  return Math.ceil((max2 - min) / (3.5 * deviation_default(values) * Math.pow(values.length, -1 / 3)));
}

// node_modules/d3/node_modules/d3-array/src/max.js
function max_default(values, valueof) {
  var n = values.length, i = -1, value, max2;
  if (valueof == null) {
    while (++i < n) {
      if ((value = values[i]) != null && value >= value) {
        max2 = value;
        while (++i < n) {
          if ((value = values[i]) != null && value > max2) {
            max2 = value;
          }
        }
      }
    }
  } else {
    while (++i < n) {
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        max2 = value;
        while (++i < n) {
          if ((value = valueof(values[i], i, values)) != null && value > max2) {
            max2 = value;
          }
        }
      }
    }
  }
  return max2;
}

// node_modules/d3/node_modules/d3-array/src/mean.js
function mean_default(values, valueof) {
  var n = values.length, m = n, i = -1, value, sum2 = 0;
  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number_default(values[i]))) sum2 += value;
      else --m;
    }
  } else {
    while (++i < n) {
      if (!isNaN(value = number_default(valueof(values[i], i, values)))) sum2 += value;
      else --m;
    }
  }
  if (m) return sum2 / m;
}

// node_modules/d3/node_modules/d3-array/src/median.js
function median_default(values, valueof) {
  var n = values.length, i = -1, value, numbers = [];
  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number_default(values[i]))) {
        numbers.push(value);
      }
    }
  } else {
    while (++i < n) {
      if (!isNaN(value = number_default(valueof(values[i], i, values)))) {
        numbers.push(value);
      }
    }
  }
  return quantile_default(numbers.sort(ascending_default2), 0.5);
}

// node_modules/d3/node_modules/d3-array/src/merge.js
function merge_default(arrays) {
  var n = arrays.length, m, i = -1, j = 0, merged, array7;
  while (++i < n) j += arrays[i].length;
  merged = new Array(j);
  while (--n >= 0) {
    array7 = arrays[n];
    m = array7.length;
    while (--m >= 0) {
      merged[--j] = array7[m];
    }
  }
  return merged;
}

// node_modules/d3/node_modules/d3-array/src/min.js
function min_default(values, valueof) {
  var n = values.length, i = -1, value, min;
  if (valueof == null) {
    while (++i < n) {
      if ((value = values[i]) != null && value >= value) {
        min = value;
        while (++i < n) {
          if ((value = values[i]) != null && min > value) {
            min = value;
          }
        }
      }
    }
  } else {
    while (++i < n) {
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = value;
        while (++i < n) {
          if ((value = valueof(values[i], i, values)) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }
  return min;
}

// node_modules/d3/node_modules/d3-array/src/permute.js
function permute_default(array7, indexes) {
  var i = indexes.length, permutes = new Array(i);
  while (i--) permutes[i] = array7[indexes[i]];
  return permutes;
}

// node_modules/d3/node_modules/d3-array/src/scan.js
function scan_default(values, compare) {
  if (!(n = values.length)) return;
  var n, i = 0, j = 0, xi, xj = values[j];
  if (compare == null) compare = ascending_default2;
  while (++i < n) {
    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
      xj = xi, j = i;
    }
  }
  if (compare(xj, xj) === 0) return j;
}

// node_modules/d3/node_modules/d3-array/src/shuffle.js
function shuffle_default(array7, i0, i1) {
  var m = (i1 == null ? array7.length : i1) - (i0 = i0 == null ? 0 : +i0), t, i;
  while (m) {
    i = Math.random() * m-- | 0;
    t = array7[m + i0];
    array7[m + i0] = array7[i + i0];
    array7[i + i0] = t;
  }
  return array7;
}

// node_modules/d3/node_modules/d3-array/src/sum.js
function sum_default(values, valueof) {
  var n = values.length, i = -1, value, sum2 = 0;
  if (valueof == null) {
    while (++i < n) {
      if (value = +values[i]) sum2 += value;
    }
  } else {
    while (++i < n) {
      if (value = +valueof(values[i], i, values)) sum2 += value;
    }
  }
  return sum2;
}

// node_modules/d3/node_modules/d3-array/src/transpose.js
function transpose_default(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = min_default(matrix, length), transpose = new Array(m); ++i < m; ) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n; ) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
}
function length(d) {
  return d.length;
}

// node_modules/d3/node_modules/d3-array/src/zip.js
function zip_default() {
  return transpose_default(arguments);
}

// node_modules/d3-axis/src/array.js
var slice2 = Array.prototype.slice;

// node_modules/d3-axis/src/identity.js
function identity_default2(x2) {
  return x2;
}

// node_modules/d3-axis/src/axis.js
var top = 1;
var right = 2;
var bottom = 3;
var left = 4;
var epsilon = 1e-6;
function translateX(x2) {
  return "translate(" + (x2 + 0.5) + ",0)";
}
function translateY(y2) {
  return "translate(0," + (y2 + 0.5) + ")";
}
function number(scale) {
  return function(d) {
    return +scale(d);
  };
}
function center(scale) {
  var offset = Math.max(0, scale.bandwidth() - 1) / 2;
  if (scale.round()) offset = Math.round(offset);
  return function(d) {
    return +scale(d) + offset;
  };
}
function entering() {
  return !this.__axis;
}
function axis(orient, scale) {
  var tickArguments = [], tickValues = null, tickFormat = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, k = orient === top || orient === left ? -1 : 1, x2 = orient === left || orient === right ? "x" : "y", transform2 = orient === top || orient === bottom ? translateX : translateY;
  function axis2(context) {
    var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format2 = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity_default2 : tickFormat, spacing = Math.max(tickSizeInner, 0) + tickPadding, range2 = scale.range(), range0 = +range2[0] + 0.5, range1 = +range2[range2.length - 1] + 0.5, position = (scale.bandwidth ? center : number)(scale.copy()), selection4 = context.selection ? context.selection() : context, path = selection4.selectAll(".domain").data([null]), tick = selection4.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text = tick.select("text");
    path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
    tick = tick.merge(tickEnter);
    line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x2 + "2", k * tickSizeInner));
    text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x2, k * spacing).attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
    if (context !== selection4) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);
      tickExit = tickExit.transition(context).attr("opacity", epsilon).attr("transform", function(d) {
        return isFinite(d = position(d)) ? transform2(d) : this.getAttribute("transform");
      });
      tickEnter.attr("opacity", epsilon).attr("transform", function(d) {
        var p = this.parentNode.__axis;
        return transform2(p && isFinite(p = p(d)) ? p : position(d));
      });
    }
    tickExit.remove();
    path.attr("d", orient === left || orient == right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter : "M0.5," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + ",0.5H" + range1);
    tick.attr("opacity", 1).attr("transform", function(d) {
      return transform2(position(d));
    });
    line.attr(x2 + "2", k * tickSizeInner);
    text.attr(x2, k * spacing).text(format2);
    selection4.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
    selection4.each(function() {
      this.__axis = position;
    });
  }
  axis2.scale = function(_) {
    return arguments.length ? (scale = _, axis2) : scale;
  };
  axis2.ticks = function() {
    return tickArguments = slice2.call(arguments), axis2;
  };
  axis2.tickArguments = function(_) {
    return arguments.length ? (tickArguments = _ == null ? [] : slice2.call(_), axis2) : tickArguments.slice();
  };
  axis2.tickValues = function(_) {
    return arguments.length ? (tickValues = _ == null ? null : slice2.call(_), axis2) : tickValues && tickValues.slice();
  };
  axis2.tickFormat = function(_) {
    return arguments.length ? (tickFormat = _, axis2) : tickFormat;
  };
  axis2.tickSize = function(_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis2) : tickSizeInner;
  };
  axis2.tickSizeInner = function(_) {
    return arguments.length ? (tickSizeInner = +_, axis2) : tickSizeInner;
  };
  axis2.tickSizeOuter = function(_) {
    return arguments.length ? (tickSizeOuter = +_, axis2) : tickSizeOuter;
  };
  axis2.tickPadding = function(_) {
    return arguments.length ? (tickPadding = +_, axis2) : tickPadding;
  };
  return axis2;
}
function axisTop(scale) {
  return axis(top, scale);
}
function axisRight(scale) {
  return axis(right, scale);
}
function axisBottom(scale) {
  return axis(bottom, scale);
}
function axisLeft(scale) {
  return axis(left, scale);
}

// node_modules/d3-brush/node_modules/d3-dispatch/src/dispatch.js
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
function parseTypenames(typenames, types) {
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
    var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy3 = {}, _ = this._;
    for (var t in _) copy3[t] = _[t].slice();
    return new Dispatch(copy3);
  },
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get(type2, name) {
  for (var i = 0, n = type2.length, c3; i < n; ++i) {
    if ((c3 = type2[i]).name === name) {
      return c3.value;
    }
  }
}
function set(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null) type2.push({
    name,
    value: callback
  });
  return type2;
}
var dispatch_default = dispatch;

// node_modules/d3-brush/node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/d3-brush/node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? {
    space: namespaces_default[prefix],
    local: name
  } : name;
}

// node_modules/d3-brush/node_modules/d3-selection/src/creator.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/select.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/selectAll.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/filter.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/enter.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/constant.js
function constant_default2(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/data.js
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
  if (typeof value !== "function") value = constant_default2(value);
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/merge.js
function merge_default2(selection4) {
  for (var groups0 = this._groups, groups1 = selection4._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/order.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/sort.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() {
    nodes[++i] = this;
  });
  return nodes;
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/size.js
function size_default() {
  var size = 0;
  this.each(function() {
    ++size;
  });
  return size;
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/attr.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/style.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/property.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/classed.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/text.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/html.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create4 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create4.apply(this, arguments));
  });
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create4 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create4.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/clone.js
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/on.js
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
function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event4) {
    var related = event4.relatedTarget;
    if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
      listener.call(this, event4);
    }
  };
}
function contextListener(listener, index, group) {
  return function(event1) {
    var event0 = event;
    event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      event = event0;
    }
  };
}
function parseTypenames2(typenames) {
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
  var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
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
function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    event = event0;
  }
}

// node_modules/d3-brush/node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event4 = window2.CustomEvent;
  if (typeof event4 === "function") {
    event4 = new event4(type2, params);
  } else {
    event4 = window2.document.createEvent("Event");
    if (params) event4.initEvent(type2, params.bubbles, params.cancelable), event4.detail = params.detail;
    else event4.initEvent(type2, false, false);
  }
  node.dispatchEvent(event4);
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

// node_modules/d3-brush/node_modules/d3-selection/src/selection/index.js
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
  merge: merge_default2,
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
  dispatch: dispatch_default2
};
var selection_default = selection;

// node_modules/d3-brush/node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}

// node_modules/d3-brush/node_modules/d3-selection/src/local.js
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
    var id4 = this._;
    while (!(id4 in node)) if (!(node = node.parentNode)) return;
    return node[id4];
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

// node_modules/d3-brush/node_modules/d3-selection/src/sourceEvent.js
function sourceEvent_default() {
  var current = event, source;
  while (source = current.sourceEvent) current = source;
  return current;
}

// node_modules/d3-brush/node_modules/d3-selection/src/point.js
function point_default(node, event4) {
  var svg2 = node.ownerSVGElement || node;
  if (svg2.createSVGPoint) {
    var point2 = svg2.createSVGPoint();
    point2.x = event4.clientX, point2.y = event4.clientY;
    point2 = point2.matrixTransform(node.getScreenCTM().inverse());
    return [point2.x, point2.y];
  }
  var rect = node.getBoundingClientRect();
  return [event4.clientX - rect.left - node.clientLeft, event4.clientY - rect.top - node.clientTop];
}

// node_modules/d3-brush/node_modules/d3-selection/src/mouse.js
function mouse_default(node) {
  var event4 = sourceEvent_default();
  if (event4.changedTouches) event4 = event4.changedTouches[0];
  return point_default(node, event4);
}

// node_modules/d3-brush/node_modules/d3-selection/src/touch.js
function touch_default(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = sourceEvent_default().changedTouches;
  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return point_default(node, touch);
    }
  }
  return null;
}

// node_modules/d3-brush/node_modules/d3-drag/src/noevent.js
function noevent_default() {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// node_modules/d3-brush/node_modules/d3-drag/src/nodrag.js
function nodrag_default(view) {
  var root5 = view.document.documentElement, selection4 = select_default2(view).on("dragstart.drag", noevent_default, true);
  if ("onselectstart" in root5) {
    selection4.on("selectstart.drag", noevent_default, true);
  } else {
    root5.__noselect = root5.style.MozUserSelect;
    root5.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root5 = view.document.documentElement, selection4 = select_default2(view).on("dragstart.drag", null);
  if (noclick) {
    selection4.on("click.drag", noevent_default, true);
    setTimeout(function() {
      selection4.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root5) {
    selection4.on("selectstart.drag", null);
  } else {
    root5.style.MozUserSelect = root5.__noselect;
    delete root5.__noselect;
  }
}

// node_modules/d3-brush/node_modules/d3-drag/src/event.js
function DragEvent(target, type2, subject, id4, active, x2, y2, dx, dy, dispatch4) {
  this.target = target;
  this.type = type2;
  this.subject = subject;
  this.identifier = id4;
  this.active = active;
  this.x = x2;
  this.y = y2;
  this.dx = dx;
  this.dy = dy;
  this._ = dispatch4;
}
DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

// node_modules/d3-brush/node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-brush/node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
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
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min, l = (max2 + min) / 2;
  if (s) {
    if (r === max2) h = (g - b) / s + (g < b) * 6;
    else if (g === max2) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min : 2 - max2 - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-brush/node_modules/d3-color/src/math.js
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;

// node_modules/d3-brush/node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y2 = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x2, z;
  if (r === g && g === b) x2 = z = y2;
  else {
    x2 = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y2 - 16, 500 * (x2 - y2), 200 * (y2 - z), o.opacity);
}
function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}
function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Lab, lab, extend(Color, {
  brighter: function(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y2 = (this.l + 16) / 116, x2 = isNaN(this.a) ? y2 : y2 + this.a / 500, z = isNaN(this.b) ? y2 : y2 - this.b / 200;
    x2 = Xn * lab2xyz(x2);
    y2 = Yn * lab2xyz(y2);
    z = Zn * lab2xyz(z);
    return new Rgb(lrgb2rgb(3.1338561 * x2 - 1.6168667 * y2 - 0.4906146 * z), lrgb2rgb(-0.9787684 * x2 + 1.9161415 * y2 + 0.033454 * z), lrgb2rgb(0.0719453 * x2 - 0.2289914 * y2 + 1.4052427 * z), this.opacity);
  }
}));
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x2) {
  return 255 * (x2 <= 31308e-7 ? 12.92 * x2 : 1.055 * Math.pow(x2, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x2) {
  return (x2 /= 255) <= 0.04045 ? x2 / 12.92 : Math.pow((x2 + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h, c3, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c3, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c3, l, opacity) {
  this.h = +h;
  this.c = +c3;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * deg2rad;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/d3-brush/node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh3 = Math.cos(h), sinh3 = Math.sin(h);
    return new Rgb(255 * (l + a * (A * cosh3 + B * sinh3)), 255 * (l + a * (C * cosh3 + D * sinh3)), 255 * (l + a * (E * cosh3)), this.opacity);
  }
}));

// node_modules/d3-brush/node_modules/d3-interpolate/src/basis.js
function basis(t16, v0, v1, v2, v3) {
  var t25 = t16 * t16, t35 = t25 * t16;
  return ((1 - 3 * t16 + 3 * t25 - t35) * v0 + (4 - 6 * t25 + 3 * t35) * v1 + (1 + 3 * t16 + 3 * t25 - 3 * t35) * v2 + t35 * v3) / 6;
}
function basis_default2(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default2(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/constant.js
function constant_default4(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/color.js
function linear2(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y2) {
  return a = Math.pow(a, y2), b = Math.pow(b, y2) - a, y2 = 1 / y2, function(t) {
    return Math.pow(a + t * b, y2);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear2(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default4(isNaN(a) ? b : a);
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y2) : constant_default4(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear2(a, d) : constant_default4(isNaN(a) ? b : a);
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y2) {
  var color5 = gamma(y2);
  function rgb5(start4, end) {
    var r = color5((start4 = rgb(start4)).r, (end = rgb(end)).r), g = color5(start4.g, end.g), b = color5(start4.b, end.b), opacity = nogamma(start4.opacity, end.opacity);
    return function(t) {
      start4.r = r(t);
      start4.g = g(t);
      start4.b = b(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  }
  rgb5.gamma = rgbGamma;
  return rgb5;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color5;
    for (i = 0; i < n; ++i) {
      color5 = rgb(colors[i]);
      r[i] = color5.r || 0;
      g[i] = color5.g || 0;
      b[i] = color5.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color5.opacity = 1;
    return function(t) {
      color5.r = r(t);
      color5.g = g(t);
      color5.b = b(t);
      return color5 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default2);
var rgbBasisClosed = rgbSpline(basisClosed_default2);

// node_modules/d3-brush/node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c3 = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i) c3[i] = a[i] * (1 - t) + b[i] * t;
    return c3;
  };
}
function isNumberArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/array.js
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x2 = new Array(na), c3 = new Array(nb), i;
  for (i = 0; i < na; ++i) x2[i] = value_default(a[i], b[i]);
  for (; i < nb; ++i) c3[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i) c3[i] = x2[i](t);
    return c3;
  };
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/date.js
function date_default(a, b) {
  var d = /* @__PURE__ */ new Date();
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/number.js
function number_default2(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/object.js
function object_default(a, b) {
  var i = {}, c3 = {}, k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};
  for (k in b) {
    if (k in a) {
      i[k] = value_default(a[k], b[k]);
    } else {
      c3[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c3[k] = i[k](t);
    return c3;
  };
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({
        i,
        x: number_default2(am, bm)
      });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/value.js
function value_default(a, b) {
  var t = typeof b, c3;
  return b == null || t === "boolean" ? constant_default4(b) : (t === "number" ? number_default2 : t === "string" ? (c3 = color(b)) ? (b = c3, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default2)(a, b);
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a, b, c3, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c3 + b * d) c3 -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c3 * c3 + d * d)) c3 /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c3) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/transform/parse.js
var cssNode;
var cssRoot;
var cssView;
var svgNode;
function parseCss(value) {
  if (value === "none") return identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return decompose_default(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-brush/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: number_default2(xa, xb)
      }, {
        i: i - 2,
        x: number_default2(ya, yb)
      });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({
        i: s.push(pop(s) + "rotate(", null, degParen) - 2,
        x: number_default2(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({
        i: s.push(pop(s) + "skewX(", null, degParen) - 2,
        x: number_default2(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: number_default2(xa, xb)
      }, {
        i: i - 2,
        x: number_default2(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/d3-brush/node_modules/d3-interpolate/src/hsl.js
function hsl2(hue5) {
  return function(start4, end) {
    var h = hue5((start4 = hsl(start4)).h, (end = hsl(end)).h), s = nogamma(start4.s, end.s), l = nogamma(start4.l, end.l), opacity = nogamma(start4.opacity, end.opacity);
    return function(t) {
      start4.h = h(t);
      start4.s = s(t);
      start4.l = l(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/d3-brush/node_modules/d3-interpolate/src/hcl.js
function hcl2(hue5) {
  return function(start4, end) {
    var h = hue5((start4 = hcl(start4)).h, (end = hcl(end)).h), c3 = nogamma(start4.c, end.c), l = nogamma(start4.l, end.l), opacity = nogamma(start4.opacity, end.opacity);
    return function(t) {
      start4.h = h(t);
      start4.c = c3(t);
      start4.l = l(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/d3-brush/node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue5) {
  return function cubehelixGamma(y2) {
    y2 = +y2;
    function cubehelix9(start4, end) {
      var h = hue5((start4 = cubehelix(start4)).h, (end = cubehelix(end)).h), s = nogamma(start4.s, end.s), l = nogamma(start4.l, end.l), opacity = nogamma(start4.opacity, end.opacity);
      return function(t) {
        start4.h = h(t);
        start4.s = s(t);
        start4.l = l(Math.pow(t, y2));
        start4.opacity = opacity(t);
        return start4 + "";
      };
    }
    cubehelix9.gamma = cubehelixGamma;
    return cubehelix9;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/d3-brush/node_modules/d3-timer/src/timer.js
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
  var t = new Timer();
  t.restart(callback, delay, time);
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
  var now4 = clock.now(), delay = now4 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now4;
}
function nap() {
  var t06, t16 = taskHead, t25, time = Infinity;
  while (t16) {
    if (t16._call) {
      if (time > t16._time) time = t16._time;
      t06 = t16, t16 = t16._next;
    } else {
      t25 = t16._next, t16._next = null;
      t16 = t06 ? t06._next = t25 : taskHead = t25;
    }
  }
  taskTail = t06;
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

// node_modules/d3-brush/node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name, id4, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id4 in schedules) return;
  create(node, id4, {
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
function init(node, id4) {
  var schedule = get2(node, id4);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id4) {
  var schedule = get2(node, id4);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}
function get2(node, id4) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id4])) throw new Error("transition not found");
  return schedule;
}
function create(node, id4, self) {
  var schedules = node.__transition, tween;
  schedules[id4] = self;
  self.timer = timer(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start4, self.delay, self.time);
    if (self.delay <= elapsed) start4(elapsed - self.delay);
  }
  function start4(elapsed) {
    var i, j, n, o;
    if (self.state !== SCHEDULED) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;
      if (o.state === STARTED) return timeout_default(start4);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id4) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
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
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id4];
    for (var i in schedules) return;
    delete node.__transition;
  }
}

// node_modules/d3-brush/node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty5 = true, i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty5 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty5) delete node.__transition;
}

// node_modules/d3-brush/node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id4, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id4), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id4, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule = set2(this, id4), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {
        name,
        value
      }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id4 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id4).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id4, name, value));
}
function tweenValue(transition4, name, value) {
  var id4 = transition4._id;
  transition4.each(function() {
    var schedule = set2(this, id4);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id4).value[name];
  };
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a, b) {
  var c3;
  return (typeof b === "number" ? number_default2 : b instanceof color ? rgb_default : (c3 = color(b)) ? (b = c3, rgb_default) : string_default)(a, b);
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/attr.js
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
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t06, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t06 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t06;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t06, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t06 = (i0 = i) && attrInterpolate(name, i);
    return t06;
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

// node_modules/d3-brush/node_modules/d3-transition/src/transition/delay.js
function delayFunction(id4, value) {
  return function() {
    init(this, id4).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id4, value) {
  return value = +value, function() {
    init(this, id4).delay = value;
  };
}
function delay_default(value) {
  var id4 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id4, value)) : get2(this.node(), id4).delay;
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/duration.js
function durationFunction(id4, value) {
  return function() {
    set2(this, id4).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id4, value) {
  return value = +value, function() {
    set2(this, id4).duration = value;
  };
}
function duration_default(value) {
  var id4 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id4, value)) : get2(this.node(), id4).duration;
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/ease.js
function easeConstant(id4, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set2(this, id4).ease = value;
  };
}
function ease_default(value) {
  var id4 = this._id;
  return arguments.length ? this.each(easeConstant(id4, value)) : get2(this.node(), id4).ease;
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/merge.js
function merge_default3(transition4) {
  if (transition4._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition4._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id4, name, listener) {
  var on0, on1, sit = start(name) ? init : set2;
  return function() {
    var schedule = sit(this, id4), on = schedule.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id4 = this._id;
  return arguments.length < 2 ? get2(this.node(), id4).on.on(name) : this.each(onFunction(id4, name, listener));
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/remove.js
function removeFunction(id4) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id4) return;
    if (parent) parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/select.js
function select_default3(select) {
  var name = this._name, id4 = this._id;
  if (typeof select !== "function") select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id4, i, subgroup, get2(node, id4));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id4);
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default3(select) {
  var name = this._name, id4 = this._id;
  if (typeof select !== "function") select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit4 = get2(node, id4), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule_default(child, name, id4, k, children, inherit4);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id4);
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/style.js
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
function styleMaybeRemove(id4, name) {
  var on0, on1, listener0, key = "style." + name, event4 = "end." + key, remove4;
  return function() {
    var schedule = set2(this, id4), on = schedule.on, listener = schedule.value[key] == null ? remove4 || (remove4 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event4, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
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

// node_modules/d3-brush/node_modules/d3-transition/src/transition/text.js
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

// node_modules/d3-brush/node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t06, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t06 = (i0 = i) && textInterpolate(i);
    return t06;
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

// node_modules/d3-brush/node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit4 = get2(node, id0);
        schedule_default(node, name, id1, i, group, {
          time: inherit4.time + inherit4.delay + inherit4.duration,
          delay: 0,
          duration: inherit4.duration,
          ease: inherit4.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id4 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {
      value: reject
    }, end = {
      value: function() {
        if (--size === 0) resolve();
      }
    };
    that.each(function() {
      var schedule = set2(this, id4), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
  });
}

// node_modules/d3-brush/node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups, parents, name, id4) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id4;
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
  selectAll: selectAll_default3,
  filter: filter_default2,
  merge: merge_default3,
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
  end: end_default
};

// node_modules/d3-brush/node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id4) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id4])) {
    if (!(node = node.parentNode)) {
      return defaultTiming.time = now(), defaultTiming;
    }
  }
  return timing;
}
function transition_default2(name) {
  var id4, timing;
  if (name instanceof Transition) {
    id4 = name._id, name = name._name;
  } else {
    id4 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default(node, name, id4, i, group, timing || inherit(node, id4));
      }
    }
  }
  return new Transition(groups, this._parents, name, id4);
}

// node_modules/d3-brush/node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// node_modules/d3-brush/src/constant.js
function constant_default5(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-brush/src/event.js
function event_default(target, type2, selection4) {
  this.target = target;
  this.type = type2;
  this.selection = selection4;
}

// node_modules/d3-brush/src/noevent.js
function nopropagation2() {
  event.stopImmediatePropagation();
}
function noevent_default2() {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// node_modules/d3-brush/src/brush.js
var MODE_DRAG = {
  name: "drag"
};
var MODE_SPACE = {
  name: "space"
};
var MODE_HANDLE = {
  name: "handle"
};
var MODE_CENTER = {
  name: "center"
};
function number1(e) {
  return [+e[0], +e[1]];
}
function number2(e) {
  return [number1(e[0]), number1(e[1])];
}
function toucher(identifier) {
  return function(target) {
    return touch_default(target, event.touches, identifier);
  };
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x2, e) {
    return x2 == null ? null : [[+x2[0], e[0][1]], [+x2[1], e[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y2, e) {
    return y2 == null ? null : [[e[0][0], +y2[0]], [e[1][0], +y2[1]]];
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
var cursors = {
  overlay: "crosshair",
  selection: "move",
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
};
var flipX = {
  e: "w",
  w: "e",
  nw: "ne",
  ne: "nw",
  se: "sw",
  sw: "se"
};
var flipY = {
  n: "s",
  s: "n",
  nw: "sw",
  ne: "se",
  se: "ne",
  sw: "nw"
};
var signsX = {
  overlay: 1,
  selection: 1,
  n: null,
  e: 1,
  s: null,
  w: -1,
  nw: -1,
  ne: 1,
  se: 1,
  sw: -1
};
var signsY = {
  overlay: 1,
  selection: 1,
  n: -1,
  e: null,
  s: 1,
  w: null,
  nw: -1,
  ne: -1,
  se: 1,
  sw: 1
};
function type(t) {
  return {
    type: t
  };
}
function defaultFilter() {
  return !event.ctrlKey && !event.button;
}
function defaultExtent() {
  var svg2 = this.ownerSVGElement || this;
  if (svg2.hasAttribute("viewBox")) {
    svg2 = svg2.viewBox.baseVal;
    return [[svg2.x, svg2.y], [svg2.x + svg2.width, svg2.y + svg2.height]];
  }
  return [[0, 0], [svg2.width.baseVal.value, svg2.height.baseVal.value]];
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function local2(node) {
  while (!node.__brush) if (!(node = node.parentNode)) return;
  return node.__brush;
}
function empty2(extent) {
  return extent[0][0] === extent[1][0] || extent[0][1] === extent[1][1];
}
function brushSelection(node) {
  var state = node.__brush;
  return state ? state.dim.output(state.selection) : null;
}
function brushX() {
  return brush(X);
}
function brushY() {
  return brush(Y);
}
function brush_default() {
  return brush(XY);
}
function brush(dim) {
  var extent = defaultExtent, filter = defaultFilter, touchable = defaultTouchable, keys = true, listeners = dispatch_default("start", "brush", "end"), handleSize = 6, touchending;
  function brush2(group) {
    var overlay = group.property("__brush", initialize).selectAll(".overlay").data([type("overlay")]);
    overlay.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", cursors.overlay).merge(overlay).each(function() {
      var extent2 = local2(this).extent;
      select_default2(this).attr("x", extent2[0][0]).attr("y", extent2[0][1]).attr("width", extent2[1][0] - extent2[0][0]).attr("height", extent2[1][1] - extent2[0][1]);
    });
    group.selectAll(".selection").data([type("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", cursors.selection).attr("fill", "#777").attr("fill-opacity", 0.3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
    var handle = group.selectAll(".handle").data(dim.handles, function(d) {
      return d.type;
    });
    handle.exit().remove();
    handle.enter().append("rect").attr("class", function(d) {
      return "handle handle--" + d.type;
    }).attr("cursor", function(d) {
      return cursors[d.type];
    });
    group.each(redraw).attr("fill", "none").attr("pointer-events", "all").on("mousedown.brush", started).filter(touchable).on("touchstart.brush", started).on("touchmove.brush", touchmoved).on("touchend.brush touchcancel.brush", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  brush2.move = function(group, selection4) {
    if (group.selection) {
      group.on("start.brush", function() {
        emitter(this, arguments).beforestart().start();
      }).on("interrupt.brush end.brush", function() {
        emitter(this, arguments).end();
      }).tween("brush", function() {
        var that = this, state = that.__brush, emit = emitter(that, arguments), selection0 = state.selection, selection1 = dim.input(typeof selection4 === "function" ? selection4.apply(this, arguments) : selection4, state.extent), i = value_default(selection0, selection1);
        function tween(t) {
          state.selection = t === 1 && selection1 === null ? null : i(t);
          redraw.call(that);
          emit.brush();
        }
        return selection0 !== null && selection1 !== null ? tween : tween(1);
      });
    } else {
      group.each(function() {
        var that = this, args = arguments, state = that.__brush, selection1 = dim.input(typeof selection4 === "function" ? selection4.apply(that, args) : selection4, state.extent), emit = emitter(that, args).beforestart();
        interrupt_default(that);
        state.selection = selection1 === null ? null : selection1;
        redraw.call(that);
        emit.start().brush().end();
      });
    }
  };
  brush2.clear = function(group) {
    brush2.move(group, null);
  };
  function redraw() {
    var group = select_default2(this), selection4 = local2(this).selection;
    if (selection4) {
      group.selectAll(".selection").style("display", null).attr("x", selection4[0][0]).attr("y", selection4[0][1]).attr("width", selection4[1][0] - selection4[0][0]).attr("height", selection4[1][1] - selection4[0][1]);
      group.selectAll(".handle").style("display", null).attr("x", function(d) {
        return d.type[d.type.length - 1] === "e" ? selection4[1][0] - handleSize / 2 : selection4[0][0] - handleSize / 2;
      }).attr("y", function(d) {
        return d.type[0] === "s" ? selection4[1][1] - handleSize / 2 : selection4[0][1] - handleSize / 2;
      }).attr("width", function(d) {
        return d.type === "n" || d.type === "s" ? selection4[1][0] - selection4[0][0] + handleSize : handleSize;
      }).attr("height", function(d) {
        return d.type === "e" || d.type === "w" ? selection4[1][1] - selection4[0][1] + handleSize : handleSize;
      });
    } else {
      group.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null);
    }
  }
  function emitter(that, args, clean) {
    var emit = that.__brush.emitter;
    return emit && (!clean || !emit.clean) ? emit : new Emitter(that, args, clean);
  }
  function Emitter(that, args, clean) {
    this.that = that;
    this.args = args;
    this.state = that.__brush;
    this.active = 0;
    this.clean = clean;
  }
  Emitter.prototype = {
    beforestart: function() {
      if (++this.active === 1) this.state.emitter = this, this.starting = true;
      return this;
    },
    start: function() {
      if (this.starting) this.starting = false, this.emit("start");
      else this.emit("brush");
      return this;
    },
    brush: function() {
      this.emit("brush");
      return this;
    },
    end: function() {
      if (--this.active === 0) delete this.state.emitter, this.emit("end");
      return this;
    },
    emit: function(type2) {
      customEvent(new event_default(brush2, type2, dim.output(this.state.selection)), listeners.apply, listeners, [type2, this.that, this.args]);
    }
  };
  function started() {
    if (touchending && !event.touches) return;
    if (!filter.apply(this, arguments)) return;
    var that = this, type2 = event.target.__data__.type, mode = (keys && event.metaKey ? type2 = "overlay" : type2) === "selection" ? MODE_DRAG : keys && event.altKey ? MODE_CENTER : MODE_HANDLE, signX = dim === Y ? null : signsX[type2], signY = dim === X ? null : signsY[type2], state = local2(that), extent2 = state.extent, selection4 = state.selection, W = extent2[0][0], w0, w1, N = extent2[0][1], n0, n1, E5 = extent2[1][0], e0, e1, S = extent2[1][1], s0, s1, dx = 0, dy = 0, moving, shifting = signX && signY && keys && event.shiftKey, lockX, lockY, pointer = event.touches ? toucher(event.changedTouches[0].identifier) : mouse_default, point0 = pointer(that), point2 = point0, emit = emitter(that, arguments, true).beforestart();
    if (type2 === "overlay") {
      if (selection4) moving = true;
      state.selection = selection4 = [[w0 = dim === Y ? W : point0[0], n0 = dim === X ? N : point0[1]], [e0 = dim === Y ? E5 : w0, s0 = dim === X ? S : n0]];
    } else {
      w0 = selection4[0][0];
      n0 = selection4[0][1];
      e0 = selection4[1][0];
      s0 = selection4[1][1];
    }
    w1 = w0;
    n1 = n0;
    e1 = e0;
    s1 = s0;
    var group = select_default2(that).attr("pointer-events", "none");
    var overlay = group.selectAll(".overlay").attr("cursor", cursors[type2]);
    if (event.touches) {
      emit.moved = moved;
      emit.ended = ended;
    } else {
      var view = select_default2(event.view).on("mousemove.brush", moved, true).on("mouseup.brush", ended, true);
      if (keys) view.on("keydown.brush", keydowned, true).on("keyup.brush", keyupped, true);
      nodrag_default(event.view);
    }
    nopropagation2();
    interrupt_default(that);
    redraw.call(that);
    emit.start();
    function moved() {
      var point1 = pointer(that);
      if (shifting && !lockX && !lockY) {
        if (Math.abs(point1[0] - point2[0]) > Math.abs(point1[1] - point2[1])) lockY = true;
        else lockX = true;
      }
      point2 = point1;
      moving = true;
      noevent_default2();
      move();
    }
    function move() {
      var t;
      dx = point2[0] - point0[0];
      dy = point2[1] - point0[1];
      switch (mode) {
        case MODE_SPACE:
        case MODE_DRAG: {
          if (signX) dx = Math.max(W - w0, Math.min(E5 - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
          if (signY) dy = Math.max(N - n0, Math.min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
          break;
        }
        case MODE_HANDLE: {
          if (signX < 0) dx = Math.max(W - w0, Math.min(E5 - w0, dx)), w1 = w0 + dx, e1 = e0;
          else if (signX > 0) dx = Math.max(W - e0, Math.min(E5 - e0, dx)), w1 = w0, e1 = e0 + dx;
          if (signY < 0) dy = Math.max(N - n0, Math.min(S - n0, dy)), n1 = n0 + dy, s1 = s0;
          else if (signY > 0) dy = Math.max(N - s0, Math.min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
          break;
        }
        case MODE_CENTER: {
          if (signX) w1 = Math.max(W, Math.min(E5, w0 - dx * signX)), e1 = Math.max(W, Math.min(E5, e0 + dx * signX));
          if (signY) n1 = Math.max(N, Math.min(S, n0 - dy * signY)), s1 = Math.max(N, Math.min(S, s0 + dy * signY));
          break;
        }
      }
      if (e1 < w1) {
        signX *= -1;
        t = w0, w0 = e0, e0 = t;
        t = w1, w1 = e1, e1 = t;
        if (type2 in flipX) overlay.attr("cursor", cursors[type2 = flipX[type2]]);
      }
      if (s1 < n1) {
        signY *= -1;
        t = n0, n0 = s0, s0 = t;
        t = n1, n1 = s1, s1 = t;
        if (type2 in flipY) overlay.attr("cursor", cursors[type2 = flipY[type2]]);
      }
      if (state.selection) selection4 = state.selection;
      if (lockX) w1 = selection4[0][0], e1 = selection4[1][0];
      if (lockY) n1 = selection4[0][1], s1 = selection4[1][1];
      if (selection4[0][0] !== w1 || selection4[0][1] !== n1 || selection4[1][0] !== e1 || selection4[1][1] !== s1) {
        state.selection = [[w1, n1], [e1, s1]];
        redraw.call(that);
        emit.brush();
      }
    }
    function ended() {
      nopropagation2();
      if (event.touches) {
        if (event.touches.length) return;
        if (touchending) clearTimeout(touchending);
        touchending = setTimeout(function() {
          touchending = null;
        }, 500);
      } else {
        yesdrag(event.view, moving);
        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
      }
      group.attr("pointer-events", "all");
      overlay.attr("cursor", cursors.overlay);
      if (state.selection) selection4 = state.selection;
      if (empty2(selection4)) state.selection = null, redraw.call(that);
      emit.end();
    }
    function keydowned() {
      switch (event.keyCode) {
        case 16: {
          shifting = signX && signY;
          break;
        }
        case 18: {
          if (mode === MODE_HANDLE) {
            if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
            if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
            mode = MODE_CENTER;
            move();
          }
          break;
        }
        case 32: {
          if (mode === MODE_HANDLE || mode === MODE_CENTER) {
            if (signX < 0) e0 = e1 - dx;
            else if (signX > 0) w0 = w1 - dx;
            if (signY < 0) s0 = s1 - dy;
            else if (signY > 0) n0 = n1 - dy;
            mode = MODE_SPACE;
            overlay.attr("cursor", cursors.selection);
            move();
          }
          break;
        }
        default:
          return;
      }
      noevent_default2();
    }
    function keyupped() {
      switch (event.keyCode) {
        case 16: {
          if (shifting) {
            lockX = lockY = shifting = false;
            move();
          }
          break;
        }
        case 18: {
          if (mode === MODE_CENTER) {
            if (signX < 0) e0 = e1;
            else if (signX > 0) w0 = w1;
            if (signY < 0) s0 = s1;
            else if (signY > 0) n0 = n1;
            mode = MODE_HANDLE;
            move();
          }
          break;
        }
        case 32: {
          if (mode === MODE_SPACE) {
            if (event.altKey) {
              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
              if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
              mode = MODE_CENTER;
            } else {
              if (signX < 0) e0 = e1;
              else if (signX > 0) w0 = w1;
              if (signY < 0) s0 = s1;
              else if (signY > 0) n0 = n1;
              mode = MODE_HANDLE;
            }
            overlay.attr("cursor", cursors[type2]);
            move();
          }
          break;
        }
        default:
          return;
      }
      noevent_default2();
    }
  }
  function touchmoved() {
    emitter(this, arguments).moved();
  }
  function touchended() {
    emitter(this, arguments).ended();
  }
  function initialize() {
    var state = this.__brush || {
      selection: null
    };
    state.extent = number2(extent.apply(this, arguments));
    state.dim = dim;
    return state;
  }
  brush2.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant_default5(number2(_)), brush2) : extent;
  };
  brush2.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default5(!!_), brush2) : filter;
  };
  brush2.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default5(!!_), brush2) : touchable;
  };
  brush2.handleSize = function(_) {
    return arguments.length ? (handleSize = +_, brush2) : handleSize;
  };
  brush2.keyModifiers = function(_) {
    return arguments.length ? (keys = !!_, brush2) : keys;
  };
  brush2.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? brush2 : value;
  };
  return brush2;
}

// node_modules/d3-chord/node_modules/d3-array/src/ascending.js
function ascending_default3(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3-chord/node_modules/d3-array/src/bisector.js
function bisector_default2(compare) {
  if (compare.length === 1) compare = ascendingComparator2(compare);
  return {
    left: function(a, x2, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x2) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x2, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x2) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
}
function ascendingComparator2(f) {
  return function(d, x2) {
    return ascending_default3(f(d), x2);
  };
}

// node_modules/d3-chord/node_modules/d3-array/src/bisect.js
var ascendingBisect2 = bisector_default2(ascending_default3);
var bisectRight2 = ascendingBisect2.right;
var bisectLeft2 = ascendingBisect2.left;

// node_modules/d3-chord/node_modules/d3-array/src/array.js
var array2 = Array.prototype;
var slice3 = array2.slice;
var map2 = array2.map;

// node_modules/d3-chord/node_modules/d3-array/src/range.js
function range_default2(start4, stop, step) {
  start4 = +start4, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start4, start4 = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop - start4) / step)) | 0, range2 = new Array(n);
  while (++i < n) {
    range2[i] = start4 + i * step;
  }
  return range2;
}

// node_modules/d3-chord/node_modules/d3-array/src/ticks.js
var e102 = Math.sqrt(50);
var e52 = Math.sqrt(10);
var e22 = Math.sqrt(2);

// node_modules/d3-chord/src/math.js
var cos = Math.cos;
var sin = Math.sin;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = pi * 2;
var max = Math.max;

// node_modules/d3-chord/src/chord.js
function compareValue(compare) {
  return function(a, b) {
    return compare(a.source.value + a.target.value, b.source.value + b.target.value);
  };
}
function chord_default() {
  var padAngle = 0, sortGroups = null, sortSubgroups = null, sortChords = null;
  function chord(matrix) {
    var n = matrix.length, groupSums = [], groupIndex = range_default2(n), subgroupIndex = [], chords = [], groups = chords.groups = new Array(n), subgroups = new Array(n * n), k, x2, x06, dx, i, j;
    k = 0, i = -1;
    while (++i < n) {
      x2 = 0, j = -1;
      while (++j < n) {
        x2 += matrix[i][j];
      }
      groupSums.push(x2);
      subgroupIndex.push(range_default2(n));
      k += x2;
    }
    if (sortGroups) groupIndex.sort(function(a, b) {
      return sortGroups(groupSums[a], groupSums[b]);
    });
    if (sortSubgroups) subgroupIndex.forEach(function(d, i2) {
      d.sort(function(a, b) {
        return sortSubgroups(matrix[i2][a], matrix[i2][b]);
      });
    });
    k = max(0, tau - padAngle * n) / k;
    dx = k ? padAngle : tau / n;
    x2 = 0, i = -1;
    while (++i < n) {
      x06 = x2, j = -1;
      while (++j < n) {
        var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x2, a1 = x2 += v * k;
        subgroups[dj * n + di] = {
          index: di,
          subindex: dj,
          startAngle: a0,
          endAngle: a1,
          value: v
        };
      }
      groups[di] = {
        index: di,
        startAngle: x06,
        endAngle: x2,
        value: groupSums[di]
      };
      x2 += dx;
    }
    i = -1;
    while (++i < n) {
      j = i - 1;
      while (++j < n) {
        var source = subgroups[j * n + i], target = subgroups[i * n + j];
        if (source.value || target.value) {
          chords.push(source.value < target.value ? {
            source: target,
            target: source
          } : {
            source,
            target
          });
        }
      }
    }
    return sortChords ? chords.sort(sortChords) : chords;
  }
  chord.padAngle = function(_) {
    return arguments.length ? (padAngle = max(0, _), chord) : padAngle;
  };
  chord.sortGroups = function(_) {
    return arguments.length ? (sortGroups = _, chord) : sortGroups;
  };
  chord.sortSubgroups = function(_) {
    return arguments.length ? (sortSubgroups = _, chord) : sortSubgroups;
  };
  chord.sortChords = function(_) {
    return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, chord) : sortChords && sortChords._;
  };
  return chord;
}

// node_modules/d3-chord/src/array.js
var slice4 = Array.prototype.slice;

// node_modules/d3-chord/src/constant.js
function constant_default7(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-chord/src/ribbon.js
function defaultSource(d) {
  return d.source;
}
function defaultTarget(d) {
  return d.target;
}
function defaultRadius(d) {
  return d.radius;
}
function defaultStartAngle(d) {
  return d.startAngle;
}
function defaultEndAngle(d) {
  return d.endAngle;
}
function ribbon_default() {
  var source = defaultSource, target = defaultTarget, radius = defaultRadius, startAngle = defaultStartAngle, endAngle = defaultEndAngle, context = null;
  function ribbon() {
    var buffer, argv = slice4.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv), sr = +radius.apply(this, (argv[0] = s, argv)), sa0 = startAngle.apply(this, argv) - halfPi, sa1 = endAngle.apply(this, argv) - halfPi, sx0 = sr * cos(sa0), sy0 = sr * sin(sa0), tr = +radius.apply(this, (argv[0] = t, argv)), ta0 = startAngle.apply(this, argv) - halfPi, ta1 = endAngle.apply(this, argv) - halfPi;
    if (!context) context = buffer = path_default();
    context.moveTo(sx0, sy0);
    context.arc(0, 0, sr, sa0, sa1);
    if (sa0 !== ta0 || sa1 !== ta1) {
      context.quadraticCurveTo(0, 0, tr * cos(ta0), tr * sin(ta0));
      context.arc(0, 0, tr, ta0, ta1);
    }
    context.quadraticCurveTo(0, 0, sx0, sy0);
    context.closePath();
    if (buffer) return context = null, buffer + "" || null;
  }
  ribbon.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default7(+_), ribbon) : radius;
  };
  ribbon.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default7(+_), ribbon) : startAngle;
  };
  ribbon.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default7(+_), ribbon) : endAngle;
  };
  ribbon.source = function(_) {
    return arguments.length ? (source = _, ribbon) : source;
  };
  ribbon.target = function(_) {
    return arguments.length ? (target = _, ribbon) : target;
  };
  ribbon.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, ribbon) : context;
  };
  return ribbon;
}

// node_modules/d3/node_modules/d3-color/src/define.js
function define_default2(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend2(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3/node_modules/d3-color/src/color.js
function Color2() {
}
var darker2 = 0.7;
var brighter2 = 1 / darker2;
var reI2 = "\\s*([+-]?\\d+)\\s*";
var reN2 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP2 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex2 = /^#([0-9a-f]{3,8})$/;
var reRgbInteger2 = new RegExp("^rgb\\(" + [reI2, reI2, reI2] + "\\)$");
var reRgbPercent2 = new RegExp("^rgb\\(" + [reP2, reP2, reP2] + "\\)$");
var reRgbaInteger2 = new RegExp("^rgba\\(" + [reI2, reI2, reI2, reN2] + "\\)$");
var reRgbaPercent2 = new RegExp("^rgba\\(" + [reP2, reP2, reP2, reN2] + "\\)$");
var reHslPercent2 = new RegExp("^hsl\\(" + [reN2, reP2, reP2] + "\\)$");
var reHslaPercent2 = new RegExp("^hsla\\(" + [reN2, reP2, reP2, reN2] + "\\)$");
var named2 = {
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
define_default2(Color2, color2, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex2,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex2,
  formatHsl: color_formatHsl2,
  formatRgb: color_formatRgb2,
  toString: color_formatRgb2
});
function color_formatHex2() {
  return this.rgb().formatHex();
}
function color_formatHsl2() {
  return hslConvert2(this).formatHsl();
}
function color_formatRgb2() {
  return this.rgb().formatRgb();
}
function color2(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex2.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn2(m) : l === 3 ? new Rgb2(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba2(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba2(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger2.exec(format2)) ? new Rgb2(m[1], m[2], m[3], 1) : (m = reRgbPercent2.exec(format2)) ? new Rgb2(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger2.exec(format2)) ? rgba2(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent2.exec(format2)) ? rgba2(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent2.exec(format2)) ? hsla2(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent2.exec(format2)) ? hsla2(m[1], m[2] / 100, m[3] / 100, m[4]) : named2.hasOwnProperty(format2) ? rgbn2(named2[format2]) : format2 === "transparent" ? new Rgb2(NaN, NaN, NaN, 0) : null;
}
function rgbn2(n) {
  return new Rgb2(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba2(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb2(r, g, b, a);
}
function rgbConvert2(o) {
  if (!(o instanceof Color2)) o = color2(o);
  if (!o) return new Rgb2();
  o = o.rgb();
  return new Rgb2(o.r, o.g, o.b, o.opacity);
}
function rgb2(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert2(r) : new Rgb2(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb2(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default2(Rgb2, rgb2, extend2(Color2, {
  brighter: function(k) {
    k = k == null ? brighter2 : Math.pow(brighter2, k);
    return new Rgb2(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker2 : Math.pow(darker2, k);
    return new Rgb2(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex2,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex2,
  formatRgb: rgb_formatRgb2,
  toString: rgb_formatRgb2
}));
function rgb_formatHex2() {
  return "#" + hex2(this.r) + hex2(this.g) + hex2(this.b);
}
function rgb_formatRgb2() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex2(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla2(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl2(h, s, l, a);
}
function hslConvert2(o) {
  if (o instanceof Hsl2) return new Hsl2(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color2)) o = color2(o);
  if (!o) return new Hsl2();
  if (o instanceof Hsl2) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min, l = (max2 + min) / 2;
  if (s) {
    if (r === max2) h = (g - b) / s + (g < b) * 6;
    else if (g === max2) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min : 2 - max2 - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl2(h, s, l, o.opacity);
}
function hsl3(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert2(h) : new Hsl2(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl2(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default2(Hsl2, hsl3, extend2(Color2, {
  brighter: function(k) {
    k = k == null ? brighter2 : Math.pow(brighter2, k);
    return new Hsl2(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker2 : Math.pow(darker2, k);
    return new Hsl2(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb2(hsl2rgb2(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb2(h, m1, m2), hsl2rgb2(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
function hsl2rgb2(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3/node_modules/d3-color/src/math.js
var deg2rad2 = Math.PI / 180;
var rad2deg2 = 180 / Math.PI;

// node_modules/d3/node_modules/d3-color/src/lab.js
var K2 = 18;
var Xn2 = 0.96422;
var Yn2 = 1;
var Zn2 = 0.82521;
var t02 = 4 / 29;
var t12 = 6 / 29;
var t22 = 3 * t12 * t12;
var t32 = t12 * t12 * t12;
function labConvert2(o) {
  if (o instanceof Lab2) return new Lab2(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl2) return hcl2lab2(o);
  if (!(o instanceof Rgb2)) o = rgbConvert2(o);
  var r = rgb2lrgb2(o.r), g = rgb2lrgb2(o.g), b = rgb2lrgb2(o.b), y2 = xyz2lab2((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn2), x2, z;
  if (r === g && g === b) x2 = z = y2;
  else {
    x2 = xyz2lab2((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn2);
    z = xyz2lab2((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn2);
  }
  return new Lab2(116 * y2 - 16, 500 * (x2 - y2), 200 * (y2 - z), o.opacity);
}
function gray2(l, opacity) {
  return new Lab2(l, 0, 0, opacity == null ? 1 : opacity);
}
function lab3(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert2(l) : new Lab2(l, a, b, opacity == null ? 1 : opacity);
}
function Lab2(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}
define_default2(Lab2, lab3, extend2(Color2, {
  brighter: function(k) {
    return new Lab2(this.l + K2 * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab2(this.l - K2 * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y2 = (this.l + 16) / 116, x2 = isNaN(this.a) ? y2 : y2 + this.a / 500, z = isNaN(this.b) ? y2 : y2 - this.b / 200;
    x2 = Xn2 * lab2xyz2(x2);
    y2 = Yn2 * lab2xyz2(y2);
    z = Zn2 * lab2xyz2(z);
    return new Rgb2(lrgb2rgb2(3.1338561 * x2 - 1.6168667 * y2 - 0.4906146 * z), lrgb2rgb2(-0.9787684 * x2 + 1.9161415 * y2 + 0.033454 * z), lrgb2rgb2(0.0719453 * x2 - 0.2289914 * y2 + 1.4052427 * z), this.opacity);
  }
}));
function xyz2lab2(t) {
  return t > t32 ? Math.pow(t, 1 / 3) : t / t22 + t02;
}
function lab2xyz2(t) {
  return t > t12 ? t * t * t : t22 * (t - t02);
}
function lrgb2rgb2(x2) {
  return 255 * (x2 <= 31308e-7 ? 12.92 * x2 : 1.055 * Math.pow(x2, 1 / 2.4) - 0.055);
}
function rgb2lrgb2(x2) {
  return (x2 /= 255) <= 0.04045 ? x2 / 12.92 : Math.pow((x2 + 0.055) / 1.055, 2.4);
}
function hclConvert2(o) {
  if (o instanceof Hcl2) return new Hcl2(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab2)) o = labConvert2(o);
  if (o.a === 0 && o.b === 0) return new Hcl2(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * rad2deg2;
  return new Hcl2(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function lch2(l, c3, h, opacity) {
  return arguments.length === 1 ? hclConvert2(l) : new Hcl2(h, c3, l, opacity == null ? 1 : opacity);
}
function hcl3(h, c3, l, opacity) {
  return arguments.length === 1 ? hclConvert2(h) : new Hcl2(h, c3, l, opacity == null ? 1 : opacity);
}
function Hcl2(h, c3, l, opacity) {
  this.h = +h;
  this.c = +c3;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab2(o) {
  if (isNaN(o.h)) return new Lab2(o.l, 0, 0, o.opacity);
  var h = o.h * deg2rad2;
  return new Lab2(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default2(Hcl2, hcl3, extend2(Color2, {
  brighter: function(k) {
    return new Hcl2(this.h, this.c, this.l + K2 * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl2(this.h, this.c, this.l - K2 * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return hcl2lab2(this).rgb();
  }
}));

// node_modules/d3/node_modules/d3-color/src/cubehelix.js
var A2 = -0.14861;
var B2 = 1.78277;
var C2 = -0.29227;
var D2 = -0.90649;
var E2 = 1.97294;
var ED2 = E2 * D2;
var EB2 = E2 * B2;
var BC_DA2 = B2 * C2 - D2 * A2;
function cubehelixConvert2(o) {
  if (o instanceof Cubehelix2) return new Cubehelix2(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb2)) o = rgbConvert2(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA2 * b + ED2 * r - EB2 * g) / (BC_DA2 + ED2 - EB2), bl = b - l, k = (E2 * (g - l) - C2 * bl) / D2, s = Math.sqrt(k * k + bl * bl) / (E2 * l * (1 - l)), h = s ? Math.atan2(k, bl) * rad2deg2 - 120 : NaN;
  return new Cubehelix2(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix3(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert2(h) : new Cubehelix2(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix2(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default2(Cubehelix2, cubehelix3, extend2(Color2, {
  brighter: function(k) {
    k = k == null ? brighter2 : Math.pow(brighter2, k);
    return new Cubehelix2(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker2 : Math.pow(darker2, k);
    return new Cubehelix2(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad2, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh3 = Math.cos(h), sinh3 = Math.sin(h);
    return new Rgb2(255 * (l + a * (A2 * cosh3 + B2 * sinh3)), 255 * (l + a * (C2 * cosh3 + D2 * sinh3)), 255 * (l + a * (E2 * cosh3)), this.opacity);
  }
}));

// node_modules/d3-contour/node_modules/d3-array/src/ascending.js
function ascending_default4(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3-contour/node_modules/d3-array/src/bisector.js
function bisector_default3(compare) {
  if (compare.length === 1) compare = ascendingComparator3(compare);
  return {
    left: function(a, x2, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x2) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x2, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x2) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
}
function ascendingComparator3(f) {
  return function(d, x2) {
    return ascending_default4(f(d), x2);
  };
}

// node_modules/d3-contour/node_modules/d3-array/src/bisect.js
var ascendingBisect3 = bisector_default3(ascending_default4);
var bisectRight3 = ascendingBisect3.right;
var bisectLeft3 = ascendingBisect3.left;

// node_modules/d3-contour/node_modules/d3-array/src/extent.js
function extent_default3(values, valueof) {
  var n = values.length, i = -1, value, min, max2;
  if (valueof == null) {
    while (++i < n) {
      if ((value = values[i]) != null && value >= value) {
        min = max2 = value;
        while (++i < n) {
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max2 < value) max2 = value;
          }
        }
      }
    }
  } else {
    while (++i < n) {
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max2 = value;
        while (++i < n) {
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max2 < value) max2 = value;
          }
        }
      }
    }
  }
  return [min, max2];
}

// node_modules/d3-contour/node_modules/d3-array/src/array.js
var array3 = Array.prototype;
var slice5 = array3.slice;
var map3 = array3.map;

// node_modules/d3-contour/node_modules/d3-array/src/range.js
function range_default3(start4, stop, step) {
  start4 = +start4, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start4, start4 = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop - start4) / step)) | 0, range2 = new Array(n);
  while (++i < n) {
    range2[i] = start4 + i * step;
  }
  return range2;
}

// node_modules/d3-contour/node_modules/d3-array/src/ticks.js
var e103 = Math.sqrt(50);
var e53 = Math.sqrt(10);
var e23 = Math.sqrt(2);
function tickStep3(start4, stop, count2) {
  var step0 = Math.abs(stop - start4) / Math.max(0, count2), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
  if (error >= e103) step1 *= 10;
  else if (error >= e53) step1 *= 5;
  else if (error >= e23) step1 *= 2;
  return stop < start4 ? -step1 : step1;
}

// node_modules/d3-contour/node_modules/d3-array/src/threshold/sturges.js
function sturges_default3(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
}

// node_modules/d3-contour/node_modules/d3-array/src/max.js
function max_default3(values, valueof) {
  var n = values.length, i = -1, value, max2;
  if (valueof == null) {
    while (++i < n) {
      if ((value = values[i]) != null && value >= value) {
        max2 = value;
        while (++i < n) {
          if ((value = values[i]) != null && value > max2) {
            max2 = value;
          }
        }
      }
    }
  } else {
    while (++i < n) {
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        max2 = value;
        while (++i < n) {
          if ((value = valueof(values[i], i, values)) != null && value > max2) {
            max2 = value;
          }
        }
      }
    }
  }
  return max2;
}

// node_modules/d3-contour/src/array.js
var array4 = Array.prototype;
var slice6 = array4.slice;

// node_modules/d3-contour/src/ascending.js
function ascending_default5(a, b) {
  return a - b;
}

// node_modules/d3-contour/src/area.js
function area_default2(ring) {
  var i = 0, n = ring.length, area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
  while (++i < n) area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
  return area;
}

// node_modules/d3-contour/src/constant.js
function constant_default9(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-contour/src/contains.js
function contains_default(ring, hole) {
  var i = -1, n = hole.length, c3;
  while (++i < n) if (c3 = ringContains(ring, hole[i])) return c3;
  return 0;
}
function ringContains(ring, point2) {
  var x2 = point2[0], y2 = point2[1], contains = -1;
  for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
    var pi3 = ring[i], xi = pi3[0], yi = pi3[1], pj = ring[j], xj = pj[0], yj = pj[1];
    if (segmentContains(pi3, pj, point2)) return 0;
    if (yi > y2 !== yj > y2 && x2 < (xj - xi) * (y2 - yi) / (yj - yi) + xi) contains = -contains;
  }
  return contains;
}
function segmentContains(a, b, c3) {
  var i;
  return collinear(a, b, c3) && within(a[i = +(a[0] === b[0])], c3[i], b[i]);
}
function collinear(a, b, c3) {
  return (b[0] - a[0]) * (c3[1] - a[1]) === (c3[0] - a[0]) * (b[1] - a[1]);
}
function within(p, q, r) {
  return p <= q && q <= r || r <= q && q <= p;
}

// node_modules/d3-contour/src/noop.js
function noop_default() {
}

// node_modules/d3-contour/src/contours.js
var cases = [[], [[[1, 1.5], [0.5, 1]]], [[[1.5, 1], [1, 1.5]]], [[[1.5, 1], [0.5, 1]]], [[[1, 0.5], [1.5, 1]]], [[[1, 1.5], [0.5, 1]], [[1, 0.5], [1.5, 1]]], [[[1, 0.5], [1, 1.5]]], [[[1, 0.5], [0.5, 1]]], [[[0.5, 1], [1, 0.5]]], [[[1, 1.5], [1, 0.5]]], [[[0.5, 1], [1, 0.5]], [[1.5, 1], [1, 1.5]]], [[[1.5, 1], [1, 0.5]]], [[[0.5, 1], [1.5, 1]]], [[[1, 1.5], [1.5, 1]]], [[[0.5, 1], [1, 1.5]]], []];
function contours_default() {
  var dx = 1, dy = 1, threshold2 = sturges_default3, smooth = smoothLinear;
  function contours(values) {
    var tz = threshold2(values);
    if (!Array.isArray(tz)) {
      var domain = extent_default3(values), start4 = domain[0], stop = domain[1];
      tz = tickStep3(start4, stop, tz);
      tz = range_default3(Math.floor(start4 / tz) * tz, Math.floor(stop / tz) * tz, tz);
    } else {
      tz = tz.slice().sort(ascending_default5);
    }
    return tz.map(function(value) {
      return contour(values, value);
    });
  }
  function contour(values, value) {
    var polygons = [], holes = [];
    isorings(values, value, function(ring) {
      smooth(ring, values, value);
      if (area_default2(ring) > 0) polygons.push([ring]);
      else holes.push(ring);
    });
    holes.forEach(function(hole) {
      for (var i = 0, n = polygons.length, polygon; i < n; ++i) {
        if (contains_default((polygon = polygons[i])[0], hole) !== -1) {
          polygon.push(hole);
          return;
        }
      }
    });
    return {
      type: "MultiPolygon",
      value,
      coordinates: polygons
    };
  }
  function isorings(values, value, callback) {
    var fragmentByStart = new Array(), fragmentByEnd = new Array(), x2, y2, t06, t16, t25, t35;
    x2 = y2 = -1;
    t16 = values[0] >= value;
    cases[t16 << 1].forEach(stitch);
    while (++x2 < dx - 1) {
      t06 = t16, t16 = values[x2 + 1] >= value;
      cases[t06 | t16 << 1].forEach(stitch);
    }
    cases[t16 << 0].forEach(stitch);
    while (++y2 < dy - 1) {
      x2 = -1;
      t16 = values[y2 * dx + dx] >= value;
      t25 = values[y2 * dx] >= value;
      cases[t16 << 1 | t25 << 2].forEach(stitch);
      while (++x2 < dx - 1) {
        t06 = t16, t16 = values[y2 * dx + dx + x2 + 1] >= value;
        t35 = t25, t25 = values[y2 * dx + x2 + 1] >= value;
        cases[t06 | t16 << 1 | t25 << 2 | t35 << 3].forEach(stitch);
      }
      cases[t16 | t25 << 3].forEach(stitch);
    }
    x2 = -1;
    t25 = values[y2 * dx] >= value;
    cases[t25 << 2].forEach(stitch);
    while (++x2 < dx - 1) {
      t35 = t25, t25 = values[y2 * dx + x2 + 1] >= value;
      cases[t25 << 2 | t35 << 3].forEach(stitch);
    }
    cases[t25 << 3].forEach(stitch);
    function stitch(line) {
      var start4 = [line[0][0] + x2, line[0][1] + y2], end = [line[1][0] + x2, line[1][1] + y2], startIndex = index(start4), endIndex = index(end), f, g;
      if (f = fragmentByEnd[startIndex]) {
        if (g = fragmentByStart[endIndex]) {
          delete fragmentByEnd[f.end];
          delete fragmentByStart[g.start];
          if (f === g) {
            f.ring.push(end);
            callback(f.ring);
          } else {
            fragmentByStart[f.start] = fragmentByEnd[g.end] = {
              start: f.start,
              end: g.end,
              ring: f.ring.concat(g.ring)
            };
          }
        } else {
          delete fragmentByEnd[f.end];
          f.ring.push(end);
          fragmentByEnd[f.end = endIndex] = f;
        }
      } else if (f = fragmentByStart[endIndex]) {
        if (g = fragmentByEnd[startIndex]) {
          delete fragmentByStart[f.start];
          delete fragmentByEnd[g.end];
          if (f === g) {
            f.ring.push(end);
            callback(f.ring);
          } else {
            fragmentByStart[g.start] = fragmentByEnd[f.end] = {
              start: g.start,
              end: f.end,
              ring: g.ring.concat(f.ring)
            };
          }
        } else {
          delete fragmentByStart[f.start];
          f.ring.unshift(start4);
          fragmentByStart[f.start = startIndex] = f;
        }
      } else {
        fragmentByStart[startIndex] = fragmentByEnd[endIndex] = {
          start: startIndex,
          end: endIndex,
          ring: [start4, end]
        };
      }
    }
  }
  function index(point2) {
    return point2[0] * 2 + point2[1] * (dx + 1) * 4;
  }
  function smoothLinear(ring, values, value) {
    ring.forEach(function(point2) {
      var x2 = point2[0], y2 = point2[1], xt = x2 | 0, yt = y2 | 0, v0, v1 = values[yt * dx + xt];
      if (x2 > 0 && x2 < dx && xt === x2) {
        v0 = values[yt * dx + xt - 1];
        point2[0] = x2 + (value - v0) / (v1 - v0) - 0.5;
      }
      if (y2 > 0 && y2 < dy && yt === y2) {
        v0 = values[(yt - 1) * dx + xt];
        point2[1] = y2 + (value - v0) / (v1 - v0) - 0.5;
      }
    });
  }
  contours.contour = contour;
  contours.size = function(_) {
    if (!arguments.length) return [dx, dy];
    var _0 = Math.ceil(_[0]), _1 = Math.ceil(_[1]);
    if (!(_0 > 0) || !(_1 > 0)) throw new Error("invalid size");
    return dx = _0, dy = _1, contours;
  };
  contours.thresholds = function(_) {
    return arguments.length ? (threshold2 = typeof _ === "function" ? _ : Array.isArray(_) ? constant_default9(slice6.call(_)) : constant_default9(_), contours) : threshold2;
  };
  contours.smooth = function(_) {
    return arguments.length ? (smooth = _ ? smoothLinear : noop_default, contours) : smooth === smoothLinear;
  };
  return contours;
}

// node_modules/d3-contour/src/blur.js
function blurX(source, target, r) {
  var n = source.width, m = source.height, w = (r << 1) + 1;
  for (var j = 0; j < m; ++j) {
    for (var i = 0, sr = 0; i < n + r; ++i) {
      if (i < n) {
        sr += source.data[i + j * n];
      }
      if (i >= r) {
        if (i >= w) {
          sr -= source.data[i - w + j * n];
        }
        target.data[i - r + j * n] = sr / Math.min(i + 1, n - 1 + w - i, w);
      }
    }
  }
}
function blurY(source, target, r) {
  var n = source.width, m = source.height, w = (r << 1) + 1;
  for (var i = 0; i < n; ++i) {
    for (var j = 0, sr = 0; j < m + r; ++j) {
      if (j < m) {
        sr += source.data[i + j * n];
      }
      if (j >= r) {
        if (j >= w) {
          sr -= source.data[i + (j - w) * n];
        }
        target.data[i + (j - r) * n] = sr / Math.min(j + 1, m - 1 + w - j, w);
      }
    }
  }
}

// node_modules/d3-contour/src/density.js
function defaultX(d) {
  return d[0];
}
function defaultY(d) {
  return d[1];
}
function defaultWeight() {
  return 1;
}
function density_default() {
  var x2 = defaultX, y2 = defaultY, weight = defaultWeight, dx = 960, dy = 500, r = 20, k = 2, o = r * 3, n = dx + o * 2 >> k, m = dy + o * 2 >> k, threshold2 = constant_default9(20);
  function density(data) {
    var values0 = new Float32Array(n * m), values1 = new Float32Array(n * m);
    data.forEach(function(d, i, data2) {
      var xi = +x2(d, i, data2) + o >> k, yi = +y2(d, i, data2) + o >> k, wi = +weight(d, i, data2);
      if (xi >= 0 && xi < n && yi >= 0 && yi < m) {
        values0[xi + yi * n] += wi;
      }
    });
    blurX({
      width: n,
      height: m,
      data: values0
    }, {
      width: n,
      height: m,
      data: values1
    }, r >> k);
    blurY({
      width: n,
      height: m,
      data: values1
    }, {
      width: n,
      height: m,
      data: values0
    }, r >> k);
    blurX({
      width: n,
      height: m,
      data: values0
    }, {
      width: n,
      height: m,
      data: values1
    }, r >> k);
    blurY({
      width: n,
      height: m,
      data: values1
    }, {
      width: n,
      height: m,
      data: values0
    }, r >> k);
    blurX({
      width: n,
      height: m,
      data: values0
    }, {
      width: n,
      height: m,
      data: values1
    }, r >> k);
    blurY({
      width: n,
      height: m,
      data: values1
    }, {
      width: n,
      height: m,
      data: values0
    }, r >> k);
    var tz = threshold2(values0);
    if (!Array.isArray(tz)) {
      var stop = max_default3(values0);
      tz = tickStep3(0, stop, tz);
      tz = range_default3(0, Math.floor(stop / tz) * tz, tz);
      tz.shift();
    }
    return contours_default().thresholds(tz).size([n, m])(values0).map(transform2);
  }
  function transform2(geometry) {
    geometry.value *= Math.pow(2, -2 * k);
    geometry.coordinates.forEach(transformPolygon);
    return geometry;
  }
  function transformPolygon(coordinates2) {
    coordinates2.forEach(transformRing);
  }
  function transformRing(coordinates2) {
    coordinates2.forEach(transformPoint);
  }
  function transformPoint(coordinates2) {
    coordinates2[0] = coordinates2[0] * Math.pow(2, k) - o;
    coordinates2[1] = coordinates2[1] * Math.pow(2, k) - o;
  }
  function resize() {
    o = r * 3;
    n = dx + o * 2 >> k;
    m = dy + o * 2 >> k;
    return density;
  }
  density.x = function(_) {
    return arguments.length ? (x2 = typeof _ === "function" ? _ : constant_default9(+_), density) : x2;
  };
  density.y = function(_) {
    return arguments.length ? (y2 = typeof _ === "function" ? _ : constant_default9(+_), density) : y2;
  };
  density.weight = function(_) {
    return arguments.length ? (weight = typeof _ === "function" ? _ : constant_default9(+_), density) : weight;
  };
  density.size = function(_) {
    if (!arguments.length) return [dx, dy];
    var _0 = Math.ceil(_[0]), _1 = Math.ceil(_[1]);
    if (!(_0 >= 0) && !(_0 >= 0)) throw new Error("invalid size");
    return dx = _0, dy = _1, resize();
  };
  density.cellSize = function(_) {
    if (!arguments.length) return 1 << k;
    if (!((_ = +_) >= 1)) throw new Error("invalid cell size");
    return k = Math.floor(Math.log(_) / Math.LN2), resize();
  };
  density.thresholds = function(_) {
    return arguments.length ? (threshold2 = typeof _ === "function" ? _ : Array.isArray(_) ? constant_default9(slice6.call(_)) : constant_default9(_), density) : threshold2;
  };
  density.bandwidth = function(_) {
    if (!arguments.length) return Math.sqrt(r * (r + 1));
    if (!((_ = +_) >= 0)) throw new Error("invalid bandwidth");
    return r = Math.round((Math.sqrt(4 * _ * _ + 1) - 1) / 2), resize();
  };
  return density;
}

// node_modules/d3/node_modules/d3-dispatch/src/dispatch.js
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
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get3(_[t], typename.name))) return t;
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
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get3(type2, name) {
  for (var i = 0, n = type2.length, c3; i < n; ++i) {
    if ((c3 = type2[i]).name === name) {
      return c3.value;
    }
  }
}
function set3(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop2, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null) type2.push({
    name,
    value: callback
  });
  return type2;
}
var dispatch_default3 = dispatch2;

// node_modules/d3/node_modules/d3-selection/src/namespaces.js
var xhtml2 = "http://www.w3.org/1999/xhtml";
var namespaces_default2 = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml2,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/d3/node_modules/d3-selection/src/namespace.js
function namespace_default2(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces_default2.hasOwnProperty(prefix) ? {
    space: namespaces_default2[prefix],
    local: name
  } : name;
}

// node_modules/d3/node_modules/d3-selection/src/creator.js
function creatorInherit2(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml2 && document2.documentElement.namespaceURI === xhtml2 ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed2(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default2(name) {
  var fullname = namespace_default2(name);
  return (fullname.local ? creatorFixed2 : creatorInherit2)(fullname);
}

// node_modules/d3/node_modules/d3-selection/src/selector.js
function none2() {
}
function selector_default2(selector) {
  return selector == null ? none2 : function() {
    return this.querySelector(selector);
  };
}

// node_modules/d3/node_modules/d3-selection/src/selection/select.js
function select_default4(select) {
  if (typeof select !== "function") select = selector_default2(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection3(subgroups, this._parents);
}

// node_modules/d3/node_modules/d3-selection/src/selectorAll.js
function empty3() {
  return [];
}
function selectorAll_default2(selector) {
  return selector == null ? empty3 : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/d3/node_modules/d3-selection/src/selection/selectAll.js
function selectAll_default4(select) {
  if (typeof select !== "function") select = selectorAll_default2(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection3(subgroups, parents);
}

// node_modules/d3/node_modules/d3-selection/src/matcher.js
function matcher_default2(selector) {
  return function() {
    return this.matches(selector);
  };
}

// node_modules/d3/node_modules/d3-selection/src/selection/filter.js
function filter_default3(match) {
  if (typeof match !== "function") match = matcher_default2(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection3(subgroups, this._parents);
}

// node_modules/d3/node_modules/d3-selection/src/selection/sparse.js
function sparse_default2(update) {
  return new Array(update.length);
}

// node_modules/d3/node_modules/d3-selection/src/selection/enter.js
function enter_default2() {
  return new Selection3(this._enter || this._groups.map(sparse_default2), this._parents);
}
function EnterNode2(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}
EnterNode2.prototype = {
  constructor: EnterNode2,
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

// node_modules/d3/node_modules/d3-selection/src/constant.js
function constant_default10(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3/node_modules/d3-selection/src/selection/data.js
var keyPrefix2 = "$";
function bindIndex2(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode2(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey2(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = {}, groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix2 + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix2 + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode2(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
      exit[i] = node;
    }
  }
}
function data_default2(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) {
      data[++j] = d;
    });
    return data;
  }
  var bind = key ? bindKey2 : bindIndex2, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant_default10(value);
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
  update = new Selection3(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// node_modules/d3/node_modules/d3-selection/src/selection/exit.js
function exit_default2() {
  return new Selection3(this._exit || this._groups.map(sparse_default2), this._parents);
}

// node_modules/d3/node_modules/d3-selection/src/selection/join.js
function join_default2(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/d3/node_modules/d3-selection/src/selection/merge.js
function merge_default6(selection4) {
  for (var groups0 = this._groups, groups1 = selection4._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection3(merges, this._parents);
}

// node_modules/d3/node_modules/d3-selection/src/selection/order.js
function order_default2() {
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

// node_modules/d3/node_modules/d3-selection/src/selection/sort.js
function sort_default2(compare) {
  if (!compare) compare = ascending2;
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
  return new Selection3(sortgroups, this._parents).order();
}
function ascending2(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3/node_modules/d3-selection/src/selection/call.js
function call_default2() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/d3/node_modules/d3-selection/src/selection/nodes.js
function nodes_default2() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() {
    nodes[++i] = this;
  });
  return nodes;
}

// node_modules/d3/node_modules/d3-selection/src/selection/node.js
function node_default2() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}

// node_modules/d3/node_modules/d3-selection/src/selection/size.js
function size_default2() {
  var size = 0;
  this.each(function() {
    ++size;
  });
  return size;
}

// node_modules/d3/node_modules/d3-selection/src/selection/empty.js
function empty_default2() {
  return !this.node();
}

// node_modules/d3/node_modules/d3-selection/src/selection/each.js
function each_default2(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}

// node_modules/d3/node_modules/d3-selection/src/selection/attr.js
function attrRemove3(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS3(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant3(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS3(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction3(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}
function attrFunctionNS3(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default3(name, value) {
  var fullname = namespace_default2(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS3 : attrRemove3 : typeof value === "function" ? fullname.local ? attrFunctionNS3 : attrFunction3 : fullname.local ? attrConstantNS3 : attrConstant3)(fullname, value));
}

// node_modules/d3/node_modules/d3-selection/src/window.js
function window_default2(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/d3/node_modules/d3-selection/src/selection/style.js
function styleRemove3(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant3(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction3(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}
function style_default3(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove3 : typeof value === "function" ? styleFunction3 : styleConstant3)(name, value, priority == null ? "" : priority)) : styleValue2(this.node(), name);
}
function styleValue2(node, name) {
  return node.style.getPropertyValue(name) || window_default2(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/d3/node_modules/d3-selection/src/selection/property.js
function propertyRemove2(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant2(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction2(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}
function property_default2(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove2 : typeof value === "function" ? propertyFunction2 : propertyConstant2)(name, value)) : this.node()[name];
}

// node_modules/d3/node_modules/d3-selection/src/selection/classed.js
function classArray2(string) {
  return string.trim().split(/^|\s+/);
}
function classList2(node) {
  return node.classList || new ClassList2(node);
}
function ClassList2(node) {
  this._node = node;
  this._names = classArray2(node.getAttribute("class") || "");
}
ClassList2.prototype = {
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
function classedAdd2(node, names) {
  var list = classList2(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove2(node, names) {
  var list = classList2(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue2(names) {
  return function() {
    classedAdd2(this, names);
  };
}
function classedFalse2(names) {
  return function() {
    classedRemove2(this, names);
  };
}
function classedFunction2(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd2 : classedRemove2)(this, names);
  };
}
function classed_default2(name, value) {
  var names = classArray2(name + "");
  if (arguments.length < 2) {
    var list = classList2(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction2 : value ? classedTrue2 : classedFalse2)(names, value));
}

// node_modules/d3/node_modules/d3-selection/src/selection/text.js
function textRemove2() {
  this.textContent = "";
}
function textConstant3(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction3(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default3(value) {
  return arguments.length ? this.each(value == null ? textRemove2 : (typeof value === "function" ? textFunction3 : textConstant3)(value)) : this.node().textContent;
}

// node_modules/d3/node_modules/d3-selection/src/selection/html.js
function htmlRemove2() {
  this.innerHTML = "";
}
function htmlConstant2(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction2(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default2(value) {
  return arguments.length ? this.each(value == null ? htmlRemove2 : (typeof value === "function" ? htmlFunction2 : htmlConstant2)(value)) : this.node().innerHTML;
}

// node_modules/d3/node_modules/d3-selection/src/selection/raise.js
function raise2() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default2() {
  return this.each(raise2);
}

// node_modules/d3/node_modules/d3-selection/src/selection/lower.js
function lower2() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default2() {
  return this.each(lower2);
}

// node_modules/d3/node_modules/d3-selection/src/selection/append.js
function append_default2(name) {
  var create4 = typeof name === "function" ? name : creator_default2(name);
  return this.select(function() {
    return this.appendChild(create4.apply(this, arguments));
  });
}

// node_modules/d3/node_modules/d3-selection/src/selection/insert.js
function constantNull2() {
  return null;
}
function insert_default2(name, before) {
  var create4 = typeof name === "function" ? name : creator_default2(name), select = before == null ? constantNull2 : typeof before === "function" ? before : selector_default2(before);
  return this.select(function() {
    return this.insertBefore(create4.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/d3/node_modules/d3-selection/src/selection/remove.js
function remove2() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default3() {
  return this.each(remove2);
}

// node_modules/d3/node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow2() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep2() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default2(deep) {
  return this.select(deep ? selection_cloneDeep2 : selection_cloneShallow2);
}

// node_modules/d3/node_modules/d3-selection/src/selection/datum.js
function datum_default2(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/d3/node_modules/d3-selection/src/selection/on.js
var filterEvents2 = {};
var event2 = null;
if (typeof document !== "undefined") {
  element = document.documentElement;
  if (!("onmouseenter" in element)) {
    filterEvents2 = {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    };
  }
}
var element;
function filterContextListener2(listener, index, group) {
  listener = contextListener2(listener, index, group);
  return function(event4) {
    var related = event4.relatedTarget;
    if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
      listener.call(this, event4);
    }
  };
}
function contextListener2(listener, index, group) {
  return function(event1) {
    var event0 = event2;
    event2 = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      event2 = event0;
    }
  };
}
function parseTypenames4(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name
    };
  });
}
function onRemove2(typename) {
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
function onAdd2(typename, value, capture) {
  var wrap = filterEvents2.hasOwnProperty(typename.type) ? filterContextListener2 : contextListener2;
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
function on_default3(typename, value, capture) {
  var typenames = parseTypenames4(typename + ""), i, n = typenames.length, t;
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
  on = value ? onAdd2 : onRemove2;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
}
function customEvent2(event1, listener, that, args) {
  var event0 = event2;
  event1.sourceEvent = event2;
  event2 = event1;
  try {
    return listener.apply(that, args);
  } finally {
    event2 = event0;
  }
}

// node_modules/d3/node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent2(node, type2, params) {
  var window2 = window_default2(node), event4 = window2.CustomEvent;
  if (typeof event4 === "function") {
    event4 = new event4(type2, params);
  } else {
    event4 = window2.document.createEvent("Event");
    if (params) event4.initEvent(type2, params.bubbles, params.cancelable), event4.detail = params.detail;
    else event4.initEvent(type2, false, false);
  }
  node.dispatchEvent(event4);
}
function dispatchConstant2(type2, params) {
  return function() {
    return dispatchEvent2(this, type2, params);
  };
}
function dispatchFunction2(type2, params) {
  return function() {
    return dispatchEvent2(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default4(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction2 : dispatchConstant2)(type2, params));
}

// node_modules/d3/node_modules/d3-selection/src/selection/index.js
var root2 = [null];
function Selection3(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection2() {
  return new Selection3([[document.documentElement]], root2);
}
Selection3.prototype = selection2.prototype = {
  constructor: Selection3,
  select: select_default4,
  selectAll: selectAll_default4,
  filter: filter_default3,
  data: data_default2,
  enter: enter_default2,
  exit: exit_default2,
  join: join_default2,
  merge: merge_default6,
  order: order_default2,
  sort: sort_default2,
  call: call_default2,
  nodes: nodes_default2,
  node: node_default2,
  size: size_default2,
  empty: empty_default2,
  each: each_default2,
  attr: attr_default3,
  style: style_default3,
  property: property_default2,
  classed: classed_default2,
  text: text_default3,
  html: html_default2,
  raise: raise_default2,
  lower: lower_default2,
  append: append_default2,
  insert: insert_default2,
  remove: remove_default3,
  clone: clone_default2,
  datum: datum_default2,
  on: on_default3,
  dispatch: dispatch_default4
};
var selection_default3 = selection2;

// node_modules/d3/node_modules/d3-selection/src/select.js
function select_default5(selector) {
  return typeof selector === "string" ? new Selection3([[document.querySelector(selector)]], [document.documentElement]) : new Selection3([[selector]], root2);
}

// node_modules/d3/node_modules/d3-selection/src/create.js
function create_default2(name) {
  return select_default5(creator_default2(name).call(document.documentElement));
}

// node_modules/d3/node_modules/d3-selection/src/local.js
var nextId2 = 0;
function local3() {
  return new Local2();
}
function Local2() {
  this._ = "@" + (++nextId2).toString(36);
}
Local2.prototype = local3.prototype = {
  constructor: Local2,
  get: function(node) {
    var id4 = this._;
    while (!(id4 in node)) if (!(node = node.parentNode)) return;
    return node[id4];
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

// node_modules/d3/node_modules/d3-selection/src/sourceEvent.js
function sourceEvent_default2() {
  var current = event2, source;
  while (source = current.sourceEvent) current = source;
  return current;
}

// node_modules/d3/node_modules/d3-selection/src/point.js
function point_default2(node, event4) {
  var svg2 = node.ownerSVGElement || node;
  if (svg2.createSVGPoint) {
    var point2 = svg2.createSVGPoint();
    point2.x = event4.clientX, point2.y = event4.clientY;
    point2 = point2.matrixTransform(node.getScreenCTM().inverse());
    return [point2.x, point2.y];
  }
  var rect = node.getBoundingClientRect();
  return [event4.clientX - rect.left - node.clientLeft, event4.clientY - rect.top - node.clientTop];
}

// node_modules/d3/node_modules/d3-selection/src/mouse.js
function mouse_default2(node) {
  var event4 = sourceEvent_default2();
  if (event4.changedTouches) event4 = event4.changedTouches[0];
  return point_default2(node, event4);
}

// node_modules/d3/node_modules/d3-selection/src/selectAll.js
function selectAll_default5(selector) {
  return typeof selector === "string" ? new Selection3([document.querySelectorAll(selector)], [document.documentElement]) : new Selection3([selector == null ? [] : selector], root2);
}

// node_modules/d3/node_modules/d3-selection/src/touch.js
function touch_default2(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = sourceEvent_default2().changedTouches;
  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return point_default2(node, touch);
    }
  }
  return null;
}

// node_modules/d3/node_modules/d3-selection/src/touches.js
function touches_default2(node, touches) {
  if (touches == null) touches = sourceEvent_default2().touches;
  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = point_default2(node, touches[i]);
  }
  return points;
}

// node_modules/d3/node_modules/d3-drag/src/noevent.js
function nopropagation3() {
  event2.stopImmediatePropagation();
}
function noevent_default3() {
  event2.preventDefault();
  event2.stopImmediatePropagation();
}

// node_modules/d3/node_modules/d3-drag/src/nodrag.js
function nodrag_default2(view) {
  var root5 = view.document.documentElement, selection4 = select_default5(view).on("dragstart.drag", noevent_default3, true);
  if ("onselectstart" in root5) {
    selection4.on("selectstart.drag", noevent_default3, true);
  } else {
    root5.__noselect = root5.style.MozUserSelect;
    root5.style.MozUserSelect = "none";
  }
}
function yesdrag2(view, noclick) {
  var root5 = view.document.documentElement, selection4 = select_default5(view).on("dragstart.drag", null);
  if (noclick) {
    selection4.on("click.drag", noevent_default3, true);
    setTimeout(function() {
      selection4.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root5) {
    selection4.on("selectstart.drag", null);
  } else {
    root5.style.MozUserSelect = root5.__noselect;
    delete root5.__noselect;
  }
}

// node_modules/d3/node_modules/d3-drag/src/constant.js
function constant_default11(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3/node_modules/d3-drag/src/event.js
function DragEvent2(target, type2, subject, id4, active, x2, y2, dx, dy, dispatch4) {
  this.target = target;
  this.type = type2;
  this.subject = subject;
  this.identifier = id4;
  this.active = active;
  this.x = x2;
  this.y = y2;
  this.dx = dx;
  this.dy = dy;
  this._ = dispatch4;
}
DragEvent2.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

// node_modules/d3/node_modules/d3-drag/src/drag.js
function defaultFilter2() {
  return !event2.ctrlKey && !event2.button;
}
function defaultContainer() {
  return this.parentNode;
}
function defaultSubject(d) {
  return d == null ? {
    x: event2.x,
    y: event2.y
  } : d;
}
function defaultTouchable2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function drag_default2() {
  var filter = defaultFilter2, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable2, gestures = {}, listeners = dispatch_default3("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
  function drag(selection4) {
    selection4.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function mousedowned() {
    if (touchending || !filter.apply(this, arguments)) return;
    var gesture = beforestart("mouse", container.apply(this, arguments), mouse_default2, this, arguments);
    if (!gesture) return;
    select_default5(event2.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
    nodrag_default2(event2.view);
    nopropagation3();
    mousemoving = false;
    mousedownx = event2.clientX;
    mousedowny = event2.clientY;
    gesture("start");
  }
  function mousemoved() {
    noevent_default3();
    if (!mousemoving) {
      var dx = event2.clientX - mousedownx, dy = event2.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag");
  }
  function mouseupped() {
    select_default5(event2.view).on("mousemove.drag mouseup.drag", null);
    yesdrag2(event2.view, mousemoving);
    noevent_default3();
    gestures.mouse("end");
  }
  function touchstarted() {
    if (!filter.apply(this, arguments)) return;
    var touches = event2.changedTouches, c3 = container.apply(this, arguments), n = touches.length, i, gesture;
    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(touches[i].identifier, c3, touch_default2, this, arguments)) {
        nopropagation3();
        gesture("start");
      }
    }
  }
  function touchmoved() {
    var touches = event2.changedTouches, n = touches.length, i, gesture;
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        noevent_default3();
        gesture("drag");
      }
    }
  }
  function touchended() {
    var touches = event2.changedTouches, n = touches.length, i, gesture;
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, 500);
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        nopropagation3();
        gesture("end");
      }
    }
  }
  function beforestart(id4, container2, point2, that, args) {
    var p = point2(container2, id4), s, dx, dy, sublisteners = listeners.copy();
    if (!customEvent2(new DragEvent2(drag, "beforestart", s, id4, active, p[0], p[1], 0, 0, sublisteners), function() {
      if ((event2.subject = s = subject.apply(that, args)) == null) return false;
      dx = s.x - p[0] || 0;
      dy = s.y - p[1] || 0;
      return true;
    })) return;
    return function gesture(type2) {
      var p02 = p, n;
      switch (type2) {
        case "start":
          gestures[id4] = gesture, n = active++;
          break;
        case "end":
          delete gestures[id4], --active;
        case "drag":
          p = point2(container2, id4), n = active;
          break;
      }
      customEvent2(new DragEvent2(drag, type2, s, id4, n, p[0] + dx, p[1] + dy, p[0] - p02[0], p[1] - p02[1], sublisteners), sublisteners.apply, sublisteners, [type2, that, args]);
    };
  }
  drag.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default11(!!_), drag) : filter;
  };
  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : constant_default11(_), drag) : container;
  };
  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : constant_default11(_), drag) : subject;
  };
  drag.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default11(!!_), drag) : touchable;
  };
  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };
  drag.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };
  return drag;
}

// node_modules/d3-dsv/src/dsv.js
var EOL = {};
var EOF = {};
var QUOTE = 34;
var NEWLINE = 10;
var RETURN = 13;
function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + '] || ""';
  }).join(",") + "}");
}
function customConverter(columns, f) {
  var object2 = objectConverter(columns);
  return function(row, i) {
    return f(object2(row), i, columns);
  };
}
function inferColumns(rows) {
  var columnSet = /* @__PURE__ */ Object.create(null), columns = [];
  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });
  return columns;
}
function pad(value, width) {
  var s = value + "", length2 = s.length;
  return length2 < width ? new Array(width - length2 + 1).join(0) + s : s;
}
function formatYear(year2) {
  return year2 < 0 ? "-" + pad(-year2, 6) : year2 > 9999 ? "+" + pad(year2, 6) : pad(year2, 4);
}
function formatDate(date2) {
  var hours2 = date2.getUTCHours(), minutes2 = date2.getUTCMinutes(), seconds2 = date2.getUTCSeconds(), milliseconds2 = date2.getUTCMilliseconds();
  return isNaN(date2) ? "Invalid Date" : formatYear(date2.getUTCFullYear(), 4) + "-" + pad(date2.getUTCMonth() + 1, 2) + "-" + pad(date2.getUTCDate(), 2) + (milliseconds2 ? "T" + pad(hours2, 2) + ":" + pad(minutes2, 2) + ":" + pad(seconds2, 2) + "." + pad(milliseconds2, 3) + "Z" : seconds2 ? "T" + pad(hours2, 2) + ":" + pad(minutes2, 2) + ":" + pad(seconds2, 2) + "Z" : minutes2 || hours2 ? "T" + pad(hours2, 2) + ":" + pad(minutes2, 2) + "Z" : "");
}
function dsv_default(delimiter) {
  var reFormat = new RegExp('["' + delimiter + "\n\r]"), DELIMITER = delimiter.charCodeAt(0);
  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }
  function parseRows(text, f) {
    var rows = [], N = text.length, I = 0, n = 0, t, eof = N <= 0, eol = false;
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;
    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;
      var i, j = I, c3;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE) ;
        if ((i = I) >= N) eof = true;
        else if ((c3 = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c3 === RETURN) {
          eol = true;
          if (text.charCodeAt(I) === NEWLINE) ++I;
        }
        return text.slice(j + 1, i - 1).replace(/""/g, '"');
      }
      while (I < N) {
        if ((c3 = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c3 === RETURN) {
          eol = true;
          if (text.charCodeAt(I) === NEWLINE) ++I;
        } else if (c3 !== DELIMITER) continue;
        return text.slice(j, i);
      }
      return eof = true, text.slice(j, N);
    }
    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }
    return rows;
  }
  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }
  function format2(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }
  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }
  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }
  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }
  function formatValue(value) {
    return value == null ? "" : value instanceof Date ? formatDate(value) : reFormat.test(value += "") ? '"' + value.replace(/"/g, '""') + '"' : value;
  }
  return {
    parse,
    parseRows,
    format: format2,
    formatBody,
    formatRows,
    formatRow,
    formatValue
  };
}

// node_modules/d3-dsv/src/csv.js
var csv = dsv_default(",");
var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatBody = csv.formatBody;
var csvFormatRows = csv.formatRows;
var csvFormatRow = csv.formatRow;
var csvFormatValue = csv.formatValue;

// node_modules/d3-dsv/src/tsv.js
var tsv = dsv_default("	");
var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatBody = tsv.formatBody;
var tsvFormatRows = tsv.formatRows;
var tsvFormatRow = tsv.formatRow;
var tsvFormatValue = tsv.formatValue;

// node_modules/d3-dsv/src/autoType.js
function autoType(object2) {
  for (var key in object2) {
    var value = object2[key].trim(), number4, m;
    if (!value) value = null;
    else if (value === "true") value = true;
    else if (value === "false") value = false;
    else if (value === "NaN") value = NaN;
    else if (!isNaN(number4 = +value)) value = number4;
    else if (m = value.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)) {
      if (fixtz && !!m[4] && !m[7]) value = value.replace(/-/g, "/").replace(/T/, " ");
      value = new Date(value);
    } else continue;
    object2[key] = value;
  }
  return object2;
}
var fixtz = (/* @__PURE__ */ new Date("2019-01-01T00:00")).getHours() || (/* @__PURE__ */ new Date("2019-07-01T00:00")).getHours();

// node_modules/d3-fetch/src/blob.js
function responseBlob(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.blob();
}
function blob_default(input, init4) {
  return fetch(input, init4).then(responseBlob);
}

// node_modules/d3-fetch/src/buffer.js
function responseArrayBuffer(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.arrayBuffer();
}
function buffer_default(input, init4) {
  return fetch(input, init4).then(responseArrayBuffer);
}

// node_modules/d3-fetch/src/text.js
function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}
function text_default4(input, init4) {
  return fetch(input, init4).then(responseText);
}

// node_modules/d3-fetch/src/dsv.js
function dsvParse(parse) {
  return function(input, init4, row) {
    if (arguments.length === 2 && typeof init4 === "function") row = init4, init4 = void 0;
    return text_default4(input, init4).then(function(response) {
      return parse(response, row);
    });
  };
}
function dsv(delimiter, input, init4, row) {
  if (arguments.length === 3 && typeof init4 === "function") row = init4, init4 = void 0;
  var format2 = dsv_default(delimiter);
  return text_default4(input, init4).then(function(response) {
    return format2.parse(response, row);
  });
}
var csv2 = dsvParse(csvParse);
var tsv2 = dsvParse(tsvParse);

// node_modules/d3-fetch/src/image.js
function image_default(input, init4) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    for (var key in init4) image[key] = init4[key];
    image.onerror = reject;
    image.onload = function() {
      resolve(image);
    };
    image.src = input;
  });
}

// node_modules/d3-fetch/src/json.js
function responseJson(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  if (response.status === 204 || response.status === 205) return;
  return response.json();
}
function json_default(input, init4) {
  return fetch(input, init4).then(responseJson);
}

// node_modules/d3-fetch/src/xml.js
function parser(type2) {
  return function(input, init4) {
    return text_default4(input, init4).then(function(text) {
      return new DOMParser().parseFromString(text, type2);
    });
  };
}
var xml_default = parser("application/xml");
var html = parser("text/html");
var svg = parser("image/svg+xml");

// node_modules/d3/node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x2) {
  return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
}
function formatDecimalParts(x2, p) {
  if ((i = (x2 = p ? x2.toExponential(p - 1) : x2.toExponential()).indexOf("e")) < 0) return null;
  var i, coefficient = x2.slice(0, i);
  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x2.slice(i + 1)];
}

// node_modules/d3/node_modules/d3-format/src/exponent.js
function exponent_default(x2) {
  return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
}

// node_modules/d3/node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length2 = 0;
    while (i > 0 && g > 0) {
      if (length2 + g + 1 > width) g = Math.max(1, width - length2);
      t.push(value.substring(i -= g, i + g));
      if ((length2 += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

// node_modules/d3/node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/d3/node_modules/d3-format/src/formatSpecifier.js
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

// node_modules/d3/node_modules/d3-format/src/formatTrim.js
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

// node_modules/d3/node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d) return x2 + "";
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x2, Math.max(0, p + i - 1))[0];
}

// node_modules/d3/node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d) return x2 + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// node_modules/d3/node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": function(x2, p) {
    return (x2 * 100).toFixed(p);
  },
  "b": function(x2) {
    return Math.round(x2).toString(2);
  },
  "c": function(x2) {
    return x2 + "";
  },
  "d": formatDecimal_default,
  "e": function(x2, p) {
    return x2.toExponential(p);
  },
  "f": function(x2, p) {
    return x2.toFixed(p);
  },
  "g": function(x2, p) {
    return x2.toPrecision(p);
  },
  "o": function(x2) {
    return Math.round(x2).toString(8);
  },
  "p": function(x2, p) {
    return formatRounded_default(x2 * 100, p);
  },
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": function(x2) {
    return Math.round(x2).toString(16).toUpperCase();
  },
  "x": function(x2) {
    return Math.round(x2).toString(16);
  }
};

// node_modules/d3/node_modules/d3-format/src/identity.js
function identity_default5(x2) {
  return x2;
}

// node_modules/d3/node_modules/d3-format/src/locale.js
var map4 = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale3) {
  var group = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default5 : formatGroup_default(map4.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default5 : formatNumerals_default(map4.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "-" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign2 = specifier.sign, symbol = specifier.symbol, zero4 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type2 = specifier.type;
    if (type2 === "n") comma = true, type2 = "g";
    else if (!formatTypes_default[type2]) precision === void 0 && (precision = 12), trim = true, type2 = "g";
    if (zero4 || fill === "0" && align === "=") zero4 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type2) ? "0" + type2.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type2) ? percent : "";
    var formatType = formatTypes_default[type2], maybeSuffix = /[defgprs%]/.test(type2);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type2) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c3;
      if (type2 === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim) value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign2 !== "+") valueNegative = false;
        valuePrefix = (valueNegative ? sign2 === "(" ? sign2 : minus : sign2 === "-" || sign2 === "(" ? "" : sign2) + valuePrefix;
        valueSuffix = (type2 === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign2 === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c3 = value.charCodeAt(i), 48 > c3 || c3 > 57) {
              valueSuffix = (c3 === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero4) value = group(value, Infinity);
      var length2 = valuePrefix.length + value.length + valueSuffix.length, padding = length2 < width ? new Array(width - length2 + 1).join(fill) : "";
      if (comma && zero4) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length2 = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length2);
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
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
    return function(value2) {
      return f(k * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/d3/node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/d3/node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// node_modules/d3/node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// node_modules/d3/node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max2) {
  step = Math.abs(step), max2 = Math.abs(max2) - step;
  return Math.max(0, exponent_default(max2) - exponent_default(step)) + 1;
}

// node_modules/d3-geo/src/adder.js
function adder_default() {
  return new Adder();
}
function Adder() {
  this.reset();
}
Adder.prototype = {
  constructor: Adder,
  reset: function() {
    this.s = // rounded value
    this.t = 0;
  },
  add: function(y2) {
    add(temp, y2, this.t);
    add(this, temp.s, this.s);
    if (this.s) this.t += temp.t;
    else this.s = temp.t;
  },
  valueOf: function() {
    return this.s;
  }
};
var temp = new Adder();
function add(adder, a, b) {
  var x2 = adder.s = a + b, bv = x2 - a, av = x2 - bv;
  adder.t = a - av + (b - bv);
}

// node_modules/d3-geo/src/math.js
var epsilon2 = 1e-6;
var epsilon22 = 1e-12;
var pi2 = Math.PI;
var halfPi2 = pi2 / 2;
var quarterPi = pi2 / 4;
var tau2 = pi2 * 2;
var degrees2 = 180 / pi2;
var radians = pi2 / 180;
var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos2 = Math.cos;
var ceil = Math.ceil;
var exp = Math.exp;
var log = Math.log;
var pow = Math.pow;
var sin2 = Math.sin;
var sign = Math.sign || function(x2) {
  return x2 > 0 ? 1 : x2 < 0 ? -1 : 0;
};
var sqrt = Math.sqrt;
var tan = Math.tan;
function acos(x2) {
  return x2 > 1 ? 0 : x2 < -1 ? pi2 : Math.acos(x2);
}
function asin(x2) {
  return x2 > 1 ? halfPi2 : x2 < -1 ? -halfPi2 : Math.asin(x2);
}
function haversin(x2) {
  return (x2 = sin2(x2 / 2)) * x2;
}

// node_modules/d3-geo/src/noop.js
function noop3() {
}

// node_modules/d3-geo/src/stream.js
function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}
var streamObjectType = {
  Feature: function(object2, stream) {
    streamGeometry(object2.geometry, stream);
  },
  FeatureCollection: function(object2, stream) {
    var features = object2.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};
var streamGeometryType = {
  Sphere: function(object2, stream) {
    stream.sphere();
  },
  Point: function(object2, stream) {
    object2 = object2.coordinates;
    stream.point(object2[0], object2[1], object2[2]);
  },
  MultiPoint: function(object2, stream) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) object2 = coordinates2[i], stream.point(object2[0], object2[1], object2[2]);
  },
  LineString: function(object2, stream) {
    streamLine(object2.coordinates, stream, 0);
  },
  MultiLineString: function(object2, stream) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) streamLine(coordinates2[i], stream, 0);
  },
  Polygon: function(object2, stream) {
    streamPolygon(object2.coordinates, stream);
  },
  MultiPolygon: function(object2, stream) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) streamPolygon(coordinates2[i], stream);
  },
  GeometryCollection: function(object2, stream) {
    var geometries = object2.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};
function streamLine(coordinates2, stream, closed) {
  var i = -1, n = coordinates2.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates2[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}
function streamPolygon(coordinates2, stream) {
  var i = -1, n = coordinates2.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates2[i], stream, 1);
  stream.polygonEnd();
}
function stream_default(object2, stream) {
  if (object2 && streamObjectType.hasOwnProperty(object2.type)) {
    streamObjectType[object2.type](object2, stream);
  } else {
    streamGeometry(object2, stream);
  }
}

// node_modules/d3-geo/src/area.js
var areaRingSum = adder_default();
var areaSum = adder_default();
var lambda00;
var phi00;
var lambda0;
var cosPhi0;
var sinPhi0;
var areaStream = {
  point: noop3,
  lineStart: noop3,
  lineEnd: noop3,
  polygonStart: function() {
    areaRingSum.reset();
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    var areaRing = +areaRingSum;
    areaSum.add(areaRing < 0 ? tau2 + areaRing : areaRing);
    this.lineStart = this.lineEnd = this.point = noop3;
  },
  sphere: function() {
    areaSum.add(tau2);
  }
};
function areaRingStart() {
  areaStream.point = areaPointFirst;
}
function areaRingEnd() {
  areaPoint(lambda00, phi00);
}
function areaPointFirst(lambda, phi2) {
  areaStream.point = areaPoint;
  lambda00 = lambda, phi00 = phi2;
  lambda *= radians, phi2 *= radians;
  lambda0 = lambda, cosPhi0 = cos2(phi2 = phi2 / 2 + quarterPi), sinPhi0 = sin2(phi2);
}
function areaPoint(lambda, phi2) {
  lambda *= radians, phi2 *= radians;
  phi2 = phi2 / 2 + quarterPi;
  var dLambda = lambda - lambda0, sdLambda = dLambda >= 0 ? 1 : -1, adLambda = sdLambda * dLambda, cosPhi = cos2(phi2), sinPhi = sin2(phi2), k = sinPhi0 * sinPhi, u = cosPhi0 * cosPhi + k * cos2(adLambda), v = k * sdLambda * sin2(adLambda);
  areaRingSum.add(atan2(v, u));
  lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
}
function area_default3(object2) {
  areaSum.reset();
  stream_default(object2, areaStream);
  return areaSum * 2;
}

// node_modules/d3-geo/src/cartesian.js
function spherical(cartesian2) {
  return [atan2(cartesian2[1], cartesian2[0]), asin(cartesian2[2])];
}
function cartesian(spherical2) {
  var lambda = spherical2[0], phi2 = spherical2[1], cosPhi = cos2(phi2);
  return [cosPhi * cos2(lambda), cosPhi * sin2(lambda), sin2(phi2)];
}
function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}
function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

// node_modules/d3-geo/src/bounds.js
var lambda02;
var phi0;
var lambda1;
var phi1;
var lambda2;
var lambda002;
var phi002;
var p0;
var deltaSum = adder_default();
var ranges;
var range;
var boundsStream = {
  point: boundsPoint,
  lineStart: boundsLineStart,
  lineEnd: boundsLineEnd,
  polygonStart: function() {
    boundsStream.point = boundsRingPoint;
    boundsStream.lineStart = boundsRingStart;
    boundsStream.lineEnd = boundsRingEnd;
    deltaSum.reset();
    areaStream.polygonStart();
  },
  polygonEnd: function() {
    areaStream.polygonEnd();
    boundsStream.point = boundsPoint;
    boundsStream.lineStart = boundsLineStart;
    boundsStream.lineEnd = boundsLineEnd;
    if (areaRingSum < 0) lambda02 = -(lambda1 = 180), phi0 = -(phi1 = 90);
    else if (deltaSum > epsilon2) phi1 = 90;
    else if (deltaSum < -epsilon2) phi0 = -90;
    range[0] = lambda02, range[1] = lambda1;
  },
  sphere: function() {
    lambda02 = -(lambda1 = 180), phi0 = -(phi1 = 90);
  }
};
function boundsPoint(lambda, phi2) {
  ranges.push(range = [lambda02 = lambda, lambda1 = lambda]);
  if (phi2 < phi0) phi0 = phi2;
  if (phi2 > phi1) phi1 = phi2;
}
function linePoint(lambda, phi2) {
  var p = cartesian([lambda * radians, phi2 * radians]);
  if (p0) {
    var normal = cartesianCross(p0, p), equatorial = [normal[1], -normal[0], 0], inflection = cartesianCross(equatorial, normal);
    cartesianNormalizeInPlace(inflection);
    inflection = spherical(inflection);
    var delta = lambda - lambda2, sign2 = delta > 0 ? 1 : -1, lambdai = inflection[0] * degrees2 * sign2, phii, antimeridian = abs(delta) > 180;
    if (antimeridian ^ (sign2 * lambda2 < lambdai && lambdai < sign2 * lambda)) {
      phii = inflection[1] * degrees2;
      if (phii > phi1) phi1 = phii;
    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign2 * lambda2 < lambdai && lambdai < sign2 * lambda)) {
      phii = -inflection[1] * degrees2;
      if (phii < phi0) phi0 = phii;
    } else {
      if (phi2 < phi0) phi0 = phi2;
      if (phi2 > phi1) phi1 = phi2;
    }
    if (antimeridian) {
      if (lambda < lambda2) {
        if (angle(lambda02, lambda) > angle(lambda02, lambda1)) lambda1 = lambda;
      } else {
        if (angle(lambda, lambda1) > angle(lambda02, lambda1)) lambda02 = lambda;
      }
    } else {
      if (lambda1 >= lambda02) {
        if (lambda < lambda02) lambda02 = lambda;
        if (lambda > lambda1) lambda1 = lambda;
      } else {
        if (lambda > lambda2) {
          if (angle(lambda02, lambda) > angle(lambda02, lambda1)) lambda1 = lambda;
        } else {
          if (angle(lambda, lambda1) > angle(lambda02, lambda1)) lambda02 = lambda;
        }
      }
    }
  } else {
    ranges.push(range = [lambda02 = lambda, lambda1 = lambda]);
  }
  if (phi2 < phi0) phi0 = phi2;
  if (phi2 > phi1) phi1 = phi2;
  p0 = p, lambda2 = lambda;
}
function boundsLineStart() {
  boundsStream.point = linePoint;
}
function boundsLineEnd() {
  range[0] = lambda02, range[1] = lambda1;
  boundsStream.point = boundsPoint;
  p0 = null;
}
function boundsRingPoint(lambda, phi2) {
  if (p0) {
    var delta = lambda - lambda2;
    deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
  } else {
    lambda002 = lambda, phi002 = phi2;
  }
  areaStream.point(lambda, phi2);
  linePoint(lambda, phi2);
}
function boundsRingStart() {
  areaStream.lineStart();
}
function boundsRingEnd() {
  boundsRingPoint(lambda002, phi002);
  areaStream.lineEnd();
  if (abs(deltaSum) > epsilon2) lambda02 = -(lambda1 = 180);
  range[0] = lambda02, range[1] = lambda1;
  p0 = null;
}
function angle(lambda04, lambda12) {
  return (lambda12 -= lambda04) < 0 ? lambda12 + 360 : lambda12;
}
function rangeCompare(a, b) {
  return a[0] - b[0];
}
function rangeContains(range2, x2) {
  return range2[0] <= range2[1] ? range2[0] <= x2 && x2 <= range2[1] : x2 < range2[0] || range2[1] < x2;
}
function bounds_default(feature) {
  var i, n, a, b, merged, deltaMax, delta;
  phi1 = lambda1 = -(lambda02 = phi0 = Infinity);
  ranges = [];
  stream_default(feature, boundsStream);
  if (n = ranges.length) {
    ranges.sort(rangeCompare);
    for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
      b = ranges[i];
      if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
        if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
        if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
      } else {
        merged.push(a = b);
      }
    }
    for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
      b = merged[i];
      if ((delta = angle(a[1], b[0])) > deltaMax) deltaMax = delta, lambda02 = b[0], lambda1 = a[1];
    }
  }
  ranges = range = null;
  return lambda02 === Infinity || phi0 === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[lambda02, phi0], [lambda1, phi1]];
}

// node_modules/d3-geo/src/centroid.js
var W0;
var W1;
var X0;
var Y0;
var Z0;
var X1;
var Y1;
var Z1;
var X2;
var Y2;
var Z2;
var lambda003;
var phi003;
var x0;
var y0;
var z0;
var centroidStream = {
  sphere: noop3,
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  }
};
function centroidPoint(lambda, phi2) {
  lambda *= radians, phi2 *= radians;
  var cosPhi = cos2(phi2);
  centroidPointCartesian(cosPhi * cos2(lambda), cosPhi * sin2(lambda), sin2(phi2));
}
function centroidPointCartesian(x2, y2, z) {
  ++W0;
  X0 += (x2 - X0) / W0;
  Y0 += (y2 - Y0) / W0;
  Z0 += (z - Z0) / W0;
}
function centroidLineStart() {
  centroidStream.point = centroidLinePointFirst;
}
function centroidLinePointFirst(lambda, phi2) {
  lambda *= radians, phi2 *= radians;
  var cosPhi = cos2(phi2);
  x0 = cosPhi * cos2(lambda);
  y0 = cosPhi * sin2(lambda);
  z0 = sin2(phi2);
  centroidStream.point = centroidLinePoint;
  centroidPointCartesian(x0, y0, z0);
}
function centroidLinePoint(lambda, phi2) {
  lambda *= radians, phi2 *= radians;
  var cosPhi = cos2(phi2), x2 = cosPhi * cos2(lambda), y2 = cosPhi * sin2(lambda), z = sin2(phi2), w = atan2(sqrt((w = y0 * z - z0 * y2) * w + (w = z0 * x2 - x0 * z) * w + (w = x0 * y2 - y0 * x2) * w), x0 * x2 + y0 * y2 + z0 * z);
  W1 += w;
  X1 += w * (x0 + (x0 = x2));
  Y1 += w * (y0 + (y0 = y2));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}
function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}
function centroidRingStart() {
  centroidStream.point = centroidRingPointFirst;
}
function centroidRingEnd() {
  centroidRingPoint(lambda003, phi003);
  centroidStream.point = centroidPoint;
}
function centroidRingPointFirst(lambda, phi2) {
  lambda003 = lambda, phi003 = phi2;
  lambda *= radians, phi2 *= radians;
  centroidStream.point = centroidRingPoint;
  var cosPhi = cos2(phi2);
  x0 = cosPhi * cos2(lambda);
  y0 = cosPhi * sin2(lambda);
  z0 = sin2(phi2);
  centroidPointCartesian(x0, y0, z0);
}
function centroidRingPoint(lambda, phi2) {
  lambda *= radians, phi2 *= radians;
  var cosPhi = cos2(phi2), x2 = cosPhi * cos2(lambda), y2 = cosPhi * sin2(lambda), z = sin2(phi2), cx = y0 * z - z0 * y2, cy = z0 * x2 - x0 * z, cz = x0 * y2 - y0 * x2, m = sqrt(cx * cx + cy * cy + cz * cz), w = asin(m), v = m && -w / m;
  X2 += v * cx;
  Y2 += v * cy;
  Z2 += v * cz;
  W1 += w;
  X1 += w * (x0 + (x0 = x2));
  Y1 += w * (y0 + (y0 = y2));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}
function centroid_default(object2) {
  W0 = W1 = X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
  stream_default(object2, centroidStream);
  var x2 = X2, y2 = Y2, z = Z2, m = x2 * x2 + y2 * y2 + z * z;
  if (m < epsilon22) {
    x2 = X1, y2 = Y1, z = Z1;
    if (W1 < epsilon2) x2 = X0, y2 = Y0, z = Z0;
    m = x2 * x2 + y2 * y2 + z * z;
    if (m < epsilon22) return [NaN, NaN];
  }
  return [atan2(y2, x2) * degrees2, asin(z / sqrt(m)) * degrees2];
}

// node_modules/d3-geo/src/constant.js
function constant_default12(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-geo/src/compose.js
function compose_default(a, b) {
  function compose(x2, y2) {
    return x2 = a(x2, y2), b(x2[0], x2[1]);
  }
  if (a.invert && b.invert) compose.invert = function(x2, y2) {
    return x2 = b.invert(x2, y2), x2 && a.invert(x2[0], x2[1]);
  };
  return compose;
}

// node_modules/d3-geo/src/rotation.js
function rotationIdentity(lambda, phi2) {
  return [abs(lambda) > pi2 ? lambda + Math.round(-lambda / tau2) * tau2 : lambda, phi2];
}
rotationIdentity.invert = rotationIdentity;
function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau2) ? deltaPhi || deltaGamma ? compose_default(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
}
function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi2) {
    return lambda += deltaLambda, [lambda > pi2 ? lambda - tau2 : lambda < -pi2 ? lambda + tau2 : lambda, phi2];
  };
}
function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}
function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos2(deltaPhi), sinDeltaPhi = sin2(deltaPhi), cosDeltaGamma = cos2(deltaGamma), sinDeltaGamma = sin2(deltaGamma);
  function rotation(lambda, phi2) {
    var cosPhi = cos2(phi2), x2 = cos2(lambda) * cosPhi, y2 = sin2(lambda) * cosPhi, z = sin2(phi2), k = z * cosDeltaPhi + x2 * sinDeltaPhi;
    return [atan2(y2 * cosDeltaGamma - k * sinDeltaGamma, x2 * cosDeltaPhi - z * sinDeltaPhi), asin(k * cosDeltaGamma + y2 * sinDeltaGamma)];
  }
  rotation.invert = function(lambda, phi2) {
    var cosPhi = cos2(phi2), x2 = cos2(lambda) * cosPhi, y2 = sin2(lambda) * cosPhi, z = sin2(phi2), k = z * cosDeltaGamma - y2 * sinDeltaGamma;
    return [atan2(y2 * cosDeltaGamma + z * sinDeltaGamma, x2 * cosDeltaPhi + k * sinDeltaPhi), asin(k * cosDeltaPhi - x2 * sinDeltaPhi)];
  };
  return rotation;
}
function rotation_default(rotate) {
  rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);
  function forward(coordinates2) {
    coordinates2 = rotate(coordinates2[0] * radians, coordinates2[1] * radians);
    return coordinates2[0] *= degrees2, coordinates2[1] *= degrees2, coordinates2;
  }
  forward.invert = function(coordinates2) {
    coordinates2 = rotate.invert(coordinates2[0] * radians, coordinates2[1] * radians);
    return coordinates2[0] *= degrees2, coordinates2[1] *= degrees2, coordinates2;
  };
  return forward;
}

// node_modules/d3-geo/src/circle.js
function circleStream(stream, radius, delta, direction, t06, t16) {
  if (!delta) return;
  var cosRadius = cos2(radius), sinRadius = sin2(radius), step = direction * delta;
  if (t06 == null) {
    t06 = radius + direction * tau2;
    t16 = radius - step / 2;
  } else {
    t06 = circleRadius(cosRadius, t06);
    t16 = circleRadius(cosRadius, t16);
    if (direction > 0 ? t06 < t16 : t06 > t16) t06 += direction * tau2;
  }
  for (var point2, t = t06; direction > 0 ? t > t16 : t < t16; t -= step) {
    point2 = spherical([cosRadius, -sinRadius * cos2(t), -sinRadius * sin2(t)]);
    stream.point(point2[0], point2[1]);
  }
}
function circleRadius(cosRadius, point2) {
  point2 = cartesian(point2), point2[0] -= cosRadius;
  cartesianNormalizeInPlace(point2);
  var radius = acos(-point2[1]);
  return ((-point2[2] < 0 ? -radius : radius) + tau2 - epsilon2) % tau2;
}
function circle_default2() {
  var center2 = constant_default12([0, 0]), radius = constant_default12(90), precision = constant_default12(6), ring, rotate, stream = {
    point: point2
  };
  function point2(x2, y2) {
    ring.push(x2 = rotate(x2, y2));
    x2[0] *= degrees2, x2[1] *= degrees2;
  }
  function circle2() {
    var c3 = center2.apply(this, arguments), r = radius.apply(this, arguments) * radians, p = precision.apply(this, arguments) * radians;
    ring = [];
    rotate = rotateRadians(-c3[0] * radians, -c3[1] * radians, 0).invert;
    circleStream(stream, r, p, 1);
    c3 = {
      type: "Polygon",
      coordinates: [ring]
    };
    ring = rotate = null;
    return c3;
  }
  circle2.center = function(_) {
    return arguments.length ? (center2 = typeof _ === "function" ? _ : constant_default12([+_[0], +_[1]]), circle2) : center2;
  };
  circle2.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default12(+_), circle2) : radius;
  };
  circle2.precision = function(_) {
    return arguments.length ? (precision = typeof _ === "function" ? _ : constant_default12(+_), circle2) : precision;
  };
  return circle2;
}

// node_modules/d3-geo/src/clip/buffer.js
function buffer_default2() {
  var lines = [], line;
  return {
    point: function(x2, y2, m) {
      line.push([x2, y2, m]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop3,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}

// node_modules/d3-geo/src/pointEqual.js
function pointEqual_default(a, b) {
  return abs(a[0] - b[0]) < epsilon2 && abs(a[1] - b[1]) < epsilon2;
}

// node_modules/d3-geo/src/clip/rejoin.js
function Intersection(point2, points, other, entry) {
  this.x = point2;
  this.z = points;
  this.o = other;
  this.e = entry;
  this.v = false;
  this.n = this.p = null;
}
function rejoin_default(segments, compareIntersection2, startInside, interpolate, stream) {
  var subject = [], clip = [], i, n;
  segments.forEach(function(segment) {
    if ((n2 = segment.length - 1) <= 0) return;
    var n2, p02 = segment[0], p1 = segment[n2], x2;
    if (pointEqual_default(p02, p1)) {
      if (!p02[2] && !p1[2]) {
        stream.lineStart();
        for (i = 0; i < n2; ++i) stream.point((p02 = segment[i])[0], p02[1]);
        stream.lineEnd();
        return;
      }
      p1[0] += 2 * epsilon2;
    }
    subject.push(x2 = new Intersection(p02, segment, null, true));
    clip.push(x2.o = new Intersection(p02, null, x2, false));
    subject.push(x2 = new Intersection(p1, segment, null, false));
    clip.push(x2.o = new Intersection(p1, null, x2, true));
  });
  if (!subject.length) return;
  clip.sort(compareIntersection2);
  link(subject);
  link(clip);
  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }
  var start4 = subject[0], points, point2;
  while (1) {
    var current = start4, isSubject = true;
    while (current.v) if ((current = current.n) === start4) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point2 = points[i])[0], point2[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point2 = points[i])[0], point2[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
}
function link(array7) {
  if (!(n = array7.length)) return;
  var n, i = 0, a = array7[0], b;
  while (++i < n) {
    a.n = b = array7[i];
    b.p = a;
    a = b;
  }
  a.n = b = array7[0];
  b.p = a;
}

// node_modules/d3-geo/src/polygonContains.js
var sum = adder_default();
function longitude(point2) {
  if (abs(point2[0]) <= pi2) return point2[0];
  else return sign(point2[0]) * ((abs(point2[0]) + pi2) % tau2 - pi2);
}
function polygonContains_default(polygon, point2) {
  var lambda = longitude(point2), phi2 = point2[1], sinPhi = sin2(phi2), normal = [sin2(lambda), -cos2(lambda), 0], angle2 = 0, winding = 0;
  sum.reset();
  if (sinPhi === 1) phi2 = halfPi2 + epsilon2;
  else if (sinPhi === -1) phi2 = -halfPi2 - epsilon2;
  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring, m, point0 = ring[m - 1], lambda04 = longitude(point0), phi02 = point0[1] / 2 + quarterPi, sinPhi03 = sin2(phi02), cosPhi03 = cos2(phi02);
    for (var j = 0; j < m; ++j, lambda04 = lambda12, sinPhi03 = sinPhi1, cosPhi03 = cosPhi1, point0 = point1) {
      var point1 = ring[j], lambda12 = longitude(point1), phi12 = point1[1] / 2 + quarterPi, sinPhi1 = sin2(phi12), cosPhi1 = cos2(phi12), delta = lambda12 - lambda04, sign2 = delta >= 0 ? 1 : -1, absDelta = sign2 * delta, antimeridian = absDelta > pi2, k = sinPhi03 * sinPhi1;
      sum.add(atan2(k * sign2 * sin2(absDelta), cosPhi03 * cosPhi1 + k * cos2(absDelta)));
      angle2 += antimeridian ? delta + sign2 * tau2 : delta;
      if (antimeridian ^ lambda04 >= lambda ^ lambda12 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
        if (phi2 > phiArc || phi2 === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }
  return (angle2 < -epsilon2 || angle2 < epsilon2 && sum < -epsilon2) ^ winding & 1;
}

// node_modules/d3-geo/node_modules/d3-array/src/ascending.js
function ascending_default6(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3-geo/node_modules/d3-array/src/bisector.js
function bisector_default4(compare) {
  if (compare.length === 1) compare = ascendingComparator4(compare);
  return {
    left: function(a, x2, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x2) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x2, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x2) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
}
function ascendingComparator4(f) {
  return function(d, x2) {
    return ascending_default6(f(d), x2);
  };
}

// node_modules/d3-geo/node_modules/d3-array/src/bisect.js
var ascendingBisect4 = bisector_default4(ascending_default6);
var bisectRight4 = ascendingBisect4.right;
var bisectLeft4 = ascendingBisect4.left;

// node_modules/d3-geo/node_modules/d3-array/src/array.js
var array5 = Array.prototype;
var slice7 = array5.slice;
var map5 = array5.map;

// node_modules/d3-geo/node_modules/d3-array/src/range.js
function range_default4(start4, stop, step) {
  start4 = +start4, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start4, start4 = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop - start4) / step)) | 0, range2 = new Array(n);
  while (++i < n) {
    range2[i] = start4 + i * step;
  }
  return range2;
}

// node_modules/d3-geo/node_modules/d3-array/src/ticks.js
var e104 = Math.sqrt(50);
var e54 = Math.sqrt(10);
var e24 = Math.sqrt(2);

// node_modules/d3-geo/node_modules/d3-array/src/merge.js
function merge_default7(arrays) {
  var n = arrays.length, m, i = -1, j = 0, merged, array7;
  while (++i < n) j += arrays[i].length;
  merged = new Array(j);
  while (--n >= 0) {
    array7 = arrays[n];
    m = array7.length;
    while (--m >= 0) {
      merged[--j] = array7[m];
    }
  }
  return merged;
}

// node_modules/d3-geo/src/clip/index.js
function clip_default(pointVisible, clipLine, interpolate, start4) {
  return function(sink) {
    var line = clipLine(sink), ringBuffer = buffer_default2(), ringSink = clipLine(ringBuffer), polygonStarted = false, polygon, segments, ring;
    var clip = {
      point: point2,
      lineStart,
      lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point2;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge_default7(segments);
        var startInside = polygonContains_default(polygon, start4);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          rejoin_default(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };
    function point2(lambda, phi2) {
      if (pointVisible(lambda, phi2)) sink.point(lambda, phi2);
    }
    function pointLine(lambda, phi2) {
      line.point(lambda, phi2);
    }
    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }
    function lineEnd() {
      clip.point = point2;
      line.lineEnd();
    }
    function pointRing(lambda, phi2) {
      ring.push([lambda, phi2]);
      ringSink.point(lambda, phi2);
    }
    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }
    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();
      var clean = ringSink.clean(), ringSegments = ringBuffer.result(), i, n = ringSegments.length, m, segment, point3;
      ring.pop();
      polygon.push(ring);
      ring = null;
      if (!n) return;
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point3 = segment[i])[0], point3[1]);
          sink.lineEnd();
        }
        return;
      }
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
      segments.push(ringSegments.filter(validSegment));
    }
    return clip;
  };
}
function validSegment(segment) {
  return segment.length > 1;
}
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi2 - epsilon2 : halfPi2 - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfPi2 - epsilon2 : halfPi2 - b[1]);
}

// node_modules/d3-geo/src/clip/antimeridian.js
var antimeridian_default = clip_default(function() {
  return true;
}, clipAntimeridianLine, clipAntimeridianInterpolate, [-pi2, -halfPi2]);
function clipAntimeridianLine(stream) {
  var lambda04 = NaN, phi02 = NaN, sign0 = NaN, clean;
  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda12, phi12) {
      var sign1 = lambda12 > 0 ? pi2 : -pi2, delta = abs(lambda12 - lambda04);
      if (abs(delta - pi2) < epsilon2) {
        stream.point(lambda04, phi02 = (phi02 + phi12) / 2 > 0 ? halfPi2 : -halfPi2);
        stream.point(sign0, phi02);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi02);
        stream.point(lambda12, phi02);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi2) {
        if (abs(lambda04 - sign0) < epsilon2) lambda04 -= sign0 * epsilon2;
        if (abs(lambda12 - sign1) < epsilon2) lambda12 -= sign1 * epsilon2;
        phi02 = clipAntimeridianIntersect(lambda04, phi02, lambda12, phi12);
        stream.point(sign0, phi02);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi02);
        clean = 0;
      }
      stream.point(lambda04 = lambda12, phi02 = phi12);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda04 = phi02 = NaN;
    },
    clean: function() {
      return 2 - clean;
    }
  };
}
function clipAntimeridianIntersect(lambda04, phi02, lambda12, phi12) {
  var cosPhi03, cosPhi1, sinLambda0Lambda1 = sin2(lambda04 - lambda12);
  return abs(sinLambda0Lambda1) > epsilon2 ? atan((sin2(phi02) * (cosPhi1 = cos2(phi12)) * sin2(lambda12) - sin2(phi12) * (cosPhi03 = cos2(phi02)) * sin2(lambda04)) / (cosPhi03 * cosPhi1 * sinLambda0Lambda1)) : (phi02 + phi12) / 2;
}
function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi2;
  if (from == null) {
    phi2 = direction * halfPi2;
    stream.point(-pi2, phi2);
    stream.point(0, phi2);
    stream.point(pi2, phi2);
    stream.point(pi2, 0);
    stream.point(pi2, -phi2);
    stream.point(0, -phi2);
    stream.point(-pi2, -phi2);
    stream.point(-pi2, 0);
    stream.point(-pi2, phi2);
  } else if (abs(from[0] - to[0]) > epsilon2) {
    var lambda = from[0] < to[0] ? pi2 : -pi2;
    phi2 = direction * lambda / 2;
    stream.point(-lambda, phi2);
    stream.point(0, phi2);
    stream.point(lambda, phi2);
  } else {
    stream.point(to[0], to[1]);
  }
}

// node_modules/d3-geo/src/clip/circle.js
function circle_default3(radius) {
  var cr = cos2(radius), delta = 6 * radians, smallRadius = cr > 0, notHemisphere = abs(cr) > epsilon2;
  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }
  function visible(lambda, phi2) {
    return cos2(lambda) * cos2(phi2) > cr;
  }
  function clipLine(stream) {
    var point0, c0, v0, v00, clean;
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi2) {
        var point1 = [lambda, phi2], point2, v = visible(lambda, phi2), c3 = smallRadius ? v ? 0 : code(lambda, phi2) : v ? code(lambda + (lambda < 0 ? pi2 : -pi2), phi2) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual_default(point0, point2) || pointEqual_default(point1, point2)) point1[2] = 1;
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1], 2);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          if (!(c3 & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1], 3);
            }
          }
        }
        if (v && (!point0 || !pointEqual_default(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c3;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | (v00 && v0) << 1;
      }
    };
  }
  function intersect(a, b, two) {
    var pa = cartesian(a), pb = cartesian(b);
    var n1 = [1, 0, 0], n2 = cartesianCross(pa, pb), n2n2 = cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
    if (!determinant) return !two && a;
    var c1 = cr * n2n2 / determinant, c22 = -cr * n1n2 / determinant, n1xn2 = cartesianCross(n1, n2), A7 = cartesianScale(n1, c1), B5 = cartesianScale(n2, c22);
    cartesianAddInPlace(A7, B5);
    var u = n1xn2, w = cartesianDot(A7, u), uu = cartesianDot(u, u), t25 = w * w - uu * (cartesianDot(A7, A7) - 1);
    if (t25 < 0) return;
    var t = sqrt(t25), q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A7);
    q = spherical(q);
    if (!two) return q;
    var lambda04 = a[0], lambda12 = b[0], phi02 = a[1], phi12 = b[1], z;
    if (lambda12 < lambda04) z = lambda04, lambda04 = lambda12, lambda12 = z;
    var delta2 = lambda12 - lambda04, polar = abs(delta2 - pi2) < epsilon2, meridian = polar || delta2 < epsilon2;
    if (!polar && phi12 < phi02) z = phi02, phi02 = phi12, phi12 = z;
    if (meridian ? polar ? phi02 + phi12 > 0 ^ q[1] < (abs(q[0] - lambda04) < epsilon2 ? phi02 : phi12) : phi02 <= q[1] && q[1] <= phi12 : delta2 > pi2 ^ (lambda04 <= q[0] && q[0] <= lambda12)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A7);
      return [q, spherical(q1)];
    }
  }
  function code(lambda, phi2) {
    var r = smallRadius ? radius : pi2 - radius, code2 = 0;
    if (lambda < -r) code2 |= 1;
    else if (lambda > r) code2 |= 2;
    if (phi2 < -r) code2 |= 4;
    else if (phi2 > r) code2 |= 8;
    return code2;
  }
  return clip_default(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi2, radius - pi2]);
}

// node_modules/d3-geo/src/clip/line.js
function line_default2(a, b, x06, y06, x12, y12) {
  var ax = a[0], ay = a[1], bx = b[0], by = b[1], t06 = 0, t16 = 1, dx = bx - ax, dy = by - ay, r;
  r = x06 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t06) return;
    if (r < t16) t16 = r;
  } else if (dx > 0) {
    if (r > t16) return;
    if (r > t06) t06 = r;
  }
  r = x12 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t16) return;
    if (r > t06) t06 = r;
  } else if (dx > 0) {
    if (r < t06) return;
    if (r < t16) t16 = r;
  }
  r = y06 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t06) return;
    if (r < t16) t16 = r;
  } else if (dy > 0) {
    if (r > t16) return;
    if (r > t06) t06 = r;
  }
  r = y12 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t16) return;
    if (r > t06) t06 = r;
  } else if (dy > 0) {
    if (r < t06) return;
    if (r < t16) t16 = r;
  }
  if (t06 > 0) a[0] = ax + t06 * dx, a[1] = ay + t06 * dy;
  if (t16 < 1) b[0] = ax + t16 * dx, b[1] = ay + t16 * dy;
  return true;
}

// node_modules/d3-geo/src/clip/rectangle.js
var clipMax = 1e9;
var clipMin = -clipMax;
function clipRectangle(x06, y06, x12, y12) {
  function visible(x2, y2) {
    return x06 <= x2 && x2 <= x12 && y06 <= y2 && y2 <= y12;
  }
  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) {
      do
        stream.point(a === 0 || a === 3 ? x06 : x12, a > 1 ? y12 : y06);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }
  function corner(p, direction) {
    return abs(p[0] - x06) < epsilon2 ? direction > 0 ? 0 : 3 : abs(p[0] - x12) < epsilon2 ? direction > 0 ? 2 : 1 : abs(p[1] - y06) < epsilon2 ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
  }
  function compareIntersection2(a, b) {
    return comparePoint(a.x, b.x);
  }
  function comparePoint(a, b) {
    var ca = corner(a, 1), cb = corner(b, 1);
    return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
  }
  return function(stream) {
    var activeStream = stream, bufferStream = buffer_default2(), segments, polygon, ring, x__, y__, v__, x_, y_, v_, first, clean;
    var clipStream = {
      point: point2,
      lineStart,
      lineEnd,
      polygonStart,
      polygonEnd
    };
    function point2(x2, y2) {
      if (visible(x2, y2)) activeStream.point(x2, y2);
    }
    function polygonInside() {
      var winding = 0;
      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring2 = polygon[i], j = 1, m = ring2.length, point3 = ring2[0], a0, a1, b0 = point3[0], b1 = point3[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point3 = ring2[j], b0 = point3[0], b1 = point3[1];
          if (a1 <= y12) {
            if (b1 > y12 && (b0 - a0) * (y12 - a1) > (b1 - a1) * (x06 - a0)) ++winding;
          } else {
            if (b1 <= y12 && (b0 - a0) * (y12 - a1) < (b1 - a1) * (x06 - a0)) --winding;
          }
        }
      }
      return winding;
    }
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }
    function polygonEnd() {
      var startInside = polygonInside(), cleanInside = clean && startInside, visible2 = (segments = merge_default7(segments)).length;
      if (cleanInside || visible2) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible2) {
          rejoin_default(segments, compareIntersection2, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }
    function lineStart() {
      clipStream.point = linePoint2;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }
    function lineEnd() {
      if (segments) {
        linePoint2(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point2;
      if (v_) activeStream.lineEnd();
    }
    function linePoint2(x2, y2) {
      var v = visible(x2, y2);
      if (polygon) ring.push([x2, y2]);
      if (first) {
        x__ = x2, y__ = y2, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x2, y2);
        }
      } else {
        if (v && v_) activeStream.point(x2, y2);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))], b = [x2 = Math.max(clipMin, Math.min(clipMax, x2)), y2 = Math.max(clipMin, Math.min(clipMax, y2))];
          if (line_default2(a, b, x06, y06, x12, y12)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x2, y2);
            clean = false;
          }
        }
      }
      x_ = x2, y_ = y2, v_ = v;
    }
    return clipStream;
  };
}

// node_modules/d3-geo/src/clip/extent.js
function extent_default5() {
  var x06 = 0, y06 = 0, x12 = 960, y12 = 500, cache, cacheStream, clip;
  return clip = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = clipRectangle(x06, y06, x12, y12)(cacheStream = stream);
    },
    extent: function(_) {
      return arguments.length ? (x06 = +_[0][0], y06 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1], cache = cacheStream = null, clip) : [[x06, y06], [x12, y12]];
    }
  };
}

// node_modules/d3-geo/src/length.js
var lengthSum = adder_default();
var lambda03;
var sinPhi02;
var cosPhi02;
var lengthStream = {
  sphere: noop3,
  point: noop3,
  lineStart: lengthLineStart,
  lineEnd: noop3,
  polygonStart: noop3,
  polygonEnd: noop3
};
function lengthLineStart() {
  lengthStream.point = lengthPointFirst;
  lengthStream.lineEnd = lengthLineEnd;
}
function lengthLineEnd() {
  lengthStream.point = lengthStream.lineEnd = noop3;
}
function lengthPointFirst(lambda, phi2) {
  lambda *= radians, phi2 *= radians;
  lambda03 = lambda, sinPhi02 = sin2(phi2), cosPhi02 = cos2(phi2);
  lengthStream.point = lengthPoint;
}
function lengthPoint(lambda, phi2) {
  lambda *= radians, phi2 *= radians;
  var sinPhi = sin2(phi2), cosPhi = cos2(phi2), delta = abs(lambda - lambda03), cosDelta = cos2(delta), sinDelta = sin2(delta), x2 = cosPhi * sinDelta, y2 = cosPhi02 * sinPhi - sinPhi02 * cosPhi * cosDelta, z = sinPhi02 * sinPhi + cosPhi02 * cosPhi * cosDelta;
  lengthSum.add(atan2(sqrt(x2 * x2 + y2 * y2), z));
  lambda03 = lambda, sinPhi02 = sinPhi, cosPhi02 = cosPhi;
}
function length_default(object2) {
  lengthSum.reset();
  stream_default(object2, lengthStream);
  return +lengthSum;
}

// node_modules/d3-geo/src/distance.js
var coordinates = [null, null];
var object = {
  type: "LineString",
  coordinates
};
function distance_default(a, b) {
  coordinates[0] = a;
  coordinates[1] = b;
  return length_default(object);
}

// node_modules/d3-geo/src/contains.js
var containsObjectType = {
  Feature: function(object2, point2) {
    return containsGeometry(object2.geometry, point2);
  },
  FeatureCollection: function(object2, point2) {
    var features = object2.features, i = -1, n = features.length;
    while (++i < n) if (containsGeometry(features[i].geometry, point2)) return true;
    return false;
  }
};
var containsGeometryType = {
  Sphere: function() {
    return true;
  },
  Point: function(object2, point2) {
    return containsPoint(object2.coordinates, point2);
  },
  MultiPoint: function(object2, point2) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) if (containsPoint(coordinates2[i], point2)) return true;
    return false;
  },
  LineString: function(object2, point2) {
    return containsLine(object2.coordinates, point2);
  },
  MultiLineString: function(object2, point2) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) if (containsLine(coordinates2[i], point2)) return true;
    return false;
  },
  Polygon: function(object2, point2) {
    return containsPolygon(object2.coordinates, point2);
  },
  MultiPolygon: function(object2, point2) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) if (containsPolygon(coordinates2[i], point2)) return true;
    return false;
  },
  GeometryCollection: function(object2, point2) {
    var geometries = object2.geometries, i = -1, n = geometries.length;
    while (++i < n) if (containsGeometry(geometries[i], point2)) return true;
    return false;
  }
};
function containsGeometry(geometry, point2) {
  return geometry && containsGeometryType.hasOwnProperty(geometry.type) ? containsGeometryType[geometry.type](geometry, point2) : false;
}
function containsPoint(coordinates2, point2) {
  return distance_default(coordinates2, point2) === 0;
}
function containsLine(coordinates2, point2) {
  var ao, bo, ab;
  for (var i = 0, n = coordinates2.length; i < n; i++) {
    bo = distance_default(coordinates2[i], point2);
    if (bo === 0) return true;
    if (i > 0) {
      ab = distance_default(coordinates2[i], coordinates2[i - 1]);
      if (ab > 0 && ao <= ab && bo <= ab && (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < epsilon22 * ab) return true;
    }
    ao = bo;
  }
  return false;
}
function containsPolygon(coordinates2, point2) {
  return !!polygonContains_default(coordinates2.map(ringRadians), pointRadians(point2));
}
function ringRadians(ring) {
  return ring = ring.map(pointRadians), ring.pop(), ring;
}
function pointRadians(point2) {
  return [point2[0] * radians, point2[1] * radians];
}
function contains_default2(object2, point2) {
  return (object2 && containsObjectType.hasOwnProperty(object2.type) ? containsObjectType[object2.type] : containsGeometry)(object2, point2);
}

// node_modules/d3-geo/src/graticule.js
function graticuleX(y06, y12, dy) {
  var y2 = range_default4(y06, y12 - epsilon2, dy).concat(y12);
  return function(x2) {
    return y2.map(function(y3) {
      return [x2, y3];
    });
  };
}
function graticuleY(x06, x12, dx) {
  var x2 = range_default4(x06, x12 - epsilon2, dx).concat(x12);
  return function(y2) {
    return x2.map(function(x3) {
      return [x3, y2];
    });
  };
}
function graticule() {
  var x12, x06, X13, X03, y12, y06, Y13, Y03, dx = 10, dy = dx, DX = 90, DY = 360, x2, y2, X3, Y3, precision = 2.5;
  function graticule2() {
    return {
      type: "MultiLineString",
      coordinates: lines()
    };
  }
  function lines() {
    return range_default4(ceil(X03 / DX) * DX, X13, DX).map(X3).concat(range_default4(ceil(Y03 / DY) * DY, Y13, DY).map(Y3)).concat(range_default4(ceil(x06 / dx) * dx, x12, dx).filter(function(x3) {
      return abs(x3 % DX) > epsilon2;
    }).map(x2)).concat(range_default4(ceil(y06 / dy) * dy, y12, dy).filter(function(y3) {
      return abs(y3 % DY) > epsilon2;
    }).map(y2));
  }
  graticule2.lines = function() {
    return lines().map(function(coordinates2) {
      return {
        type: "LineString",
        coordinates: coordinates2
      };
    });
  };
  graticule2.outline = function() {
    return {
      type: "Polygon",
      coordinates: [X3(X03).concat(Y3(Y13).slice(1), X3(X13).reverse().slice(1), Y3(Y03).reverse().slice(1))]
    };
  };
  graticule2.extent = function(_) {
    if (!arguments.length) return graticule2.extentMinor();
    return graticule2.extentMajor(_).extentMinor(_);
  };
  graticule2.extentMajor = function(_) {
    if (!arguments.length) return [[X03, Y03], [X13, Y13]];
    X03 = +_[0][0], X13 = +_[1][0];
    Y03 = +_[0][1], Y13 = +_[1][1];
    if (X03 > X13) _ = X03, X03 = X13, X13 = _;
    if (Y03 > Y13) _ = Y03, Y03 = Y13, Y13 = _;
    return graticule2.precision(precision);
  };
  graticule2.extentMinor = function(_) {
    if (!arguments.length) return [[x06, y06], [x12, y12]];
    x06 = +_[0][0], x12 = +_[1][0];
    y06 = +_[0][1], y12 = +_[1][1];
    if (x06 > x12) _ = x06, x06 = x12, x12 = _;
    if (y06 > y12) _ = y06, y06 = y12, y12 = _;
    return graticule2.precision(precision);
  };
  graticule2.step = function(_) {
    if (!arguments.length) return graticule2.stepMinor();
    return graticule2.stepMajor(_).stepMinor(_);
  };
  graticule2.stepMajor = function(_) {
    if (!arguments.length) return [DX, DY];
    DX = +_[0], DY = +_[1];
    return graticule2;
  };
  graticule2.stepMinor = function(_) {
    if (!arguments.length) return [dx, dy];
    dx = +_[0], dy = +_[1];
    return graticule2;
  };
  graticule2.precision = function(_) {
    if (!arguments.length) return precision;
    precision = +_;
    x2 = graticuleX(y06, y12, 90);
    y2 = graticuleY(x06, x12, precision);
    X3 = graticuleX(Y03, Y13, 90);
    Y3 = graticuleY(X03, X13, precision);
    return graticule2;
  };
  return graticule2.extentMajor([[-180, -90 + epsilon2], [180, 90 - epsilon2]]).extentMinor([[-180, -80 - epsilon2], [180, 80 + epsilon2]]);
}
function graticule10() {
  return graticule()();
}

// node_modules/d3-geo/src/interpolate.js
function interpolate_default2(a, b) {
  var x06 = a[0] * radians, y06 = a[1] * radians, x12 = b[0] * radians, y12 = b[1] * radians, cy0 = cos2(y06), sy0 = sin2(y06), cy1 = cos2(y12), sy1 = sin2(y12), kx0 = cy0 * cos2(x06), ky0 = cy0 * sin2(x06), kx1 = cy1 * cos2(x12), ky1 = cy1 * sin2(x12), d = 2 * asin(sqrt(haversin(y12 - y06) + cy0 * cy1 * haversin(x12 - x06))), k = sin2(d);
  var interpolate = d ? function(t) {
    var B5 = sin2(t *= d) / k, A7 = sin2(d - t) / k, x2 = A7 * kx0 + B5 * kx1, y2 = A7 * ky0 + B5 * ky1, z = A7 * sy0 + B5 * sy1;
    return [atan2(y2, x2) * degrees2, atan2(z, sqrt(x2 * x2 + y2 * y2)) * degrees2];
  } : function() {
    return [x06 * degrees2, y06 * degrees2];
  };
  interpolate.distance = d;
  return interpolate;
}

// node_modules/d3-geo/src/identity.js
function identity_default7(x2) {
  return x2;
}

// node_modules/d3-geo/src/path/area.js
var areaSum2 = adder_default();
var areaRingSum2 = adder_default();
var x00;
var y00;
var x02;
var y02;
var areaStream2 = {
  point: noop3,
  lineStart: noop3,
  lineEnd: noop3,
  polygonStart: function() {
    areaStream2.lineStart = areaRingStart2;
    areaStream2.lineEnd = areaRingEnd2;
  },
  polygonEnd: function() {
    areaStream2.lineStart = areaStream2.lineEnd = areaStream2.point = noop3;
    areaSum2.add(abs(areaRingSum2));
    areaRingSum2.reset();
  },
  result: function() {
    var area = areaSum2 / 2;
    areaSum2.reset();
    return area;
  }
};
function areaRingStart2() {
  areaStream2.point = areaPointFirst2;
}
function areaPointFirst2(x2, y2) {
  areaStream2.point = areaPoint2;
  x00 = x02 = x2, y00 = y02 = y2;
}
function areaPoint2(x2, y2) {
  areaRingSum2.add(y02 * x2 - x02 * y2);
  x02 = x2, y02 = y2;
}
function areaRingEnd2() {
  areaPoint2(x00, y00);
}
var area_default4 = areaStream2;

// node_modules/d3-geo/src/path/bounds.js
var x03 = Infinity;
var y03 = x03;
var x1 = -x03;
var y1 = x1;
var boundsStream2 = {
  point: boundsPoint2,
  lineStart: noop3,
  lineEnd: noop3,
  polygonStart: noop3,
  polygonEnd: noop3,
  result: function() {
    var bounds = [[x03, y03], [x1, y1]];
    x1 = y1 = -(y03 = x03 = Infinity);
    return bounds;
  }
};
function boundsPoint2(x2, y2) {
  if (x2 < x03) x03 = x2;
  if (x2 > x1) x1 = x2;
  if (y2 < y03) y03 = y2;
  if (y2 > y1) y1 = y2;
}
var bounds_default2 = boundsStream2;

// node_modules/d3-geo/src/path/centroid.js
var X02 = 0;
var Y02 = 0;
var Z02 = 0;
var X12 = 0;
var Y12 = 0;
var Z12 = 0;
var X22 = 0;
var Y22 = 0;
var Z22 = 0;
var x002;
var y002;
var x04;
var y04;
var centroidStream2 = {
  point: centroidPoint2,
  lineStart: centroidLineStart2,
  lineEnd: centroidLineEnd2,
  polygonStart: function() {
    centroidStream2.lineStart = centroidRingStart2;
    centroidStream2.lineEnd = centroidRingEnd2;
  },
  polygonEnd: function() {
    centroidStream2.point = centroidPoint2;
    centroidStream2.lineStart = centroidLineStart2;
    centroidStream2.lineEnd = centroidLineEnd2;
  },
  result: function() {
    var centroid = Z22 ? [X22 / Z22, Y22 / Z22] : Z12 ? [X12 / Z12, Y12 / Z12] : Z02 ? [X02 / Z02, Y02 / Z02] : [NaN, NaN];
    X02 = Y02 = Z02 = X12 = Y12 = Z12 = X22 = Y22 = Z22 = 0;
    return centroid;
  }
};
function centroidPoint2(x2, y2) {
  X02 += x2;
  Y02 += y2;
  ++Z02;
}
function centroidLineStart2() {
  centroidStream2.point = centroidPointFirstLine;
}
function centroidPointFirstLine(x2, y2) {
  centroidStream2.point = centroidPointLine;
  centroidPoint2(x04 = x2, y04 = y2);
}
function centroidPointLine(x2, y2) {
  var dx = x2 - x04, dy = y2 - y04, z = sqrt(dx * dx + dy * dy);
  X12 += z * (x04 + x2) / 2;
  Y12 += z * (y04 + y2) / 2;
  Z12 += z;
  centroidPoint2(x04 = x2, y04 = y2);
}
function centroidLineEnd2() {
  centroidStream2.point = centroidPoint2;
}
function centroidRingStart2() {
  centroidStream2.point = centroidPointFirstRing;
}
function centroidRingEnd2() {
  centroidPointRing(x002, y002);
}
function centroidPointFirstRing(x2, y2) {
  centroidStream2.point = centroidPointRing;
  centroidPoint2(x002 = x04 = x2, y002 = y04 = y2);
}
function centroidPointRing(x2, y2) {
  var dx = x2 - x04, dy = y2 - y04, z = sqrt(dx * dx + dy * dy);
  X12 += z * (x04 + x2) / 2;
  Y12 += z * (y04 + y2) / 2;
  Z12 += z;
  z = y04 * x2 - x04 * y2;
  X22 += z * (x04 + x2);
  Y22 += z * (y04 + y2);
  Z22 += z * 3;
  centroidPoint2(x04 = x2, y04 = y2);
}
var centroid_default2 = centroidStream2;

// node_modules/d3-geo/src/path/context.js
function PathContext(context) {
  this._context = context;
}
PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x2, y2) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x2, y2);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x2, y2);
        break;
      }
      default: {
        this._context.moveTo(x2 + this._radius, y2);
        this._context.arc(x2, y2, this._radius, 0, tau2);
        break;
      }
    }
  },
  result: noop3
};

// node_modules/d3-geo/src/path/measure.js
var lengthSum2 = adder_default();
var lengthRing;
var x003;
var y003;
var x05;
var y05;
var lengthStream2 = {
  point: noop3,
  lineStart: function() {
    lengthStream2.point = lengthPointFirst2;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint2(x003, y003);
    lengthStream2.point = noop3;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length2 = +lengthSum2;
    lengthSum2.reset();
    return length2;
  }
};
function lengthPointFirst2(x2, y2) {
  lengthStream2.point = lengthPoint2;
  x003 = x05 = x2, y003 = y05 = y2;
}
function lengthPoint2(x2, y2) {
  x05 -= x2, y05 -= y2;
  lengthSum2.add(sqrt(x05 * x05 + y05 * y05));
  x05 = x2, y05 = y2;
}
var measure_default = lengthStream2;

// node_modules/d3-geo/src/path/string.js
function PathString() {
  this._string = [];
}
PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x2, y2) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x2, ",", y2);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x2, ",", y2);
        break;
      }
      default: {
        if (this._circle == null) this._circle = circle(this._radius);
        this._string.push("M", x2, ",", y2, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};
function circle(radius) {
  return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
}

// node_modules/d3-geo/src/path/index.js
function path_default2(projection2, context) {
  var pointRadius = 4.5, projectionStream, contextStream;
  function path(object2) {
    if (object2) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      stream_default(object2, projectionStream(contextStream));
    }
    return contextStream.result();
  }
  path.area = function(object2) {
    stream_default(object2, projectionStream(area_default4));
    return area_default4.result();
  };
  path.measure = function(object2) {
    stream_default(object2, projectionStream(measure_default));
    return measure_default.result();
  };
  path.bounds = function(object2) {
    stream_default(object2, projectionStream(bounds_default2));
    return bounds_default2.result();
  };
  path.centroid = function(object2) {
    stream_default(object2, projectionStream(centroid_default2));
    return centroid_default2.result();
  };
  path.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection2 = null, identity_default7) : (projection2 = _).stream, path) : projection2;
  };
  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString()) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };
  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };
  return path.projection(projection2).context(context);
}

// node_modules/d3-geo/src/transform.js
function transform_default(methods) {
  return {
    stream: transformer(methods)
  };
}
function transformer(methods) {
  return function(stream) {
    var s = new TransformStream();
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}
function TransformStream() {
}
TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x2, y2) {
    this.stream.point(x2, y2);
  },
  sphere: function() {
    this.stream.sphere();
  },
  lineStart: function() {
    this.stream.lineStart();
  },
  lineEnd: function() {
    this.stream.lineEnd();
  },
  polygonStart: function() {
    this.stream.polygonStart();
  },
  polygonEnd: function() {
    this.stream.polygonEnd();
  }
};

// node_modules/d3-geo/src/projection/fit.js
function fit(projection2, fitBounds, object2) {
  var clip = projection2.clipExtent && projection2.clipExtent();
  projection2.scale(150).translate([0, 0]);
  if (clip != null) projection2.clipExtent(null);
  stream_default(object2, projection2.stream(bounds_default2));
  fitBounds(bounds_default2.result());
  if (clip != null) projection2.clipExtent(clip);
  return projection2;
}
function fitExtent(projection2, extent, object2) {
  return fit(projection2, function(b) {
    var w = extent[1][0] - extent[0][0], h = extent[1][1] - extent[0][1], k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])), x2 = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2, y2 = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection2.scale(150 * k).translate([x2, y2]);
  }, object2);
}
function fitSize(projection2, size, object2) {
  return fitExtent(projection2, [[0, 0], size], object2);
}
function fitWidth(projection2, width, object2) {
  return fit(projection2, function(b) {
    var w = +width, k = w / (b[1][0] - b[0][0]), x2 = (w - k * (b[1][0] + b[0][0])) / 2, y2 = -k * b[0][1];
    projection2.scale(150 * k).translate([x2, y2]);
  }, object2);
}
function fitHeight(projection2, height, object2) {
  return fit(projection2, function(b) {
    var h = +height, k = h / (b[1][1] - b[0][1]), x2 = -k * b[0][0], y2 = (h - k * (b[1][1] + b[0][1])) / 2;
    projection2.scale(150 * k).translate([x2, y2]);
  }, object2);
}

// node_modules/d3-geo/src/projection/resample.js
var maxDepth = 16;
var cosMinDistance = cos2(30 * radians);
function resample_default(project, delta2) {
  return +delta2 ? resample(project, delta2) : resampleNone(project);
}
function resampleNone(project) {
  return transformer({
    point: function(x2, y2) {
      x2 = project(x2, y2);
      this.stream.point(x2[0], x2[1]);
    }
  });
}
function resample(project, delta2) {
  function resampleLineTo(x06, y06, lambda04, a0, b0, c0, x12, y12, lambda12, a1, b1, c1, depth, stream) {
    var dx = x12 - x06, dy = y12 - y06, d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1, b = b0 + b1, c3 = c0 + c1, m = sqrt(a * a + b * b + c3 * c3), phi2 = asin(c3 /= m), lambda22 = abs(abs(c3) - 1) < epsilon2 || abs(lambda04 - lambda12) < epsilon2 ? (lambda04 + lambda12) / 2 : atan2(b, a), p = project(lambda22, phi2), x2 = p[0], y2 = p[1], dx2 = x2 - x06, dy2 = y2 - y06, dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
        resampleLineTo(x06, y06, lambda04, a0, b0, c0, x2, y2, lambda22, a /= m, b /= m, c3, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda22, a, b, c3, x12, y12, lambda12, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda004, x004, y004, a00, b00, c00, lambda04, x06, y06, a0, b0, c0;
    var resampleStream = {
      point: point2,
      lineStart,
      lineEnd,
      polygonStart: function() {
        stream.polygonStart();
        resampleStream.lineStart = ringStart;
      },
      polygonEnd: function() {
        stream.polygonEnd();
        resampleStream.lineStart = lineStart;
      }
    };
    function point2(x2, y2) {
      x2 = project(x2, y2);
      stream.point(x2[0], x2[1]);
    }
    function lineStart() {
      x06 = NaN;
      resampleStream.point = linePoint2;
      stream.lineStart();
    }
    function linePoint2(lambda, phi2) {
      var c3 = cartesian([lambda, phi2]), p = project(lambda, phi2);
      resampleLineTo(x06, y06, lambda04, a0, b0, c0, x06 = p[0], y06 = p[1], lambda04 = lambda, a0 = c3[0], b0 = c3[1], c0 = c3[2], maxDepth, stream);
      stream.point(x06, y06);
    }
    function lineEnd() {
      resampleStream.point = point2;
      stream.lineEnd();
    }
    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }
    function ringPoint(lambda, phi2) {
      linePoint2(lambda004 = lambda, phi2), x004 = x06, y004 = y06, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint2;
    }
    function ringEnd() {
      resampleLineTo(x06, y06, lambda04, a0, b0, c0, x004, y004, lambda004, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }
    return resampleStream;
  };
}

// node_modules/d3-geo/src/projection/index.js
var transformRadians = transformer({
  point: function(x2, y2) {
    this.stream.point(x2 * radians, y2 * radians);
  }
});
function transformRotate(rotate) {
  return transformer({
    point: function(x2, y2) {
      var r = rotate(x2, y2);
      return this.stream.point(r[0], r[1]);
    }
  });
}
function scaleTranslate(k, dx, dy, sx, sy) {
  function transform2(x2, y2) {
    x2 *= sx;
    y2 *= sy;
    return [dx + k * x2, dy - k * y2];
  }
  transform2.invert = function(x2, y2) {
    return [(x2 - dx) / k * sx, (dy - y2) / k * sy];
  };
  return transform2;
}
function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
  var cosAlpha = cos2(alpha), sinAlpha = sin2(alpha), a = cosAlpha * k, b = sinAlpha * k, ai = cosAlpha / k, bi = sinAlpha / k, ci = (sinAlpha * dy - cosAlpha * dx) / k, fi = (sinAlpha * dx + cosAlpha * dy) / k;
  function transform2(x2, y2) {
    x2 *= sx;
    y2 *= sy;
    return [a * x2 - b * y2 + dx, dy - b * x2 - a * y2];
  }
  transform2.invert = function(x2, y2) {
    return [sx * (ai * x2 - bi * y2 + ci), sy * (fi - bi * x2 - ai * y2)];
  };
  return transform2;
}
function projection(project) {
  return projectionMutator(function() {
    return project;
  })();
}
function projectionMutator(projectAt) {
  var project, k = 150, x2 = 480, y2 = 250, lambda = 0, phi2 = 0, deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, alpha = 0, sx = 1, sy = 1, theta = null, preclip = antimeridian_default, x06 = null, y06, x12, y12, postclip = identity_default7, delta2 = 0.5, projectResample, projectTransform, projectRotateTransform, cache, cacheStream;
  function projection2(point2) {
    return projectRotateTransform(point2[0] * radians, point2[1] * radians);
  }
  function invert(point2) {
    point2 = projectRotateTransform.invert(point2[0], point2[1]);
    return point2 && [point2[0] * degrees2, point2[1] * degrees2];
  }
  projection2.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };
  projection2.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = void 0, reset()) : preclip;
  };
  projection2.postclip = function(_) {
    return arguments.length ? (postclip = _, x06 = y06 = x12 = y12 = null, reset()) : postclip;
  };
  projection2.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? circle_default3(theta = _ * radians) : (theta = null, antimeridian_default), reset()) : theta * degrees2;
  };
  projection2.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x06 = y06 = x12 = y12 = null, identity_default7) : clipRectangle(x06 = +_[0][0], y06 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reset()) : x06 == null ? null : [[x06, y06], [x12, y12]];
  };
  projection2.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };
  projection2.translate = function(_) {
    return arguments.length ? (x2 = +_[0], y2 = +_[1], recenter()) : [x2, y2];
  };
  projection2.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians, phi2 = _[1] % 360 * radians, recenter()) : [lambda * degrees2, phi2 * degrees2];
  };
  projection2.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees2, deltaPhi * degrees2, deltaGamma * degrees2];
  };
  projection2.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * radians, recenter()) : alpha * degrees2;
  };
  projection2.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  };
  projection2.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  };
  projection2.precision = function(_) {
    return arguments.length ? (projectResample = resample_default(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
  };
  projection2.fitExtent = function(extent, object2) {
    return fitExtent(projection2, extent, object2);
  };
  projection2.fitSize = function(size, object2) {
    return fitSize(projection2, size, object2);
  };
  projection2.fitWidth = function(width, object2) {
    return fitWidth(projection2, width, object2);
  };
  projection2.fitHeight = function(height, object2) {
    return fitHeight(projection2, height, object2);
  };
  function recenter() {
    var center2 = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi2)), transform2 = (alpha ? scaleTranslateRotate : scaleTranslate)(k, x2 - center2[0], y2 - center2[1], sx, sy, alpha);
    rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = compose_default(project, transform2);
    projectRotateTransform = compose_default(rotate, projectTransform);
    projectResample = resample_default(projectTransform, delta2);
    return reset();
  }
  function reset() {
    cache = cacheStream = null;
    return projection2;
  }
  return function() {
    project = projectAt.apply(this, arguments);
    projection2.invert = project.invert && invert;
    return recenter();
  };
}

// node_modules/d3-geo/src/projection/conic.js
function conicProjection(projectAt) {
  var phi02 = 0, phi12 = pi2 / 3, m = projectionMutator(projectAt), p = m(phi02, phi12);
  p.parallels = function(_) {
    return arguments.length ? m(phi02 = _[0] * radians, phi12 = _[1] * radians) : [phi02 * degrees2, phi12 * degrees2];
  };
  return p;
}

// node_modules/d3-geo/src/projection/cylindricalEqualArea.js
function cylindricalEqualAreaRaw(phi02) {
  var cosPhi03 = cos2(phi02);
  function forward(lambda, phi2) {
    return [lambda * cosPhi03, sin2(phi2) / cosPhi03];
  }
  forward.invert = function(x2, y2) {
    return [x2 / cosPhi03, asin(y2 * cosPhi03)];
  };
  return forward;
}

// node_modules/d3-geo/src/projection/conicEqualArea.js
function conicEqualAreaRaw(y06, y12) {
  var sy0 = sin2(y06), n = (sy0 + sin2(y12)) / 2;
  if (abs(n) < epsilon2) return cylindricalEqualAreaRaw(y06);
  var c3 = 1 + sy0 * (2 * n - sy0), r0 = sqrt(c3) / n;
  function project(x2, y2) {
    var r = sqrt(c3 - 2 * n * sin2(y2)) / n;
    return [r * sin2(x2 *= n), r0 - r * cos2(x2)];
  }
  project.invert = function(x2, y2) {
    var r0y = r0 - y2, l = atan2(x2, abs(r0y)) * sign(r0y);
    if (r0y * n < 0) l -= pi2 * sign(x2) * sign(r0y);
    return [l / n, asin((c3 - (x2 * x2 + r0y * r0y) * n * n) / (2 * n))];
  };
  return project;
}
function conicEqualArea_default() {
  return conicProjection(conicEqualAreaRaw).scale(155.424).center([0, 33.6442]);
}

// node_modules/d3-geo/src/projection/albers.js
function albers_default() {
  return conicEqualArea_default().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-0.6, 38.7]);
}

// node_modules/d3-geo/src/projection/albersUsa.js
function multiplex(streams) {
  var n = streams.length;
  return {
    point: function(x2, y2) {
      var i = -1;
      while (++i < n) streams[i].point(x2, y2);
    },
    sphere: function() {
      var i = -1;
      while (++i < n) streams[i].sphere();
    },
    lineStart: function() {
      var i = -1;
      while (++i < n) streams[i].lineStart();
    },
    lineEnd: function() {
      var i = -1;
      while (++i < n) streams[i].lineEnd();
    },
    polygonStart: function() {
      var i = -1;
      while (++i < n) streams[i].polygonStart();
    },
    polygonEnd: function() {
      var i = -1;
      while (++i < n) streams[i].polygonEnd();
    }
  };
}
function albersUsa_default() {
  var cache, cacheStream, lower48 = albers_default(), lower48Point, alaska = conicEqualArea_default().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, hawaii = conicEqualArea_default().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, point2, pointStream = {
    point: function(x2, y2) {
      point2 = [x2, y2];
    }
  };
  function albersUsa(coordinates2) {
    var x2 = coordinates2[0], y2 = coordinates2[1];
    return point2 = null, (lower48Point.point(x2, y2), point2) || (alaskaPoint.point(x2, y2), point2) || (hawaiiPoint.point(x2, y2), point2);
  }
  albersUsa.invert = function(coordinates2) {
    var k = lower48.scale(), t = lower48.translate(), x2 = (coordinates2[0] - t[0]) / k, y2 = (coordinates2[1] - t[1]) / k;
    return (y2 >= 0.12 && y2 < 0.234 && x2 >= -0.425 && x2 < -0.214 ? alaska : y2 >= 0.166 && y2 < 0.234 && x2 >= -0.214 && x2 < -0.115 ? hawaii : lower48).invert(coordinates2);
  };
  albersUsa.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
  };
  albersUsa.precision = function(_) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_), alaska.precision(_), hawaii.precision(_);
    return reset();
  };
  albersUsa.scale = function(_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
    return albersUsa.translate(lower48.translate());
  };
  albersUsa.translate = function(_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(), x2 = +_[0], y2 = +_[1];
    lower48Point = lower48.translate(_).clipExtent([[x2 - 0.455 * k, y2 - 0.238 * k], [x2 + 0.455 * k, y2 + 0.238 * k]]).stream(pointStream);
    alaskaPoint = alaska.translate([x2 - 0.307 * k, y2 + 0.201 * k]).clipExtent([[x2 - 0.425 * k + epsilon2, y2 + 0.12 * k + epsilon2], [x2 - 0.214 * k - epsilon2, y2 + 0.234 * k - epsilon2]]).stream(pointStream);
    hawaiiPoint = hawaii.translate([x2 - 0.205 * k, y2 + 0.212 * k]).clipExtent([[x2 - 0.214 * k + epsilon2, y2 + 0.166 * k + epsilon2], [x2 - 0.115 * k - epsilon2, y2 + 0.234 * k - epsilon2]]).stream(pointStream);
    return reset();
  };
  albersUsa.fitExtent = function(extent, object2) {
    return fitExtent(albersUsa, extent, object2);
  };
  albersUsa.fitSize = function(size, object2) {
    return fitSize(albersUsa, size, object2);
  };
  albersUsa.fitWidth = function(width, object2) {
    return fitWidth(albersUsa, width, object2);
  };
  albersUsa.fitHeight = function(height, object2) {
    return fitHeight(albersUsa, height, object2);
  };
  function reset() {
    cache = cacheStream = null;
    return albersUsa;
  }
  return albersUsa.scale(1070);
}

// node_modules/d3-geo/src/projection/azimuthal.js
function azimuthalRaw(scale) {
  return function(x2, y2) {
    var cx = cos2(x2), cy = cos2(y2), k = scale(cx * cy);
    return [k * cy * sin2(x2), k * sin2(y2)];
  };
}
function azimuthalInvert(angle2) {
  return function(x2, y2) {
    var z = sqrt(x2 * x2 + y2 * y2), c3 = angle2(z), sc = sin2(c3), cc = cos2(c3);
    return [atan2(x2 * sc, z * cc), asin(z && y2 * sc / z)];
  };
}

// node_modules/d3-geo/src/projection/azimuthalEqualArea.js
var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
  return sqrt(2 / (1 + cxcy));
});
azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
  return 2 * asin(z / 2);
});
function azimuthalEqualArea_default() {
  return projection(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
}

// node_modules/d3-geo/src/projection/azimuthalEquidistant.js
var azimuthalEquidistantRaw = azimuthalRaw(function(c3) {
  return (c3 = acos(c3)) && c3 / sin2(c3);
});
azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
  return z;
});
function azimuthalEquidistant_default() {
  return projection(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
}

// node_modules/d3-geo/src/projection/mercator.js
function mercatorRaw(lambda, phi2) {
  return [lambda, log(tan((halfPi2 + phi2) / 2))];
}
mercatorRaw.invert = function(x2, y2) {
  return [x2, 2 * atan(exp(y2)) - halfPi2];
};
function mercator_default() {
  return mercatorProjection(mercatorRaw).scale(961 / tau2);
}
function mercatorProjection(project) {
  var m = projection(project), center2 = m.center, scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, x06 = null, y06, x12, y12;
  m.scale = function(_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };
  m.translate = function(_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };
  m.center = function(_) {
    return arguments.length ? (center2(_), reclip()) : center2();
  };
  m.clipExtent = function(_) {
    return arguments.length ? (_ == null ? x06 = y06 = x12 = y12 = null : (x06 = +_[0][0], y06 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reclip()) : x06 == null ? null : [[x06, y06], [x12, y12]];
  };
  function reclip() {
    var k = pi2 * scale(), t = m(rotation_default(m.rotate()).invert([0, 0]));
    return clipExtent(x06 == null ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw ? [[Math.max(t[0] - k, x06), y06], [Math.min(t[0] + k, x12), y12]] : [[x06, Math.max(t[1] - k, y06)], [x12, Math.min(t[1] + k, y12)]]);
  }
  return reclip();
}

// node_modules/d3-geo/src/projection/conicConformal.js
function tany(y2) {
  return tan((halfPi2 + y2) / 2);
}
function conicConformalRaw(y06, y12) {
  var cy0 = cos2(y06), n = y06 === y12 ? sin2(y06) : log(cy0 / cos2(y12)) / log(tany(y12) / tany(y06)), f = cy0 * pow(tany(y06), n) / n;
  if (!n) return mercatorRaw;
  function project(x2, y2) {
    if (f > 0) {
      if (y2 < -halfPi2 + epsilon2) y2 = -halfPi2 + epsilon2;
    } else {
      if (y2 > halfPi2 - epsilon2) y2 = halfPi2 - epsilon2;
    }
    var r = f / pow(tany(y2), n);
    return [r * sin2(n * x2), f - r * cos2(n * x2)];
  }
  project.invert = function(x2, y2) {
    var fy = f - y2, r = sign(n) * sqrt(x2 * x2 + fy * fy), l = atan2(x2, abs(fy)) * sign(fy);
    if (fy * n < 0) l -= pi2 * sign(x2) * sign(fy);
    return [l / n, 2 * atan(pow(f / r, 1 / n)) - halfPi2];
  };
  return project;
}
function conicConformal_default() {
  return conicProjection(conicConformalRaw).scale(109.5).parallels([30, 30]);
}

// node_modules/d3-geo/src/projection/equirectangular.js
function equirectangularRaw(lambda, phi2) {
  return [lambda, phi2];
}
equirectangularRaw.invert = equirectangularRaw;
function equirectangular_default() {
  return projection(equirectangularRaw).scale(152.63);
}

// node_modules/d3-geo/src/projection/conicEquidistant.js
function conicEquidistantRaw(y06, y12) {
  var cy0 = cos2(y06), n = y06 === y12 ? sin2(y06) : (cy0 - cos2(y12)) / (y12 - y06), g = cy0 / n + y06;
  if (abs(n) < epsilon2) return equirectangularRaw;
  function project(x2, y2) {
    var gy = g - y2, nx = n * x2;
    return [gy * sin2(nx), g - gy * cos2(nx)];
  }
  project.invert = function(x2, y2) {
    var gy = g - y2, l = atan2(x2, abs(gy)) * sign(gy);
    if (gy * n < 0) l -= pi2 * sign(x2) * sign(gy);
    return [l / n, g - sign(n) * sqrt(x2 * x2 + gy * gy)];
  };
  return project;
}
function conicEquidistant_default() {
  return conicProjection(conicEquidistantRaw).scale(131.154).center([0, 13.9389]);
}

// node_modules/d3-geo/src/projection/equalEarth.js
var A1 = 1.340264;
var A22 = -0.081106;
var A3 = 893e-6;
var A4 = 3796e-6;
var M = sqrt(3) / 2;
var iterations = 12;
function equalEarthRaw(lambda, phi2) {
  var l = asin(M * sin2(phi2)), l2 = l * l, l6 = l2 * l2 * l2;
  return [lambda * cos2(l) / (M * (A1 + 3 * A22 * l2 + l6 * (7 * A3 + 9 * A4 * l2))), l * (A1 + A22 * l2 + l6 * (A3 + A4 * l2))];
}
equalEarthRaw.invert = function(x2, y2) {
  var l = y2, l2 = l * l, l6 = l2 * l2 * l2;
  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A22 * l2 + l6 * (A3 + A4 * l2)) - y2;
    fpy = A1 + 3 * A22 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if (abs(delta) < epsilon22) break;
  }
  return [M * x2 * (A1 + 3 * A22 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos2(l), asin(sin2(l) / M)];
};
function equalEarth_default() {
  return projection(equalEarthRaw).scale(177.158);
}

// node_modules/d3-geo/src/projection/gnomonic.js
function gnomonicRaw(x2, y2) {
  var cy = cos2(y2), k = cos2(x2) * cy;
  return [cy * sin2(x2) / k, sin2(y2) / k];
}
gnomonicRaw.invert = azimuthalInvert(atan);
function gnomonic_default() {
  return projection(gnomonicRaw).scale(144.049).clipAngle(60);
}

// node_modules/d3-geo/src/projection/identity.js
function identity_default8() {
  var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, alpha = 0, ca, sa, x06 = null, y06, x12, y12, kx = 1, ky = 1, transform2 = transformer({
    point: function(x2, y2) {
      var p = projection2([x2, y2]);
      this.stream.point(p[0], p[1]);
    }
  }), postclip = identity_default7, cache, cacheStream;
  function reset() {
    kx = k * sx;
    ky = k * sy;
    cache = cacheStream = null;
    return projection2;
  }
  function projection2(p) {
    var x2 = p[0] * kx, y2 = p[1] * ky;
    if (alpha) {
      var t = y2 * ca - x2 * sa;
      x2 = x2 * ca + y2 * sa;
      y2 = t;
    }
    return [x2 + tx, y2 + ty];
  }
  projection2.invert = function(p) {
    var x2 = p[0] - tx, y2 = p[1] - ty;
    if (alpha) {
      var t = y2 * ca + x2 * sa;
      x2 = x2 * ca - y2 * sa;
      y2 = t;
    }
    return [x2 / kx, y2 / ky];
  };
  projection2.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transform2(postclip(cacheStream = stream));
  };
  projection2.postclip = function(_) {
    return arguments.length ? (postclip = _, x06 = y06 = x12 = y12 = null, reset()) : postclip;
  };
  projection2.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x06 = y06 = x12 = y12 = null, identity_default7) : clipRectangle(x06 = +_[0][0], y06 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reset()) : x06 == null ? null : [[x06, y06], [x12, y12]];
  };
  projection2.scale = function(_) {
    return arguments.length ? (k = +_, reset()) : k;
  };
  projection2.translate = function(_) {
    return arguments.length ? (tx = +_[0], ty = +_[1], reset()) : [tx, ty];
  };
  projection2.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * radians, sa = sin2(alpha), ca = cos2(alpha), reset()) : alpha * degrees2;
  };
  projection2.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, reset()) : sx < 0;
  };
  projection2.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, reset()) : sy < 0;
  };
  projection2.fitExtent = function(extent, object2) {
    return fitExtent(projection2, extent, object2);
  };
  projection2.fitSize = function(size, object2) {
    return fitSize(projection2, size, object2);
  };
  projection2.fitWidth = function(width, object2) {
    return fitWidth(projection2, width, object2);
  };
  projection2.fitHeight = function(height, object2) {
    return fitHeight(projection2, height, object2);
  };
  return projection2;
}

// node_modules/d3-geo/src/projection/naturalEarth1.js
function naturalEarth1Raw(lambda, phi2) {
  var phi22 = phi2 * phi2, phi4 = phi22 * phi22;
  return [lambda * (0.8707 - 0.131979 * phi22 + phi4 * (-0.013791 + phi4 * (3971e-6 * phi22 - 1529e-6 * phi4))), phi2 * (1.007226 + phi22 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi22 - 5916e-6 * phi4)))];
}
naturalEarth1Raw.invert = function(x2, y2) {
  var phi2 = y2, i = 25, delta;
  do {
    var phi22 = phi2 * phi2, phi4 = phi22 * phi22;
    phi2 -= delta = (phi2 * (1.007226 + phi22 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi22 - 5916e-6 * phi4))) - y2) / (1.007226 + phi22 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi22 - 5916e-6 * 11 * phi4)));
  } while (abs(delta) > epsilon2 && --i > 0);
  return [x2 / (0.8707 + (phi22 = phi2 * phi2) * (-0.131979 + phi22 * (-0.013791 + phi22 * phi22 * phi22 * (3971e-6 - 1529e-6 * phi22)))), phi2];
};
function naturalEarth1_default() {
  return projection(naturalEarth1Raw).scale(175.295);
}

// node_modules/d3-geo/src/projection/orthographic.js
function orthographicRaw(x2, y2) {
  return [cos2(y2) * sin2(x2), sin2(y2)];
}
orthographicRaw.invert = azimuthalInvert(asin);
function orthographic_default() {
  return projection(orthographicRaw).scale(249.5).clipAngle(90 + epsilon2);
}

// node_modules/d3-geo/src/projection/stereographic.js
function stereographicRaw(x2, y2) {
  var cy = cos2(y2), k = 1 + cos2(x2) * cy;
  return [cy * sin2(x2) / k, sin2(y2) / k];
}
stereographicRaw.invert = azimuthalInvert(function(z) {
  return 2 * atan(z);
});
function stereographic_default() {
  return projection(stereographicRaw).scale(250).clipAngle(142);
}

// node_modules/d3-geo/src/projection/transverseMercator.js
function transverseMercatorRaw(lambda, phi2) {
  return [log(tan((halfPi2 + phi2) / 2)), -lambda];
}
transverseMercatorRaw.invert = function(x2, y2) {
  return [-y2, 2 * atan(exp(x2)) - halfPi2];
};
function transverseMercator_default() {
  var m = mercatorProjection(transverseMercatorRaw), center2 = m.center, rotate = m.rotate;
  m.center = function(_) {
    return arguments.length ? center2([-_[1], _[0]]) : (_ = center2(), [_[1], -_[0]]);
  };
  m.rotate = function(_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };
  return rotate([0, 0, 90]).scale(159.155);
}

// node_modules/d3-hierarchy/src/cluster.js
function defaultSeparation(a, b) {
  return a.parent === b.parent ? 1 : 2;
}
function meanX(children) {
  return children.reduce(meanXReduce, 0) / children.length;
}
function meanXReduce(x2, c3) {
  return x2 + c3.x;
}
function maxY(children) {
  return 1 + children.reduce(maxYReduce, 0);
}
function maxYReduce(y2, c3) {
  return Math.max(y2, c3.y);
}
function leafLeft(node) {
  var children;
  while (children = node.children) node = children[0];
  return node;
}
function leafRight(node) {
  var children;
  while (children = node.children) node = children[children.length - 1];
  return node;
}
function cluster_default() {
  var separation = defaultSeparation, dx = 1, dy = 1, nodeSize = false;
  function cluster(root5) {
    var previousNode, x2 = 0;
    root5.eachAfter(function(node) {
      var children = node.children;
      if (children) {
        node.x = meanX(children);
        node.y = maxY(children);
      } else {
        node.x = previousNode ? x2 += separation(node, previousNode) : 0;
        node.y = 0;
        previousNode = node;
      }
    });
    var left2 = leafLeft(root5), right2 = leafRight(root5), x06 = left2.x - separation(left2, right2) / 2, x12 = right2.x + separation(right2, left2) / 2;
    return root5.eachAfter(nodeSize ? function(node) {
      node.x = (node.x - root5.x) * dx;
      node.y = (root5.y - node.y) * dy;
    } : function(node) {
      node.x = (node.x - x06) / (x12 - x06) * dx;
      node.y = (1 - (root5.y ? node.y / root5.y : 1)) * dy;
    });
  }
  cluster.separation = function(x2) {
    return arguments.length ? (separation = x2, cluster) : separation;
  };
  cluster.size = function(x2) {
    return arguments.length ? (nodeSize = false, dx = +x2[0], dy = +x2[1], cluster) : nodeSize ? null : [dx, dy];
  };
  cluster.nodeSize = function(x2) {
    return arguments.length ? (nodeSize = true, dx = +x2[0], dy = +x2[1], cluster) : nodeSize ? [dx, dy] : null;
  };
  return cluster;
}

// node_modules/d3-hierarchy/src/hierarchy/count.js
function count(node) {
  var sum2 = 0, children = node.children, i = children && children.length;
  if (!i) sum2 = 1;
  else while (--i >= 0) sum2 += children[i].value;
  node.value = sum2;
}
function count_default() {
  return this.eachAfter(count);
}

// node_modules/d3-hierarchy/src/hierarchy/each.js
function each_default3(callback) {
  var node = this, current, next = [node], children, i, n;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      callback(node), children = node.children;
      if (children) for (i = 0, n = children.length; i < n; ++i) {
        next.push(children[i]);
      }
    }
  } while (next.length);
  return this;
}

// node_modules/d3-hierarchy/src/hierarchy/eachBefore.js
function eachBefore_default(callback) {
  var node = this, nodes = [node], children, i;
  while (node = nodes.pop()) {
    callback(node), children = node.children;
    if (children) for (i = children.length - 1; i >= 0; --i) {
      nodes.push(children[i]);
    }
  }
  return this;
}

// node_modules/d3-hierarchy/src/hierarchy/eachAfter.js
function eachAfter_default(callback) {
  var node = this, nodes = [node], next = [], children, i, n;
  while (node = nodes.pop()) {
    next.push(node), children = node.children;
    if (children) for (i = 0, n = children.length; i < n; ++i) {
      nodes.push(children[i]);
    }
  }
  while (node = next.pop()) {
    callback(node);
  }
  return this;
}

// node_modules/d3-hierarchy/src/hierarchy/sum.js
function sum_default5(value) {
  return this.eachAfter(function(node) {
    var sum2 = +value(node.data) || 0, children = node.children, i = children && children.length;
    while (--i >= 0) sum2 += children[i].value;
    node.value = sum2;
  });
}

// node_modules/d3-hierarchy/src/hierarchy/sort.js
function sort_default3(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
}

// node_modules/d3-hierarchy/src/hierarchy/path.js
function path_default3(end) {
  var start4 = this, ancestor = leastCommonAncestor(start4, end), nodes = [start4];
  while (start4 !== ancestor) {
    start4 = start4.parent;
    nodes.push(start4);
  }
  var k = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k, 0, end);
    end = end.parent;
  }
  return nodes;
}
function leastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = a.ancestors(), bNodes = b.ancestors(), c3 = null;
  a = aNodes.pop();
  b = bNodes.pop();
  while (a === b) {
    c3 = a;
    a = aNodes.pop();
    b = bNodes.pop();
  }
  return c3;
}

// node_modules/d3-hierarchy/src/hierarchy/ancestors.js
function ancestors_default() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
}

// node_modules/d3-hierarchy/src/hierarchy/descendants.js
function descendants_default() {
  var nodes = [];
  this.each(function(node) {
    nodes.push(node);
  });
  return nodes;
}

// node_modules/d3-hierarchy/src/hierarchy/leaves.js
function leaves_default() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}

// node_modules/d3-hierarchy/src/hierarchy/links.js
function links_default() {
  var root5 = this, links = [];
  root5.each(function(node) {
    if (node !== root5) {
      links.push({
        source: node.parent,
        target: node
      });
    }
  });
  return links;
}

// node_modules/d3-hierarchy/src/hierarchy/index.js
function hierarchy(data, children) {
  var root5 = new Node(data), valued = +data.value && (root5.value = data.value), node, nodes = [root5], child, childs, i, n;
  if (children == null) children = defaultChildren;
  while (node = nodes.pop()) {
    if (valued) node.value = +node.data.value;
    if ((childs = children(node.data)) && (n = childs.length)) {
      node.children = new Array(n);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new Node(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }
  return root5.eachBefore(computeHeight);
}
function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}
function defaultChildren(d) {
  return d.children;
}
function copyData(node) {
  node.data = node.data.data;
}
function computeHeight(node) {
  var height = 0;
  do
    node.height = height;
  while ((node = node.parent) && node.height < ++height);
}
function Node(data) {
  this.data = data;
  this.depth = this.height = 0;
  this.parent = null;
}
Node.prototype = hierarchy.prototype = {
  constructor: Node,
  count: count_default,
  each: each_default3,
  eachAfter: eachAfter_default,
  eachBefore: eachBefore_default,
  sum: sum_default5,
  sort: sort_default3,
  path: path_default3,
  ancestors: ancestors_default,
  descendants: descendants_default,
  leaves: leaves_default,
  links: links_default,
  copy: node_copy
};

// node_modules/d3-hierarchy/src/array.js
var slice8 = Array.prototype.slice;
function shuffle(array7) {
  var m = array7.length, t, i;
  while (m) {
    i = Math.random() * m-- | 0;
    t = array7[m];
    array7[m] = array7[i];
    array7[i] = t;
  }
  return array7;
}

// node_modules/d3-hierarchy/src/pack/enclose.js
function enclose_default(circles2) {
  var i = 0, n = (circles2 = shuffle(slice8.call(circles2))).length, B5 = [], p, e;
  while (i < n) {
    p = circles2[i];
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B5 = extendBasis(B5, p)), i = 0;
  }
  return e;
}
function extendBasis(B5, p) {
  var i, j;
  if (enclosesWeakAll(p, B5)) return [p];
  for (i = 0; i < B5.length; ++i) {
    if (enclosesNot(p, B5[i]) && enclosesWeakAll(encloseBasis2(B5[i], p), B5)) {
      return [B5[i], p];
    }
  }
  for (i = 0; i < B5.length - 1; ++i) {
    for (j = i + 1; j < B5.length; ++j) {
      if (enclosesNot(encloseBasis2(B5[i], B5[j]), p) && enclosesNot(encloseBasis2(B5[i], p), B5[j]) && enclosesNot(encloseBasis2(B5[j], p), B5[i]) && enclosesWeakAll(encloseBasis3(B5[i], B5[j], p), B5)) {
        return [B5[i], B5[j], p];
      }
    }
  }
  throw new Error();
}
function enclosesNot(a, b) {
  var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}
function enclosesWeak(a, b) {
  var dr = a.r - b.r + 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}
function enclosesWeakAll(a, B5) {
  for (var i = 0; i < B5.length; ++i) {
    if (!enclosesWeak(a, B5[i])) {
      return false;
    }
  }
  return true;
}
function encloseBasis(B5) {
  switch (B5.length) {
    case 1:
      return encloseBasis1(B5[0]);
    case 2:
      return encloseBasis2(B5[0], B5[1]);
    case 3:
      return encloseBasis3(B5[0], B5[1], B5[2]);
  }
}
function encloseBasis1(a) {
  return {
    x: a.x,
    y: a.y,
    r: a.r
  };
}
function encloseBasis2(a, b) {
  var x12 = a.x, y12 = a.y, r1 = a.r, x2 = b.x, y2 = b.y, r2 = b.r, x21 = x2 - x12, y21 = y2 - y12, r21 = r2 - r1, l = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x12 + x2 + x21 / l * r21) / 2,
    y: (y12 + y2 + y21 / l * r21) / 2,
    r: (l + r1 + r2) / 2
  };
}
function encloseBasis3(a, b, c3) {
  var x12 = a.x, y12 = a.y, r1 = a.r, x2 = b.x, y2 = b.y, r2 = b.r, x3 = c3.x, y3 = c3.y, r3 = c3.r, a2 = x12 - x2, a3 = x12 - x3, b2 = y12 - y2, b3 = y12 - y3, c22 = r2 - r1, c32 = r3 - r1, d1 = x12 * x12 + y12 * y12 - r1 * r1, d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2, d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3, ab = a3 * b2 - a2 * b3, xa = (b2 * d3 - b3 * d2) / (ab * 2) - x12, xb = (b3 * c22 - b2 * c32) / ab, ya = (a3 * d2 - a2 * d3) / (ab * 2) - y12, yb = (a2 * c32 - a3 * c22) / ab, A7 = xb * xb + yb * yb - 1, B5 = 2 * (r1 + xa * xb + ya * yb), C5 = xa * xa + ya * ya - r1 * r1, r = -(A7 ? (B5 + Math.sqrt(B5 * B5 - 4 * A7 * C5)) / (2 * A7) : C5 / B5);
  return {
    x: x12 + xa + xb * r,
    y: y12 + ya + yb * r,
    r
  };
}

// node_modules/d3-hierarchy/src/pack/siblings.js
function place(b, a, c3) {
  var dx = b.x - a.x, x2, a2, dy = b.y - a.y, y2, b2, d2 = dx * dx + dy * dy;
  if (d2) {
    a2 = a.r + c3.r, a2 *= a2;
    b2 = b.r + c3.r, b2 *= b2;
    if (a2 > b2) {
      x2 = (d2 + b2 - a2) / (2 * d2);
      y2 = Math.sqrt(Math.max(0, b2 / d2 - x2 * x2));
      c3.x = b.x - x2 * dx - y2 * dy;
      c3.y = b.y - x2 * dy + y2 * dx;
    } else {
      x2 = (d2 + a2 - b2) / (2 * d2);
      y2 = Math.sqrt(Math.max(0, a2 / d2 - x2 * x2));
      c3.x = a.x + x2 * dx - y2 * dy;
      c3.y = a.y + x2 * dy + y2 * dx;
    }
  } else {
    c3.x = a.x + c3.r;
    c3.y = a.y;
  }
}
function intersects(a, b) {
  var dr = a.r + b.r - 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}
function score(node) {
  var a = node._, b = node.next._, ab = a.r + b.r, dx = (a.x * b.r + b.x * a.r) / ab, dy = (a.y * b.r + b.y * a.r) / ab;
  return dx * dx + dy * dy;
}
function Node2(circle2) {
  this._ = circle2;
  this.next = null;
  this.previous = null;
}
function packEnclose(circles2) {
  if (!(n = circles2.length)) return 0;
  var a, b, c3, n, aa, ca, i, j, k, sj, sk;
  a = circles2[0], a.x = 0, a.y = 0;
  if (!(n > 1)) return a.r;
  b = circles2[1], a.x = -b.r, b.x = a.r, b.y = 0;
  if (!(n > 2)) return a.r + b.r;
  place(b, a, c3 = circles2[2]);
  a = new Node2(a), b = new Node2(b), c3 = new Node2(c3);
  a.next = c3.previous = b;
  b.next = a.previous = c3;
  c3.next = b.previous = a;
  pack: for (i = 3; i < n; ++i) {
    place(a._, b._, c3 = circles2[i]), c3 = new Node2(c3);
    j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
    do {
      if (sj <= sk) {
        if (intersects(j._, c3._)) {
          b = j, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sj += j._.r, j = j.next;
      } else {
        if (intersects(k._, c3._)) {
          a = k, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sk += k._.r, k = k.previous;
      }
    } while (j !== k.next);
    c3.previous = a, c3.next = b, a.next = b.previous = b = c3;
    aa = score(a);
    while ((c3 = c3.next) !== b) {
      if ((ca = score(c3)) < aa) {
        a = c3, aa = ca;
      }
    }
    b = a.next;
  }
  a = [b._], c3 = b;
  while ((c3 = c3.next) !== b) a.push(c3._);
  c3 = enclose_default(a);
  for (i = 0; i < n; ++i) a = circles2[i], a.x -= c3.x, a.y -= c3.y;
  return c3.r;
}
function siblings_default(circles2) {
  packEnclose(circles2);
  return circles2;
}

// node_modules/d3-hierarchy/src/accessors.js
function optional(f) {
  return f == null ? null : required(f);
}
function required(f) {
  if (typeof f !== "function") throw new Error();
  return f;
}

// node_modules/d3-hierarchy/src/constant.js
function constantZero() {
  return 0;
}
function constant_default14(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-hierarchy/src/pack/index.js
function defaultRadius2(d) {
  return Math.sqrt(d.value);
}
function pack_default() {
  var radius = null, dx = 1, dy = 1, padding = constantZero;
  function pack(root5) {
    root5.x = dx / 2, root5.y = dy / 2;
    if (radius) {
      root5.eachBefore(radiusLeaf(radius)).eachAfter(packChildren(padding, 0.5)).eachBefore(translateChild(1));
    } else {
      root5.eachBefore(radiusLeaf(defaultRadius2)).eachAfter(packChildren(constantZero, 1)).eachAfter(packChildren(padding, root5.r / Math.min(dx, dy))).eachBefore(translateChild(Math.min(dx, dy) / (2 * root5.r)));
    }
    return root5;
  }
  pack.radius = function(x2) {
    return arguments.length ? (radius = optional(x2), pack) : radius;
  };
  pack.size = function(x2) {
    return arguments.length ? (dx = +x2[0], dy = +x2[1], pack) : [dx, dy];
  };
  pack.padding = function(x2) {
    return arguments.length ? (padding = typeof x2 === "function" ? x2 : constant_default14(+x2), pack) : padding;
  };
  return pack;
}
function radiusLeaf(radius) {
  return function(node) {
    if (!node.children) {
      node.r = Math.max(0, +radius(node) || 0);
    }
  };
}
function packChildren(padding, k) {
  return function(node) {
    if (children = node.children) {
      var children, i, n = children.length, r = padding(node) * k || 0, e;
      if (r) for (i = 0; i < n; ++i) children[i].r += r;
      e = packEnclose(children);
      if (r) for (i = 0; i < n; ++i) children[i].r -= r;
      node.r = e + r;
    }
  };
}
function translateChild(k) {
  return function(node) {
    var parent = node.parent;
    node.r *= k;
    if (parent) {
      node.x = parent.x + k * node.x;
      node.y = parent.y + k * node.y;
    }
  };
}

// node_modules/d3-hierarchy/src/treemap/round.js
function round_default2(node) {
  node.x0 = Math.round(node.x0);
  node.y0 = Math.round(node.y0);
  node.x1 = Math.round(node.x1);
  node.y1 = Math.round(node.y1);
}

// node_modules/d3-hierarchy/src/treemap/dice.js
function dice_default(parent, x06, y06, x12, y12) {
  var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (x12 - x06) / parent.value;
  while (++i < n) {
    node = nodes[i], node.y0 = y06, node.y1 = y12;
    node.x0 = x06, node.x1 = x06 += node.value * k;
  }
}

// node_modules/d3-hierarchy/src/partition.js
function partition_default() {
  var dx = 1, dy = 1, padding = 0, round = false;
  function partition(root5) {
    var n = root5.height + 1;
    root5.x0 = root5.y0 = padding;
    root5.x1 = dx;
    root5.y1 = dy / n;
    root5.eachBefore(positionNode(dy, n));
    if (round) root5.eachBefore(round_default2);
    return root5;
  }
  function positionNode(dy2, n) {
    return function(node) {
      if (node.children) {
        dice_default(node, node.x0, dy2 * (node.depth + 1) / n, node.x1, dy2 * (node.depth + 2) / n);
      }
      var x06 = node.x0, y06 = node.y0, x12 = node.x1 - padding, y12 = node.y1 - padding;
      if (x12 < x06) x06 = x12 = (x06 + x12) / 2;
      if (y12 < y06) y06 = y12 = (y06 + y12) / 2;
      node.x0 = x06;
      node.y0 = y06;
      node.x1 = x12;
      node.y1 = y12;
    };
  }
  partition.round = function(x2) {
    return arguments.length ? (round = !!x2, partition) : round;
  };
  partition.size = function(x2) {
    return arguments.length ? (dx = +x2[0], dy = +x2[1], partition) : [dx, dy];
  };
  partition.padding = function(x2) {
    return arguments.length ? (padding = +x2, partition) : padding;
  };
  return partition;
}

// node_modules/d3-hierarchy/src/stratify.js
var keyPrefix3 = "$";
var preroot = {
  depth: -1
};
var ambiguous = {};
function defaultId(d) {
  return d.id;
}
function defaultParentId(d) {
  return d.parentId;
}
function stratify_default() {
  var id4 = defaultId, parentId = defaultParentId;
  function stratify(data) {
    var d, i, n = data.length, root5, parent, node, nodes = new Array(n), nodeId, nodeKey, nodeByKey = {};
    for (i = 0; i < n; ++i) {
      d = data[i], node = nodes[i] = new Node(d);
      if ((nodeId = id4(d, i, data)) != null && (nodeId += "")) {
        nodeKey = keyPrefix3 + (node.id = nodeId);
        nodeByKey[nodeKey] = nodeKey in nodeByKey ? ambiguous : node;
      }
    }
    for (i = 0; i < n; ++i) {
      node = nodes[i], nodeId = parentId(data[i], i, data);
      if (nodeId == null || !(nodeId += "")) {
        if (root5) throw new Error("multiple roots");
        root5 = node;
      } else {
        parent = nodeByKey[keyPrefix3 + nodeId];
        if (!parent) throw new Error("missing: " + nodeId);
        if (parent === ambiguous) throw new Error("ambiguous: " + nodeId);
        if (parent.children) parent.children.push(node);
        else parent.children = [node];
        node.parent = parent;
      }
    }
    if (!root5) throw new Error("no root");
    root5.parent = preroot;
    root5.eachBefore(function(node2) {
      node2.depth = node2.parent.depth + 1;
      --n;
    }).eachBefore(computeHeight);
    root5.parent = null;
    if (n > 0) throw new Error("cycle");
    return root5;
  }
  stratify.id = function(x2) {
    return arguments.length ? (id4 = required(x2), stratify) : id4;
  };
  stratify.parentId = function(x2) {
    return arguments.length ? (parentId = required(x2), stratify) : parentId;
  };
  return stratify;
}

// node_modules/d3-hierarchy/src/tree.js
function defaultSeparation2(a, b) {
  return a.parent === b.parent ? 1 : 2;
}
function nextLeft(v) {
  var children = v.children;
  return children ? children[0] : v.t;
}
function nextRight(v) {
  var children = v.children;
  return children ? children[children.length - 1] : v.t;
}
function moveSubtree(wm, wp, shift) {
  var change = shift / (wp.i - wm.i);
  wp.c -= change;
  wp.s += shift;
  wm.c += change;
  wp.z += shift;
  wp.m += shift;
}
function executeShifts(v) {
  var shift = 0, change = 0, children = v.children, i = children.length, w;
  while (--i >= 0) {
    w = children[i];
    w.z += shift;
    w.m += shift;
    shift += w.s + (change += w.c);
  }
}
function nextAncestor(vim, v, ancestor) {
  return vim.a.parent === v.parent ? vim.a : ancestor;
}
function TreeNode(node, i) {
  this._ = node;
  this.parent = null;
  this.children = null;
  this.A = null;
  this.a = this;
  this.z = 0;
  this.m = 0;
  this.c = 0;
  this.s = 0;
  this.t = null;
  this.i = i;
}
TreeNode.prototype = Object.create(Node.prototype);
function treeRoot(root5) {
  var tree = new TreeNode(root5, 0), node, nodes = [tree], child, children, i, n;
  while (node = nodes.pop()) {
    if (children = node._.children) {
      node.children = new Array(n = children.length);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new TreeNode(children[i], i));
        child.parent = node;
      }
    }
  }
  (tree.parent = new TreeNode(null, 0)).children = [tree];
  return tree;
}
function tree_default() {
  var separation = defaultSeparation2, dx = 1, dy = 1, nodeSize = null;
  function tree(root5) {
    var t = treeRoot(root5);
    t.eachAfter(firstWalk), t.parent.m = -t.z;
    t.eachBefore(secondWalk);
    if (nodeSize) root5.eachBefore(sizeNode);
    else {
      var left2 = root5, right2 = root5, bottom2 = root5;
      root5.eachBefore(function(node) {
        if (node.x < left2.x) left2 = node;
        if (node.x > right2.x) right2 = node;
        if (node.depth > bottom2.depth) bottom2 = node;
      });
      var s = left2 === right2 ? 1 : separation(left2, right2) / 2, tx = s - left2.x, kx = dx / (right2.x + s + tx), ky = dy / (bottom2.depth || 1);
      root5.eachBefore(function(node) {
        node.x = (node.x + tx) * kx;
        node.y = node.depth * ky;
      });
    }
    return root5;
  }
  function firstWalk(v) {
    var children = v.children, siblings = v.parent.children, w = v.i ? siblings[v.i - 1] : null;
    if (children) {
      executeShifts(v);
      var midpoint = (children[0].z + children[children.length - 1].z) / 2;
      if (w) {
        v.z = w.z + separation(v._, w._);
        v.m = v.z - midpoint;
      } else {
        v.z = midpoint;
      }
    } else if (w) {
      v.z = w.z + separation(v._, w._);
    }
    v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
  }
  function secondWalk(v) {
    v._.x = v.z + v.parent.m;
    v.m += v.parent.m;
  }
  function apportion(v, w, ancestor) {
    if (w) {
      var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
      while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
        vom = nextLeft(vom);
        vop = nextRight(vop);
        vop.a = v;
        shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
        if (shift > 0) {
          moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.m;
        sip += vip.m;
        som += vom.m;
        sop += vop.m;
      }
      if (vim && !nextRight(vop)) {
        vop.t = vim;
        vop.m += sim - sop;
      }
      if (vip && !nextLeft(vom)) {
        vom.t = vip;
        vom.m += sip - som;
        ancestor = v;
      }
    }
    return ancestor;
  }
  function sizeNode(node) {
    node.x *= dx;
    node.y = node.depth * dy;
  }
  tree.separation = function(x2) {
    return arguments.length ? (separation = x2, tree) : separation;
  };
  tree.size = function(x2) {
    return arguments.length ? (nodeSize = false, dx = +x2[0], dy = +x2[1], tree) : nodeSize ? null : [dx, dy];
  };
  tree.nodeSize = function(x2) {
    return arguments.length ? (nodeSize = true, dx = +x2[0], dy = +x2[1], tree) : nodeSize ? [dx, dy] : null;
  };
  return tree;
}

// node_modules/d3-hierarchy/src/treemap/slice.js
function slice_default(parent, x06, y06, x12, y12) {
  var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (y12 - y06) / parent.value;
  while (++i < n) {
    node = nodes[i], node.x0 = x06, node.x1 = x12;
    node.y0 = y06, node.y1 = y06 += node.value * k;
  }
}

// node_modules/d3-hierarchy/src/treemap/squarify.js
var phi = (1 + Math.sqrt(5)) / 2;
function squarifyRatio(ratio, parent, x06, y06, x12, y12) {
  var rows = [], nodes = parent.children, row, nodeValue, i0 = 0, i1 = 0, n = nodes.length, dx, dy, value = parent.value, sumValue, minValue, maxValue, newRatio, minRatio, alpha, beta;
  while (i0 < n) {
    dx = x12 - x06, dy = y12 - y06;
    do
      sumValue = nodes[i1++].value;
    while (!sumValue && i1 < n);
    minValue = maxValue = sumValue;
    alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
    beta = sumValue * sumValue * alpha;
    minRatio = Math.max(maxValue / beta, beta / minValue);
    for (; i1 < n; ++i1) {
      sumValue += nodeValue = nodes[i1].value;
      if (nodeValue < minValue) minValue = nodeValue;
      if (nodeValue > maxValue) maxValue = nodeValue;
      beta = sumValue * sumValue * alpha;
      newRatio = Math.max(maxValue / beta, beta / minValue);
      if (newRatio > minRatio) {
        sumValue -= nodeValue;
        break;
      }
      minRatio = newRatio;
    }
    rows.push(row = {
      value: sumValue,
      dice: dx < dy,
      children: nodes.slice(i0, i1)
    });
    if (row.dice) dice_default(row, x06, y06, x12, value ? y06 += dy * sumValue / value : y12);
    else slice_default(row, x06, y06, value ? x06 += dx * sumValue / value : x12, y12);
    value -= sumValue, i0 = i1;
  }
  return rows;
}
var squarify_default = function custom(ratio) {
  function squarify(parent, x06, y06, x12, y12) {
    squarifyRatio(ratio, parent, x06, y06, x12, y12);
  }
  squarify.ratio = function(x2) {
    return custom((x2 = +x2) > 1 ? x2 : 1);
  };
  return squarify;
}(phi);

// node_modules/d3-hierarchy/src/treemap/index.js
function treemap_default() {
  var tile = squarify_default, round = false, dx = 1, dy = 1, paddingStack = [0], paddingInner = constantZero, paddingTop = constantZero, paddingRight = constantZero, paddingBottom = constantZero, paddingLeft = constantZero;
  function treemap(root5) {
    root5.x0 = root5.y0 = 0;
    root5.x1 = dx;
    root5.y1 = dy;
    root5.eachBefore(positionNode);
    paddingStack = [0];
    if (round) root5.eachBefore(round_default2);
    return root5;
  }
  function positionNode(node) {
    var p = paddingStack[node.depth], x06 = node.x0 + p, y06 = node.y0 + p, x12 = node.x1 - p, y12 = node.y1 - p;
    if (x12 < x06) x06 = x12 = (x06 + x12) / 2;
    if (y12 < y06) y06 = y12 = (y06 + y12) / 2;
    node.x0 = x06;
    node.y0 = y06;
    node.x1 = x12;
    node.y1 = y12;
    if (node.children) {
      p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
      x06 += paddingLeft(node) - p;
      y06 += paddingTop(node) - p;
      x12 -= paddingRight(node) - p;
      y12 -= paddingBottom(node) - p;
      if (x12 < x06) x06 = x12 = (x06 + x12) / 2;
      if (y12 < y06) y06 = y12 = (y06 + y12) / 2;
      tile(node, x06, y06, x12, y12);
    }
  }
  treemap.round = function(x2) {
    return arguments.length ? (round = !!x2, treemap) : round;
  };
  treemap.size = function(x2) {
    return arguments.length ? (dx = +x2[0], dy = +x2[1], treemap) : [dx, dy];
  };
  treemap.tile = function(x2) {
    return arguments.length ? (tile = required(x2), treemap) : tile;
  };
  treemap.padding = function(x2) {
    return arguments.length ? treemap.paddingInner(x2).paddingOuter(x2) : treemap.paddingInner();
  };
  treemap.paddingInner = function(x2) {
    return arguments.length ? (paddingInner = typeof x2 === "function" ? x2 : constant_default14(+x2), treemap) : paddingInner;
  };
  treemap.paddingOuter = function(x2) {
    return arguments.length ? treemap.paddingTop(x2).paddingRight(x2).paddingBottom(x2).paddingLeft(x2) : treemap.paddingTop();
  };
  treemap.paddingTop = function(x2) {
    return arguments.length ? (paddingTop = typeof x2 === "function" ? x2 : constant_default14(+x2), treemap) : paddingTop;
  };
  treemap.paddingRight = function(x2) {
    return arguments.length ? (paddingRight = typeof x2 === "function" ? x2 : constant_default14(+x2), treemap) : paddingRight;
  };
  treemap.paddingBottom = function(x2) {
    return arguments.length ? (paddingBottom = typeof x2 === "function" ? x2 : constant_default14(+x2), treemap) : paddingBottom;
  };
  treemap.paddingLeft = function(x2) {
    return arguments.length ? (paddingLeft = typeof x2 === "function" ? x2 : constant_default14(+x2), treemap) : paddingLeft;
  };
  return treemap;
}

// node_modules/d3-hierarchy/src/treemap/binary.js
function binary_default(parent, x06, y06, x12, y12) {
  var nodes = parent.children, i, n = nodes.length, sum2, sums = new Array(n + 1);
  for (sums[0] = sum2 = i = 0; i < n; ++i) {
    sums[i + 1] = sum2 += nodes[i].value;
  }
  partition(0, n, parent.value, x06, y06, x12, y12);
  function partition(i2, j, value, x07, y07, x13, y13) {
    if (i2 >= j - 1) {
      var node = nodes[i2];
      node.x0 = x07, node.y0 = y07;
      node.x1 = x13, node.y1 = y13;
      return;
    }
    var valueOffset = sums[i2], valueTarget = value / 2 + valueOffset, k = i2 + 1, hi = j - 1;
    while (k < hi) {
      var mid = k + hi >>> 1;
      if (sums[mid] < valueTarget) k = mid + 1;
      else hi = mid;
    }
    if (valueTarget - sums[k - 1] < sums[k] - valueTarget && i2 + 1 < k) --k;
    var valueLeft = sums[k] - valueOffset, valueRight = value - valueLeft;
    if (x13 - x07 > y13 - y07) {
      var xk = (x07 * valueRight + x13 * valueLeft) / value;
      partition(i2, k, valueLeft, x07, y07, xk, y13);
      partition(k, j, valueRight, xk, y07, x13, y13);
    } else {
      var yk = (y07 * valueRight + y13 * valueLeft) / value;
      partition(i2, k, valueLeft, x07, y07, x13, yk);
      partition(k, j, valueRight, x07, yk, x13, y13);
    }
  }
}

// node_modules/d3-hierarchy/src/treemap/sliceDice.js
function sliceDice_default(parent, x06, y06, x12, y12) {
  (parent.depth & 1 ? slice_default : dice_default)(parent, x06, y06, x12, y12);
}

// node_modules/d3-hierarchy/src/treemap/resquarify.js
var resquarify_default = function custom2(ratio) {
  function resquarify(parent, x06, y06, x12, y12) {
    if ((rows = parent._squarify) && rows.ratio === ratio) {
      var rows, row, nodes, i, j = -1, n, m = rows.length, value = parent.value;
      while (++j < m) {
        row = rows[j], nodes = row.children;
        for (i = row.value = 0, n = nodes.length; i < n; ++i) row.value += nodes[i].value;
        if (row.dice) dice_default(row, x06, y06, x12, y06 += (y12 - y06) * row.value / value);
        else slice_default(row, x06, y06, x06 += (x12 - x06) * row.value / value, y12);
        value -= row.value;
      }
    } else {
      parent._squarify = rows = squarifyRatio(ratio, parent, x06, y06, x12, y12);
      rows.ratio = ratio;
    }
  }
  resquarify.ratio = function(x2) {
    return custom2((x2 = +x2) > 1 ? x2 : 1);
  };
  return resquarify;
}(phi);

// node_modules/d3/node_modules/d3-interpolate/src/basis.js
function basis2(t16, v0, v1, v2, v3) {
  var t25 = t16 * t16, t35 = t25 * t16;
  return ((1 - 3 * t16 + 3 * t25 - t35) * v0 + (4 - 6 * t25 + 3 * t35) * v1 + (1 + 3 * t16 + 3 * t25 - 3 * t35) * v2 + t35 * v3) / 6;
}
function basis_default3(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis2((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default3(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis2((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/constant.js
function constant_default15(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/color.js
function linear3(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential2(a, b, y2) {
  return a = Math.pow(a, y2), b = Math.pow(b, y2) - a, y2 = 1 / y2, function(t) {
    return Math.pow(a + t * b, y2);
  };
}
function hue2(a, b) {
  var d = b - a;
  return d ? linear3(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default15(isNaN(a) ? b : a);
}
function gamma2(y2) {
  return (y2 = +y2) === 1 ? nogamma2 : function(a, b) {
    return b - a ? exponential2(a, b, y2) : constant_default15(isNaN(a) ? b : a);
  };
}
function nogamma2(a, b) {
  var d = b - a;
  return d ? linear3(a, d) : constant_default15(isNaN(a) ? b : a);
}

// node_modules/d3/node_modules/d3-interpolate/src/rgb.js
var rgb_default2 = function rgbGamma2(y2) {
  var color5 = gamma2(y2);
  function rgb5(start4, end) {
    var r = color5((start4 = rgb2(start4)).r, (end = rgb2(end)).r), g = color5(start4.g, end.g), b = color5(start4.b, end.b), opacity = nogamma2(start4.opacity, end.opacity);
    return function(t) {
      start4.r = r(t);
      start4.g = g(t);
      start4.b = b(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  }
  rgb5.gamma = rgbGamma2;
  return rgb5;
}(1);
function rgbSpline2(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color5;
    for (i = 0; i < n; ++i) {
      color5 = rgb2(colors[i]);
      r[i] = color5.r || 0;
      g[i] = color5.g || 0;
      b[i] = color5.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color5.opacity = 1;
    return function(t) {
      color5.r = r(t);
      color5.g = g(t);
      color5.b = b(t);
      return color5 + "";
    };
  };
}
var rgbBasis2 = rgbSpline2(basis_default3);
var rgbBasisClosed2 = rgbSpline2(basisClosed_default3);

// node_modules/d3/node_modules/d3-interpolate/src/numberArray.js
function numberArray_default2(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c3 = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i) c3[i] = a[i] * (1 - t) + b[i] * t;
    return c3;
  };
}
function isNumberArray2(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}

// node_modules/d3/node_modules/d3-interpolate/src/array.js
function array_default2(a, b) {
  return (isNumberArray2(b) ? numberArray_default2 : genericArray2)(a, b);
}
function genericArray2(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x2 = new Array(na), c3 = new Array(nb), i;
  for (i = 0; i < na; ++i) x2[i] = value_default2(a[i], b[i]);
  for (; i < nb; ++i) c3[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i) c3[i] = x2[i](t);
    return c3;
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/date.js
function date_default2(a, b) {
  var d = /* @__PURE__ */ new Date();
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/number.js
function number_default6(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/object.js
function object_default2(a, b) {
  var i = {}, c3 = {}, k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};
  for (k in b) {
    if (k in a) {
      i[k] = value_default2(a[k], b[k]);
    } else {
      c3[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c3[k] = i[k](t);
    return c3;
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/string.js
var reA2 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB2 = new RegExp(reA2.source, "g");
function zero2(b) {
  return function() {
    return b;
  };
}
function one2(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default2(a, b) {
  var bi = reA2.lastIndex = reB2.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA2.exec(a)) && (bm = reB2.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({
        i,
        x: number_default6(am, bm)
      });
    }
    bi = reB2.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one2(q[0].x) : zero2(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3/node_modules/d3-interpolate/src/value.js
function value_default2(a, b) {
  var t = typeof b, c3;
  return b == null || t === "boolean" ? constant_default15(b) : (t === "number" ? number_default6 : t === "string" ? (c3 = color2(b)) ? (b = c3, rgb_default2) : string_default2 : b instanceof color2 ? rgb_default2 : b instanceof Date ? date_default2 : isNumberArray2(b) ? numberArray_default2 : Array.isArray(b) ? genericArray2 : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default2 : number_default6)(a, b);
}

// node_modules/d3/node_modules/d3-interpolate/src/discrete.js
function discrete_default2(range2) {
  var n = range2.length;
  return function(t) {
    return range2[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/hue.js
function hue_default2(a, b) {
  var i = hue2(+a, +b);
  return function(t) {
    var x2 = i(t);
    return x2 - 360 * Math.floor(x2 / 360);
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/round.js
function round_default3(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/transform/decompose.js
var degrees3 = 180 / Math.PI;
var identity2 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default2(a, b, c3, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c3 + b * d) c3 -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c3 * c3 + d * d)) c3 /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c3) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees3,
    skewX: Math.atan(skewX) * degrees3,
    scaleX,
    scaleY
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/transform/parse.js
var cssNode2;
var cssRoot2;
var cssView2;
var svgNode2;
function parseCss2(value) {
  if (value === "none") return identity2;
  if (!cssNode2) cssNode2 = document.createElement("DIV"), cssRoot2 = document.documentElement, cssView2 = document.defaultView;
  cssNode2.style.transform = value;
  value = cssView2.getComputedStyle(cssRoot2.appendChild(cssNode2), null).getPropertyValue("transform");
  cssRoot2.removeChild(cssNode2);
  value = value.slice(7, -1).split(",");
  return decompose_default2(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}
function parseSvg2(value) {
  if (value == null) return identity2;
  if (!svgNode2) svgNode2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode2.setAttribute("transform", value);
  if (!(value = svgNode2.transform.baseVal.consolidate())) return identity2;
  value = value.matrix;
  return decompose_default2(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform2(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: number_default6(xa, xb)
      }, {
        i: i - 2,
        x: number_default6(ya, yb)
      });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({
        i: s.push(pop(s) + "rotate(", null, degParen) - 2,
        x: number_default6(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({
        i: s.push(pop(s) + "skewX(", null, degParen) - 2,
        x: number_default6(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: number_default6(xa, xb)
      }, {
        i: i - 2,
        x: number_default6(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss2 = interpolateTransform2(parseCss2, "px, ", "px)", "deg)");
var interpolateTransformSvg2 = interpolateTransform2(parseSvg2, ", ", ")", ")");

// node_modules/d3/node_modules/d3-interpolate/src/zoom.js
var rho = Math.SQRT2;
var rho2 = 2;
var rho4 = 4;
var epsilon23 = 1e-12;
function cosh(x2) {
  return ((x2 = Math.exp(x2)) + 1 / x2) / 2;
}
function sinh(x2) {
  return ((x2 = Math.exp(x2)) - 1 / x2) / 2;
}
function tanh(x2) {
  return ((x2 = Math.exp(2 * x2)) - 1) / (x2 + 1);
}
function zoom_default2(p02, p1) {
  var ux0 = p02[0], uy0 = p02[1], w0 = p02[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
  if (d2 < epsilon23) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
    };
  } else {
    var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
    };
  }
  i.duration = S * 1e3;
  return i;
}

// node_modules/d3/node_modules/d3-interpolate/src/hsl.js
function hsl4(hue5) {
  return function(start4, end) {
    var h = hue5((start4 = hsl3(start4)).h, (end = hsl3(end)).h), s = nogamma2(start4.s, end.s), l = nogamma2(start4.l, end.l), opacity = nogamma2(start4.opacity, end.opacity);
    return function(t) {
      start4.h = h(t);
      start4.s = s(t);
      start4.l = l(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  };
}
var hsl_default2 = hsl4(hue2);
var hslLong2 = hsl4(nogamma2);

// node_modules/d3/node_modules/d3-interpolate/src/lab.js
function lab4(start4, end) {
  var l = nogamma2((start4 = lab3(start4)).l, (end = lab3(end)).l), a = nogamma2(start4.a, end.a), b = nogamma2(start4.b, end.b), opacity = nogamma2(start4.opacity, end.opacity);
  return function(t) {
    start4.l = l(t);
    start4.a = a(t);
    start4.b = b(t);
    start4.opacity = opacity(t);
    return start4 + "";
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/hcl.js
function hcl4(hue5) {
  return function(start4, end) {
    var h = hue5((start4 = hcl3(start4)).h, (end = hcl3(end)).h), c3 = nogamma2(start4.c, end.c), l = nogamma2(start4.l, end.l), opacity = nogamma2(start4.opacity, end.opacity);
    return function(t) {
      start4.h = h(t);
      start4.c = c3(t);
      start4.l = l(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  };
}
var hcl_default2 = hcl4(hue2);
var hclLong2 = hcl4(nogamma2);

// node_modules/d3/node_modules/d3-interpolate/src/cubehelix.js
function cubehelix4(hue5) {
  return function cubehelixGamma(y2) {
    y2 = +y2;
    function cubehelix9(start4, end) {
      var h = hue5((start4 = cubehelix3(start4)).h, (end = cubehelix3(end)).h), s = nogamma2(start4.s, end.s), l = nogamma2(start4.l, end.l), opacity = nogamma2(start4.opacity, end.opacity);
      return function(t) {
        start4.h = h(t);
        start4.s = s(t);
        start4.l = l(Math.pow(t, y2));
        start4.opacity = opacity(t);
        return start4 + "";
      };
    }
    cubehelix9.gamma = cubehelixGamma;
    return cubehelix9;
  }(1);
}
var cubehelix_default2 = cubehelix4(hue2);
var cubehelixLong2 = cubehelix4(nogamma2);

// node_modules/d3/node_modules/d3-interpolate/src/piecewise.js
function piecewise2(interpolate, values) {
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function(t) {
    var i2 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i2](t - i2);
  };
}

// node_modules/d3/node_modules/d3-interpolate/src/quantize.js
function quantize_default2(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
}

// node_modules/d3-polygon/src/area.js
function area_default5(polygon) {
  var i = -1, n = polygon.length, a, b = polygon[n - 1], area = 0;
  while (++i < n) {
    a = b;
    b = polygon[i];
    area += a[1] * b[0] - a[0] * b[1];
  }
  return area / 2;
}

// node_modules/d3-polygon/src/centroid.js
function centroid_default3(polygon) {
  var i = -1, n = polygon.length, x2 = 0, y2 = 0, a, b = polygon[n - 1], c3, k = 0;
  while (++i < n) {
    a = b;
    b = polygon[i];
    k += c3 = a[0] * b[1] - b[0] * a[1];
    x2 += (a[0] + b[0]) * c3;
    y2 += (a[1] + b[1]) * c3;
  }
  return k *= 3, [x2 / k, y2 / k];
}

// node_modules/d3-polygon/src/cross.js
function cross_default6(a, b, c3) {
  return (b[0] - a[0]) * (c3[1] - a[1]) - (b[1] - a[1]) * (c3[0] - a[0]);
}

// node_modules/d3-polygon/src/hull.js
function lexicographicOrder(a, b) {
  return a[0] - b[0] || a[1] - b[1];
}
function computeUpperHullIndexes(points) {
  var n = points.length, indexes = [0, 1], size = 2;
  for (var i = 2; i < n; ++i) {
    while (size > 1 && cross_default6(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) --size;
    indexes[size++] = i;
  }
  return indexes.slice(0, size);
}
function hull_default(points) {
  if ((n = points.length) < 3) return null;
  var i, n, sortedPoints = new Array(n), flippedPoints = new Array(n);
  for (i = 0; i < n; ++i) sortedPoints[i] = [+points[i][0], +points[i][1], i];
  sortedPoints.sort(lexicographicOrder);
  for (i = 0; i < n; ++i) flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]];
  var upperIndexes = computeUpperHullIndexes(sortedPoints), lowerIndexes = computeUpperHullIndexes(flippedPoints);
  var skipLeft = lowerIndexes[0] === upperIndexes[0], skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1], hull = [];
  for (i = upperIndexes.length - 1; i >= 0; --i) hull.push(points[sortedPoints[upperIndexes[i]][2]]);
  for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i) hull.push(points[sortedPoints[lowerIndexes[i]][2]]);
  return hull;
}

// node_modules/d3-polygon/src/contains.js
function contains_default3(polygon, point2) {
  var n = polygon.length, p = polygon[n - 1], x2 = point2[0], y2 = point2[1], x06 = p[0], y06 = p[1], x12, y12, inside = false;
  for (var i = 0; i < n; ++i) {
    p = polygon[i], x12 = p[0], y12 = p[1];
    if (y12 > y2 !== y06 > y2 && x2 < (x06 - x12) * (y2 - y12) / (y06 - y12) + x12) inside = !inside;
    x06 = x12, y06 = y12;
  }
  return inside;
}

// node_modules/d3-polygon/src/length.js
function length_default2(polygon) {
  var i = -1, n = polygon.length, b = polygon[n - 1], xa, ya, xb = b[0], yb = b[1], perimeter = 0;
  while (++i < n) {
    xa = xb;
    ya = yb;
    b = polygon[i];
    xb = b[0];
    yb = b[1];
    xa -= xb;
    ya -= yb;
    perimeter += Math.sqrt(xa * xa + ya * ya);
  }
  return perimeter;
}

// node_modules/d3-random/src/defaultSource.js
function defaultSource_default() {
  return Math.random();
}

// node_modules/d3-random/src/uniform.js
var uniform_default = function sourceRandomUniform(source) {
  function randomUniform(min, max2) {
    min = min == null ? 0 : +min;
    max2 = max2 == null ? 1 : +max2;
    if (arguments.length === 1) max2 = min, min = 0;
    else max2 -= min;
    return function() {
      return source() * max2 + min;
    };
  }
  randomUniform.source = sourceRandomUniform;
  return randomUniform;
}(defaultSource_default);

// node_modules/d3-random/src/normal.js
var normal_default = function sourceRandomNormal(source) {
  function randomNormal(mu, sigma) {
    var x2, r;
    mu = mu == null ? 0 : +mu;
    sigma = sigma == null ? 1 : +sigma;
    return function() {
      var y2;
      if (x2 != null) y2 = x2, x2 = null;
      else do {
        x2 = source() * 2 - 1;
        y2 = source() * 2 - 1;
        r = x2 * x2 + y2 * y2;
      } while (!r || r > 1);
      return mu + sigma * y2 * Math.sqrt(-2 * Math.log(r) / r);
    };
  }
  randomNormal.source = sourceRandomNormal;
  return randomNormal;
}(defaultSource_default);

// node_modules/d3-random/src/logNormal.js
var logNormal_default = function sourceRandomLogNormal(source) {
  function randomLogNormal() {
    var randomNormal = normal_default.source(source).apply(this, arguments);
    return function() {
      return Math.exp(randomNormal());
    };
  }
  randomLogNormal.source = sourceRandomLogNormal;
  return randomLogNormal;
}(defaultSource_default);

// node_modules/d3-random/src/irwinHall.js
var irwinHall_default = function sourceRandomIrwinHall(source) {
  function randomIrwinHall(n) {
    return function() {
      for (var sum2 = 0, i = 0; i < n; ++i) sum2 += source();
      return sum2;
    };
  }
  randomIrwinHall.source = sourceRandomIrwinHall;
  return randomIrwinHall;
}(defaultSource_default);

// node_modules/d3-random/src/bates.js
var bates_default = function sourceRandomBates(source) {
  function randomBates(n) {
    var randomIrwinHall = irwinHall_default.source(source)(n);
    return function() {
      return randomIrwinHall() / n;
    };
  }
  randomBates.source = sourceRandomBates;
  return randomBates;
}(defaultSource_default);

// node_modules/d3-random/src/exponential.js
var exponential_default = function sourceRandomExponential(source) {
  function randomExponential(lambda) {
    return function() {
      return -Math.log(1 - source()) / lambda;
    };
  }
  randomExponential.source = sourceRandomExponential;
  return randomExponential;
}(defaultSource_default);

// node_modules/d3/node_modules/d3-scale/src/init.js
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}
function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.interpolator(domain);
      break;
    default:
      this.interpolator(interpolator).domain(domain);
      break;
  }
  return this;
}

// node_modules/d3/node_modules/d3-scale/src/array.js
var array6 = Array.prototype;
var map6 = array6.map;
var slice9 = array6.slice;

// node_modules/d3/node_modules/d3-scale/src/ordinal.js
var implicit = {
  name: "implicit"
};
function ordinal() {
  var index = map_default(), domain = [], range2 = [], unknown = implicit;
  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range2[(i - 1) % range2.length];
  }
  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = map_default();
    var i = -1, n = _.length, d, key;
    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
    return scale;
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = slice9.call(_), scale) : range2.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return ordinal(domain, range2).unknown(unknown);
  };
  initRange.apply(scale, arguments);
  return scale;
}

// node_modules/d3/node_modules/d3-scale/src/band.js
function band() {
  var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, range2 = [0, 1], step, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
  delete scale.unknown;
  function rescale() {
    var n = domain().length, reverse = range2[1] < range2[0], start4 = range2[reverse - 0], stop = range2[1 - reverse];
    step = (stop - start4) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start4 += (stop - start4 - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start4 = Math.round(start4), bandwidth = Math.round(bandwidth);
    var values = range_default(n).map(function(i) {
      return start4 + step * i;
    });
    return ordinalRange(reverse ? values.reverse() : values);
  }
  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = [+_[0], +_[1]], rescale()) : range2.slice();
  };
  scale.rangeRound = function(_) {
    return range2 = [+_[0], +_[1]], round = true, rescale();
  };
  scale.bandwidth = function() {
    return bandwidth;
  };
  scale.step = function() {
    return step;
  };
  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };
  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };
  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };
  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };
  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };
  scale.copy = function() {
    return band(domain(), range2).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  return initRange.apply(rescale(), arguments);
}
function pointish(scale) {
  var copy3 = scale.copy;
  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;
  scale.copy = function() {
    return pointish(copy3());
  };
  return scale;
}
function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}

// node_modules/d3/node_modules/d3-scale/src/constant.js
function constant_default16(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3/node_modules/d3-scale/src/number.js
function number_default7(x2) {
  return +x2;
}

// node_modules/d3/node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity3(x2) {
  return x2;
}
function normalize(a, b) {
  return (b -= a = +a) ? function(x2) {
    return (x2 - a) / b;
  } : constant_default16(isNaN(b) ? NaN : 0.5);
}
function clamper(domain) {
  var a = domain[0], b = domain[domain.length - 1], t;
  if (a > b) t = a, a = b, b = t;
  return function(x2) {
    return Math.max(a, Math.min(b, x2));
  };
}
function bimap(domain, range2, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x2) {
    return r0(d0(x2));
  };
}
function polymap(domain, range2, interpolate) {
  var j = Math.min(domain.length, range2.length) - 1, d = new Array(j), r = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range2 = range2.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range2[i], range2[i + 1]);
  }
  return function(x2) {
    var i2 = bisect_default(domain, x2, 1, j) - 1;
    return r[i2](d[i2](x2));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer2() {
  var domain = unit, range2 = unit, interpolate = value_default2, transform2, untransform, unknown, clamp = identity3, piecewise5, output, input;
  function rescale() {
    piecewise5 = Math.min(domain.length, range2.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x2) {
    return isNaN(x2 = +x2) ? unknown : (output || (output = piecewise5(domain.map(transform2), range2, interpolate)))(transform2(clamp(x2)));
  }
  scale.invert = function(y2) {
    return clamp(untransform((input || (input = piecewise5(range2, domain.map(transform2), number_default6)))(y2)));
  };
  scale.domain = function(_) {
    return arguments.length ? (domain = map6.call(_, number_default7), clamp === identity3 || (clamp = clamper(domain)), rescale()) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = slice9.call(_), rescale()) : range2.slice();
  };
  scale.rangeRound = function(_) {
    return range2 = slice9.call(_), interpolate = round_default3, rescale();
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? clamper(domain) : identity3, scale) : clamp !== identity3;
  };
  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t, u) {
    transform2 = t, untransform = u;
    return rescale();
  };
}
function continuous(transform2, untransform) {
  return transformer2()(transform2, untransform);
}

// node_modules/d3/node_modules/d3-scale/src/tickFormat.js
function tickFormat_default(start4, stop, count2, specifier) {
  var step = tickStep(start4, stop, count2), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start4), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start4), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// node_modules/d3/node_modules/d3-scale/src/linear.js
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count2) {
    var d = domain();
    return ticks_default(d[0], d[d.length - 1], count2 == null ? 10 : count2);
  };
  scale.tickFormat = function(count2, specifier) {
    var d = domain();
    return tickFormat_default(d[0], d[d.length - 1], count2 == null ? 10 : count2, specifier);
  };
  scale.nice = function(count2) {
    if (count2 == null) count2 = 10;
    var d = domain(), i0 = 0, i1 = d.length - 1, start4 = d[i0], stop = d[i1], step;
    if (stop < start4) {
      step = start4, start4 = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    step = tickIncrement(start4, stop, count2);
    if (step > 0) {
      start4 = Math.floor(start4 / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = tickIncrement(start4, stop, count2);
    } else if (step < 0) {
      start4 = Math.ceil(start4 * step) / step;
      stop = Math.floor(stop * step) / step;
      step = tickIncrement(start4, stop, count2);
    }
    if (step > 0) {
      d[i0] = Math.floor(start4 / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start4 * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }
    return scale;
  };
  return scale;
}
function linear4() {
  var scale = continuous(identity3, identity3);
  scale.copy = function() {
    return copy(scale, linear4());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}

// node_modules/d3/node_modules/d3-scale/src/identity.js
function identity4(domain) {
  var unknown;
  function scale(x2) {
    return isNaN(x2 = +x2) ? unknown : x2;
  }
  scale.invert = scale;
  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = map6.call(_, number_default7), scale) : domain.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return identity4(domain).unknown(unknown);
  };
  domain = arguments.length ? map6.call(domain, number_default7) : [0, 1];
  return linearish(scale);
}

// node_modules/d3/node_modules/d3-scale/src/nice.js
function nice_default(domain, interval4) {
  domain = domain.slice();
  var i0 = 0, i1 = domain.length - 1, x06 = domain[i0], x12 = domain[i1], t;
  if (x12 < x06) {
    t = i0, i0 = i1, i1 = t;
    t = x06, x06 = x12, x12 = t;
  }
  domain[i0] = interval4.floor(x06);
  domain[i1] = interval4.ceil(x12);
  return domain;
}

// node_modules/d3/node_modules/d3-scale/src/log.js
function transformLog(x2) {
  return Math.log(x2);
}
function transformExp(x2) {
  return Math.exp(x2);
}
function transformLogn(x2) {
  return -Math.log(-x2);
}
function transformExpn(x2) {
  return -Math.exp(-x2);
}
function pow10(x2) {
  return isFinite(x2) ? +("1e" + x2) : x2 < 0 ? 0 : x2;
}
function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : function(x2) {
    return Math.pow(base, x2);
  };
}
function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function(x2) {
    return Math.log(x2) / base;
  });
}
function reflect(f) {
  return function(x2) {
    return -f(-x2);
  };
}
function loggish(transform2) {
  var scale = transform2(transformLog, transformExp), domain = scale.domain, base = 10, logs, pows;
  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform2(transformLogn, transformExpn);
    } else {
      transform2(transformLog, transformExp);
    }
    return scale;
  }
  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };
  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.ticks = function(count2) {
    var d = domain(), u = d[0], v = d[d.length - 1], r;
    if (r = v < u) i = u, u = v, v = i;
    var i = logs(u), j = logs(v), p, k, t, n = count2 == null ? 10 : +count2, z = [];
    if (!(base % 1) && j - i < n) {
      i = Math.round(i) - 1, j = Math.round(j) + 1;
      if (u > 0) for (; i < j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
      else for (; i < j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
    } else {
      z = ticks_default(i, j, Math.min(j - i, n)).map(pows);
    }
    return r ? z.reverse() : z;
  };
  scale.tickFormat = function(count2, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = format(specifier);
    if (count2 === Infinity) return specifier;
    if (count2 == null) count2 = 10;
    var k = Math.max(1, base * count2 / scale.ticks().length);
    return function(d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };
  scale.nice = function() {
    return domain(nice_default(domain(), {
      floor: function(x2) {
        return pows(Math.floor(logs(x2)));
      },
      ceil: function(x2) {
        return pows(Math.ceil(logs(x2)));
      }
    }));
  };
  return scale;
}
function log2() {
  var scale = loggish(transformer2()).domain([1, 10]);
  scale.copy = function() {
    return copy(scale, log2()).base(scale.base());
  };
  initRange.apply(scale, arguments);
  return scale;
}

// node_modules/d3/node_modules/d3-scale/src/symlog.js
function transformSymlog(c3) {
  return function(x2) {
    return Math.sign(x2) * Math.log1p(Math.abs(x2 / c3));
  };
}
function transformSymexp(c3) {
  return function(x2) {
    return Math.sign(x2) * Math.expm1(Math.abs(x2)) * c3;
  };
}
function symlogish(transform2) {
  var c3 = 1, scale = transform2(transformSymlog(c3), transformSymexp(c3));
  scale.constant = function(_) {
    return arguments.length ? transform2(transformSymlog(c3 = +_), transformSymexp(c3)) : c3;
  };
  return linearish(scale);
}
function symlog() {
  var scale = symlogish(transformer2());
  scale.copy = function() {
    return copy(scale, symlog()).constant(scale.constant());
  };
  return initRange.apply(scale, arguments);
}

// node_modules/d3/node_modules/d3-scale/src/pow.js
function transformPow(exponent) {
  return function(x2) {
    return x2 < 0 ? -Math.pow(-x2, exponent) : Math.pow(x2, exponent);
  };
}
function transformSqrt(x2) {
  return x2 < 0 ? -Math.sqrt(-x2) : Math.sqrt(x2);
}
function transformSquare(x2) {
  return x2 < 0 ? -x2 * x2 : x2 * x2;
}
function powish(transform2) {
  var scale = transform2(identity3, identity3), exponent = 1;
  function rescale() {
    return exponent === 1 ? transform2(identity3, identity3) : exponent === 0.5 ? transform2(transformSqrt, transformSquare) : transform2(transformPow(exponent), transformPow(1 / exponent));
  }
  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };
  return linearish(scale);
}
function pow2() {
  var scale = powish(transformer2());
  scale.copy = function() {
    return copy(scale, pow2()).exponent(scale.exponent());
  };
  initRange.apply(scale, arguments);
  return scale;
}
function sqrt2() {
  return pow2.apply(null, arguments).exponent(0.5);
}

// node_modules/d3/node_modules/d3-scale/src/quantile.js
function quantile() {
  var domain = [], range2 = [], thresholds = [], unknown;
  function rescale() {
    var i = 0, n = Math.max(1, range2.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = quantile_default(domain, i / n);
    return scale;
  }
  function scale(x2) {
    return isNaN(x2 = +x2) ? unknown : range2[bisect_default(thresholds, x2)];
  }
  scale.invertExtent = function(y2) {
    var i = range2.indexOf(y2);
    return i < 0 ? [NaN, NaN] : [i > 0 ? thresholds[i - 1] : domain[0], i < thresholds.length ? thresholds[i] : domain[domain.length - 1]];
  };
  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending_default2);
    return rescale();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = slice9.call(_), rescale()) : range2.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.quantiles = function() {
    return thresholds.slice();
  };
  scale.copy = function() {
    return quantile().domain(domain).range(range2).unknown(unknown);
  };
  return initRange.apply(scale, arguments);
}

// node_modules/d3/node_modules/d3-scale/src/quantize.js
function quantize() {
  var x06 = 0, x12 = 1, n = 1, domain = [0.5], range2 = [0, 1], unknown;
  function scale(x2) {
    return x2 <= x2 ? range2[bisect_default(domain, x2, 0, n)] : unknown;
  }
  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x12 - (i - n) * x06) / (n + 1);
    return scale;
  }
  scale.domain = function(_) {
    return arguments.length ? (x06 = +_[0], x12 = +_[1], rescale()) : [x06, x12];
  };
  scale.range = function(_) {
    return arguments.length ? (n = (range2 = slice9.call(_)).length - 1, rescale()) : range2.slice();
  };
  scale.invertExtent = function(y2) {
    var i = range2.indexOf(y2);
    return i < 0 ? [NaN, NaN] : i < 1 ? [x06, domain[0]] : i >= n ? [domain[n - 1], x12] : [domain[i - 1], domain[i]];
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };
  scale.thresholds = function() {
    return domain.slice();
  };
  scale.copy = function() {
    return quantize().domain([x06, x12]).range(range2).unknown(unknown);
  };
  return initRange.apply(linearish(scale), arguments);
}

// node_modules/d3/node_modules/d3-scale/src/threshold.js
function threshold() {
  var domain = [0.5], range2 = [0, 1], unknown, n = 1;
  function scale(x2) {
    return x2 <= x2 ? range2[bisect_default(domain, x2, 0, n)] : unknown;
  }
  scale.domain = function(_) {
    return arguments.length ? (domain = slice9.call(_), n = Math.min(domain.length, range2.length - 1), scale) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = slice9.call(_), n = Math.min(domain.length, range2.length - 1), scale) : range2.slice();
  };
  scale.invertExtent = function(y2) {
    var i = range2.indexOf(y2);
    return [domain[i - 1], domain[i]];
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return threshold().domain(domain).range(range2).unknown(unknown);
  };
  return initRange.apply(scale, arguments);
}

// node_modules/d3/node_modules/d3-time/src/interval.js
var t03 = /* @__PURE__ */ new Date();
var t13 = /* @__PURE__ */ new Date();
function newInterval(floori, offseti, count2, field) {
  function interval4(date2) {
    return floori(date2 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date2)), date2;
  }
  interval4.floor = function(date2) {
    return floori(date2 = /* @__PURE__ */ new Date(+date2)), date2;
  };
  interval4.ceil = function(date2) {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval4.round = function(date2) {
    var d0 = interval4(date2), d1 = interval4.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval4.offset = function(date2, step) {
    return offseti(date2 = /* @__PURE__ */ new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
  };
  interval4.range = function(start4, stop, step) {
    var range2 = [], previous;
    start4 = interval4.ceil(start4);
    step = step == null ? 1 : Math.floor(step);
    if (!(start4 < stop) || !(step > 0)) return range2;
    do
      range2.push(previous = /* @__PURE__ */ new Date(+start4)), offseti(start4, step), floori(start4);
    while (previous < start4 && start4 < stop);
    return range2;
  };
  interval4.filter = function(test) {
    return newInterval(function(date2) {
      if (date2 >= date2) while (floori(date2), !test(date2)) date2.setTime(date2 - 1);
    }, function(date2, step) {
      if (date2 >= date2) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date2, -1), !test(date2)) {
          }
        }
        else while (--step >= 0) {
          while (offseti(date2, 1), !test(date2)) {
          }
        }
      }
    });
  };
  if (count2) {
    interval4.count = function(start4, end) {
      t03.setTime(+start4), t13.setTime(+end);
      floori(t03), floori(t13);
      return Math.floor(count2(t03, t13));
    };
    interval4.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval4 : interval4.filter(field ? function(d) {
        return field(d) % step === 0;
      } : function(d) {
        return interval4.count(0, d) % step === 0;
      });
    };
  }
  return interval4;
}

// node_modules/d3/node_modules/d3-time/src/millisecond.js
var millisecond = newInterval(function() {
}, function(date2, step) {
  date2.setTime(+date2 + step);
}, function(start4, end) {
  return end - start4;
});
millisecond.every = function(k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return newInterval(function(date2) {
    date2.setTime(Math.floor(date2 / k) * k);
  }, function(date2, step) {
    date2.setTime(+date2 + step * k);
  }, function(start4, end) {
    return (end - start4) / k;
  });
};
var millisecond_default = millisecond;
var milliseconds = millisecond.range;

// node_modules/d3/node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = 6e4;
var durationHour = 36e5;
var durationDay = 864e5;
var durationWeek = 6048e5;

// node_modules/d3/node_modules/d3-time/src/second.js
var second = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds());
}, function(date2, step) {
  date2.setTime(+date2 + step * durationSecond);
}, function(start4, end) {
  return (end - start4) / durationSecond;
}, function(date2) {
  return date2.getUTCSeconds();
});
var second_default = second;
var seconds = second.range;

// node_modules/d3/node_modules/d3-time/src/minute.js
var minute = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute);
}, function(start4, end) {
  return (end - start4) / durationMinute;
}, function(date2) {
  return date2.getMinutes();
});
var minute_default = minute;
var minutes = minute.range;

// node_modules/d3/node_modules/d3-time/src/hour.js
var hour = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond - date2.getMinutes() * durationMinute);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour);
}, function(start4, end) {
  return (end - start4) / durationHour;
}, function(date2) {
  return date2.getHours();
});
var hour_default = hour;
var hours = hour.range;

// node_modules/d3/node_modules/d3-time/src/day.js
var day = newInterval(function(date2) {
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setDate(date2.getDate() + step);
}, function(start4, end) {
  return (end - start4 - (end.getTimezoneOffset() - start4.getTimezoneOffset()) * durationMinute) / durationDay;
}, function(date2) {
  return date2.getDate() - 1;
});
var day_default = day;
var days = day.range;

// node_modules/d3/node_modules/d3-time/src/week.js
function weekday(i) {
  return newInterval(function(date2) {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i) % 7);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setDate(date2.getDate() + step * 7);
  }, function(start4, end) {
    return (end - start4 - (end.getTimezoneOffset() - start4.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);
var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

// node_modules/d3/node_modules/d3-time/src/month.js
var month = newInterval(function(date2) {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setMonth(date2.getMonth() + step);
}, function(start4, end) {
  return end.getMonth() - start4.getMonth() + (end.getFullYear() - start4.getFullYear()) * 12;
}, function(date2) {
  return date2.getMonth();
});
var month_default = month;
var months = month.range;

// node_modules/d3/node_modules/d3-time/src/year.js
var year = newInterval(function(date2) {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setFullYear(date2.getFullYear() + step);
}, function(start4, end) {
  return end.getFullYear() - start4.getFullYear();
}, function(date2) {
  return date2.getFullYear();
});
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date2) {
    date2.setFullYear(Math.floor(date2.getFullYear() / k) * k);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setFullYear(date2.getFullYear() + step * k);
  });
};
var year_default = year;
var years = year.range;

// node_modules/d3/node_modules/d3-time/src/utcMinute.js
var utcMinute = newInterval(function(date2) {
  date2.setUTCSeconds(0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute);
}, function(start4, end) {
  return (end - start4) / durationMinute;
}, function(date2) {
  return date2.getUTCMinutes();
});
var utcMinute_default = utcMinute;
var utcMinutes = utcMinute.range;

// node_modules/d3/node_modules/d3-time/src/utcHour.js
var utcHour = newInterval(function(date2) {
  date2.setUTCMinutes(0, 0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour);
}, function(start4, end) {
  return (end - start4) / durationHour;
}, function(date2) {
  return date2.getUTCHours();
});
var utcHour_default = utcHour;
var utcHours = utcHour.range;

// node_modules/d3/node_modules/d3-time/src/utcDay.js
var utcDay = newInterval(function(date2) {
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCDate(date2.getUTCDate() + step);
}, function(start4, end) {
  return (end - start4) / durationDay;
}, function(date2) {
  return date2.getUTCDate() - 1;
});
var utcDay_default = utcDay;
var utcDays = utcDay.range;

// node_modules/d3/node_modules/d3-time/src/utcWeek.js
function utcWeekday(i) {
  return newInterval(function(date2) {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCDate(date2.getUTCDate() + step * 7);
  }, function(start4, end) {
    return (end - start4) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

// node_modules/d3/node_modules/d3-time/src/utcMonth.js
var utcMonth = newInterval(function(date2) {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCMonth(date2.getUTCMonth() + step);
}, function(start4, end) {
  return end.getUTCMonth() - start4.getUTCMonth() + (end.getUTCFullYear() - start4.getUTCFullYear()) * 12;
}, function(date2) {
  return date2.getUTCMonth();
});
var utcMonth_default = utcMonth;
var utcMonths = utcMonth.range;

// node_modules/d3/node_modules/d3-time/src/utcYear.js
var utcYear = newInterval(function(date2) {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCFullYear(date2.getUTCFullYear() + step);
}, function(start4, end) {
  return end.getUTCFullYear() - start4.getUTCFullYear();
}, function(date2) {
  return date2.getUTCFullYear();
});
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date2) {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k) * k);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCFullYear(date2.getUTCFullYear() + step * k);
  });
};
var utcYear_default = utcYear;
var utcYears = utcYear.range;

// node_modules/d3/node_modules/d3-time-format/src/locale.js
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date2.setFullYear(d.y);
    return date2;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date2.setUTCFullYear(d.y);
    return date2;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y2, m, d) {
  return {
    y: y2,
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
    "y": formatYear2,
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
    return function(date2) {
      var string = [], i = -1, j = 0, n = specifier.length, c3, pad3, format2;
      if (!(date2 instanceof Date)) date2 = /* @__PURE__ */ new Date(+date2);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad3 = pads[c3 = specifier.charAt(++i)]) != null) c3 = specifier.charAt(++i);
          else pad3 = c3 === "e" ? " " : "0";
          if (format2 = formats2[c3]) c3 = format2(date2, pad3);
          string.push(c3);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day2;
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
          week = utcDate(newDate(d.y, 0, 1)), day2 = week.getUTCDay();
          week = day2 > 4 || day2 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay_default.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day2 = week.getDay();
          week = day2 > 4 || day2 === 0 ? monday.ceil(week) : monday(week);
          week = day_default.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day2 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day2 + 5) % 7 : d.w + d.U * 7 - (day2 + 6) % 7;
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
    var i = 0, n = specifier.length, m = string.length, c3, parse;
    while (i < n) {
      if (j >= m) return -1;
      c3 = specifier.charCodeAt(i++);
      if (c3 === 37) {
        c3 = specifier.charAt(i++);
        parse = parses[c3 in pads ? specifier.charAt(i++) : c3];
        if (!parse || (j = parse(d, string, j)) < 0) return -1;
      } else if (c3 != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
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
function pad2(value, fill, width) {
  var sign2 = value < 0 ? "-" : "", string = (sign2 ? -value : value) + "", length2 = string.length;
  return sign2 + (length2 < width ? new Array(width - length2 + 1).join(fill) + string : string);
}
function requote(s) {
  return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  var map7 = {}, i = -1, n = names.length;
  while (++i < n) map7[names[i].toLowerCase()] = i;
  return map7;
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
  return pad2(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad2(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad2(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad2(1 + day_default.count(year_default(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad2(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad2(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad2(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad2(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day2 = d.getDay();
  return day2 === 0 ? 7 : day2;
}
function formatWeekNumberSunday(d, p) {
  return pad2(sunday.count(year_default(d) - 1, d), p, 2);
}
function dISO(d) {
  var day2 = d.getDay();
  return day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad2(thursday.count(year_default(d), d) + (year_default(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad2(monday.count(year_default(d) - 1, d), p, 2);
}
function formatYear2(d, p) {
  return pad2(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad2(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad2(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day2 = d.getDay();
  d = day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
  return pad2(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad2(z / 60 | 0, "0", 2) + pad2(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad2(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad2(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad2(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad2(1 + utcDay_default.count(utcYear_default(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad2(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad2(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad2(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad2(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad2(utcSunday.count(utcYear_default(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day2 = d.getUTCDay();
  return day2 >= 4 || day2 === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad2(utcThursday.count(utcYear_default(d), d) + (utcYear_default(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad2(utcMonday.count(utcYear_default(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad2(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad2(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad2(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day2 = d.getUTCDay();
  d = day2 >= 4 || day2 === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad2(d.getUTCFullYear() % 1e4, p, 4);
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

// node_modules/d3/node_modules/d3-time-format/src/defaultLocale.js
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

// node_modules/d3/node_modules/d3-time-format/src/isoFormat.js
var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date2) {
  return date2.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);
var isoFormat_default = formatIso;

// node_modules/d3/node_modules/d3-time-format/src/isoParse.js
function parseIsoNative(string) {
  var date2 = new Date(string);
  return isNaN(date2) ? null : date2;
}
var parseIso = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);
var isoParse_default = parseIso;

// node_modules/d3/node_modules/d3-scale/src/time.js
var durationSecond2 = 1e3;
var durationMinute2 = durationSecond2 * 60;
var durationHour2 = durationMinute2 * 60;
var durationDay2 = durationHour2 * 24;
var durationWeek2 = durationDay2 * 7;
var durationMonth = durationDay2 * 30;
var durationYear = durationDay2 * 365;
function date(t) {
  return new Date(t);
}
function number3(t) {
  return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function calendar(year2, month2, week, day2, hour2, minute2, second2, millisecond2, format2) {
  var scale = continuous(identity3, identity3), invert = scale.invert, domain = scale.domain;
  var formatMillisecond = format2(".%L"), formatSecond = format2(":%S"), formatMinute = format2("%I:%M"), formatHour = format2("%I %p"), formatDay = format2("%a %d"), formatWeek = format2("%b %d"), formatMonth = format2("%B"), formatYear3 = format2("%Y");
  var tickIntervals = [[second2, 1, durationSecond2], [second2, 5, 5 * durationSecond2], [second2, 15, 15 * durationSecond2], [second2, 30, 30 * durationSecond2], [minute2, 1, durationMinute2], [minute2, 5, 5 * durationMinute2], [minute2, 15, 15 * durationMinute2], [minute2, 30, 30 * durationMinute2], [hour2, 1, durationHour2], [hour2, 3, 3 * durationHour2], [hour2, 6, 6 * durationHour2], [hour2, 12, 12 * durationHour2], [day2, 1, durationDay2], [day2, 2, 2 * durationDay2], [week, 1, durationWeek2], [month2, 1, durationMonth], [month2, 3, 3 * durationMonth], [year2, 1, durationYear]];
  function tickFormat(date2) {
    return (second2(date2) < date2 ? formatMillisecond : minute2(date2) < date2 ? formatSecond : hour2(date2) < date2 ? formatMinute : day2(date2) < date2 ? formatHour : month2(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year2(date2) < date2 ? formatMonth : formatYear3)(date2);
  }
  function tickInterval(interval4, start4, stop, step) {
    if (interval4 == null) interval4 = 10;
    if (typeof interval4 === "number") {
      var target = Math.abs(stop - start4) / interval4, i = bisector_default(function(i2) {
        return i2[2];
      }).right(tickIntervals, target);
      if (i === tickIntervals.length) {
        step = tickStep(start4 / durationYear, stop / durationYear, interval4);
        interval4 = year2;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval4 = i[0];
      } else {
        step = Math.max(tickStep(start4, stop, interval4), 1);
        interval4 = millisecond2;
      }
    }
    return step == null ? interval4 : interval4.every(step);
  }
  scale.invert = function(y2) {
    return new Date(invert(y2));
  };
  scale.domain = function(_) {
    return arguments.length ? domain(map6.call(_, number3)) : domain().map(date);
  };
  scale.ticks = function(interval4, step) {
    var d = domain(), t06 = d[0], t16 = d[d.length - 1], r = t16 < t06, t;
    if (r) t = t06, t06 = t16, t16 = t;
    t = tickInterval(interval4, t06, t16, step);
    t = t ? t.range(t06, t16 + 1) : [];
    return r ? t.reverse() : t;
  };
  scale.tickFormat = function(count2, specifier) {
    return specifier == null ? tickFormat : format2(specifier);
  };
  scale.nice = function(interval4, step) {
    var d = domain();
    return (interval4 = tickInterval(interval4, d[0], d[d.length - 1], step)) ? domain(nice_default(d, interval4)) : scale;
  };
  scale.copy = function() {
    return copy(scale, calendar(year2, month2, week, day2, hour2, minute2, second2, millisecond2, format2));
  };
  return scale;
}
function time_default() {
  return initRange.apply(calendar(year_default, month_default, sunday, day_default, hour_default, minute_default, second_default, millisecond_default, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}

// node_modules/d3/node_modules/d3-scale/src/utcTime.js
function utcTime_default() {
  return initRange.apply(calendar(utcYear_default, utcMonth_default, utcSunday, utcDay_default, utcHour_default, utcMinute_default, second_default, millisecond_default, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}

// node_modules/d3/node_modules/d3-scale/src/sequential.js
function transformer3() {
  var x06 = 0, x12 = 1, t06, t16, k10, transform2, interpolator = identity3, clamp = false, unknown;
  function scale(x2) {
    return isNaN(x2 = +x2) ? unknown : interpolator(k10 === 0 ? 0.5 : (x2 = (transform2(x2) - t06) * k10, clamp ? Math.max(0, Math.min(1, x2)) : x2));
  }
  scale.domain = function(_) {
    return arguments.length ? (t06 = transform2(x06 = +_[0]), t16 = transform2(x12 = +_[1]), k10 = t06 === t16 ? 0 : 1 / (t16 - t06), scale) : [x06, x12];
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };
  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t) {
    transform2 = t, t06 = t(x06), t16 = t(x12), k10 = t06 === t16 ? 0 : 1 / (t16 - t06);
    return scale;
  };
}
function copy2(source, target) {
  return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
}
function sequential() {
  var scale = linearish(transformer3()(identity3));
  scale.copy = function() {
    return copy2(scale, sequential());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialLog() {
  var scale = loggish(transformer3()).domain([1, 10]);
  scale.copy = function() {
    return copy2(scale, sequentialLog()).base(scale.base());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialSymlog() {
  var scale = symlogish(transformer3());
  scale.copy = function() {
    return copy2(scale, sequentialSymlog()).constant(scale.constant());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialPow() {
  var scale = powish(transformer3());
  scale.copy = function() {
    return copy2(scale, sequentialPow()).exponent(scale.exponent());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}

// node_modules/d3/node_modules/d3-scale/src/sequentialQuantile.js
function sequentialQuantile() {
  var domain = [], interpolator = identity3;
  function scale(x2) {
    if (!isNaN(x2 = +x2)) return interpolator((bisect_default(domain, x2) - 1) / (domain.length - 1));
  }
  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending_default2);
    return scale;
  };
  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  scale.copy = function() {
    return sequentialQuantile(interpolator).domain(domain);
  };
  return initInterpolator.apply(scale, arguments);
}

// node_modules/d3/node_modules/d3-scale/src/diverging.js
function transformer4() {
  var x06 = 0, x12 = 0.5, x2 = 1, t06, t16, t25, k10, k21, interpolator = identity3, transform2, clamp = false, unknown;
  function scale(x3) {
    return isNaN(x3 = +x3) ? unknown : (x3 = 0.5 + ((x3 = +transform2(x3)) - t16) * (x3 < t16 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x3)) : x3));
  }
  scale.domain = function(_) {
    return arguments.length ? (t06 = transform2(x06 = +_[0]), t16 = transform2(x12 = +_[1]), t25 = transform2(x2 = +_[2]), k10 = t06 === t16 ? 0 : 0.5 / (t16 - t06), k21 = t16 === t25 ? 0 : 0.5 / (t25 - t16), scale) : [x06, x12, x2];
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };
  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t) {
    transform2 = t, t06 = t(x06), t16 = t(x12), t25 = t(x2), k10 = t06 === t16 ? 0 : 0.5 / (t16 - t06), k21 = t16 === t25 ? 0 : 0.5 / (t25 - t16);
    return scale;
  };
}
function diverging() {
  var scale = linearish(transformer4()(identity3));
  scale.copy = function() {
    return copy2(scale, diverging());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingLog() {
  var scale = loggish(transformer4()).domain([0.1, 1, 10]);
  scale.copy = function() {
    return copy2(scale, divergingLog()).base(scale.base());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingSymlog() {
  var scale = symlogish(transformer4());
  scale.copy = function() {
    return copy2(scale, divergingSymlog()).constant(scale.constant());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingPow() {
  var scale = powish(transformer4());
  scale.copy = function() {
    return copy2(scale, divergingPow()).exponent(scale.exponent());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}

// node_modules/d3-scale-chromatic/src/colors.js
function colors_default(specifier) {
  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
}

// node_modules/d3-scale-chromatic/src/categorical/category10.js
var category10_default = colors_default("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

// node_modules/d3-scale-chromatic/src/categorical/Accent.js
var Accent_default = colors_default("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");

// node_modules/d3-scale-chromatic/src/categorical/Dark2.js
var Dark2_default = colors_default("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");

// node_modules/d3-scale-chromatic/src/categorical/Paired.js
var Paired_default = colors_default("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");

// node_modules/d3-scale-chromatic/src/categorical/Pastel1.js
var Pastel1_default = colors_default("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");

// node_modules/d3-scale-chromatic/src/categorical/Pastel2.js
var Pastel2_default = colors_default("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");

// node_modules/d3-scale-chromatic/src/categorical/Set1.js
var Set1_default = colors_default("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");

// node_modules/d3-scale-chromatic/src/categorical/Set2.js
var Set2_default = colors_default("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");

// node_modules/d3-scale-chromatic/src/categorical/Set3.js
var Set3_default = colors_default("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");

// node_modules/d3-scale-chromatic/src/categorical/Tableau10.js
var Tableau10_default = colors_default("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");

// node_modules/d3-scale-chromatic/node_modules/d3-color/src/define.js
function define_default3(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend3(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-scale-chromatic/node_modules/d3-color/src/color.js
function Color3() {
}
var darker3 = 0.7;
var brighter3 = 1 / darker3;
var reI3 = "\\s*([+-]?\\d+)\\s*";
var reN3 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP3 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex3 = /^#([0-9a-f]{3,8})$/;
var reRgbInteger3 = new RegExp("^rgb\\(" + [reI3, reI3, reI3] + "\\)$");
var reRgbPercent3 = new RegExp("^rgb\\(" + [reP3, reP3, reP3] + "\\)$");
var reRgbaInteger3 = new RegExp("^rgba\\(" + [reI3, reI3, reI3, reN3] + "\\)$");
var reRgbaPercent3 = new RegExp("^rgba\\(" + [reP3, reP3, reP3, reN3] + "\\)$");
var reHslPercent3 = new RegExp("^hsl\\(" + [reN3, reP3, reP3] + "\\)$");
var reHslaPercent3 = new RegExp("^hsla\\(" + [reN3, reP3, reP3, reN3] + "\\)$");
var named3 = {
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
define_default3(Color3, color3, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex3,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex3,
  formatHsl: color_formatHsl3,
  formatRgb: color_formatRgb3,
  toString: color_formatRgb3
});
function color_formatHex3() {
  return this.rgb().formatHex();
}
function color_formatHsl3() {
  return hslConvert3(this).formatHsl();
}
function color_formatRgb3() {
  return this.rgb().formatRgb();
}
function color3(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex3.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn3(m) : l === 3 ? new Rgb3(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba3(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba3(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger3.exec(format2)) ? new Rgb3(m[1], m[2], m[3], 1) : (m = reRgbPercent3.exec(format2)) ? new Rgb3(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger3.exec(format2)) ? rgba3(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent3.exec(format2)) ? rgba3(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent3.exec(format2)) ? hsla3(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent3.exec(format2)) ? hsla3(m[1], m[2] / 100, m[3] / 100, m[4]) : named3.hasOwnProperty(format2) ? rgbn3(named3[format2]) : format2 === "transparent" ? new Rgb3(NaN, NaN, NaN, 0) : null;
}
function rgbn3(n) {
  return new Rgb3(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba3(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb3(r, g, b, a);
}
function rgbConvert3(o) {
  if (!(o instanceof Color3)) o = color3(o);
  if (!o) return new Rgb3();
  o = o.rgb();
  return new Rgb3(o.r, o.g, o.b, o.opacity);
}
function rgb3(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert3(r) : new Rgb3(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb3(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default3(Rgb3, rgb3, extend3(Color3, {
  brighter: function(k) {
    k = k == null ? brighter3 : Math.pow(brighter3, k);
    return new Rgb3(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker3 : Math.pow(darker3, k);
    return new Rgb3(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex3,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex3,
  formatRgb: rgb_formatRgb3,
  toString: rgb_formatRgb3
}));
function rgb_formatHex3() {
  return "#" + hex3(this.r) + hex3(this.g) + hex3(this.b);
}
function rgb_formatRgb3() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex3(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla3(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl3(h, s, l, a);
}
function hslConvert3(o) {
  if (o instanceof Hsl3) return new Hsl3(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color3)) o = color3(o);
  if (!o) return new Hsl3();
  if (o instanceof Hsl3) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min, l = (max2 + min) / 2;
  if (s) {
    if (r === max2) h = (g - b) / s + (g < b) * 6;
    else if (g === max2) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min : 2 - max2 - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl3(h, s, l, o.opacity);
}
function hsl5(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert3(h) : new Hsl3(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl3(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default3(Hsl3, hsl5, extend3(Color3, {
  brighter: function(k) {
    k = k == null ? brighter3 : Math.pow(brighter3, k);
    return new Hsl3(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker3 : Math.pow(darker3, k);
    return new Hsl3(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb3(hsl2rgb3(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb3(h, m1, m2), hsl2rgb3(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
function hsl2rgb3(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-scale-chromatic/node_modules/d3-color/src/math.js
var deg2rad3 = Math.PI / 180;
var rad2deg3 = 180 / Math.PI;

// node_modules/d3-scale-chromatic/node_modules/d3-color/src/lab.js
var K3 = 18;
var Xn3 = 0.96422;
var Yn3 = 1;
var Zn3 = 0.82521;
var t04 = 4 / 29;
var t14 = 6 / 29;
var t23 = 3 * t14 * t14;
var t33 = t14 * t14 * t14;
function labConvert3(o) {
  if (o instanceof Lab3) return new Lab3(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl3) return hcl2lab3(o);
  if (!(o instanceof Rgb3)) o = rgbConvert3(o);
  var r = rgb2lrgb3(o.r), g = rgb2lrgb3(o.g), b = rgb2lrgb3(o.b), y2 = xyz2lab3((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn3), x2, z;
  if (r === g && g === b) x2 = z = y2;
  else {
    x2 = xyz2lab3((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn3);
    z = xyz2lab3((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn3);
  }
  return new Lab3(116 * y2 - 16, 500 * (x2 - y2), 200 * (y2 - z), o.opacity);
}
function lab5(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert3(l) : new Lab3(l, a, b, opacity == null ? 1 : opacity);
}
function Lab3(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}
define_default3(Lab3, lab5, extend3(Color3, {
  brighter: function(k) {
    return new Lab3(this.l + K3 * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab3(this.l - K3 * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y2 = (this.l + 16) / 116, x2 = isNaN(this.a) ? y2 : y2 + this.a / 500, z = isNaN(this.b) ? y2 : y2 - this.b / 200;
    x2 = Xn3 * lab2xyz3(x2);
    y2 = Yn3 * lab2xyz3(y2);
    z = Zn3 * lab2xyz3(z);
    return new Rgb3(lrgb2rgb3(3.1338561 * x2 - 1.6168667 * y2 - 0.4906146 * z), lrgb2rgb3(-0.9787684 * x2 + 1.9161415 * y2 + 0.033454 * z), lrgb2rgb3(0.0719453 * x2 - 0.2289914 * y2 + 1.4052427 * z), this.opacity);
  }
}));
function xyz2lab3(t) {
  return t > t33 ? Math.pow(t, 1 / 3) : t / t23 + t04;
}
function lab2xyz3(t) {
  return t > t14 ? t * t * t : t23 * (t - t04);
}
function lrgb2rgb3(x2) {
  return 255 * (x2 <= 31308e-7 ? 12.92 * x2 : 1.055 * Math.pow(x2, 1 / 2.4) - 0.055);
}
function rgb2lrgb3(x2) {
  return (x2 /= 255) <= 0.04045 ? x2 / 12.92 : Math.pow((x2 + 0.055) / 1.055, 2.4);
}
function hclConvert3(o) {
  if (o instanceof Hcl3) return new Hcl3(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab3)) o = labConvert3(o);
  if (o.a === 0 && o.b === 0) return new Hcl3(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * rad2deg3;
  return new Hcl3(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl5(h, c3, l, opacity) {
  return arguments.length === 1 ? hclConvert3(h) : new Hcl3(h, c3, l, opacity == null ? 1 : opacity);
}
function Hcl3(h, c3, l, opacity) {
  this.h = +h;
  this.c = +c3;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab3(o) {
  if (isNaN(o.h)) return new Lab3(o.l, 0, 0, o.opacity);
  var h = o.h * deg2rad3;
  return new Lab3(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default3(Hcl3, hcl5, extend3(Color3, {
  brighter: function(k) {
    return new Hcl3(this.h, this.c, this.l + K3 * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl3(this.h, this.c, this.l - K3 * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return hcl2lab3(this).rgb();
  }
}));

// node_modules/d3-scale-chromatic/node_modules/d3-color/src/cubehelix.js
var A5 = -0.14861;
var B3 = 1.78277;
var C3 = -0.29227;
var D3 = -0.90649;
var E3 = 1.97294;
var ED3 = E3 * D3;
var EB3 = E3 * B3;
var BC_DA3 = B3 * C3 - D3 * A5;
function cubehelixConvert3(o) {
  if (o instanceof Cubehelix3) return new Cubehelix3(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb3)) o = rgbConvert3(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA3 * b + ED3 * r - EB3 * g) / (BC_DA3 + ED3 - EB3), bl = b - l, k = (E3 * (g - l) - C3 * bl) / D3, s = Math.sqrt(k * k + bl * bl) / (E3 * l * (1 - l)), h = s ? Math.atan2(k, bl) * rad2deg3 - 120 : NaN;
  return new Cubehelix3(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix5(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert3(h) : new Cubehelix3(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix3(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default3(Cubehelix3, cubehelix5, extend3(Color3, {
  brighter: function(k) {
    k = k == null ? brighter3 : Math.pow(brighter3, k);
    return new Cubehelix3(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker3 : Math.pow(darker3, k);
    return new Cubehelix3(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad3, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh3 = Math.cos(h), sinh3 = Math.sin(h);
    return new Rgb3(255 * (l + a * (A5 * cosh3 + B3 * sinh3)), 255 * (l + a * (C3 * cosh3 + D3 * sinh3)), 255 * (l + a * (E3 * cosh3)), this.opacity);
  }
}));

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/basis.js
function basis3(t16, v0, v1, v2, v3) {
  var t25 = t16 * t16, t35 = t25 * t16;
  return ((1 - 3 * t16 + 3 * t25 - t35) * v0 + (4 - 6 * t25 + 3 * t35) * v1 + (1 + 3 * t16 + 3 * t25 - 3 * t35) * v2 + t35 * v3) / 6;
}
function basis_default4(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis3((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default4(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis3((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/constant.js
function constant_default17(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/color.js
function linear5(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential3(a, b, y2) {
  return a = Math.pow(a, y2), b = Math.pow(b, y2) - a, y2 = 1 / y2, function(t) {
    return Math.pow(a + t * b, y2);
  };
}
function hue3(a, b) {
  var d = b - a;
  return d ? linear5(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default17(isNaN(a) ? b : a);
}
function gamma3(y2) {
  return (y2 = +y2) === 1 ? nogamma3 : function(a, b) {
    return b - a ? exponential3(a, b, y2) : constant_default17(isNaN(a) ? b : a);
  };
}
function nogamma3(a, b) {
  var d = b - a;
  return d ? linear5(a, d) : constant_default17(isNaN(a) ? b : a);
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/rgb.js
var rgb_default3 = function rgbGamma3(y2) {
  var color5 = gamma3(y2);
  function rgb5(start4, end) {
    var r = color5((start4 = rgb3(start4)).r, (end = rgb3(end)).r), g = color5(start4.g, end.g), b = color5(start4.b, end.b), opacity = nogamma3(start4.opacity, end.opacity);
    return function(t) {
      start4.r = r(t);
      start4.g = g(t);
      start4.b = b(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  }
  rgb5.gamma = rgbGamma3;
  return rgb5;
}(1);
function rgbSpline3(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color5;
    for (i = 0; i < n; ++i) {
      color5 = rgb3(colors[i]);
      r[i] = color5.r || 0;
      g[i] = color5.g || 0;
      b[i] = color5.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color5.opacity = 1;
    return function(t) {
      color5.r = r(t);
      color5.g = g(t);
      color5.b = b(t);
      return color5 + "";
    };
  };
}
var rgbBasis3 = rgbSpline3(basis_default4);
var rgbBasisClosed3 = rgbSpline3(basisClosed_default4);

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/number.js
function number_default8(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/string.js
var reA3 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB3 = new RegExp(reA3.source, "g");

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/transform/decompose.js
var degrees4 = 180 / Math.PI;
var identity5 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default3(a, b, c3, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c3 + b * d) c3 -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c3 * c3 + d * d)) c3 /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c3) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees4,
    skewX: Math.atan(skewX) * degrees4,
    scaleX,
    scaleY
  };
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/transform/parse.js
var cssNode3;
var cssRoot3;
var cssView3;
var svgNode3;
function parseCss3(value) {
  if (value === "none") return identity5;
  if (!cssNode3) cssNode3 = document.createElement("DIV"), cssRoot3 = document.documentElement, cssView3 = document.defaultView;
  cssNode3.style.transform = value;
  value = cssView3.getComputedStyle(cssRoot3.appendChild(cssNode3), null).getPropertyValue("transform");
  cssRoot3.removeChild(cssNode3);
  value = value.slice(7, -1).split(",");
  return decompose_default3(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}
function parseSvg3(value) {
  if (value == null) return identity5;
  if (!svgNode3) svgNode3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode3.setAttribute("transform", value);
  if (!(value = svgNode3.transform.baseVal.consolidate())) return identity5;
  value = value.matrix;
  return decompose_default3(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform3(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: number_default8(xa, xb)
      }, {
        i: i - 2,
        x: number_default8(ya, yb)
      });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({
        i: s.push(pop(s) + "rotate(", null, degParen) - 2,
        x: number_default8(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({
        i: s.push(pop(s) + "skewX(", null, degParen) - 2,
        x: number_default8(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: number_default8(xa, xb)
      }, {
        i: i - 2,
        x: number_default8(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss3 = interpolateTransform3(parseCss3, "px, ", "px)", "deg)");
var interpolateTransformSvg3 = interpolateTransform3(parseSvg3, ", ", ")", ")");

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/hsl.js
function hsl6(hue5) {
  return function(start4, end) {
    var h = hue5((start4 = hsl5(start4)).h, (end = hsl5(end)).h), s = nogamma3(start4.s, end.s), l = nogamma3(start4.l, end.l), opacity = nogamma3(start4.opacity, end.opacity);
    return function(t) {
      start4.h = h(t);
      start4.s = s(t);
      start4.l = l(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  };
}
var hsl_default3 = hsl6(hue3);
var hslLong3 = hsl6(nogamma3);

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/hcl.js
function hcl6(hue5) {
  return function(start4, end) {
    var h = hue5((start4 = hcl5(start4)).h, (end = hcl5(end)).h), c3 = nogamma3(start4.c, end.c), l = nogamma3(start4.l, end.l), opacity = nogamma3(start4.opacity, end.opacity);
    return function(t) {
      start4.h = h(t);
      start4.c = c3(t);
      start4.l = l(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  };
}
var hcl_default3 = hcl6(hue3);
var hclLong3 = hcl6(nogamma3);

// node_modules/d3-scale-chromatic/node_modules/d3-interpolate/src/cubehelix.js
function cubehelix6(hue5) {
  return function cubehelixGamma(y2) {
    y2 = +y2;
    function cubehelix9(start4, end) {
      var h = hue5((start4 = cubehelix5(start4)).h, (end = cubehelix5(end)).h), s = nogamma3(start4.s, end.s), l = nogamma3(start4.l, end.l), opacity = nogamma3(start4.opacity, end.opacity);
      return function(t) {
        start4.h = h(t);
        start4.s = s(t);
        start4.l = l(Math.pow(t, y2));
        start4.opacity = opacity(t);
        return start4 + "";
      };
    }
    cubehelix9.gamma = cubehelixGamma;
    return cubehelix9;
  }(1);
}
var cubehelix_default3 = cubehelix6(hue3);
var cubehelixLong3 = cubehelix6(nogamma3);

// node_modules/d3-scale-chromatic/src/ramp.js
function ramp_default(scheme28) {
  return rgbBasis3(scheme28[scheme28.length - 1]);
}

// node_modules/d3-scale-chromatic/src/diverging/BrBG.js
var scheme = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(colors_default);
var BrBG_default = ramp_default(scheme);

// node_modules/d3-scale-chromatic/src/diverging/PRGn.js
var scheme2 = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(colors_default);
var PRGn_default = ramp_default(scheme2);

// node_modules/d3-scale-chromatic/src/diverging/PiYG.js
var scheme3 = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(colors_default);
var PiYG_default = ramp_default(scheme3);

// node_modules/d3-scale-chromatic/src/diverging/PuOr.js
var scheme4 = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(colors_default);
var PuOr_default = ramp_default(scheme4);

// node_modules/d3-scale-chromatic/src/diverging/RdBu.js
var scheme5 = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(colors_default);
var RdBu_default = ramp_default(scheme5);

// node_modules/d3-scale-chromatic/src/diverging/RdGy.js
var scheme6 = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(colors_default);
var RdGy_default = ramp_default(scheme6);

// node_modules/d3-scale-chromatic/src/diverging/RdYlBu.js
var scheme7 = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(colors_default);
var RdYlBu_default = ramp_default(scheme7);

// node_modules/d3-scale-chromatic/src/diverging/RdYlGn.js
var scheme8 = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(colors_default);
var RdYlGn_default = ramp_default(scheme8);

// node_modules/d3-scale-chromatic/src/diverging/Spectral.js
var scheme9 = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(colors_default);
var Spectral_default = ramp_default(scheme9);

// node_modules/d3-scale-chromatic/src/sequential-multi/BuGn.js
var scheme10 = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(colors_default);
var BuGn_default = ramp_default(scheme10);

// node_modules/d3-scale-chromatic/src/sequential-multi/BuPu.js
var scheme11 = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(colors_default);
var BuPu_default = ramp_default(scheme11);

// node_modules/d3-scale-chromatic/src/sequential-multi/GnBu.js
var scheme12 = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(colors_default);
var GnBu_default = ramp_default(scheme12);

// node_modules/d3-scale-chromatic/src/sequential-multi/OrRd.js
var scheme13 = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(colors_default);
var OrRd_default = ramp_default(scheme13);

// node_modules/d3-scale-chromatic/src/sequential-multi/PuBuGn.js
var scheme14 = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(colors_default);
var PuBuGn_default = ramp_default(scheme14);

// node_modules/d3-scale-chromatic/src/sequential-multi/PuBu.js
var scheme15 = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(colors_default);
var PuBu_default = ramp_default(scheme15);

// node_modules/d3-scale-chromatic/src/sequential-multi/PuRd.js
var scheme16 = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(colors_default);
var PuRd_default = ramp_default(scheme16);

// node_modules/d3-scale-chromatic/src/sequential-multi/RdPu.js
var scheme17 = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(colors_default);
var RdPu_default = ramp_default(scheme17);

// node_modules/d3-scale-chromatic/src/sequential-multi/YlGnBu.js
var scheme18 = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(colors_default);
var YlGnBu_default = ramp_default(scheme18);

// node_modules/d3-scale-chromatic/src/sequential-multi/YlGn.js
var scheme19 = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(colors_default);
var YlGn_default = ramp_default(scheme19);

// node_modules/d3-scale-chromatic/src/sequential-multi/YlOrBr.js
var scheme20 = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(colors_default);
var YlOrBr_default = ramp_default(scheme20);

// node_modules/d3-scale-chromatic/src/sequential-multi/YlOrRd.js
var scheme21 = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(colors_default);
var YlOrRd_default = ramp_default(scheme21);

// node_modules/d3-scale-chromatic/src/sequential-single/Blues.js
var scheme22 = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(colors_default);
var Blues_default = ramp_default(scheme22);

// node_modules/d3-scale-chromatic/src/sequential-single/Greens.js
var scheme23 = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(colors_default);
var Greens_default = ramp_default(scheme23);

// node_modules/d3-scale-chromatic/src/sequential-single/Greys.js
var scheme24 = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(colors_default);
var Greys_default = ramp_default(scheme24);

// node_modules/d3-scale-chromatic/src/sequential-single/Purples.js
var scheme25 = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(colors_default);
var Purples_default = ramp_default(scheme25);

// node_modules/d3-scale-chromatic/src/sequential-single/Reds.js
var scheme26 = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(colors_default);
var Reds_default = ramp_default(scheme26);

// node_modules/d3-scale-chromatic/src/sequential-single/Oranges.js
var scheme27 = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(colors_default);
var Oranges_default = ramp_default(scheme27);

// node_modules/d3-scale-chromatic/src/sequential-multi/cividis.js
function cividis_default(t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67))))))) + ")";
}

// node_modules/d3-scale-chromatic/src/sequential-multi/cubehelix.js
var cubehelix_default4 = cubehelixLong3(cubehelix5(300, 0.5, 0), cubehelix5(-240, 0.5, 1));

// node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js
var warm = cubehelixLong3(cubehelix5(-100, 0.75, 0.35), cubehelix5(80, 1.5, 0.8));
var cool = cubehelixLong3(cubehelix5(260, 0.75, 0.35), cubehelix5(80, 1.5, 0.8));
var c = cubehelix5();
function rainbow_default(t) {
  if (t < 0 || t > 1) t -= Math.floor(t);
  var ts = Math.abs(t - 0.5);
  c.h = 360 * t - 100;
  c.s = 1.5 - 1.5 * ts;
  c.l = 0.8 - 0.9 * ts;
  return c + "";
}

// node_modules/d3-scale-chromatic/src/sequential-multi/sinebow.js
var c2 = rgb3();
var pi_1_3 = Math.PI / 3;
var pi_2_3 = Math.PI * 2 / 3;
function sinebow_default(t) {
  var x2;
  t = (0.5 - t) * Math.PI;
  c2.r = 255 * (x2 = Math.sin(t)) * x2;
  c2.g = 255 * (x2 = Math.sin(t + pi_1_3)) * x2;
  c2.b = 255 * (x2 = Math.sin(t + pi_2_3)) * x2;
  return c2 + "";
}

// node_modules/d3-scale-chromatic/src/sequential-multi/turbo.js
function turbo_default(t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66))))))) + ")";
}

// node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js
function ramp(range2) {
  var n = range2.length;
  return function(t) {
    return range2[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
var viridis_default = ramp(colors_default("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var magma = ramp(colors_default("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var inferno = ramp(colors_default("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var plasma = ramp(colors_default("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

// node_modules/d3/node_modules/d3-timer/src/timer.js
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
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now2() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail2 !== this) {
      if (taskTail2) taskTail2._next = this;
      else taskHead2 = this;
      taskTail2 = this;
    }
    this._call = callback;
    this._time = time;
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
function timer2(callback, delay, time) {
  var t = new Timer2();
  t.restart(callback, delay, time);
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
  var now4 = clock2.now(), delay = now4 - clockLast2;
  if (delay > pokeDelay2) clockSkew2 -= delay, clockLast2 = now4;
}
function nap2() {
  var t06, t16 = taskHead2, t25, time = Infinity;
  while (t16) {
    if (t16._call) {
      if (time > t16._time) time = t16._time;
      t06 = t16, t16 = t16._next;
    } else {
      t25 = t16._next, t16._next = null;
      t16 = t06 ? t06._next = t25 : taskHead2 = t25;
    }
  }
  taskTail2 = t06;
  sleep2(time);
}
function sleep2(time) {
  if (frame2) return;
  if (timeout2) timeout2 = clearTimeout(timeout2);
  var delay = time - clockNow2;
  if (delay > 24) {
    if (time < Infinity) timeout2 = setTimeout(wake2, time - clock2.now() - clockSkew2);
    if (interval2) interval2 = clearInterval(interval2);
  } else {
    if (!interval2) clockLast2 = clock2.now(), interval2 = setInterval(poke2, pokeDelay2);
    frame2 = 1, setFrame2(wake2);
  }
}

// node_modules/d3/node_modules/d3-timer/src/timeout.js
function timeout_default2(callback, delay, time) {
  var t = new Timer2();
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

// node_modules/d3/node_modules/d3-timer/src/interval.js
function interval_default2(callback, delay, time) {
  var t = new Timer2(), total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  delay = +delay, time = time == null ? now2() : +time;
  t.restart(function tick(elapsed) {
    elapsed += total;
    t.restart(tick, total += delay, time);
    callback(elapsed);
  }, delay, time);
  return t;
}

// node_modules/d3/node_modules/d3-transition/src/transition/schedule.js
var emptyOn2 = dispatch_default3("start", "end", "cancel", "interrupt");
var emptyTween2 = [];
var CREATED2 = 0;
var SCHEDULED2 = 1;
var STARTING2 = 2;
var STARTED2 = 3;
var RUNNING2 = 4;
var ENDING2 = 5;
var ENDED2 = 6;
function schedule_default2(node, name, id4, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id4 in schedules) return;
  create2(node, id4, {
    name,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn2,
    tween: emptyTween2,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED2
  });
}
function init2(node, id4) {
  var schedule = get4(node, id4);
  if (schedule.state > CREATED2) throw new Error("too late; already scheduled");
  return schedule;
}
function set4(node, id4) {
  var schedule = get4(node, id4);
  if (schedule.state > STARTED2) throw new Error("too late; already running");
  return schedule;
}
function get4(node, id4) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id4])) throw new Error("transition not found");
  return schedule;
}
function create2(node, id4, self) {
  var schedules = node.__transition, tween;
  schedules[id4] = self;
  self.timer = timer2(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED2;
    self.timer.restart(start4, self.delay, self.time);
    if (self.delay <= elapsed) start4(elapsed - self.delay);
  }
  function start4(elapsed) {
    var i, j, n, o;
    if (self.state !== SCHEDULED2) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;
      if (o.state === STARTED2) return timeout_default2(start4);
      if (o.state === RUNNING2) {
        o.state = ENDED2;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id4) {
        o.state = ENDED2;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default2(function() {
      if (self.state === STARTED2) {
        self.state = RUNNING2;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING2;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING2) return;
    self.state = STARTED2;
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING2, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING2) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED2;
    self.timer.stop();
    delete schedules[id4];
    for (var i in schedules) return;
    delete node.__transition;
  }
}

// node_modules/d3/node_modules/d3-transition/src/interrupt.js
function interrupt_default3(node, name) {
  var schedules = node.__transition, schedule, active, empty5 = true, i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty5 = false;
      continue;
    }
    active = schedule.state > STARTING2 && schedule.state < ENDING2;
    schedule.state = ENDED2;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty5) delete node.__transition;
}

// node_modules/d3/node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default4(name) {
  return this.each(function() {
    interrupt_default3(this, name);
  });
}

// node_modules/d3/node_modules/d3-transition/src/transition/tween.js
function tweenRemove2(id4, name) {
  var tween0, tween1;
  return function() {
    var schedule = set4(this, id4), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction2(id4, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule = set4(this, id4), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {
        name,
        value
      }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default2(name, value) {
  var id4 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get4(this.node(), id4).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove2 : tweenFunction2)(id4, name, value));
}
function tweenValue2(transition4, name, value) {
  var id4 = transition4._id;
  transition4.each(function() {
    var schedule = set4(this, id4);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get4(node, id4).value[name];
  };
}

// node_modules/d3/node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default3(a, b) {
  var c3;
  return (typeof b === "number" ? number_default6 : b instanceof color2 ? rgb_default2 : (c3 = color2(b)) ? (b = c3, rgb_default2) : string_default2)(a, b);
}

// node_modules/d3/node_modules/d3-transition/src/transition/attr.js
function attrRemove4(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS4(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant4(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS4(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction4(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS4(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default4(name, value) {
  var fullname = namespace_default2(name), i = fullname === "transform" ? interpolateTransformSvg2 : interpolate_default3;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS4 : attrFunction4)(fullname, i, tweenValue2(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS4 : attrRemove4)(fullname) : (fullname.local ? attrConstantNS4 : attrConstant4)(fullname, i, value));
}

// node_modules/d3/node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate2(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS2(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS2(fullname, value) {
  var t06, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t06 = (i0 = i) && attrInterpolateNS2(fullname, i);
    return t06;
  }
  tween._value = value;
  return tween;
}
function attrTween2(name, value) {
  var t06, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t06 = (i0 = i) && attrInterpolate2(name, i);
    return t06;
  }
  tween._value = value;
  return tween;
}
function attrTween_default2(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace_default2(name);
  return this.tween(key, (fullname.local ? attrTweenNS2 : attrTween2)(fullname, value));
}

// node_modules/d3/node_modules/d3-transition/src/transition/delay.js
function delayFunction2(id4, value) {
  return function() {
    init2(this, id4).delay = +value.apply(this, arguments);
  };
}
function delayConstant2(id4, value) {
  return value = +value, function() {
    init2(this, id4).delay = value;
  };
}
function delay_default2(value) {
  var id4 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction2 : delayConstant2)(id4, value)) : get4(this.node(), id4).delay;
}

// node_modules/d3/node_modules/d3-transition/src/transition/duration.js
function durationFunction2(id4, value) {
  return function() {
    set4(this, id4).duration = +value.apply(this, arguments);
  };
}
function durationConstant2(id4, value) {
  return value = +value, function() {
    set4(this, id4).duration = value;
  };
}
function duration_default2(value) {
  var id4 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction2 : durationConstant2)(id4, value)) : get4(this.node(), id4).duration;
}

// node_modules/d3/node_modules/d3-transition/src/transition/ease.js
function easeConstant2(id4, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set4(this, id4).ease = value;
  };
}
function ease_default2(value) {
  var id4 = this._id;
  return arguments.length ? this.each(easeConstant2(id4, value)) : get4(this.node(), id4).ease;
}

// node_modules/d3/node_modules/d3-transition/src/transition/filter.js
function filter_default4(match) {
  if (typeof match !== "function") match = matcher_default2(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition2(subgroups, this._parents, this._name, this._id);
}

// node_modules/d3/node_modules/d3-transition/src/transition/merge.js
function merge_default8(transition4) {
  if (transition4._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition4._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition2(merges, this._parents, this._name, this._id);
}

// node_modules/d3/node_modules/d3-transition/src/transition/on.js
function start2(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction2(id4, name, listener) {
  var on0, on1, sit = start2(name) ? init2 : set4;
  return function() {
    var schedule = sit(this, id4), on = schedule.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default4(name, listener) {
  var id4 = this._id;
  return arguments.length < 2 ? get4(this.node(), id4).on.on(name) : this.each(onFunction2(id4, name, listener));
}

// node_modules/d3/node_modules/d3-transition/src/transition/remove.js
function removeFunction2(id4) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id4) return;
    if (parent) parent.removeChild(this);
  };
}
function remove_default4() {
  return this.on("end.remove", removeFunction2(this._id));
}

// node_modules/d3/node_modules/d3-transition/src/transition/select.js
function select_default6(select) {
  var name = this._name, id4 = this._id;
  if (typeof select !== "function") select = selector_default2(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default2(subgroup[i], name, id4, i, subgroup, get4(node, id4));
      }
    }
  }
  return new Transition2(subgroups, this._parents, name, id4);
}

// node_modules/d3/node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default6(select) {
  var name = this._name, id4 = this._id;
  if (typeof select !== "function") select = selectorAll_default2(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit4 = get4(node, id4), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule_default2(child, name, id4, k, children, inherit4);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }
  return new Transition2(subgroups, parents, name, id4);
}

// node_modules/d3/node_modules/d3-transition/src/transition/selection.js
var Selection4 = selection_default3.prototype.constructor;
function selection_default4() {
  return new Selection4(this._groups, this._parents);
}

// node_modules/d3/node_modules/d3-transition/src/transition/style.js
function styleNull2(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue2(this, name), string1 = (this.style.removeProperty(name), styleValue2(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove4(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant4(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue2(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction4(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue2(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue2(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove2(id4, name) {
  var on0, on1, listener0, key = "style." + name, event4 = "end." + key, remove4;
  return function() {
    var schedule = set4(this, id4), on = schedule.on, listener = schedule.value[key] == null ? remove4 || (remove4 = styleRemove4(name)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event4, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default4(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss2 : interpolate_default3;
  return value == null ? this.styleTween(name, styleNull2(name, i)).on("end.style." + name, styleRemove4(name)) : typeof value === "function" ? this.styleTween(name, styleFunction4(name, i, tweenValue2(this, "style." + name, value))).each(styleMaybeRemove2(this._id, name)) : this.styleTween(name, styleConstant4(name, i, value), priority).on("end.style." + name, null);
}

// node_modules/d3/node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate2(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween2(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate2(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default2(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween2(name, value, priority == null ? "" : priority));
}

// node_modules/d3/node_modules/d3-transition/src/transition/text.js
function textConstant4(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction4(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default5(value) {
  return this.tween("text", typeof value === "function" ? textFunction4(tweenValue2(this, "text", value)) : textConstant4(value == null ? "" : value + ""));
}

// node_modules/d3/node_modules/d3-transition/src/transition/textTween.js
function textInterpolate2(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween2(value) {
  var t06, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t06 = (i0 = i) && textInterpolate2(i);
    return t06;
  }
  tween._value = value;
  return tween;
}
function textTween_default2(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween2(value));
}

// node_modules/d3/node_modules/d3-transition/src/transition/transition.js
function transition_default3() {
  var name = this._name, id0 = this._id, id1 = newId2();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit4 = get4(node, id0);
        schedule_default2(node, name, id1, i, group, {
          time: inherit4.time + inherit4.delay + inherit4.duration,
          delay: 0,
          duration: inherit4.duration,
          ease: inherit4.ease
        });
      }
    }
  }
  return new Transition2(groups, this._parents, name, id1);
}

// node_modules/d3/node_modules/d3-transition/src/transition/end.js
function end_default2() {
  var on0, on1, that = this, id4 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {
      value: reject
    }, end = {
      value: function() {
        if (--size === 0) resolve();
      }
    };
    that.each(function() {
      var schedule = set4(this, id4), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
  });
}

// node_modules/d3/node_modules/d3-transition/src/transition/index.js
var id2 = 0;
function Transition2(groups, parents, name, id4) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id4;
}
function transition2(name) {
  return selection_default3().transition(name);
}
function newId2() {
  return ++id2;
}
var selection_prototype2 = selection_default3.prototype;
Transition2.prototype = transition2.prototype = {
  constructor: Transition2,
  select: select_default6,
  selectAll: selectAll_default6,
  filter: filter_default4,
  merge: merge_default8,
  selection: selection_default4,
  transition: transition_default3,
  call: selection_prototype2.call,
  nodes: selection_prototype2.nodes,
  node: selection_prototype2.node,
  size: selection_prototype2.size,
  empty: selection_prototype2.empty,
  each: selection_prototype2.each,
  on: on_default4,
  attr: attr_default4,
  attrTween: attrTween_default2,
  style: style_default4,
  styleTween: styleTween_default2,
  text: text_default5,
  textTween: textTween_default2,
  remove: remove_default4,
  tween: tween_default2,
  delay: delay_default2,
  duration: duration_default2,
  ease: ease_default2,
  end: end_default2
};

// node_modules/d3/node_modules/d3-transition/src/selection/transition.js
var defaultTiming2 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit2(node, id4) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id4])) {
    if (!(node = node.parentNode)) {
      return defaultTiming2.time = now2(), defaultTiming2;
    }
  }
  return timing;
}
function transition_default4(name) {
  var id4, timing;
  if (name instanceof Transition2) {
    id4 = name._id, name = name._name;
  } else {
    id4 = newId2(), (timing = defaultTiming2).time = now2(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default2(node, name, id4, i, group, timing || inherit2(node, id4));
      }
    }
  }
  return new Transition2(groups, this._parents, name, id4);
}

// node_modules/d3/node_modules/d3-transition/src/selection/index.js
selection_default3.prototype.interrupt = interrupt_default4;
selection_default3.prototype.transition = transition_default4;

// node_modules/d3/node_modules/d3-transition/src/active.js
var root3 = [null];
function active_default2(node, name) {
  var schedules = node.__transition, schedule, i;
  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > SCHEDULED2 && schedule.name === name) {
        return new Transition2([[node]], root3, name, +i);
      }
    }
  }
  return null;
}

// node_modules/d3-voronoi/src/constant.js
function constant_default18(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-voronoi/src/point.js
function x(d) {
  return d[0];
}
function y(d) {
  return d[1];
}

// node_modules/d3-voronoi/src/RedBlackTree.js
function RedBlackTree() {
  this._ = null;
}
function RedBlackNode(node) {
  node.U = // parent node
  node.C = // color - true for red, false for black
  node.L = // left node
  node.R = // right node
  node.P = // previous node
  node.N = null;
}
RedBlackTree.prototype = {
  constructor: RedBlackTree,
  insert: function(after, node) {
    var parent, grandpa, uncle;
    if (after) {
      node.P = after;
      node.N = after.N;
      if (after.N) after.N.P = node;
      after.N = node;
      if (after.R) {
        after = after.R;
        while (after.L) after = after.L;
        after.L = node;
      } else {
        after.R = node;
      }
      parent = after;
    } else if (this._) {
      after = RedBlackFirst(this._);
      node.P = null;
      node.N = after;
      after.P = after.L = node;
      parent = after;
    } else {
      node.P = node.N = null;
      this._ = node;
      parent = null;
    }
    node.L = node.R = null;
    node.U = parent;
    node.C = true;
    after = node;
    while (parent && parent.C) {
      grandpa = parent.U;
      if (parent === grandpa.L) {
        uncle = grandpa.R;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.R) {
            RedBlackRotateLeft(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateRight(this, grandpa);
        }
      } else {
        uncle = grandpa.L;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.L) {
            RedBlackRotateRight(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateLeft(this, grandpa);
        }
      }
      parent = after.U;
    }
    this._.C = false;
  },
  remove: function(node) {
    if (node.N) node.N.P = node.P;
    if (node.P) node.P.N = node.N;
    node.N = node.P = null;
    var parent = node.U, sibling, left2 = node.L, right2 = node.R, next, red;
    if (!left2) next = right2;
    else if (!right2) next = left2;
    else next = RedBlackFirst(right2);
    if (parent) {
      if (parent.L === node) parent.L = next;
      else parent.R = next;
    } else {
      this._ = next;
    }
    if (left2 && right2) {
      red = next.C;
      next.C = node.C;
      next.L = left2;
      left2.U = next;
      if (next !== right2) {
        parent = next.U;
        next.U = node.U;
        node = next.R;
        parent.L = node;
        next.R = right2;
        right2.U = next;
      } else {
        next.U = parent;
        parent = next;
        node = next.R;
      }
    } else {
      red = node.C;
      node = next;
    }
    if (node) node.U = parent;
    if (red) return;
    if (node && node.C) {
      node.C = false;
      return;
    }
    do {
      if (node === this._) break;
      if (node === parent.L) {
        sibling = parent.R;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateLeft(this, parent);
          sibling = parent.R;
        }
        if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
          if (!sibling.R || !sibling.R.C) {
            sibling.L.C = false;
            sibling.C = true;
            RedBlackRotateRight(this, sibling);
            sibling = parent.R;
          }
          sibling.C = parent.C;
          parent.C = sibling.R.C = false;
          RedBlackRotateLeft(this, parent);
          node = this._;
          break;
        }
      } else {
        sibling = parent.L;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateRight(this, parent);
          sibling = parent.L;
        }
        if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
          if (!sibling.L || !sibling.L.C) {
            sibling.R.C = false;
            sibling.C = true;
            RedBlackRotateLeft(this, sibling);
            sibling = parent.L;
          }
          sibling.C = parent.C;
          parent.C = sibling.L.C = false;
          RedBlackRotateRight(this, parent);
          node = this._;
          break;
        }
      }
      sibling.C = true;
      node = parent;
      parent = parent.U;
    } while (!node.C);
    if (node) node.C = false;
  }
};
function RedBlackRotateLeft(tree, node) {
  var p = node, q = node.R, parent = p.U;
  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }
  q.U = parent;
  p.U = q;
  p.R = q.L;
  if (p.R) p.R.U = p;
  q.L = p;
}
function RedBlackRotateRight(tree, node) {
  var p = node, q = node.L, parent = p.U;
  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }
  q.U = parent;
  p.U = q;
  p.L = q.R;
  if (p.L) p.L.U = p;
  q.R = p;
}
function RedBlackFirst(node) {
  while (node.L) node = node.L;
  return node;
}
var RedBlackTree_default = RedBlackTree;

// node_modules/d3-voronoi/src/Edge.js
function createEdge(left2, right2, v0, v1) {
  var edge = [null, null], index = edges.push(edge) - 1;
  edge.left = left2;
  edge.right = right2;
  if (v0) setEdgeEnd(edge, left2, right2, v0);
  if (v1) setEdgeEnd(edge, right2, left2, v1);
  cells[left2.index].halfedges.push(index);
  cells[right2.index].halfedges.push(index);
  return edge;
}
function createBorderEdge(left2, v0, v1) {
  var edge = [v0, v1];
  edge.left = left2;
  return edge;
}
function setEdgeEnd(edge, left2, right2, vertex) {
  if (!edge[0] && !edge[1]) {
    edge[0] = vertex;
    edge.left = left2;
    edge.right = right2;
  } else if (edge.left === right2) {
    edge[1] = vertex;
  } else {
    edge[0] = vertex;
  }
}
function clipEdge(edge, x06, y06, x12, y12) {
  var a = edge[0], b = edge[1], ax = a[0], ay = a[1], bx = b[0], by = b[1], t06 = 0, t16 = 1, dx = bx - ax, dy = by - ay, r;
  r = x06 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t06) return;
    if (r < t16) t16 = r;
  } else if (dx > 0) {
    if (r > t16) return;
    if (r > t06) t06 = r;
  }
  r = x12 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t16) return;
    if (r > t06) t06 = r;
  } else if (dx > 0) {
    if (r < t06) return;
    if (r < t16) t16 = r;
  }
  r = y06 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t06) return;
    if (r < t16) t16 = r;
  } else if (dy > 0) {
    if (r > t16) return;
    if (r > t06) t06 = r;
  }
  r = y12 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t16) return;
    if (r > t06) t06 = r;
  } else if (dy > 0) {
    if (r < t06) return;
    if (r < t16) t16 = r;
  }
  if (!(t06 > 0) && !(t16 < 1)) return true;
  if (t06 > 0) edge[0] = [ax + t06 * dx, ay + t06 * dy];
  if (t16 < 1) edge[1] = [ax + t16 * dx, ay + t16 * dy];
  return true;
}
function connectEdge(edge, x06, y06, x12, y12) {
  var v1 = edge[1];
  if (v1) return true;
  var v0 = edge[0], left2 = edge.left, right2 = edge.right, lx = left2[0], ly = left2[1], rx = right2[0], ry = right2[1], fx = (lx + rx) / 2, fy = (ly + ry) / 2, fm, fb;
  if (ry === ly) {
    if (fx < x06 || fx >= x12) return;
    if (lx > rx) {
      if (!v0) v0 = [fx, y06];
      else if (v0[1] >= y12) return;
      v1 = [fx, y12];
    } else {
      if (!v0) v0 = [fx, y12];
      else if (v0[1] < y06) return;
      v1 = [fx, y06];
    }
  } else {
    fm = (lx - rx) / (ry - ly);
    fb = fy - fm * fx;
    if (fm < -1 || fm > 1) {
      if (lx > rx) {
        if (!v0) v0 = [(y06 - fb) / fm, y06];
        else if (v0[1] >= y12) return;
        v1 = [(y12 - fb) / fm, y12];
      } else {
        if (!v0) v0 = [(y12 - fb) / fm, y12];
        else if (v0[1] < y06) return;
        v1 = [(y06 - fb) / fm, y06];
      }
    } else {
      if (ly < ry) {
        if (!v0) v0 = [x06, fm * x06 + fb];
        else if (v0[0] >= x12) return;
        v1 = [x12, fm * x12 + fb];
      } else {
        if (!v0) v0 = [x12, fm * x12 + fb];
        else if (v0[0] < x06) return;
        v1 = [x06, fm * x06 + fb];
      }
    }
  }
  edge[0] = v0;
  edge[1] = v1;
  return true;
}
function clipEdges(x06, y06, x12, y12) {
  var i = edges.length, edge;
  while (i--) {
    if (!connectEdge(edge = edges[i], x06, y06, x12, y12) || !clipEdge(edge, x06, y06, x12, y12) || !(Math.abs(edge[0][0] - edge[1][0]) > epsilon3 || Math.abs(edge[0][1] - edge[1][1]) > epsilon3)) {
      delete edges[i];
    }
  }
}

// node_modules/d3-voronoi/src/Cell.js
function createCell(site) {
  return cells[site.index] = {
    site,
    halfedges: []
  };
}
function cellHalfedgeAngle(cell, edge) {
  var site = cell.site, va = edge.left, vb = edge.right;
  if (site === vb) vb = va, va = site;
  if (vb) return Math.atan2(vb[1] - va[1], vb[0] - va[0]);
  if (site === va) va = edge[1], vb = edge[0];
  else va = edge[0], vb = edge[1];
  return Math.atan2(va[0] - vb[0], vb[1] - va[1]);
}
function cellHalfedgeStart(cell, edge) {
  return edge[+(edge.left !== cell.site)];
}
function cellHalfedgeEnd(cell, edge) {
  return edge[+(edge.left === cell.site)];
}
function sortCellHalfedges() {
  for (var i = 0, n = cells.length, cell, halfedges, j, m; i < n; ++i) {
    if ((cell = cells[i]) && (m = (halfedges = cell.halfedges).length)) {
      var index = new Array(m), array7 = new Array(m);
      for (j = 0; j < m; ++j) index[j] = j, array7[j] = cellHalfedgeAngle(cell, edges[halfedges[j]]);
      index.sort(function(i2, j2) {
        return array7[j2] - array7[i2];
      });
      for (j = 0; j < m; ++j) array7[j] = halfedges[index[j]];
      for (j = 0; j < m; ++j) halfedges[j] = array7[j];
    }
  }
}
function clipCells(x06, y06, x12, y12) {
  var nCells = cells.length, iCell, cell, site, iHalfedge, halfedges, nHalfedges, start4, startX, startY, end, endX, endY, cover = true;
  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      site = cell.site;
      halfedges = cell.halfedges;
      iHalfedge = halfedges.length;
      while (iHalfedge--) {
        if (!edges[halfedges[iHalfedge]]) {
          halfedges.splice(iHalfedge, 1);
        }
      }
      iHalfedge = 0, nHalfedges = halfedges.length;
      while (iHalfedge < nHalfedges) {
        end = cellHalfedgeEnd(cell, edges[halfedges[iHalfedge]]), endX = end[0], endY = end[1];
        start4 = cellHalfedgeStart(cell, edges[halfedges[++iHalfedge % nHalfedges]]), startX = start4[0], startY = start4[1];
        if (Math.abs(endX - startX) > epsilon3 || Math.abs(endY - startY) > epsilon3) {
          halfedges.splice(iHalfedge, 0, edges.push(createBorderEdge(site, end, Math.abs(endX - x06) < epsilon3 && y12 - endY > epsilon3 ? [x06, Math.abs(startX - x06) < epsilon3 ? startY : y12] : Math.abs(endY - y12) < epsilon3 && x12 - endX > epsilon3 ? [Math.abs(startY - y12) < epsilon3 ? startX : x12, y12] : Math.abs(endX - x12) < epsilon3 && endY - y06 > epsilon3 ? [x12, Math.abs(startX - x12) < epsilon3 ? startY : y06] : Math.abs(endY - y06) < epsilon3 && endX - x06 > epsilon3 ? [Math.abs(startY - y06) < epsilon3 ? startX : x06, y06] : null)) - 1);
          ++nHalfedges;
        }
      }
      if (nHalfedges) cover = false;
    }
  }
  if (cover) {
    var dx, dy, d2, dc = Infinity;
    for (iCell = 0, cover = null; iCell < nCells; ++iCell) {
      if (cell = cells[iCell]) {
        site = cell.site;
        dx = site[0] - x06;
        dy = site[1] - y06;
        d2 = dx * dx + dy * dy;
        if (d2 < dc) dc = d2, cover = cell;
      }
    }
    if (cover) {
      var v00 = [x06, y06], v01 = [x06, y12], v11 = [x12, y12], v10 = [x12, y06];
      cover.halfedges.push(edges.push(createBorderEdge(site = cover.site, v00, v01)) - 1, edges.push(createBorderEdge(site, v01, v11)) - 1, edges.push(createBorderEdge(site, v11, v10)) - 1, edges.push(createBorderEdge(site, v10, v00)) - 1);
    }
  }
  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      if (!cell.halfedges.length) {
        delete cells[iCell];
      }
    }
  }
}

// node_modules/d3-voronoi/src/Circle.js
var circlePool = [];
var firstCircle;
function Circle() {
  RedBlackNode(this);
  this.x = this.y = this.arc = this.site = this.cy = null;
}
function attachCircle(arc) {
  var lArc = arc.P, rArc = arc.N;
  if (!lArc || !rArc) return;
  var lSite = lArc.site, cSite = arc.site, rSite = rArc.site;
  if (lSite === rSite) return;
  var bx = cSite[0], by = cSite[1], ax = lSite[0] - bx, ay = lSite[1] - by, cx = rSite[0] - bx, cy = rSite[1] - by;
  var d = 2 * (ax * cy - ay * cx);
  if (d >= -epsilon24) return;
  var ha = ax * ax + ay * ay, hc = cx * cx + cy * cy, x2 = (cy * ha - ay * hc) / d, y2 = (ax * hc - cx * ha) / d;
  var circle2 = circlePool.pop() || new Circle();
  circle2.arc = arc;
  circle2.site = cSite;
  circle2.x = x2 + bx;
  circle2.y = (circle2.cy = y2 + by) + Math.sqrt(x2 * x2 + y2 * y2);
  arc.circle = circle2;
  var before = null, node = circles._;
  while (node) {
    if (circle2.y < node.y || circle2.y === node.y && circle2.x <= node.x) {
      if (node.L) node = node.L;
      else {
        before = node.P;
        break;
      }
    } else {
      if (node.R) node = node.R;
      else {
        before = node;
        break;
      }
    }
  }
  circles.insert(before, circle2);
  if (!before) firstCircle = circle2;
}
function detachCircle(arc) {
  var circle2 = arc.circle;
  if (circle2) {
    if (!circle2.P) firstCircle = circle2.N;
    circles.remove(circle2);
    circlePool.push(circle2);
    RedBlackNode(circle2);
    arc.circle = null;
  }
}

// node_modules/d3-voronoi/src/Beach.js
var beachPool = [];
function Beach() {
  RedBlackNode(this);
  this.edge = this.site = this.circle = null;
}
function createBeach(site) {
  var beach = beachPool.pop() || new Beach();
  beach.site = site;
  return beach;
}
function detachBeach(beach) {
  detachCircle(beach);
  beaches.remove(beach);
  beachPool.push(beach);
  RedBlackNode(beach);
}
function removeBeach(beach) {
  var circle2 = beach.circle, x2 = circle2.x, y2 = circle2.cy, vertex = [x2, y2], previous = beach.P, next = beach.N, disappearing = [beach];
  detachBeach(beach);
  var lArc = previous;
  while (lArc.circle && Math.abs(x2 - lArc.circle.x) < epsilon3 && Math.abs(y2 - lArc.circle.cy) < epsilon3) {
    previous = lArc.P;
    disappearing.unshift(lArc);
    detachBeach(lArc);
    lArc = previous;
  }
  disappearing.unshift(lArc);
  detachCircle(lArc);
  var rArc = next;
  while (rArc.circle && Math.abs(x2 - rArc.circle.x) < epsilon3 && Math.abs(y2 - rArc.circle.cy) < epsilon3) {
    next = rArc.N;
    disappearing.push(rArc);
    detachBeach(rArc);
    rArc = next;
  }
  disappearing.push(rArc);
  detachCircle(rArc);
  var nArcs = disappearing.length, iArc;
  for (iArc = 1; iArc < nArcs; ++iArc) {
    rArc = disappearing[iArc];
    lArc = disappearing[iArc - 1];
    setEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
  }
  lArc = disappearing[0];
  rArc = disappearing[nArcs - 1];
  rArc.edge = createEdge(lArc.site, rArc.site, null, vertex);
  attachCircle(lArc);
  attachCircle(rArc);
}
function addBeach(site) {
  var x2 = site[0], directrix = site[1], lArc, rArc, dxl, dxr, node = beaches._;
  while (node) {
    dxl = leftBreakPoint(node, directrix) - x2;
    if (dxl > epsilon3) node = node.L;
    else {
      dxr = x2 - rightBreakPoint(node, directrix);
      if (dxr > epsilon3) {
        if (!node.R) {
          lArc = node;
          break;
        }
        node = node.R;
      } else {
        if (dxl > -epsilon3) {
          lArc = node.P;
          rArc = node;
        } else if (dxr > -epsilon3) {
          lArc = node;
          rArc = node.N;
        } else {
          lArc = rArc = node;
        }
        break;
      }
    }
  }
  createCell(site);
  var newArc = createBeach(site);
  beaches.insert(lArc, newArc);
  if (!lArc && !rArc) return;
  if (lArc === rArc) {
    detachCircle(lArc);
    rArc = createBeach(lArc.site);
    beaches.insert(newArc, rArc);
    newArc.edge = rArc.edge = createEdge(lArc.site, newArc.site);
    attachCircle(lArc);
    attachCircle(rArc);
    return;
  }
  if (!rArc) {
    newArc.edge = createEdge(lArc.site, newArc.site);
    return;
  }
  detachCircle(lArc);
  detachCircle(rArc);
  var lSite = lArc.site, ax = lSite[0], ay = lSite[1], bx = site[0] - ax, by = site[1] - ay, rSite = rArc.site, cx = rSite[0] - ax, cy = rSite[1] - ay, d = 2 * (bx * cy - by * cx), hb = bx * bx + by * by, hc = cx * cx + cy * cy, vertex = [(cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay];
  setEdgeEnd(rArc.edge, lSite, rSite, vertex);
  newArc.edge = createEdge(lSite, site, null, vertex);
  rArc.edge = createEdge(site, rSite, null, vertex);
  attachCircle(lArc);
  attachCircle(rArc);
}
function leftBreakPoint(arc, directrix) {
  var site = arc.site, rfocx = site[0], rfocy = site[1], pby2 = rfocy - directrix;
  if (!pby2) return rfocx;
  var lArc = arc.P;
  if (!lArc) return -Infinity;
  site = lArc.site;
  var lfocx = site[0], lfocy = site[1], plby2 = lfocy - directrix;
  if (!plby2) return lfocx;
  var hl = lfocx - rfocx, aby2 = 1 / pby2 - 1 / plby2, b = hl / plby2;
  if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
  return (rfocx + lfocx) / 2;
}
function rightBreakPoint(arc, directrix) {
  var rArc = arc.N;
  if (rArc) return leftBreakPoint(rArc, directrix);
  var site = arc.site;
  return site[1] === directrix ? site[0] : Infinity;
}

// node_modules/d3-voronoi/src/Diagram.js
var epsilon3 = 1e-6;
var epsilon24 = 1e-12;
var beaches;
var cells;
var circles;
var edges;
function triangleArea(a, b, c3) {
  return (a[0] - c3[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c3[1] - a[1]);
}
function lexicographic(a, b) {
  return b[1] - a[1] || b[0] - a[0];
}
function Diagram(sites, extent) {
  var site = sites.sort(lexicographic).pop(), x2, y2, circle2;
  edges = [];
  cells = new Array(sites.length);
  beaches = new RedBlackTree_default();
  circles = new RedBlackTree_default();
  while (true) {
    circle2 = firstCircle;
    if (site && (!circle2 || site[1] < circle2.y || site[1] === circle2.y && site[0] < circle2.x)) {
      if (site[0] !== x2 || site[1] !== y2) {
        addBeach(site);
        x2 = site[0], y2 = site[1];
      }
      site = sites.pop();
    } else if (circle2) {
      removeBeach(circle2.arc);
    } else {
      break;
    }
  }
  sortCellHalfedges();
  if (extent) {
    var x06 = +extent[0][0], y06 = +extent[0][1], x12 = +extent[1][0], y12 = +extent[1][1];
    clipEdges(x06, y06, x12, y12);
    clipCells(x06, y06, x12, y12);
  }
  this.edges = edges;
  this.cells = cells;
  beaches = circles = edges = cells = null;
}
Diagram.prototype = {
  constructor: Diagram,
  polygons: function() {
    var edges2 = this.edges;
    return this.cells.map(function(cell) {
      var polygon = cell.halfedges.map(function(i) {
        return cellHalfedgeStart(cell, edges2[i]);
      });
      polygon.data = cell.site.data;
      return polygon;
    });
  },
  triangles: function() {
    var triangles = [], edges2 = this.edges;
    this.cells.forEach(function(cell, i) {
      if (!(m = (halfedges = cell.halfedges).length)) return;
      var site = cell.site, halfedges, j = -1, m, s0, e1 = edges2[halfedges[m - 1]], s1 = e1.left === site ? e1.right : e1.left;
      while (++j < m) {
        s0 = s1;
        e1 = edges2[halfedges[j]];
        s1 = e1.left === site ? e1.right : e1.left;
        if (s0 && s1 && i < s0.index && i < s1.index && triangleArea(site, s0, s1) < 0) {
          triangles.push([site.data, s0.data, s1.data]);
        }
      }
    });
    return triangles;
  },
  links: function() {
    return this.edges.filter(function(edge) {
      return edge.right;
    }).map(function(edge) {
      return {
        source: edge.left.data,
        target: edge.right.data
      };
    });
  },
  find: function(x2, y2, radius) {
    var that = this, i0, i1 = that._found || 0, n = that.cells.length, cell;
    while (!(cell = that.cells[i1])) if (++i1 >= n) return null;
    var dx = x2 - cell.site[0], dy = y2 - cell.site[1], d2 = dx * dx + dy * dy;
    do {
      cell = that.cells[i0 = i1], i1 = null;
      cell.halfedges.forEach(function(e) {
        var edge = that.edges[e], v = edge.left;
        if ((v === cell.site || !v) && !(v = edge.right)) return;
        var vx = x2 - v[0], vy = y2 - v[1], v2 = vx * vx + vy * vy;
        if (v2 < d2) d2 = v2, i1 = v.index;
      });
    } while (i1 !== null);
    that._found = i0;
    return radius == null || d2 <= radius * radius ? cell.site : null;
  }
};

// node_modules/d3-voronoi/src/voronoi.js
function voronoi_default() {
  var x2 = x, y2 = y, extent = null;
  function voronoi(data) {
    return new Diagram(data.map(function(d, i) {
      var s = [Math.round(x2(d, i, data) / epsilon3) * epsilon3, Math.round(y2(d, i, data) / epsilon3) * epsilon3];
      s.index = i;
      s.data = d;
      return s;
    }), extent);
  }
  voronoi.polygons = function(data) {
    return voronoi(data).polygons();
  };
  voronoi.links = function(data) {
    return voronoi(data).links();
  };
  voronoi.triangles = function(data) {
    return voronoi(data).triangles();
  };
  voronoi.x = function(_) {
    return arguments.length ? (x2 = typeof _ === "function" ? _ : constant_default18(+_), voronoi) : x2;
  };
  voronoi.y = function(_) {
    return arguments.length ? (y2 = typeof _ === "function" ? _ : constant_default18(+_), voronoi) : y2;
  };
  voronoi.extent = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]], voronoi) : extent && [[extent[0][0], extent[0][1]], [extent[1][0], extent[1][1]]];
  };
  voronoi.size = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[0, 0], [+_[0], +_[1]]], voronoi) : extent && [extent[1][0] - extent[0][0], extent[1][1] - extent[0][1]];
  };
  return voronoi;
}

// node_modules/d3-zoom/node_modules/d3-dispatch/src/dispatch.js
var noop4 = {
  value: function() {
  }
};
function dispatch3() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch3(_);
}
function Dispatch3(_) {
  this._ = _;
}
function parseTypenames5(typenames, types) {
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
Dispatch3.prototype = dispatch3.prototype = {
  constructor: Dispatch3,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames5(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get5(_[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set5(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set5(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy3 = {}, _ = this._;
    for (var t in _) copy3[t] = _[t].slice();
    return new Dispatch3(copy3);
  },
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get5(type2, name) {
  for (var i = 0, n = type2.length, c3; i < n; ++i) {
    if ((c3 = type2[i]).name === name) {
      return c3.value;
    }
  }
}
function set5(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop4, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null) type2.push({
    name,
    value: callback
  });
  return type2;
}
var dispatch_default5 = dispatch3;

// node_modules/d3-zoom/node_modules/d3-selection/src/namespaces.js
var xhtml3 = "http://www.w3.org/1999/xhtml";
var namespaces_default3 = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml3,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/d3-zoom/node_modules/d3-selection/src/namespace.js
function namespace_default3(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces_default3.hasOwnProperty(prefix) ? {
    space: namespaces_default3[prefix],
    local: name
  } : name;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/creator.js
function creatorInherit3(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml3 && document2.documentElement.namespaceURI === xhtml3 ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed3(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default3(name) {
  var fullname = namespace_default3(name);
  return (fullname.local ? creatorFixed3 : creatorInherit3)(fullname);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selector.js
function none3() {
}
function selector_default3(selector) {
  return selector == null ? none3 : function() {
    return this.querySelector(selector);
  };
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/select.js
function select_default7(select) {
  if (typeof select !== "function") select = selector_default3(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection5(subgroups, this._parents);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selectorAll.js
function empty4() {
  return [];
}
function selectorAll_default3(selector) {
  return selector == null ? empty4 : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/selectAll.js
function selectAll_default7(select) {
  if (typeof select !== "function") select = selectorAll_default3(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection5(subgroups, parents);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/matcher.js
function matcher_default3(selector) {
  return function() {
    return this.matches(selector);
  };
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/filter.js
function filter_default5(match) {
  if (typeof match !== "function") match = matcher_default3(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection5(subgroups, this._parents);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/sparse.js
function sparse_default3(update) {
  return new Array(update.length);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/enter.js
function enter_default3() {
  return new Selection5(this._enter || this._groups.map(sparse_default3), this._parents);
}
function EnterNode3(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}
EnterNode3.prototype = {
  constructor: EnterNode3,
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

// node_modules/d3-zoom/node_modules/d3-selection/src/constant.js
function constant_default19(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/data.js
var keyPrefix4 = "$";
function bindIndex3(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode3(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey3(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = {}, groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix4 + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix4 + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode3(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
      exit[i] = node;
    }
  }
}
function data_default3(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) {
      data[++j] = d;
    });
    return data;
  }
  var bind = key ? bindKey3 : bindIndex3, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant_default19(value);
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
  update = new Selection5(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/exit.js
function exit_default3() {
  return new Selection5(this._exit || this._groups.map(sparse_default3), this._parents);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/join.js
function join_default3(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/merge.js
function merge_default9(selection4) {
  for (var groups0 = this._groups, groups1 = selection4._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection5(merges, this._parents);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/order.js
function order_default3() {
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

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/sort.js
function sort_default4(compare) {
  if (!compare) compare = ascending3;
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
  return new Selection5(sortgroups, this._parents).order();
}
function ascending3(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/call.js
function call_default3() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/nodes.js
function nodes_default3() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() {
    nodes[++i] = this;
  });
  return nodes;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/node.js
function node_default3() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/size.js
function size_default3() {
  var size = 0;
  this.each(function() {
    ++size;
  });
  return size;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/empty.js
function empty_default3() {
  return !this.node();
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/each.js
function each_default4(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/attr.js
function attrRemove5(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS5(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant5(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS5(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction5(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}
function attrFunctionNS5(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default5(name, value) {
  var fullname = namespace_default3(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS5 : attrRemove5 : typeof value === "function" ? fullname.local ? attrFunctionNS5 : attrFunction5 : fullname.local ? attrConstantNS5 : attrConstant5)(fullname, value));
}

// node_modules/d3-zoom/node_modules/d3-selection/src/window.js
function window_default3(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/style.js
function styleRemove5(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant5(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction5(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}
function style_default5(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove5 : typeof value === "function" ? styleFunction5 : styleConstant5)(name, value, priority == null ? "" : priority)) : styleValue3(this.node(), name);
}
function styleValue3(node, name) {
  return node.style.getPropertyValue(name) || window_default3(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/property.js
function propertyRemove3(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant3(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction3(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}
function property_default3(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove3 : typeof value === "function" ? propertyFunction3 : propertyConstant3)(name, value)) : this.node()[name];
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/classed.js
function classArray3(string) {
  return string.trim().split(/^|\s+/);
}
function classList3(node) {
  return node.classList || new ClassList3(node);
}
function ClassList3(node) {
  this._node = node;
  this._names = classArray3(node.getAttribute("class") || "");
}
ClassList3.prototype = {
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
function classedAdd3(node, names) {
  var list = classList3(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove3(node, names) {
  var list = classList3(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue3(names) {
  return function() {
    classedAdd3(this, names);
  };
}
function classedFalse3(names) {
  return function() {
    classedRemove3(this, names);
  };
}
function classedFunction3(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd3 : classedRemove3)(this, names);
  };
}
function classed_default3(name, value) {
  var names = classArray3(name + "");
  if (arguments.length < 2) {
    var list = classList3(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction3 : value ? classedTrue3 : classedFalse3)(names, value));
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/text.js
function textRemove3() {
  this.textContent = "";
}
function textConstant5(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction5(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default6(value) {
  return arguments.length ? this.each(value == null ? textRemove3 : (typeof value === "function" ? textFunction5 : textConstant5)(value)) : this.node().textContent;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/html.js
function htmlRemove3() {
  this.innerHTML = "";
}
function htmlConstant3(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction3(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default3(value) {
  return arguments.length ? this.each(value == null ? htmlRemove3 : (typeof value === "function" ? htmlFunction3 : htmlConstant3)(value)) : this.node().innerHTML;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/raise.js
function raise3() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default3() {
  return this.each(raise3);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/lower.js
function lower3() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default3() {
  return this.each(lower3);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/append.js
function append_default3(name) {
  var create4 = typeof name === "function" ? name : creator_default3(name);
  return this.select(function() {
    return this.appendChild(create4.apply(this, arguments));
  });
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/insert.js
function constantNull3() {
  return null;
}
function insert_default3(name, before) {
  var create4 = typeof name === "function" ? name : creator_default3(name), select = before == null ? constantNull3 : typeof before === "function" ? before : selector_default3(before);
  return this.select(function() {
    return this.insertBefore(create4.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/remove.js
function remove3() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default5() {
  return this.each(remove3);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow3() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep3() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default3(deep) {
  return this.select(deep ? selection_cloneDeep3 : selection_cloneShallow3);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/datum.js
function datum_default3(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/on.js
var filterEvents3 = {};
var event3 = null;
if (typeof document !== "undefined") {
  element = document.documentElement;
  if (!("onmouseenter" in element)) {
    filterEvents3 = {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    };
  }
}
var element;
function filterContextListener3(listener, index, group) {
  listener = contextListener3(listener, index, group);
  return function(event4) {
    var related = event4.relatedTarget;
    if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
      listener.call(this, event4);
    }
  };
}
function contextListener3(listener, index, group) {
  return function(event1) {
    var event0 = event3;
    event3 = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      event3 = event0;
    }
  };
}
function parseTypenames6(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name
    };
  });
}
function onRemove3(typename) {
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
function onAdd3(typename, value, capture) {
  var wrap = filterEvents3.hasOwnProperty(typename.type) ? filterContextListener3 : contextListener3;
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
function on_default5(typename, value, capture) {
  var typenames = parseTypenames6(typename + ""), i, n = typenames.length, t;
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
  on = value ? onAdd3 : onRemove3;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
}
function customEvent3(event1, listener, that, args) {
  var event0 = event3;
  event1.sourceEvent = event3;
  event3 = event1;
  try {
    return listener.apply(that, args);
  } finally {
    event3 = event0;
  }
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent3(node, type2, params) {
  var window2 = window_default3(node), event4 = window2.CustomEvent;
  if (typeof event4 === "function") {
    event4 = new event4(type2, params);
  } else {
    event4 = window2.document.createEvent("Event");
    if (params) event4.initEvent(type2, params.bubbles, params.cancelable), event4.detail = params.detail;
    else event4.initEvent(type2, false, false);
  }
  node.dispatchEvent(event4);
}
function dispatchConstant3(type2, params) {
  return function() {
    return dispatchEvent3(this, type2, params);
  };
}
function dispatchFunction3(type2, params) {
  return function() {
    return dispatchEvent3(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default6(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction3 : dispatchConstant3)(type2, params));
}

// node_modules/d3-zoom/node_modules/d3-selection/src/selection/index.js
var root4 = [null];
function Selection5(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection3() {
  return new Selection5([[document.documentElement]], root4);
}
Selection5.prototype = selection3.prototype = {
  constructor: Selection5,
  select: select_default7,
  selectAll: selectAll_default7,
  filter: filter_default5,
  data: data_default3,
  enter: enter_default3,
  exit: exit_default3,
  join: join_default3,
  merge: merge_default9,
  order: order_default3,
  sort: sort_default4,
  call: call_default3,
  nodes: nodes_default3,
  node: node_default3,
  size: size_default3,
  empty: empty_default3,
  each: each_default4,
  attr: attr_default5,
  style: style_default5,
  property: property_default3,
  classed: classed_default3,
  text: text_default6,
  html: html_default3,
  raise: raise_default3,
  lower: lower_default3,
  append: append_default3,
  insert: insert_default3,
  remove: remove_default5,
  clone: clone_default3,
  datum: datum_default3,
  on: on_default5,
  dispatch: dispatch_default6
};
var selection_default5 = selection3;

// node_modules/d3-zoom/node_modules/d3-selection/src/select.js
function select_default8(selector) {
  return typeof selector === "string" ? new Selection5([[document.querySelector(selector)]], [document.documentElement]) : new Selection5([[selector]], root4);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/local.js
var nextId3 = 0;
function local4() {
  return new Local3();
}
function Local3() {
  this._ = "@" + (++nextId3).toString(36);
}
Local3.prototype = local4.prototype = {
  constructor: Local3,
  get: function(node) {
    var id4 = this._;
    while (!(id4 in node)) if (!(node = node.parentNode)) return;
    return node[id4];
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

// node_modules/d3-zoom/node_modules/d3-selection/src/sourceEvent.js
function sourceEvent_default3() {
  var current = event3, source;
  while (source = current.sourceEvent) current = source;
  return current;
}

// node_modules/d3-zoom/node_modules/d3-selection/src/point.js
function point_default3(node, event4) {
  var svg2 = node.ownerSVGElement || node;
  if (svg2.createSVGPoint) {
    var point2 = svg2.createSVGPoint();
    point2.x = event4.clientX, point2.y = event4.clientY;
    point2 = point2.matrixTransform(node.getScreenCTM().inverse());
    return [point2.x, point2.y];
  }
  var rect = node.getBoundingClientRect();
  return [event4.clientX - rect.left - node.clientLeft, event4.clientY - rect.top - node.clientTop];
}

// node_modules/d3-zoom/node_modules/d3-selection/src/mouse.js
function mouse_default3(node) {
  var event4 = sourceEvent_default3();
  if (event4.changedTouches) event4 = event4.changedTouches[0];
  return point_default3(node, event4);
}

// node_modules/d3-zoom/node_modules/d3-selection/src/touch.js
function touch_default3(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = sourceEvent_default3().changedTouches;
  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return point_default3(node, touch);
    }
  }
  return null;
}

// node_modules/d3-zoom/node_modules/d3-drag/src/noevent.js
function noevent_default4() {
  event3.preventDefault();
  event3.stopImmediatePropagation();
}

// node_modules/d3-zoom/node_modules/d3-drag/src/nodrag.js
function nodrag_default3(view) {
  var root5 = view.document.documentElement, selection4 = select_default8(view).on("dragstart.drag", noevent_default4, true);
  if ("onselectstart" in root5) {
    selection4.on("selectstart.drag", noevent_default4, true);
  } else {
    root5.__noselect = root5.style.MozUserSelect;
    root5.style.MozUserSelect = "none";
  }
}
function yesdrag3(view, noclick) {
  var root5 = view.document.documentElement, selection4 = select_default8(view).on("dragstart.drag", null);
  if (noclick) {
    selection4.on("click.drag", noevent_default4, true);
    setTimeout(function() {
      selection4.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root5) {
    selection4.on("selectstart.drag", null);
  } else {
    root5.style.MozUserSelect = root5.__noselect;
    delete root5.__noselect;
  }
}

// node_modules/d3-zoom/node_modules/d3-drag/src/event.js
function DragEvent3(target, type2, subject, id4, active, x2, y2, dx, dy, dispatch4) {
  this.target = target;
  this.type = type2;
  this.subject = subject;
  this.identifier = id4;
  this.active = active;
  this.x = x2;
  this.y = y2;
  this.dx = dx;
  this.dy = dy;
  this._ = dispatch4;
}
DragEvent3.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

// node_modules/d3-zoom/node_modules/d3-color/src/define.js
function define_default4(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend4(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-zoom/node_modules/d3-color/src/color.js
function Color4() {
}
var darker4 = 0.7;
var brighter4 = 1 / darker4;
var reI4 = "\\s*([+-]?\\d+)\\s*";
var reN4 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP4 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex4 = /^#([0-9a-f]{3,8})$/;
var reRgbInteger4 = new RegExp("^rgb\\(" + [reI4, reI4, reI4] + "\\)$");
var reRgbPercent4 = new RegExp("^rgb\\(" + [reP4, reP4, reP4] + "\\)$");
var reRgbaInteger4 = new RegExp("^rgba\\(" + [reI4, reI4, reI4, reN4] + "\\)$");
var reRgbaPercent4 = new RegExp("^rgba\\(" + [reP4, reP4, reP4, reN4] + "\\)$");
var reHslPercent4 = new RegExp("^hsl\\(" + [reN4, reP4, reP4] + "\\)$");
var reHslaPercent4 = new RegExp("^hsla\\(" + [reN4, reP4, reP4, reN4] + "\\)$");
var named4 = {
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
define_default4(Color4, color4, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex4,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex4,
  formatHsl: color_formatHsl4,
  formatRgb: color_formatRgb4,
  toString: color_formatRgb4
});
function color_formatHex4() {
  return this.rgb().formatHex();
}
function color_formatHsl4() {
  return hslConvert4(this).formatHsl();
}
function color_formatRgb4() {
  return this.rgb().formatRgb();
}
function color4(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex4.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn4(m) : l === 3 ? new Rgb4(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba4(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba4(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger4.exec(format2)) ? new Rgb4(m[1], m[2], m[3], 1) : (m = reRgbPercent4.exec(format2)) ? new Rgb4(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger4.exec(format2)) ? rgba4(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent4.exec(format2)) ? rgba4(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent4.exec(format2)) ? hsla4(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent4.exec(format2)) ? hsla4(m[1], m[2] / 100, m[3] / 100, m[4]) : named4.hasOwnProperty(format2) ? rgbn4(named4[format2]) : format2 === "transparent" ? new Rgb4(NaN, NaN, NaN, 0) : null;
}
function rgbn4(n) {
  return new Rgb4(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba4(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb4(r, g, b, a);
}
function rgbConvert4(o) {
  if (!(o instanceof Color4)) o = color4(o);
  if (!o) return new Rgb4();
  o = o.rgb();
  return new Rgb4(o.r, o.g, o.b, o.opacity);
}
function rgb4(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert4(r) : new Rgb4(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb4(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default4(Rgb4, rgb4, extend4(Color4, {
  brighter: function(k) {
    k = k == null ? brighter4 : Math.pow(brighter4, k);
    return new Rgb4(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker4 : Math.pow(darker4, k);
    return new Rgb4(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex4,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex4,
  formatRgb: rgb_formatRgb4,
  toString: rgb_formatRgb4
}));
function rgb_formatHex4() {
  return "#" + hex4(this.r) + hex4(this.g) + hex4(this.b);
}
function rgb_formatRgb4() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex4(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla4(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl4(h, s, l, a);
}
function hslConvert4(o) {
  if (o instanceof Hsl4) return new Hsl4(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color4)) o = color4(o);
  if (!o) return new Hsl4();
  if (o instanceof Hsl4) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min, l = (max2 + min) / 2;
  if (s) {
    if (r === max2) h = (g - b) / s + (g < b) * 6;
    else if (g === max2) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min : 2 - max2 - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl4(h, s, l, o.opacity);
}
function hsl7(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert4(h) : new Hsl4(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl4(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default4(Hsl4, hsl7, extend4(Color4, {
  brighter: function(k) {
    k = k == null ? brighter4 : Math.pow(brighter4, k);
    return new Hsl4(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker4 : Math.pow(darker4, k);
    return new Hsl4(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb4(hsl2rgb4(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb4(h, m1, m2), hsl2rgb4(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
function hsl2rgb4(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-zoom/node_modules/d3-color/src/math.js
var deg2rad4 = Math.PI / 180;
var rad2deg4 = 180 / Math.PI;

// node_modules/d3-zoom/node_modules/d3-color/src/lab.js
var K4 = 18;
var Xn4 = 0.96422;
var Yn4 = 1;
var Zn4 = 0.82521;
var t05 = 4 / 29;
var t15 = 6 / 29;
var t24 = 3 * t15 * t15;
var t34 = t15 * t15 * t15;
function labConvert4(o) {
  if (o instanceof Lab4) return new Lab4(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl4) return hcl2lab4(o);
  if (!(o instanceof Rgb4)) o = rgbConvert4(o);
  var r = rgb2lrgb4(o.r), g = rgb2lrgb4(o.g), b = rgb2lrgb4(o.b), y2 = xyz2lab4((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn4), x2, z;
  if (r === g && g === b) x2 = z = y2;
  else {
    x2 = xyz2lab4((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn4);
    z = xyz2lab4((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn4);
  }
  return new Lab4(116 * y2 - 16, 500 * (x2 - y2), 200 * (y2 - z), o.opacity);
}
function lab7(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert4(l) : new Lab4(l, a, b, opacity == null ? 1 : opacity);
}
function Lab4(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}
define_default4(Lab4, lab7, extend4(Color4, {
  brighter: function(k) {
    return new Lab4(this.l + K4 * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab4(this.l - K4 * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y2 = (this.l + 16) / 116, x2 = isNaN(this.a) ? y2 : y2 + this.a / 500, z = isNaN(this.b) ? y2 : y2 - this.b / 200;
    x2 = Xn4 * lab2xyz4(x2);
    y2 = Yn4 * lab2xyz4(y2);
    z = Zn4 * lab2xyz4(z);
    return new Rgb4(lrgb2rgb4(3.1338561 * x2 - 1.6168667 * y2 - 0.4906146 * z), lrgb2rgb4(-0.9787684 * x2 + 1.9161415 * y2 + 0.033454 * z), lrgb2rgb4(0.0719453 * x2 - 0.2289914 * y2 + 1.4052427 * z), this.opacity);
  }
}));
function xyz2lab4(t) {
  return t > t34 ? Math.pow(t, 1 / 3) : t / t24 + t05;
}
function lab2xyz4(t) {
  return t > t15 ? t * t * t : t24 * (t - t05);
}
function lrgb2rgb4(x2) {
  return 255 * (x2 <= 31308e-7 ? 12.92 * x2 : 1.055 * Math.pow(x2, 1 / 2.4) - 0.055);
}
function rgb2lrgb4(x2) {
  return (x2 /= 255) <= 0.04045 ? x2 / 12.92 : Math.pow((x2 + 0.055) / 1.055, 2.4);
}
function hclConvert4(o) {
  if (o instanceof Hcl4) return new Hcl4(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab4)) o = labConvert4(o);
  if (o.a === 0 && o.b === 0) return new Hcl4(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * rad2deg4;
  return new Hcl4(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl7(h, c3, l, opacity) {
  return arguments.length === 1 ? hclConvert4(h) : new Hcl4(h, c3, l, opacity == null ? 1 : opacity);
}
function Hcl4(h, c3, l, opacity) {
  this.h = +h;
  this.c = +c3;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab4(o) {
  if (isNaN(o.h)) return new Lab4(o.l, 0, 0, o.opacity);
  var h = o.h * deg2rad4;
  return new Lab4(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default4(Hcl4, hcl7, extend4(Color4, {
  brighter: function(k) {
    return new Hcl4(this.h, this.c, this.l + K4 * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl4(this.h, this.c, this.l - K4 * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return hcl2lab4(this).rgb();
  }
}));

// node_modules/d3-zoom/node_modules/d3-color/src/cubehelix.js
var A6 = -0.14861;
var B4 = 1.78277;
var C4 = -0.29227;
var D4 = -0.90649;
var E4 = 1.97294;
var ED4 = E4 * D4;
var EB4 = E4 * B4;
var BC_DA4 = B4 * C4 - D4 * A6;
function cubehelixConvert4(o) {
  if (o instanceof Cubehelix4) return new Cubehelix4(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb4)) o = rgbConvert4(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA4 * b + ED4 * r - EB4 * g) / (BC_DA4 + ED4 - EB4), bl = b - l, k = (E4 * (g - l) - C4 * bl) / D4, s = Math.sqrt(k * k + bl * bl) / (E4 * l * (1 - l)), h = s ? Math.atan2(k, bl) * rad2deg4 - 120 : NaN;
  return new Cubehelix4(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix7(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert4(h) : new Cubehelix4(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix4(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default4(Cubehelix4, cubehelix7, extend4(Color4, {
  brighter: function(k) {
    k = k == null ? brighter4 : Math.pow(brighter4, k);
    return new Cubehelix4(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker4 : Math.pow(darker4, k);
    return new Cubehelix4(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad4, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh3 = Math.cos(h), sinh3 = Math.sin(h);
    return new Rgb4(255 * (l + a * (A6 * cosh3 + B4 * sinh3)), 255 * (l + a * (C4 * cosh3 + D4 * sinh3)), 255 * (l + a * (E4 * cosh3)), this.opacity);
  }
}));

// node_modules/d3-zoom/node_modules/d3-interpolate/src/basis.js
function basis4(t16, v0, v1, v2, v3) {
  var t25 = t16 * t16, t35 = t25 * t16;
  return ((1 - 3 * t16 + 3 * t25 - t35) * v0 + (4 - 6 * t25 + 3 * t35) * v1 + (1 + 3 * t16 + 3 * t25 - 3 * t35) * v2 + t35 * v3) / 6;
}
function basis_default5(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis4((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-zoom/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default5(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis4((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-zoom/node_modules/d3-interpolate/src/constant.js
function constant_default21(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-zoom/node_modules/d3-interpolate/src/color.js
function linear6(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential4(a, b, y2) {
  return a = Math.pow(a, y2), b = Math.pow(b, y2) - a, y2 = 1 / y2, function(t) {
    return Math.pow(a + t * b, y2);
  };
}
function hue4(a, b) {
  var d = b - a;
  return d ? linear6(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default21(isNaN(a) ? b : a);
}
function gamma4(y2) {
  return (y2 = +y2) === 1 ? nogamma4 : function(a, b) {
    return b - a ? exponential4(a, b, y2) : constant_default21(isNaN(a) ? b : a);
  };
}
function nogamma4(a, b) {
  var d = b - a;
  return d ? linear6(a, d) : constant_default21(isNaN(a) ? b : a);
}

// node_modules/d3-zoom/node_modules/d3-interpolate/src/rgb.js
var rgb_default4 = function rgbGamma4(y2) {
  var color5 = gamma4(y2);
  function rgb5(start4, end) {
    var r = color5((start4 = rgb4(start4)).r, (end = rgb4(end)).r), g = color5(start4.g, end.g), b = color5(start4.b, end.b), opacity = nogamma4(start4.opacity, end.opacity);
    return function(t) {
      start4.r = r(t);
      start4.g = g(t);
      start4.b = b(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  }
  rgb5.gamma = rgbGamma4;
  return rgb5;
}(1);
function rgbSpline4(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color5;
    for (i = 0; i < n; ++i) {
      color5 = rgb4(colors[i]);
      r[i] = color5.r || 0;
      g[i] = color5.g || 0;
      b[i] = color5.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color5.opacity = 1;
    return function(t) {
      color5.r = r(t);
      color5.g = g(t);
      color5.b = b(t);
      return color5 + "";
    };
  };
}
var rgbBasis4 = rgbSpline4(basis_default5);
var rgbBasisClosed4 = rgbSpline4(basisClosed_default5);

// node_modules/d3-zoom/node_modules/d3-interpolate/src/number.js
function number_default9(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// node_modules/d3-zoom/node_modules/d3-interpolate/src/string.js
var reA4 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB4 = new RegExp(reA4.source, "g");
function zero3(b) {
  return function() {
    return b;
  };
}
function one3(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default4(a, b) {
  var bi = reA4.lastIndex = reB4.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA4.exec(a)) && (bm = reB4.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({
        i,
        x: number_default9(am, bm)
      });
    }
    bi = reB4.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one3(q[0].x) : zero3(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3-zoom/node_modules/d3-interpolate/src/transform/decompose.js
var degrees5 = 180 / Math.PI;
var identity6 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default4(a, b, c3, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c3 + b * d) c3 -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c3 * c3 + d * d)) c3 /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c3) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees5,
    skewX: Math.atan(skewX) * degrees5,
    scaleX,
    scaleY
  };
}

// node_modules/d3-zoom/node_modules/d3-interpolate/src/transform/parse.js
var cssNode4;
var cssRoot4;
var cssView4;
var svgNode4;
function parseCss4(value) {
  if (value === "none") return identity6;
  if (!cssNode4) cssNode4 = document.createElement("DIV"), cssRoot4 = document.documentElement, cssView4 = document.defaultView;
  cssNode4.style.transform = value;
  value = cssView4.getComputedStyle(cssRoot4.appendChild(cssNode4), null).getPropertyValue("transform");
  cssRoot4.removeChild(cssNode4);
  value = value.slice(7, -1).split(",");
  return decompose_default4(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}
function parseSvg4(value) {
  if (value == null) return identity6;
  if (!svgNode4) svgNode4 = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode4.setAttribute("transform", value);
  if (!(value = svgNode4.transform.baseVal.consolidate())) return identity6;
  value = value.matrix;
  return decompose_default4(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-zoom/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform4(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: number_default9(xa, xb)
      }, {
        i: i - 2,
        x: number_default9(ya, yb)
      });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({
        i: s.push(pop(s) + "rotate(", null, degParen) - 2,
        x: number_default9(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({
        i: s.push(pop(s) + "skewX(", null, degParen) - 2,
        x: number_default9(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: number_default9(xa, xb)
      }, {
        i: i - 2,
        x: number_default9(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss4 = interpolateTransform4(parseCss4, "px, ", "px)", "deg)");
var interpolateTransformSvg4 = interpolateTransform4(parseSvg4, ", ", ")", ")");

// node_modules/d3-zoom/node_modules/d3-interpolate/src/zoom.js
var rho3 = Math.SQRT2;
var rho22 = 2;
var rho42 = 4;
var epsilon25 = 1e-12;
function cosh2(x2) {
  return ((x2 = Math.exp(x2)) + 1 / x2) / 2;
}
function sinh2(x2) {
  return ((x2 = Math.exp(x2)) - 1 / x2) / 2;
}
function tanh2(x2) {
  return ((x2 = Math.exp(2 * x2)) - 1) / (x2 + 1);
}
function zoom_default4(p02, p1) {
  var ux0 = p02[0], uy0 = p02[1], w0 = p02[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
  if (d2 < epsilon25) {
    S = Math.log(w1 / w0) / rho3;
    i = function(t) {
      return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho3 * t * S)];
    };
  } else {
    var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho42 * d2) / (2 * w0 * rho22 * d1), b1 = (w1 * w1 - w0 * w0 - rho42 * d2) / (2 * w1 * rho22 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho3;
    i = function(t) {
      var s = t * S, coshr0 = cosh2(r0), u = w0 / (rho22 * d1) * (coshr0 * tanh2(rho3 * s + r0) - sinh2(r0));
      return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh2(rho3 * s + r0)];
    };
  }
  i.duration = S * 1e3;
  return i;
}

// node_modules/d3-zoom/node_modules/d3-interpolate/src/hsl.js
function hsl8(hue5) {
  return function(start4, end) {
    var h = hue5((start4 = hsl7(start4)).h, (end = hsl7(end)).h), s = nogamma4(start4.s, end.s), l = nogamma4(start4.l, end.l), opacity = nogamma4(start4.opacity, end.opacity);
    return function(t) {
      start4.h = h(t);
      start4.s = s(t);
      start4.l = l(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  };
}
var hsl_default4 = hsl8(hue4);
var hslLong4 = hsl8(nogamma4);

// node_modules/d3-zoom/node_modules/d3-interpolate/src/hcl.js
function hcl8(hue5) {
  return function(start4, end) {
    var h = hue5((start4 = hcl7(start4)).h, (end = hcl7(end)).h), c3 = nogamma4(start4.c, end.c), l = nogamma4(start4.l, end.l), opacity = nogamma4(start4.opacity, end.opacity);
    return function(t) {
      start4.h = h(t);
      start4.c = c3(t);
      start4.l = l(t);
      start4.opacity = opacity(t);
      return start4 + "";
    };
  };
}
var hcl_default4 = hcl8(hue4);
var hclLong4 = hcl8(nogamma4);

// node_modules/d3-zoom/node_modules/d3-interpolate/src/cubehelix.js
function cubehelix8(hue5) {
  return function cubehelixGamma(y2) {
    y2 = +y2;
    function cubehelix9(start4, end) {
      var h = hue5((start4 = cubehelix7(start4)).h, (end = cubehelix7(end)).h), s = nogamma4(start4.s, end.s), l = nogamma4(start4.l, end.l), opacity = nogamma4(start4.opacity, end.opacity);
      return function(t) {
        start4.h = h(t);
        start4.s = s(t);
        start4.l = l(Math.pow(t, y2));
        start4.opacity = opacity(t);
        return start4 + "";
      };
    }
    cubehelix9.gamma = cubehelixGamma;
    return cubehelix9;
  }(1);
}
var cubehelix_default5 = cubehelix8(hue4);
var cubehelixLong4 = cubehelix8(nogamma4);

// node_modules/d3-zoom/node_modules/d3-timer/src/timer.js
var frame3 = 0;
var timeout3 = 0;
var interval3 = 0;
var pokeDelay3 = 1e3;
var taskHead3;
var taskTail3;
var clockLast3 = 0;
var clockNow3 = 0;
var clockSkew3 = 0;
var clock3 = typeof performance === "object" && performance.now ? performance : Date;
var setFrame3 = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now3() {
  return clockNow3 || (setFrame3(clearNow3), clockNow3 = clock3.now() + clockSkew3);
}
function clearNow3() {
  clockNow3 = 0;
}
function Timer3() {
  this._call = this._time = this._next = null;
}
Timer3.prototype = timer3.prototype = {
  constructor: Timer3,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now3() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail3 !== this) {
      if (taskTail3) taskTail3._next = this;
      else taskHead3 = this;
      taskTail3 = this;
    }
    this._call = callback;
    this._time = time;
    sleep3();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep3();
    }
  }
};
function timer3(callback, delay, time) {
  var t = new Timer3();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush3() {
  now3();
  ++frame3;
  var t = taskHead3, e;
  while (t) {
    if ((e = clockNow3 - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame3;
}
function wake3() {
  clockNow3 = (clockLast3 = clock3.now()) + clockSkew3;
  frame3 = timeout3 = 0;
  try {
    timerFlush3();
  } finally {
    frame3 = 0;
    nap3();
    clockNow3 = 0;
  }
}
function poke3() {
  var now4 = clock3.now(), delay = now4 - clockLast3;
  if (delay > pokeDelay3) clockSkew3 -= delay, clockLast3 = now4;
}
function nap3() {
  var t06, t16 = taskHead3, t25, time = Infinity;
  while (t16) {
    if (t16._call) {
      if (time > t16._time) time = t16._time;
      t06 = t16, t16 = t16._next;
    } else {
      t25 = t16._next, t16._next = null;
      t16 = t06 ? t06._next = t25 : taskHead3 = t25;
    }
  }
  taskTail3 = t06;
  sleep3(time);
}
function sleep3(time) {
  if (frame3) return;
  if (timeout3) timeout3 = clearTimeout(timeout3);
  var delay = time - clockNow3;
  if (delay > 24) {
    if (time < Infinity) timeout3 = setTimeout(wake3, time - clock3.now() - clockSkew3);
    if (interval3) interval3 = clearInterval(interval3);
  } else {
    if (!interval3) clockLast3 = clock3.now(), interval3 = setInterval(poke3, pokeDelay3);
    frame3 = 1, setFrame3(wake3);
  }
}

// node_modules/d3-zoom/node_modules/d3-timer/src/timeout.js
function timeout_default3(callback, delay, time) {
  var t = new Timer3();
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/schedule.js
var emptyOn3 = dispatch_default5("start", "end", "cancel", "interrupt");
var emptyTween3 = [];
var CREATED3 = 0;
var SCHEDULED3 = 1;
var STARTING3 = 2;
var STARTED3 = 3;
var RUNNING3 = 4;
var ENDING3 = 5;
var ENDED3 = 6;
function schedule_default3(node, name, id4, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id4 in schedules) return;
  create3(node, id4, {
    name,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn3,
    tween: emptyTween3,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED3
  });
}
function init3(node, id4) {
  var schedule = get6(node, id4);
  if (schedule.state > CREATED3) throw new Error("too late; already scheduled");
  return schedule;
}
function set6(node, id4) {
  var schedule = get6(node, id4);
  if (schedule.state > STARTED3) throw new Error("too late; already running");
  return schedule;
}
function get6(node, id4) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id4])) throw new Error("transition not found");
  return schedule;
}
function create3(node, id4, self) {
  var schedules = node.__transition, tween;
  schedules[id4] = self;
  self.timer = timer3(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED3;
    self.timer.restart(start4, self.delay, self.time);
    if (self.delay <= elapsed) start4(elapsed - self.delay);
  }
  function start4(elapsed) {
    var i, j, n, o;
    if (self.state !== SCHEDULED3) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;
      if (o.state === STARTED3) return timeout_default3(start4);
      if (o.state === RUNNING3) {
        o.state = ENDED3;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id4) {
        o.state = ENDED3;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default3(function() {
      if (self.state === STARTED3) {
        self.state = RUNNING3;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING3;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING3) return;
    self.state = STARTED3;
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING3, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING3) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED3;
    self.timer.stop();
    delete schedules[id4];
    for (var i in schedules) return;
    delete node.__transition;
  }
}

// node_modules/d3-zoom/node_modules/d3-transition/src/interrupt.js
function interrupt_default5(node, name) {
  var schedules = node.__transition, schedule, active, empty5 = true, i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty5 = false;
      continue;
    }
    active = schedule.state > STARTING3 && schedule.state < ENDING3;
    schedule.state = ENDED3;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty5) delete node.__transition;
}

// node_modules/d3-zoom/node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default6(name) {
  return this.each(function() {
    interrupt_default5(this, name);
  });
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/tween.js
function tweenRemove3(id4, name) {
  var tween0, tween1;
  return function() {
    var schedule = set6(this, id4), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction3(id4, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule = set6(this, id4), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {
        name,
        value
      }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default3(name, value) {
  var id4 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get6(this.node(), id4).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove3 : tweenFunction3)(id4, name, value));
}
function tweenValue3(transition4, name, value) {
  var id4 = transition4._id;
  transition4.each(function() {
    var schedule = set6(this, id4);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get6(node, id4).value[name];
  };
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default4(a, b) {
  var c3;
  return (typeof b === "number" ? number_default9 : b instanceof color4 ? rgb_default4 : (c3 = color4(b)) ? (b = c3, rgb_default4) : string_default4)(a, b);
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/attr.js
function attrRemove6(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS6(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant6(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS6(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction6(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS6(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default6(name, value) {
  var fullname = namespace_default3(name), i = fullname === "transform" ? interpolateTransformSvg4 : interpolate_default4;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS6 : attrFunction6)(fullname, i, tweenValue3(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS6 : attrRemove6)(fullname) : (fullname.local ? attrConstantNS6 : attrConstant6)(fullname, i, value));
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate3(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS3(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS3(fullname, value) {
  var t06, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t06 = (i0 = i) && attrInterpolateNS3(fullname, i);
    return t06;
  }
  tween._value = value;
  return tween;
}
function attrTween3(name, value) {
  var t06, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t06 = (i0 = i) && attrInterpolate3(name, i);
    return t06;
  }
  tween._value = value;
  return tween;
}
function attrTween_default3(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace_default3(name);
  return this.tween(key, (fullname.local ? attrTweenNS3 : attrTween3)(fullname, value));
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/delay.js
function delayFunction3(id4, value) {
  return function() {
    init3(this, id4).delay = +value.apply(this, arguments);
  };
}
function delayConstant3(id4, value) {
  return value = +value, function() {
    init3(this, id4).delay = value;
  };
}
function delay_default3(value) {
  var id4 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction3 : delayConstant3)(id4, value)) : get6(this.node(), id4).delay;
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/duration.js
function durationFunction3(id4, value) {
  return function() {
    set6(this, id4).duration = +value.apply(this, arguments);
  };
}
function durationConstant3(id4, value) {
  return value = +value, function() {
    set6(this, id4).duration = value;
  };
}
function duration_default3(value) {
  var id4 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction3 : durationConstant3)(id4, value)) : get6(this.node(), id4).duration;
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/ease.js
function easeConstant3(id4, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set6(this, id4).ease = value;
  };
}
function ease_default3(value) {
  var id4 = this._id;
  return arguments.length ? this.each(easeConstant3(id4, value)) : get6(this.node(), id4).ease;
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/filter.js
function filter_default6(match) {
  if (typeof match !== "function") match = matcher_default3(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition3(subgroups, this._parents, this._name, this._id);
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/merge.js
function merge_default10(transition4) {
  if (transition4._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition4._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition3(merges, this._parents, this._name, this._id);
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/on.js
function start3(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction3(id4, name, listener) {
  var on0, on1, sit = start3(name) ? init3 : set6;
  return function() {
    var schedule = sit(this, id4), on = schedule.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default6(name, listener) {
  var id4 = this._id;
  return arguments.length < 2 ? get6(this.node(), id4).on.on(name) : this.each(onFunction3(id4, name, listener));
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/remove.js
function removeFunction3(id4) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id4) return;
    if (parent) parent.removeChild(this);
  };
}
function remove_default6() {
  return this.on("end.remove", removeFunction3(this._id));
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/select.js
function select_default9(select) {
  var name = this._name, id4 = this._id;
  if (typeof select !== "function") select = selector_default3(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default3(subgroup[i], name, id4, i, subgroup, get6(node, id4));
      }
    }
  }
  return new Transition3(subgroups, this._parents, name, id4);
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default9(select) {
  var name = this._name, id4 = this._id;
  if (typeof select !== "function") select = selectorAll_default3(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit4 = get6(node, id4), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule_default3(child, name, id4, k, children, inherit4);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }
  return new Transition3(subgroups, parents, name, id4);
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/selection.js
var Selection6 = selection_default5.prototype.constructor;
function selection_default6() {
  return new Selection6(this._groups, this._parents);
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/style.js
function styleNull3(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue3(this, name), string1 = (this.style.removeProperty(name), styleValue3(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove6(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant6(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue3(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction6(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue3(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue3(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove3(id4, name) {
  var on0, on1, listener0, key = "style." + name, event4 = "end." + key, remove4;
  return function() {
    var schedule = set6(this, id4), on = schedule.on, listener = schedule.value[key] == null ? remove4 || (remove4 = styleRemove6(name)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event4, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default6(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss4 : interpolate_default4;
  return value == null ? this.styleTween(name, styleNull3(name, i)).on("end.style." + name, styleRemove6(name)) : typeof value === "function" ? this.styleTween(name, styleFunction6(name, i, tweenValue3(this, "style." + name, value))).each(styleMaybeRemove3(this._id, name)) : this.styleTween(name, styleConstant6(name, i, value), priority).on("end.style." + name, null);
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate3(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween3(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate3(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default3(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween3(name, value, priority == null ? "" : priority));
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/text.js
function textConstant6(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction6(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default7(value) {
  return this.tween("text", typeof value === "function" ? textFunction6(tweenValue3(this, "text", value)) : textConstant6(value == null ? "" : value + ""));
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/textTween.js
function textInterpolate3(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween3(value) {
  var t06, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t06 = (i0 = i) && textInterpolate3(i);
    return t06;
  }
  tween._value = value;
  return tween;
}
function textTween_default3(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween3(value));
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/transition.js
function transition_default5() {
  var name = this._name, id0 = this._id, id1 = newId3();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit4 = get6(node, id0);
        schedule_default3(node, name, id1, i, group, {
          time: inherit4.time + inherit4.delay + inherit4.duration,
          delay: 0,
          duration: inherit4.duration,
          ease: inherit4.ease
        });
      }
    }
  }
  return new Transition3(groups, this._parents, name, id1);
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/end.js
function end_default3() {
  var on0, on1, that = this, id4 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {
      value: reject
    }, end = {
      value: function() {
        if (--size === 0) resolve();
      }
    };
    that.each(function() {
      var schedule = set6(this, id4), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
  });
}

// node_modules/d3-zoom/node_modules/d3-transition/src/transition/index.js
var id3 = 0;
function Transition3(groups, parents, name, id4) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id4;
}
function transition3(name) {
  return selection_default5().transition(name);
}
function newId3() {
  return ++id3;
}
var selection_prototype3 = selection_default5.prototype;
Transition3.prototype = transition3.prototype = {
  constructor: Transition3,
  select: select_default9,
  selectAll: selectAll_default9,
  filter: filter_default6,
  merge: merge_default10,
  selection: selection_default6,
  transition: transition_default5,
  call: selection_prototype3.call,
  nodes: selection_prototype3.nodes,
  node: selection_prototype3.node,
  size: selection_prototype3.size,
  empty: selection_prototype3.empty,
  each: selection_prototype3.each,
  on: on_default6,
  attr: attr_default6,
  attrTween: attrTween_default3,
  style: style_default6,
  styleTween: styleTween_default3,
  text: text_default7,
  textTween: textTween_default3,
  remove: remove_default6,
  tween: tween_default3,
  delay: delay_default3,
  duration: duration_default3,
  ease: ease_default3,
  end: end_default3
};

// node_modules/d3-zoom/node_modules/d3-transition/src/selection/transition.js
var defaultTiming3 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit3(node, id4) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id4])) {
    if (!(node = node.parentNode)) {
      return defaultTiming3.time = now3(), defaultTiming3;
    }
  }
  return timing;
}
function transition_default6(name) {
  var id4, timing;
  if (name instanceof Transition3) {
    id4 = name._id, name = name._name;
  } else {
    id4 = newId3(), (timing = defaultTiming3).time = now3(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default3(node, name, id4, i, group, timing || inherit3(node, id4));
      }
    }
  }
  return new Transition3(groups, this._parents, name, id4);
}

// node_modules/d3-zoom/node_modules/d3-transition/src/selection/index.js
selection_default5.prototype.interrupt = interrupt_default6;
selection_default5.prototype.transition = transition_default6;

// node_modules/d3-zoom/src/constant.js
function constant_default22(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-zoom/src/event.js
function ZoomEvent(target, type2, transform2) {
  this.target = target;
  this.type = type2;
  this.transform = transform2;
}

// node_modules/d3-zoom/src/transform.js
function Transform(k, x2, y2) {
  this.k = k;
  this.x = x2;
  this.y = y2;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x2, y2) {
    return x2 === 0 & y2 === 0 ? this : new Transform(this.k, this.x + this.k * x2, this.y + this.k * y2);
  },
  apply: function(point2) {
    return [point2[0] * this.k + this.x, point2[1] * this.k + this.y];
  },
  applyX: function(x2) {
    return x2 * this.k + this.x;
  },
  applyY: function(y2) {
    return y2 * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x2) {
    return (x2 - this.x) / this.k;
  },
  invertY: function(y2) {
    return (y2 - this.y) / this.k;
  },
  rescaleX: function(x2) {
    return x2.copy().domain(x2.range().map(this.invertX, this).map(x2.invert, x2));
  },
  rescaleY: function(y2) {
    return y2.copy().domain(y2.range().map(this.invertY, this).map(y2.invert, y2));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity7 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity7;
  return node.__zoom;
}

// node_modules/d3-zoom/src/noevent.js
function nopropagation5() {
  event3.stopImmediatePropagation();
}
function noevent_default5() {
  event3.preventDefault();
  event3.stopImmediatePropagation();
}

// node_modules/d3-zoom/src/zoom.js
function defaultFilter3() {
  return !event3.ctrlKey && !event3.button;
}
function defaultExtent2() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
  return this.__zoom || identity7;
}
function defaultWheelDelta() {
  return -event3.deltaY * (event3.deltaMode === 1 ? 0.05 : event3.deltaMode ? 1 : 2e-3);
}
function defaultTouchable3() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform2, extent, translateExtent) {
  var dx0 = transform2.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent[1][1]) - translateExtent[1][1];
  return transform2.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
}
function zoom_default5() {
  var filter = defaultFilter3, extent = defaultExtent2, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable3, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom_default4, listeners = dispatch_default5("start", "zoom", "end"), touchstarting, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0;
  function zoom(selection4) {
    selection4.property("__zoom", defaultTransform).on("wheel.zoom", wheeled).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  zoom.transform = function(collection, transform2, point2) {
    var selection4 = collection.selection ? collection.selection() : collection;
    selection4.property("__zoom", defaultTransform);
    if (collection !== selection4) {
      schedule(collection, transform2, point2);
    } else {
      selection4.interrupt().each(function() {
        gesture(this, arguments).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
      });
    }
  };
  zoom.scaleBy = function(selection4, k, p) {
    zoom.scaleTo(selection4, function() {
      var k0 = this.__zoom.k, k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p);
  };
  zoom.scaleTo = function(selection4, k, p) {
    zoom.transform(selection4, function() {
      var e = extent.apply(this, arguments), t06 = this.__zoom, p02 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t06.invert(p02), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t06, k1), p02, p1), e, translateExtent);
    }, p);
  };
  zoom.translateBy = function(selection4, x2, y2) {
    zoom.transform(selection4, function() {
      return constrain(this.__zoom.translate(typeof x2 === "function" ? x2.apply(this, arguments) : x2, typeof y2 === "function" ? y2.apply(this, arguments) : y2), extent.apply(this, arguments), translateExtent);
    });
  };
  zoom.translateTo = function(selection4, x2, y2, p) {
    zoom.transform(selection4, function() {
      var e = extent.apply(this, arguments), t = this.__zoom, p02 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity7.translate(p02[0], p02[1]).scale(t.k).translate(typeof x2 === "function" ? -x2.apply(this, arguments) : -x2, typeof y2 === "function" ? -y2.apply(this, arguments) : -y2), e, translateExtent);
    }, p);
  };
  function scale(transform2, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform2.k ? transform2 : new Transform(k, transform2.x, transform2.y);
  }
  function translate(transform2, p02, p1) {
    var x2 = p02[0] - p1[0] * transform2.k, y2 = p02[1] - p1[1] * transform2.k;
    return x2 === transform2.x && y2 === transform2.y ? transform2 : new Transform(transform2.k, x2, y2);
  }
  function centroid(extent2) {
    return [(+extent2[0][0] + +extent2[1][0]) / 2, (+extent2[0][1] + +extent2[1][1]) / 2];
  }
  function schedule(transition4, transform2, point2) {
    transition4.on("start.zoom", function() {
      gesture(this, arguments).start();
    }).on("interrupt.zoom end.zoom", function() {
      gesture(this, arguments).end();
    }).tween("zoom", function() {
      var that = this, args = arguments, g = gesture(that, args), e = extent.apply(that, args), p = point2 == null ? centroid(e) : typeof point2 === "function" ? point2.apply(that, args) : point2, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
      return function(t) {
        if (t === 1) t = b;
        else {
          var l = i(t), k = w / l[2];
          t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
        }
        g.zoom(null, t);
      };
    });
  }
  function gesture(that, args, clean) {
    return !clean && that.__zooming || new Gesture(that, args);
  }
  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }
  Gesture.prototype = {
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform2) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform2.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform2.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform2.invert(this.touch1[0]);
      this.that.__zoom = transform2;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type2) {
      customEvent3(new ZoomEvent(zoom, type2, this.that.__zoom), listeners.apply, listeners, [type2, this.that, this.args]);
    }
  };
  function wheeled() {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, arguments), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = mouse_default3(this);
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    } else if (t.k === k) return;
    else {
      g.mouse = [p, t.invert(p)];
      interrupt_default5(this);
      g.start();
    }
    noevent_default5();
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }
  function mousedowned() {
    if (touchending || !filter.apply(this, arguments)) return;
    var g = gesture(this, arguments, true), v = select_default8(event3.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = mouse_default3(this), x06 = event3.clientX, y06 = event3.clientY;
    nodrag_default3(event3.view);
    nopropagation5();
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt_default5(this);
    g.start();
    function mousemoved() {
      noevent_default5();
      if (!g.moved) {
        var dx = event3.clientX - x06, dy = event3.clientY - y06;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = mouse_default3(g.that), g.mouse[1]), g.extent, translateExtent));
    }
    function mouseupped() {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag3(event3.view, g.moved);
      noevent_default5();
      g.end();
    }
  }
  function dblclicked() {
    if (!filter.apply(this, arguments)) return;
    var t06 = this.__zoom, p02 = mouse_default3(this), p1 = t06.invert(p02), k1 = t06.k * (event3.shiftKey ? 0.5 : 2), t16 = constrain(translate(scale(t06, k1), p02, p1), extent.apply(this, arguments), translateExtent);
    noevent_default5();
    if (duration > 0) select_default8(this).transition().duration(duration).call(schedule, t16, p02);
    else select_default8(this).call(zoom.transform, t16);
  }
  function touchstarted() {
    if (!filter.apply(this, arguments)) return;
    var touches = event3.touches, n = touches.length, g = gesture(this, arguments, event3.changedTouches.length === n), started, i, t, p;
    nopropagation5();
    for (i = 0; i < n; ++i) {
      t = touches[i], p = touch_default3(this, touches, t.identifier);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    if (started) {
      if (g.taps < 2) touchstarting = setTimeout(function() {
        touchstarting = null;
      }, touchDelay);
      interrupt_default5(this);
      g.start();
    }
  }
  function touchmoved() {
    if (!this.__zooming) return;
    var g = gesture(this, arguments), touches = event3.changedTouches, n = touches.length, i, t, p, l;
    noevent_default5();
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    g.taps = 0;
    for (i = 0; i < n; ++i) {
      t = touches[i], p = touch_default3(this, touches, t.identifier);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p02 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p02[0]) * dp + (dp = p1[1] - p02[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p02[0] + p1[0]) / 2, (p02[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    } else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }
  function touchended() {
    if (!this.__zooming) return;
    var g = gesture(this, arguments), touches = event3.changedTouches, n = touches.length, i, t;
    nopropagation5();
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      if (g.taps === 2) {
        var p = select_default8(this).on("dblclick.zoom");
        if (p) p.apply(this, arguments);
      }
    }
  }
  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant_default22(+_), zoom) : wheelDelta;
  };
  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default22(!!_), zoom) : filter;
  };
  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default22(!!_), zoom) : touchable;
  };
  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant_default22([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };
  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };
  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };
  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };
  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };
  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };
  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };
  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };
  return zoom;
}
export {
  FormatSpecifier,
  active_default2 as active,
  arc_default as arc,
  area_default as area,
  areaRadial_default as areaRadial,
  ascending_default2 as ascending,
  autoType,
  axisBottom,
  axisLeft,
  axisRight,
  axisTop,
  bisect_default as bisect,
  bisectLeft,
  bisectRight,
  bisector_default as bisector,
  blob_default as blob,
  brush_default as brush,
  brushSelection,
  brushX,
  brushY,
  buffer_default as buffer,
  chord_default as chord,
  point_default2 as clientPoint,
  cluster_default as cluster,
  color2 as color,
  density_default as contourDensity,
  contours_default as contours,
  create_default2 as create,
  creator_default2 as creator,
  cross_default2 as cross,
  csv2 as csv,
  csvFormat,
  csvFormatBody,
  csvFormatRow,
  csvFormatRows,
  csvFormatValue,
  csvParse,
  csvParseRows,
  cubehelix3 as cubehelix,
  basis_default as curveBasis,
  basisClosed_default as curveBasisClosed,
  basisOpen_default as curveBasisOpen,
  bundle_default as curveBundle,
  cardinal_default as curveCardinal,
  cardinalClosed_default as curveCardinalClosed,
  cardinalOpen_default as curveCardinalOpen,
  catmullRom_default as curveCatmullRom,
  catmullRomClosed_default as curveCatmullRomClosed,
  catmullRomOpen_default as curveCatmullRomOpen,
  linear_default as curveLinear,
  linearClosed_default as curveLinearClosed,
  monotoneX as curveMonotoneX,
  monotoneY as curveMonotoneY,
  natural_default as curveNatural,
  step_default as curveStep,
  stepAfter as curveStepAfter,
  stepBefore as curveStepBefore,
  customEvent2 as customEvent,
  descending_default2 as descending,
  deviation_default as deviation,
  dispatch_default3 as dispatch,
  drag_default2 as drag,
  nodrag_default2 as dragDisable,
  yesdrag2 as dragEnable,
  dsv,
  dsv_default as dsvFormat,
  backInOut as easeBack,
  backIn as easeBackIn,
  backInOut as easeBackInOut,
  backOut as easeBackOut,
  bounceOut as easeBounce,
  bounceIn as easeBounceIn,
  bounceInOut as easeBounceInOut,
  bounceOut as easeBounceOut,
  circleInOut as easeCircle,
  circleIn as easeCircleIn,
  circleInOut as easeCircleInOut,
  circleOut as easeCircleOut,
  cubicInOut as easeCubic,
  cubicIn as easeCubicIn,
  cubicInOut as easeCubicInOut,
  cubicOut as easeCubicOut,
  elasticOut as easeElastic,
  elasticIn as easeElasticIn,
  elasticInOut as easeElasticInOut,
  elasticOut as easeElasticOut,
  expInOut as easeExp,
  expIn as easeExpIn,
  expInOut as easeExpInOut,
  expOut as easeExpOut,
  linear as easeLinear,
  polyInOut as easePoly,
  polyIn as easePolyIn,
  polyInOut as easePolyInOut,
  polyOut as easePolyOut,
  quadInOut as easeQuad,
  quadIn as easeQuadIn,
  quadInOut as easeQuadInOut,
  quadOut as easeQuadOut,
  sinInOut as easeSin,
  sinIn as easeSinIn,
  sinInOut as easeSinInOut,
  sinOut as easeSinOut,
  entries_default as entries,
  event2 as event,
  extent_default as extent,
  center_default as forceCenter,
  collide_default as forceCollide,
  link_default as forceLink,
  manyBody_default as forceManyBody,
  radial_default as forceRadial,
  simulation_default as forceSimulation,
  x_default as forceX,
  y_default as forceY,
  format,
  defaultLocale as formatDefaultLocale,
  locale_default as formatLocale,
  formatPrefix,
  formatSpecifier,
  albers_default as geoAlbers,
  albersUsa_default as geoAlbersUsa,
  area_default3 as geoArea,
  azimuthalEqualArea_default as geoAzimuthalEqualArea,
  azimuthalEqualAreaRaw as geoAzimuthalEqualAreaRaw,
  azimuthalEquidistant_default as geoAzimuthalEquidistant,
  azimuthalEquidistantRaw as geoAzimuthalEquidistantRaw,
  bounds_default as geoBounds,
  centroid_default as geoCentroid,
  circle_default2 as geoCircle,
  antimeridian_default as geoClipAntimeridian,
  circle_default3 as geoClipCircle,
  extent_default5 as geoClipExtent,
  clipRectangle as geoClipRectangle,
  conicConformal_default as geoConicConformal,
  conicConformalRaw as geoConicConformalRaw,
  conicEqualArea_default as geoConicEqualArea,
  conicEqualAreaRaw as geoConicEqualAreaRaw,
  conicEquidistant_default as geoConicEquidistant,
  conicEquidistantRaw as geoConicEquidistantRaw,
  contains_default2 as geoContains,
  distance_default as geoDistance,
  equalEarth_default as geoEqualEarth,
  equalEarthRaw as geoEqualEarthRaw,
  equirectangular_default as geoEquirectangular,
  equirectangularRaw as geoEquirectangularRaw,
  gnomonic_default as geoGnomonic,
  gnomonicRaw as geoGnomonicRaw,
  graticule as geoGraticule,
  graticule10 as geoGraticule10,
  identity_default8 as geoIdentity,
  interpolate_default2 as geoInterpolate,
  length_default as geoLength,
  mercator_default as geoMercator,
  mercatorRaw as geoMercatorRaw,
  naturalEarth1_default as geoNaturalEarth1,
  naturalEarth1Raw as geoNaturalEarth1Raw,
  orthographic_default as geoOrthographic,
  orthographicRaw as geoOrthographicRaw,
  path_default2 as geoPath,
  projection as geoProjection,
  projectionMutator as geoProjectionMutator,
  rotation_default as geoRotation,
  stereographic_default as geoStereographic,
  stereographicRaw as geoStereographicRaw,
  stream_default as geoStream,
  transform_default as geoTransform,
  transverseMercator_default as geoTransverseMercator,
  transverseMercatorRaw as geoTransverseMercatorRaw,
  gray2 as gray,
  hcl3 as hcl,
  hierarchy,
  histogram_default as histogram,
  hsl3 as hsl,
  html,
  image_default as image,
  value_default2 as interpolate,
  array_default2 as interpolateArray,
  basis_default3 as interpolateBasis,
  basisClosed_default3 as interpolateBasisClosed,
  Blues_default as interpolateBlues,
  BrBG_default as interpolateBrBG,
  BuGn_default as interpolateBuGn,
  BuPu_default as interpolateBuPu,
  cividis_default as interpolateCividis,
  cool as interpolateCool,
  cubehelix_default2 as interpolateCubehelix,
  cubehelix_default4 as interpolateCubehelixDefault,
  cubehelixLong2 as interpolateCubehelixLong,
  date_default2 as interpolateDate,
  discrete_default2 as interpolateDiscrete,
  GnBu_default as interpolateGnBu,
  Greens_default as interpolateGreens,
  Greys_default as interpolateGreys,
  hcl_default2 as interpolateHcl,
  hclLong2 as interpolateHclLong,
  hsl_default2 as interpolateHsl,
  hslLong2 as interpolateHslLong,
  hue_default2 as interpolateHue,
  inferno as interpolateInferno,
  lab4 as interpolateLab,
  magma as interpolateMagma,
  number_default6 as interpolateNumber,
  numberArray_default2 as interpolateNumberArray,
  object_default2 as interpolateObject,
  OrRd_default as interpolateOrRd,
  Oranges_default as interpolateOranges,
  PRGn_default as interpolatePRGn,
  PiYG_default as interpolatePiYG,
  plasma as interpolatePlasma,
  PuBu_default as interpolatePuBu,
  PuBuGn_default as interpolatePuBuGn,
  PuOr_default as interpolatePuOr,
  PuRd_default as interpolatePuRd,
  Purples_default as interpolatePurples,
  rainbow_default as interpolateRainbow,
  RdBu_default as interpolateRdBu,
  RdGy_default as interpolateRdGy,
  RdPu_default as interpolateRdPu,
  RdYlBu_default as interpolateRdYlBu,
  RdYlGn_default as interpolateRdYlGn,
  Reds_default as interpolateReds,
  rgb_default2 as interpolateRgb,
  rgbBasis2 as interpolateRgbBasis,
  rgbBasisClosed2 as interpolateRgbBasisClosed,
  round_default3 as interpolateRound,
  sinebow_default as interpolateSinebow,
  Spectral_default as interpolateSpectral,
  string_default2 as interpolateString,
  interpolateTransformCss2 as interpolateTransformCss,
  interpolateTransformSvg2 as interpolateTransformSvg,
  turbo_default as interpolateTurbo,
  viridis_default as interpolateViridis,
  warm as interpolateWarm,
  YlGn_default as interpolateYlGn,
  YlGnBu_default as interpolateYlGnBu,
  YlOrBr_default as interpolateYlOrBr,
  YlOrRd_default as interpolateYlOrRd,
  zoom_default2 as interpolateZoom,
  interrupt_default3 as interrupt,
  interval_default2 as interval,
  isoFormat_default as isoFormat,
  isoParse_default as isoParse,
  json_default as json,
  keys_default as keys,
  lab3 as lab,
  lch2 as lch,
  line_default as line,
  lineRadial_default as lineRadial,
  linkHorizontal,
  linkRadial,
  linkVertical,
  local3 as local,
  map_default as map,
  matcher_default2 as matcher,
  max_default as max,
  mean_default as mean,
  median_default as median,
  merge_default as merge,
  min_default as min,
  mouse_default2 as mouse,
  namespace_default2 as namespace,
  namespaces_default2 as namespaces,
  nest_default as nest,
  now2 as now,
  pack_default as pack,
  enclose_default as packEnclose,
  siblings_default as packSiblings,
  pairs_default as pairs,
  partition_default as partition,
  path_default as path,
  permute_default as permute,
  pie_default as pie,
  piecewise2 as piecewise,
  pointRadial_default as pointRadial,
  area_default5 as polygonArea,
  centroid_default3 as polygonCentroid,
  contains_default3 as polygonContains,
  hull_default as polygonHull,
  length_default2 as polygonLength,
  precisionFixed_default as precisionFixed,
  precisionPrefix_default as precisionPrefix,
  precisionRound_default as precisionRound,
  quadtree,
  quantile_default as quantile,
  quantize_default2 as quantize,
  areaRadial_default as radialArea,
  lineRadial_default as radialLine,
  bates_default as randomBates,
  exponential_default as randomExponential,
  irwinHall_default as randomIrwinHall,
  logNormal_default as randomLogNormal,
  normal_default as randomNormal,
  uniform_default as randomUniform,
  range_default as range,
  rgb2 as rgb,
  ribbon_default as ribbon,
  band as scaleBand,
  diverging as scaleDiverging,
  divergingLog as scaleDivergingLog,
  divergingPow as scaleDivergingPow,
  divergingSqrt as scaleDivergingSqrt,
  divergingSymlog as scaleDivergingSymlog,
  identity4 as scaleIdentity,
  implicit as scaleImplicit,
  linear4 as scaleLinear,
  log2 as scaleLog,
  ordinal as scaleOrdinal,
  point as scalePoint,
  pow2 as scalePow,
  quantile as scaleQuantile,
  quantize as scaleQuantize,
  sequential as scaleSequential,
  sequentialLog as scaleSequentialLog,
  sequentialPow as scaleSequentialPow,
  sequentialQuantile as scaleSequentialQuantile,
  sequentialSqrt as scaleSequentialSqrt,
  sequentialSymlog as scaleSequentialSymlog,
  sqrt2 as scaleSqrt,
  symlog as scaleSymlog,
  threshold as scaleThreshold,
  time_default as scaleTime,
  utcTime_default as scaleUtc,
  scan_default as scan,
  Accent_default as schemeAccent,
  scheme22 as schemeBlues,
  scheme as schemeBrBG,
  scheme10 as schemeBuGn,
  scheme11 as schemeBuPu,
  category10_default as schemeCategory10,
  Dark2_default as schemeDark2,
  scheme12 as schemeGnBu,
  scheme23 as schemeGreens,
  scheme24 as schemeGreys,
  scheme13 as schemeOrRd,
  scheme27 as schemeOranges,
  scheme2 as schemePRGn,
  Paired_default as schemePaired,
  Pastel1_default as schemePastel1,
  Pastel2_default as schemePastel2,
  scheme3 as schemePiYG,
  scheme15 as schemePuBu,
  scheme14 as schemePuBuGn,
  scheme4 as schemePuOr,
  scheme16 as schemePuRd,
  scheme25 as schemePurples,
  scheme5 as schemeRdBu,
  scheme6 as schemeRdGy,
  scheme17 as schemeRdPu,
  scheme7 as schemeRdYlBu,
  scheme8 as schemeRdYlGn,
  scheme26 as schemeReds,
  Set1_default as schemeSet1,
  Set2_default as schemeSet2,
  Set3_default as schemeSet3,
  scheme9 as schemeSpectral,
  Tableau10_default as schemeTableau10,
  scheme19 as schemeYlGn,
  scheme18 as schemeYlGnBu,
  scheme20 as schemeYlOrBr,
  scheme21 as schemeYlOrRd,
  select_default5 as select,
  selectAll_default5 as selectAll,
  selection_default3 as selection,
  selector_default2 as selector,
  selectorAll_default2 as selectorAll,
  set_default as set,
  shuffle_default as shuffle,
  stack_default as stack,
  diverging_default as stackOffsetDiverging,
  expand_default as stackOffsetExpand,
  none_default as stackOffsetNone,
  silhouette_default as stackOffsetSilhouette,
  wiggle_default as stackOffsetWiggle,
  appearance_default as stackOrderAppearance,
  ascending_default as stackOrderAscending,
  descending_default as stackOrderDescending,
  insideOut_default as stackOrderInsideOut,
  none_default2 as stackOrderNone,
  reverse_default as stackOrderReverse,
  stratify_default as stratify,
  styleValue2 as style,
  sum_default as sum,
  svg,
  symbol_default as symbol,
  circle_default as symbolCircle,
  cross_default as symbolCross,
  diamond_default as symbolDiamond,
  square_default as symbolSquare,
  star_default as symbolStar,
  triangle_default as symbolTriangle,
  wye_default as symbolWye,
  symbols,
  text_default4 as text,
  freedmanDiaconis_default as thresholdFreedmanDiaconis,
  scott_default as thresholdScott,
  sturges_default as thresholdSturges,
  tickFormat_default as tickFormat,
  tickIncrement,
  tickStep,
  ticks_default as ticks,
  day_default as timeDay,
  days as timeDays,
  timeFormat,
  defaultLocale2 as timeFormatDefaultLocale,
  formatLocale as timeFormatLocale,
  friday as timeFriday,
  fridays as timeFridays,
  hour_default as timeHour,
  hours as timeHours,
  newInterval as timeInterval,
  millisecond_default as timeMillisecond,
  milliseconds as timeMilliseconds,
  minute_default as timeMinute,
  minutes as timeMinutes,
  monday as timeMonday,
  mondays as timeMondays,
  month_default as timeMonth,
  months as timeMonths,
  timeParse,
  saturday as timeSaturday,
  saturdays as timeSaturdays,
  second_default as timeSecond,
  seconds as timeSeconds,
  sunday as timeSunday,
  sundays as timeSundays,
  thursday as timeThursday,
  thursdays as timeThursdays,
  tuesday as timeTuesday,
  tuesdays as timeTuesdays,
  wednesday as timeWednesday,
  wednesdays as timeWednesdays,
  sunday as timeWeek,
  sundays as timeWeeks,
  year_default as timeYear,
  years as timeYears,
  timeout_default2 as timeout,
  timer2 as timer,
  timerFlush2 as timerFlush,
  touch_default2 as touch,
  touches_default2 as touches,
  transition2 as transition,
  transpose_default as transpose,
  tree_default as tree,
  treemap_default as treemap,
  binary_default as treemapBinary,
  dice_default as treemapDice,
  resquarify_default as treemapResquarify,
  slice_default as treemapSlice,
  sliceDice_default as treemapSliceDice,
  squarify_default as treemapSquarify,
  tsv2 as tsv,
  tsvFormat,
  tsvFormatBody,
  tsvFormatRow,
  tsvFormatRows,
  tsvFormatValue,
  tsvParse,
  tsvParseRows,
  utcDay_default as utcDay,
  utcDays,
  utcFormat,
  utcFriday,
  utcFridays,
  utcHour_default as utcHour,
  utcHours,
  millisecond_default as utcMillisecond,
  milliseconds as utcMilliseconds,
  utcMinute_default as utcMinute,
  utcMinutes,
  utcMonday,
  utcMondays,
  utcMonth_default as utcMonth,
  utcMonths,
  utcParse,
  utcSaturday,
  utcSaturdays,
  second_default as utcSecond,
  seconds as utcSeconds,
  utcSunday,
  utcSundays,
  utcThursday,
  utcThursdays,
  utcTuesday,
  utcTuesdays,
  utcWednesday,
  utcWednesdays,
  utcSunday as utcWeek,
  utcSundays as utcWeeks,
  utcYear_default as utcYear,
  utcYears,
  values_default as values,
  variance_default as variance,
  version,
  voronoi_default as voronoi,
  window_default2 as window,
  xml_default as xml,
  zip_default as zip,
  zoom_default5 as zoom,
  identity7 as zoomIdentity,
  transform as zoomTransform
};
//# sourceMappingURL=d3.js.map
