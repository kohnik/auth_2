import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';
import { SwitchViewCardsService } from '../../core/services/switchViewCards/switch-view-cards.service';
import { FiltersCardsService } from '../../core/services/filersCards/filters-cards.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../core/services/question/question.service';
import { FireDatabaseService } from '../../core/services/fire-database.service';

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['./home-settings.component.scss'],
})
export class HomeSettingsComponent implements OnInit {
  filterForm: FormGroup = new FormGroup({
    completdeCheck: new FormControl(''),
    tagCheck: new FormControl(''),
    dateCheck: new FormControl(''),
  });
  typeFilteringByDate: object = [
    {
      name: 'last day',
      id: 1,
    },
    {
      name: 'last week',
      id: 7,
    },
    {
      name: 'last month',
      id: 30,
    },
    {
      name: 'all time',
      id: 2000,
    },
  ];
  constructor(
    public authService: FirebaseService,
    public themeService: SwithThemeService,
    public viewCardscesvice: SwitchViewCardsService,
    public filterService: FiltersCardsService,
    public addItemService: QuestionService,
    public dataService: FireDatabaseService
  ) {}
  public valueAll = 'all';
  public isCollapsed = true;
  public isCollapsedSort = true;
  public isCollapsedFilter = true;
  ngOnInit(): void {}
  filter(): void {
    if ((this.filterForm.value.dateCheck = ' ')) {
      this.filterService.filteringByDate = 10000;
    } else {
      this.filterService.filteringByDate = this.filterForm.value.dateCheck;
    }

    this.filterService.filterCards(this.filterForm.value.completdeCheck);
  }
  sortCardsAscending(): void {
    this.dataService.statusSort = false;
  }
  sortCardsDescending(): void {
    this.dataService.statusSort = true;
  }
}
