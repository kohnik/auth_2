import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireDatabaseService } from '../../core/services/fire-database.service';
import { QuestionService } from '../../core/services/question/question.service';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: FirebaseService,
    private router: Router,
    private modalService: NgbModal,
    public addItemService: QuestionService,
    public themeService: SwithThemeService
  ) {}
  ngOnInit(): void {
    this.authService.checkAuth();
    if (localStorage.getItem('user') !== null) {
      this.router.navigate(['question']);
    } else {
      this.router.navigate(['']);
    }
    this.addItemService.getCheckboxs();
  }

  changeLogin(): void {
    if (this.authService.InputLogin) {
      this.authService.InputLogin = false;
    } else {
      this.authService.InputLogin = true;
    }
  }
  logout(): void {
    this.router.navigate(['']);
    this.authService.logout();
  }

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
