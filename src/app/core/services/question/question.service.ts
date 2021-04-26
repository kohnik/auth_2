import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';
import { CheckBox } from './../../../shared/interface';
import { tags } from '../../../shared/constants';
import { UserauthService } from '../userName/userauth.service';
import { Router } from '@angular/router';
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
    public userauthService: UserauthService,
    private router: Router
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

  onChange(tag: any, index: number): void {
    this.checkboxList[index].isselected = !this.checkboxList[index].isselected;
    console.log( this.checkboxList);
  }
  addQuestion(titlequestion: string, textquestion: string): void {
    this.createCheckboxList();
    this.dataOfQuestionToSend = {
      title: `${titlequestion}`,
      text: `${textquestion}`,
      tag: this.checkBoxListToSend,
      status: `ischecking`,
      author: `${this.userauthService.getname()}`,
      date: `${this.createDateCreation()}`,
    };
    console.log(this.dataOfQuestionToSend);
    this.dataService
      .postQuestion(this.dataOfQuestionToSend)
      .subscribe((data) => {
        console.log(data);
      });


    this.checkBoxListToSend = [];
    this.dataOfQuestionToSend = [];
    setTimeout(() => {
      this.router.navigate(['question']);
    }, 500);
  }
  createCheckboxList() {
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
