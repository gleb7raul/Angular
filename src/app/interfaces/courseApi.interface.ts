import { IAuthor } from './author.interface';

export interface CourseApi {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  isTopRated: boolean;
  authors: IAuthor[];
}
