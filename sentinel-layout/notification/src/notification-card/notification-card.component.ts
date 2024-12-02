import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  OnChanges,
  Optional,
  signal,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SentinelNotification } from '../model/sentinel-notification';
import { propertyOf } from '@sentinel/common/utils';
import { SentinelLayoutI18nService, SentinelNotificationCardI18n } from '@sentinel/layout/i18n';

/**
 * Component displaying basic info about the  notification in material card
 */
@Component({
  selector: 'sentinel-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCardComponent implements OnChanges {
  /**
   * Notification to display
   */
  @Input() notification?: SentinelNotification;

  /**
   * True if detailed info should be displayed, false otherwise
   */
  @Input() detailed = false;

  @Input() routerLink?: string;

  readonly TITLE_MAX_LENGTH = 25;
  readonly DETAILED_TITLE_MAX_LENGTH = 100;
  readonly INFO_MAX_LENGTH = 50;
  readonly DETAILED_INFO_MAX_LENGTH = 200;

  /**
   * Max length of the title
   */
  titleMaxLength = 25;

  /**
   * Max length of the additional info
   */
  additionalInfoMaxLength = 50;

  notificationAdditionalInfo = '';
  i18n: Signal<SentinelNotificationCardI18n>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Optional()
    readonly i18nService?: SentinelLayoutI18nService | null,
  ) {
    const i18nFallback: SentinelNotificationCardI18n = {
      source: 'Source',
    };
    this.i18n = this.i18nService?.stateSig()
      ? computed(() => this.i18nService?.stateSig().notifications?.card ?? i18nFallback)
      : signal(i18nFallback);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (propertyOf<NotificationCardComponent>('detailed') in changes) {
      this.setLengthValues();
    }
    if (
      propertyOf<NotificationCardComponent>('notification') in changes &&
      this.notification &&
      this.notification.additionalInfo &&
      this.notification.additionalInfo.length > 0
    ) {
      this.notificationAdditionalInfo = this.notification.additionalInfo[0];
    }
  }

  navigateToNotification(): void {
    this.router.navigate([this.routerLink], { relativeTo: this.activatedRoute });
  }

  private setLengthValues() {
    this.titleMaxLength = this.detailed ? this.DETAILED_TITLE_MAX_LENGTH : this.TITLE_MAX_LENGTH;
    this.additionalInfoMaxLength = this.detailed ? this.DETAILED_INFO_MAX_LENGTH : this.INFO_MAX_LENGTH;
  }
}
