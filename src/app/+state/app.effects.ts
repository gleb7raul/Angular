import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, mergeMap, finalize } from 'rxjs/operators';

import { AuthService } from '../services/auth-service.service';

import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {
token: string = '';
  
  getToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadToken),
      mergeMap((payload) => {
        return this.service.login(payload.auth).pipe(
          map((data) => {
            this.token = data;
            return AppActions.loadTokenSuccess({ token: data })
          }),
          catchError((error) =>
            of(AppActions.loadTokenFailure({ error: error.message }))
          ),
          finalize(() => !!this.token && this.router.navigate(['/courses']))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private service: AuthService,
    private readonly router: Router
  ) {}
}