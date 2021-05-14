import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthHomeGuardGuard implements CanActivate {
  constructor(public authService: FirebaseService) {}
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
        if (data !== null) {
          this.authService.isLoggedIn = true;
        }
        this.authService.isSiteLoading = true;
        // @ts-ignore
        return !!data;
      })
    );
  }
}
