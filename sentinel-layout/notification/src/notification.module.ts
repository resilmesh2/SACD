import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { NotificationDialogService } from './services/notification-dialog.service';
import { NotificationIndexedDBApi } from './services/notification-indexed-db-api.service';
import { NotificationPopupService } from './services/notification-popup.service';
import { NotificationResolver } from './services/notification-resolver.service';
import { SentinelNotificationApi } from './services/sentinel-notification-api.service';
import { SentinelNotificationService } from './services/sentinel-notification.service';
import { NotificationCardModule } from './notification-card/notification-card.module';
import { NotificationErrorDialogComponent } from './notification-error-modal/notification-error-dialog.component';
import { NotificationIconModule } from './notification-icon/notification-icon.module';
import { NotificationMaterialModule } from './notification-material.module';
import { NotificationMenuComponent } from './notification-menu/notification-menu.component';
import { NotificationsPopupComponent } from './notification-popup/notifications-popup.component';
import { NotificationNavigatorPipe } from './notification-menu/notification-navigator.pipe';
import { SentinelPipesModule } from '@sentinel/common/pipes';
import { SLetDirective } from '@sentinel/common';

const dbConfig: DBConfig = {
  name: 'SentinelNotificationDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'notifications',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
        { name: 'additionalInfo', keypath: 'additionalInfo', options: { unique: false } },
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'source', keypath: 'source', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
      ],
    },
  ],
};

const PROVIDERS = [
  { provide: SentinelNotificationApi, useClass: NotificationIndexedDBApi },
  SentinelNotificationService,
  NotificationResolver,
  NotificationPopupService,
  NotificationDialogService,
];

@NgModule({
  declarations: [NotificationErrorDialogComponent, NotificationMenuComponent, NotificationsPopupComponent],
  imports: [
    CommonModule,
    RouterModule,
    NotificationCardModule,
    NotificationIconModule,
    NotificationMaterialModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    NotificationNavigatorPipe,
    SentinelPipesModule,
    SLetDirective,
  ],
  exports: [NotificationErrorDialogComponent, NotificationMenuComponent, NotificationsPopupComponent],
})
export class NotificationSansProvidersModule {}

@NgModule({
  providers: PROVIDERS,
})
export class NotificationProvidersModule {}

@NgModule({
  imports: [NotificationSansProvidersModule],
  providers: PROVIDERS,
  exports: [NotificationSansProvidersModule],
})
export class NotificationModule {}
