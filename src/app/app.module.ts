import {NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FirebaseService} from './core/services/firebase.service';
import {FireDatabaseService} from './core/services/fire-database.service';

import { HeaderComponent } from './shared/header/header.component';
import { AuthCardComponent } from './auth/auth-card/auth-card.component';
import { AuthGuard } from './core/guards/guardAuth/auth-guard.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthHomeGuardGuard } from './core/guards/guardHome/auth-home-guard.guard';
import { AuthCardSignupComponent } from './auth/auth-card-signup/auth-card-signup.component';
import { AuthCardSigninComponent } from './auth/auth-card-signin/auth-card-signin.component';
import {environment} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HomeSettingsComponent } from './home-settings/home-settings.component';
import { CardsComponent } from './cards/cards.component';
import { CardItemComponent } from './cards/card-item/card-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthCardComponent,
    HomePageComponent,
    AuthCardSignupComponent,
    AuthCardSigninComponent,
    HomeSettingsComponent,
    CardsComponent,
    CardItemComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp( environment.firebaseConfig),
    NgbModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule
  ],
  providers: [FirebaseService, FireDatabaseService, AuthGuard, AuthHomeGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule{

}
