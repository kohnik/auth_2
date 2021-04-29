import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';
import { QuestionService } from '../question/question.service';

@Injectable({
  providedIn: 'root',
})
export class FiltersCardsService {
  filteringByDate: string | undefined;
  constructor(
    public dataservice: FireDatabaseService,
    public addItemService: QuestionService
  ) {}
  filterCards(completed: any): void {
    this.filtersByCompleted(completed);
  }
  filtersByCompleted(completed: any): void {
    if (completed === '') {
      if (completed) {
        console.log(this.dataservice.items);
        const filteredArray = this.dataservice.itemsSave.filter((item) => {
          // @ts-ignore
          return item.completed === true;
        });

        this.filtersByTags(filteredArray);
      } else {
        const filteredArray = this.dataservice.itemsSave.filter((item) => {
          // @ts-ignore
          return item.completed !== true;
        });
        console.log(filteredArray);
        this.filtersByTags(filteredArray);
      }
    } else {
      const filteredArray = JSON.parse(JSON.stringify(this.dataservice.items));
      this.filtersByTags(filteredArray);
    }
  }
  filtersByTags(filteredArray: object[]) {
    let i: number;
    const checkBoxListForFilter: string[] = [];
    let filteredCheckBox: string[] = [];
    for (i = 0; i < this.addItemService.checkboxList.length; i++) {
      if (this.addItemService.checkboxList[i].isselected === true) {
        checkBoxListForFilter.push(
          `${this.addItemService.checkboxList[i].name}`
        );
      }
    }
    if(checkBoxListForFilter.length>0)
    {
      filteredArray = filteredArray.filter((item: any) => {
        filteredCheckBox = [];
        item.tag.map((tag: any) => {
          if (checkBoxListForFilter.indexOf(tag) > -1) {
            filteredCheckBox.push(tag);
          }
        });
        if (filteredCheckBox.length > 0) {
          return item;
        }
      });
      this.filteredByDate(filteredArray);
    }
    else {
      this.filteredByDate(filteredArray);
    }
  }
  filteredByDate(filteredArray: object[]): void {
    const date = new Date();
    const milSecInDay = 86400000;
    const milSecInWeek = 604800000;
    const milSecInMonth = 2592000000;
    if (this.filteringByDate === 'last day') {
      filteredArray = filteredArray.filter((item: any) => {
        console.log(date.getTime() - item.date);
        // @ts-ignore
        if (date.getTime() - item.date <= milSecInDay) {
          return item;
        }
      });
    }
    if (this.filteringByDate === 'last week') {
      filteredArray = filteredArray.filter((item: any) => {
        console.log(date.getTime() - item.date);
        // @ts-ignore
        if (date.getTime() - item.date <= milSecInWeek) {
          return item;
        }
      });
    }
    if (this.filteringByDate === 'last month') {
      filteredArray = filteredArray.filter((item: any) => {
        console.log(date.getTime() - item.date);
        // @ts-ignore
        if (date.getTime() - item.date <= milSecInMonth) {
          return item;
        }
      });
    }
    this.dataservice.items = filteredArray;
  }
}
