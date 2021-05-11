import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';
import { SwitchViewCardsService } from '../../core/services/switchViewCards/switch-view-cards.service';
import { FiltersCardsService } from '../../core/services/filersCards/filters-cards.service';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { QuestionService } from '../../core/services/question/question.service';
import { FireDatabaseService } from '../../core/services/fire-database.service';
import {
  getCheckboxs,
  onChange,
  typeFilteringByDate,
  typeTheme,
} from '../../shared/constants';
import { CheckBox } from '../../shared/interface';

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['./home-settings.component.scss'],
})
export class HomeSettingsComponent implements OnInit {
  filterForm: FormGroup = new FormGroup({
    completdeCheck: new FormControl(null),
    tagCheck: new FormControl(''),
    dateCheck: new FormControl(''),
  });

  public colorForDisplayAfterRun = `${localStorage.getItem('color')}`;
  constructor(
    public authService: FirebaseService,
    public themeService: SwithThemeService,
    public viewCardscesvice: SwitchViewCardsService,
    public filterService: FiltersCardsService,
    public addItemService: QuestionService,
    public dataService: FireDatabaseService,
  ) {}
  public valueAll = 'all';
  public isCollapsed = true;
  public isCollapsedSort = true;
  public isCollapsedFilter = true;
  public typeFilteringByDate = typeFilteringByDate;
  public typeTheme = typeTheme;
  public checkBoxList!: CheckBox[];
  ngOnInit(): void {
    this.checkBoxList = getCheckboxs();
  }

  transferDataForOnChange(tag: boolean, i: number): void {
    this.checkBoxList = onChange(tag, i, this.checkBoxList);
  }
  filter(): void {
    if (this.filterForm.value.dateCheck === '') {
      this.filterService.filteringByDate = 10000;
    } else {
      this.filterService.filteringByDate = this.filterForm.value.dateCheck;
    }

    this.filterService.filterCards(
      this.filterForm.value.completdeCheck,
      this.checkBoxList
    );
  }
  sortCardsAscending(): void {
    this.filterService.statusSort = false;
  }
  sortCardsDescending(): void {
    this.filterService.statusSort = true;
  }
}
