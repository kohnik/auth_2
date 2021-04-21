import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';
import { CheckBox } from './../../../shared/interface';
import { tags } from '../../../shared/constants';
import { UserauthService } from '../userName/userauth.service';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  checkboxList: CheckBox[] = [];
  checkBoxListToSend: string[] = [];
  dataOfQuestionToSend = {};
  tags: any;
  dateOfCreation: any;
  dateCreation: any;

  constructor(
    public dataService: FireDatabaseService,
    public userauthService: UserauthService
  ) {}

  getCheckboxs(): void {
    console.log(this.checkboxList);
    this.checkboxList = [];
    let i: number;
    for (i = 0; i < tags.length; i++) {
      this.checkboxList.push({
        id: i + 1,
        name: `${tags[i]}`,
        isselected: false,
      });
    }
    console.log(this.checkboxList);
  }

  onChange(): void {}
  addQuestion(titlequestion: string, textquestion: string): void {
    let i: number;
    for (i = 0; i < this.checkboxList.length; i++) {
      if (this.checkboxList[i].isselected === true) {
        this.checkBoxListToSend.push(`${this.checkboxList[i].name}`);
      }
    }
    this.createDateCreation();
    this.dataOfQuestionToSend = {
      title: `${titlequestion}`,
      questionText: `${textquestion}`,
      tag: this.checkBoxListToSend,
      status: `ischecking`,
      userName: `${this.userauthService.userName}`,
      date: `${this.dateOfCreation}`,
    };
    console.log(this.dataOfQuestionToSend);
    this.dataService.postQuestion(this.dataOfQuestionToSend).subscribe();
    this.dataService.items = [
      ...this.dataService.items,
      {
        title: `${titlequestion}`,
        questionText: `${textquestion}`,
        tag: this.checkBoxListToSend,
        status: `ischecking`,
        userName: `${this.userauthService.userName}`,
        date: `${this.dateOfCreation}`,
      },
    ];
    this.checkBoxListToSend = [];
    this.dataOfQuestionToSend = [];
  }

  createDateCreation(): void {
    this.dateOfCreation = new Date().getTime();
  }
}
