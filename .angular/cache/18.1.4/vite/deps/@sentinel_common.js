import {
  HttpParams
} from "./chunk-E47TDE7S.js";
import {
  FormControl,
  FormGroup,
  Validators
} from "./chunk-DISRRIHX.js";
import "./chunk-ZZYSP2DO.js";
import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdirectiveInject
} from "./chunk-QVSDJNBB.js";
import {
  merge
} from "./chunk-N4YBMVXL.js";
import "./chunk-DVE26OTL.js";
import {
  BehaviorSubject,
  Subject,
  distinctUntilChanged,
  map,
  retryWhen,
  startWith,
  switchMap,
  timer
} from "./chunk-LDBH3HRD.js";
import "./chunk-4FVJWPNW.js";
import "./chunk-VNZ2F6MF.js";

// node_modules/@sentinel/common/fesm2022/sentinel-common-pagination.mjs
var PaginatedResource = class {
  constructor(elements, pagination) {
    this.elements = elements;
    this.pagination = pagination;
  }
};
var PaginationBase = class {
  constructor(numberOfElements, size, totalElements) {
    this.numberOfElements = numberOfElements;
    this.size = size;
    this.totalElements = totalElements;
  }
};
var CursorPagination = class extends PaginationBase {
  constructor(curr, numberOfElements, size, totalElements, next, previous) {
    super(numberOfElements, size, totalElements);
    this.curr = curr;
    this.next = next;
    this.previous = previous;
  }
};
var OffsetPagination = class extends PaginationBase {
  constructor(page, numberOfElements, size, totalElements, totalPages) {
    super(numberOfElements, size, totalElements);
    this.page = page;
    this.totalPages = totalPages;
  }
};

