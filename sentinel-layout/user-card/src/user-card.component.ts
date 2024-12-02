import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SentinelUser } from '@sentinel/layout';

/**
 * User card to display overview of a user
 */
@Component({
  selector: 'sentinel-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  /**
   * User to display
   */
  @Input() user?: SentinelUser;
  @Input() iconSrc?: string;
}
