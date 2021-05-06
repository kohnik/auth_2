import { Component, OnInit } from '@angular/core';
import { FireDatabaseService } from '../../core/services/fire-database.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '../../core/services/question/question.service';
import { Router } from '@angular/router';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';
import { SwitchViewCardsService } from '../../core/services/switchViewCards/switch-view-cards.service';
import { FiltersCardsService } from '../../core/services/filersCards/filters-cards.service';
import { observable } from 'rxjs';
import {getCheckboxs} from "../../shared/constants";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {

  constructor(
    public dataService: FireDatabaseService,
    private modalService: NgbModal,
    public filterService: FiltersCardsService,
    private router: Router,
    public themeService: SwithThemeService,
    public viewCardsService: SwitchViewCardsService
  ) {}

  ngOnInit(): void {
    this.dataService.getAll().subscribe();
    getCheckboxs();
  }

  redirectTo(): void {
    this.router.navigate(['newquestion']);
  }
}
