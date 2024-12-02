import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationCardComponent } from '../notification-card/notification-card.component';
import { NotificationMenuComponent } from './notification-menu.component';
import { LayoutCommonComponentsMaterialModule } from '../../../common-components/src/layout-common-components-material.module';

describe('NotificationMenuComponent', () => {
  let component: NotificationMenuComponent;
  let fixture: ComponentFixture<NotificationMenuComponent>;
  const childComponents = [NotificationCardComponent];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayoutCommonComponentsMaterialModule, BrowserAnimationsModule],
      declarations: [NotificationMenuComponent, childComponents],
    })
      .overrideComponent(NotificationCardComponent, {
        set: {
          selector: 'sentinel-notification-card',
          template: '',
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on refresh notifications', () => {
    spyOn(component.refreshNotifications, 'emit');
    component.onOpenNotifications();
    expect(component.refreshNotifications.emit).toHaveBeenCalledTimes(1);
  });
});
