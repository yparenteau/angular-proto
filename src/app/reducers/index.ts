import { MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromCountry from './country';

export interface RootState {
  country: fromCountry.State;
}

export const reducers = {
  country: fromCountry.reducer
};

export const metaReducers: MetaReducer<RootState>[] = [storeFreeze];
