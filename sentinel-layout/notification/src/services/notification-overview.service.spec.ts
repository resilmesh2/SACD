import { TestBed, waitForAsync } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';
import { NotificationOverviewService } from './notification-overview.service';
import { SentinelNotificationApi } from './sentinel-notification-api.service';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationTypeEnum } from '../model/sentinel-notification-type.enum';
import { asyncData } from '../../../internal/src/async-data';

describe('NotificationOverviewService', () => {
  let service: NotificationOverviewService;
  let apiSpy: jasmine.SpyObj<SentinelNotificationApi>;

  beforeEach(waitForAsync(() => {
    apiSpy = jasmine.createSpyObj('CsirtMuNotificationApi', ['count', 'getAll']);
    TestBed.configureTestingModule({
      providers: [NotificationOverviewService, { provide: SentinelNotificationApi, useValue: apiSpy }],
    });
    service = TestBed.inject(NotificationOverviewService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call api with pagination params on get all', (done) => {
    apiSpy.getAll.and.returnValue(asyncData([]));
    apiSpy.count.and.returnValue(asyncData(0));

    service
      .getAll(10, 5)
      .pipe(take(1))
      .subscribe({
        next: () => {
          expect(apiSpy.getAll).toHaveBeenCalledTimes(1);
          expect(apiSpy.getAll).toHaveBeenCalledWith(10, 5);
          done();
        },
        error: () => fail(),
      });
  });

  it('should update notifications on get all', (done) => {
    const notification1 = mockNotification();
    const notification2 = mockNotification();
    notification1.id = 1;
    notification2.id = 2;
    const mockedNotifications = [notification1, notification2];
    apiSpy.getAll.and.returnValue(asyncData(mockedNotifications));
    apiSpy.count.and.returnValue(asyncData(0));

    service.notifications$
      .pipe(
        skip(1), // we skip the default value
        take(1),
      )
      .subscribe({
        next: (notifications) => {
          expect(notifications).toEqual(mockedNotifications);
          done();
        },
        error: () => fail(),
      });

    service.getAll(10, 5).subscribe();
  });

  it('should update totalSize on get all', (done) => {
    apiSpy.getAll.and.returnValue(asyncData([]));
    apiSpy.count.and.returnValue(asyncData(10));

    service.totalSize$
      .pipe(
        skip(1), // we skip the default value
        take(1),
      )
      .subscribe({
        next: (size) => {
          expect(size).toBe(10);
          done();
        },
        error: () => fail(),
      });
    service.getAll(10, 5).subscribe();
  });

  function mockNotification(): SentinelNotification {
    return {
      title: 'Test Notification',
      type: SentinelNotificationTypeEnum.Error,
    };
  }
});
