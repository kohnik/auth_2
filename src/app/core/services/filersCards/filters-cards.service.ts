import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';

@Injectable({
  providedIn: 'root',
})
export class FiltersCardsService {
  constructor(public dataservice: FireDatabaseService) {}

  filterCards(completed: boolean): void {
    this.filtersOnCompleted(completed);
  }
  filtersOnCompleted(completed: boolean): void {
    if (completed) {
      console.log(this.dataservice.items);
      const filteredArray = this.dataservice.itemsSave.filter((item) => {
        // @ts-ignore
        return item.completed === true;
      });
      this.dataservice.items = filteredArray;
    } else {
      const filteredArray = this.dataservice.itemsSave.filter((item) => {
        // @ts-ignore
        return item.completed !== true;
      });
      this.dataservice.items = filteredArray;
    }
  }
}
