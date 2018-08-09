import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../../services/constant";
import {PersonsComponent} from "../../persons/persons.component";
import {PersonService} from "../../../services/person/person.service";
import {MzToastService} from "ng2-materialize";
import {AddressService} from "../../../services/address/address.service";
import {AddressComponent} from "../../address/address.component";
import {UploadService} from "../../../services/uploadFiles/upload.service";
import {BillData} from "../../../model/bill/bill.model";
import {BillService} from "../../../services/bill/bill.service";
import {BillAutoModel} from "../../../model/bill/billAuto.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataBrowser} from "../../../../utils/dataBrowser";

@Component({
  selector: 'app-billing-manual',
  templateUrl: './billing-manual.component.html',
  styleUrls: ['./billing-manual.component.css'],
  providers:[PersonService, PersonsComponent, MzToastService,AddressComponent,AddressService, UploadService, BillService, DataBrowser]
})
export class BillingManualComponent implements OnInit {
  public TITLE:string = CONSTANT.Labels.BillManual;
  public headsTables:any = CONSTANT.headBillsAutoManual;
  public client:string = "";
  public updateInvoice: boolean = false;
  public statusUpdateInvoice:boolean;
  public checkIva:Boolean;
  public ivaBill:number;
  public quantity:number = 1;
  public products:string = "";
  public LABEL_DESCRIPTION = CONSTANT.Labels.Description;
  public description:string = "";
  public priceProcuct:number = 0;
  public bodyTableFull = [];
  public responseComponent: any;
  public responseService: any;
  public bodyClient:any;
  public countClient:number;
  public SELECT_CLIENT:string = CONSTANT.Labels.SelectClient;
  public headClient:any = CONSTANT.headPerson;
  public LABEL_CANCEL = CONSTANT.Labels.Cancel;
  public dataBill :BillData;
  public indexSelected:number;
  public selectRow = "";
  public dataBillAuto : BillAutoModel;
  public checkPay:Boolean =false;
  private browser:any;





  constructor(private _route: ActivatedRoute, private _personComponent:PersonsComponent, private toastService: MzToastService, private _billService:BillService, private _router:Router, private _getDataBrowser: DataBrowser,) {
    this.dataBillAuto = new BillAutoModel({bodyBill:"", cerrado:false, cierreDateBill:new Date(), ivaBill:0, nombreClient:"", pagado:false, tipoBill:"",update:false}, {id:""}, {page:0},{navegador:""});
    this.browser = this._getDataBrowser.getDataBrowser();
  }

  private intanciateObjectDataBill(){
    this.dataBill = new BillData({idCategory:"",nameCategory: "",idProvider:"",nameProvider:"",product:{category:"",description:"",iva:0,id:"",name:"", cost:0,margin:0, price:0, quantity:1}});

  }

  ngOnInit() {
    $('.modal').modal();
    this.intanciateObjectDataBill();
    this.checkBillEdit();

  }

  private checkBillEdit(){

    this._route.params.forEach((params:Params)=>{
      let id = params['bill'];
      this.statusUpdateInvoice = (params['status'] === 'Cerrada');
      if(id){
        this.updateInvoice = true;
        this.dataBillAuto.data.update = true;
        this.getDetailsBillById(id);
      }
    });
  }




  private getDetailsBillById(id){
    this._billService.getBillById(id).subscribe(
      response=>{
        this.responseService = response;
        this.dataBillAuto.identifier.id = this.responseService.bills.id;
        this.client = this.responseService.bills.client;
        this.dataBillAuto.data.nombreClient =  this.responseService.bills.idClient;
        this.bodyTableFull = this.responseService.bills.data;
      },error=>{
        this.toastService.show(CONSTANT.messageToast.BILL_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
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

  addProduct(){
    if(this.dataBill.data.product.name){
      if(this.quantity !== 0){
        this.dataBill.data.product.quantity= this.quantity;
        let dataProducts = {
          nameProd: this.dataBill.data.product.name,
          descProd: this.dataBill.data.product.description,
          quanProd: this.quantity,
          pricProd:this.dataBill.data.product.price

        };

        this.bodyTableFull.push(dataProducts);
        this.intanciateObjectDataBill();
      }else{
        this.toastService.show(CONSTANT.messageToast.PRODUCT_QUANTITY_ERROR, 4000, CONSTANT.Styles.Warning);
      }
    }
  }

  selectClients(event){
    let dataClient = event.object;
    this.client = dataClient.name +" "+dataClient.lastName + " " +dataClient.lastName2;
    this.dataBillAuto.data.nombreClient = dataClient.id;
    $('#selectClient').modal('close');
  }

  deletedProduct(){
    this.bodyTableFull.splice(this.indexSelected,1);
    this.indexSelected = -1;
  }
  selectedRow(index){

    this.indexSelected = index;
    if(this.selectRow === ''){
      this.selectRow = 'pink';
    }
  }

  saveBill(cierre){
    if(this.bodyTableFull.length === 0 ){
      this.toastService.show(CONSTANT.messageToast.BILL_EMPTY_ERROR, 4000, CONSTANT.Styles.Warning);
    }else if(!this.client){
      this.toastService.show(CONSTANT.messageToast.CLIENT_EMPTY_ERROR, 4000, CONSTANT.Styles.Warning);
    }else{
      this.createBill(new Date(), cierre);
      this._billService.createBill(this.dataBillAuto).subscribe(
        response => {
          this.responseService = response;
          if (this.responseService.message === CONSTANT.ResponseServers.InvalidParams) {
            this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
          } else if(this.responseService.message === CONSTANT.ResponseServers.Bill_Success_Update){
            this.toastService.show(CONSTANT.messageToast.BILL_UPDATE_SUCCESS, 4000, CONSTANT.Styles.Success);
            this._router.navigate(['/dashboard/billing']);
          }else{
            this.toastService.show(CONSTANT.messageToast.BILL_CREATE_SUCCESS, 4000, CONSTANT.Styles.Success);
            this._router.navigate(['/dashboard/billing']);
          }
        }, error => {
          this.toastService.show(CONSTANT.messageToast.BILL_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }
  }

  private createBill(fcierre, cierre){
    this.dataBillAuto.data.tipoBill = CONSTANT.Labels.BillManual;
    this.dataBillAuto.data.pagado = this.checkPay;
    this.dataBillAuto.data.ivaBill = this.ivaBill;
    // this.dataBillAuto.data.nombreClient = this.client;
    this.dataBillAuto.data.cierreDateBill = fcierre;
    this.dataBillAuto.data.cerrado = !!cierre;
    this.dataBillAuto.data.bodyBill = JSON.stringify(this.bodyTableFull);
    this.dataBillAuto.direccionIp.navegador = this.browser.browser;
  }



}
