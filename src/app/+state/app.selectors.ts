import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectorFeature = (state: any) => state.token;

export const appSelector = createSelector(
  selectorFeature,
  (state: AppState) => state.token
);