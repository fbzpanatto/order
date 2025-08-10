import { ApplicationConfig, LOCALE_ID, inject, Injectable, provideEnvironmentInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from "@angular/common/http";

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

registerLocaleData(localePt, 'pt-BR');
registerLocaleData(localePt, 'pt-BR', localePtExtra)

@Injectable({
  providedIn: 'root'
})
class Initializers {

  constructor( private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer ) {}

  get icons() {
    return [
      'add',
      'order',
      'home'
    ]
  }

  init() {
    for (let icon of this.icons) {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/mat-icons/${icon}.svg`)
      )
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    provideEnvironmentInitializer(() => { inject(Initializers).init() }),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
};
