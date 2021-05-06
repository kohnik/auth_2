import { Component, OnDestroy } from '@angular/core';
import { FireDatabaseService } from '../../../../core/services/fire-database.service';
import { SwithThemeService } from '../../../../core/services/switchTheme/swith-theme.service';

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

  ngOnDestroy(): void {
    this.dataService.comments = [];
  }

  openForCreateComment(): void {
    this.statusStateCreateComment = true;
  }
  closeForCreateComment(): void {
    this.statusStateCreateComment = false;
  }
}
