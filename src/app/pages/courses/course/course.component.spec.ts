import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Course } from 'src/app/interfaces/course.interface';

import { CourseComponent } from './course.component';
import { By } from '@angular/platform-browser';

const testCourse: Course = {
  id: 0,
  title: 'title',
  creationDate: '01/01/2000',
  durationMin: 'durationMin',
  description: 'description',
};

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    component.course = testCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title of current course', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.title')
    ).nativeElement;
    expect(currentElement.textContent).toContain(testCourse.title);
  });

  it('should contain description of current course', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.descr')
    ).nativeElement;
    expect(currentElement.textContent).toContain(testCourse.description);
  });

  it('should contain duration of current course', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.common-info.durationMin')
    ).nativeElement;
    expect(currentElement.textContent).toContain(testCourse.durationMin);
  });

  it('should contain data of creation of current course', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.common-info.creationDate')
    ).nativeElement;
    expect(currentElement.textContent).toContain(testCourse.creationDate);
  });

  it('should contain edit button of current course', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.edit .text')
    ).nativeElement;
    expect(currentElement.textContent).toContain('Edit');
  });

  it('should contain delete button of current course', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.delete .text')
    ).nativeElement;
    expect(currentElement.textContent).toContain('Delete');
  });
});
