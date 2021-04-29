import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../../core/services/question/question.service';
import { SwithThemeService } from '../../../core/services/switchTheme/swith-theme.service';
import {SwitchViewCardsService} from "../../../core/services/switchViewCards/switch-view-cards.service";

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() item: any;
  constructor(
    public questionService: QuestionService,
    public themeService: SwithThemeService,
    public viewCardsService: SwitchViewCardsService
  ) {}

  ngOnInit(): void {}
}
