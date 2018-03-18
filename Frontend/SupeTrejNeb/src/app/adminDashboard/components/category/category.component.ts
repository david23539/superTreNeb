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
  public bodyTable: any;
  public browser: any;
  public responseServer: any;
  public categoryModel: Category;
  public ADD_CATEGORY_TITTLE = CONSTANT.Labels.AddCategory;
  public LABEL_CATEGORY = CONSTANT.Labels.Category;
  public LABEL_DESCRIPTION_CATEGORY = CONSTANT.Labels.Description;
  public LABEL_IVA_CATEGORY = CONSTANT.Labels.Iva;
  public LABEL_SAVE_CATEGORY = CONSTANT.Labels.Save;
  public LABEL_CANCEL_CATEGORY = CONSTANT.Labels.Cancel;
  public inputEmpty: string = CONSTANT.Labels.Control_Input_Required;


  constructor(private _categoryService: CategoryService, private _getDataBrowser: DataBrowser, private toastService: MzToastService) {
    this.categoryModel = new Category({nameCat: "", descriptionCat: "", ivaCat: 0}, {direccionData: "", navegador: ""});


  }


  addCategory(event) {
    if (event.operation === CONSTANT.OperationTables.create) {
      $('#createCategory').modal('open');
    }
  }

  onSubmit(createUpdateForm) {
    this.categoryModel.direccionIp.navegador = this.browser.browser;
    this._categoryService.createCategory(this.categoryModel).subscribe(
      response => {
        this.responseServer = response;
        if(this.responseServer && this.responseServer.message === CONSTANT.ResponseServers.Category_Success){
          createUpdateForm.reset();
          this.toastService.show(CONSTANT.messageToast.CATEGORY_NEW_SUCCESS, 4000, 'teal lighten-1');
          this.getCategories();
          $('#createCategory').modal('close');


        }else if(this.responseServer && this.responseServer.message === CONSTANT.ResponseServers.Category_InvalidParams){
          this.toastService.show(CONSTANT.ResponseServers.Category_InvalidParams, 4000, 'orange lighten-1');
        }

      }, error => {
        this.toastService.show(CONSTANT.ResponseServers.Category_Error, 4000, 'red accent-2');
      }
    )
  }




  ngOnInit() {
    $('.modal').modal();
    this.getCategories();


  }

  private getCategories() {
    this.browser = this._getDataBrowser.getDataBrowser();
    this.categoryModel.direccionIp.navegador = this.browser.browser;
    this._categoryService.getCategories(this.categoryModel).subscribe(
      response => {
        this.responseServer = response;
        this.bodyTable = this.responseServer.categoryObject;
      }, error => {
        this.toastService.show(error.message, 4000, 'red accent-2');
      }
    );
  }
}
