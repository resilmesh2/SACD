import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-overview-example-page',
  templateUrl: './product-overview-example-page.component.html',
  styleUrls: ['./product-overview-example-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductOverviewExamplePageComponent {}
