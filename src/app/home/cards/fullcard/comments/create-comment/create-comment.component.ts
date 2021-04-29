import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FireDatabaseService } from '../../../../../core/services/fire-database.service';
import { QuestionService } from '../../../../../core/services/question/question.service';
import { UserauthService } from '../../../../../core/services/userName/userauth.service';
import { SwithThemeService } from '../../../../../core/services/switchTheme/swith-theme.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent implements OnInit {
  @Output() closeToCreate = new EventEmitter();
  constructor(
    public dataService: FireDatabaseService,
    public questionService: QuestionService,
    public usernameService: UserauthService,
    public themeService: SwithThemeService
  ) {}

  ngOnInit(): void {}

  closeToCreateComment(): void {
    this.closeToCreate.emit();
  }

  addAnswer(textAnswer: string): void {
    const obs = {
      textComment: `${textAnswer}`,
      dateCreateComment: `${this.questionService.createDateCreation()}`,
      authorComment: `${this.usernameService.getname()}`,
    };

    this.dataService.comments = [
      {
        textComment: `${textAnswer}`,
        dateCreateComment: `${this.questionService.createDateCreation()}`,
        authorComment: `${this.usernameService.getname()}`,
      },
      ...this.dataService.comments,
    ];

    this.dataService.addComment(obs);
    this.closeToCreateComment();
  }
}
