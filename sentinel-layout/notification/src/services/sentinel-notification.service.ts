import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { NotificationErrorDialogComponent } from '../notification-error-modal/notification-error-dialog.component';
import { NotificationsPopupComponent } from '../notification-popup/notifications-popup.component';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationResult } from '../model/sentinel-notification-result.enum';
import { SentinelNotificationTypeEnum } from '../model/sentinel-notification-type.enum';
import { NotificationDialogService } from './notification-dialog.service';
import { NotificationPopupService } from './notification-popup.service';
import { SentinelNotificationApi } from './sentinel-notification-api.service';

/**
 * Notification service handling storing, displaying and returning a result of emitted notification
 */
@Injectable()
export class SentinelNotificationService {
  private onNotificationAddedSubject$: Subject<SentinelNotification> = new Subject();

  /**
   * Emits event when notification is added and stored the db
   */
  onNotificationAdded$: Observable<SentinelNotification> = this.onNotificationAddedSubject$.asObservable();

  constructor(
    private notificationApi: SentinelNotificationApi,
    private notificationDialogService: NotificationDialogService,
    private notificationPopupService: NotificationPopupService,
  ) {}

  /**
   * Emits notification and displays it to the user appropriately
   * @param notification a notification to emit
   */
  emit(notification: SentinelNotification): Observable<SentinelNotificationResult> {
    this.store(notification);
    return this.display(notification);
  }

  private store(notification: SentinelNotification) {
    notification.timestamp = Date.now();
    this.notificationApi
      .add(notification)
      .pipe(
        take(1),
        tap((id) => {
          notification.id = id;
          this.onNotificationAddedSubject$.next(notification);
        }),
      )
      .subscribe();
  }

  private display(notification: SentinelNotification): Observable<SentinelNotificationResult> {
    if (notification.type === SentinelNotificationTypeEnum.Error) {
      return this.notificationDialogService.display(notification, NotificationErrorDialogComponent);
    } else {
      return this.notificationPopupService.display(notification, NotificationsPopupComponent);
    }
  }
}
