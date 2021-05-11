import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  constructor(public firebaseAuth: AngularFireAuth, public router: Router) {
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
    return this.firebaseAuth.authState;
  }
}
