import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {Person} from "../../model/person/person.model";
import {PersonService} from "../../services/person/person.service";
import {MzToastService} from "ng2-materialize";

@Component({
  selector: 'persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
  providers: [PersonService, MzToastService]
})
export class PersonsComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.PersonTitle;
  public ADD_PERSON_TITTLE = CONSTANT.Labels.AddPerson;
  public LABEL_PERSON = CONSTANT.Labels.Person;
  public LABEL_LASTNAME = CONSTANT.Labels.lastName;
  public LABEL_LASTNAME2 = CONSTANT.Labels.lastName2;
  public LABEL_DNI = CONSTANT.Labels.dni;
  public LABEL_EMAIL = CONSTANT.Labels.email;
  public LABEL_MOVIL = CONSTANT.Labels.movil;
  public LABEL_TELEFONE = CONSTANT.Labels.telefone;
  public LABEL_ADDRESS = CONSTANT.Labels.SelectAddress;
  public LABEL_SAVE = CONSTANT.Labels.Save;
  public LABEL_UPDATE = CONSTANT.Labels.Update;
  public LABEL_CANCEL = CONSTANT.Labels.Cancel;
  public searchResult:string = "";
  public PersonSearch:string = CONSTANT.Labels.SearchPerson;
  public headsTables:any = CONSTANT.headPerson;
  public responseServer:any;
  public Person_IN:Person;
  public bodyTable:any;
  public count:number;
  public operationType: string;
  public classStyleForm:string = "";
  public buttonSaveUpdate:boolean;

  constructor(private _personService:PersonService, private toastService: MzToastService) {
    this.Person_IN = new Person({nombre:"", apellido1:"", apellido2:"", direcction:"", dni: "", email: "", movil: 0, telefono: 0},{id:""},
      {page: 0}, {navegador: ""});
    this.buttonSaveUpdate = true;
  }

  private getPerson(page){
    this.Person_IN.pagination.page = page*10;
    this._personService.getPersonPagination(this.Person_IN).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.ResponseServers.No_Data_Provider){
          this.toastService.show(CONSTANT.messageToast.NO_DATA_AVAIBLE, 4000, CONSTANT.Styles.Info);
        }else{
          this.bodyTable = this.responseServer.persons;
        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  validateVisualForm(value){

  }

  addUpdatePerson(event){
    if (event.operation === CONSTANT.OperationTables.create) {
      this.operationType = CONSTANT.OperationTables.create;
      $('#createPerson').modal('open');
      this.buttonSaveUpdate = true;
    }

  }

  private createInstanceModal(){
    $('.modal').modal();
  }

  ngOnInit() {
    this.getPerson(0);
    this.createInstanceModal();
  }

  filterItem(){
    if(this.searchResult && this.searchResult.length > 2) {
      this.filterCategory();
    }else{
      this.getPerson(0);
    }
  }

  onSubmit(createUpdateForm){

  }

  private filterCategory(){
    this._personService.getPersonFildered(this.searchResult).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message && this.responseServer.message == CONSTANT.ResponseServers.InvalidParams){
          this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
        }else if(this.responseServer.message && this.responseServer.message == CONSTANT.ResponseServers.No_Data_Category){
          this.toastService.show(CONSTANT.messageToast.NO_DATA_CATEGORY, 4000, CONSTANT.Styles.Info);
        }else{
          this.bodyTable = this.responseServer.persons;
          this.count = 0;
        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }
}
