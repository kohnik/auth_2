import { Component } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent {
  public errorStatus = false;
  public errorMessage = '';
  constructor(
    public authService: FirebaseService,
    public themeService: SwithThemeService
  ) {

  }
  onSignupWithGoogle(): void {
    this.authService.signGoogle().catch((data) => {
      this.errorStatus = true;
      this.errorMessage = data.message;
    });
  }
  onSignupWithFacebook(): void {
    this.authService.signFacebook().catch((data) => {
      this.errorStatus = true;
      this.errorMessage = data.message;
    });
  }
  onSignupWithGitHub(): void {
    this.authService.signGithub().catch((data) => {
      this.errorStatus = true;
      this.errorMessage = data.message;
    });
  }
}
