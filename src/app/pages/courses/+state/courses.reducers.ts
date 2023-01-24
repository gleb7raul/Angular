import {
  loadCourses,
  loadCoursesSuccess,
  loadCoursesFailure,
  createCourse,
  createCourseSuccess,
  createCourseFailure,
  editCourse,
  editCourseSuccess,
  editCourseFailure,
  deleteCourse,
  deleteCourseSuccess,
  deleteCourseFailure,
} from './courses.actions';
import { initialState } from './courses.state';
import { createReducer, on } from '@ngrx/store';

const _coursesReducer = createReducer(
  initialState,
  on(loadCourses, (state) => {
    return {
      ...state,
      courses: [],
    };
  }),
  on(loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.courses,
    };
  }),
  on(loadCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(createCourse, (state) => {
    return {
      ...state,
    };
  }),
  on(createCourseSuccess, (state, action) => {
    return {
      ...state,
      courses: state.courses.concat([action.course]),
    };
  }),
  on(createCourseFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(editCourse, (state) => {
    return {
      ...state,
    };
  }),
  on(editCourseSuccess, (state, action) => {
    return {
      ...state,
      courses: state.courses.map((course) => {
        if (course.id === action.course.id) {
          return action.course;
        }
        return course;
      }),
    };
  }),
  on(editCourseFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(deleteCourse, (state) => {
    return {
      ...state,
    };
  }),
  on(deleteCourseSuccess, (state, action) => {
    return {
      ...state,
      courses: state.courses.filter((course) => course.id !== action.id),
    };
  }),
  on(deleteCourseFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

export function coursesReducer(state: any, action: any) {
  return _coursesReducer(state, action);
}
