import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { SidebarState, SidebarWidthOptions } from './sidebar-types';
import { SidebarStateService } from './sidebar-state.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SidebarSizeService {
  DEFAULT_WIDTH = 'min(300px, 100vw)';
  DEFAULT_SEMI_COLLAPSED_WIDTH = '60px';
  DEFAULT_HEIGHT = 'calc(100vh - 90px)';
  private sidebarWidthSubject$: BehaviorSubject<SidebarWidthOptions> = new BehaviorSubject<SidebarWidthOptions>({
    expanded: this.DEFAULT_WIDTH,
    semiCollapsed: this.DEFAULT_SEMI_COLLAPSED_WIDTH,
  });
  private sidebarHeightSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(this.DEFAULT_HEIGHT);
  sidebarWidth$: Observable<string>;
  sidebarHeight$: Observable<string> = this.sidebarHeightSubject$.asObservable();

  constructor(private sidebarState: SidebarStateService) {
    this.sidebarWidth$ = combineLatest([this.sidebarState.state$, this.sidebarWidthSubject$]).pipe(
      map((values) => this.resolveWidth(values[0], values[1])),
    );
  }

  setWidth(width: SidebarWidthOptions, changeDefault = false): void {
    if (changeDefault) {
      this.DEFAULT_WIDTH = width.expanded;
      this.DEFAULT_SEMI_COLLAPSED_WIDTH = width.semiCollapsed;
    }
    this.sidebarWidthSubject$.next(width);
  }

  setHeight(height: string, changeDefault = false): void {
    if (changeDefault) {
      this.DEFAULT_HEIGHT = height;
    }
    this.sidebarHeightSubject$.next(height);
  }

  clearWidth(): void {
    this.sidebarWidthSubject$.next({ expanded: this.DEFAULT_WIDTH, semiCollapsed: this.DEFAULT_SEMI_COLLAPSED_WIDTH });
  }

  private resolveWidth(state: SidebarState, widthOptions: SidebarWidthOptions): string {
    if (state === 'collapsed') {
      return '0px';
    } else if (state === 'semi-collapsed') {
      return widthOptions.semiCollapsed;
    } else {
      return widthOptions.expanded;
    }
  }
}
