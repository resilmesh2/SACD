import { Component, ChangeDetectionStrategy, Input, Optional, computed, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarBreakpoint, SidebarState } from '../sidebar-types';
import { SidebarStateService } from '../sidebar-state.service';
import { SentinelLayoutI18nService, SentinelSidebarI18n } from '@sentinel/layout/i18n';

@Component({
  selector: 'sentinel-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarToggleComponent {
  @Input() insideSidebar = false;
  state$: Observable<SidebarState>;
  activeBreakpoint$: Observable<SidebarBreakpoint>;
  i18n: Signal<SentinelSidebarI18n>;

  constructor(
    private stateService: SidebarStateService,
    @Optional()
    readonly i18nService?: SentinelLayoutI18nService | null,
  ) {
    const i18nFallback: SentinelSidebarI18n = {
      collapseSidebar: 'Collapse sidebar',
      expandSidebar: 'Expand sidebar',
    };
    this.i18n = this.i18nService?.stateSig()
      ? computed(() => this.i18nService?.stateSig().sidebar ?? i18nFallback)
      : signal(i18nFallback);
    this.state$ = this.stateService.state$;
    this.activeBreakpoint$ = this.stateService.activeBreakpoint$;
  }

  toggleSidebar(): void {
    this.stateService.toggleState();
  }
}
