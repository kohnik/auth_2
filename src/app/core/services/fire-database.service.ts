import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataOfCard, DataOfComment } from '../../shared/interface';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FireDatabaseService {
  items: DataOfCard[] = [];
  item!: DataOfCard;
  comments: DataOfComment[] = [];
  currentCardId = '';
  statusSort!: boolean;

  constructor(private http: HttpClient) {}
  getAll(): Observable<DataOfCard> {
    return this.http
      .get('https://fir-auth-9b2a0-default-rtdb.firebaseio.com/.json')
      .pipe(
        map((data) => {
          let countId = 0;
          this.items = Object.values(data).map((item) => {
            item.id = `${Object.keys(data)[countId]}`;
            countId++;
            return item;
          });
          return data as DataOfCard;
        })
      );
  }

  getCard(id: string): Observable<DataOfCard> {
    return this.http
      .get(`https://fir-auth-9b2a0-default-rtdb.firebaseio.com/${id}.json`)
      .pipe(
        // @ts-ignore
        map((data: DataOfCard) => {
          const comments = data.comments
            ? Object.keys(data.comments).map((key: any) => data.comments[key])
            : [];
          this.currentCardId = id;
          this.item = { ...data, comments };
          return { ...data, comments } as DataOfCard;
        })
      );
  }

  postQuestion(dataOfQuestionToSend: DataOfCard): Observable<object> {
    return this.http.post(
      'https://fir-auth-9b2a0-default-rtdb.firebaseio.com/.json',
      dataOfQuestionToSend
    );
  }
  postEditQuestion(): Observable<object> {
    console.log(this.item);
    return this.http.patch(
      `https://fir-auth-9b2a0-default-rtdb.firebaseio.com/${this.currentCardId}.json`,
      this.item
    );
  }

  addComment(body: object): Observable<object> {
    const url = `https://fir-auth-9b2a0-default-rtdb.firebaseio.com/${this.currentCardId}/comments.json`;
    return this.http.post(url, body);
  }
}
