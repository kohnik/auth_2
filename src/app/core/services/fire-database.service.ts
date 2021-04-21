import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class FireDatabaseService {
  items: object[] = [];
  item: any;
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
            console.log(data)
            // @ts-ignore
            item.id = `${Object.keys(data)[countId]}`;
            this.items.push(item);
            countId++;
          });
        }
        console.log(this.items);
      });
  }
  async getCard(id: string) {
    this.http
      .get(`https://fir-auth-9b2a0-default-rtdb.firebaseio.com/${id}.json`)
      .subscribe((data) => {
        if (data !== null) {
          // @ts-ignore
          console.log(data);
          this.item = data;
        }
      });
  }
  postQuestion(dataOfQuestionToSend: object){
    return this.http
      .post(
        'https://fir-auth-9b2a0-default-rtdb.firebaseio.com/.json',
        dataOfQuestionToSend
      );
  }


}
