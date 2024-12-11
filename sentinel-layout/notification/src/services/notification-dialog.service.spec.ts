import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotificationDialogService } from './notification-dialog.service';
import { NotificationErrorDialogComponent } from '../notification-error-modal/notification-error-dialog.component';
import { SentinelNotificationResult } from '../model/sentinel-notification-result.enum';
import { SentinelNotificationTypeEnum } from '../model/sentinel-notification-type.enum';
import { SentinelNotification } from '../model/sentinel-notification';

describe('NotificationDialogService', () => {
  let service: NotificationDialogService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [NotificationDialogService],
    });

    service = TestBed.inject(NotificationDialogService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open dialog on display', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn(service.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    const notification = mockNotification();
    service.display(notification, NotificationErrorDialogComponent);
    expect(service.dialog.open).toHaveBeenCalledTimes(1);
    expect(service.dialog.open).toHaveBeenCalledWith(NotificationErrorDialogComponent, {
      data: notification,
      disableClose: true,
    });
  });

  it('should map no result to dismissed', (done) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn(service.dialog, 'open').and.returnValue({ afterClosed: () => of(null) } as any);
    const notification = mockNotification();
    service
      .display(notification, NotificationErrorDialogComponent)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          expect(result).toBe(SentinelNotificationResult.DISMISSED);
          done();
        },
        error: () => fail(),
      });
  });

  it('should not map result if it has value', (done) => {
    spyOn(service.dialog, 'open').and.returnValue({
      afterClosed: () => of(SentinelNotificationResult.CONFIRMED),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    const notification = mockNotification();
    service
      .display(notification, NotificationErrorDialogComponent)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          expect(result).toBe(SentinelNotificationResult.CONFIRMED);
          done();
        },
        error: () => fail(),
      });
  });

  function mockNotification(): SentinelNotification {
    return {
      title: 'Test Notification',
      type: SentinelNotificationTypeEnum.Error,
    };
  }
});
