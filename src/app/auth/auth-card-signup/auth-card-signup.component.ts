import { Component, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-card-signup',
  templateUrl: './auth-card-signup.component.html',
  styleUrls: ['./auth-card-signup.component.scss'],
})
export class AuthCardSignupComponent implements OnInit {
  patternForEmail = /[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;
  patternForPassword = /[0-9a-zA-Z]{6,}/;
  mistakeValidEmail = false;
  mistakeValidPass = false;

  constructor(public AuthService: FirebaseService, private router: Router) {}
  async onSignup(email: string, password: string) {
    if (
      this.patternForEmail.test(email) &&
      this.patternForPassword.test(password)
    ) {
      await this.AuthService.signup(email, password);
      if (this.AuthService.isLoggedIn) {
        this.router.navigate(['home']);
      }
    } else {
      if (!this.patternForEmail.test(email)) {
        this.mistakeValidEmail = true;
      }
      if (!this.patternForPassword.test(password)) {
        this.mistakeValidPass = true;
      }
    }
  }
  chooseValueMistakeEmail() {
    this.mistakeValidEmail = false;
  }
  chooseValueMistakePass() {
    this.mistakeValidPass = false;
  }
  ngOnInit(): void {}
}
