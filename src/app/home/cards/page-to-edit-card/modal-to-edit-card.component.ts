import { Component, OnInit } from '@angular/core';
import { FireDatabaseService } from '../../../core/services/fire-database.service';
import { QuestionService } from '../../../core/services/question/question.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
export class ModalToEditCardComponent implements OnInit {
  error = false;
  checkBoxList!: CheckBox[];
  editForm: FormGroup = new FormGroup({
    titlequestion: new FormControl(
      `${this.dataService.item.title}`,
      Validators.required
    ),
    textquestion: new FormControl(
      `${this.dataService.item.text}`,
      Validators.required
    ),
    checkquestion: new FormControl('', Validators.required),
  });
  constructor(
    public dataService: FireDatabaseService,
    public addItemService: QuestionService,
    private router: Router,
    public themeService: SwithThemeService,
    public questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.checkBoxList = getCheckboxs();
  }
  transferDataForOnChange(tag: boolean, i: number): void {
    this.checkBoxList = onChange(tag, i, this.checkBoxList);
  }
  editQuestion(): void {
    let checkBoxListForSend = [];
    checkBoxListForSend = createSuccessfulCheckBoxList(this.checkBoxList);
    if (this.editForm.invalid || this.editForm.value.checkquestion === '') {
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
