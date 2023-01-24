import { loadToken, loadTokenSuccess, loadTokenFailure } from './app.actions';
import { initialState } from './app.state';
import { createReducer, on } from '@ngrx/store';

const _appReducer = createReducer(
  initialState,
  on(loadToken, (state) => {
    return {
      ...state,
      token: '',
    };
  }),
  on(loadTokenSuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
    };
  }),
  on(loadTokenFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

export function appReducer(state: any, action: any) {
  return _appReducer(state, action);
}
