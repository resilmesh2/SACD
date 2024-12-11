import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationApi } from './sentinel-notification-api.service';
import { first } from 'rxjs/operators';

@Injectable()
export class NotificationResolver {
  constructor(private api: SentinelNotificationApi) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<SentinelNotification> | Promise<SentinelNotification> | SentinelNotification {
    if (!route.paramMap.has('id')) {
      console.error(
        'No parameter found on key: id. ' +
          'Please consult the documentation to set up routing to notification detail correctly.',
      );
      return EMPTY;
    }
    if (Number.isNaN(Number(route.paramMap.get('id')))) {
      console.error('Value under id must be a number');
      return EMPTY;
    }
    const id = Number(route.paramMap.get('id'));
    return this.api.get(id).pipe(first());
  }
}
