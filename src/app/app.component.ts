import { Component, Input, OnInit } from '@angular/core';
import { SwithThemeService } from './core/services/switchTheme/swith-theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'authorization';

  constructor(public themeService: SwithThemeService) {}
}
