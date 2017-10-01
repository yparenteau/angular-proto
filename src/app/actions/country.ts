import { Action } from '@ngrx/store';
import { Country } from '../models/country';

export const LOAD =                 '[Country] Load';
export const LOAD_SUCCESS =         '[Country] Load Success';
export const LOAD_FAIL =            '[Country] Load Fail';

export class Load implements Action {
  public readonly type = LOAD;
}

export class LoadSuccess implements Action {
  public readonly type = LOAD_SUCCESS;

  constructor(public payload: Country[]) { }
}

export class LoadFail implements Action {
  public readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = Load | LoadSuccess | LoadFail;
