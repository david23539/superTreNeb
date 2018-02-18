import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'breadcums',
  templateUrl: './breadcums.component.html',
  styleUrls: ['./breadcums.component.css']
})
export class BreadcumsComponent implements OnInit {

  @Input() breadcumsTags:any;

  constructor() { }

  ngOnInit() {
  }

}
