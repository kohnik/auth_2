import { Component } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent {
  constructor(public AuthService: FirebaseService, private router: Router) {}
  async onSignupWithGoogle() {
    await this.AuthService.signGoogle();
    if (this.AuthService.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }
  async onSignupWithFacebook() {
    await this.AuthService.signFacebook()
      .catch((error) => {
        console.log(error);
      });
    if (this.AuthService.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }
  async onSignupWithGitHub() {
    await this.AuthService.signGithub();
    if (this.AuthService.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }
}
