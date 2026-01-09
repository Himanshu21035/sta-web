import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { provideRouter } from '@angular/router';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from '../auth.interceptor';
import { withInterceptors } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient( withInterceptors([authInterceptor])), provideHttpClient(withJsonpSupport()),
    provideAnimationsAsync(),
    
  ]
};
