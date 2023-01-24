import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/interfaces/course.interface';

@Pipe({
  name: 'orderBy',
})
export class OrderBy implements PipeTransform {
  transform(courses: Course[]) {
    return courses.sort((firstCourse: any, secondCourse: any): number => {
      const firstCourseDateTime = new Date(firstCourse.creationDate).getTime();
      const secondCourseDateTime = new Date(
        secondCourse.creationDate
      ).getTime();
      return secondCourseDateTime - firstCourseDateTime;
    });
  }
}
