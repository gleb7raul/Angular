import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtonComponent } from './add-button.component';
import { By } from '@angular/platform-browser';

describe('AddButtonComponent', () => {
  let component: AddButtonComponent;
  let fixture: ComponentFixture<AddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain add button of courses list', () => {
    const courseDebugElement = fixture.debugElement;
    const currentElement: HTMLElement = courseDebugElement.query(
      By.css('.btn-label')
    ).nativeElement;
    expect(currentElement.textContent).toContain('Add course');
  });
});
