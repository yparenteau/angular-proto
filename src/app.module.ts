import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { TestComponent } from './app/test/test';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }

  // public hmrOnInit(store) {
  //   if (!store || !store.state) {
  //     return;
  //   }
  //
  //   if ('restoreInputValues' in store) {
  //     store.restoreInputValues();
  //   }
  //
  //   this.appRef.tick();
  //
  //   delete store.state;
  //   delete store.restoreInputValues;
  // }
  //
  // public hmrOnDestroy(store) {
  //   const cmpLocation = this.appRef.components.map((cmp: any) => cmp.location.nativeElement);
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   store.restoreInputValues  = createInputTransfer();
  //   removeNgStyles();
  // }
  //
  // public hmrAfterDestroy(store) {
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }
}
