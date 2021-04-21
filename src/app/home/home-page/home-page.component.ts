import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  name: any;

  constructor(
    public authService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('user');
    this.name = JSON.parse(this.name).email;

  }










}
