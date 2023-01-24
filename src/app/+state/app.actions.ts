import { createAction, props } from '@ngrx/store';

import { Authorization } from 'src/app/interfaces/authorization.interface';

export const loadToken = createAction(
  '[App] Load Token',
  props<{ auth: Authorization }>()
);
export const loadTokenSuccess = createAction(
  '[App] Load Token Success',
  props<{ token: string }>()
);
export const loadTokenFailure = createAction(
  '[App] Load Token Failure',
  props<{ error: string }>()
);
