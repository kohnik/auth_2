import {Component, NgZone, OnInit} from '@angular/core';
import { FireDatabaseService } from '../core/services/fire-database.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AddquestionService} from '../core/services/addquestion/addquestion.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  // checkboxlist: CheckBox[] = [];
  // checkBoxListToSend: string[] = [];
  // dataOfQuestionToSend: DataOfQuestionToSend[] = [];
  // tags: any;
  constructor(
    public DataService: FireDatabaseService,
    private modalService: NgbModal,
    public AddItem: AddquestionService
  ) {}

  ngOnInit(): void {
    this.DataService.getAll();
    this.AddItem.getCheckboxs();
  }

  // getCheckboxs() {
  //   let i: number;
  //   this.tags = this.DataService.tags;
  //   for (i = 0; i < this.tags.length; i++) {
  //     this.checkboxlist.push({
  //       id: i + 1,
  //       name: `${this.tags[i]}`,
  //       isselected: false,
  //     });
  //   }
  //
  // }
  // onChange() {}

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
  // addQuestion(textquestion: string) {
  //   let i: number;
  //   for (i = 0; i < this.checkboxlist.length; i++) {
  //     if (this.checkboxlist[i].isselected === true) {
  //       this.checkBoxListToSend.push(`${this.checkboxlist[i].name}`);
  //     }
  //   }
  //   this.dataOfQuestionToSend.push({ title: `1234`, tag: this.checkBoxListToSend});
  //   this.DataService.postQuestion(this.dataOfQuestionToSend);
  //   this.DataService.items = [...this.DataService.items, { title: `${textquestion}`, tag: this.checkBoxListToSend, status: 'ischecking' }];

  // }
}

// class CheckBox {
//   id: number | undefined;
//   name: string | undefined;
//   isselected: boolean | undefined;
// }
//
// class DataOfQuestionToSend{
//   title: string | undefined;
//   tag: string[] | undefined;
// }

