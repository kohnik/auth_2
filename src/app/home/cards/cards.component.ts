import { Component, OnInit } from '@angular/core';
import { FireDatabaseService } from '../../core/services/fire-database.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '../../core/services/question/question.service';
import { Router } from '@angular/router';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';
import { SwitchViewCardsService } from '../../core/services/switchViewCards/switch-view-cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  constructor(
    public dataService: FireDatabaseService,
    private modalService: NgbModal,
    public addItem: QuestionService,
    private router: Router,
    public themeService: SwithThemeService,
    public viewCardsService: SwitchViewCardsService
  ) {}

  ngOnInit(): void {
    this.dataService.getAll().subscribe((data) => {
      let countId = 0;
      if (data !== null) {
        Object.values(data).map((item) => {
          item.id = `${Object.keys(data)[countId]}`;
          this.dataService.items.push(item);
          this.dataService.itemsSave.push(item);
          countId++;
        });
      }
    });
    this.addItem.getCheckboxs();
  }
  // lol()
  // {
  //   console.log(1);
  // }
  redirectTo(): void {
    this.router.navigate(['newquestion']);
  }
}
