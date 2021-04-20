import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';
import { CheckBox} from './../../../shared/interface';
import { DataOfQuestionToSend} from './../../../shared/interface'
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  checkboxlist: CheckBox[] = [];
  checkBoxListToSend: string[] = [];
  dataOfQuestionToSend: DataOfQuestionToSend[] = [];
  tags: any;
  userName: any;
  dateOfCreation: any;
  dateCreation: any;
  zeroForMin: string = '';
  zeroForMonth: string = '';
  constructor(public DataService: FireDatabaseService) {}

  getCheckboxs() {
    this.checkboxlist = [];
    let i: number;
    this.tags = this.DataService.tags;
    for (i = 0; i < this.tags.length; i++) {
      this.checkboxlist.push({
        id: i + 1,
        name: `${this.tags[i]}`,
        isselected: false,
      });
    }
    console.log(this.checkboxlist)
  }

  onChange() {}
  addQuestion(titlequestion: string, textquestion: string) {
    this.userName = localStorage.getItem('user');
    this.userName = JSON.parse(this.userName).email;

    let i: number;
    for (i = 0; i < this.checkboxlist.length; i++) {
      if (this.checkboxlist[i].isselected === true) {
        this.checkBoxListToSend.push(`${this.checkboxlist[i].name}`);
      }
    }
    this.createDateCreation();
    this.dataOfQuestionToSend.push({
      title: `${titlequestion}`,
      questionText: `${textquestion}`,
      tag: this.checkBoxListToSend,
      status: `ischecking`,
      userName: `${this.userName}`,
      date: `${this.dateOfCreation}`,
    });
    this.DataService.postQuestion(this.dataOfQuestionToSend);
    this.DataService.items = [
      ...this.DataService.items,
      {
        title: `${titlequestion}`,
        questionText: `${textquestion}`,
        tag: this.checkBoxListToSend,
        status: `ischecking`,
        userName: `${this.userName}`,
        date: `${this.dateOfCreation}`,
      },
    ];
    this.checkBoxListToSend = [];
    this.dataOfQuestionToSend = [];
  }
  createDateCreation() {
    this.dateOfCreation = new Date().getTime();
  }

  getDateCreation(date: any) {
    this.dateCreation = new Date(+date);
    if(this.dateCreation.getMinutes()<10)
    {
      this.zeroForMin = '0';
    }
    if(this.dateCreation.getMonth()<10)
    {
      this.zeroForMonth = '0';
    }
    return this.dateCreation =  `${this.dateCreation.getDate()}.${this.zeroForMonth}${this.dateCreation.getMonth()}.${this.dateCreation.getFullYear()} \n
    ${this.dateCreation.getHours()}:${ this.zeroForMin}${this.dateCreation.getMinutes()}`;
  }
}


