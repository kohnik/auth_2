import { Component, OnInit } from '@angular/core';
import { FireDatabaseService } from '../../core/services/fire-database.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '../../core/services/question/question.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  constructor(
    public dataService: FireDatabaseService,
    private modalService: NgbModal,
    public addItem: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.getAll();
    this.addItem.getCheckboxs();
  }

  redirectTo()
  {
    this.router.navigate(['newquestion']);
  }


}
