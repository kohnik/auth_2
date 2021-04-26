import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SwithThemeService {

  colorTheme = false;
  constructor() {}

  changeTheme() {
    this.colorTheme = !this.colorTheme;
  }
}
