import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, takeWhile } from 'rxjs/operators';
import { AgendaContainer, NavBarStateService, SentinelUser, WindowSizeService } from '@sentinel/layout';
import { SentinelBreadcrumb, SentinelBreadcrumbBuilder } from '@sentinel/layout/breadcrumbs';
import {
  SentinelNotification,
  SentinelNotificationApi,
  SentinelNotificationService,
} from '@sentinel/layout/notification';
import { ScrollContainerComponent } from '@sentinel/layout/common-components';
import { SidebarSizeService } from '@sentinel/layout/sidebar';
import { propertyOf } from '@sentinel/common/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Sentinel Layout 1 component. You can use this component as a pre-defined layout for your app.
 */
@Component({
  selector: 'sentinel-layout1',
  templateUrl: './sentinel-layout1.component.html',
  styleUrls: ['./sentinel-layout1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentinelLayout1Component implements OnInit, OnChanges {
  @ViewChild(MatDrawer, { static: true }) drawer?: MatDrawer;
  @ViewChild(ScrollContainerComponent) scrollContainerComponent?: ScrollContainerComponent;

  /**
   * Selector of breadcrumbs from ActiveRoute Data object. Default value is 'breadcrumb'
   */
  @Input() breadcrumbSelector?: string;

  /**
   * Decides whether to display two lined toolbar with breadcrumbs or not
   */
  @Input() withBreadcrumbs = true;

  /**
   * Decides whether to display loading bar / placeholder below the toolbar
   */
  @Input() withLoading? = true;

  /**
   * True if loading bar should be shown, false otherwise
   */
  @Input() isLoading = false;

  /**
   * Source of the logo show in nav
   */
  @Input() logoSrc?: string;

  /**
   * Application version
   */
  @Input() version?: string;

  /**
   * Route to notifications overview component
   */
  @Input() notificationsRoute?: string;

  /**
   * Optional route to user profile component
   */
  @Input() userProfileRoute?: string;

  /**
   * User to display in user menu. No user menu will be displayed if not provided
   */
  @Input() user?: SentinelUser;

  /**
   * Displays scroll to top and scroll to bottom buttons if true
   */
  @Input() displayScrollButtons? = false;

  /**
   * Containers of agendas displayed in sidenav menu
   */
  @Input() agendaContainers?: AgendaContainer[] = [];

  /**
   * Whether the content inside the layout should have padding or not
   */
  @Input() paddedContent? = true;

  /**
   * Character(s) dividing individual breadcrumbs
   */
  @Input() breadcrumbsDivider? = '/';

  @Input() breadcrumbMaxLength = 45;

  /**
   * If set to true, always display sidebar even when it has no injected template
   */
  @Input() alwaysDisplaySidebar = false;

  /**
   * Emitted if login is requested
   */
  @Output() login: EventEmitter<void> = new EventEmitter();

  /**
   * Emitted if logout is requested
   */
  @Output() logout: EventEmitter<void> = new EventEmitter();

  /**
   * Breadcrumbs to display based on current router state
   */
  breadcrumbs$?: Observable<SentinelBreadcrumb[]>;

  /**
   * Array of notifications to display in notifications menu
   */
  notifications$?: Observable<SentinelNotification[]>;

  /**
   * Last notification emitted
   */
  lastNotification$?: Observable<SentinelNotification>;

  topLevelAgendaContainersCollapsed$?: Observable<boolean>;
  agendaSubject$?: BehaviorSubject<AgendaContainer[]>;
  private destroyRef = inject(DestroyRef);
  @Input() maxNavElementLength: number = 19;

  constructor(
    public navBarState: NavBarStateService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private notificationService: SentinelNotificationService,
    private notificationApi: SentinelNotificationApi,
    private sidebarSizeService: SidebarSizeService,
    private windowSizeService: WindowSizeService,
  ) {}

  ngOnInit(): void {
    this.resolveSidebarHeight();
    this.lastNotification$ = this.notificationService.onNotificationAdded$;
    const navigationEndEvent$ = this.router.events.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((event) => event instanceof NavigationEnd),
    );

    this.breadcrumbs$ = navigationEndEvent$.pipe(
      takeWhile(() => this.withBreadcrumbs),
      startWith(new NavigationEnd(-1, '', '')), // to trigger init on the first app load
      map(() =>
        this.breadcrumbSelector
          ? SentinelBreadcrumbBuilder.build(this.activeRoute.snapshot, this.breadcrumbSelector)
          : SentinelBreadcrumbBuilder.build(this.activeRoute.snapshot),
      ),
    );

    if (this.displayScrollButtons) {
      navigationEndEvent$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.scrollContainerComponent?.clear());
    }
    const windowHeight$: Observable<number> = this.windowSizeService.size$.pipe(
      map((size) => size.height),
      distinctUntilChanged(),
    );
    this.agendaSubject$ = new BehaviorSubject<AgendaContainer[]>(this.agendaContainers ? this.agendaContainers : []);
    this.topLevelAgendaContainersCollapsed$ = combineLatest([windowHeight$, this.agendaSubject$.asObservable()]).pipe(
      map(([windowHeight, agenda]) => this.shouldCollapseAgendas(windowHeight, agenda)),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (propertyOf<SentinelLayout1Component>('withBreadcrumbs') in changes && this.withBreadcrumbs !== undefined) {
      this.resolveSidebarHeight();
    }
    if (this.agendaContainers) {
      this.agendaSubject$?.next(this.agendaContainers);
    }
  }

  private resolveSidebarHeight(): void {
    const height = this.withBreadcrumbs ? 'calc(100vh - 90px)' : 'calc(100vh - 50px)';
    this.sidebarSizeService.setHeight(height, true);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.windowSizeService.onResize(window.innerHeight, window.innerWidth);
  }

  /**
   * Emits login event
   */
  onLogin(): void {
    this.login.emit();
  }

  /**
   * Emits logout event
   */
  onLogout(): void {
    this.logout.emit();
  }

  /**
   * Closes sidenav if user is on mobile device and the menu is displayed in full width
   */
  onAgendaSelected(): void {
    if (this.navBarState.getIsSmallView()) {
      this.navBarState.toggleState();
    }
  }

  /**
   * Gets new notifications
   */
  onRefreshNotifications(): void {
    this.notifications$ = this.notificationApi.getAll(0, 5);
  }

  private countAgendaHeight(agenda: AgendaContainer[]) {
    const heightOfAgendaText = 48;
    const heightOfLogo = 65;
    return (
      agenda.reduce((count, row) => count + row.children.length, 0) * heightOfAgendaText +
      agenda.length * heightOfAgendaText +
      heightOfLogo
    );
  }
  private shouldCollapseAgendas(windowHeight: number, agenda: AgendaContainer[]) {
    return windowHeight < this.countAgendaHeight(agenda);
  }
}
