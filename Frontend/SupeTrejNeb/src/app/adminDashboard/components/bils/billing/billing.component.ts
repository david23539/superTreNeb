import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../../services/constant";
import {BillService} from "../../../services/bill/bill.service";
import {DataBrowser} from "../../../../utils/dataBrowser";
import {BillDataModel} from "../../../model/bill/billData.model";
import {MzToastService} from "ng2-materialize";

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




  constructor(private _billService:BillService, private _getDataBrowser: DataBrowser, private toastService: MzToastService) {
    this.browser = this._getDataBrowser.getDataBrowser();
    this.billData = new BillDataModel({page: 0},{navegador:""});
  }

  ngOnInit() {
    $('.modal').modal();
    this.getBills(0);
  }

  filterItem(){

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

  getProductsByPagination(event){
      this.getBills(event.page - 1);
  }

  addUpdateProduct(event){
    if (event.operation === CONSTANT.OperationTables.create) {
      this.operationType = CONSTANT.OperationTables.create;
      $('#selectBillModel').modal('open');
    }
  }
}
