import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-auth-card-signin',
  templateUrl: './auth-card-signin.component.html',
  styleUrls: ['./auth-card-signin.component.scss'],
})
export class AuthCardSigninComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    'userPassword': new FormControl(),
    'userEmail': new FormControl()
  });
  patternForEmail = /[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;
  patternForPassword = /[0-9a-zA-Z]{6,}/;
  mistakeValidEmail = false;
  mistakeValidPass = false;
  constructor(public AuthService: FirebaseService, private router: Router) {}
  async onSignip() {

    if (
      this.patternForEmail.test(this.myForm.value.userEmail) &&
      this.patternForPassword.test(this.myForm.value.userPassword)
    ) {

      await this.AuthService.signin(this.myForm.value.userEmail, this.myForm.value.userPassword);

      if (this.AuthService.isLoggedIn) {
        this.router.navigate(['home']);
      }
    } else {
      console.log(this.myForm.value);

      if (!this.patternForEmail.test(this.myForm.value.userEmail)) {
        this.mistakeValidEmail = true;
      }
      if (!this.patternForPassword.test(this.myForm.value.userPassword)) {
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

  ngOnInit(): void {

  }
  // initForm(){
  //   this.myFirstReactiveForm = this.fb.group({
  //     name: ['Иван'],
  //     email: [null]
  //   });
  // }
}
