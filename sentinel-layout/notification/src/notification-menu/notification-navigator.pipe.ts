import { Pipe, PipeTransform } from '@angular/core';
import { SentinelNotification } from '../model/sentinel-notification';

@Pipe({
  name: 'notificationNavigator',
  standalone: true,
})
export class NotificationNavigatorPipe implements PipeTransform {
  transform(notificationsRoute: string, notification: SentinelNotification): string {
    return `${notificationsRoute}/${notification?.id?.toString()}`;
  }
}
