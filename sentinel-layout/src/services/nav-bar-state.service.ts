import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { NavBarState } from '../model/nav-bar-state';
import { WindowSizeService } from './window-size.service';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NavBarStateService {
  private stateSubject$: BehaviorSubject<NavBarState> = new BehaviorSubject<NavBarState>('expanded');
  state$: Observable<NavBarState> = this.stateSubject$.asObservable();
  private smallViewBreakpointSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(749);
  smallViewBreakpoint$: Observable<number> = this.smallViewBreakpointSubject$.asObservable();
  private isSmallViewLastValue?: boolean;
  isSmallView$: Observable<boolean>;

  constructor(private windowSizeService: WindowSizeService) {
    this.isSmallView$ = combineLatest([this.windowSizeService.size$, this.smallViewBreakpoint$]).pipe(
      map((values) => this.resolveIsSmallSize(values[0].width, values[1])),
      distinctUntilChanged(),
      tap((isSmallSize) => this.onSizeChange(isSmallSize)),
      tap((isSmallSize) => (this.isSmallViewLastValue = isSmallSize)),
    );
  }

  geState(): NavBarState {
    return this.stateSubject$.getValue();
  }

  setState(state: NavBarState): void {
    this.stateSubject$.next(state);
  }

  toggleState(): void {
    if (this.stateSubject$.getValue() === 'expanded') {
      this.stateSubject$.next('collapsed');
    } else {
      this.stateSubject$.next('expanded');
    }
  }

  getIsSmallView(): boolean {
    return this.isSmallViewLastValue ?? false;
  }

  setSmallViewBreakpoint(value: number): void {
    this.smallViewBreakpointSubject$.next(value);
  }

  onSizeChange(isSmallSize: boolean): void {
    isSmallSize ? this.stateSubject$.next('collapsed') : this.stateSubject$.next('expanded');
  }

  private resolveIsSmallSize(windowWidth: number, breakpoint: number): boolean {
    return windowWidth < breakpoint;
  }
}
