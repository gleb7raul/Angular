import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain footer text of app', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.text')
    ).nativeElement;
    expect(currentElement.textContent).toContain(
      'Copyright © Videocourses. All rights reserved'
    );
  });
});
