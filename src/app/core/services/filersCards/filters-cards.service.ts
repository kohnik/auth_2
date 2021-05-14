import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';
import {
  CheckBox,
  DataOfCard,
  FilterSettings,
} from '../../../shared/interface';
import { createSuccessfulCheckBoxList } from '../../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class FiltersCardsService {
  statusSort!: boolean;
  filteringByDate!: number;
  checkBoxListForFilter: string[] = [];
  filterSettings: FilterSettings = {
    completed: 'all',
    filteringByDate: 100000,
    checkBox: this.checkBoxListForFilter,
    onModeration: false,
    myQuestion: false
  };
  constructor(
    public dataservice: FireDatabaseService,
  ) {}

  filterCards(completed: any, checkBoxList: CheckBox[], onModeration: boolean, myQuestion: boolean): void {
    this.checkBoxListForFilter = createSuccessfulCheckBoxList(
      checkBoxList
    );

    this.filterSettings = {
      completed: `${completed}`,
      filteringByDate: this.filteringByDate,
      checkBox: this.checkBoxListForFilter,
      onModeration,
      myQuestion
    };
  }
}
