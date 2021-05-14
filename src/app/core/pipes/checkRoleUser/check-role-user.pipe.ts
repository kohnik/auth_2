import { Pipe, PipeTransform } from '@angular/core';
import { DataOfCard, CurrentUser } from '../../../shared/interface';

@Pipe({
  name: 'checkRoleUser',
  pure: false,
})
export class CheckRoleUserPipe implements PipeTransform {
  transform(value: DataOfCard[], role: CurrentUser): DataOfCard[] {
    value = role.admin
      ? value
      : value.filter(
          (item) =>
            item.author === role.email || item.status
        );
    return value;
  }
}
