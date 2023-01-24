import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { CoursesService } from './courses.service';

import { Course } from 'src/app/interfaces/course.interface';

import * as CoursesActions from './+state/courses.actions';
import { coursesSelector } from './+state/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public defaultCourses: Course[] = [];
  public defaultCoursesShow: number = 4;

  @Output() public courses: Course[] = [];
  @Output() public isShowLoadButton: boolean = false;

  @Output()
  auth: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private store: Store, private service: CoursesService) {
    this.store.pipe(select(coursesSelector)).subscribe((courses) => {
      this.isShowLoadButton = true;
      this.courses = courses;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses());
  }

  public onSearch(title: string): void {
    if (!!title) {
      this.service.search(title).subscribe((courses: Course[]): void => {
        this.courses = courses;
      });
    }
  }

  public deleteCourse(id: number): void {
    const deleteCourse = prompt(
      'Do you really want to delete this course?',
      'Please type Yes or No'
    );
    if (deleteCourse !== null && deleteCourse.toLowerCase() === 'yes') {
      this.store.dispatch(CoursesActions.deleteCourse({id}));
    }
  }

  private getCourses(): void {
    this.service.getList(this.defaultCoursesShow).subscribe((data) => {
      if (data) {
        this.isShowLoadButton = true;
        this.courses = data;
      }
    });
  }

  public loadMore(value: boolean): void {
    if (value) {
      this.defaultCoursesShow += 4;
      this.getCourses();
    }
  }
}
