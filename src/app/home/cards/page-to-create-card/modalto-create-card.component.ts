import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwithThemeService } from '../../../core/services/switchTheme/swith-theme.service';
import {
  createSuccessfulCheckBoxList,
  getCheckboxs,
  onChange,
} from '../../../shared/constants';
import { CheckBox } from '../../../shared/interface';
import {QuestionService} from "../../../core/services/question.service";

@Component({
  selector: 'app-modalto-create-card',
  templateUrl: './modalto-create-card.component.html',
  styleUrls: ['./modalto-create-card.component.scss'],
})
export class ModaltoCreateCardComponent implements OnInit {
  error = false;
  checkBoxList!: CheckBox[];
  createForm: FormGroup = new FormGroup({
    titlequestion: new FormControl('', Validators.required),
    textquestion: new FormControl('', Validators.required),
    checkquestion: new FormControl('', Validators.required),
  });
  constructor(
    public authService: AuthService,
    public dataService: QuestionService,
    public themeService: SwithThemeService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.checkBoxList = getCheckboxs();
  }

  transferDataForOnChange(i: number): void {
     onChange(i, this.checkBoxList);
  }

  newQuestion(): void {
    let checkBoxListForSend = [];
    checkBoxListForSend = createSuccessfulCheckBoxList(this.checkBoxList);
    if (this.createForm.invalid || this.createForm.value.checkquestion === '') {
      this.error = true;
    } else {
      this.dataService
        .postQuestion(
          this.createForm.value.titlequestion,
          this.createForm.value.textquestion,
          checkBoxListForSend
        )
        .subscribe(
          (data) => {
            this.router.navigate(['question']);
          },
          (rez) => {
            alert(`${rez.message}`)
          }
        );
    }
  }
}
