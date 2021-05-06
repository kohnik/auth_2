import { Component } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent {
  constructor(
    public AuthService: FirebaseService,
    public themeService: SwithThemeService
  ) {}
  onSignupWithGoogle(): void {
    this.AuthService.signGoogle().catch((data) => {
      console.log(data);
    });
  }
  onSignupWithFacebook(): void {
    this.AuthService.signFacebook().catch((data) => {
      console.log(data);
    });
  }
  onSignupWithGitHub(): void {
    this.AuthService.signGithub().catch((data) => {
      console.log(data);
    });
  }
}
