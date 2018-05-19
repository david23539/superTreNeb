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
import {BillData} from "../../../model/bill/bill.model";

@Component({
  selector: 'app-billing-auto',
  templateUrl: './billing-auto.component.html',
  styleUrls: ['./billing-auto.component.css'],
  providers: [ProviderComponent, ProviderService, CategoryComponent, CategoryService, SelectCategoriesComponent,
  PersonService, PersonsComponent, AddressComponent,AddressService, UploadService, MzToastService]
})
export class BillingAutoComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.BillAuto;
  public headsTables:any = CONSTANT.headBillsAutoManual;
  public bodyTable: any;
  public bodyClient:any;
  public bodyProvider:any;
  public billData:BillData;
  public headClient:any = CONSTANT.headPerson;
  public headProvider:any = CONSTANT.headProvider;
  public countClient:number;
  public countProvider:number;
  public responseComponent: any;

  public SELECT_CLIENT:string = CONSTANT.Labels.SelectClient;
  public SELECT_PROVIDER:string = CONSTANT.Labels.SelectProvider;
  public LABEL_CANCEL = CONSTANT.Labels.Cancel;
  public client:string = "";
  public provider:string = "";
  public categories:string = "";
  public products:string = "";
  public quantity:number;

  constructor(private _providerComponent:ProviderComponent, private _categoryComponent:CategoryComponent, private _personComponent:PersonsComponent, private toastService: MzToastService) {
    this.billData = new BillData({idProvider:""});
  }

  ngOnInit() {
    this.createInstanceModal();
  }

  private createInstanceModal(){
    $('.modal').modal();
  }

  onSubmit(){

  }

  addUpdateProductBillAuto(event){

  }

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

  selectClients(event){
    let dataClient = event.object;
    this.client = dataClient.name +" "+dataClient.lastName + " " +dataClient.lastName2;
    $('#selectClient').modal('close');
  }

  selectProviders(event){
    let dataProvider = event.object;
    this.billData.dataBill.idProvider = dataProvider.id;
    this.provider = dataProvider.nameBusiness;
    $('#selectProvider').modal('close');
  }
}
