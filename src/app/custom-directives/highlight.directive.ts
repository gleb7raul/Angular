import { ElementRef, Directive, Input } from '@angular/core';

@Directive({
  selector: '[courseHighlight]',
})
export class HighlightDirective {
  @Input('courseHighlight') public creatDate: string | undefined;

  constructor(private element: ElementRef) {}

  public ngOnChanges(): void {
    if (!this.creatDate) return;
    const fourteenDayMilliseconds = 24 * 60 * 60 * 1000 * 14;
    const currentDate = new Date();

    const creatDate = new Date(this.creatDate);

    const creatDateTime = creatDate.getTime();
    const creatDateWithoutFourteenDays =
      creatDateTime - fourteenDayMilliseconds;

    const freshCourseRule =
      currentDate > creatDate && creatDateTime > creatDateWithoutFourteenDays;

    const upcomingCourseRule = creatDate > currentDate;

    if (freshCourseRule) {
      this.element.nativeElement.style.border = '4px green solid';
    }

    if (upcomingCourseRule) {
      this.element.nativeElement.style.border = '4px blue solid';
    }
  }
}
