import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireDatabaseService } from '../../core/services/fire-database.service';
import { AddquestionService } from '../../core/services/addquestion/addquestion.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // InputLogin = this.AuthService.InputLogin;
  // checkboxlist: CheckBox[] = [];
  // checkBoxListToSend: string[] = [];
  // dataOfQuestionToSend: DataOfQuestionToSend[] = [];
  // tags: any;
  // dateOfCreation: any;
  // userName: any;

  constructor(
    public AuthService: FirebaseService,
    public DataService: FireDatabaseService,
    private router: Router,
    private modalService: NgbModal,
    public AddItemService: AddquestionService
  ) {}
  ngOnInit(): void {
    this.AuthService.checkAuth();
    if (localStorage.getItem('user') !== null) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['']);
    }
    this.AddItemService.getCheckboxs();
  }
  changeLogin() {
    if (this.AuthService.InputLogin) {
      this.AuthService.InputLogin = false;
    } else {
      this.AuthService.InputLogin = true;
    }
  }
  logout() {
    this.router.navigate(['']);
    this.AuthService.logout();
  }

  open(content: any) {
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

