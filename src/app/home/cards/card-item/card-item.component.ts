import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../../core/services/question/question.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() item: any;
  constructor(public questionService: QuestionService) {}

  ngOnInit(): void {}
}
