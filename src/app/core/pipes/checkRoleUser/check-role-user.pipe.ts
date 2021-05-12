import { Pipe, PipeTransform } from '@angular/core';
import { DataOfCard, ObjForCheckRole } from '../../../shared/interface';

@Pipe({
  name: 'checkRoleUser',
  pure: false,
})
export class CheckRoleUserPipe implements PipeTransform {
  transform(value: DataOfCard[], role: ObjForCheckRole): DataOfCard[] {
    value = role.admin
      ? value
      : value.filter(
          (item) =>
            item.author === role.currentUserEmail || item.status
        );
    return value;
  }
}
