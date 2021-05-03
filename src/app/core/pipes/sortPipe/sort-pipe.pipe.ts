import { Pipe, PipeTransform } from '@angular/core';
import { DataOfCard } from '../../../shared/interface';

@Pipe({
  name: 'sortPipe',

})
export class SortPipePipe implements PipeTransform {
  transform(value: any, args: boolean): void {
    if (args === undefined) {
      return value;
    }
    if (!args) {
      value.sort((a: DataOfCard, b: DataOfCard) => {
        return a.date < b.date ? -1 : 1;
      });
      return value;
    } else {
      value.sort((a: DataOfCard, b: DataOfCard) => (a.date > b.date ? -1 : 1));
      return value;
    }
  }
}
