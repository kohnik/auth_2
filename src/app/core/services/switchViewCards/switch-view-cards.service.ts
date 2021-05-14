import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SwitchViewCardsService {
  public viewCards = false;
  public statusViewCards!: string;

  switchViewCards(): void {
    localStorage.setItem('viewCards', `${!this.viewCards}`);
    this.viewCards = !this.viewCards;
    this.viewCards
      ? (this.statusViewCards = 'строка')
      : (this.statusViewCards = 'блок');
  }
}
