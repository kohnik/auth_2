import { Component, Input } from '@angular/core';
import { SwithThemeService } from '../../../../../core/services/switchTheme/swith-theme.service';
import { DataOfComment } from '../../../../../shared/interface';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent  {
  constructor(public themeService: SwithThemeService) {}
  @Input() dataComment!: DataOfComment;
}
