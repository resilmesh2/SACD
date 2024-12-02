import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationApi } from './sentinel-notification-api.service';

/**
 * Service layer handling notification operations on IndexedDB
 */
@Injectable()
export class NotificationIndexedDBApi extends SentinelNotificationApi {
  constructor(private dbService: NgxIndexedDBService) {
    super();
  }

  /**
   * Adds new notification to db
   * @param notification
   */
  add(notification: SentinelNotification): Observable<number> {
    return from(
      this.dbService.add<SentinelNotification>('notifications', {
        timestamp: notification.timestamp,
        additionalInfo: notification.additionalInfo,
        title: notification.title,
        source: notification.source,
        type: notification.type,
      }),
    ).pipe(
      tap({ error: (err) => console.error('IndexedDB Add notification error: ' + err) }),
      map((notification) => notification.id),
    );
  }

  /**
   * Returns notification by id
   * @param id id of the notification to retrieve
   */
  get(id: number): Observable<SentinelNotification> {
    return from(this.dbService.getByID<SentinelNotification>('notifications', id)).pipe(
      tap({ error: (err) => console.error('IndexedDB Get notification error: ' + err) }),
    );
  }

  /**
   * Returns total count of notifications
   */
  count(): Observable<number> {
    return from(this.dbService.count('notifications'));
  }

  /**
   * Gets paginated notifications
   * @param page page to retrieve
   * @param size size of the page
   */
  getAll(page: number, size: number): Observable<SentinelNotification[]> {
    return from(this.dbService.getAll<SentinelNotification>('notifications')).pipe(
      tap({ error: (err) => console.error('IndexedDB GetAll notification error: ' + err) }),
      map((notifications) => notifications.reverse()),
      map((notifications) => {
        const fromIndex = page * size;
        const toIndex = fromIndex + size;
        return notifications.slice(fromIndex, toIndex);
      }),
    );
  }
}