// node_modules/@sentinel/common/fesm2022/sentinel-common.mjs
var DateRangeForm = class {
  constructor(dateRange) {
    this.formGroup = new FormGroup({
      from: new FormControl(dateRange?.from ?? null),
      to: new FormControl(dateRange?.to ?? null)
    }, {
      validators: dateOrderValidator
    });
  }
};
var dateOrderValidator = (control) => {
  let error = null;
  if (control.get("from")?.value instanceof Date && control.get("to")?.value instanceof Date) {
    const startTime = control.get("from")?.value;
    const endTime = control.get("to")?.value;
    if (startTime && endTime && startTime && startTime.valueOf() > endTime.valueOf()) {
      error = {
        dateTimeOrder: true
      };
    }
  }
  return error;
};
var BaseReactiveForm = class {
  constructor(formGroup) {
    this.dirtySubject$ = new Subject();
    this.formGroup = formGroup;
    this.valid$ = this.formGroup.statusChanges.pipe(map(() => this.formGroup.valid), distinctUntilChanged(), startWith(this.formGroup.valid));
    const dirtyFromForm$ = this.formGroup.statusChanges.pipe(map(() => this.formGroup.dirty));
    this.dirty$ = merge(dirtyFromForm$, this.dirtySubject$).pipe(distinctUntilChanged(), startWith(this.dirty));
  }
  get valid() {
    return this.formGroup.valid;
  }
  get dirty() {
    return this.formGroup.dirty;
  }
  set dirty(value) {
    value ? this.formGroup.markAsDirty() : this.formGroup.markAsPristine();
    this.dirtySubject$.next(value);
  }
  set isSaving(value) {
    value ? this.formGroup.disable({
      emitEvent: false
    }) : this.formGroup.enable({
      emitEvent: false
    });
  }
};
var _SLetDirective = class _SLetDirective {
  constructor(viewContainer, templateRef) {
    this.context = {
      sLet: null
    };
    viewContainer.createEmbeddedView(templateRef, this.context);
  }
  set sLet(value) {
    this.context.sLet = value;
  }
};
_SLetDirective.ɵfac = function SLetDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SLetDirective)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(TemplateRef));
};
_SLetDirective.ɵdir = ɵɵdefineDirective({
  type: _SLetDirective,
  selectors: [["", "sLet", ""]],
  inputs: {
    sLet: "sLet"
  },
  standalone: true
});
var SLetDirective = _SLetDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SLetDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[sLet]",
      standalone: true
    }]
  }], () => [{
    type: ViewContainerRef
  }, {
    type: TemplateRef
  }], {
    sLet: [{
      type: Input
    }]
  });
})();
var SentinelParamsMerger = class {
  /**
   * Merges multiple http params into one http params object
   * @param params list of http params object to be merged
   */
  static merge(params) {
    let resultParams = new HttpParams();
    params.forEach((param) => param.keys().forEach((key) => {
      const paramValue = param.get(key);
      if (paramValue) {
        resultParams = resultParams.set(key, paramValue);
      }
    }));
    return resultParams;
  }
};
var ResponseHeaderContentDispositionReader = class {
  static getFilenameFromResponse(resp, defaultFilename) {
    const contentDispHeader = resp.headers.get("content-disposition");
    if (!contentDispHeader) {
      return defaultFilename;
    }
    const splitOnSeparator = defaultFilename.split(";");
    if (splitOnSeparator.length <= 1) {
      return defaultFilename;
    }
    const splitOnKeyword = splitOnSeparator[1].split("filename");
    if (splitOnKeyword.length <= 1) {
      return defaultFilename;
    }
    const splitOnEqualSign = splitOnKeyword[1].split("=");
    if (splitOnEqualSign.length <= 1) {
      return defaultFilename;
    }
    return splitOnEqualSign[1].trim();
  }
};
var ResourceService = class {
  constructor() {
    this.hasErrorSubject$ = new BehaviorSubject(false);
    this.hasError$ = this.hasErrorSubject$.asObservable();
    this.isLoadingSubject$ = new BehaviorSubject(false);
    this.isLoading$ = this.isLoadingSubject$.asObservable();
    this.resourceSubject$ = new BehaviorSubject(void 0);
    this.resource$ = this.resourceSubject$.asObservable();
  }
};
var ResourcePollingService = class extends ResourceService {
  constructor(pollPeriod = 5e3) {
    super();
    this.retryPolling$ = new Subject();
    this.pollPeriod = pollPeriod;
    this.resource$ = merge(this.createPoll(), this.resourceSubject$.asObservable());
  }
  /**
   * Performs necessary operations and updates state of the service.
   * @contract Needs to update hasError subject and retry polling
   * if it was previously interrupted
   * @param params any other parameters required to update data in your concrete service
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onManualResourceRefresh(...params) {
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
  }
  /**
   * Creates poll observable using a timer. You can extend the behaviour by piping the observable and applying
   * RxJs operators on it (e.g. takeWhile to stop polling on specific conditions)
   * @param dueTime optionally set a due time when the timer should start. By default it equals to the
   * poll period as it is expected that the first request is made from the service or component
   * using the service (to properly set up pagination and all other possible params like ids etc)
   */
  createPoll(dueTime = this.pollPeriod) {
    return timer(dueTime, this.pollPeriod).pipe(switchMap(() => this.refreshResource()), retryWhen(() => this.retryPolling$));
  }
};
var PaginatedElementsService = class {
  constructor(pageSize = 10) {
    this.hasErrorSubject$ = new BehaviorSubject(false);
    this.hasError$ = this.hasErrorSubject$.asObservable();
    this.isLoadingSubject$ = new BehaviorSubject(false);
    this.isLoading$ = this.isLoadingSubject$.asObservable();
    this.resourceSubject$ = new BehaviorSubject(this.initSubject(pageSize));
    this.resource$ = this.resourceSubject$.asObservable();
  }
};
var CursorPaginatedElementsService = class extends PaginatedElementsService {
  initSubject(pageSize) {
    return new PaginatedResource([], new CursorPagination(null, 0, pageSize, 0, null, null));
  }
};
var PaginatedElementsPollingService = class extends PaginatedElementsService {
  constructor(defaultPaginationSize, pollPeriod) {
    super(defaultPaginationSize);
    this.retryPolling$ = new Subject();
    this.pollPeriod = pollPeriod;
    this.resource$ = merge(this.createPoll(), this.resourceSubject$.asObservable());
  }
  /**
   * Performs necessary operations and updates state of the service.
   * @contract Needs to update lastPagination attribute, hasError subject and retry polling
   * if it was previously interrupted
   * @param pagination new requested pagination
   * @param params any other parameters required to update data in your concrete service
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onManualResourceRefresh(pagination, ...params) {
    this.lastPagination = pagination;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
  }
  /**
   * Creates poll observable using a timer. You can extend the behaviour by piping the observable and applying
   * RxJs operators on it (e.g. takeWhile to stop polling on specific conditions)
   * @param dueTime optionally set a due time when the timer should start. By default it equals to the
   * poll period as it is expected that the first request is made from the service or component
   * using the service (to properly set up pagination and all other possible params like ids etc)
   */
  createPoll(dueTime = this.pollPeriod) {
    return timer(dueTime, this.pollPeriod).pipe(switchMap(() => this.refreshResource()), retryWhen(() => this.retryPolling$));
  }
};
var CursorPaginatedElementsPollingService = class extends PaginatedElementsPollingService {
  initSubject(pageSize) {
    return new PaginatedResource([], new CursorPagination(null, 0, pageSize, 0, null, null));
  }
};
var OffsetPaginatedElementsService = class extends PaginatedElementsService {
  initSubject(pageSize) {
    return new PaginatedResource([], new OffsetPagination(0, 0, pageSize, 0, 0));
  }
};
var OffsetPaginatedElementsPollingService = class extends PaginatedElementsPollingService {
  initSubject(pageSize) {
    return new PaginatedResource([], new OffsetPagination(0, 0, pageSize, 0, 0));
  }
};
var _SentinelValidators = class _SentinelValidators {
};
_SentinelValidators.noWhitespace = (control) => {
  const isWhitespace = (control.value || "").trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : {
    whitespace: true
  };
};
_SentinelValidators.minDate = (minDate) => {
  return (control) => {
    const date = new Date(control.value);
    if (minDate.getTime() < date.getTime()) {
      return null;
    } else {
      return {
        minDate: {
          value: control.value,
          expected: minDate
        }
      };
    }
  };
};
_SentinelValidators.maxDate = (maxDate) => {
  return (control) => {
    const date = new Date(control.value);
    if (maxDate.getTime() > date.getTime()) {
      return null;
    } else {
      return {
        maxDate: {
          value: control.value,
          expected: maxDate
        }
      };
    }
  };
};
_SentinelValidators.min = (min) => {
  return Validators.min(min);
};
_SentinelValidators.max = (max) => {
  return Validators.max(max);
};
_SentinelValidators.required = (control) => {
  return Validators.required(control);
};
_SentinelValidators.requiredTrue = (control) => {
  return Validators.requiredTrue(control);
};
_SentinelValidators.email = (control) => {
  return Validators.email(control);
};
_SentinelValidators.minLength = (minLength) => {
  return Validators.minLength(minLength);
};
_SentinelValidators.maxLength = (maxLength) => {
  return Validators.maxLength(maxLength);
};
_SentinelValidators.pattern = (pattern) => {
  return Validators.pattern(pattern);
};
_SentinelValidators.nullValidator = (control) => {
  return Validators.nullValidator(control);
};
_SentinelValidators.compose = (validators) => {
  return Validators.compose(validators);
};
_SentinelValidators.composeAsync = (validators) => {
  return Validators.composeAsync(validators);
};
var SentinelValidators = _SentinelValidators;
export {
  BaseReactiveForm,
  CursorPaginatedElementsPollingService,
  CursorPaginatedElementsService,
  DateRangeForm,
  OffsetPaginatedElementsPollingService,
  OffsetPaginatedElementsService,
  ResourcePollingService,
  ResourceService,
  ResponseHeaderContentDispositionReader,
  SLetDirective,
  SentinelParamsMerger,
  SentinelValidators,
  dateOrderValidator
};
//# sourceMappingURL=@sentinel_common.js.map
