import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SentinelBreadcrumb } from '@sentinel/layout/breadcrumbs';
import { SentinelNotification } from '@sentinel/layout/notification';
import { SentinelUser } from '@sentinel/layout';

/**
 * Toolbar component with two rows
 */
@Component({
  selector: 'sentinel-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  /**
   * Decides whether to display two lined toolbar with breadcrumbs or not
   */
  @Input() withBreadcrumbs? = true;

  @Input() breadcrumbMaxLength = 45;

  /**
   * Breadcrumbs to be displayed in toolbar
   */
  @Input() breadcrumbs: SentinelBreadcrumb[] = [];

  /**
   * User to be displayed in user menu. If not provided, user menu is not displayed
   */
  @Input() user?: SentinelUser;

  /**
   * Optional route to user profile component
   */
  @Input() userProfileRoute?: string;

  /**
   * True if should display toggle for sidenav, false otherwise
   */
  @Input() displayNavToggle = false;

  /**
   * An array of notifications to display in notification menu
   */
  @Input() notifications: SentinelNotification[] = [];

  /**
   * Last emitted notification
   */
  @Input() lastNotification?: SentinelNotification;

  /**
   * Route to notification overview component page
   */
  @Input() notificationsRoute?: string;

  /**
   * Character(s) dividing individual breadcrumbs
   */
  @Input() breadcrumbsDivider?: string;

  /**
   * Emits event when hamburger menu toggle is clicked
   */
  @Output() navToggle: EventEmitter<void> = new EventEmitter();

  /**
   * Emits event when refresh of notifications is requested
   */
  @Output() refreshNotifications: EventEmitter<void> = new EventEmitter();

  /**
   * Emits event when login is requested
   */
  @Output() login: EventEmitter<void> = new EventEmitter();

  /**
   * Emits event when logout is requested
   */
  @Output() logout: EventEmitter<void> = new EventEmitter();

  /**
   * Emits event when hamburger menu toggle is clicked
   */
  onNavToggle(): void {
    this.navToggle.emit();
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

  onRefreshNotifications(): void {
    this.refreshNotifications.emit();
  }
}
