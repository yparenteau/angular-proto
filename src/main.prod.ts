import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { disableDebugTools } from '@angular/platform-browser';
import { AppModule } from './app.module';

disableDebugTools();
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
