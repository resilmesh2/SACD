import { Component, Input } from '@angular/core';
import { SentinelNotificationTypeEnum } from '../model/sentinel-notification-type.enum';

/**
 * Component displaying notification icon based on its type
 */
@Component({
  selector: 'sentinel-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css'],
})
export class NotificationIconComponent {
  /**
   * Type of notification
   */
  @Input() type?: SentinelNotificationTypeEnum;

  /**
   * True if icons should be displayed in color, false if white
   */
  @Input() coloredIcon = true;
}
