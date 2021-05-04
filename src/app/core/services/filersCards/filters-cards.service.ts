import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';
import { QuestionService } from '../question/question.service';
import { DataOfCard, FilterSettings } from '../../../shared/interface';
import { BehaviorSubject } from 'rxjs';

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

  filterCards(completed: any): void {
    let i: number;
    this.checkBoxListForFilter = [];
    for (i = 0; i < this.addItemService.checkboxList.length; i++) {
      if (this.addItemService.checkboxList[i].isselected === true) {
        this.checkBoxListForFilter.push(
          `${this.addItemService.checkboxList[i].name}`
        );
      }
    }
    console.log(this.filteringByDate);
    this.filterSettings = {
      completed: `${completed}`,
      filteringByDate: this.filteringByDate,
      checkBox: this.checkBoxListForFilter,
    };
  }
}
