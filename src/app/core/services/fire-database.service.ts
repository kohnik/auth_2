import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
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
  ];
  constructor() {}
  async getAll() {
    await fetch('https://fir-auth-9b2a0-default-rtdb.firebaseio.com/.json')
      .then((responce) => responce.json())
      .then((data) => {
        if(data !== null)
        {
          Object.values(data).map( item =>
          {
            // @ts-ignore
            this.items.push(item[0]);
          });
          console.log(this.items);
        }
      });
  }
  async postQuestion(dataOfQuestionToSend: object[]) {
    await fetch('https://fir-auth-9b2a0-default-rtdb.firebaseio.com/.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(dataOfQuestionToSend)
      });
  }
}
