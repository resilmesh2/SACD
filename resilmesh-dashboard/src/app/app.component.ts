import { Component, OnInit } from '@angular/core';
import { SentinelNotificationTypeEnum, SentinelNotificationService } from '@sentinel/layout/notification';
import { filter, map } from 'rxjs/operators';
import { SentinelBreadcrumbBuilder, SentinelBreadcrumb } from '@sentinel/layout/breadcrumbs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AgendaContainer, SentinelUser } from '@sentinel/layout';
import { agendaContainers } from './agendas';

export const user = {
  picture:
    // eslint-disable-next-line max-len
    'iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAB8ElEQVR4Xu3YIQ5DQQwD0R6qFyro/Y/wy8cymAZFCnjE0loO3dfzPK9/vT/fZxveYERgcMgGvMGIwOCQDXiDEYHBIRvwBiMCg0M24A1GBAaHbMAbjAgMDtmANxgRGByyAW8wIjA4ZAPeYERgcMgGvMGIwOCQDXiDEYHBIRvwBiMCg0M24A1GBAaHbMAbjAgMDtmANxgRnC6C00VwughOF8HpIjhdBKeL4HQRnC6C00VwughOF8HpIjhdBKcb/UmxzGCXwS6DXcboMYcY7DLYZbDLGD3mEINdBrsMdhmjxxxisMtgl8EuY/SYQwx2Gewy2GWMHnOIwS6DXQa7jNFjDjHYZbDLYJcxeswhBrsMdhnsMkaPOcRgl8Eug13G6DGHGOwy2GWwyxg95hCDXQa7DHYZo8ccYrDLYJfBLmP0mEMMdhnsMthljB5ziMEug10Gu4zRYw4x2GWwy2CXEWWni+B0EZwugtNFcLoIThfB6SI4XQSni+B0EZwugtNFcLoIThfB6Ub/OyzbgDcYo8ccsgFvMEaPOWQD3mCMHnPIBrzBGD3mkA14gzF6zCEb8AZj9JhDNuANxugxh2zAG4zRYw7ZgDcYo8ccsgFvMEaPOWQD3mCMHnPIBrzBGD3mkA14gzF6zCEb8AZj9JhDNuANxg9pN4hcwILIiAAAAABJRU5ErkJggg==',
  name: 'Resilmesh User',
  login: 'resilmesh@resilmesh.eu',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'resilmesh-dashboard';
  agendaContainers: AgendaContainer[] = [];
  user: SentinelUser;
  breadcrumbs$?: Observable<SentinelBreadcrumb[]>;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private notificationService: SentinelNotificationService,
  ) {
    this.agendaContainers = agendaContainers;
    this.user = user;
  }

  ngOnInit(): void {
    const navigationEndEvent$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));
    this.breadcrumbs$ = navigationEndEvent$.pipe(map(() => SentinelBreadcrumbBuilder.build(this.activeRoute.snapshot)));
  }

  addNotification(): void {
    this.notificationService
      .emit({
        type: this.generateRandomNotificationType(),
        title: 'Delete user with ID: 153',
        additionalInfo: ['You do not have right to perform this operation.'],
        source: 'Some Agenda',
        action: 'show',
        duration: 3000,
      })
      .subscribe((result) => console.log('Result: ' + result));
  }

  private generateRandomNotificationType(): SentinelNotificationTypeEnum {
    const notificationTypes = Object.entries(SentinelNotificationTypeEnum);
    return notificationTypes[Math.floor(Math.random() * Math.floor(4))][1];
  }
}
