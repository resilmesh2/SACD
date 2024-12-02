import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-new-example-page',
  templateUrl: './product-new-example-page.component.html',
  styleUrls: ['./product-new-example-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductNewExamplePageComponent {}
