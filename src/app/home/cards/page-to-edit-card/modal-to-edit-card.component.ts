import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../core/services/question.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SwithThemeService } from '../../../core/services/switchTheme/swith-theme.service';
import {
  createDateCreation,
  createSuccessfulCheckBoxList,
  getCheckboxs,
  onChange,
} from '../../../shared/constants';
import { CheckBox, DataOfCard } from '../../../shared/interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-modal-to-edit-card',
  templateUrl: './modal-to-edit-card.component.html',
  styleUrls: ['./modal-to-edit-card.component.scss'],
})
export class ModalToEditCardComponent implements OnInit {
  editForm!: FormGroup;
  error = false;
  checkBoxList!: CheckBox[];
  item!: DataOfCard;
 dataOfQuestionToSend!: DataOfCard
  constructor(
    public dataService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    public themeService: SwithThemeService,
    private formBuilder: FormBuilder,

  ) {
    this.checkBoxList = getCheckboxs();
  }
  ngOnInit() {
    this.route.params
      .pipe(switchMap((params: Params) => this.dataService.getCard(params.id)))
      .subscribe(
        (card: DataOfCard) => {
          this.item = card;
          this.editForm = this.formBuilder.group({
            orders: new FormArray([]),
            titlequestion: new FormControl(
              `${this.item.title}`,
              Validators.required
            ),
            textquestion: new FormControl(
              `${this.item.text}`,
              Validators.required
            ),
          });
          this.addCheckboxes();
        },
        (error) => {
          this.error = error.message;
        }
      );
  }

  get ordersFormArray(): FormArray {
    return this.editForm.controls.orders as FormArray;
  }
  private addCheckboxes(): void {
    this.checkBoxList.forEach((item) => {
      this.item.tag.includes(item.name)
        ? (item.isselected = !item.isselected)
        : null;
      this.ordersFormArray.push(new FormControl(item.isselected));
    });
  }

  transferDataForOnChange(i: number): void {
    onChange(i, this.checkBoxList);
  }
  editQuestion(): void {
    let checkBoxListForSend = [];
    checkBoxListForSend = createSuccessfulCheckBoxList(this.checkBoxList);
    if (this.editForm.invalid || !this.editForm.value.orders.includes(true)) {
      this.error = true;
    } else {
      this.dataOfQuestionToSend = {
        title: this.editForm.value.titlequestion,
        text:  this.editForm.value.textquestion,
        tag: checkBoxListForSend,
        isModeration: this.item.isModeration,
        comments: this.item.comments,
        author: this.item.author,
        date: this.item.date,
        isAnsweredQuestion: this.item.isAnsweredQuestion,
        id: this.item.id,
      };
      this.dataService
        .postEditQuestion(this.item.id, this.dataOfQuestionToSend)
        .subscribe(
          (data) =>
            this.router.navigate([`question/${this.item.id}`]),
          (rez) => {
            alert(`${rez.message}`);
          }
        );
    }
  }
  returnOnQuestionCard(): void {
    this.router.navigate([`question/${this.item.id}`]);
  }
}
