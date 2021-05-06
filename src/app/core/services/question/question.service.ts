import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';
import { DataOfCard } from './../../../shared/interface';
import { createDateCreation, getName} from '../../../shared/constants';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  dataOfQuestionToSend!: DataOfCard;
  constructor(
    public dataService: FireDatabaseService,
  ) {}
  addQuestion(
    titlequestion: string,
    textquestion: string,
    checkBoxList: string[]
  ): Observable<any> {
    this.dataOfQuestionToSend = {
      title: `${titlequestion}`,
      text: `${textquestion}`,
      tag: checkBoxList,
      status: false,
      comments: [],
      author: `${getName()}`,
      date: createDateCreation(),
      completed: false,
      id: '',
    };
    return this.dataService.postQuestion(this.dataOfQuestionToSend);
  }
}
