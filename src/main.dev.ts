import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
import { AppModule } from './app.module';
import { enableDebugTools } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';

function main() {

  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((modRef: any) => {
      const appRef = modRef.injector.get(ApplicationRef);
      const cmpRef = appRef.components[0];

      enableDebugTools(cmpRef);
      return modRef;
    })
    .catch((err) => console.error(err));
}

bootloader(main);
