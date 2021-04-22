import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {

  constructor() { }
@Input() dataComment: any;
  ngOnInit(): void {
    console.log(this.dataComment)
  }

}
