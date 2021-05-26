import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../core/services/question.service';
import { Router } from '@angular/router';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';
import { SwitchViewCardsService } from '../../core/services/switchViewCards/switch-view-cards.service';
import { FiltersCardsService } from '../../core/services/filersCards/filters-cards.service';
import { getCheckboxs } from '../../shared/constants';
import { DataOfCard } from '../../shared/interface';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  items!: DataOfCard[];
  constructor(
    public dataService: QuestionService,
    public filterService: FiltersCardsService,
    private router: Router,
    public themeService: SwithThemeService,
    public viewCardsService: SwitchViewCardsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.dataService.getAll().subscribe(
      (data) => {
        this.items = data;
      },
      (rez) => {
        console.log(rez)
      }
    );
    getCheckboxs();
  }

  redirectTo(): void {
    this.router.navigate(['newquestion']);
  }
}
