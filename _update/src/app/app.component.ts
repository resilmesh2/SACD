import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { AgendaContainer, SentinelUser } from "@sentinel/layout";
import { SentinelBreadcrumb, SentinelBreadcrumbBuilder } from "@sentinel/layout/breadcrumbs";
import { SentinelLayout1Component } from "@sentinel/layout/layout1";
import { SentinelNotificationService, SentinelNotificationTypeEnum } from "@sentinel/layout/notification";
import { filter, map, Observable } from "rxjs";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GraphQLModule } from "./services/graphql.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Apollo, gql } from "apollo-angular";

/**
 * Angular Material
 */
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner, MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule} from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { SubnetsComponent } from "./pages/subnet-page/subnets.component";
import { InsertSubnetDialog } from "./pages/subnet-page/insert-subnet-dialog/insert.subnet.component";
import { ChipsContacts } from "./pages/subnet-page/insert-subnet-dialog/chips-contacts/chips-contacts.component";
import { CommonModule } from "@angular/common";
import { SubnetRoutingModule } from "./pages/subnet-page/subnet-routing.module";
import { agendaContainers } from "./agendas";

export const user = {
  picture:
    // eslint-disable-next-line max-len
    'iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAB8ElEQVR4Xu3YIQ5DQQwD0R6qFyro/Y/wy8cymAZFCnjE0loO3dfzPK9/vT/fZxveYERgcMgGvMGIwOCQDXiDEYHBIRvwBiMCg0M24A1GBAaHbMAbjAgMDtmANxgRGByyAW8wIjA4ZAPeYERgcMgGvMGIwOCQDXiDEYHBIRvwBiMCg0M24A1GBAaHbMAbjAgMDtmANxgRnC6C00VwughOF8HpIjhdBKeL4HQRnC6C00VwughOF8HpIjhdBKcb/UmxzGCXwS6DXcboMYcY7DLYZbDLGD3mEINdBrsMdhmjxxxisMtgl8EuY/SYQwx2Gewy2GWMHnOIwS6DXQa7jNFjDjHYZbDLYJcxeswhBrsMdhnsMkaPOcRgl8Eug13G6DGHGOwy2GWwyxg95hCDXQa7DHYZo8ccYrDLYJfBLmP0mEMMdhnsMthljB5ziMEug10Gu4zRYw4x2GWwy2CXEWWni+B0EZwugtNFcLoIThfB6SI4XQSni+B0EZwugtNFcLoIThfB6Ub/OyzbgDcYo8ccsgFvMEaPOWQD3mCMHnPIBrzBGD3mkA14gzF6zCEb8AZj9JhDNuANxugxh2zAG4zRYw7ZgDcYo8ccsgFvMEaPOWQD3mCMHnPIBrzBGD3mkA14gzF6zCEb8AZj9JhDNuANxg9pN4hcwILIiAAAAABJRU5ErkJggg==',
  name: 'Sentinel User',
  login: 'sentinel@sentinel.cz',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet, 
    SentinelLayout1Component,
    MatIconButton,
    MatIconModule,
    // MatTableModule,
    // MatButtonModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatIconModule,
    // MatProgressSpinnerModule,
    // FormsModule,
    // CommonModule, 
    // SubnetRoutingModule,
    // BrowserModule,
    // MatButtonModule,
    // MatProgressSpinnerModule,
    // MatTabsModule,
    // MatSnackBarModule,
    // MatPaginatorModule,
    // MatCardModule,
    // MatIconModule,
    // MatMenuModule,
    // MatFormFieldModule,
    // MatTableModule,
    // MatSortModule,
    // MatInputModule,
    // MatCheckboxModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MatTooltipModule,
    // MatSelectModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // GraphQLModule,
    HttpClientModule,
    // MatDialogModule,
    // MatChipsModule,
  ],
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  private notificationService = inject(SentinelNotificationService, { optional: true });

  protected readonly title = signal('SACD');
  agendaContainers: AgendaContainer[] = agendaContainers;
  user: SentinelUser;
  breadcrumbs$?: Observable<SentinelBreadcrumb[]>;

  constructor() {
    this.user = user;
  }

  ngOnInit(): void {
    const navigationEndEvent$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));
    this.breadcrumbs$ = navigationEndEvent$.pipe(map(() => SentinelBreadcrumbBuilder.build(this.activeRoute.snapshot)));
  }

  addNotification(): void {
    this.notificationService
      ?.emit({
        type: this.generateRandomNotificationType(),
        title: 'Delete user with ID: 153',
        additionalInfo: ['You do not have right to perform this operation.'],
        source: 'Some Agenda',
        action: 'show',
        duration: 3000,
      })
      ?.subscribe((result) => console.log('Result: ' + result));
  }

  private generateRandomNotificationType(): SentinelNotificationTypeEnum {
    const notificationTypes = Object.entries(SentinelNotificationTypeEnum);
    return notificationTypes[Math.floor(Math.random() * Math.floor(4))][1];
  }

  onClick() {
    console.log('click');
  }
}
