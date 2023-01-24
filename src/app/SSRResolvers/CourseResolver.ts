import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CoursesService } from '../pages/courses/courses.service';

@Injectable()
export class CourseResolver implements Resolve<any> {
  constructor(private courseService: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    return this.courseService.getItemById(id);
  }
}
