import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  LayoutCommonComponentsMaterialModule,
  LoadingComponent,
  NavComponent,
  ToolbarComponent,
} from '@sentinel/layout/common-components';
import { SentinelBreadcrumbBuilder } from '@sentinel/layout/breadcrumbs';
import { SentinelNotificationApi, SentinelNotificationService } from '@sentinel/layout/notification';
import { SentinelLayout1Component } from './sentinel-layout1.component';
import { NavBarStateService } from '@sentinel/layout';
import { SentinelPipesModule } from '@sentinel/common/pipes';
import anything = jasmine.anything;

describe('SentinelLayout1Component', () => {
  let component: SentinelLayout1Component;
  let router: Router;
  let fixture: ComponentFixture<SentinelLayout1Component>;

  let notificationServiceSpy: jasmine.SpyObj<SentinelNotificationService>;
  let notificationApiSpy: jasmine.SpyObj<SentinelNotificationApi>;
  let navBarStateSpy: jasmine.SpyObj<NavBarStateService>;

  const childComponents = [LoadingComponent, NavComponent, ToolbarComponent];

  const routes: Routes = [
    {
      path: 'ab',
      component: LoadingComponent,
    },
  ];

  beforeEach(waitForAsync(() => {
    notificationServiceSpy = jasmine.createSpyObj('SentinelNotificationService', ['emit']);
    notificationApiSpy = jasmine.createSpyObj('SentinelNotificationApi', ['add', 'count', 'get', 'getAll']);
    navBarStateSpy = jasmine.createSpyObj('NavBarStateService', ['toggleState', 'getIsSmallView']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        LayoutCommonComponentsMaterialModule,
        RouterTestingModule.withRoutes(routes),
        SentinelPipesModule,
      ],
      declarations: [SentinelLayout1Component, childComponents],
      providers: [
        { provide: SentinelNotificationService, useValue: notificationServiceSpy },
        { provide: SentinelNotificationApi, useValue: notificationApiSpy },
        { provide: NavBarStateService, useValue: navBarStateSpy },
      ],
    })
      .overrideComponent(LoadingComponent, {
        set: {
          selector: 'sentinel-loading',
          template: '',
        },
      })
      .overrideComponent(NavComponent, {
        set: {
          selector: 'sentinel-nav',
          template: '',
        },
      })
      .overrideComponent(ToolbarComponent, {
        set: {
          selector: 'sentinel-toolbar',
          template: '',
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SentinelLayout1Component);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
        fixture?.ngZone?.run(() => {
          router.initialNavigation();
        });
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on login', () => {
    spyOn(component.login, 'emit');
    component.onLogin();
    expect(component.login.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit event on logout', () => {
    spyOn(component.logout, 'emit');
    component.onLogout();
    expect(component.logout.emit).toHaveBeenCalledTimes(1);
  });

  it('should toggle drawer on agenda selection if in small view mode', () => {
    navBarStateSpy.getIsSmallView.and.returnValue(true);
    component.onAgendaSelected();
    expect(navBarStateSpy.toggleState).toHaveBeenCalledTimes(1);
  });

  it('should not toggle drawer on agenda selection if not in small view mode', () => {
    navBarStateSpy.getIsSmallView.and.returnValue(false);
    component.onAgendaSelected();
    expect(navBarStateSpy.toggleState).toHaveBeenCalledTimes(0);
  });

  it('should call breadcrumb builder', waitForAsync(() => {
    spyOn(SentinelBreadcrumbBuilder, 'build');
    fixture?.ngZone?.run(() => {
      fixture.whenStable().then(() => {
        router.navigate(['ab']).then(() => {
          expect(SentinelBreadcrumbBuilder.build).toHaveBeenCalledTimes(1);
        });
      });
    });
  }));

  it('should call breadcrumb builder with inserted selector ', waitForAsync(() => {
    component.breadcrumbSelector = 'someSelector';
    spyOn(SentinelBreadcrumbBuilder, 'build');
    fixture?.ngZone?.run(() => {
      fixture.whenStable().then(() => {
        router.navigate(['ab']).then(() => {
          expect(SentinelBreadcrumbBuilder.build).toHaveBeenCalledTimes(1);
          expect(SentinelBreadcrumbBuilder.build).toHaveBeenCalledWith(anything(), 'someSelector');
        });
      });
    });
  }));

  it('should call breadcrumb builder without selector if not provided ', waitForAsync(() => {
    spyOn(SentinelBreadcrumbBuilder, 'build');
    fixture?.ngZone?.run(() => {
      fixture.whenStable().then(() => {
        router.navigate(['ab']).then(() => {
          expect(SentinelBreadcrumbBuilder.build).toHaveBeenCalledTimes(1);
          expect(SentinelBreadcrumbBuilder.build).toHaveBeenCalledWith(anything());
        });
      });
    });
  }));

  it('should call notification api on refresh notifications', () => {
    component.onRefreshNotifications();
    expect(notificationApiSpy.getAll).toHaveBeenCalledTimes(1);
  });
});
