import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';
import { SwitchViewCardsService } from '../../core/services/switchViewCards/switch-view-cards.service';
import { SortCardsService } from '../../core/services/sortCards/sort-cards.service';
import { FiltersCardsService } from '../../core/services/filersCards/filters-cards.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['./home-settings.component.scss'],
})
export class HomeSettingsComponent implements OnInit {
  filterForm: FormGroup = new FormGroup({
    completdeCheck: new FormControl(''),
  });

  constructor(
    public authService: FirebaseService,
    public themeService: SwithThemeService,
    public viewCardscesvice: SwitchViewCardsService,
    public sortService: SortCardsService,
    public filterService: FiltersCardsService
  ) {}
  public isCollapsed = true;
  public isCollapsedSort = true;
  public isCollapsedFilter = true;
  ngOnInit(): void {}
  filter(): void {
    console.log(this.filterForm.value.completdeCheck)
    this.filterService.filterCards(
      this.filterForm.value.completdeCheck
    );
  }
}
