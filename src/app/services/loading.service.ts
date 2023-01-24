import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loading$ = new Subject<boolean>();

  constructor() {}

  public showLoading(): void {
    this.loading$.next(true);
  }

  public hideLoading(): void {
    this.loading$.next(false);
  }
}
