import {
  hasValue,
  isArray,
  prettifyEnum
} from "./chunk-CXBZG2KN.js";
import "./chunk-YVVWEX43.js";
import "./chunk-BAPT2NZ6.js";
import "./chunk-E47TDE7S.js";
import {
  AsyncPipe,
  CommonModule
} from "./chunk-ZZYSP2DO.js";
import {
  NgModule,
  Pipe,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵgetInheritedFactory
} from "./chunk-QVSDJNBB.js";
import "./chunk-N4YBMVXL.js";
import "./chunk-DVE26OTL.js";
import "./chunk-LDBH3HRD.js";
import "./chunk-4FVJWPNW.js";
import "./chunk-VNZ2F6MF.js";

// node_modules/@sentinel/common/fesm2022/sentinel-common-pipes.mjs
var _SentinelHasElementsPipe = class _SentinelHasElementsPipe {
  transform(value) {
    if (value === void 0 || value === null) {
      return false;
    }
    if (isArray(value)) {
      return value.length > 0;
    } else {
      return value.data && value.data.length > 0;
    }
  }
};
_SentinelHasElementsPipe.ɵfac = function SentinelHasElementsPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SentinelHasElementsPipe)();
};
_SentinelHasElementsPipe.ɵpipe = ɵɵdefinePipe({
  name: "sentinelHasElements",
  type: _SentinelHasElementsPipe,
  pure: true
});
var SentinelHasElementsPipe = _SentinelHasElementsPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SentinelHasElementsPipe, [{
    type: Pipe,
    args: [{
      name: "sentinelHasElements"
    }]
  }], null, null);
})();
var _SentinelPrettifyEnumPipe = class _SentinelPrettifyEnumPipe {
  transform(value) {
    return prettifyEnum(value);
  }
};
_SentinelPrettifyEnumPipe.ɵfac = function SentinelPrettifyEnumPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SentinelPrettifyEnumPipe)();
};
_SentinelPrettifyEnumPipe.ɵpipe = ɵɵdefinePipe({
  name: "sentinelPrettifyEnum",
  type: _SentinelPrettifyEnumPipe,
  pure: true
});
var SentinelPrettifyEnumPipe = _SentinelPrettifyEnumPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SentinelPrettifyEnumPipe, [{
    type: Pipe,
    args: [{
      name: "sentinelPrettifyEnum"
    }]
  }], null, null);
})();
var _SentinelAsyncPipe = class _SentinelAsyncPipe extends AsyncPipe {
  transform(obj, defaultValue) {
    const asyncPipeResult = super.transform(obj);
    if (asyncPipeResult !== void 0 && asyncPipeResult !== null) {
      return asyncPipeResult;
    } else {
      if (defaultValue) {
        return defaultValue;
      } else {
        return void 0;
      }
    }
  }
};
_SentinelAsyncPipe.ɵfac = /* @__PURE__ */ (() => {
  let ɵSentinelAsyncPipe_BaseFactory;
  return function SentinelAsyncPipe_Factory(__ngFactoryType__) {
    return (ɵSentinelAsyncPipe_BaseFactory || (ɵSentinelAsyncPipe_BaseFactory = ɵɵgetInheritedFactory(_SentinelAsyncPipe)))(__ngFactoryType__ || _SentinelAsyncPipe);
  };
})();
_SentinelAsyncPipe.ɵpipe = ɵɵdefinePipe({
  name: "sAsync",
  type: _SentinelAsyncPipe,
  pure: false
});
var SentinelAsyncPipe = _SentinelAsyncPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SentinelAsyncPipe, [{
    type: Pipe,
    args: [{
      name: "sAsync",
      pure: false
    }]
  }], null, null);
})();
var _SentinelElementsTooltipPipe = class _SentinelElementsTooltipPipe {
  transform(elements, name = "element") {
    const lowerCased = name.toLowerCase();
    if (elements === void 0 || elements.length === 0) {
      return `No ${lowerCased}s`;
    }
    if (elements.length === 1) {
      return `1 ${lowerCased}`;
    }
    return `${elements.length} ${lowerCased}s`;
  }
};
_SentinelElementsTooltipPipe.ɵfac = function SentinelElementsTooltipPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SentinelElementsTooltipPipe)();
};
_SentinelElementsTooltipPipe.ɵpipe = ɵɵdefinePipe({
  name: "sentinelElementsTooltip",
  type: _SentinelElementsTooltipPipe,
  pure: true
});
var SentinelElementsTooltipPipe = _SentinelElementsTooltipPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SentinelElementsTooltipPipe, [{
    type: Pipe,
    args: [{
      name: "sentinelElementsTooltip"
    }]
  }], null, null);
})();
var _SentinelShortStringPipe = class _SentinelShortStringPipe {
  transform(text, maxLength = 10) {
    if (text === void 0 || text === null) {
      return "";
    }
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }
};
_SentinelShortStringPipe.ɵfac = function SentinelShortStringPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SentinelShortStringPipe)();
};
_SentinelShortStringPipe.ɵpipe = ɵɵdefinePipe({
  name: "sentinelShortString",
  type: _SentinelShortStringPipe,
  pure: true
});
var SentinelShortStringPipe = _SentinelShortStringPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SentinelShortStringPipe, [{
    type: Pipe,
    args: [{
      name: "sentinelShortString"
    }]
  }], null, null);
})();
var _SentinelTooltipOnShortenedPipe = class _SentinelTooltipOnShortenedPipe {
  transform(value, maxLength = 30) {
    if (value === void 0 || value === null) {
      return "";
    } else {
      return value.length > maxLength ? value : "";
    }
  }
};
_SentinelTooltipOnShortenedPipe.ɵfac = function SentinelTooltipOnShortenedPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SentinelTooltipOnShortenedPipe)();
};
_SentinelTooltipOnShortenedPipe.ɵpipe = ɵɵdefinePipe({
  name: "sentinelTooltipOnShortened",
  type: _SentinelTooltipOnShortenedPipe,
  pure: true
});
var SentinelTooltipOnShortenedPipe = _SentinelTooltipOnShortenedPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SentinelTooltipOnShortenedPipe, [{
    type: Pipe,
    args: [{
      name: "sentinelTooltipOnShortened"
    }]
  }], null, null);
})();
var _SentinelDashReplacePipe = class _SentinelDashReplacePipe {
  transform(value, replaceWith = " ") {
    return value.replace(new RegExp("[_-]"), replaceWith);
  }
};
_SentinelDashReplacePipe.ɵfac = function SentinelDashReplacePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SentinelDashReplacePipe)();
};
_SentinelDashReplacePipe.ɵpipe = ɵɵdefinePipe({
  name: "sentinelDashReplace",
  type: _SentinelDashReplacePipe,
  pure: true
});
var SentinelDashReplacePipe = _SentinelDashReplacePipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SentinelDashReplacePipe, [{
    type: Pipe,
    args: [{
      name: "sentinelDashReplace"
    }]
  }], null, null);
})();
var _SentinelDefaultValueStringPipe = class _SentinelDefaultValueStringPipe {
  transform(value, defaultValue = "") {
    return value ? value : defaultValue;
  }
};
_SentinelDefaultValueStringPipe.ɵfac = function SentinelDefaultValueStringPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SentinelDefaultValueStringPipe)();
};
_SentinelDefaultValueStringPipe.ɵpipe = ɵɵdefinePipe({
  name: "sentinelDefaultValueString",
  type: _SentinelDefaultValueStringPipe,
  pure: true
});
var SentinelDefaultValueStringPipe = _SentinelDefaultValueStringPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SentinelDefaultValueStringPipe, [{
    type: Pipe,
    args: [{
      name: "sentinelDefaultValueString"
    }]
  }], null, null);
})();
var _SentinelDefaultValueArrayPipe = class _SentinelDefaultValueArrayPipe {
  transform(value, defaultValue = []) {
    return value ? value : defaultValue;
  }
};
_SentinelDefaultValueArrayPipe.ɵfac = function SentinelDefaultValueArrayPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SentinelDefaultValueArrayPipe)();
};
_SentinelDefaultValueArrayPipe.ɵpipe = ɵɵdefinePipe({
  name: "sentinelDefaultValueArray",
  type: _SentinelDefaultValueArrayPipe,
  pure: true
});
var SentinelDefaultValueArrayPipe = _SentinelDefaultValueArrayPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SentinelDefaultValueArrayPipe, [{
    type: Pipe,
    args: [{
      name: "sentinelDefaultValueArray"
    }]
  }], null, null);
})();
var _SentinelHasValuePipe = class _SentinelHasValuePipe {
  transform(value) {
    return hasValue(value);
  }
};
_SentinelHasValuePipe.ɵfac = function SentinelHasValuePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SentinelHasValuePipe)();
};
_SentinelHasValuePipe.ɵpipe = ɵɵdefinePipe({
  name: "sentinelHasValue",
  type: _SentinelHasValuePipe,
  pure: true
});
var SentinelHasValuePipe = _SentinelHasValuePipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SentinelHasValuePipe, [{
    type: Pipe,
    args: [{
      name: "sentinelHasValue"
    }]
  }], null, null);
})();
var _SentinelPipesModule = class _SentinelPipesModule {
};
_SentinelPipesModule.ɵfac = function SentinelPipesModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SentinelPipesModule)();
};
_SentinelPipesModule.ɵmod = ɵɵdefineNgModule({
  type: _SentinelPipesModule,
  declarations: [SentinelDefaultValueArrayPipe, SentinelDefaultValueStringPipe, SentinelDashReplacePipe, SentinelHasValuePipe, SentinelTooltipOnShortenedPipe, SentinelShortStringPipe, SentinelAsyncPipe, SentinelElementsTooltipPipe, SentinelHasElementsPipe, SentinelPrettifyEnumPipe],
  imports: [CommonModule],
  exports: [SentinelDefaultValueArrayPipe, SentinelDefaultValueStringPipe, SentinelDashReplacePipe, SentinelTooltipOnShortenedPipe, SentinelShortStringPipe, SentinelAsyncPipe, SentinelElementsTooltipPipe, SentinelHasElementsPipe, SentinelPrettifyEnumPipe, SentinelHasValuePipe]
});
_SentinelPipesModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule]
});
var SentinelPipesModule = _SentinelPipesModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SentinelPipesModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [SentinelDefaultValueArrayPipe, SentinelDefaultValueStringPipe, SentinelDashReplacePipe, SentinelHasValuePipe, SentinelTooltipOnShortenedPipe, SentinelShortStringPipe, SentinelAsyncPipe, SentinelElementsTooltipPipe, SentinelHasElementsPipe, SentinelPrettifyEnumPipe],
      exports: [SentinelDefaultValueArrayPipe, SentinelDefaultValueStringPipe, SentinelDashReplacePipe, SentinelTooltipOnShortenedPipe, SentinelShortStringPipe, SentinelAsyncPipe, SentinelElementsTooltipPipe, SentinelHasElementsPipe, SentinelPrettifyEnumPipe, SentinelHasValuePipe]
    }]
  }], null, null);
})();
export {
  SentinelAsyncPipe,
  SentinelDashReplacePipe,
  SentinelDefaultValueArrayPipe,
  SentinelDefaultValueStringPipe,
  SentinelElementsTooltipPipe,
  SentinelHasElementsPipe,
  SentinelHasValuePipe,
  SentinelPipesModule,
  SentinelPrettifyEnumPipe,
  SentinelShortStringPipe,
  SentinelTooltipOnShortenedPipe
};
//# sourceMappingURL=@sentinel_common_pipes.js.map
