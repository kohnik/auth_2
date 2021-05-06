import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public googleProvider = new firebase.auth.GoogleAuthProvider();
  public facebookProvider = new firebase.auth.FacebookAuthProvider();
  public githubProvider = new firebase.auth.GithubAuthProvider();
  public isLoggedIn = false;
  public displaySignInOrOn = false;
  constructor(public firebaseAuth: AngularFireAuth, public router: Router) {}
  signup(email: string, password: string): Promise<void> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((rez: any) => {
        this.isLoggedIn = true;
        this.router.navigate(['question']);
        localStorage.setItem('user', JSON.stringify(rez.user));
      });
  }
  signin(email: string, password: string): Promise<void> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((rez: any) => {
        this.isLoggedIn = true;
        this.router.navigate(['question']);
        localStorage.setItem('user', JSON.stringify(rez.user));
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
      localStorage.setItem('user', JSON.stringify(res.user));
      this.router.navigate(['question']);
    });
  }
  logout(): void {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }
  checkAuth(): boolean {
    if (localStorage.getItem('user') === null) {
      this.isLoggedIn = false;
      return true;
    } else {
      this.isLoggedIn = true;
      return false;
    }
  }
}
