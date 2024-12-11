import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SentinelBreadcrumb } from '../../../../sentinel-layout/breadcrumbs/src/breadcrumb';

@Component({
  selector: 'app-user-example-page',
  templateUrl: './user-example-page.component.html',
  styleUrls: ['./user-example-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserExamplePageComponent {
  breadcrumbs: SentinelBreadcrumb[] = [
    { label: 'Page A', url: '/user' },
    { label: 'Nested Page AB', url: '/user' },
    { label: 'Nested Page ABC', url: '' },
    { label: 'Nested Page ABCD', url: '' },
    { label: 'Nested Page ABCDE', url: '' },
  ];
  breadcrumbs1: SentinelBreadcrumb[] = [
    { label: 'Page A', url: '/user' },
    { label: 'Nested Page AB', url: '/user' },
    { label: 'Nested Page AB', url: '/user' },
  ];
}
