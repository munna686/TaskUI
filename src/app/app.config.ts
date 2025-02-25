import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    {provide : HTTP_INTERCEPTORS,useValue : authInterceptor,multi : true},
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
          preset: Aura,
          options: { darkModeSelector: '.app-dark' }
      }
    })
  ]
};



