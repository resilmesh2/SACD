import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SentinelLayout1Module } from '@sentinel/layout/layout1';
import { AppRoutingModule } from './app-routing.module';
import { SentinelBreadcrumbsModule } from '@sentinel/layout/breadcrumbs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './shared/services/graphql.module';
import { ApolloModule } from 'apollo-angular';

// Network
import { HttpClientModule } from '@angular/common/http';

// Ngx-charts, Ngx-graph
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGraphModule } from '@swimlane/ngx-graph';

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
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Components
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MissionPageComponent } from './mission-page/mission-page.component';
import { MissionGraphComponent } from './mission-page/mission-graph/mission-graph.component';
import { NetworkVizualizationComponent } from './network-vizualization-page/network-vizualization.component';
import { IssueComponent } from './issue-page/issue.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { ServiceComponent } from './service-page/service.component';
import { VulnerabilityComponent } from './vulnerability-page/vulnerability.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NetworkVizualizationComponent,
    MissionPageComponent,
    MissionGraphComponent,
    IssueComponent,
    IssueDetailComponent,
    ServiceComponent,
    VulnerabilityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SentinelLayout1Module,
    SentinelBreadcrumbsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGraphModule,
    NgxChartsModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
