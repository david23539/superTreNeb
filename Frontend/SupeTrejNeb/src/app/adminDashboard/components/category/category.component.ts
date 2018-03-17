import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {CategoryService} from "../../services/category/category.service";
import {DataBrowser} from "../../../utils/dataBrowser";
import {Category} from "../../model/category/category.model";
import { MzToastService } from 'ng2-materialize';
import { MzModalService } from 'ng2-materialize';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService, DataBrowser, MzToastService]
})
export class CategoryComponent implements OnInit {
  public headsTables = CONSTANT.headCategory;
  public TITLE = "Categorías";
  public bodyTable:any;
  public browser:any;
  public responseServer:any;
  public categoryModel:Category;
  public ADD_CATEGORY_TITTLE= CONSTANT.Labels.AddCategory;


  constructor(private _categoryService:CategoryService, private _getDataBrowser:DataBrowser, private toastService: MzToastService) {
    this.categoryModel = new Category({direccionData:"",navegador:""});

  }




  addCategory(event){
    if(event.operation === CONSTANT.OperationTables.create){
      $('#createCategory').modal('open');
    }


  }

  ngOnInit() {
    $('.modal').modal();

    this.browser = this._getDataBrowser.getDataBrowser();
    this.categoryModel.direccionIp.navegador = this.browser.browser;
    this._categoryService.getCategories(this.categoryModel).subscribe(
      response =>{
        this.responseServer = response;
        this.bodyTable = this.responseServer.categoryObject;
      },error =>{
        this.toastService.show(error.message, 4000, 'red accent-2' );
      }
    );
  }

}
