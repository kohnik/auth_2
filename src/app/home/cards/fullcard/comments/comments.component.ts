import { Component, OnInit, OnDestroy } from '@angular/core';
import { FireDatabaseService } from '../../../../core/services/fire-database.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  toCreateComment = false;
  constructor(public dataService: FireDatabaseService) {}

  ngOnInit(): void {}
  ngOnDestroy(): void  {

    this.dataService.comments =[]
  }

  openToCreateComment(): void {
    this.toCreateComment = true;
  }
  closeToCreateComment(): void {
    this.toCreateComment = false;
    console.log(1);
  }
}
