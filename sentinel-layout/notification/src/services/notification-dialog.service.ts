import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationResult } from '../model/sentinel-notification-result.enum';

/**
 * Displays notifications in Material Dialog
 */
@Injectable()
export class NotificationDialogService {
  constructor(public dialog: MatDialog) {}

  /**
   * Displays notification in dialog and returns observable of the result
   * @param notification notification to display in dialog
   * @param component component of the dialog
   */
  display<T>(notification: SentinelNotification, component: ComponentType<T>): Observable<SentinelNotificationResult> {
    if (this.dialog.openDialogs.length !== 0) {
      return of(SentinelNotificationResult.DISMISSED);
    }
    const ref = this.dialog.open(component, {
      data: notification,
      disableClose: true,
    });

    return ref
      .afterClosed()
      .pipe(map((result) => (result === undefined || result === null ? SentinelNotificationResult.DISMISSED : result)));
  }
}
