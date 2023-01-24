import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/interfaces/course.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(title: string, courses: Course[]) {
    if (!title) return courses;
    return courses.filter((course) => course.title.includes(title));
  }
}
