import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../core/services/question/question.service';
import { FireDatabaseService } from '../../../core/services/fire-database.service';
import { switchMap } from 'rxjs/operators';
import { SwithThemeService } from '../../../core/services/switchTheme/swith-theme.service';

@Component({
  selector: 'app-fullcard',
  templateUrl: './fullcard.component.html',
  styleUrls: ['./fullcard.component.scss'],
})
export class FullcardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public questionService: QuestionService,
    public dataService: FireDatabaseService,
    public themeService: SwithThemeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params) => params.getAll('id')))
      .subscribe((id) => {
        this.dataService.currentCommentId = id;
        this.getItemData(id);
      });
  }

  ngOnDestroy(): void {
    this.dataService.item = [];
    console.log(this.dataService.item);
  }

  async getItemData(id: string) {
    await this.dataService.getCard(id);
  }
}
