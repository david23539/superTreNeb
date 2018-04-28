import {Component, OnChanges, Input, OnInit, SimpleChanges, EventEmitter, Output} from '@angular/core';
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
  public paginationCurrent:number;
  @Input() categoryObjectList: any = [];
  @Input() categoryUsedList: any = [];
  @Output() saveCategoriesSelected = new EventEmitter();
  public  counter = Array;
  public pagination:number;
  public containerCategories:any;

  constructor() {
    this.paginationCurrent = 10
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.categoryUsedList){

      this.containerCategories = this.categoryObjectList;
      this.pagination = Math.ceil(this.containerCategories.length/10);
      this.categoryObjectList = this.filterCategories(this.containerCategories, this.categoryUsedList);


    }else{
      // console.log(this.countCategories);
    }
  }

  currentPage(page){
    this.paginationCurrent = page*10;
    this.prepareObjectList(this.paginationCurrent, this.containerCategories);
  }

  saveCategories(){

    if(this.categoryUsedList.length > 0){
      this.saveCategoriesSelected.emit({
        objects: this.categoryUsedList,
        result: this.categoryObjectList
      })
    }
  }



  private filterCategories(modifyTable, masterList, del=false){
    for(let i = 0; i < modifyTable.length; i++){
      for(let j=0; j < masterList.length; j++){
        if(modifyTable[i].id === masterList[j].id){
          modifyTable.splice(i,1);
          // break;
        }
      }
    }
    if(!del){
      return this.prepareObjectList(this.paginationCurrent, modifyTable);
    }else{
      return modifyTable;
    }


  }

  order(){

  }

  private prepareObjectList(page, modifyTable){
    this.categoryObjectList = [];
    let listObject = modifyTable;
    if(page == 10){
      page = 0;
    }else{
      page = page - 10;
    }


    for(let i = page; i < page +10; i++){
      if(listObject[i]){
        this.categoryObjectList.push(listObject[i]);
      }else{
        break;
      }
    }
    return this.categoryObjectList;
    // this.categoryObjectList = this.filterCategories(this.categoryObjectList, this.categoryUsedList);
  }



  addCategories(item){
    this.categoryUsedList.push(item);
    this.categoryObjectList = this.filterCategories(this.containerCategories, this.categoryUsedList );
  }

  deletedCategories(item){
    this.containerCategories.push(item);
    this.categoryObjectList = this.containerCategories;
    this.categoryUsedList = this.filterCategories(this.categoryUsedList, this.containerCategories,true);
  }

  ngOnInit() {

  }

}
