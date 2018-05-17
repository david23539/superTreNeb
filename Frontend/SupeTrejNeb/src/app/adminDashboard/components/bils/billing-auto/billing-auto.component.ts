import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../../services/constant";

@Component({
  selector: 'app-billing-auto',
  templateUrl: './billing-auto.component.html',
  styleUrls: ['./billing-auto.component.css']
})
export class BillingAutoComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.BillAuto;
  public headsTables:any = CONSTANT.headBillsAutoManual;
  public bodyTable: any;

  constructor() { }

  ngOnInit() {
  }

  addUpdateProductBillAuto(event){

  }
}
