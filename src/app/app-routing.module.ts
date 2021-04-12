import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthCardComponent} from './auth/auth-card/auth-card.component';
import {AuthGuard} from './core/guards/guardAuth/auth-guard.guard';
import {HomePageComponent} from './shared/home-page/home-page.component';
import {AuthHomeGuardGuard} from './core/guards/guardHome/auth-home-guard.guard';

const appRoutes: Routes = [
  { path: '', component: AuthCardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomePageComponent, canActivate: [AuthHomeGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
