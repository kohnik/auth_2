import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { QuestionService } from '../../../core/services/question.service';
import { switchMap } from 'rxjs/operators';
import { SwithThemeService } from '../../../core/services/switchTheme/swith-theme.service';
import { DataOfCard } from '../../../shared/interface';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-fullcard',
  templateUrl: './fullcard.component.html',
  styleUrls: ['./fullcard.component.scss'],
})
export class FullcardComponent implements OnInit {
  public item!: DataOfCard;
  public error!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dataService: QuestionService,
    public themeService: SwithThemeService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.dataService.getCard(params.id);
      })).subscribe((item: DataOfCard) => {
      this.item = item;
    }, error => {
      this.error = error.message;
    });
  }

  deleteQuestion(): void {
    this.dataService.deleteQuestion(this.item.id).subscribe(
      (data) => this.router.navigate(['question']),
      (err) => console.log(err)
    );
  }
  approveQuestion(): void {
    this.item.isModeration = true;
    this.dataService.approveQuestion(this.item.id, this.item).subscribe(
      (data) => this.router.navigate(['question']),
      (err) => console.log(err)
    );
  }
}
