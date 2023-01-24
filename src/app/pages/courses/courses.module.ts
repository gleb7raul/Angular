import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { CoursesService } from './courses.service';

import { CoursesComponent } from './courses.component';
import { SearchComponent } from './search/search.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { CourseComponent } from './course/course.component';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';
import { DateInputComponent } from './add-edit-course/date-input/date-input.component';
import { DurationInputComponent } from './add-edit-course/duration-input/duration-input.component';

import { HighlightDirective } from '../../custom-directives/highlight.directive';

import { OrderBy } from '../../custom-pipes/orderBy.pipe';
import { FilterPipe } from '../../custom-pipes/filter.pipe';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coursesReducer } from './+state/courses.reducers';
import { CoursesEffects } from './+state/courses.effects';
import { AuthorsInputComponent } from './add-edit-course/authors-input/authors-input.component';

@NgModule({
  declarations: [
    SearchComponent,
    AddButtonComponent,
    LoadMoreComponent,
    CourseComponent,
    CoursesComponent,
    AddEditCourseComponent,
    DateInputComponent,
    DurationInputComponent,
    HighlightDirective,
    OrderBy,
    FilterPipe,
    AuthorsInputComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('courses', coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
  ],
  exports: [
    SearchComponent,
    AddButtonComponent,
    LoadMoreComponent,
    CourseComponent,
    CoursesComponent,
    AddEditCourseComponent,
    DateInputComponent,
    DurationInputComponent,
    HighlightDirective,
    OrderBy,
    FilterPipe,
    SharedModule,
    TranslateModule,
  ],
  providers: [CoursesService],
  bootstrap: [CoursesComponent],
})
export class CoursesModule {}
