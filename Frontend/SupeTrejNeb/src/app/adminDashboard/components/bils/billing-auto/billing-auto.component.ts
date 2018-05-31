import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../../services/constant";
import {ProviderComponent} from "../../provider/provider.component";
import {ProviderService} from "../../../services/provider/provider.service";
import {CategoryService} from "../../../services/category/category.service";
import {CategoryComponent} from "../../category/category.component";
import {SelectCategoriesComponent} from "../../select-categories/select-categories.component";
import {PersonsComponent} from "../../persons/persons.component";
import {PersonService} from "../../../services/person/person.service";
import {AddressComponent} from "../../address/address.component";
import {AddressService} from "../../../services/address/address.service";
import {UploadService} from "../../../services/uploadFiles/upload.service";
import {MzToastService} from "ng2-materialize";
import {DataBrowser} from "../../../../utils/dataBrowser";
import {BillService} from "../../../services/bill/bill.service";
import {BillData} from "../../../model/bill/bill.model";
import {ProductService} from "../../../services/product/product.service";
import {ProductComponent} from "../../product/product.component";
import {BillAutoModel} from "../../../model/bill/billAuto.model";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-billing-auto',
  templateUrl: './billing-auto.component.html',
  styleUrls: ['./billing-auto.component.css'],
  providers: [ProviderComponent, ProviderService, CategoryComponent, CategoryService, SelectCategoriesComponent,
  PersonService, PersonsComponent, AddressComponent,AddressService, UploadService, MzToastService, DataBrowser, BillService,
  ProductService, ProductComponent]
})
export class BillingAutoComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.BillAuto;
  public headsTables:any = CONSTANT.headBillsAutoManual;
  public bodyTable = [];
  public bodyTableFull = [];
  public bodyClient:any;
  public checkIva:Boolean;
  public checkPay:Boolean =false;
  public ivaBill:number;
  public bodyProvider:any;
  public bodyCategory:any;
  public bodyProduct:any;
  public headClient:any = CONSTANT.headPerson;
  public headProvider:any = CONSTANT.headProvider;
  public headCategories:any = CONSTANT.headCategory;
  public headProduct:any = CONSTANT.headProduct;
  public countClient:number;
  public countProvider:number;
  public countCategories:number;
  public countProduct:number;
  public responseComponent: any;
  public responseService: any;
  public dataBill :BillData;
  public dataBillAuto : BillAutoModel;
  public SELECT_CLIENT:string = CONSTANT.Labels.SelectClient;
  public SELECT_PROVIDER:string = CONSTANT.Labels.SelectProvider;
  public SELECT_CATEGORIES:string = CONSTANT.Labels.SelectionCategories;
  public SELECT_PRODUCT:string = CONSTANT.Labels.SelectProduct;
  public LABEL_CANCEL = CONSTANT.Labels.Cancel;
  public client:string = "";
  public provider:string = "";
  public categories:string = "";
  public products:string = "";
  public quantity:number = 1;
  private browser:any;
  public selectRow = "";
  public indexSelected:number;


  constructor(private _route: ActivatedRoute, private _providerComponent:ProviderComponent, private _categoryComponent:CategoryComponent, private _personComponent:PersonsComponent, private toastService: MzToastService,
              private _getDataBrowser: DataBrowser, private _billService:BillService, private _productComponent:ProductComponent, private _router:Router) {
    this.browser = this._getDataBrowser.getDataBrowser();
    this.dataBill = new BillData({idCategory:"",nameCategory: "",idProvider:"",nameProvider:"",product:{category:"",description:"",iva:0,id:"",name:"", cost:0,margin:0, price:0, quantity:1}});
    this.dataBillAuto = new BillAutoModel({bodyBill:"", cerrado:false, cierreDateBill:new Date(), ivaBill:0, nombreClient:"", pagado:false, tipoBill:""}, {id:""}, {page:0},{navegador:""});
  }

  ngOnInit() {
    this.createInstanceModal();
    this.checkBillEdit();
  }

  private checkBillEdit(){

    this._route.params.forEach((params:Params)=>{
      let id = params['bill'];
      if(id)
      this.getDetailsBillById(id);
    });
  }

  private createInstanceModal(){
    $('.modal').modal();
  }

  private getDetailsBillById(id){
    alert('este es el id ' + id);
  };


  getClient(){
    $('#selectClient').modal('open');
   this._personComponent.getPerson(0);
   this._personComponent.sendPerson.subscribe(
     response=>{
       this.responseComponent = response;
       this.bodyClient = this.responseComponent.persons;
       this.countClient = this.responseComponent.count;
     },error=>{
       this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
     }
   )
  }


  getProviders(){
    $('#selectProvider').modal('open');

    this._providerComponent.getProviderByPagination(1);
    this._providerComponent.sendProviders.subscribe(
      response=>{
        this.responseComponent = response;
        this.bodyProvider = this.responseComponent.providers;
        this.countProvider = this.responseComponent.count;
      },error=>{
        this.toastService.show(CONSTANT.messageToast.PROVIDER_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  getCategories(){
    if(!this.provider){
      this._categoryComponent.getCategoriesOutside(this.browser).subscribe(
        response=>{
          $('#selectCategories').modal('open');

          this.bodyCategory = response.object;
        },error=>{
          this.toastService.show(CONSTANT.messageToast.CATEGORY_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }else {
      this._billService.selectCategoriesByProvider(this.dataBill.data.idProvider).subscribe(
        response=>{
          this.responseService = response;
          if(this.responseService.message === CONSTANT.ResponseServers.InvalidParams){
            this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
          }else if(this.responseService.message === CONSTANT.ResponseServers.No_Data_Avaible){
            this.toastService.show(CONSTANT.messageToast.NO_DATA_AVAIBLE, 4000, CONSTANT.Styles.Info);
          }else{
            $('#selectCategories').modal('open');
            this.bodyCategory = this.responseService.categories;
          }
        },error=>{
          this.toastService.show(CONSTANT.messageToast.BILL_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }
  }

  getProducts(){
    if(!this.categories){
      let pagination = {page:1};
      this._productComponent.getProductsByPagination(pagination);
      this._productComponent.sendProduct.subscribe(
        response=>{
          this.responseComponent = response;
          $('#selectProduct').modal('open');
          this.bodyProduct = this.responseComponent.products;
          this.countProduct = this.responseComponent.count;
        },error=>{
          this.toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }else{
      this._billService.selectProductByCategory(this.dataBill.data.idCategory).subscribe(
        response=>{
          this.responseService = response;
          if(this.responseService.message === CONSTANT.ResponseServers.InvalidParams){
            this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
          }else if(this.responseService.message === CONSTANT.ResponseServers.No_Data_Product){
            this.toastService.show(CONSTANT.messageToast.NO_DATA_AVAIBLE, 4000, CONSTANT.Styles.Info);
          }else{
            $('#selectProduct').modal('open');
            this.bodyProduct = this.responseService.products;
          }
        },error=>{
          this.toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }
  }

  selectClients(event){
    let dataClient = event.object;
    this.client = dataClient.name +" "+dataClient.lastName + " " +dataClient.lastName2;
    $('#selectClient').modal('close');
  }

  selectProviders(event){
    let dataProvider = event.object;
    this.dataBill.data.nameProvider = dataProvider.nameBusiness;
    this.dataBill.data.idProvider = dataProvider.id;
    this.provider = dataProvider.nameBusiness;
    this.categories = "";
    this.products = "";
    $('#selectProvider').modal('close');
  }

  selectCategory(event){
    let dataCategory = event.object;
    this.dataBill.data.nameCategory = dataCategory.name;
    this.dataBill.data.idCategory = dataCategory.id;
    this.categories = dataCategory.name;
    this.products = "";
    $('#selectCategories').modal('close');

  }

  selectionProduct(event){
    let dataProduct = event.object;
    this.dataBill.data.product.category = dataProduct.category.id;
    this.dataBill.data.product.description = dataProduct.description;
    this.dataBill.data.product.id = dataProduct.id;
    this.dataBill.data.product.iva = dataProduct.iva;
    this.dataBill.data.product.name = dataProduct.name;
    this.dataBill.data.product.cost = dataProduct.cost;
    this.dataBill.data.product.margin = dataProduct.margin;
    this.products = dataProduct.name;
    this.calculatePrice();

    $('#selectProduct').modal('close');

  }

  private calculatePrice(){

    let priceWithIva  = this.dataBill.data.product.cost + (this.dataBill.data.product.cost * this.dataBill.data.product.iva)/100;
    this.dataBill.data.product.price = priceWithIva + (priceWithIva * this.dataBill.data.product.margin)/100;
  };

  addProduct(){
    if(this.products){
      if(this.quantity !== 0){
        this.dataBill.data.product.quantity= this.quantity;
        let dataProducts = {
          idProv : this.dataBill.data.idProvider,
          namProv: this.dataBill.data.nameProvider,
          idCat: this.dataBill.data.idCategory,
          namCat: this.dataBill.data.idCategory,
          nameProd: this.dataBill.data.product.name,
          descProd: this.dataBill.data.product.description,
          quanProd: this.quantity,
          pricProd:this.dataBill.data.product.price

        };

        this.bodyTableFull.push(dataProducts);
        this.products = "";
        this.categories = "";
        this.provider = "";
        this.quantity = 1;
      }else{
        this.toastService.show(CONSTANT.messageToast.PRODUCT_QUANTITY_ERROR, 4000, CONSTANT.Styles.Warning);
      }
    }
  }

  deletedProduct(){
    this.bodyTableFull.splice(this.indexSelected,1);
    this.indexSelected = -1;
  }

  getRecordByPage(event){

  }

  saveBill(cierre = null){
    if(this.bodyTableFull.length === 0 ){
      this.toastService.show(CONSTANT.messageToast.BILL_EMPTY_ERROR, 4000, CONSTANT.Styles.Warning);
    }else if(!this.client){
      this.toastService.show(CONSTANT.messageToast.CLIENT_EMPTY_ERROR, 4000, CONSTANT.Styles.Warning);
    }else{
      if(cierre){
        this.createBill(new Date());
      }else{
        this.createBill();
      }
      this._billService.createBill(this.dataBillAuto).subscribe(
        response => {
          this.responseService = response;
          if (this.responseService.message === CONSTANT.ResponseServers.InvalidParams) {
            this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
          } else {
            this.toastService.show(CONSTANT.messageToast.BILL_CREATE_SUCCESS, 4000, CONSTANT.Styles.Success);
            this._router.navigate(['/dashboard/billing']);
          }
        }, error => {
          this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }
  }

  private createBill(cierre = null){
    this.dataBillAuto.data.tipoBill = CONSTANT.Labels.BillAuto;
    this.dataBillAuto.data.pagado = this.checkPay;
    this.dataBillAuto.data.ivaBill = this.ivaBill;
    this.dataBillAuto.data.nombreClient = this.client;
    this.dataBillAuto.data.cierreDateBill = cierre;
    this.dataBillAuto.data.cerrado = !!cierre;
    this.dataBillAuto.data.bodyBill = JSON.stringify(this.bodyTableFull);
    this.dataBillAuto.direccionIp.navegador = this.browser.browser;
  }

  selectedRow(index){

    this.indexSelected = index;
    if(this.selectRow === ''){
      this.selectRow = 'pink';
    }
  }

}
