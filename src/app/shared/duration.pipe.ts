import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(durationMin: number) {
    if (durationMin < 60) {
      return `${durationMin}min`;
    }
    return this.getTimeFromMins(durationMin);
  }

  private getTimeFromMins(mins: number): string {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + ' h' + ' ' + minutes + ' min';
  }
}
