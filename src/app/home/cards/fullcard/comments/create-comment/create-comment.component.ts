import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FireDatabaseService } from '../../../../../core/services/fire-database.service';
import { QuestionService } from '../../../../../core/services/question/question.service';
import { SwithThemeService } from '../../../../../core/services/switchTheme/swith-theme.service';
import { createDateCreation, getName } from '../../../../../shared/constants';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent {
  @Output() closeToCreate = new EventEmitter();
  constructor(
    public dataService: FireDatabaseService,
    public questionService: QuestionService,
    public themeService: SwithThemeService
  ) {}
  closeForCreateComment(): void {
    this.closeToCreate.emit();
  }

  addAnswer(textAnswer: string): void {
    const objForSendNewComment = {
      textComment: `${textAnswer}`,
      dateCreateComment: `${createDateCreation()}`,
      authorComment: `${getName()}`,
    };

    this.dataService.item.comments = [
      {
        textComment: `${textAnswer}`,
        dateCreateComment: `${createDateCreation()}`,
        authorComment: `${getName()}`,
      },
      ...this.dataService.item.comments,
    ];

    this.dataService.addComment(objForSendNewComment).subscribe();
    this.closeForCreateComment();
  }
}
