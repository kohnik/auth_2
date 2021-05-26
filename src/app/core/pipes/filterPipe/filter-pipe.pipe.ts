import { Pipe, PipeTransform } from '@angular/core';
import { DataOfCard, FilterSettings } from '../../../shared/interface';
import { milSecInDay } from '../../../shared/constants';
import { AuthService } from '../../services/auth.service';

@Pipe({
  name: 'filterPipe',
  pure: false,
})
export class FilterPipePipe implements PipeTransform {
  filteredArray: DataOfCard[] = [];
  date = new Date();
  constructor(public authService: AuthService) {}
  transform(value: DataOfCard[], args: FilterSettings): DataOfCard[] {
    if (args.completed === 'true') {
      value = value.filter((item: DataOfCard) => item.isAnsweredQuestion);
    } else if (args.completed === 'false') {
      value = value.filter((item: DataOfCard) => !item.isAnsweredQuestion);
    }
    if (args.checkBox.length > 0) {
      value = value.filter((item: DataOfCard) => {
        return item.tag.filter((tag: string) => args.checkBox.includes(tag))
          .length;
      });
    }
    value = value.filter((item: DataOfCard) => {
      return (
        this.date.getTime() - item.date <= milSecInDay * args.filteringByDate
      );
    });

    if (this.authService.currentUser.isAdmin) {
      value = args.onModeration
        ? value.filter((item: DataOfCard) => !item.isModeration)
        : value;
    }

    value = args.myQuestion
      ? value.filter((item: DataOfCard) => item.author === this.authService.currentUser.email)
      : value;
    return value;
  }
}
