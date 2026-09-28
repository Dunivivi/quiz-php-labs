import { Pipe, PipeTransform } from '@angular/core';

/** Transformă secunde în text: 95 → "1 min 35 s". */
@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return min > 0 ? `${min} min ${sec} s` : `${sec} s`;
  }
}
