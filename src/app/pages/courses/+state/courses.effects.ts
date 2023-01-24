import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, mergeMap, finalize } from 'rxjs/operators';

import { CoursesService } from '../courses.service';

import * as CoursesActions from './courses.actions';

@Injectable()
export class CoursesEffects {
  public defaultCoursesShow: number = 4;

  getCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      mergeMap(() => {
        return this.service.getList(this.defaultCoursesShow).pipe(
          map((courses) => CoursesActions.loadCoursesSuccess({ courses })),
          catchError((error) =>
            of(CoursesActions.loadCoursesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  setNewCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.createCourse),
      mergeMap((payload) => {
        return this.service.createCourse(payload.course).pipe(
          map((course) => CoursesActions.createCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.createCourseFailure({ error: error.message }))
          ),
          finalize(() => this.router.navigate(['/courses']))
        );
      })
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.editCourse),
      mergeMap((payload) => {
        return this.service.updateItem(payload.course).pipe(
          map((course) => CoursesActions.editCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.editCourseFailure({ error: error.message }))
          ),
          finalize(() => this.router.navigate(['/courses']))
        );
      })
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      mergeMap((payload) => {
        return this.service.removeItem(payload.id).pipe(
          map(() => CoursesActions.deleteCourseSuccess({ id: payload.id })),
          catchError((error) =>
            of(CoursesActions.deleteCourseFailure({ error: error.message }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private service: CoursesService,
    private readonly router: Router
  ) {}
}