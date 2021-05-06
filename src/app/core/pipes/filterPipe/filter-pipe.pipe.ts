import { Pipe, PipeTransform } from '@angular/core';
import { DataOfCard, FilterSettings } from '../../../shared/interface';
import { date, milSecInDay } from '../../../shared/constants';

@Pipe({
  name: 'filterPipe',
  pure: false,
})
export class FilterPipePipe implements PipeTransform {
  filteredArray: DataOfCard[] = [];
  transform(value: DataOfCard[], args: FilterSettings): DataOfCard[] {
    if (args.completed === 'true') {
      value = value.filter((item: DataOfCard) => item.completed);
    } else if (args.completed === 'false') {
      value = value.filter((item: DataOfCard) => !item.completed);
    }
    if (args.checkBox.length > 0) {
      let filteredCheckBox: string[] = [];
      value = value.filter((item: any) => {
        filteredCheckBox = item.tag.filter((tag: string) => args.checkBox.includes(tag));
        if (filteredCheckBox.length > 0) {
          return item;
        }
      });
    }
    value = value.filter((item: DataOfCard) => {
      return date.getTime() - item.date <= milSecInDay * args.filteringByDate;
    });
    return value;
  }
}
