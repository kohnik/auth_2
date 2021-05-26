import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionService } from '../../../../../core/services/question.service';
import { SwithThemeService } from '../../../../../core/services/switchTheme/swith-theme.service';
import { createDateCreation } from '../../../../../shared/constants';
import { AuthService } from '../../../../../core/services/auth.service';
import { DataOfCard } from '../../../../../shared/interface';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent {
  @Output() closeToCreate = new EventEmitter();
  @Input() item!: DataOfCard;
  constructor(
    public dataService: QuestionService,
    public themeService: SwithThemeService,
    public authService: AuthService
  ) {

  }
  closeForCreateComment(): void {
    this.closeToCreate.emit();
  }

  addAnswer(textAnswer: string): void {
    const objForSendNewComment = {
      textComment: `${textAnswer}`,
      dateCreateComment: createDateCreation(),
      authorComment: `${this.authService.currentUser.email}`,
      isCorrectAnswer: false,
      idComment: '',
    };

    this.item.comments = [
      {
        textComment: `${textAnswer}`,
        dateCreateComment: createDateCreation(),
        authorComment: `${this.authService.currentUser.email}`,
        isCorrectAnswer: false,
        idComment: '',
      },
      ...this.item.comments,
    ];

    this.dataService
      .addComment(this.item.id, objForSendNewComment)
      .subscribe(
        (data) => {},
        (rez) => {
          alert(`${rez.message}`);
        }
      );
    this.closeForCreateComment();
  }
}
