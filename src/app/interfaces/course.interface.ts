import { IAuthor } from './author.interface';
export interface Course {
  id: number;
  topRated: boolean;
  title: string;
  creationDate: string;
  durationMin: number;
  description: string;
  authors: IAuthor[];
}
