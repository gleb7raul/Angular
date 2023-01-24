import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreComponent } from './load-more.component';
import { By } from '@angular/platform-browser';

describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent;
  let fixture: ComponentFixture<LoadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadMoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onLoad once clicked', () => {
    const spy = spyOn(component, 'onLoad');

    fixture.debugElement
      .query(By.css('#onload'))
      .triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
