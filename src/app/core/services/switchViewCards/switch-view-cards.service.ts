import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SwitchViewCardsService {
  viewCards = false;
  statusViewCards: string | undefined;
  constructor() {}

  switchViewCards() {

    localStorage.setItem('viewCards', `${!this.viewCards}`);
    this.viewCards = !this.viewCards;
    if(this.viewCards)
    {
      this.statusViewCards = 'строка';
    }
    else {
      this.statusViewCards = 'блок';
    }
  }
  checkStatusView() {
    if (!localStorage.getItem('viewCards')) {
      localStorage.setItem('viewCards', `false`);
      this.statusViewCards = 'строка';
    } else {
      this.viewCards = JSON.parse(
        localStorage.getItem('viewCards') as string
      );
      if(this.viewCards)
      {
        this.statusViewCards = 'строка';
      }
      else {
        this.statusViewCards = 'блок';
      }
    }
  }
}
