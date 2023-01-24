import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { LoadingService } from '../../services/loading.service';

import { Course } from 'src/app/interfaces/course.interface';
import { CourseApi } from 'src/app/interfaces/courseApi.interface';

import { dataApiExtraction } from '../../utils/utils';

import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { TransferState } from '@angular/platform-browser';

import { makeStateKey } from '@angular/platform-browser';

const COURSE_DATA_KEY = makeStateKey<Course[]>('courseData');

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private basePath: string = 'http://localhost:3004';
  private listCountDefaultStart: number = 0;

  constructor(
    private transferState: TransferState,
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  public getList(count: number): Observable<any> {
    this.loadingService.showLoading();

    let params = new HttpParams()
      .set('start', this.listCountDefaultStart)
      .set('count', count);

    return this.http
      .get<CourseApi[]>(`${this.basePath}/courses`, { params })
      .pipe(
        map((data) => {
          const currentData = data.map((item: CourseApi) =>
            dataApiExtraction(item)
          );
          this.localStorage.setItem('courses', JSON.stringify(currentData));
          return currentData;
        }),
        finalize(() => this.loadingService.hideLoading())
      );
  }

  //create a course
  public createCourse(course: Course): Observable<any> {
    this.loadingService.showLoading();
    return this.http.post(`${this.basePath}/courses`, course).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  // update a course
  public updateItem(course: Course): Observable<any> {
    this.loadingService.showLoading();
    return this.http
      .patch(`${this.basePath}/courses/${course.id}`, course)
      .pipe(
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  public getItemById(id: number): Observable<any> {
    return this.http
      .get<CourseApi[]>(`${this.basePath}/courses/posts/${id}`)
      .pipe(
        map((data) => {
          const course = data.map((item: CourseApi) => dataApiExtraction(item));
          this.transferState.set(COURSE_DATA_KEY, course);
          return course;
        })
      );
  }

  public removeItem(id: number): Observable<any> {
    this.loadingService.showLoading();
    return this.http
      .delete(`${this.basePath}/courses/${id}`)
      .pipe(finalize(() => this.loadingService.hideLoading()));
  }

  public search(text: string): Observable<any> {
    let params = new HttpParams().set('textFragment', text);

    return this.http
      .get(`${this.basePath}/courses`, { params })
      .pipe(
        map((courses) =>
          Object.values(courses).map((item: CourseApi) =>
            dataApiExtraction(item)
          )
        )
      );
  }

  public getAuthors(): Observable<any> {
    return this.http
      .get(`${this.basePath}/authors`)
      .pipe(map((authors) => authors));
  }

  public searchAuthors(text: string): Observable<any> {
    let params = new HttpParams().set('textFragment', text);

    return this.http
      .get(`${this.basePath}/authors`, { params })
      .pipe(map((authors) => authors));
  }
}
