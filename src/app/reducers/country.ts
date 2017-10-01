import * as country from '../actions/country';
import { Country } from '../models/country';
import { RootState } from './index';

export interface State {
  ids: string[];
  entities: { [id: string]: Country };
  loading: boolean;
}

export const initialState: State = {
  ids: ['USA', 'CAN'],
  entities: {
    USA: {
      code: 'USA',
      displayName: 'United States'
    },
    CAN: {
      code: 'CAN',
      displayName: 'Canada'
    }
  },
  loading: false
};

export function reducer(state = initialState, action: country.Actions): State {
  switch (action.type) {
    case country.LOAD:
      return {
        ...state,
        loading: true
      };

    case country.LOAD_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case country.LOAD_FAIL:
      return {
        ...state,
        loading: false
      };

    default: {
      return state;
    }
  }
}

// TODO: Could be simplified by using Feature based reducers
export const list = (state: RootState) =>
  state.country.ids.map(id => state.country.entities[id]);
