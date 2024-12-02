import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, switchMap, throttleTime } from 'rxjs/operators';
import { SentinelNotification } from '../model/sentinel-notification';
import { NotificationOverviewService } from '../services/notification-overview.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sentinel-notification-overview',
  templateUrl: './sentinel-notification-overview.component.html',
  styleUrls: ['./sentinel-notification-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NotificationOverviewService],
})
export class SentinelNotificationOverviewComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;

  theEnd = false;
  offset: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  notifications$: Observable<SentinelNotification[]>;

  private readonly PAGE_SIZE = 10;
  private destroyRef = inject(DestroyRef);
  constructor(private notificationOverviewService: NotificationOverviewService) {
    this.notifications$ = this.notificationOverviewService.notifications$;
    this.offset
      .pipe(
        throttleTime(300),
        takeUntilDestroyed(this.destroyRef),
        mergeMap((offset) => this.notificationOverviewService.getAll(0, this.PAGE_SIZE + (offset ?? 0))),
        switchMap(() => this.notificationOverviewService.totalSize$),
      )
      .subscribe((totalSize) => (this.theEnd = totalSize === this.offset.getValue()));
  }

  nextBatch(offset: number): void {
    if (this.theEnd || !this.viewport) {
      return;
    }
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if (end === total) {
      this.offset.next(offset);
    }
  }

  trackByIdx(i: number): number {
    return i;
  }
}
