import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const environment = {
  production: true,
  imports: [
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ]
};
