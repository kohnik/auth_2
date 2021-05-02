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
  typeFilteringByDate: string[] = [
    'last day',
    'last week',
    'last month',
    'all time',
  ];
  constructor(
    public authService: FirebaseService,
    public themeService: SwithThemeService,
    public viewCardscesvice: SwitchViewCardsService,
    public filterService: FiltersCardsService,
    public addItemService: QuestionService,
    public dataService: FireDatabaseService
  ) {}
  public isCollapsed = true;
  public isCollapsedSort = true;
  public isCollapsedFilter = true;
  ngOnInit(): void {}
  filter(): void {
    this.filterService.filteringByDate = this.filterForm.value.dateCheck;
    this.filterService.filterCards(this.filterForm.value.completdeCheck);
  }
  sortCardsAscending(): void {
    this.dataService.statusSort = false;
  }
  sortCardsDescending(): void {
    this.dataService.statusSort = true;
  }
}
