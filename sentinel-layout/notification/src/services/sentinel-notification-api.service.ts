import { Observable } from 'rxjs';
import { SentinelNotification } from '../model/sentinel-notification';

/**
 * Abstract service layer handling retrieval and creation of notifications
 */
export abstract class SentinelNotificationApi {
  /**
   * Adds new notification to db
   * @param notification
   */
  abstract add(notification: SentinelNotification): Observable<number>;

  /**
   * Returns notification by id
   * @param id id of the notification to retrieve
   */
  abstract get(id: number): Observable<SentinelNotification>;

  /**
   * Returns total count of notifications
   */
  abstract count(): Observable<number>;

  /**
   * Gets paginated notifications
   * @param page page to retrieve
   * @param size size of the page
   */
  abstract getAll(page: number, size: number): Observable<SentinelNotification[]>;
}
