import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationResult } from '../model/sentinel-notification-result.enum';

/**
 * Service handling displaying and closing popup notifications in material snackbar
 */
@Injectable()
export class NotificationPopupService {
  readonly DEFAULT_DURATION = 5000;

  public snackbarRef?: MatSnackBarRef<unknown>;
  private notificationResultsMap: Map<SentinelNotification, Subject<SentinelNotificationResult>> = new Map();
  private notificationsSubject$: BehaviorSubject<SentinelNotification[]> = new BehaviorSubject<SentinelNotification[]>(
    [],
  );

  /**
   * Notifications with active popups
   */
  notifications$: Observable<SentinelNotification[]> = this.notificationsSubject$.asObservable();

  constructor(public snackBar: MatSnackBar) {}

  /**
   * Displays notification in component and returns observable of the notification result
   * @param notification notification to display
   * @param component component to display the notification in
   */
  display<T>(notification: SentinelNotification, component: ComponentType<T>): Observable<SentinelNotificationResult> {
    if (!this.snackbarRef) {
      this.snackbarRef = this.openSnackbar(component);
    }
    this.notificationsSubject$.next([...this.notificationsSubject$.getValue(), notification]);
    this.addExpiration(notification);
    return this.createResultObservable(notification);
  }

  /**
   * Closes notification with result
   * @param toClose notification to close
   * @param result result of the notification
   */
  close(toClose: SentinelNotification, result: SentinelNotificationResult) {
    const notifications = this.notificationsSubject$.getValue();
    const index = notifications.findIndex((notification) => notification === toClose);

    if (index !== -1) {
      notifications.splice(index, 1);
      this.notificationsSubject$.next(notifications);
      this.emitResult(toClose, result);
    }

    if (this.isEmpty()) {
      this.closeSnackBar();
    }
  }

  private emitResult(notification: SentinelNotification, result: SentinelNotificationResult) {
    const resultSubject$ = this.notificationResultsMap.get(notification);
    if (resultSubject$) {
      resultSubject$.next(result);
    }
    this.notificationResultsMap.delete(notification);
  }

  private closeSnackBar() {
    this.snackBar.dismiss();
    this.snackbarRef = undefined;
  }

  private isEmpty(): boolean {
    return this.notificationsSubject$.getValue().length === 0;
  }

  private openSnackbar<T>(component: ComponentType<T>): MatSnackBarRef<T> {
    return this.snackBar.openFromComponent(component, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'sentinel-notification-snackbar',
    });
  }

  private addExpiration(notification: SentinelNotification) {
    setTimeout(
      () => {
        this.close(notification, SentinelNotificationResult.DISMISSED);
      },
      notification.duration ? notification.duration : this.DEFAULT_DURATION,
    );
  }

  private createResultObservable(notification: SentinelNotification): Observable<SentinelNotificationResult> {
    const resultSubject$ = new Subject<SentinelNotificationResult>();
    this.notificationResultsMap.set(notification, resultSubject$);
    return resultSubject$.asObservable();
  }
}
