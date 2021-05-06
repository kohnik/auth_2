import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';
import { QuestionService } from '../question/question.service';
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
  filteringByDate!: number;
  filteredArray: DataOfCard[] = [];
  checkBoxListForFilter: string[] = [];
  filterSettings: FilterSettings = {
    completed: 'all',
    filteringByDate: 100000,
    checkBox: this.checkBoxListForFilter,
  };
  constructor(
    public dataservice: FireDatabaseService,
    public addItemService: QuestionService
  ) {}

  filterCards(completed: any, checkBoxList: CheckBox[]): void {
    this.checkBoxListForFilter = createSuccessfulCheckBoxList(
      checkBoxList
    );
    console.log(this.checkBoxListForFilter);
    this.filterSettings = {
      completed: `${completed}`,
      filteringByDate: this.filteringByDate,
      checkBox: this.checkBoxListForFilter,
    };
  }
}
