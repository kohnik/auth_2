import { Component } from '@angular/core';
import { SwithThemeService } from './core/services/switchTheme/swith-theme.service';
import { SwitchViewCardsService } from './core/services/switchViewCards/switch-view-cards.service';
import { FirebaseService } from './core/services/firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'authorization';
  constructor(
    public themeService: SwithThemeService,
    public viewCardsService: SwitchViewCardsService
  ) {
    if (!localStorage.getItem('viewCards')) {
      localStorage.setItem('viewCards', `false`);
      this.viewCardsService.statusViewCards = 'строка';
    } else {
      this.viewCardsService.viewCards = JSON.parse(
        localStorage.getItem('viewCards') as string
      );
      this.viewCardsService.viewCards
        ? (this.viewCardsService.statusViewCards = 'строка')
        : (this.viewCardsService.statusViewCards = 'блок');
    }
    !localStorage.getItem('color')
      ? localStorage.setItem('color', `white`)
      : (this.themeService.color = localStorage.getItem('color'));
  }
}
