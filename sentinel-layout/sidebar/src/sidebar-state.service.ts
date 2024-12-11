import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { WindowSizeService } from '@sentinel/layout';
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';
import { SidebarBreakpoint, SidebarBreakpoints, SidebarState } from './sidebar-types';
import { SidebarStatePreferenceService } from './sidebar-state-preference.service';

export type DefaultSidebarState = Exclude<SidebarState, 'collapsed'>;
export const DEFAULT_SIDEBAR_STATE: InjectionToken<DefaultSidebarState> = new InjectionToken<DefaultSidebarState>(
  'DEFAULT_SIDEBAR_STATE',
);

@Injectable({ providedIn: 'root' })
export class SidebarStateService {
  private stateSubject$: BehaviorSubject<SidebarState>;
  state$: Observable<SidebarState>;
  private sidebarBreakpointsSubject$: BehaviorSubject<SidebarBreakpoints> = new BehaviorSubject<SidebarBreakpoints>({
    small: 500,
    medium: 1000,
  });
  sidebarBreakpoints$: Observable<SidebarBreakpoints> = this.sidebarBreakpointsSubject$.asObservable();
  private lastActiveBreakpoint?: SidebarBreakpoint;
  activeBreakpoint$: Observable<SidebarBreakpoint>;

  constructor(
    private windowSizeService: WindowSizeService,
    private statePreferenceService: SidebarStatePreferenceService,
    @Inject(DEFAULT_SIDEBAR_STATE) @Optional() sidebarState: DefaultSidebarState = 'expanded',
  ) {
    // if no user preferences, we set the injected default state as preference
    if (this.statePreferenceService.get() === undefined) {
      this.statePreferenceService.set(sidebarState);
    }
    this.stateSubject$ = new BehaviorSubject<SidebarState>(this.statePreferenceService?.get() ?? sidebarState);
    this.state$ = this.stateSubject$.asObservable().pipe(distinctUntilChanged(), shareReplay({ refCount: true }));
    this.activeBreakpoint$ = combineLatest([this.windowSizeService.size$, this.sidebarBreakpoints$]).pipe(
      map((values) => this.resolveBreakpoint(values[0].width, values[1])),
      distinctUntilChanged(),
      tap((activeBreakpoint) => this.onBreakpointChange(activeBreakpoint)),
      tap((activeBreakpoint) => (this.lastActiveBreakpoint = activeBreakpoint)),
    );
  }

  geState(): SidebarState {
    return this.stateSubject$.getValue();
  }

  setState(state: SidebarState): void {
    this.stateSubject$.next(state);
  }

  toggleState(): void {
    const activeBreakpoint = this.getActiveBreakpoint();
    const currState = this.stateSubject$.getValue();
    let newState: SidebarState;
    if (activeBreakpoint === 'small') {
      if (currState === 'expanded') {
        newState = 'collapsed';
      } else {
        newState = 'expanded';
      }
    } else {
      if (currState === 'expanded') {
        newState = 'semi-collapsed';
      } else {
        newState = 'expanded';
      }
    }
    this.stateSubject$.next(newState);
    this.statePreferenceService.set(newState);
  }

  getActiveBreakpoint(): SidebarBreakpoint | undefined {
    return this.lastActiveBreakpoint;
  }

  setBreakpoints(breakpoints: SidebarBreakpoints): void {
    this.sidebarBreakpointsSubject$.next(breakpoints);
  }

  onBreakpointChange(breakpoint: SidebarBreakpoint): void {
    if (this.shouldChangeStateOnBreakpointChange(breakpoint)) {
      if (breakpoint === 'small') {
        this.stateSubject$.next('collapsed');
      }
      if (breakpoint === 'medium') {
        this.stateSubject$.next('semi-collapsed');
      }
      if (breakpoint === 'large') {
        this.stateSubject$.next('expanded');
      }
    }
  }

  private resolveBreakpoint(windowWidth: number, breakpoints: SidebarBreakpoints): SidebarBreakpoint {
    if (windowWidth < breakpoints.small) {
      return 'small';
    } else if (windowWidth >= breakpoints.small && windowWidth < breakpoints.medium) {
      return 'medium';
    } else {
      return 'large';
    }
  }

  private shouldChangeStateOnBreakpointChange(breakpoint: SidebarBreakpoint): boolean {
    const currState = this.stateSubject$.getValue();
    if (breakpoint === 'small' || currState === 'collapsed') {
      // always collapse on small breakpoint and expand when previously collapsed
      return true;
    }
    const userPreference = this.statePreferenceService.get();
    if (breakpoint === 'medium') {
      return userPreference === undefined || !this.isAgainstUserPreference('semi-collapsed', userPreference);
    }
    return userPreference === undefined || !this.isAgainstUserPreference('expanded', userPreference);
  }

  private isAgainstUserPreference(state: SidebarState, preference: SidebarState): boolean {
    return (
      (state === 'semi-collapsed' && preference === 'expanded') ||
      (state === 'expanded' && preference === 'semi-collapsed')
    );
  }
}
