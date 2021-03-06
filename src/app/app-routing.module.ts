import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCardComponent } from './auth/auth-card/auth-card.component';
import { AuthGuard } from './core/guards/guardAuth/auth-guard.guard';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AuthHomeGuardGuard } from './core/guards/guardHome/auth-home-guard.guard';
import { FullcardComponent } from './home/cards/fullcard/fullcard.component';
import { QuestionGuard } from './core/guards/guardQuestion/question.guard';
import { ModaltoCreateCardComponent } from './home/cards/page-to-create-card/modalto-create-card.component';
import { ModalToEditCardComponent } from './home/cards/page-to-edit-card/modal-to-edit-card.component';
const appRoutes: Routes = [
  { path: '', component: AuthCardComponent, canActivate: [AuthGuard] },
  {
    path: 'question/:id',
    component: FullcardComponent,
    canActivate: [QuestionGuard],
  },
  {
    path: 'question',
    component: HomePageComponent,
    canActivate: [AuthHomeGuardGuard],
  },
  {
    path: 'newquestion',
    component: ModaltoCreateCardComponent,
    canActivate: [QuestionGuard],
  },
  {
    path: 'question/:id/editquestion',
    component: ModalToEditCardComponent,
    canActivate: [QuestionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
