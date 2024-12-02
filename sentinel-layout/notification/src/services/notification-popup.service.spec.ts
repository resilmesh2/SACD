import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotificationPopupService } from './notification-popup.service';
import { NotificationsPopupComponent } from '../notification-popup/notifications-popup.component';
import { SentinelNotificationResult } from '../model/sentinel-notification-result.enum';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationTypeEnum } from '../model/sentinel-notification-type.enum';

describe('NotificationPopupService', () => {
  let service: NotificationPopupService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [NotificationPopupService],
    });

    service = TestBed.inject(NotificationPopupService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar on display of first popup', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn(service.snackBar, 'openFromComponent').and.returnValue(of(true) as any);
    const notification = mockNotification();

    expect(service.snackbarRef).toBeUndefined();

    service.display(notification, NotificationsPopupComponent);
    expect(service.snackBar.openFromComponent).toHaveBeenCalledTimes(1);
    expect(service.snackbarRef).toBeDefined();
  });

  it('should close on notification expiration', fakeAsync(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn(service.snackBar, 'openFromComponent').and.returnValue(of(true) as any);
    const notification = mockNotification();
    notification.duration = 1000;
    service
      .display(notification, NotificationsPopupComponent)
      .pipe(take(1))
      .subscribe({
        next: (result) => expect(result).toBe(SentinelNotificationResult.DISMISSED),
        error: () => fail(),
      });
    tick(1001);
  }));

  it('should lose snackbar ref on notification expiration of last notification', fakeAsync(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn(service.snackBar, 'openFromComponent').and.returnValue(of(true) as any);
    const notification1 = mockNotification();
    const notification2 = mockNotification();
    notification1.duration = 1000;
    notification2.duration = 2000;

    expect(service.snackbarRef).toBeUndefined();
    service.display(notification1, NotificationsPopupComponent);
    expect(service.snackbarRef).toBeDefined();
    tick(500);
    service.display(notification2, NotificationsPopupComponent);
    expect(service.snackbarRef).toBeDefined();
    tick(501);
    expect(service.snackbarRef).toBeDefined();
    tick(1500);
    expect(service.snackbarRef).toBeUndefined();
  }));

  it('should close notification manually', (done) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn(service.snackBar, 'openFromComponent').and.returnValue(of(true) as any);
    const notification = mockNotification();

    service
      .display(notification, NotificationsPopupComponent)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          expect(result).toBe(SentinelNotificationResult.CONFIRMED);
          done();
        },
        error: () => fail(),
      });

    service.close(notification, SentinelNotificationResult.CONFIRMED);
  });

  function mockNotification(): SentinelNotification {
    return {
      title: 'Test Notification',
      type: SentinelNotificationTypeEnum.Error,
    };
  }
});
