import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationApi } from './sentinel-notification-api.service';

/**
 * Layer between components and notification api
 */
@Injectable()
export class NotificationOverviewService {
  private notificationsSubject$: BehaviorSubject<SentinelNotification[]> = new BehaviorSubject<SentinelNotification[]>(
    [],
  );

  /**
   * Notifications of current page
   */
  notifications$: Observable<SentinelNotification[]> = this.notificationsSubject$.asObservable();

  private totalSizeSubject$: BehaviorSubject<number> = new BehaviorSubject(0);

  /**
   * Total number of notifications
   */
  totalSize$: Observable<number> = this.totalSizeSubject$.asObservable();

  constructor(private api: SentinelNotificationApi) {}

  /**
   * Gets all notifications on a page of some size
   * @param page page to retrieve
   * @param size size of the page
   */
  getAll(page: number, size: number): Observable<SentinelNotification[]> {
    return this.api.count().pipe(
      tap((count) => this.totalSizeSubject$.next(count)),
      switchMap(() => this.api.getAll(page, size)),
      tap((notifications) => this.notificationsSubject$.next(notifications)),
    );
  }
}
