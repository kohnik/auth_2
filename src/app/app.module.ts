import {NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FirebaseService} from './core/services/firebase.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { AuthCardComponent } from './auth/auth-card/auth-card.component';
import {FormsModule} from '@angular/forms';
import { AuthGuard } from './core/guards/guardAuth/auth-guard.guard';
import { HomePageComponent } from './shared/home-page/home-page.component';
import { AuthHomeGuardGuard } from './core/guards/guardHome/auth-home-guard.guard';
import { AuthCardSignupComponent } from './auth/auth-card-signup/auth-card-signup.component';
import { AuthCardSigninComponent } from './auth/auth-card-signin/auth-card-signin.component';
import {environment} from '../environments/environment';
import { ReactiveFormsModule, } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthCardComponent,
    HomePageComponent,
    AuthCardSignupComponent,
    AuthCardSigninComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp( environment.firebaseConfig),
    NgbModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService, AuthGuard, AuthHomeGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule{

}
