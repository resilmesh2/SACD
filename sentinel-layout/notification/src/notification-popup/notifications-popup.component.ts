import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationResult } from '../model/sentinel-notification-result.enum';
import { NotificationPopupService } from '../services/notification-popup.service';

/**
 * Component displaying notifications in a snackbar
 */
@Component({
  selector: 'sentinel-notification-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsPopupComponent implements OnInit, OnDestroy {
  /**
   * Notifications to display
   */
  notifications$?: Observable<SentinelNotification[]>;

  constructor(
    public snackbar: MatSnackBar,
    private notificationPopupService: NotificationPopupService,
  ) {}

  ngOnInit(): void {
    this.notifications$ = this.notificationPopupService.notifications$;
  }

  ngOnDestroy(): void {
    this.snackbar.dismiss();
  }

  /**
   * Closes notification with dismissed result
   * @param notification notification to close
   */
  close(notification: SentinelNotification): void {
    this.notificationPopupService.close(notification, SentinelNotificationResult.DISMISSED);
  }

  /**
   * Closes notification with confirmed result
   * @param notification notification to confirm and close
   */
  confirmAction(notification: SentinelNotification): void {
    this.notificationPopupService.close(notification, SentinelNotificationResult.CONFIRMED);
  }
}
