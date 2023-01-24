import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { By } from '@angular/platform-browser';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain root of breadcrumbs in application', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.breadcrumbs')
    ).nativeElement;
    expect(currentElement.textContent).toContain('Courses');
  });
});
