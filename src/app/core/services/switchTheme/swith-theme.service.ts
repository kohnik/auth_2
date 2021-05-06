import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwithThemeService {
  public color!: string | null;
  public nameTheme: BehaviorSubject<string> = new BehaviorSubject<string>(
    'white'
  );

  changeTheme(color: string): void {
    this.nameTheme.next(`${color}`);
    this.nameTheme.subscribe((data) => (this.color = data));
    localStorage.setItem('color', `${this.color}`);
  }

  checkStatusTheme(): void {
    !localStorage.getItem('color')
      ? localStorage.setItem('color', `white`)
      : (this.color = localStorage.getItem('color'));
  }
}
