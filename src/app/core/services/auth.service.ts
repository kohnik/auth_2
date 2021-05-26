import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { link } from '../../shared/constants';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import User = firebase.User;
import { AdminsEmails, CurrentUser } from '../../shared/interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public googleProvider = new firebase.auth.GoogleAuthProvider();
  public facebookProvider = new firebase.auth.FacebookAuthProvider();
  public githubProvider = new firebase.auth.GithubAuthProvider();
  public isLoggedIn = false;
  public displaySignInOrOn = false;
  public currentUser!: CurrentUser;
  public isSiteLoading = false;
  constructor(
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    private http: HttpClient
  ) {}
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

  getAdminsEmails(firstRequest: User): Observable<firebase.User> {
    return this.http.get(`${link}admins.json`).pipe(
      // @ts-ignore
      map((secondRequest: AdminsEmails) => {
        this.currentUser = {
          isAdmin: secondRequest.email
            .includes(firstRequest?.email as string),
          email: firstRequest?.email || '',
        };
        return firstRequest;
      })
    );
  }
}
