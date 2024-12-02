import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Presentational component displaying loading bar
 */
@Component({
  selector: 'sentinel-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  @Input() isLoading = false;
}
