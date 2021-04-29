import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SwithThemeService {
  colorTheme = false;
  statusColorTheme: string | undefined;
  constructor() {}

  changeTheme() {
    console.log(this.colorTheme);
    localStorage.setItem('colorTheme', `${!this.colorTheme}`);
    this.colorTheme = !this.colorTheme;
    if(this.colorTheme)
    {
      this.statusColorTheme = 'темная';
    }
    else {
      this.statusColorTheme = 'светлая';
    }
  }

  checkStatusTheme() {
    if (!localStorage.getItem('colorTheme')) {
      console.log(1);
      localStorage.setItem('colorTheme', `false`);
      this.statusColorTheme = 'темная';
    } else {
      this.colorTheme = JSON.parse(
        localStorage.getItem('colorTheme') as string
      );
      if(this.colorTheme)
      {
        this.statusColorTheme = 'темная';
      }
      else {
        this.statusColorTheme = 'светлая';
      }
    }
  }
}
