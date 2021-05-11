import { Component, Input, OnDestroy } from '@angular/core';
import { FireDatabaseService } from '../../../../core/services/fire-database.service';
import { SwithThemeService } from '../../../../core/services/switchTheme/swith-theme.service';
import { DataOfComment } from '../../../../shared/interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {

  public statusStateCreateComment = false;
  constructor(
    public dataService: FireDatabaseService,
    public themeService: SwithThemeService
  ) {}

  openForCreateComment(): void {
    this.statusStateCreateComment = true;
  }
  closeForCreateComment(): void {
    this.statusStateCreateComment = false;
  }
}
