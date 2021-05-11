import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { FireDatabaseService } from '../../services/fire-database.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionGuard implements CanActivate {
  constructor(
    public authService: FirebaseService,
    public dataService: FireDatabaseService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.checkAuth().pipe(
      map((data) => {
        this.authService.isLoggedIn = true;
        return !!data;
      })
    );
  }
}
