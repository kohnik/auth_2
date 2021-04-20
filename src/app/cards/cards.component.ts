import { Component, NgZone, OnInit } from '@angular/core';
import { FireDatabaseService } from '../core/services/fire-database.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '../core/services/question/question.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  errorTitle: boolean = false;
  errorText: boolean = false;
  errorCheck: string = '';
  checkValidModal : boolean = false;

  constructor(
    public DataService: FireDatabaseService,
    private modalService: NgbModal,
    public AddItem: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.DataService.getAll();
    this.AddItem.getCheckboxs();
  }

  newQuestion(title: string, text: string, content: any) {

    if (title === '')
    {
      this.errorTitle = true;
    }
    if (text === '')
    {
      this.errorText = true;
    }
    else
    {
      this.AddItem.addQuestion(title, text);
      this.modalService.dismissAll(content);
    }
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
