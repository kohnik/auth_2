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
  checkStatusView(): void {
    if (!localStorage.getItem('viewCards')) {
      localStorage.setItem('viewCards', `false`);
      this.statusViewCards = 'строка';
    } else {
      this.viewCards = JSON.parse(localStorage.getItem('viewCards') as string);
      this.viewCards
        ? (this.statusViewCards = 'строка')
        : (this.statusViewCards = 'блок');
    }
  }
}
