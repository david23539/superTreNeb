import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../../services/constant";
import {BillService} from "../../../services/bill/bill.service";
import {DataBrowser} from "../../../../utils/dataBrowser";
import {BillDataModel} from "../../../model/bill/billData.model";
import {MzToastService} from "ng2-materialize";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  providers:[BillService, DataBrowser, MzToastService]
})
export class BillingComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.BillsTitle;
  public searchResult:string = "";
  private browser:any;
  private billData:BillDataModel;
  public billSearch: string = CONSTANT.Labels.SearchBills;
  public headsTables:any = CONSTANT.headBills;
  public bodyTable: any;
  public countBill:number;
  public SELECT_BILL:string = CONSTANT.Labels.SelectedBill;
  public LABEL_CANCEL_MODE_BILLS:string = CONSTANT.Labels.Cancel;
  public LABEL_BILLS_AUTO:string = CONSTANT.Labels.BillAuto;
  public LABEL_BILLS_MANUAL:string = CONSTANT.Labels.BillManual;
  public LABEL_BILLS_CREATE:string = CONSTANT.Labels.Create;
  private responseServer :any;
  public operationType:string = "";
  public DELETED_BILL_TITTLE = CONSTANT.Labels.DeleteBill;
  public DELETED_BILL_SUBTITTLE = CONSTANT.Labels.Confirm_Deleted_Bill;
  public LABEL_DELETED_BILL = CONSTANT.Labels.Delete;
  public LABEL_CANCEL = CONSTANT.Labels.Cancel;





  constructor(private _route: ActivatedRoute, private _router:Router, private _billService:BillService, private _getDataBrowser: DataBrowser, private toastService: MzToastService) {
    this.browser = this._getDataBrowser.getDataBrowser();
    this.billData = new BillDataModel({page: 0},{navegador:""},{id:""});
  }

  ngOnInit() {
    $('.modal').modal();
    this.getBills(0);
  }

  filterItem(){
    if(this.searchResult && this.searchResult.length > 2) {
      this.filterBills();
    }else{
      this.getBills(0);
    }

  }

  private filterBills(){
    this._billService.filderedBill(this.searchResult).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
          this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
        }else if(this.responseServer.message === CONSTANT.ResponseServers.No_Data_Bill){
          this.toastService.show(CONSTANT.messageToast.NO_DATA_AVAIBLE, 4000, CONSTANT.Styles.Info);
        }else{
          this.bodyTable = this.responseServer.bills;
        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.BILL_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  private getBills(page:number){
    this.billData.pagination.page = page * 10;
    this.billData.direccionIp.navegador = this.browser.browser;
    this._billService.getBills(this.billData).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
          this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
        }else if(this.responseServer.message === CONSTANT.ResponseServers.No_Data_Bill){
          this.toastService.show(CONSTANT.messageToast.NO_DATA_AVAIBLE, 4000, CONSTANT.Styles.Info);
        }else{
          this.bodyTable = this.responseServer.bills;
          this.countBill = this.responseServer.count;
        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.BILL_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  getBillsByPagination(event){
      this.getBills(event.page - 1);
  }

  addUpdateBill(event){
    if (event.operation === CONSTANT.OperationTables.create) {
      this.operationType = CONSTANT.OperationTables.create;
      $('#selectBillModel').modal('open');
    }else if(event.operation === CONSTANT.OperationTables.update){
      this.operationType = CONSTANT.OperationTables.update;
      if(event.items.type === CONSTANT.Labels.BillAuto){
        this._router.navigate(['/dashboard/billingAuto',{bill:event.items.id, status: event.items.status}]);
      }else{
        this._router.navigate(['/dashboard/billingManual',{bill:event.items.id, status: event.items.status}]);
      }
    }else if(event.operation === CONSTANT.OperationTables.delete){
      this.operationType = CONSTANT.OperationTables.delete;
      this.billData.identifier.id = event.items.id;
      $('#deletedBill').modal('open');


    }
  }

  public deleteBill(){
    this._billService.deletedBill(this.billData.identifier.id).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
          this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
        }else{
          this.toastService.show(CONSTANT.messageToast.DELETED_BILL_SUCCESS, 4000, CONSTANT.Styles.Success);
          this.getBills(0);
        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.DELETED_BILL_ERROR, 4000, CONSTANT.Styles.Error);

      }
    )
  }
}

