import { SentinelNotificationTypeEnum } from './sentinel-notification-type.enum';

export interface SentinelNotification {
  /**
   * Title of the notification
   */
  title: string;

  /**
   * Type of notification
   */
  type: SentinelNotificationTypeEnum;

  /**
   * Any messages related to the notification
   */
  additionalInfo?: string[];

  /**
   * Source of the notification
   */
  source?: string;

  /**
   * For how long should the notification be displayed
   */
  duration?: number;

  /**
   * Optional action which can be performed by user as a follow-up to the notification
   */
  action?: string;

  /**
   * Do not modify
   */
  id?: number;

  /**
   * Do not modify
   */
  timestamp?: number;
}
