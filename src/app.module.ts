import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
// FIXME: Find a way to not have devtools dependencies in app.module
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { SampleComponent } from './app/sample/sample.component';
import { reducers, metaReducers } from './app/reducers';
// FIXME: Find a way to not have hrm dependencies in app.module
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr/dist';

// FIXME: Find a better way to import global styles
import '!!style-loader!css-loader!sass-loader!../src/styles/global.scss';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }

  public hmrOnInit(store) {
    if (!store || !store.state) {
      return;
    }

    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }

    this.appRef.tick();

    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map((cmp: any) => cmp.location.nativeElement);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues  = createInputTransfer();
    removeNgStyles();
  }

  public hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
