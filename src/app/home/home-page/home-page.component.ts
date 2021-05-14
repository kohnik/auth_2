import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {

  constructor(
    public authService: FirebaseService,
  ) {}

  ngDestroy()
  {
    this.authService.currentUser.email = '';
  }
}
