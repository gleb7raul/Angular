import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserEntityApi } from 'src/app/interfaces/userApi.interface';

import { AuthService } from '../../services/auth-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userName: Observable<string> | undefined;

  constructor(
    public service: AuthService,
    private readonly router: Router,
    public translate: TranslateService
  ) {
    this.translateInit();
  }

  ngOnInit(): void {
    if (this.service.isAuthenticated$.getValue()) {
      this.setUserInfo();
    }
  }

  public translateInit(): void {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|ru/) ? browserLang : 'en');
  }

  private setUserInfo(): void {
    this.userName = this.service
      .getUserInfo()
      .pipe(
        map((user: UserEntityApi) =>
          user ? user.name.first + ' ' + user.name.last : ''
        )
      );
  }

  public onLogout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
