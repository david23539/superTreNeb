import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../services/constant";

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.AddressTitle;
  public searchResult:string = "";
  public AddressSearch:string = CONSTANT.Labels.SearchAddress;
  public headsTables:any = CONSTANT.headAddress;
  public bodyTable:any;
  public count:number;
  constructor() { }

  ngOnInit() {
  }

  filterItem(){

  }
  getProviderByPagination(event){

  }

  addUpdatePerson(event){

  }
}
