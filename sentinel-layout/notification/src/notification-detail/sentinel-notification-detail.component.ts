import { ChangeDetectionStrategy, Component, computed, OnInit, Optional, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelLayoutI18nService, SentinelNotificationDetailI18n } from '@sentinel/layout/i18n';

@Component({
  selector: 'sentinel-notification-detail',
  templateUrl: './sentinel-notification-detail.component.html',
  styleUrls: ['./sentinel-notification-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentinelNotificationDetailComponent implements OnInit {
  notification$?: Observable<SentinelNotification>;
  i18n: Signal<SentinelNotificationDetailI18n>;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Optional()
    readonly i18nService?: SentinelLayoutI18nService | null,
  ) {
    const i18nFallback: SentinelNotificationDetailI18n = {
      source: 'Source',
      type: 'Type',
      created: 'Created',
    };
    this.i18n = this.i18nService?.stateSig()
      ? computed(() => this.i18nService?.stateSig().notifications?.detail ?? i18nFallback)
      : signal(i18nFallback);
  }

  ngOnInit(): void {
    this.notification$ = this.activatedRoute.data.pipe(map((data) => data.sentinelNotification));
  }
}
