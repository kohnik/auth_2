import { Component, Input, OnInit } from '@angular/core';
import { SwithThemeService } from '../../../../../core/services/switchTheme/swith-theme.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  constructor(public themeService: SwithThemeService) {}
  @Input() dataComment: any;
  ngOnInit(): void {
    console.log(this.dataComment);
  }
}
