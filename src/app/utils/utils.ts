import { Course } from 'src/app/interfaces/course.interface';
import { CourseApi } from 'src/app/interfaces/courseApi.interface';

export const dataApiExtraction = (item: CourseApi): Course => {
  return {
    id: item.id,
    topRated: item.isTopRated,
    title: item.name,
    creationDate: item.date,
    durationMin: item.length,
    description: item.description,
    authors: item.authors,
  };
};
