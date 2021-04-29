import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireDatabaseService {
  items: object[] = [];
  itemsSave: object[] = [];
  item: any;
  itemForEdit: any;
  comments: object[] = [];
  currentCommentId = '';
  currentCardId = '';
  tags = [
    'Js',
    'Nodejs',
    'Ruby',
    'C++',
    'C#',
    'Java',
    'Python',
    'Angular',
    'React',
    'Vue',
    'Other',
  ];

  constructor(private http: HttpClient) {}
  async getAll() {
    let countId = 0;
    this.http
      .get('https://fir-auth-9b2a0-default-rtdb.firebaseio.com/.json')
      .subscribe((data) => {
        if (data !== null) {
          Object.values(data).map((item) => {
            // @ts-ignore
            item.id = `${Object.keys(data)[countId]}`;
            this.items.push(item);
            this.itemsSave.push(item);
            // console.log(Object.values(this.item.comments));
            countId++;
          });

        }
      });
  }

  async getCard(id: string) {
    this.http
      .get(`https://fir-auth-9b2a0-default-rtdb.firebaseio.com/${id}.json`)
      .subscribe((data) => {
        if (data !== null) {
          this.currentCardId = id;
          this.item = data;
          this.itemForEdit = data;
          if (this.item.comments) {
            for (
              let i = 1;
              i <= Object.values(this.item.comments).length;
              i++
            ) {
              this.comments.push(
                Object.values<object>(this.item.comments)[
                  Object.values(this.item.comments).length - i
                ]
              );
            }
          }
        }
      });
  }
  postQuestion(dataOfQuestionToSend: object) {
    return this.http.post(
      'https://fir-auth-9b2a0-default-rtdb.firebaseio.com/.json',
      dataOfQuestionToSend
    );
  }
  postEditQuestion() {
    this.http
      .patch(
        `https://fir-auth-9b2a0-default-rtdb.firebaseio.com/${this.currentCardId}.json`,
        this.item
      )
      .subscribe((data) => console.log(data));
  }

  addComment(body: object) {
    const url = `https://fir-auth-9b2a0-default-rtdb.firebaseio.com/${this.currentCommentId}/comments.json`;
    this.http.post(url, body).subscribe();
  }
}
