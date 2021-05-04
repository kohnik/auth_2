import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../core/services/question/question.service';
import { FireDatabaseService } from '../../../core/services/fire-database.service';
import { switchMap } from 'rxjs/operators';
import { SwithThemeService } from '../../../core/services/switchTheme/swith-theme.service';
import { Observable } from 'rxjs';

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
    public themeService: SwithThemeService,
    private routerNavigate: Router
  ) {}
  ngOnInit(): void {

    this.route.paramMap
      .pipe(switchMap((params) => params.getAll('id')))
      .subscribe((id) => {
        localStorage.setItem('lastFullCardId', `${id}`);
        this.dataService.currentCommentId = id;
        this.getItemData(id);
      });
  }

  ngOnDestroy() {
    Object.keys(this.dataService.item).forEach((key) => {
      if (this.dataService.item.hasOwnProperty(key)) {
        // @ts-ignore
        delete this.dataService.item[key];
      }
    });
  }

  getItemData(id: string): void {
    this.dataService.getCard(id).subscribe((data: any) => {
      if (data !== null) {
        this.dataService.currentCardId = id;
        this.dataService.item = data;
        this.dataService.itemForEdit = JSON.parse(
          JSON.stringify(this.dataService.item)
        );
        console.log(this.dataService.itemForEdit);
        if (this.dataService.item.comments) {
          this.dataService.item.comments = Object.keys(
            this.dataService.item.comments
          ).map((key: any) => {
            return this.dataService.item.comments[key];
          });
        }
      }
    });
  }
  routerNavigation(): void {
    localStorage.removeItem('lastFullCardId');
    this.routerNavigate.navigate(['question']);
  }
}
