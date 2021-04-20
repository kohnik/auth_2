import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FireDatabaseService {
  items: object[] = [];
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
      'Other'
  ];
  constructor(private http: HttpClient) {}
  async getAll() {
    this.http
      .get('https://fir-auth-9b2a0-default-rtdb.firebaseio.com/.json')
      .subscribe((data) => {
        if (data !== null) {
          Object.values(data).map((item) => {
            // @ts-ignore
            this.items.push(item[0]);
          });
          console.log(this.items);
        }
      });
  }
  async postQuestion(dataOfQuestionToSend: object[]) {
    this.http.post(
      'https://fir-auth-9b2a0-default-rtdb.firebaseio.com/.json',
      dataOfQuestionToSend
    ).subscribe();
  }
}
