import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LayoutCommonComponentsMaterialModule } from '../layout-common-components-material.module';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { ToolbarComponent } from './toolbar.component';
import { SentinelBreadcrumbsComponent } from '../../../breadcrumbs/src/sentinel-breadcrumbs.component';
import { NotificationMenuComponent } from '../../../notification/src/notification-menu/notification-menu.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  const childComponents = [UserMenuComponent, SentinelBreadcrumbsComponent, NotificationMenuComponent];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayoutCommonComponentsMaterialModule],
      declarations: [ToolbarComponent, childComponents],
    })
      .overrideComponent(SentinelBreadcrumbsComponent, {
        set: {
          selector: 'sentinel-breadcrumbs',
          template: '',
        },
      })
      .overrideComponent(UserMenuComponent, {
        set: {
          selector: 'sentinel-user-menu',
          template: '',
        },
      })
      .overrideComponent(NotificationMenuComponent, {
        set: {
          selector: 'sentinel-notification-menu',
          template: '',
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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

  it('should emit event on drawerToggle', () => {
    spyOn(component.navToggle, 'emit');
    component.onNavToggle();
    expect(component.navToggle.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit event on refresh notifications', () => {
    spyOn(component.refreshNotifications, 'emit');
    component.onRefreshNotifications();
    expect(component.refreshNotifications.emit).toHaveBeenCalledTimes(1);
  });
});
