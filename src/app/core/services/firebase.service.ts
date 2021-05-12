import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { link } from '../../shared/constants';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import User = firebase.User;
import {AdminsEmails, ObjForCheckRole} from '../../shared/interface';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public googleProvider = new firebase.auth.GoogleAuthProvider();
  public facebookProvider = new firebase.auth.FacebookAuthProvider();
  public githubProvider = new firebase.auth.GithubAuthProvider();
  public isLoggedIn = false;
  public displaySignInOrOn = false;
  public statusVerivication!: boolean;
  public roleCurrentUser!: ObjForCheckRole;
  constructor(
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    private http: HttpClient
  ) {
    this.firebaseAuth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.statusVerivication = true;
      } else {
        this.statusVerivication = false;
      }
    });
  }
  signup(email: string, password: string): Promise<void> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((rez) => {
        this.isLoggedIn = true;
        this.router.navigate(['question']);
      });
  }
  signin(email: string, password: string): Promise<void> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((rez: any) => {
        this.isLoggedIn = true;
        this.router.navigate(['question']);
      });
  }
  signGoogle(): Promise<void> {
    return this.authLogin(this.googleProvider);
  }
  signFacebook(): Promise<void> {
    return this.authLogin(this.facebookProvider);
  }
  signGithub(): Promise<void> {
    return this.authLogin(this.githubProvider);
  }
  authLogin(provider: any): Promise<void> {
    return this.firebaseAuth.signInWithPopup(provider).then((res) => {
      this.isLoggedIn = true;
      this.router.navigate(['question']);
    });
  }
  logout(): void {
    this.firebaseAuth
      .signOut()
      .then((data) => {
        this.router.navigate(['']);
      })
      .then((data) => {
        this.isLoggedIn = false;
      });
  }
  checkAuth(): Observable<firebase.User | null> {
    return this.firebaseAuth.authState.pipe(
      switchMap((firstRequest: User | null) => {
        if (firstRequest !== null) {
          return this.getAdminsEmails(firstRequest);
        } else {
          return of(firstRequest);
        }
      })
    );
  }

  getAdminsEmails(firstRequest: User | null): Observable<firebase.User | null> {
    return this.http.get(`${link}admins.json`).pipe(
      // @ts-ignore
      map((secondRequest: AdminsEmails) => {
        // ВОПРОС опять с этим приходящим типом
        secondRequest.email.split(',').includes(firstRequest?.email as string)
          ? (this.roleCurrentUser = {
              admin: true,
              currentUserEmail: firstRequest?.email as string,
            })
          : (this.roleCurrentUser = {
            admin: false,
            currentUserEmail: firstRequest?.email as string,
          });
        return firstRequest;
      })
    );
  }
}
