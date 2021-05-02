import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';
import {CheckBox, DataOfCard} from './../../../shared/interface';
import { tags } from '../../../shared/constants';
import { UserauthService } from '../userName/userauth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  checkboxList: CheckBox[] = [];
  checkBoxListToSend: string[] = [];
  dataOfQuestionToSend!: DataOfCard;
  tags: any;
  dateOfCreation: any;
  dateCreation: any;

  constructor(
    public dataService: FireDatabaseService,
    public userauthService: UserauthService,
    private router: Router
  ) {}

  getCheckboxs(): void {
    this.checkboxList = [];
    let i: number;
    for (i = 0; i < tags.length; i++) {
      this.checkboxList.push({
        id: i + 1,
        name: `${tags[i]}`,
        isselected: false,
      });
    }
  }

  onChange(tag: any, index: number): void {
    this.checkboxList[index].isselected = !this.checkboxList[index].isselected;
  }
  addQuestion(titlequestion: string, textquestion: string): void {
    this.createCheckboxList();
    this.dataOfQuestionToSend = {
      title: `${titlequestion}`,
      text: `${textquestion}`,
      tag: this.checkBoxListToSend,
      status: false,
      comments: [],
      author: `${this.userauthService.getname()}`,
      date: this.createDateCreation(),
      completed: false,
      id: '',
    };
    this.dataService
      .postQuestion(this.dataOfQuestionToSend)
      .subscribe((data) => {
        this.router.navigate(['question']);
      });
    // this.checkBoxListToSend = [];
    // this.dataOfQuestionToSend = [];
  }
  createCheckboxList(): void {
    let i: number;
    for (i = 0; i < this.checkboxList.length; i++) {
      if (this.checkboxList[i].isselected === true) {
        this.checkBoxListToSend.push(`${this.checkboxList[i].name}`);
      }
    }
  }

  createDateCreation(): number {
    return (this.dateCreation = new Date().getTime());
  }
}
