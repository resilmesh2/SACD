import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  OnChanges,
  Optional,
  Output,
  signal,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { SentinelUser } from '@sentinel/layout';
import { SentinelLayoutI18nService, SentinelUserMenuI18n } from '@sentinel/layout/i18n';
import { propertyOf } from '@sentinel/common/utils';

/**
 * User menu component
 */
@Component({
  selector: 'sentinel-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnChanges {
  /**
   * User to be displayed in user card
   */
  @Input() user?: SentinelUser;

  /**
   * Optional route to user profile component
   */
  @Input() userProfileRoute?: string;

  /**
   * Emits event when login is requested
   */
  @Output() login: EventEmitter<void> = new EventEmitter();

  /**
   * Emits event when logout is requested
   */
  @Output() logout: EventEmitter<void> = new EventEmitter();

  iconSrc?: string;
  i18n: Signal<SentinelUserMenuI18n>;

  constructor(
    @Optional()
    readonly i18nService?: SentinelLayoutI18nService | null,
  ) {
    const i18nFallback: SentinelUserMenuI18n = {
      login: 'Login',
      logout: 'Logout',
      myAccount: 'My account',
    };
    this.i18n = this.i18nService?.stateSig()
      ? computed(() => this.i18nService?.stateSig().userMenu ?? i18nFallback)
      : signal(i18nFallback);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (propertyOf<UserMenuComponent>('user') in changes && this.user) {
      this.resolveIconSrc();
    }
  }

  /**
   * Emits event when login is requested
   */
  onLogin(): void {
    this.login.emit();
  }

  /**
   * Emits event when logout is requested
   */
  onLogout(): void {
    this.logout.emit();
  }

  private resolveIconSrc(): void {
    if (this.user && this.user.picture) {
      this.iconSrc = `data:image/png;base64,${this.user.picture}`;
    } else if (this.user && this.user.pictureSrc) {
      this.iconSrc = this.user.pictureSrc;
    }
  }
}
