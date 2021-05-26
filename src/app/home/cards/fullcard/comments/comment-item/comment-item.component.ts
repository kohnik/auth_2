import { Component, Input } from '@angular/core';
import { SwithThemeService } from '../../../../../core/services/switchTheme/swith-theme.service';
import {DataOfCard, DataOfComment} from '../../../../../shared/interface';
import { QuestionService } from '../../../../../core/services/question.service';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {
  constructor(
    public themeService: SwithThemeService,
    public dataService: QuestionService,
    public authService: AuthService
  ) {}
  @Input() dataComment!: DataOfComment;
  @Input() item!: DataOfCard;
  approveComment(): void {
    this.item.isAnsweredQuestion = true;
    this.dataComment.isCorrectAnswer = true;
    this.dataService
      .approveComment(
        this.item.id,
        this.dataComment.idComment,
        this.item,
        this.dataComment
      )
      .subscribe(
        (data) => {},
        (rez) => alert(rez)
      );
  }
}
