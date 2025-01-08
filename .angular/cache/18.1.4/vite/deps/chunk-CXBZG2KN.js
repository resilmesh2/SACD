import {
  Router
} from "./chunk-YVVWEX43.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-QVSDJNBB.js";
import {
  __async
} from "./chunk-VNZ2F6MF.js";

// node_modules/@sentinel/common/fesm2022/sentinel-common-utils.mjs
var ENTITY_NOT_LOADING_STATE = {
  isLoading: false
};
function isArray(x) {
  return Array.isArray(x);
}
function hasValue(value) {
  return value !== void 0 && value !== null;
}
function propertyOf(name) {
  return name.toString();
}
function trackById(index, item) {
  return item.id;
}
function trackByIndex(index) {
  return index;
}
var enumFromValue = (enumObj, val) => {
  const enumName = Object.keys(enumObj).find((k) => enumObj[k] === val);
  return !enumName ? void 0 : enumObj[enumName];
};
function toQueryParams(inputObject) {
  const params = {};
  const entries = Object.entries(inputObject);
  entries.forEach((entry) => params[entry[0]] = entry[1]);
  return params;
}
function isLoading(state, id) {
  if ("id" in state) {
    return state.isLoading && id === state.id;
  }
  if ("ids" in state) {
    return state.isLoading && state.ids.includes(id);
  }
  return false;
}
function prettifyEnum(value) {
  if (value) {
    const lowercased = value.toLowerCase();
    const splitWords = lowercased.split("_");
    for (let i = 0; i < splitWords.length; i++) {
      splitWords[i] = splitWords[i].charAt(0).toUpperCase() + splitWords[i].slice(1);
    }
    return splitWords.join(" ");
  } else {
    return "";
  }
}
function slugify(value) {
  if (value === null || value === void 0) {
    return void 0;
  } else {
    return encodeURIComponent(value);
  }
}
function slugifyDate(value) {
  return value.valueOf();
}
function deslugify(value) {
  if (value === null || value === void 0) {
    return void 0;
  } else {
    return decodeURIComponent(value);
  }
}
function deslugifyTimestamp(value) {
  if (value === null || value === void 0) {
    return void 0;
  } else {
    const deslugified = deslugify(value);
    if (deslugified) {
      const timestamp = Number.parseInt(deslugified);
      if (!Number.isNaN(timestamp)) {
        return new Date(timestamp);
      }
    }
    return void 0;
  }
}
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
var _QueryParamsNavigationQueueService = class _QueryParamsNavigationQueueService {
  constructor() {
    this.queue = Promise.resolve(true);
    this.router = inject(Router);
  }
  enqueue(queryParams) {
    const enqueue = () => __async(this, null, function* () {
      try {
        yield this.queue;
      } catch (error) {
        console.error(error);
      }
      return yield this.router.navigate([], {
        queryParams,
        queryParamsHandling: "merge",
        replaceUrl: true
      });
    });
    this.queue = enqueue();
    return this.queue;
  }
};
_QueryParamsNavigationQueueService.ɵfac = function QueryParamsNavigationQueueService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QueryParamsNavigationQueueService)();
};
_QueryParamsNavigationQueueService.ɵprov = ɵɵdefineInjectable({
  token: _QueryParamsNavigationQueueService,
  factory: _QueryParamsNavigationQueueService.ɵfac
});
var QueryParamsNavigationQueueService = _QueryParamsNavigationQueueService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QueryParamsNavigationQueueService, [{
    type: Injectable
  }], null, null);
})();

export {
  ENTITY_NOT_LOADING_STATE,
  isArray,
  hasValue,
  propertyOf,
  trackById,
  trackByIndex,
  enumFromValue,
  toQueryParams,
  isLoading,
  prettifyEnum,
  slugify,
  slugifyDate,
  deslugify,
  deslugifyTimestamp,
  isDate,
  QueryParamsNavigationQueueService
};
//# sourceMappingURL=chunk-CXBZG2KN.js.map
