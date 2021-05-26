import {NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthService} from './core/services/auth.service';
import {QuestionService} from './core/services/question.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { AuthCardComponent } from './auth/auth-card/auth-card.component';
import { AuthGuard } from './core/guards/guardAuth/auth-guard.guard';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AuthHomeGuardGuard } from './core/guards/guardHome/auth-home-guard.guard';
import { AuthCardSignupComponent } from './auth/auth-card-signup/auth-card-signup.component';
import { AuthCardSigninComponent } from './auth/auth-card-signin/auth-card-signin.component';
import {environment} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HomeSettingsComponent } from './home/home-settings/home-settings.component';
import { CardsComponent } from './home/cards/cards.component';
import { CardItemComponent } from './home/cards/card-item/card-item.component';
import { FullcardComponent } from './home/cards/fullcard/fullcard.component';
import { CommentsComponent } from './home/cards/fullcard/comments/comments.component';
import { CommentItemComponent } from './home/cards/fullcard/comments/comment-item/comment-item.component';
import { CreateCommentComponent } from './home/cards/fullcard/comments/create-comment/create-comment.component';
import { ModaltoCreateCardComponent } from './home/cards/page-to-create-card/modalto-create-card.component';
import { ModalToEditCardComponent } from './home/cards/page-to-edit-card/modal-to-edit-card.component';
import { FilterPipePipe } from './core/pipes/filterPipe/filter-pipe.pipe';
import { SortPipePipe } from './core/pipes/sortPipe/sort-pipe.pipe';
import { CheckRoleUserPipe } from './core/pipes/checkRoleUser/check-role-user.pipe';
import {AngularFireAuthModule} from "@angular/fire/auth";

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
    FullcardComponent,
    CommentsComponent,
    CommentItemComponent,
    CreateCommentComponent,
    ModaltoCreateCardComponent,
    ModalToEditCardComponent,
    FilterPipePipe,
    SortPipePipe,
    CheckRoleUserPipe,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp( environment.firebaseConfig),
    NgbModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, QuestionService, AuthGuard, AuthHomeGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule{

}
