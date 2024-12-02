import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationIconComponent } from '../notification-icon/notification-icon.component';
import { NotificationsPopupComponent } from './notifications-popup.component';
import { NotificationPopupService } from '../services/notification-popup.service';
import { SentinelNotificationResult } from '../model/sentinel-notification-result.enum';
import { LayoutCommonComponentsMaterialModule } from '../../../common-components/src/layout-common-components-material.module';
import { SentinelNotificationTypeEnum } from '../model/sentinel-notification-type.enum';
import { SentinelPipesModule } from '@sentinel/common/pipes';

describe('NotificationComponent', () => {
  let component: NotificationsPopupComponent;
  let fixture: ComponentFixture<NotificationsPopupComponent>;
  const childComponents = [NotificationIconComponent];
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let popupSpy: jasmine.SpyObj<NotificationPopupService>;

  beforeEach(waitForAsync(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['dismiss']);
    popupSpy = jasmine.createSpyObj('NotificationPopupService', ['close']);

    TestBed.configureTestingModule({
      imports: [LayoutCommonComponentsMaterialModule, SentinelPipesModule],
      declarations: [NotificationsPopupComponent, childComponents],
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: NotificationPopupService, useValue: popupSpy },
      ],
    })
      .overrideComponent(NotificationIconComponent, {
        set: {
          selector: 'sentinel-notification-icon',
          template: '',
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have dismissed result on close', () => {
    const notification = {
      title: 'notification',
      type: SentinelNotificationTypeEnum.Success,
    };
    component.close(notification);
    expect(popupSpy.close).toHaveBeenCalledTimes(1);
    expect(popupSpy.close).toHaveBeenCalledWith(notification, SentinelNotificationResult.DISMISSED);
  });

  it('should have confirmed result on action', () => {
    const notification = {
      title: 'notification',
      type: SentinelNotificationTypeEnum.Success,
    };
    component.confirmAction(notification);
    expect(popupSpy.close).toHaveBeenCalledTimes(1);
    expect(popupSpy.close).toHaveBeenCalledWith(notification, SentinelNotificationResult.CONFIRMED);
  });
});
