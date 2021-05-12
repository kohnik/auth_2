import { Pipe, PipeTransform } from '@angular/core';
import { DataOfCard, FilterSettings } from '../../../shared/interface';
import { milSecInDay } from '../../../shared/constants';

@Pipe({
  name: 'filterPipe',
  pure: false,
})
export class FilterPipePipe implements PipeTransform {
  filteredArray: DataOfCard[] = [];
  date = new Date();
  transform(value: DataOfCard[], args: FilterSettings): DataOfCard[] {
    if (args.completed === 'true') {
      value = value.filter((item: DataOfCard) => item.completed);
    } else if (args.completed === 'false') {
      value = value.filter((item: DataOfCard) => !item.completed);
    }
    if (args.checkBox.length > 0) {
      value = value.filter((item: DataOfCard) => {

        return item.tag.filter(
          (tag: string) => args.checkBox.includes(tag)
        ).length;
      });
    }
    value = value.filter((item: DataOfCard) => {
      return (
        this.date.getTime() - item.date <= milSecInDay * args.filteringByDate
      );
    });

    return value;
  }
}
