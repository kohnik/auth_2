import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthCardComponent} from './auth/auth-card/auth-card.component';
import {AuthGuard} from './core/guards/guardAuth/auth-guard.guard';
import {HomePageComponent} from './home-page/home-page.component';
import {AuthHomeGuardGuard} from './core/guards/guardHome/auth-home-guard.guard';
import {FullcardComponent} from './cards/fullcard/fullcard.component';
const appRoutes: Routes = [
  { path: '', component: AuthCardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomePageComponent, canActivate: [AuthHomeGuardGuard]},
  { path: 'question', component: FullcardComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
