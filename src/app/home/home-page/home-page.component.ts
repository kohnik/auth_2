import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { FireDatabaseService } from '../../core/services/fire-database.service';
import { getName } from '../../shared/constants';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  name!: string;

  constructor(
    public authService: FirebaseService,
    public dataService: FireDatabaseService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('lastFullCardId');
    this.name = getName();
  }
  ngOnDestroy(): void {
    this.dataService.items = [];
  }
}
