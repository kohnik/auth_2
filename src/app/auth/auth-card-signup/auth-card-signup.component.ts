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
  authEror: string = '';
  constructor(public AuthService: FirebaseService, private router: Router) {}
  onSignup(email: string, password: string) {
    if (
      this.patternForEmail.test(email) &&
      this.patternForPassword.test(password)
    ) {
      this.AuthService.signup(email, password)
        .then((rez: any) => {
          this.AuthService.isLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(rez.user));
        })
        .catch((error) => {
          console.log(error);
          this.authEror = error.message;
        });
      if (this.AuthService.isLoggedIn) {
        this.router.navigate(['question']);
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

  chooseValueMistakeEmail(): void {
    this.mistakeValidEmail = false;
    this.authEror = '';
  }
  chooseValueMistakePass(): void {
    this.mistakeValidPass = false;
    this.authEror = '';
  }
  ngOnInit(): void {}
}
