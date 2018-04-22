import {Component, OnChanges, Input, OnInit, SimpleChanges} from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {log} from "util";

@Component({
  selector: 'select-categories',
  templateUrl: './select-categories.component.html',
  styleUrls: ['./select-categories.component.css']
})
export class SelectCategoriesComponent implements OnInit,  OnChanges{
  public headsTable = CONSTANT.headListCategories;
  public LAVEL_CATEGORY_USED = CONSTANT.Labels.CategoriesUsed;
  public LAVEL_CATEGORY_NO_USED = CONSTANT.Labels.CategoriesNoUsed;
  public LABEL_SAVE_CATEGORY = CONSTANT.Labels.Save;
  @Input() categoryObjectList: any = [];
  @Input() categoryUsedList: any = [];
  public  counter = Array;
  public pagination:number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.categoryUsedList){
      this.pagination = Math.ceil(this.categoryObjectList.length/10);
      this.categoryObjectList = SelectCategoriesComponent.filterCategories(this.categoryObjectList, this.categoryUsedList);

    }else{
      // console.log(this.countCategories);
    }
  }

  private static filterCategories(modifyTable, masterList){
    for(let i = 0; i < modifyTable.length; i++){
      for(let j=0; j < masterList.length; j++){
        if(modifyTable[i].id === masterList[j].id){
          modifyTable.splice(i,1);
          break;
        }
      }
    }
    return modifyTable;
  }

  order(){

  }



  addCategories(item){
    this.categoryUsedList.push(item);
    this.categoryObjectList = SelectCategoriesComponent.filterCategories(this.categoryObjectList, this.categoryUsedList);
  }

  deletedCategories(item){
    this.categoryObjectList.push(item);
    this.categoryUsedList = SelectCategoriesComponent.filterCategories(this.categoryUsedList, this.categoryObjectList);
  }

  ngOnInit() {

  }

}
