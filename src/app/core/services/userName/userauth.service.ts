import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserauthService {
  userName: any;
  constructor() {}
  getname() {
    this.userName = localStorage.getItem('user');
    return (this.userName = JSON.parse(this.userName).email);
  }
}
