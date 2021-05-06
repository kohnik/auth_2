import { Pipe, PipeTransform } from '@angular/core';
import { DataOfCard } from '../../../shared/interface';

@Pipe({
  name: 'sortPipe',
})
export class SortPipePipe implements PipeTransform {
  transform(value: DataOfCard[], isASC: boolean): DataOfCard[] {
    if (isASC === undefined) {
      return value;
    }

    if (!isASC) {
      return value.sort((a: DataOfCard, b: DataOfCard) =>
        a.date < b.date ? -1 : 1
      );
    }
    return value.sort((a: DataOfCard, b: DataOfCard) =>
      a.date > b.date ? -1 : 1
    );
  }
}
