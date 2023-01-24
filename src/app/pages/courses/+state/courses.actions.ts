import { createAction, props } from '@ngrx/store';

import { Course } from 'src/app/interfaces/course.interface';

export const loadCourses = createAction('[Courses] Load Courses');
export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);
export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: string }>()
);

export const createCourse = createAction(
  '[Courses] Create Course',
  props<{ course: Course }>()
);
export const createCourseSuccess = createAction(
  '[Courses] Create Course Success',
  props<{ course: Course }>()
);
export const createCourseFailure = createAction(
  '[Courses] Create Course Failure',
  props<{ error: string }>()
);

export const editCourse = createAction(
  '[Courses] Edit Course',
  props<{ course: Course }>()
);
export const editCourseSuccess = createAction(
  '[Courses] Edit Course Success',
  props<{ course: Course }>()
);
export const editCourseFailure = createAction(
  '[Courses] Edit Course Failure',
  props<{ error: string }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: number }>()
);
export const deleteCourseSuccess = createAction(
  '[Courses] Delete Course Success',
  props<{ id: number }>()
);
export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: string }>()
);
