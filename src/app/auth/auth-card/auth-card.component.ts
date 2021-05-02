import { Component } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { Router } from '@angular/router';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent {
  constructor(
    public AuthService: FirebaseService,
    private router: Router,
    public themeService: SwithThemeService
  ) {}
  onSignupWithGoogle(): void {
    this.AuthService.signGoogle();
    if (this.AuthService.isLoggedIn) {
      this.router.navigate(['question']);
    }
  }
  onSignupWithFacebook(): void {
    this.AuthService.signFacebook();
    if (this.AuthService.isLoggedIn) {
      this.router.navigate(['question']);
    }
  }
  onSignupWithGitHub(): void {
    this.AuthService.signGithub();
    if (this.AuthService.isLoggedIn) {
      this.router.navigate(['question']);
    }
  }
}
