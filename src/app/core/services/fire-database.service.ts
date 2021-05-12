import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataOfCard, DataOfComment, PostCard } from '../../shared/interface';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { link } from '../../shared/constants';
import { FirebaseService } from './firebase.service';
@Injectable({
  providedIn: 'root',
})
export class FireDatabaseService {
  // Убрал по максимум все переменные, но порассуждав, все таки решил item оставить тут. Ибо при редактировании лишний запрос делать, неудобно обновлять item, и делать проверку
  item!: DataOfCard;
  constructor(private http: HttpClient, public authService: FirebaseService) {}
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
          ? Object.keys(data.comments).map((key: any) => {
              data.comments[key].idComment = key;
              return data.comments[key];
            })
          : [];
        data.id = id;
        this.item = { ...data, comments };
        return { ...data, comments } as DataOfCard;
      })
    );
  }

  postQuestion(body: DataOfCard): Observable<PostCard> {
    return this.http.post<PostCard>(`${link}cards.json`, body);
  }
  postEditQuestion(id: string, body: DataOfCard): Observable<PostCard> {
    return this.http.patch<PostCard>(`${link}cards/${id}/.json`, body);
  }
  deleteQuestion(id: string): Observable<PostCard> {
    return this.http.delete<PostCard>(`${link}cards/${id}/.json`);
  }
  approveQuestion(id: string, body: DataOfCard): Observable<PostCard> {
    return this.http.patch<PostCard>(`${link}cards/${id}/.json`, body);
  }

  approveComment(
    idCard: string,
    idComment: string,
    bodyCard: DataOfCard,
    bodyComment: DataOfComment
  ): Observable<PostCard> {
    return this.http
      .patch<PostCard>(`${link}cards/${idCard}/.json`, bodyCard)
      .pipe(
        switchMap((firstRequest) => {
          this.http.post<PostCard>(
            `${link}cards/${idComment}/comments.json`,
            bodyComment
          );
          return of(firstRequest);
        })
      );
  }
  addComment(id: string, body: DataOfComment): Observable<PostCard> {
    return this.http.post<PostCard>(`${link}cards/${id}/comments.json`, body);
  }
}
