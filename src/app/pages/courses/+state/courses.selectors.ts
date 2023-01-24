import { createSelector } from '@ngrx/store';
import { CoursesState } from './courses.state';

export const selectorFeature = (state: any) => state.courses;

export const coursesSelector = createSelector(
  selectorFeature,
  (state: CoursesState) => state.courses
);