import { TestBed, waitForAsync } from '@angular/core/testing';
import anything = jasmine.anything;
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotificationDialogService } from './notification-dialog.service';
import { NotificationPopupService } from './notification-popup.service';
import { SentinelNotificationApi } from './sentinel-notification-api.service';
import { SentinelNotificationService } from './sentinel-notification.service';
import { SentinelNotificationTypeEnum } from '../model/sentinel-notification-type.enum';
import { SentinelNotification } from '../model/sentinel-notification';

describe('SentinelNotificationService', () => {
  let service: SentinelNotificationService;

  let apiSpy: jasmine.SpyObj<SentinelNotificationApi>;
  let dialogSpy: jasmine.SpyObj<NotificationDialogService>;
  let popupSpy: jasmine.SpyObj<NotificationPopupService>;

  beforeEach(waitForAsync(() => {
    apiSpy = jasmine.createSpyObj('SentinelMuNotificationApi', ['add']);
    apiSpy.add.and.returnValue(of(1));
    dialogSpy = jasmine.createSpyObj('NotificationDialogService', ['display']);
    popupSpy = jasmine.createSpyObj('NotificationPopupService', ['display']);

    TestBed.configureTestingModule({
      providers: [
        SentinelNotificationService,
        { provide: SentinelNotificationApi, useValue: apiSpy },
        { provide: NotificationDialogService, useValue: dialogSpy },
        { provide: NotificationPopupService, useValue: popupSpy },
      ],
    });
    service = TestBed.inject(SentinelNotificationService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the notification', () => {
    const notification = mockNotification();
    service.emit(notification);
    expect(apiSpy.add).toHaveBeenCalledTimes(1);
    expect(apiSpy.add).toHaveBeenCalledWith(notification);
  });

  it('should display non-error notification in popup', () => {
    const notification = mockNotification();
    service.emit(notification);
    expect(popupSpy.display).toHaveBeenCalledTimes(1);
    expect(popupSpy.display).toHaveBeenCalledWith(notification, anything());
  });

  it('should display error notification in dialog', () => {
    const notification = mockNotification();
    notification.type = SentinelNotificationTypeEnum.Error;
    service.emit(notification);
    expect(dialogSpy.display).toHaveBeenCalledTimes(1);
    expect(dialogSpy.display).toHaveBeenCalledWith(notification, anything());
  });

  it('should emit next value of notification added', (done) => {
    const notification = mockNotification();
    service.onNotificationAdded$.pipe(take(1)).subscribe({
      next: (n) => {
        expect(n).toBeTruthy();
        done();
      },
      error: () => fail(),
    });
    service.emit(notification);
  });

  function mockNotification(): SentinelNotification {
    return {
      title: 'Test Notification',
      type: SentinelNotificationTypeEnum.Info,
    };
  }
});
