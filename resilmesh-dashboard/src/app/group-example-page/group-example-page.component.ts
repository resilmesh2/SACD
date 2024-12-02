import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-group-example-page',
  templateUrl: './group-example-page.component.html',
  styleUrls: ['./group-example-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupExamplePageComponent {}
