import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';
import { SwitchViewCardsService } from '../../core/services/switchViewCards/switch-view-cards.service';
import { FiltersCardsService } from '../../core/services/filersCards/filters-cards.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  getCheckboxs,
  onChange,
  typeFilteringByDate,
  typeFilteringQuestionsForModeration,
  typeFilteringByQuestionAuthor,
  typeFilteringByQuestionsCompleted,
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
    completdeCheck: new FormControl('All'),
    tagCheck: new FormControl(''),
    dateCheck: new FormControl('2000'),
    onModerationCheck: new FormControl(false),
    myQuestionsCheck: new FormControl(false),
  });

  constructor(
    public authService: FirebaseService,
    public themeService: SwithThemeService,
    public viewCardscesvice: SwitchViewCardsService,
    public filterService: FiltersCardsService
  ) {}
  public colorForDisplayAfterRun = `${localStorage.getItem('color')}`;
  public isCollapsed = true;
  public isCollapsedSort = true;
  public isCollapsedFilter = true;
  public typeFilteringByDate = typeFilteringByDate;
  public typeFilteringQuestionsForModeration = typeFilteringQuestionsForModeration;
  public typeFilteringByQuestionAuthor = typeFilteringByQuestionAuthor;
  public typeFilteringByQuestionsCompleted = typeFilteringByQuestionsCompleted;
  public typeTheme = typeTheme;
  public checkBoxList!: CheckBox[];
  ngOnInit(): void {
    this.checkBoxList = getCheckboxs();
  }
  transferDataForOnChange(i: number): void {
    onChange(i, this.checkBoxList);
  }
  filter(): void {
    if (this.filterForm.value.dateCheck === '') {
      this.filterService.filteringByDate = 10000;
    } else {
      this.filterService.filteringByDate = this.filterForm.value.dateCheck;
    }

    this.filterService.filterCards(
      this.filterForm.value.completdeCheck,
      this.checkBoxList,
      this.filterForm.value.onModerationCheck,
      this.filterForm.value.myQuestionsCheck
    );
  }
  sortCardsAscending(): void {
    this.filterService.statusSort = false;
  }
  sortCardsDescending(): void {
    this.filterService.statusSort = true;
  }
}
