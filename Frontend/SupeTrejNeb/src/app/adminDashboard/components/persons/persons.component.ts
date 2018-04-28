import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../services/constant";

@Component({
  selector: 'persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.PersonTitle;
  public searchResult:string = "";
  public PersonSearch:string = CONSTANT.Labels.SearchPerson;
  public headsTables:any = CONSTANT.headPerson;

  constructor() { }

  ngOnInit() {
  }

  filterItem(){

  }

}
