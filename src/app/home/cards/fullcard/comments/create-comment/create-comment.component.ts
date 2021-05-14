import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FireDatabaseService } from '../../../../../core/services/fire-database.service';
import { SwithThemeService } from '../../../../../core/services/switchTheme/swith-theme.service';
import { createDateCreation } from '../../../../../shared/constants';
import { FirebaseService } from '../../../../../core/services/firebase.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent {
  public userName: string | null | undefined;
  @Output() closeToCreate = new EventEmitter();
  constructor(
    public dataService: FireDatabaseService,
    public themeService: SwithThemeService,
    public authService: FirebaseService
  ) {
    this.authService.checkAuth().subscribe((data) => {
      this.userName = data?.email;
    });
  }
  closeForCreateComment(): void {
    this.closeToCreate.emit();
  }

  addAnswer(textAnswer: string): void {
    const objForSendNewComment = {
      textComment: `${textAnswer}`,
      dateCreateComment: `${createDateCreation()}`,
      authorComment: `${this.userName}`,
      statusAnswer: false,
      idComment: '',
    };

    this.dataService.item.comments = [
      {
        textComment: `${textAnswer}`,
        dateCreateComment: `${createDateCreation()}`,
        authorComment: `${this.userName}`,
        statusAnswer: false,
        idComment: '',
      },
      ...this.dataService.item.comments,
    ];

    this.dataService
      .addComment(this.dataService.item.id, objForSendNewComment)
      .subscribe(
        (data) => {},
        (rez) => {
          alert(`${rez.message}`);
        }
      );
    this.closeForCreateComment();
  }
}
