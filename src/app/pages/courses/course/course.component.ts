import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

import { Course } from 'src/app/interfaces/course.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // changes detection was done in 5 MR
})
export class CourseComponent implements OnInit {
  @Input() course!: Course | undefined;

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  navigateToEditPage(id: number): void {
    this.router.navigate(['/courses/', id], {
      state: {
        data: this.course,
      },
    });
  }
}
