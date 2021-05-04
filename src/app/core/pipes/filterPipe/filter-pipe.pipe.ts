import { Pipe, PipeTransform } from '@angular/core';
import { DataOfCard, FilterSettings } from '../../../shared/interface';
import { FireDatabaseService } from '../../services/fire-database.service';
import { QuestionService } from '../../services/question/question.service';
import { milSecInDay } from '../../../shared/constants';

@Pipe({
  name: 'filterPipe',
  pure: false,
})
export class FilterPipePipe implements PipeTransform {
  constructor(
    public dataservice: FireDatabaseService,
    public addItemService: QuestionService
  ) {}
  filteredArray: DataOfCard[] = [];
  transform(value: any, args: FilterSettings): object {
    if (args.completed === 'all') {
      value = value;
    }
    if (args.completed === 'true') {
      value = value.filter((item: any) => {
        return item.completed === true;
      });
    } else if (args.completed === 'false') {
      value = value.filter((item: any) => {
        return item.completed !== true;
      });
    }

    if (args.checkBox.length > 0) {
      let filteredCheckBox: string[] = [];
      value = value.filter((item: any) => {
        filteredCheckBox = [];
        item.tag.map((tag: any) => {
          if (args.checkBox.indexOf(tag) > -1) {
            filteredCheckBox.push(tag);
          }
        });
        if (filteredCheckBox.length > 0) {
          return item;
        }
      });
    }
    const date = new Date();
    value = value.filter((item: any) => {
      if (date.getTime() - item.date <= milSecInDay * args.filteringByDate) {
        return item;
      }
    });
    return value;
  }
}
