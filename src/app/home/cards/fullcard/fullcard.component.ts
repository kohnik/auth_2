import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../core/services/question/question.service';
import { FireDatabaseService } from '../../../core/services/fire-database.service';
import { switchMap } from 'rxjs/operators';
import { SwithThemeService } from '../../../core/services/switchTheme/swith-theme.service';
import { DataOfCard } from '../../../shared/interface';
import { FirebaseService } from '../../../core/services/firebase.service';

@Component({
  selector: 'app-fullcard',
  templateUrl: './fullcard.component.html',
  styleUrls: ['./fullcard.component.scss'],
})
export class FullcardComponent implements OnInit {
  public item: DataOfCard = this.dataService.item;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public questionService: QuestionService,
    public dataService: FireDatabaseService,
    public themeService: SwithThemeService,
    public authService: FirebaseService
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
        this.getItemData(id);
      });
  }

  getItemData(id: string): void {
    this.dataService.getCard(id).subscribe(
      (data) => {
        this.item = data;
      },
      (rez) => {
        alert(rez);
      }
    );
  }
  deleteQuestion(): void {
    this.dataService
      .deleteQuestion(this.item.id)
      .subscribe((data) => this.router.navigate(['question']));
  }
  approveQuestion(): void {
    this.item.status = true;
    console.log(this.item)
    this.dataService
      .approveQuestion(this.item.id, this.item)
      .subscribe((data) => this.router.navigate(['question']));
  }
}
