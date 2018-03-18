import {Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';

@Component({
  selector: 'tableComponenets',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],

})
export class TableComponent implements OnInit, OnChanges {

  @Input() headsTable:any;
  @Input() bodyTableContent: any;
  @Input() title:any;
  public propertiesContent:any;
  public searchResult:string;
  @Output() createItem = new EventEmitter();
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.bodyTableContent)
    this.propertiesContent = Object.keys(this.bodyTableContent[0]);

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
    this.createItem.emit({
      operation: "create"
    })
  }

  ngOnInit() {

  }


}
