import {Component, OnInit} from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {CategoryService} from "../../services/category/category.service";
import {DataBrowser} from "../../../utils/dataBrowser";
import {Category} from "../../model/category/category.model";
import { MzToastService } from 'ng2-materialize';

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
  public DELETED_CATEGORY_TITTLE = CONSTANT.Labels.DeleteCategory;
  public DELETED_CATEGORY_SUBTITTLE = CONSTANT.Labels.Confirm_Deleted_Category;
  public LABEL_CATEGORY = CONSTANT.Labels.Category;
  public LABEL_DESCRIPTION_CATEGORY = CONSTANT.Labels.Description;
  public LABEL_IVA_CATEGORY = CONSTANT.Labels.Iva;
  public LABEL_SAVE_CATEGORY = CONSTANT.Labels.Save;
  public LABEL_UPDATE_CATEGORY = CONSTANT.Labels.Update;
  public LABEL_CANCEL_CATEGORY = CONSTANT.Labels.Cancel;
  public LABEL_DELETED_CATEGORY = CONSTANT.Labels.Delete;
  public buttonSaveUpdate:boolean;
  public initStyleTextArea: string = 'materialize-textarea pink-text';
  public validStyleTextArea: string = 'valid materialize-textarea pink-text';
  public invalidStyleTextArea: string = 'invalid materialize-textarea pink-text';
  public classStyleTextArea: string = this.initStyleTextArea;
  public classStyleForm:string = "";
  public invalidClassStyleForm:string = "invalid pink-text";
  public validClassStyleForm:string = "valid pink-text";
  public classStyleFormNum:string = "";
  public initStateStyleForm:string = "pink-text";
  public initState:boolean = true;
  public operationType:string = "";
  public itemIdSelectDeleted:any;
  public searchResult:string;
  public countCategory:number;




  constructor(private _categoryService: CategoryService, private _getDataBrowser: DataBrowser, private toastService: MzToastService) {
    this.categoryModel = new Category({nameCat: "", descriptionCat: "", ivaCat: 0}, {id:""},{page:1},{direccionData: "", navegador: ""});
    this.buttonSaveUpdate = true;
  }

  private clearModal(){
    this.categoryModel.dataCategory.nameCat = "";
    this.categoryModel.dataCategory.descriptionCat = "";
    this.categoryModel.dataCategory.ivaCat = 0;
  }

  validateVisualForm(value){

    switch (value){
      case 'name':
        if(this.categoryModel.dataCategory.nameCat == ""){
          this.classStyleForm = this.invalidClassStyleForm;
        }else{
          this.classStyleForm = this.validClassStyleForm;
        }
        break;
      case 'description':
        if(this.categoryModel.dataCategory.descriptionCat == ""){
          this.classStyleTextArea = this.invalidStyleTextArea;
        }else{
          this.classStyleTextArea = this.validStyleTextArea;
        }
        break;
      case 'number':
        if(this.categoryModel.dataCategory.ivaCat == 0){
          this.classStyleFormNum = this.invalidClassStyleForm;
        }else{
          this.classStyleFormNum = this.validClassStyleForm;
        }
        break;
    }
  }

  private initStateModal(){
    this.classStyleForm = this.initStateStyleForm;
    this.classStyleFormNum = this.initStateStyleForm;
    this.classStyleTextArea = this.initStyleTextArea;
    this.initState = true;
  }

  filterItem(){
    if(this.searchResult && this.searchResult.length > 2) {
      this.filterCategory();
    }else{
      this.getCategories(1);
    }
  }

  addUpdateCategory(event) {

    if (event.operation === CONSTANT.OperationTables.create) {
      this.operationType = CONSTANT.OperationTables.create;
      $('#createCategory').modal('open');
      this.clearModal();
      this.buttonSaveUpdate = true;
      this.initStateModal();
      this.ADD_CATEGORY_TITTLE = CONSTANT.Labels.AddCategory;

    }else if(event.operation === CONSTANT.OperationTables.update && event.items){
      this.operationType = CONSTANT.OperationTables.update;
      $('#createCategory').modal('open');
      this.clearModal();
      this.buttonSaveUpdate = false;
      this.initStateModal();
      let categoryUpdate = event.items;
      this.categoryModel.dataCategory.nameCat = categoryUpdate.name;
      this.validateVisualForm('name');
      this.categoryModel.dataCategory.descriptionCat = categoryUpdate.description;
      this.validateVisualForm('description');
      this.categoryModel.dataCategory.ivaCat = categoryUpdate.iva;
      this.validateVisualForm('number');
      this.categoryModel.identifier.id = categoryUpdate.id;
      this.ADD_CATEGORY_TITTLE = CONSTANT.Labels.ModifyCategory;
    }else if(event.operation === CONSTANT.OperationTables.delete && event.items){
      $('#deletedCategory').modal('open');
      this.itemIdSelectDeleted = event.items;
    }
  }

  onSubmit(createUpdateForm) {

    this.categoryModel.direccionIp.navegador = this.browser.browser;
    if(this.operationType == CONSTANT.OperationTables.create){


      this._categoryService.createCategory(this.categoryModel).subscribe(
        response => {
          this.responseServer = response;
          if(this.responseServer && this.responseServer.message === CONSTANT.ResponseServers.Category_Success){
            createUpdateForm.reset();
            this.toastService.show(CONSTANT.messageToast.CATEGORY_NEW_SUCCESS, 4000, 'teal lighten-1');
            this.getCategories(1);
            $('#createCategory').modal('close');



          }else if(this.responseServer && this.responseServer.message === CONSTANT.ResponseServers.Category_InvalidParams){
            this.toastService.show(CONSTANT.ResponseServers.Category_InvalidParams, 4000, 'orange lighten-1');
          }

        }, error => {
          this.toastService.show(CONSTANT.ResponseServers.Category_Error, 4000, 'red accent-2');
        }
      )
    }else{
      this._categoryService.updateCategory(this.categoryModel).subscribe(
        response => {
          this.responseServer = response;
          if(this.responseServer && this.responseServer.message === CONSTANT.ResponseServers.Category_Success_Update){
            createUpdateForm.reset();
            this.toastService.show(CONSTANT.messageToast.CATEGORY_UPDATE_SUCCESS, 4000, 'teal lighten-1');
            this.getCategories(1);
            $('#createCategory').modal('close');
          }else if(this.responseServer && this.responseServer.message === CONSTANT.ResponseServers.Category_InvalidParams){
            this.toastService.show(CONSTANT.ResponseServers.Category_InvalidParams, 4000, 'orange lighten-1');
          }
        }, error => {
          this.toastService.show(CONSTANT.ResponseServers.Category_Error, 4000, 'red accent-2');
        }
      )
    }
  }

  deleteCategory(){
    if(this.itemIdSelectDeleted){
      this.categoryModel.direccionIp.navegador = this.browser.browser;
      this._categoryService.deletedCategory(this.itemIdSelectDeleted.id).subscribe(
        response => {
          this.responseServer = response;
          if(this.responseServer && this.responseServer.message === CONSTANT.ResponseServers.Category_Success_Deleted){
            this.toastService.show(CONSTANT.messageToast.CATEGORY_DELETED_SUCCESS, 4000, 'teal lighten-1');
            this.getCategories(1);
            $('#deletedCategory').modal('close');
          }else{
            this.toastService.show(CONSTANT.ResponseServers.Category_Error, 4000, 'red accent-2');
          }
        }, error => {
          this.toastService.show(CONSTANT.ResponseServers.Category_Error, 4000, 'red accent-2');
        }
      )
    }
  }


  private createInstanceModal(){
    $('.modal').modal();
  }

  ngOnInit() {
    this.createInstanceModal();

    this.getCategories(1);


  }

  private getCategories(page) {
    let skiping = (page -1) *10;
    this.browser = this._getDataBrowser.getDataBrowser();
    this.categoryModel.pagination.page=skiping;
    this.categoryModel.direccionIp.navegador = this.browser.browser;
    this._categoryService.getCategories(this.categoryModel).subscribe(
      response => {
        this.responseServer = response;
        this.bodyTable = this.responseServer.categoryObject;
        this.getCountCategories();
      }, error => {
        this.toastService.show(error.message, 4000, 'red accent-2');
      }
    );
  }


  filterCategory(){
    if(this.searchResult){
      this._categoryService.getCategoriesFildered(this.searchResult).subscribe(
        response=>{
          this.responseServer = response;
          if(this.responseServer.message && this.responseServer.message == CONSTANT.ResponseServers.Category_InvalidParams){
            this.toastService.show(CONSTANT.ResponseServers.Category_InvalidParams, 4000, 'orange lighten-1');
          }else if(this.responseServer.message && this.responseServer.message == CONSTANT.ResponseServers.No_Data_Category){
            this.toastService.show(CONSTANT.messageToast.NO_DATA_CATEGORY, 4000, 'blue darken-1');
          }else{
            this.bodyTable = this.responseServer;
            this.countCategory = 0;
          }
        },error=>{
          this.toastService.show(error.message, 4000, 'red accent-2');
        }
      )
    }
  }

  getCategoriesByPagination(event){
    if(event || event.page){

      this.getCategories(event.page);
    }
  }


  private getCountCategories(){
    this._categoryService.getCountCategies().subscribe(
      response=>{
        this.responseServer = response;
        this.countCategory = this.responseServer.count;
      },error=>{
        this.toastService.show(error.message, 4000, 'red accent-2');
      }

    )
  }
}

