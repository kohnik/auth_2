import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  name: any;
  constructor(public AuthService: FirebaseService, private router: Router) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('user');
    this.name = JSON.parse(this.name).email;
  }
  logout() {
    this.router.navigate(['']);
    this.AuthService.logout();
  }
}
