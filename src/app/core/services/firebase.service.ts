import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { FireDatabaseService } from './fire-database.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  googleProvider = new firebase.auth.GoogleAuthProvider();
  facebookProvider = new firebase.auth.FacebookAuthProvider();
  githubProvider = new firebase.auth.GithubAuthProvider();
  isLoggedIn = false;
  InputLogin = false;

  constructor(public firebaseAuth: AngularFireAuth) {}
  signup(email: string, password: string): Promise<object> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string): Promise<object> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  signGoogle(): void {
    return this.authLogin(this.googleProvider);
  }
  signFacebook(): void {
    return this.authLogin(this.facebookProvider);
  }
  signGithub(): void {
    return this.authLogin(this.githubProvider);
  }

  authLogin(provider: any): void {
    this.firebaseAuth.signInWithPopup(provider).then((res) => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
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
