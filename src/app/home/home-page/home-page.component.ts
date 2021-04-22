import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { FireDatabaseService } from '../../core/services/fire-database.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  name: any;

  constructor(
    public authService: FirebaseService,
    public dataService: FireDatabaseService
  ) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('user');
    this.name = JSON.parse(this.name).email;
  }
  ngOnDestroy(): void {
    this.dataService.items = [];
  }
}
