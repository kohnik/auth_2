import { Component, OnInit } from '@angular/core';
import { FireDatabaseService } from '../../core/services/fire-database.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';
import { SwitchViewCardsService } from '../../core/services/switchViewCards/switch-view-cards.service';
import { FiltersCardsService } from '../../core/services/filersCards/filters-cards.service';
import { observable } from 'rxjs';
import { getCheckboxs } from '../../shared/constants';
import { DataOfCard } from '../../shared/interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  items!: DataOfCard[];
  constructor(
    public dataService: FireDatabaseService,
    private modalService: NgbModal,
    public filterService: FiltersCardsService,
    private router: Router,
    public themeService: SwithThemeService,
    public viewCardsService: SwitchViewCardsService
  ) {}

  ngOnInit(): void {
    this.dataService.getAll().subscribe(
      (data) => {
        console.log(data);
        this.items = data;
      },
      (rez) => {
        console.log(rez);
      }
    );
    getCheckboxs();
  }

  redirectTo(): void {
    this.router.navigate(['newquestion']);
  }
}
