import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

import { Authorization } from 'src/app/interfaces/authorization.interface';
import { UserEntityApi } from 'src/app/interfaces/userApi.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string = '';
  private basePath: string = 'http://localhost:3004';
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.token = '';
  }

  public login(auth: Authorization): Observable<any> {
    return this.http
      .post(`${this.basePath}/auth/login`, auth).pipe(map((data: any) => {
        this.token = data.token;
        this.isAuthenticated$.next(true);
        return data.token;
      }));
  }
 
  public logout(): void {
    this.token = '';
    this.isAuthenticated$.next(false);
  }

  public getUserInfo(): Observable<UserEntityApi> {
    return this.http.post<UserEntityApi>(`${this.basePath}/auth/userinfo`, {
      token: this.token,
    });
  }
}
