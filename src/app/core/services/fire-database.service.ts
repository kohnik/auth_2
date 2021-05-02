import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataOfCard, DataOfComment } from '../../shared/interface';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireDatabaseService {
  items: DataOfCard[] = [];
  itemsSave: DataOfCard[] = [];
  item!: DataOfCard;
  itemForEdit!: DataOfCard;
  comments: DataOfComment[] = [];
  currentCommentId = '';
  currentCardId = '';
  statusSort!: boolean;
  constructor(private http: HttpClient) {}
  getAll(): Observable<object> {
    return this.http.get(
      'https://fir-auth-9b2a0-default-rtdb.firebaseio.com/.json'
    );
  }

  getCard(id: string): Observable<object> {
    return this.http.get(
      `https://fir-auth-9b2a0-default-rtdb.firebaseio.com/${id}.json`
    );
  }

  postQuestion(dataOfQuestionToSend: DataOfCard): Observable<object> {
    return this.http.post(
      'https://fir-auth-9b2a0-default-rtdb.firebaseio.com/.json',
      dataOfQuestionToSend
    );
  }
  postEditQuestion(): Observable<object> {
    return this.http.patch(
      `https://fir-auth-9b2a0-default-rtdb.firebaseio.com/${this.currentCardId}.json`,
      this.item
    );
  }

  addComment(body: object): Observable<object> {
    const url = `https://fir-auth-9b2a0-default-rtdb.firebaseio.com/${this.currentCommentId}/comments.json`;
    return this.http.post(url, body);
  }
}
