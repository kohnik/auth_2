import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {QuestionService} from "../../core/services/question/question.service";
import {FireDatabaseService} from "../../core/services/fire-database.service";

@Component({
  selector: 'app-fullcard',
  templateUrl: './fullcard.component.html',
  styleUrls: ['./fullcard.component.scss'],
})
export class FullcardComponent implements OnInit {
  itemArray: object[] = [];
  item: any;
  constructor(private route: ActivatedRoute, private router: Router,public questionService: QuestionService, public DataService : FireDatabaseService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.itemArray.push({
        title: params.title,
        text: params.text,
        date: params.date,
        username: params.username,
        tags: params.tags
      });
      this.item = this.itemArray[0];
    });
console.log(this.itemArray)
   this.DataService.items = []
  }

}
