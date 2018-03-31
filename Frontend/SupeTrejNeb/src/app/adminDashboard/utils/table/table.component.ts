import {Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import {GLOBAL} from "../../../services/global";

@Component({
  selector: 'tableComponenets',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],

})
export class TableComponent implements OnInit, OnChanges {

  @Input() headsTable:any;
  @Input() bodyTableContent: any;
  @Input() countRecord:number;
  public propertiesContent:any;
  public pagination:number;
  public  counter = Array;
  public url = "";
  @Output() changeItem = new EventEmitter();
  @Output() paginationParams = new EventEmitter();

  constructor() {
    this.url = GLOBAL.url
  }



  ngOnChanges(changes: SimpleChanges): void {
    if(this.bodyTableContent)
    this.propertiesContent = Object.keys(this.bodyTableContent[0]);
    this.pagination = Math.ceil(this.countRecord/10);

  }
  orderByIndexASC(index) {
    let columnProperties = this.propertiesContent[index];
    let table = this.bodyTableContent;
    table.sort(function (a,b) {
      if(a[columnProperties] > b[columnProperties]){
        return 1;
      }
      if(a[columnProperties] < b[columnProperties]){
        return -1;
      }
      return 0;
    });
    this.bodyTableContent = [];
    this.bodyTableContent = table;
  }

  addElement(){
    this.changeItem.emit({
      operation: "create"
    })
  }
  updateElement(item){
    this.changeItem.emit({
      operation: "update",
      items: item
    })
  }
  deleteElement(item){
    this.changeItem.emit({
      operation: "delete",
      items: item
    })
  }

  getRecordByPage(page){
      this.paginationParams.emit({
        page:page
      })
  }

  ngOnInit() {

  }


}
