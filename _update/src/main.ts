import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideSentinelNotifications } from '@sentinel/layout/notification';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ROOT_ROUTES } from './app/routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideZonelessChangeDetection(),
    provideSentinelNotifications(),
    provideRouter(ROOT_ROUTES),
  ],
}).catch((err) => console.error(err));
