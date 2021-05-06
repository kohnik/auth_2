import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { patternForEmail, patternForPassword } from '../../shared/constants';
@Component({
  selector: 'app-auth-card-signin',
  templateUrl: './auth-card-signin.component.html',
  styleUrls: ['./auth-card-signin.component.scss'],
})
export class AuthCardSigninComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    userPassword: new FormControl(),
    userEmail: new FormControl(),
  });
  authEror = '';
  mistakeValidEmail = false;
  mistakeValidPass = false;
  constructor(public AuthService: FirebaseService, private router: Router) {}
  onSignip(): void {
    if (
      patternForEmail.test(this.myForm.value.userEmail) &&
      patternForPassword.test(this.myForm.value.userPassword)
    ) {
      this.AuthService.signin(
        this.myForm.value.userEmail,
        this.myForm.value.userPassword
      ).catch((error) => {
        this.authEror = error.message;
      });
      if (!this.AuthService.isLoggedIn) {
        if (!patternForEmail.test(this.myForm.value.userEmail)) {
          this.mistakeValidEmail = true;
        }
        if (!patternForPassword.test(this.myForm.value.userPassword)) {
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
