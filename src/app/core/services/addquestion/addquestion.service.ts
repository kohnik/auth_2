import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';
import { CheckBox} from './../../../shared/interface';
import { DataOfQuestionToSend} from './../../../shared/interface'
@Injectable({
  providedIn: 'root',
})
export class AddquestionService {
  checkboxlist: CheckBox[] = [];
  checkBoxListToSend: string[] = [];
  dataOfQuestionToSend: DataOfQuestionToSend[] = [];
  tags: any;
  userName: any;
  dateOfCreation: any;
  constructor(public DataService: FireDatabaseService) {}

  getCheckboxs() {
    let i: number;
    this.tags = this.DataService.tags;
    for (i = 0; i < this.tags.length; i++) {
      this.checkboxlist.push({
        id: i + 1,
        name: `${this.tags[i]}`,
        isselected: false,
      });
    }
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
}

// interface CheckBox {
//   id: number;
//   name: string;
//   isselected: boolean;
// }
// interface DataOfQuestionToSend {
//   title: string;
//   questionText: string;
//   tag: string[];
//   status: string;
//   userName: string;
//   date: any;
// }

// class CheckBox {
//   id: number | undefined;
//   name: string | undefined;
//   isselected: boolean | undefined;
// }

// class DataOfQuestionToSend {
//   title: string | undefined;
//   questionText: string | undefined;
//   tag: string[] | undefined;
//   status: string | undefined;
//   userName: string | undefined;
//   date: any | undefined;
// }
