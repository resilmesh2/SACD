import {
  ApolloClient,
  NetworkStatus
} from "./chunk-S73ZZUMG.js";
import {
  gql
} from "./chunk-U7FUUZBU.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  NgZone,
  Optional,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-QVSDJNBB.js";
import {
  queueScheduler
} from "./chunk-N4YBMVXL.js";
import "./chunk-DVE26OTL.js";
import {
  Observable,
  from,
  map,
  observable,
  observeOn,
  startWith
} from "./chunk-LDBH3HRD.js";
import "./chunk-4FVJWPNW.js";
import {
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-VNZ2F6MF.js";

// node_modules/apollo-angular/fesm2022/ngApollo.mjs
function fromPromise(promiseFn) {
  return new Observable((subscriber) => {
    promiseFn().then((result) => {
      if (!subscriber.closed) {
        subscriber.next(result);
        subscriber.complete();
      }
    }, (error) => {
      if (!subscriber.closed) {
        subscriber.error(error);
      }
    });
    return () => subscriber.unsubscribe();
  });
}
function useMutationLoading(source, enabled) {
  if (!enabled) {
    return source.pipe(map((result) => __spreadProps(__spreadValues({}, result), {
      loading: false
    })));
  }
  return source.pipe(startWith({
    loading: true
  }), map((result) => __spreadProps(__spreadValues({}, result), {
    loading: !!result.loading
  })));
}
var ZoneScheduler = class {
  constructor(zone) {
    __publicField(this, "zone");
    __publicField(this, "now", Date.now ? Date.now : () => +/* @__PURE__ */ new Date());
    this.zone = zone;
  }
  schedule(work, delay = 0, state) {
    return this.zone.run(() => queueScheduler.schedule(work, delay, state));
  }
};
function fixObservable(obs) {
  obs[observable] = () => obs;
  return obs;
}
function wrapWithZone(obs, ngZone) {
  return obs.pipe(observeOn(new ZoneScheduler(ngZone)));
}
function useInitialLoading(obsQuery) {
  return function useInitialLoadingOperator(source) {
    return new Observable(function useInitialLoadingSubscription(subscriber) {
      const currentResult = obsQuery.getCurrentResult();
      const {
        loading,
        errors,
        error,
        partial,
        data
      } = currentResult;
      const {
        partialRefetch,
        fetchPolicy
      } = obsQuery.options;
      const hasError = errors || error;
      if (partialRefetch && partial && (!data || Object.keys(data).length === 0) && fetchPolicy !== "cache-only" && !loading && !hasError) {
        subscriber.next(__spreadProps(__spreadValues({}, currentResult), {
          loading: true,
          networkStatus: NetworkStatus.loading
        }));
      }
      return source.subscribe(subscriber);
    });
  };
}
var QueryRef = class {
  constructor(obsQuery, ngZone, options) {
    __publicField(this, "obsQuery");
    __publicField(this, "valueChanges");
    __publicField(this, "queryId");
    this.obsQuery = obsQuery;
    const wrapped = wrapWithZone(from(fixObservable(this.obsQuery)), ngZone);
    this.valueChanges = options.useInitialLoading ? wrapped.pipe(useInitialLoading(this.obsQuery)) : wrapped;
    this.queryId = this.obsQuery.queryId;
  }
  // ObservableQuery's methods
  get options() {
    return this.obsQuery.options;
  }
  get variables() {
    return this.obsQuery.variables;
  }
  result() {
    return this.obsQuery.result();
  }
  getCurrentResult() {
    return this.obsQuery.getCurrentResult();
  }
  getLastResult() {
    return this.obsQuery.getLastResult();
  }
  getLastError() {
    return this.obsQuery.getLastError();
  }
  resetLastResults() {
    return this.obsQuery.resetLastResults();
  }
  refetch(variables) {
    return this.obsQuery.refetch(variables);
  }
  fetchMore(fetchMoreOptions) {
    return this.obsQuery.fetchMore(fetchMoreOptions);
  }
  subscribeToMore(options) {
    return this.obsQuery.subscribeToMore(options);
  }
  updateQuery(mapFn) {
    return this.obsQuery.updateQuery(mapFn);
  }
  stopPolling() {
    return this.obsQuery.stopPolling();
  }
  startPolling(pollInterval) {
    return this.obsQuery.startPolling(pollInterval);
  }
  setOptions(opts) {
    return this.obsQuery.setOptions(opts);
  }
  setVariables(variables) {
    return this.obsQuery.setVariables(variables);
  }
};
var APOLLO_FLAGS = new InjectionToken("APOLLO_FLAGS");
var APOLLO_OPTIONS = new InjectionToken("APOLLO_OPTIONS");
var APOLLO_NAMED_OPTIONS = new InjectionToken("APOLLO_NAMED_OPTIONS");
var ApolloBase = class {
  constructor(ngZone, flags, _client) {
    __publicField(this, "ngZone");
    __publicField(this, "flags");
    __publicField(this, "_client");
    __publicField(this, "useInitialLoading");
    __publicField(this, "useMutationLoading");
    this.ngZone = ngZone;
    this.flags = flags;
    this._client = _client;
    this.useInitialLoading = flags?.useInitialLoading ?? false;
    this.useMutationLoading = flags?.useMutationLoading ?? false;
  }
  watchQuery(options) {
    return new QueryRef(this.ensureClient().watchQuery(__spreadValues({}, options)), this.ngZone, __spreadValues({
      useInitialLoading: this.useInitialLoading
    }, options));
  }
  query(options) {
    return fromPromise(() => this.ensureClient().query(__spreadValues({}, options)));
  }
  mutate(options) {
    return useMutationLoading(fromPromise(() => this.ensureClient().mutate(__spreadValues({}, options))), options.useMutationLoading ?? this.useMutationLoading);
  }
  watchFragment(options, extra) {
    const obs = from(fixObservable(this.ensureClient().watchFragment(__spreadValues({}, options))));
    return extra && extra.useZone !== true ? obs : wrapWithZone(obs, this.ngZone);
  }
  subscribe(options, extra) {
    const obs = from(fixObservable(this.ensureClient().subscribe(__spreadValues({}, options))));
    return extra && extra.useZone !== true ? obs : wrapWithZone(obs, this.ngZone);
  }
  /**
   * Get an instance of ApolloClient
   */
  get client() {
    return this.ensureClient();
  }
  /**
   * Set a new instance of ApolloClient
   * Remember to clean up the store before setting a new client.
   *
   * @param client ApolloClient instance
   */
  set client(client) {
    if (this._client) {
      throw new Error("Client has been already defined");
    }
    this._client = client;
  }
  ensureClient() {
    this.checkInstance();
    return this._client;
  }
  checkInstance() {
    if (this._client) {
      return true;
    } else {
      throw new Error("Client has not been defined yet");
    }
  }
};
var _Apollo = class _Apollo extends ApolloBase {
  constructor(ngZone, apolloOptions, apolloNamedOptions, flags) {
    super(ngZone, flags);
    __publicField(this, "map", /* @__PURE__ */ new Map());
    if (apolloOptions) {
      this.createDefault(apolloOptions);
    }
    if (apolloNamedOptions && typeof apolloNamedOptions === "object") {
      for (let name in apolloNamedOptions) {
        if (apolloNamedOptions.hasOwnProperty(name)) {
          const options = apolloNamedOptions[name];
          this.create(options, name);
        }
      }
    }
  }
  /**
   * Create an instance of ApolloClient
   * @param options Options required to create ApolloClient
   * @param name client's name
   */
  create(options, name) {
    if (isNamed(name)) {
      this.createNamed(name, options);
    } else {
      this.createDefault(options);
    }
  }
  /**
   * Use a default ApolloClient
   */
  default() {
    return this;
  }
  /**
   * Use a named ApolloClient
   * @param name client's name
   */
  use(name) {
    if (isNamed(name)) {
      return this.map.get(name);
    } else {
      return this.default();
    }
  }
  /**
   * Create a default ApolloClient, same as `apollo.create(options)`
   * @param options ApolloClient's options
   */
  createDefault(options) {
    if (this._client) {
      throw new Error("Apollo has been already created.");
    }
    this.client = this.ngZone.runOutsideAngular(() => new ApolloClient(options));
  }
  /**
   * Create a named ApolloClient, same as `apollo.create(options, name)`
   * @param name client's name
   * @param options ApolloClient's options
   */
  createNamed(name, options) {
    if (this.map.has(name)) {
      throw new Error(`Client ${name} has been already created`);
    }
    this.map.set(name, new ApolloBase(this.ngZone, this.flags, this.ngZone.runOutsideAngular(() => new ApolloClient(options))));
  }
  /**
   * Remember to clean up the store before removing a client
   * @param name client's name
   */
  removeClient(name) {
    if (isNamed(name)) {
      this.map.delete(name);
    } else {
      this._client = void 0;
    }
  }
};
__publicField(_Apollo, "ɵfac", function Apollo_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _Apollo)(ɵɵinject(NgZone), ɵɵinject(APOLLO_OPTIONS, 8), ɵɵinject(APOLLO_NAMED_OPTIONS, 8), ɵɵinject(APOLLO_FLAGS, 8));
});
__publicField(_Apollo, "ɵprov", ɵɵdefineInjectable({
  token: _Apollo,
  factory: _Apollo.ɵfac
}));
var Apollo = _Apollo;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Apollo, [{
    type: Injectable
  }], () => [{
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [APOLLO_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [APOLLO_NAMED_OPTIONS]
    }, {
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [APOLLO_FLAGS]
    }, {
      type: Optional
    }]
  }], null);
})();
function isNamed(name) {
  return !!name && name !== "default";
}
var _ApolloModule = class _ApolloModule {
};
__publicField(_ApolloModule, "ɵfac", function ApolloModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ApolloModule)();
});
__publicField(_ApolloModule, "ɵmod", ɵɵdefineNgModule({
  type: _ApolloModule
}));
__publicField(_ApolloModule, "ɵinj", ɵɵdefineInjector({
  providers: [Apollo]
}));
var ApolloModule = _ApolloModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApolloModule, [{
    type: NgModule,
    args: [{
      providers: [Apollo]
    }]
  }], null, null);
})();
function provideApollo(optionsFactory, flags = {}) {
  return [Apollo, {
    provide: APOLLO_OPTIONS,
    useFactory: optionsFactory
  }, {
    provide: APOLLO_FLAGS,
    useValue: flags
  }];
}
function provideNamedApollo(optionsFactory, flags = {}) {
  return [Apollo, {
    provide: APOLLO_NAMED_OPTIONS,
    useFactory: optionsFactory
  }, {
    provide: APOLLO_FLAGS,
    useValue: flags
  }];
}
var _Query = class _Query {
  constructor(apollo) {
    __publicField(this, "apollo");
    __publicField(this, "client", "default");
    this.apollo = apollo;
  }
  watch(variables, options) {
    return this.apollo.use(this.client).watchQuery(__spreadProps(__spreadValues({}, options), {
      variables,
      query: this.document
    }));
  }
  fetch(variables, options) {
    return this.apollo.use(this.client).query(__spreadProps(__spreadValues({}, options), {
      variables,
      query: this.document
    }));
  }
};
__publicField(_Query, "ɵfac", function Query_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _Query)(ɵɵinject(Apollo));
});
__publicField(_Query, "ɵprov", ɵɵdefineInjectable({
  token: _Query,
  factory: _Query.ɵfac
}));
var Query = _Query;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Query, [{
    type: Injectable
  }], () => [{
    type: Apollo
  }], null);
})();
var _Mutation = class _Mutation {
  constructor(apollo) {
    __publicField(this, "apollo");
    __publicField(this, "client", "default");
    this.apollo = apollo;
  }
  mutate(variables, options) {
    return this.apollo.use(this.client).mutate(__spreadProps(__spreadValues({}, options), {
      variables,
      mutation: this.document
    }));
  }
};
__publicField(_Mutation, "ɵfac", function Mutation_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _Mutation)(ɵɵinject(Apollo));
});
__publicField(_Mutation, "ɵprov", ɵɵdefineInjectable({
  token: _Mutation,
  factory: _Mutation.ɵfac
}));
var Mutation = _Mutation;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Mutation, [{
    type: Injectable
  }], () => [{
    type: Apollo
  }], null);
})();
var _Subscription = class _Subscription {
  constructor(apollo) {
    __publicField(this, "apollo");
    __publicField(this, "client", "default");
    this.apollo = apollo;
  }
  subscribe(variables, options, extra) {
    return this.apollo.use(this.client).subscribe(__spreadProps(__spreadValues({}, options), {
      variables,
      query: this.document
    }), extra);
  }
};
__publicField(_Subscription, "ɵfac", function Subscription_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _Subscription)(ɵɵinject(Apollo));
});
__publicField(_Subscription, "ɵprov", ɵɵdefineInjectable({
  token: _Subscription,
  factory: _Subscription.ɵfac
}));
var Subscription = _Subscription;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Subscription, [{
    type: Injectable
  }], () => [{
    type: Apollo
  }], null);
})();
var typedGQLTag = gql;
var gql2 = typedGQLTag;
var graphql = typedGQLTag;
export {
  APOLLO_FLAGS,
  APOLLO_NAMED_OPTIONS,
  APOLLO_OPTIONS,
  Apollo,
  ApolloBase,
  ApolloModule,
  Mutation,
  Query,
  QueryRef,
  Subscription,
  gql2 as gql,
  graphql,
  provideApollo,
  provideNamedApollo
};
//# sourceMappingURL=apollo-angular.js.map
