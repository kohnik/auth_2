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
  isLoggedIn: boolean = false;
  InputLogin: boolean = false;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public DataService: FireDatabaseService
  ) {}
  async signup(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((rez) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(rez.user));
      });
  }

  async signin(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((rez) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(rez.user));
      });
  }

  signGoogle() {
    return this.authLogin(this.googleProvider);
  }
  signFacebook() {
    return this.authLogin(this.facebookProvider);
  }
  signGithub() {
    return this.authLogin(this.githubProvider);
  }

  async authLogin(provider: any) {
    await this.firebaseAuth.signInWithPopup(provider)
      .then((res) => {
        this.isLoggedIn = true;
        console.log(res.user);
        localStorage.setItem('user', JSON.stringify(res.user));
      });

  }
  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.isLoggedIn = false;

  }

  checkAuth() {
    if (localStorage.getItem('user') === null) {
      this.isLoggedIn = false;
      return true;
    } else {
      this.isLoggedIn = true;
      return false;
    }
  }
}
