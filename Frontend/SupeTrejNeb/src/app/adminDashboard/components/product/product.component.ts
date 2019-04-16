import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {Product} from "../../model/product/product.model";
import {Product_OUT} from "../../model/product/product_OUT.model";
import {DataBrowser} from "../../../utils/dataBrowser";
import {ProductService} from "../../services/product/product.service";
import {CategoryService} from "../../services/category/category.service";
import {Category} from "../../model/category/category.model";
import {MzToastService} from "ng2-materialize";
import {UploadService} from "../../services/uploadFiles/upload.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService, DataBrowser, MzToastService, CategoryService,UploadService],
  host:{
    '(document:keyup)':'getValueKey($event)',
    //'(document:keypress)':'prueba($event)',
  }
})
export class ProductComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.ProductTitle;
  public ADD_PRODUCT_TITTLE:string = CONSTANT.Labels.AddProduct;
  public UPDATE_PRODUCT_TITTLE:string = CONSTANT.Labels.UpdateProduct;

  public LABEL_SAVE_PRODUCT:string = CONSTANT.Labels.Save;
  public LABEL_CANCEL_PRODUCT:string = CONSTANT.Labels.Cancel;
  public DELETED_PRODUCT_TITTLE:string = CONSTANT.Labels.DeleteProduct;
  public DELETED_PRODUCT_SUBTITTLE:string = CONSTANT.Labels.Confirm_Deleted_Product;
  public LABEL_DELETED_PRODUCT:string = CONSTANT.Labels.Delete;
  public LABEL_UPDATE_PRODUCT:string = CONSTANT.Labels.Update;
  public TOLLTIP_NAME_PRODUCT:string = CONSTANT.Labels.TooltipNameProduct;
  public TOLLTIP_DES_PRODUCT:string = CONSTANT.Labels.TooltipDesProduct;
  public TOLLTIP_IVA_PRODUCT:string = CONSTANT.Labels.TooltipIvaProduct;
  public TOLLTIP_COST_PRODUCT:string = CONSTANT.Labels.TooltipCostProduct;
  public TOLLTIP_REF_PRODUCT:string = CONSTANT.Labels.TooltipRefProduct;
  public TOLLTIP_MARGIN_PRODUCT:string = CONSTANT.Labels.TooltipMarginProduct;
  public TOLLTIP_STOCK_PRODUCT:string = CONSTANT.Labels.TooltipStockProduct;
  public QUESTIONIMAGE:string = CONSTANT.Labels.QuestionImage;
  public QUESTIONIMAGECHANGE:string = CONSTANT.Labels.QuestionImageChange;
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
  public STOCKMINI:string =CONSTANT.Labels.StockMin;
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
  @Output() sendProduct = new EventEmitter();
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
  public codeProduct:string = "";
  public quantityTotalProd = 0;

  prueba(evento){
      let result = CONSTANT.hotkeys.find((elemento)=>{
        return elemento == evento.key;
      });
    if(result === undefined){
      this.codeProduct += evento.key;
    }else{
      let code = {
        key : this.codeProduct
      };
      this.codeProduct = "";
      this.getValueKey(code);


    }
  }

  constructor(private _route: ActivatedRoute, private _notification:NotificationService, private _productService:ProductService, private _getDataBrowser: DataBrowser, private toastService: MzToastService, private _categoryService: CategoryService,
              private _uploadFile:UploadService) {
    this.inicializateObject();
    this.productModel_OUT = new Product_OUT({id: ""});
    this.categoryObject_IN = new Category({
      nameCat:"",
      descriptionCat:"",
      ivaCat:0},{id:""},{page:0},{direccionData:"",navegador:this.browser});
  }
  private inicializateObject(){
    this.productModel_IN = new Product({nameProd:"", image:"",catProd:"",descriptProd:"",refProd:"",ivaProd:0,marginProd:0,stock:0,stockMin:0,favorite:false,costProd:0},
      {id:""},
      {page:0},
      {direccionData:"",navegador:""});
  }

  getValueKey(content){

    let returnKey = CONSTANT.hotkeys.find((elemet)=>{
      return elemet == content.key;
    });
    if(!returnKey && content.key.length >= 7 && content.key.length <= 13){
      this.productModel_IN.dataProduct.refProd = content.key;
    }
  }

  calculateTotal(){

    let costIva = this.productModel_IN.dataProduct.costProd + ((this.productModel_IN.dataProduct.costProd * this.productModel_IN.dataProduct.ivaProd)/100);
    this.quantityTotalProd = costIva + ((costIva * this.productModel_IN.dataProduct.marginProd)/100);
    this.quantityTotalProd.toFixed(2);
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
    this.checkCodeBar();
    this.getAllCategories();
  }



  private clearModal(){
    this.inicializateObject();
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

  deleteProduct(){
    this._productService.deletedProduct(this.productModel_OUT.identifier.id).subscribe(
      response =>{
        this.toastService.show(CONSTANT.messageToast.PRODUCT_DELETED_SUCCESS, 4000, CONSTANT.Styles.Success);
        this.getProducts(1);
      },error =>{
        this.toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  purgueProducts() {
    this._productService.purgeProducts().subscribe(
      response =>{
        this.toastService.show(CONSTANT.messageToast.PRODUCT_DELETED_SUCCESS, 4000, CONSTANT.Styles.Success);
        this.getProducts(1);
      },error =>{
        this.toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
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
  private checkCodeBar(){
    this._route.params.forEach((params:Params)=>{
      let code = params['codeBar'];

      if(code){
        let event = {
          operation: CONSTANT.OperationTables.create
        };
        this.addUpdateProduct(event);
        this.productModel_IN.dataProduct.refProd = code;
      }
    });
  }
  addUpdateProduct(event){
    if (event.operation === CONSTANT.OperationTables.create) {
      this.operationType = CONSTANT.OperationTables.create;
      $('#productModal').modal('open');
      this.clearModal();
      this.buttonSaveUpdate = true;
      this.initStateModal();
      this.getAllCategories();
      this.productModel_OUT.identifier.id = event.items.id;
    }else if(event.operation === CONSTANT.OperationTables.update && event.items){
      this.operationType = CONSTANT.OperationTables.update;
      $('#productModal').modal('open');
      this.clearModal();
      this.buttonSaveUpdate = false;
      this.initStateModal();
      this.getAllCategories();
      this.setProperties(event.items);
      this.productModel_OUT.identifier.id = event.items.id;
    }else if(event.operation === CONSTANT.OperationTables.delete && event.items){
      $('#deletedProduct').modal('open');
      this.productModel_OUT.identifier.id = event.items.id;

    }
  }

  private setProperties(items){
    this.productModel_IN.dataProduct.catProd = items.category.id;
    // this.selectItemCategory = items.category.id;
    this.productModel_IN.dataProduct.costProd = items.cost;
    this.productModel_IN.dataProduct.descriptProd = items.description;
    this.productModel_IN.dataProduct.ivaProd = items.iva;
    this.productModel_IN.dataProduct.marginProd = items.margin;
    this.productModel_IN.dataProduct.nameProd = items.name;
    this.productModel_IN.dataProduct.refProd = items.reference;
    this.productModel_IN.dataProduct.stock = items.stock;
    this.productModel_IN.dataProduct.favorite = items.favorite;
    this.productModel_IN.identifier.id = items.id;
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

  getProductsByCategories(id) {
    if(this.selectItemCategory) {
      this._productService.getProductByCategory(this.categoryObject_OUT[id].id).subscribe(
        response => {
          this.responseServer = response;
          this.bodyTable = this.responseServer.products
        }, error => {
          this.toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }
  }

  private emitProduct(){
    this.sendProduct.emit({
      products: this.bodyTable,
      count: this.countProduct
    })
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
        if(this.responseServer.message === CONSTANT.ResponseServers.No_Data_Product){
          this.toastService.show(CONSTANT.ResponseServers.No_Data_Product, 4000, CONSTANT.Styles.Info);
        }else{
          this.countProduct = this.responseServer.count;
          this.emitProduct();
        }
      }
    )
  }

  onSubmit(createUpdateForm){
    if( this.operationType === CONSTANT.OperationTables.create){
      if(this.selectItemCategory){
        this.productModel_IN.direccionIp.navegador = this.browser.browser;
        this.productModel_IN.dataProduct.catProd = this.categoryObject_OUT[this.selectItemCategory].id;
        this._productService.createProduct(this.productModel_IN).subscribe(
          response=>{
            this.responseServer = response;
            if(this.responseServer.message !== CONSTANT.ResponseServers.InvalidParams){
              this.productModel_OUT.identifier.id = this.responseServer.id;
              this.toastService.show(CONSTANT.messageToast.PRODUCT_NEW_SUCCESS, 4000, CONSTANT.Styles.Success);
              this.getProducts(1);
              $('#productModal').modal('close');
              $('#imageProductModal').modal('open');
            }else{
              this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
            }

          },error=>{
            this.toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
          }
        )
      }else{
        this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
      }

    }else if(this.operationType === CONSTANT.OperationTables.update){
      if(this.selectItemCategory){
        this.productModel_IN.dataProduct.catProd = this.categoryObject_OUT[this.selectItemCategory].id;
      }
      this.productModel_IN.direccionIp.navegador = this.browser.browser;
      this._productService.updateProduct(this.productModel_IN).subscribe(
        response =>{
          this.responseServer = response;
          if(this.responseServer.message !== CONSTANT.ResponseServers.InvalidParams){
            this._notification.changeNotification(this.responseServer.products);
            this.toastService.show(CONSTANT.ResponseServers.Product_Success_Update, 4000, CONSTANT.Styles.Success);
            this.getProducts(1);
            $('#productModal').modal('close');
            $('#imageProductModal').modal('open');
          }else{
            this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
          }
        },error=>{
          this.toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }
  }


}
