import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['./home-settings.component.scss'],
})
export class HomeSettingsComponent implements OnInit {
  constructor(
    public authService: FirebaseService,
    public themeService: SwithThemeService
  ) {}
  public isCollapsed = true;
  ngOnInit(): void {}


}
