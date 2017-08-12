import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

declare const process: any;
if (process.env.ENV === 'production') {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
