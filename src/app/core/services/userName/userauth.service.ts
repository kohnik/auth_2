import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserauthService {
  userName: string | undefined;
  constructor() {}
  getname(): void{
    this.userName = `${localStorage.getItem('user')}`;
    return (this.userName = JSON.parse(this.userName).email);
  }
}
