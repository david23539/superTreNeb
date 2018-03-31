import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {Product} from "../../model/product/product.model";
import {DataBrowser} from "../../../utils/dataBrowser";
import {ProductService} from "../../services/product/product.service";
import {MzToastService} from "ng2-materialize";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService, DataBrowser, MzToastService]
})
export class ProductComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.ProductTitle;
  public ADD_PRODUCT_TITTLE:string = CONSTANT.Labels.AddProduct;
  public TOLLTIP_NAME_PRODUCT:string = CONSTANT.Labels.TooltipNameProduct;
  public TOLLTIP_DES_PRODUCT:string = CONSTANT.Labels.TooltipDesProduct;
  public TOLLTIP_IVA_PRODUCT:string = CONSTANT.Labels.TooltipIvaProduct;
  public TOLLTIP_COST_PRODUCT:string = CONSTANT.Labels.TooltipCostProduct;
  public TOLLTIP_REF_PRODUCT:string = CONSTANT.Labels.TooltipRefProduct;
  public TOLLTIP_MARGIN_PRODUCT:string = CONSTANT.Labels.TooltipMarginProduct;
  public TOLLTIP_STOCK_PRODUCT:string = CONSTANT.Labels.TooltipStockProduct;
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
  public productModel:Product;
  public browser: any;
  public responseServer:any;
  public countProduct:number;
  public operationType:string = "";
  public buttonSaveUpdate:boolean;
  public prueba = [{cod:"1", value: "aaa"},{cod:"2", value: "bbb"},{cod:"3", value: "ccc"}];
  public selectValue:any;

  public classStyleFormName:string = "";
  public invalidClassStyleFormName:string = CONSTANT.Styles.Invalid;
  public validClassStyleFormName:string = CONSTANT.Styles.Valid;
  public classStyleFormDes:string = "materialize-textarea pink-text";
  public invalidClassStyleFormDes:string = "valid materialize-textarea pink-text";
  public validClassStyleFormDes:string = "invalid materialize-textarea pink-text";
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

  constructor(private _productService:ProductService, private _getDataBrowser: DataBrowser, private toastService: MzToastService) {
    this.productModel = new Product({nameProd:"", image:"",catProd:"",descriptProd:"",refProd:"",ivaProd:0,marginProd:0,stock:0,costProd:0},
      {id:""},
      {page:0},
      {direccionData:"",navegador:""})
  }

  filterItem(){

  }

  ngOnInit() {
    $('.modal').modal();
    this.getProducts(1)
  }

  private clearModal(){

  }

  private initStateModal(){

  }

  probarDesplegable(){
    console.log(this.productModel.dataProduct.catProd)
  }

  validateVisualForm(value){
    switch (value){
      case "name":
        if(this.productModel.dataProduct.nameProd){
          this.classStyleFormName = this.validClassStyleFormName;
        }else{
          this.classStyleFormName = this.invalidClassStyleFormName;
        }
        break;
      case "description":
        if(this.productModel.dataProduct.descriptProd){
          this.classStyleFormDes = this.validClassStyleFormDes;
        }else{
          this.classStyleFormDes = this.invalidClassStyleFormDes;
        }
        break;
      case "iva":
        if(this.productModel.dataProduct.ivaProd){
          this.classStyleFormIva = this.validClassStyleFormIva;
        }else{
          this.classStyleFormIva = this.invalidClassStyleFormIva;
        }
        break;
      case "cost":
        if(this.productModel.dataProduct.costProd){
          this.classStyleFormCost = this.validClassStyleFormCost;
        }else{
          this.classStyleFormCost = this.invalidClassStyleFormCost;
        }
        break;
      case "ref":
        if(this.productModel.dataProduct.refProd){
          this.classStyleFormRef = this.validClassStyleFormRef;
        }else{
          this.classStyleFormRef = this.invalidClassStyleFormRef;
        }
        break;
      case "margi":
        if(this.productModel.dataProduct.marginProd){
          this.classStyleFormMar = this.validClassStyleFormMar;
        }else{
          this.classStyleFormMar = this.invalidClassStyleFormMar;
        }
        break;
      case "stock":
        if(this.productModel.dataProduct.stock){
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

  private getProducts(page){
    let skiping = (page -1) *10;
    this.browser = this._getDataBrowser.getDataBrowser();
    this.productModel.pagination.page = skiping;
    this.productModel.direccionIp.navegador = this.browser.browser;
    this._productService.getProduct(this.productModel).subscribe(
      response=>{
        this.responseServer = response;
        this.bodyTable = this.responseServer.products;
        this.getCountCategories();
      },error=>{

      }
    )
  }

  private getCountCategories(){
    this._productService.getCountProduct().subscribe(
      response =>{
        this.responseServer = response;
        this.countProduct = this.responseServer
      }
    )
  }

  onSubmit(createUpdateForm){

  }
}
