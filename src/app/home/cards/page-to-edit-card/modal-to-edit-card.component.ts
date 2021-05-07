import { Component, OnInit } from '@angular/core';
import { FireDatabaseService } from '../../../core/services/fire-database.service';
import { QuestionService } from '../../../core/services/question/question.service';
import { Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SwithThemeService } from '../../../core/services/switchTheme/swith-theme.service';
import {
  createSuccessfulCheckBoxList,
  getCheckboxs,
  onChange,
} from '../../../shared/constants';
import { CheckBox } from '../../../shared/interface';

@Component({
  selector: 'app-modal-to-edit-card',
  templateUrl: './modal-to-edit-card.component.html',
  styleUrls: ['./modal-to-edit-card.component.scss'],
})
export class ModalToEditCardComponent {
  editForm: FormGroup;
  error = false;
  checkBoxList!: CheckBox[];
  constructor(
    public dataService: FireDatabaseService,
    public addItemService: QuestionService,
    private router: Router,
    public themeService: SwithThemeService,
    public questionService: QuestionService,
    private formBuilder: FormBuilder
  ) {
    this.checkBoxList = getCheckboxs();
    this.editForm = this.formBuilder.group({
      orders: new FormArray([]),
      titlequestion: new FormControl(
        `${this.dataService.item.title}`,
        Validators.required
      ),
      textquestion: new FormControl(
        `${this.dataService.item.text}`,
        Validators.required
      ),
    });
    this.addCheckboxes();
  }
  get ordersFormArray(): FormArray {
    return this.editForm.controls.orders as FormArray;
  }
  private addCheckboxes(): void {
    this.checkBoxList.forEach((item) => {
      this.dataService.item.tag.includes(item.name)
        ? (item.isselected = !item.isselected)
        : null;
      this.ordersFormArray.push(new FormControl(item.isselected));
    });
  }
  transferDataForOnChange(tag: boolean, i: number): void {
    this.checkBoxList = onChange(tag, i, this.checkBoxList);
  }
  editQuestion(): void {
    let checkBoxListForSend = [];
    checkBoxListForSend = createSuccessfulCheckBoxList(this.checkBoxList);
    if (this.editForm.invalid || !this.editForm.value.orders.includes(true)) {
      this.error = true;
    } else {
      this.dataService.item.text = this.editForm.value.textquestion;
      this.dataService.item.title = this.editForm.value.titlequestion;
      this.dataService.item.tag = checkBoxListForSend;
      this.dataService
        .postEditQuestion()
        .subscribe((data) =>
          this.router.navigate([`question/${this.dataService.currentCardId}`])
        );
    }
  }
  returnOnQuestionCard(): void {
    this.router.navigate([`question/${this.dataService.currentCardId}`]);
  }
}
