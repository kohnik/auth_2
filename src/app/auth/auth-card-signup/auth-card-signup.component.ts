import { Component, OnInit} from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { patternForEmail, patternForPassword } from '../../shared/constants';

@Component({
  selector: 'app-auth-card-signup',
  templateUrl: './auth-card-signup.component.html',
  styleUrls: ['./auth-card-signup.component.scss'],
})
export class AuthCardSignupComponent implements OnInit{
  mistakeValidEmail = false;
  mistakeValidPass = false;
  authEror = '';
  constructor(public AuthService: FirebaseService) {}
  onSignup(email: string, password: string): void {
    if (patternForEmail.test(email) && patternForPassword.test(password)) {
      this.AuthService.signup(email, password).catch((error) => {
        this.authEror = error.message;
      });

      if (!this.AuthService.isLoggedIn) {
        if (!patternForEmail.test(email)) {
          this.mistakeValidEmail = true;
        }
        if (!patternForPassword.test(password)) {
          this.mistakeValidPass = true;
        }
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
  ngOnInit(): void {
    this.chooseValueMistakeEmail();
    this.chooseValueMistakePass();
  }
}
