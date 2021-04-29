import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';

@Injectable({
  providedIn: 'root',
})
export class SortCardsService {
  constructor(public dadaService: FireDatabaseService) {}

  sortCardsAscending(): void{
    // @ts-ignore
    this.dadaService.items.sort((a, b) => (a.date < b.date ? -1 : 1));
  }
  sortCardsDescending(): void {
    // @ts-ignore
    this.dadaService.items.sort((a, b) => (a.date > b.date ? -1 : 1));
  }
  sortCardsReturn(): void {
    // @ts-ignore
    this.dadaService.items = JSON.parse(JSON.stringify(this.dadaService.itemsSave));
  }
}
