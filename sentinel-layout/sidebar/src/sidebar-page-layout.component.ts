import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { combineLatest, Observable } from 'rxjs';
import { ContextSidebarService } from './context-sidebar.service';
import { SidebarSizeService } from './sidebar-size.service';
import { SidebarStateService } from './sidebar-state.service';
import { SidebarBreakpoint, SidebarState } from './sidebar-types';
import { delay, distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'sentinel-sidebar-page-layout',
  templateUrl: './sidebar-page-layout.component.html',
  styleUrls: ['./sidebar-page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarPageLayoutComponent implements OnInit {
  @Input() alwaysDisplaySidebar = false;
  readonly TRANSITION_LENGTH_MILLIS = 300;
  readonly TRANSITION_STYLE = `width ${this.TRANSITION_LENGTH_MILLIS}ms`;
  width$?: Observable<string>;
  height$?: Observable<string>;
  state$?: Observable<SidebarState>;
  activeBreakpoint$?: Observable<SidebarBreakpoint>;
  mode$?: Observable<MatDrawerMode>;
  contentMargin$?: Observable<string>;
  selectedPortal$?: Observable<unknown>;

  @ViewChild(MatDrawer, { static: true }) private contextSidebar?: MatDrawer;

  constructor(
    private sizeService: SidebarSizeService,
    private stateService: SidebarStateService,
    private contextService: ContextSidebarService,
    private vcr: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.initSidebarSize();
    this.initSidebarState();
    this.initSidebarContent();
    this.initSidebarBehaviour();
  }

  toggleSidebar(): void {
    this.stateService.toggleState();
  }

  private initSidebarSize(): void {
    this.width$ = this.sizeService.sidebarWidth$;
    this.height$ = this.sizeService.sidebarHeight$;
  }

  private initSidebarState(): void {
    // force resize on state change so the browser recalculates positioning of page content when width of sidebar changes
    this.state$ = this.stateService.state$.pipe(tap(() => window.dispatchEvent(new Event('resize'))));
    this.activeBreakpoint$ = this.stateService.activeBreakpoint$;
  }

  private initSidebarContent(): void {
    this.selectedPortal$ = this.contextService.panelPortal$;
    this.contextService.sidebar = this.contextSidebar;
    this.contextService.setViewContainerRef(this.vcr);
  }

  private initSidebarBehaviour(): void {
    if (this.activeBreakpoint$) {
      this.mode$ = this.activeBreakpoint$.pipe(
        map((breakpoint) => this.resolveSidebarMode(breakpoint)),
        distinctUntilChanged(),
      );
    }
    if (this.activeBreakpoint$ && this.state$ && this.width$) {
      // need to set margin of sidebar size to page content to display semi-collapsed sidebar properly
      this.contentMargin$ = combineLatest([this.activeBreakpoint$, this.state$, this.width$]).pipe(
        map((values) => this.resolveContentMargin(values[0], values[1], values[2])),
        distinctUntilChanged(),
        delay(this.TRANSITION_LENGTH_MILLIS + 1), // Delay must be larger than the css transition to detect correct margin
      );
    }
  }

  private resolveContentMargin(breakpoint: SidebarBreakpoint, state: SidebarState, sidebarWidth: string): string {
    if (breakpoint === 'large') {
      return sidebarWidth;
    }
    return breakpoint === 'medium' && state === 'semi-collapsed' ? sidebarWidth : '0';
  }

  private resolveSidebarMode(breakpoint: SidebarBreakpoint): MatDrawerMode {
    return breakpoint === 'large' ? 'side' : 'over';
  }
}
