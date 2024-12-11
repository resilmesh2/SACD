import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  Optional,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelLayoutI18nService, SentinelNotificationMenuI18n } from '@sentinel/layout/i18n';

/**
 * Menu displaying latest notifications
 */
@Component({
  selector: 'sentinel-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('preventInitialChildAnimations', [transition(':enter', [query(':enter', [], { optional: true })])]),
    trigger('wobble', [
      transition(
        '* => *',
        animate(
          '1s 0s',
          keyframes([
            style({ transform: 'none', offset: 0 }),
            style({
              transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
              offset: 0.15,
            }),
            style({
              transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
              offset: 0.3,
            }),
            style({
              transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
              offset: 0.45,
            }),
            style({
              transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
              offset: 0.6,
            }),
            style({
              transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
              offset: 0.75,
            }),
            style({ transform: 'none', offset: 1 }),
          ]),
        ),
      ),
    ]),
  ],
})
export class NotificationMenuComponent {
  /**
   * Notifications to display in menu
   */
  @Input() notifications?: SentinelNotification[];

  /**
   * Last emitted notification
   */
  @Input() lastNotification?: SentinelNotification;

  /**
   * Route to notifications overview page
   */
  @Input() notificationsRoute?: string;

  /**
   * Emits event to refresh notifications list
   */
  @Output() refreshNotifications: EventEmitter<void> = new EventEmitter<void>();

  i18n: Signal<SentinelNotificationMenuI18n>;

  constructor(
    @Optional()
    readonly i18nService?: SentinelLayoutI18nService | null,
  ) {
    const i18nFallback: SentinelNotificationMenuI18n = {
      notifications: 'Notifications',
      showAll: 'Show All',
      noNotifications: 'You do not have any notifications yet',
    };
    this.i18n = this.i18nService?.stateSig()
      ? computed(() => this.i18nService?.stateSig()?.notifications?.menu ?? i18nFallback)
      : signal(i18nFallback);
  }

  /**
   * Refreshes notifications to display when user opens the menu
   */
  onOpenNotifications(): void {
    this.refreshNotifications.emit();
  }
}
