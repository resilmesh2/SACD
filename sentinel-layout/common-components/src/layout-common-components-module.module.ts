import { NgModule } from '@angular/core';
import { LayoutCommonComponentsMaterialModule } from './layout-common-components-material.module';
import { LoadingComponent } from './loading/loading.component';
import { NavComponent } from './nav/nav.component';
import { NotificationSansProvidersModule, NotificationProvidersModule } from '@sentinel/layout/notification';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SentinelUserCardModule } from '@sentinel/layout/user-card';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ScrollContainerComponent } from './scroll-container/scroll-container.component';
import { AgendaElementComponent } from './nav/nav-elements/agenda-element/agenda-element.component';
import { NestedAgendaContainerComponent } from './nav/nav-elements/nested-agenda-container/nested-agenda-container.component';
import { RootAgendaContainerComponent } from './nav/nav-elements/root-agenda-container/root-agenda-container.component';
import { NavElementsComponent } from './nav/nav-elements/nav-elements.component';
import { SentinelBreadcrumbsModule } from '@sentinel/layout/breadcrumbs';
import { SentinelSidebarPageLayoutModule } from '@sentinel/layout/sidebar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SentinelPipesModule } from '@sentinel/common/pipes';
import { IsAgendaContainerPipe } from './nav/nav-elements/is-agenda-container.pipe';

@NgModule({
  declarations: [
    UserMenuComponent,
    LoadingComponent,
    ToolbarComponent,
    NavComponent,
    AgendaElementComponent,
    NestedAgendaContainerComponent,
    RootAgendaContainerComponent,
    NavElementsComponent,
    ScrollContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutCommonComponentsMaterialModule,
    SentinelUserCardModule,
    SentinelBreadcrumbsModule,
    SentinelSidebarPageLayoutModule,
    NotificationSansProvidersModule,
    SentinelPipesModule,
    IsAgendaContainerPipe,
  ],
  exports: [
    UserMenuComponent,
    LoadingComponent,
    ToolbarComponent,
    NavComponent,
    AgendaElementComponent,
    NestedAgendaContainerComponent,
    RootAgendaContainerComponent,
    NavElementsComponent,
    ScrollContainerComponent,
    NotificationSansProvidersModule,
    LayoutCommonComponentsMaterialModule,
    SentinelUserCardModule,
    SentinelBreadcrumbsModule,
    SentinelSidebarPageLayoutModule,
  ],
})
export class LayoutCommonComponentsSansProvidersModule {}

/**
 * Module containing layout components and services
 */
@NgModule({
  imports: [LayoutCommonComponentsSansProvidersModule, NotificationProvidersModule],
  exports: [LayoutCommonComponentsSansProvidersModule, NotificationProvidersModule],
})
export class LayoutCommonComponentsModule {}
