import { Component, Input, OnInit } from '@angular/core';
import { SwithThemeService } from './core/services/switchTheme/swith-theme.service';
import { SwitchViewCardsService } from './core/services/switchViewCards/switch-view-cards.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'authorization';
  constructor(
    public themeService: SwithThemeService,
    public viewCardsService: SwitchViewCardsService
  ) {}
  ngOnInit(): void {
    this.themeService.checkStatusTheme();
    this.viewCardsService.checkStatusView();
  }
}
