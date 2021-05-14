import { Injectable } from '@angular/core';
import { FireDatabaseService } from '../fire-database.service';
import { DataOfCard } from '../../../shared/interface';
import { createDateCreation } from '../../../shared/constants';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  dataOfQuestionToSend!: DataOfCard;
  public userName!: string | null | undefined;
  constructor(
    public dataService: FireDatabaseService,
    public authService: FirebaseService
  ) {
    this.authService.checkAuth().subscribe((data) => {
      this.userName = data?.email;
    });
  }
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
      author: `${this.userName}`,
      date: createDateCreation(),
      completed: false,
      id: '',
    };
    return this.dataService.postQuestion(this.dataOfQuestionToSend);
  }
}
