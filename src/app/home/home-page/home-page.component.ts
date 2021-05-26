import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {

  constructor(
    public authService: AuthService,
  ) {}

  ngDestroy()
  {
    this.authService.currentUser.email = '';
  }
}
