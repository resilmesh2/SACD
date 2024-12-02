import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SentinelLayout1Module } from '@sentinel/layout/layout1';
import { AppRoutingModule } from './app-routing.module';
import { SentinelBreadcrumbsModule } from '@sentinel/layout/breadcrumbs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './shared/services/graphql.module';

// Network
import { HttpClientModule } from '@angular/common/http';

// Ngx-graph
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

// Components
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MissionPageComponent } from './mission-page/mission-page.component';
import { MissionGraphComponent } from './mission-page/mission-graph/mission-graph.component';
import { NetworkVizualizationComponent } from './network-vizualization-page/network-vizualization.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, NetworkVizualizationComponent, MissionPageComponent, MissionGraphComponent],
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
    MatTooltipModule,
    MatSelectModule,
    GraphQLModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
