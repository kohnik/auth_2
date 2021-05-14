import { Component, Input, OnDestroy } from '@angular/core';
import { FireDatabaseService } from '../../../../core/services/fire-database.service';
import { SwithThemeService } from '../../../../core/services/switchTheme/swith-theme.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {

  public isCreateComment = false;
  constructor(
    public dataService: FireDatabaseService,
    public themeService: SwithThemeService
  ) {}

  openForCreateComment(): void {
    this.isCreateComment = true;
  }
  closeForCreateComment(): void {
    this.isCreateComment = false;
  }
}
