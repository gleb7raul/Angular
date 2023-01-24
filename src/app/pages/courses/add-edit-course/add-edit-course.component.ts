import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Course } from 'src/app/interfaces/course.interface';

import { CoursesService } from '../courses.service';

import * as CoursesActions from '../+state/courses.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss'],
})
export class AddEditCourseComponent implements OnInit {
  public id: number | null | undefined;
  reactiveForm!: FormGroup;

  public newCourse: Course = {
    id: Date.now(),
    topRated: false,
    title: '',
    creationDate: '',
    durationMin: 0,
    description: '',
    authors: [],
  };

  @Output() public path: string = 'New Course';

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private service: CoursesService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.findCourseById();
  }

  public formInit(): void {
    this.reactiveForm = new FormGroup({
      title: new FormControl(this.newCourse.title, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl(this.newCourse.description, [
        Validators.required,
        Validators.maxLength(500),
      ]),
      creationDate: new FormControl(this.newCourse.creationDate, [
        Validators.required,
      ]),
      durationMin: new FormControl(this.newCourse.durationMin, [
        Validators.required,
      ]),
      authors: new FormControl([], [Validators.required]),
    });
  }

  private findCourseById(): void {
    this.id
      ? this.service.getItemById(this.id).subscribe((array) => {
          this.newCourse = array[0];
          this.formInit();
        })
      : this.formInit();
  }

  public onFormSubmit(): void {
    this.coursePrepare();
    this.save();
  }

  get title() {
    return this.reactiveForm.get('title')!;
  }

  get description() {
    return this.reactiveForm.get('description')!;
  }

  public isInvalid(formControl: {
    invalid: boolean;
    dirty: boolean;
    touched: boolean;
  }): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  private coursePrepare(): void {
    const { title, durationMin, description, creationDate, authors } =
      this.reactiveForm.value;
    this.newCourse = {
      ...this.newCourse,
      title,
      durationMin,
      description,
      creationDate,
      authors,
    };
  }

  //save new or edit course
  public save(): void {
    if (!this.id) {
      this.store.dispatch(
        CoursesActions.createCourse({ course: this.newCourse })
      );
    } else {
      this.store.dispatch(
        CoursesActions.createCourse({ course: this.newCourse })
      );
    }
  }

  private redirectToHomePage(): void {
    this.router.navigate(['/courses']);
  }

  public cancel(): void {
    this.redirectToHomePage();
  }
}
