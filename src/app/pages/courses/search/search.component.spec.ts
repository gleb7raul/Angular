import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSearch once clicked on icon', () => {
    const spy = spyOn(component, 'onSearch');

    fixture.debugElement
      .query(By.css('#icon-btn'))
      .triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit onSearchTextChanged once typed', () => {
    const spy = spyOn(component, 'onSearchTextChanged');

    fixture.debugElement
      .query(By.css('#search'))
      .triggerEventHandler('input', null);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
