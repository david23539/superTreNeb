import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../../services/constant";

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.BillsTitle;
  public searchResult:string = "";
  public billSearch: string = CONSTANT.Labels.SearchBills;
  public headsTables:any = CONSTANT.headBills;
  public bodyTable: any;
  public countProduct:number;
  public SELECT_BILL:string = CONSTANT.Labels.SelectedBill;
  public LABEL_CANCEL_MODE_BILLS:string = CONSTANT.Labels.Cancel;


  public operationType:string = "";




  constructor() { }

  ngOnInit() {
    $('.modal').modal();
  }

  filterItem(){

  }

  getProductsByPagination(event){

  }

  addUpdateProduct(event){
    if (event.operation === CONSTANT.OperationTables.create) {
      this.operationType = CONSTANT.OperationTables.create;
      $('#selectBillModel').modal('open');
    }
  }
}
