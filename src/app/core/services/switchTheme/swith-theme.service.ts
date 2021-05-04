import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwithThemeService {
  public color!: string;
  public nameTheme: BehaviorSubject<string> = new BehaviorSubject<string>(
    'white'
  );
  constructor() {}

  changeTheme(color: string) {
    this.nameTheme.next(`${color}`);
    this.nameTheme.subscribe((data) => (this.color = data));
    // localStorage.setItem('colorTheme', `${!this.colorTheme}`);
    // this.colorTheme = !this.colorTheme;
    // if(this.colorTheme)
    // {
    //   this.statusColorTheme = 'темная';
    // }
    // else {
    //   this.statusColorTheme = 'светлая';
    // }
  }

  checkStatusTheme() {
    // if (!localStorage.getItem('colorTheme')) {
    //   localStorage.setItem('colorTheme', `false`);
    //   this.statusColorTheme = 'темная';
    // } else {
    //   this.colorTheme = JSON.parse(
    //     localStorage.getItem('colorTheme') as string
    //   );
    //   if(this.colorTheme)
    //   {
    //     this.statusColorTheme = 'темная';
    //   }
    //   else {
    //     this.statusColorTheme = 'светлая';
    //   }
    // }
  }
}
