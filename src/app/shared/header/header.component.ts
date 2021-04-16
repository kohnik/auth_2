import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../core/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  InputLogin = this.AuthService.InputLogin;
  constructor(public AuthService: FirebaseService, private router: Router) {}

  changeLogin() {
    if (this.AuthService.InputLogin) {
      this.AuthService.InputLogin = false;
    } else {
      this.AuthService.InputLogin = true;
    }
  }
  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['']);
    }
  }
}
