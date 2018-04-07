import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {Product} from "../../model/product/product.model";
import {Product_OUT} from "../../model/product/product_OUT.model";
import {DataBrowser} from "../../../utils/dataBrowser";
import {ProductService} from "../../services/product/product.service";
import {CategoryService} from "../../services/category/category.service";
import {Category} from "../../model/category/category.model";
import {MzToastService} from "ng2-materialize";
import {UploadService} from "../../services/uploadFiles/upload.service";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService, DataBrowser, MzToastService, CategoryService,UploadService]
})
export class ProductComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.ProductTitle;
  public ADD_PRODUCT_TITTLE:string = CONSTANT.Labels.AddProduct;
  public LABEL_SAVE_PRODUCT:string = CONSTANT.Labels.Save;
  public LABEL_CANCEL_PRODUCT:string = CONSTANT.Labels.Cancel;
  public TOLLTIP_NAME_PRODUCT:string = CONSTANT.Labels.TooltipNameProduct;
  public TOLLTIP_DES_PRODUCT:string = CONSTANT.Labels.TooltipDesProduct;
  public TOLLTIP_IVA_PRODUCT:string = CONSTANT.Labels.TooltipIvaProduct;
  public TOLLTIP_COST_PRODUCT:string = CONSTANT.Labels.TooltipCostProduct;
  public TOLLTIP_REF_PRODUCT:string = CONSTANT.Labels.TooltipRefProduct;
  public TOLLTIP_MARGIN_PRODUCT:string = CONSTANT.Labels.TooltipMarginProduct;
  public TOLLTIP_STOCK_PRODUCT:string = CONSTANT.Labels.TooltipStockProduct;
  public QUESTIONIMAGE:string = CONSTANT.Labels.QuestionImage;
  public NO:string = CONSTANT.Labels.No;
  public YES:string = CONSTANT.Labels.Yes;
  public NAME:string =CONSTANT.Labels.Name;
  public DESCRIPTION:string =CONSTANT.Labels.Description;
  public IVA:string =CONSTANT.Labels.Iva;
  public COST:string =CONSTANT.Labels.Cost;
  public REF:string =CONSTANT.Labels.Ref;
  public MARG:string =CONSTANT.Labels.Margin;
  public CATEGORY:string =CONSTANT.Labels.Category;
  public STOCK:string =CONSTANT.Labels.Stock;
  public searchResult:string = "";
  public ProductSearch: string = CONSTANT.Labels.SearchProducts;
  public headsTables:any = CONSTANT.headProduct;
  public bodyTable: any;
  public productModel_IN:Product;
  public productModel_OUT:Product_OUT;
  public browser: any;
  public responseServer:any;
  public countProduct:number;
  public operationType:string = "";
  public buttonSaveUpdate:boolean;
  public categoryObject_OUT: any;
  public categoryObject_IN : Category;
  public selectItemCategory:number;
  public filesToUpload: Array<File>;

  public classStyleFormName:string = "";
  public invalidClassStyleFormName:string = CONSTANT.Styles.Invalid;
  public validClassStyleFormName:string = CONSTANT.Styles.Valid;
  public classStyleFormDes:string = "materialize-textarea pink-text";
  public invalidClassStyleFormDes:string = "invalid materialize-textarea pink-text";
  public validClassStyleFormDes:string = "valid materialize-textarea pink-text";
  public classStyleFormIva:string = "";
  public invalidClassStyleFormIva:string = CONSTANT.Styles.Invalid;
  public validClassStyleFormIva:string = CONSTANT.Styles.Valid;
  public classStyleFormCost:string = "";
  public invalidClassStyleFormCost:string = CONSTANT.Styles.Invalid;
  public validClassStyleFormCost:string = CONSTANT.Styles.Valid;
  public classStyleFormRef:string = "";
  public invalidClassStyleFormRef:string = CONSTANT.Styles.Invalid;
  public validClassStyleFormRef:string = CONSTANT.Styles.Valid;
  public classStyleFormMar:string = "";
  public invalidClassStyleFormMar:string = CONSTANT.Styles.Invalid;
  public validClassStyleFormMar:string = CONSTANT.Styles.Valid;
  public classStyleFormSto:string = "";
  public invalidClassStyleFormSto:string = CONSTANT.Styles.Invalid;
  public validClassStyleFormSto:string = CONSTANT.Styles.Valid;

  constructor(private _productService:ProductService, private _getDataBrowser: DataBrowser, private toastService: MzToastService, private _categoryService: CategoryService,
      private _uploadFile:UploadService) {
    this.productModel_IN = new Product({nameProd:"", image:"",catProd:"",descriptProd:"",refProd:"",ivaProd:0,marginProd:0,stock:0,costProd:0},
      {id:""},
      {page:0},
      {direccionData:"",navegador:""});
    this.productModel_OUT = new Product_OUT({id: ""});
    this.categoryObject_IN = new Category({
      nameCat:"",
      descriptionCat:"",
      ivaCat:0},{id:""},{page:0},{direccionData:"",navegador:this.browser});
  }

  changeIva(){
    this.productModel_IN.dataProduct.ivaProd = this.categoryObject_OUT[this.selectItemCategory].iva;
  }

  filterItem(){
    if(this.searchResult.length >= 3){
      this._productService.filterProduct(this.searchResult).subscribe(
        response=>{
          this.responseServer = response;
          this.bodyTable = this.responseServer.products
        },error=>{
          this.toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )

    }else{
      this.getProducts(1);
    }

  }

  submitImage(){
    if(this.filesToUpload){
      let url = 'uploadImageProduct/' + this.productModel_OUT.identifier.id;
      this._uploadFile.makeFileRequest(url, [], this.filesToUpload, "image")
        .then((result:any)=>{
          this.getProducts(1);
          this.toastService.show(CONSTANT.messageToast.PRODUCT_UPDATE_SUCCESS, 4000, CONSTANT.Styles.Success);
        })
    }
  }

  fileChangeevent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  ngOnInit() {
    $('.modal').modal();
    this.getProducts(1)
  }

  private clearModal(){

  }

  private initStateModal(){
    this.classStyleFormName = "";
    this.classStyleFormDes = "materialize-textarea pink-text";
    this.classStyleFormIva = "";
    this.classStyleFormCost = "";
    this.classStyleFormRef = "";
    this.classStyleFormMar = "";
    this.classStyleFormSto = "";

  }


  validateVisualForm(value){
    switch (value){
      case "name":
        if(this.productModel_IN.dataProduct.nameProd){
          this.classStyleFormName = this.validClassStyleFormName;
        }else{
          this.classStyleFormName = this.invalidClassStyleFormName;
        }
        break;
      case "description":
        if(this.productModel_IN.dataProduct.descriptProd){
          this.classStyleFormDes = this.validClassStyleFormDes;
        }else{
          this.classStyleFormDes = this.invalidClassStyleFormDes;
        }
        break;
      case "iva":
        if(this.productModel_IN.dataProduct.ivaProd){
          this.classStyleFormIva = this.validClassStyleFormIva;
        }else{
          this.classStyleFormIva = this.invalidClassStyleFormIva;
        }
        break;
      case "cost":
        if(this.productModel_IN.dataProduct.costProd){
          this.classStyleFormCost = this.validClassStyleFormCost;
        }else{
          this.classStyleFormCost = this.invalidClassStyleFormCost;
        }
        break;
      case "ref":
        if(this.productModel_IN.dataProduct.refProd){
          this.classStyleFormRef = this.validClassStyleFormRef;
        }else{
          this.classStyleFormRef = this.invalidClassStyleFormRef;
        }
        break;
      case "margi":
        if(this.productModel_IN.dataProduct.marginProd){
          this.classStyleFormMar = this.validClassStyleFormMar;
        }else{
          this.classStyleFormMar = this.invalidClassStyleFormMar;
        }
        break;
      case "stock":
        if(this.productModel_IN.dataProduct.stock){
          this.classStyleFormSto = this.validClassStyleFormSto;
        }else{
          this.classStyleFormSto = this.invalidClassStyleFormSto;
        }
        break;
    }

  }

  addUpdateProduct(event){
    if (event.operation === CONSTANT.OperationTables.create) {
      this.operationType = CONSTANT.OperationTables.create;
      $('#productModal').modal('open');
      this.clearModal();
      this.buttonSaveUpdate = true;
      this.initStateModal();
      this.getAllCategories();

    }else if(event.operation === CONSTANT.OperationTables.update && event.items){
      this.operationType = CONSTANT.OperationTables.update;
      $('#productModal').modal('open');
      this.clearModal();
      this.buttonSaveUpdate = false;
      this.initStateModal();
      let productUpdate = event.items;
    }
  }

  getProductsByPagination(event){
    if(event || event.page){
      this.getProducts(event.page);
    }
  }

  private getAllCategories(){
    if(!this.categoryObject_OUT){
      this._categoryService.getAllCategories(this.categoryObject_IN).subscribe(
        response=>{
          this.responseServer = response;
          this.categoryObject_OUT = this.responseServer.categoryObject;
        },error=>{
          this.toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }
  }

  private getProducts(page){
    let skiping = (page -1) *10;
    this.browser = this._getDataBrowser.getDataBrowser();
    this.productModel_IN.pagination.page = skiping;
    this.productModel_IN.direccionIp.navegador = this.browser.browser;
    this._productService.getProduct(this.productModel_IN).subscribe(
      response=>{
        this.responseServer = response;
        this.bodyTable = this.responseServer.products;
        this.getCountProduct();
      },error=>{
        this.toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  private getCountProduct(){
    this._productService.getCountProduct().subscribe(
      response =>{
        this.responseServer = response;
        this.countProduct = this.responseServer.count;
      }
    )
  }

  onSubmit(createUpdateForm){
    if( this.operationType === CONSTANT.OperationTables.create){
      if(this.selectItemCategory){
        this.productModel_IN.dataProduct.catProd = this.categoryObject_OUT[this.selectItemCategory].id;
        this._productService.createProduct(this.productModel_IN).subscribe(
          response=>{
            this.responseServer = response;
            if(this.responseServer.message !== CONSTANT.ResponseServers.InvalidParams){
              createUpdateForm.reset();
              this.productModel_OUT.identifier.id = this.responseServer.id;
              this.toastService.show(CONSTANT.messageToast.PRODUCT_NEW_SUCCESS, 4000, CONSTANT.Styles.Success);
              this.getProducts(1);
              $('#productModal').modal('close');
              $('#imageProductModal').modal('open');
            }else{
              this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
              createUpdateForm.reset();
            }

          },error=>{
            this.toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
          }
        )
      }else{
        this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
      }

    }

  }


}
