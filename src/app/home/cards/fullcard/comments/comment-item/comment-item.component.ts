import { Component, Input } from '@angular/core';
import { SwithThemeService } from '../../../../../core/services/switchTheme/swith-theme.service';
import { DataOfComment } from '../../../../../shared/interface';
import { FireDatabaseService } from '../../../../../core/services/fire-database.service';
import { FirebaseService } from '../../../../../core/services/firebase.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {
  constructor(
    public themeService: SwithThemeService,
    public dataService: FireDatabaseService,
    public authService: FirebaseService
  ) {
    console.log(dataService.item.comments);
  }
  @Input() dataComment!: DataOfComment;
  approveComment(): void {
    this.dataService.item.completed = true;
    this.dataComment.statusAnswer = true;
    this.dataService
      .approveComment(
        this.dataService.item.id,
        this.dataComment.idComment,
        this.dataService.item,
        this.dataComment
      )
      .subscribe((data) => {});
  }
}
