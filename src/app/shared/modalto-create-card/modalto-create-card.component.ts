import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '../../core/services/question/question.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';

@Component({
  selector: 'app-modalto-create-card',
  templateUrl: './modalto-create-card.component.html',
  styleUrls: ['./modalto-create-card.component.scss'],
})
export class ModaltoCreateCardComponent implements OnInit {
  error = false;
  createForm: FormGroup = new FormGroup({
    titlequestion: new FormControl('', Validators.required),
    textquestion: new FormControl('', Validators.required),
    checkquestion: new FormControl('', Validators.required),
  });
  constructor(
    public authService: FirebaseService,
    public addItemService: QuestionService,
    public themeService: SwithThemeService
  ) {}

  ngOnInit(): void {}

  newQuestion(): void {
    if (
      this.createForm.controls['titlequestion'].invalid ||
      this.createForm.controls['textquestion'].invalid ||
      this.createForm.value.checkquestion === ''
    ) {
      this.error = true;
    } else {
      this.addItemService.addQuestion(
        this.createForm.value.titlequestion,
        this.createForm.value.textquestion
      );
    }
  }
}
