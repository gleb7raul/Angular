import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title of current app', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.video-course')
    ).nativeElement;
    expect(currentElement.textContent).toContain('video course');
  });

  it('should contain log in of current app', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.user-actions.logIn')
    ).nativeElement;
    expect(currentElement.textContent).toContain('User login');
  });

  it('should contain log out of current app', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.user-actions.logOut')
    ).nativeElement;
    expect(currentElement.textContent).toContain('Log out');
  });
});
