import { Component} from '@angular/core';
import { FireDatabaseService } from '../../../core/services/fire-database.service';
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
    private router: Router,
    public themeService: SwithThemeService,
    private formBuilder: FormBuilder
  ) {
    if (!this.dataService.item) {
      this.router.navigate(['question']);
    }
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

  transferDataForOnChange(i: number): void {
    onChange(i, this.checkBoxList);
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
        .postEditQuestion(this.dataService.item.id, this.dataService.item)
        .subscribe(
          (data) =>
            this.router.navigate([`question/${this.dataService.item.id}`]),
          (rez) => {
            alert(`${rez.message}`);
          }
        );
    }
  }
  returnOnQuestionCard(): void {
    this.router.navigate([`question/${this.dataService.item.id}`]);
  }
}
