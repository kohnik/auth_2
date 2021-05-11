import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../core/services/question/question.service';
import { FireDatabaseService } from '../../../core/services/fire-database.service';
import { switchMap } from 'rxjs/operators';
import { SwithThemeService } from '../../../core/services/switchTheme/swith-theme.service';
import { DataOfCard } from '../../../shared/interface';

@Component({
  selector: 'app-fullcard',
  templateUrl: './fullcard.component.html',
  styleUrls: ['./fullcard.component.scss'],
})
export class FullcardComponent implements OnInit {
  public item!: DataOfCard;
  constructor(
    private route: ActivatedRoute,
    public questionService: QuestionService,
    public dataService: FireDatabaseService,
    public themeService: SwithThemeService
  ) {}
  ngOnInit(): void {
    if (this.item) {
      Object.keys(this.item).forEach((key) => {
        if (this.item.hasOwnProperty(key)) {
          // @ts-ignore
          delete this.item[key];
        }
      });
    }
    this.route.paramMap
      .pipe(switchMap((params) => params.getAll('id')))
      .subscribe((id) => {
        localStorage.setItem('lastFullCardId', `${id}`);
        this.getItemData(id);
      });
  }

  getItemData(id: string): void {
    this.dataService.getCard(id).subscribe(
      (data) => {
        this.item = data;
      },
      (rez) => {
        console.log(rez);
      }
    );
  }
}
