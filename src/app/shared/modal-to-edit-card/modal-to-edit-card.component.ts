import { Component, OnInit } from '@angular/core';
import { FireDatabaseService } from '../../core/services/fire-database.service';
import { QuestionService } from '../../core/services/question/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-modal-to-edit-card',
  templateUrl: './modal-to-edit-card.component.html',
  styleUrls: ['./modal-to-edit-card.component.scss'],
})
export class ModalToEditCardComponent implements OnInit {
  error = false;
  editForm: FormGroup = new FormGroup({
    titlequestion: new FormControl(
      `${this.dataService.itemForEdit.title}`,
      Validators.required
    ),
    textquestion: new FormControl(
      `${this.dataService.itemForEdit.text}`,
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

    console.log(this.editForm.value);
    console.log(this.dataService.itemForEdit);
  }

  editQuestion() {
    if (
      this.editForm.controls['titlequestion'].invalid ||
      this.editForm.controls['textquestion'].invalid ||
      this.editForm.value.checkquestion === ''
    ) {
      this.error = true;
    } else {
      this.addItemService.createCheckboxList();
      this.dataService.itemForEdit.text = this.editForm.value.textquestion;
      this.dataService.itemForEdit.title = this.editForm.value.titlequestion;
      this.dataService.item = this.dataService.itemForEdit;
      this.dataService.item.tag = this.addItemService.checkBoxListToSend;
      this.dataService
        .postEditQuestion()
        .subscribe((data) => this.router.navigate(['question']));
    }
  }
}
