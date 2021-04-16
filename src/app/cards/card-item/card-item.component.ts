import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  dateCreatin: any;
  zeroForMin: string = '';
  zeroForMonth: string = '';
  @Input() item: any;
  constructor() {}

  ngOnInit(): void {}
  getDateCreation(date: any) {
    this.dateCreatin = new Date(+date);
   if(this.dateCreatin.getMinutes()<10)
   {
     this.zeroForMin = '0';
   }
    if(this.dateCreatin.getMonth()<10)
    {
      this.zeroForMonth = '0';
    }
    return this.dateCreatin =  `${this.dateCreatin.getDate()}.${this.zeroForMonth}${this.dateCreatin.getMonth()}.${this.dateCreatin.getFullYear()} \n
    ${this.dateCreatin.getHours()}:${ this.zeroForMin}${this.dateCreatin.getMinutes()}`;
  }
}
