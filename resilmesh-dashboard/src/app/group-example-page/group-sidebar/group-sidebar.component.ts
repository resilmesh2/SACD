import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-group-sidebar',
  templateUrl: './group-sidebar.component.html',
  styleUrls: ['./group-sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupSidebarComponent {}
