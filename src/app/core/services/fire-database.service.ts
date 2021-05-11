import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataOfCard, DataOfComment, PostCard } from '../../shared/interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { link } from '../../shared/constants';
@Injectable({
  providedIn: 'root',
})
export class FireDatabaseService {
  // Убрал по максимум все переменные, но порассуждав, все таки решил item оставить тут. Ибо при редактировании лишний запрос делать, неудобно обновлять item, и делать проверку
  item!: DataOfCard;
  constructor(private http: HttpClient) {}
  getAll(): Observable<DataOfCard[]> {
    return this.http.get(`${link}cards.json`).pipe(
      map((data) => {
        data = Object.keys(data).map((keys) => {
          // @ts-ignore
          data[keys].id = `${keys}`;
          // @ts-ignore
          return data[keys];
        });
        return data as DataOfCard[];
      })
    );
  }
  getCard(id: string): Observable<DataOfCard> {
    return this.http.get(`${link}cards/${id}.json`).pipe(
      // @ts-ignore
      map((data: DataOfCard) => {
        // Вопросик насчет этого типа, я переделал interface DataOfCardBase, но тоже косяк
        const comments = data.comments
          ? Object.keys(data.comments).map((key: any) => data.comments[key])
          : [];
        data.id = id;
        this.item = { ...data, comments };
        return { ...data, comments } as DataOfCard;
      })
    );
  }

  postQuestion(dataOfQuestionToSend: DataOfCard): Observable<PostCard> {
    return this.http.post<PostCard>(`${link}cards.json`, dataOfQuestionToSend);
  }
  postEditQuestion(id: string): Observable<PostCard> {
    return this.http.patch<PostCard>(`${link}cards/${id}/.json`, this.item);
  }
  addComment(body: DataOfComment, id: string): Observable<PostCard> {
    const url = `${link}cards/${id}/comments.json`;
    return this.http.post<PostCard>(url, body);
  }
}
