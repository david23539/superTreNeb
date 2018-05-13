import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {Person} from "../../model/person/person.model";
import {PersonService} from "../../services/person/person.service";
import {MzToastService} from "ng2-materialize";
import {DataBrowser} from "../../../utils/dataBrowser";
import {AddressService} from "../../services/address/address.service";
import {AddressComponent} from "../address/address.component";
import {ReasignedPersonModel} from "../../model/person/reasignedPerson.model";
import {UploadService} from "../../services/uploadFiles/upload.service";

@Component({
  selector: 'persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
  providers: [PersonService, MzToastService, DataBrowser, AddressService, AddressComponent, UploadService]
})
export class PersonsComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.PersonTitle;
  public ADD_PERSON_TITTLE = CONSTANT.Labels.AddPerson;
  public SELECT_ADDRESS_TITTLE = CONSTANT.Labels.SelectAddress;
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
  public REASSIGN_PERSON= CONSTANT.Labels.Reassign;
  public ADD_UPDATE_PERSON = CONSTANT.Labels.UpdatePerson;
  public DELETED_PERSON_TITTLE = CONSTANT.Labels.DeletePerson;
  public DELETED_PERSON_SUBTITTLE = CONSTANT.Labels.Confirm_Deleted_Person;
  public LABEL_DELETED_PERSON = CONSTANT.Labels.Delete;
  public EXIST_RELATIONS_PROVIDERS = CONSTANT.Labels.Relation_Provider;
  public SELECT_NEW_PERSON = CONSTANT.Labels.SelectPerson;
  public LABEL_OLD_PERSON = CONSTANT.Labels.OldPerson;
  public LABEL_NEW_PERSON = CONSTANT.Labels.NewPerson;
  public MENSAJE_RELATIONS_INFO = CONSTANT.Labels.Message_Info_Relation_Provider;
  public MENSSAGE_INFO_UPDATE = "";
  public QUESTIONIMAGE:string = CONSTANT.Labels.QuestionImage;
  public QUESTIONIMAGECHANGE:string = CONSTANT.Labels.QuestionImageChange;
  public NO:string = CONSTANT.Labels.No;
  public YES:string = CONSTANT.Labels.Yes;
  public filesToUpload: Array<File>;




  public personDataOld:string = "";
  public personDataNew:string = "";
  private ReasignedPerson_IN: ReasignedPersonModel;
  public message_relations:string = "";
  public searchResult:string = "";
  public PersonSearch:string = CONSTANT.Labels.SearchPerson;
  public headsTables:any = CONSTANT.headPerson;
  public headsTablesAddress:any = CONSTANT.headAddress;
  public responseServer:any;
  public Person_IN:Person;
  public bodyTable:any;
  public bodyTableAddress:any;
  public count:number;
  public operationType: string;
  public classStyleForm:string = "";
  public buttonSaveUpdate:boolean;
  public browser: any;
  public responseComponent: any;
  public invalidClassStyleForm:string = CONSTANT.Styles.Invalid;
  public validClassStyleForm:string = CONSTANT.Styles.Valid;
  public invalidClassStyleDNIForm:string = CONSTANT.Styles.Invalid;
  public validClassStyleDNIForm:string = CONSTANT.Styles.Valid;
  public classStyleDNIForm:string = "";
  public invalidClassStyleEmailForm:string = CONSTANT.Styles.Invalid;
  public validClassStyleEmailForm:string = CONSTANT.Styles.Valid;
  public classStyleEmailForm:string = "";



  @Output() sendPerson = new EventEmitter();
  public relations: { cont: number; resp: number };

  constructor(private _personService:PersonService, private toastService: MzToastService, private _getDataBrowser: DataBrowser, private addreesComponent: AddressComponent,
  private _uploadFile:UploadService) {
    this.Person_IN = new Person({nombre:"", apellido1:"", apellido2:"", direcction:"", dni: "", email: "", movil: 0, telefono: 0},{id:""},
      {page: 0}, {navegador: ""});
    this.buttonSaveUpdate = true;
    this.browser = this._getDataBrowser.getDataBrowser();
    this.ReasignedPerson_IN = new ReasignedPersonModel({personaAntigua:"", personaNueva:""}, {navegador:this.browser.browser})

  }

  public getPerson(page){
    this.Person_IN.pagination.page = page*10;
    this._personService.getPersonPagination(this.Person_IN).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.ResponseServers.No_Data_Provider){
          this.toastService.show(CONSTANT.messageToast.NO_DATA_AVAIBLE, 4000, CONSTANT.Styles.Info);
        }else{
          this.bodyTable = this.responseServer.persons;
          this.emitPersons(this.bodyTable);
        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  private emitPersons(listPerson_IN){
    this.sendPerson.emit({
      persons: listPerson_IN
    })
  }

  submitImage(){
    if(this.filesToUpload){
      let url = 'uploadImagePerson/' + this.Person_IN.identifier.id;
      this._uploadFile.makeFileRequest(url, [], this.filesToUpload, "image")
        .then((result:any)=>{
          this.getPerson(0);
          this.toastService.show(CONSTANT.messageToast.PRODUCT_UPDATE_SUCCESS, 4000, CONSTANT.Styles.Success);
        })
    }
  }

  fileChangeevent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  getPersonOld(){
    this.personDataOld = this.Person_IN.dataPerson.nombre + ' ' +
      this.Person_IN.dataPerson.apellido1 + ' ' + this.Person_IN.dataPerson.apellido2
  }

  getAddrees(page){

    this.addreesComponent.getAddressByPagination(0);
    this.addreesComponent.sendData.subscribe(
      response=>{
        this.responseComponent = response;
        this.bodyTableAddress = this.responseComponent.address;
      },error=>{
        console.log("error");
      }
    );
  }

  selectAddress(event){
    this.Person_IN.dataPerson.direcction = event.object.id;
    $('#selectAddress').modal('close');
  }

  validateVisualForm(value){

    switch (value){
      case 'name':
        if(this.Person_IN.dataPerson.nombre == ""){
          this.classStyleForm = this.invalidClassStyleForm;
        }else{
          this.classStyleForm = this.validClassStyleForm;
        }
        break;
      case 'dni':
        if(this.Person_IN.dataPerson.dni == ""){
          this.classStyleDNIForm = this.invalidClassStyleDNIForm;
        }else{
          this.classStyleDNIForm = this.validClassStyleDNIForm;
        }
        break;
      case 'email':
        if(this.Person_IN.dataPerson.email == ""){
          this.classStyleEmailForm = this.invalidClassStyleEmailForm;
        }else{
          this.classStyleEmailForm = this.validClassStyleEmailForm;
        }
        break;
    }
  }

  addUpdatePerson(event){
    if (event.operation === CONSTANT.OperationTables.create) {
      this.operationType = CONSTANT.OperationTables.create;
      $('#createPerson').modal('open');
      this.buttonSaveUpdate = true;
    }else if(event.operation === CONSTANT.OperationTables.update && event.items){
      $('#createPerson').modal('open');
      this.buttonSaveUpdate = false;
      this.operationType = CONSTANT.OperationTables.update;
      this.setterPersonUpdate(event.items);
    }else if(event.operation === CONSTANT.OperationTables.delete && event.items){
      $('#deletedPerson').modal('open');
      this.Person_IN.identifier.id = event.items.id;
      this.Person_IN.dataPerson.nombre = event.items.name;
      this.Person_IN.dataPerson.apellido1 = event.items.lastName;
      this.Person_IN.dataPerson.apellido2 = event.items.lastName2;
      this.ReasignedPerson_IN.dataReasignedPerson.personaAntigua = this.Person_IN.identifier.id;


    }
  }



  private setterPersonUpdate(personSelect_IN){
    this.Person_IN.dataPerson.direcction = personSelect_IN.direccion.id;
    this.Person_IN.dataPerson.telefono = personSelect_IN.telefone;
    this.Person_IN.dataPerson.movil = personSelect_IN.movil;
    this.Person_IN.dataPerson.apellido2 = personSelect_IN.lastName2;
    this.Person_IN.dataPerson.apellido1 = personSelect_IN.lastName;
    this.Person_IN.dataPerson.email = personSelect_IN.email;
    this.Person_IN.dataPerson.dni = personSelect_IN.dni;
    this.Person_IN.dataPerson.nombre = personSelect_IN.name;
    this.Person_IN.identifier.id = personSelect_IN.id;

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

      if (!this.Person_IN.dataPerson.movil && !this.Person_IN.dataPerson.telefono) {
        this.toastService.show(CONSTANT.messageToast.MOVIL_OR_TELEFONE, 4000, CONSTANT.Styles.Warning);
      } else if (!this.Person_IN.dataPerson.direcction) {
        this.toastService.show(CONSTANT.messageToast.ADDRESS_NECESARY, 4000, CONSTANT.Styles.Warning);
      } else if (this.operationType === CONSTANT.OperationTables.create) {
        this.Person_IN.direccionIp.navegador = this.browser.browser;
        this._personService.createPerson(this.Person_IN).subscribe(
          response => {
            this.responseServer = response;
            if (this.responseServer.message === CONSTANT.ResponseServers.Person_Success) {
              createUpdateForm.reset();
              this.getPerson(0);
              this.toastService.show(CONSTANT.ResponseServers.Person_Success, 4000, CONSTANT.Styles.Success);
              $('#createPerson').modal('close');
              $('#imagePersonModal').modal('open');
            } else if (this.responseServer.message === CONSTANT.ResponseServers.InvalidParams) {
              this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
            } else {
              this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
            }
          }, error => {
            this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
          }
        )
      }else if(this.operationType = CONSTANT.OperationTables.update){
        this.Person_IN.direccionIp.navegador = this.browser.browser;
        this._personService.updatePerson(this.Person_IN).subscribe(
          response=>{
            this.responseServer = response;
            if (this.responseServer.message === CONSTANT.ResponseServers.InvalidParams) {
              this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
            }else{
              this.toastService.show(CONSTANT.ResponseServers.Person_Success, 4000, CONSTANT.Styles.Success);
              $('#createPerson').modal('close');
              createUpdateForm.reset();
              this.getPerson(0);
              $('#imagePersonModal').modal('open');
            }

          },error=>{
            this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
          }
        )
      }

  }

  selectPerson(event){
    this.personDataNew = event.object.name + " " + event.object.lastName + " " + event.object.lastName2;
    this.ReasignedPerson_IN.dataReasignedPerson.personaNueva = event.object.id;

  }

  openModalSelectImage(){
    $('#imageUploadProductModal').modal('open');
  }

  deletePerson(){
    if(this.Person_IN.identifier.id){
      this._personService.checkProviderByPerson(this.Person_IN.identifier.id).subscribe(
        response=>{
          this.responseServer = response;
          if(this.responseServer.message === CONSTANT.ResponseServers.No_Data_Provider){
            this.deletedPersonContinue();
          }else if(this.responseServer.providerList.length !== 0){
            this.relations = this.findRelationProvider(this.responseServer.providerList);
            this.message_relations = CONSTANT.Labels.Message_1 + this.relations.resp + CONSTANT.Labels.Message_2 + this.relations.cont;
             $('#relationProvider').modal('open');
          }
        },error=>{
          this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )

    }else{
      this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
    }
  }

  reassignPerson(){
    if((this.ReasignedPerson_IN.dataReasignedPerson.personaNueva && this.ReasignedPerson_IN.dataReasignedPerson.personaAntigua) && (this.ReasignedPerson_IN.dataReasignedPerson.personaNueva !== this.ReasignedPerson_IN.dataReasignedPerson.personaAntigua)){
      this._personService.reasignedPersons(this.ReasignedPerson_IN).subscribe(
        response=>{
          this.responseServer = response;
          if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
            this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
          }
          let contactAffected = this.responseServer.affectedContact;
          let responsibleAffected = this.responseServer.affectedResponsible;
          this.MENSSAGE_INFO_UPDATE = "Se han modificado "+ contactAffected+ " contactos y " + responsibleAffected+ " responsables";
          $('#selectListNewPerson').modal('close');
          this.toastService.show(this.MENSSAGE_INFO_UPDATE, 4000, CONSTANT.Styles.Success);
          this.deletePerson();
        },error=>{
          this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }else{
      this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
    }
  }

  private findRelationProvider(providerList_IN){
    let contact:number = 0;
    let responsible:number = 0;
    for(let item of providerList_IN){
      if (item.contact === this.Person_IN.identifier.id){
        contact++;
      }
      if(item.responsible === this.Person_IN.identifier.id){
        responsible++;
      }
    }

    return {cont: contact, resp:responsible}
  }

  private deletedPersonContinue() {
    this._personService.deletedPerson(this.Person_IN.identifier.id).subscribe(
      response => {
        this.responseServer = response;
        if (this.responseServer.message === CONSTANT.ResponseServers.InvalidParams) {
          this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
        } else {
          this.toastService.show(CONSTANT.messageToast.PERSON_DELETED_SUCCESS, 4000, CONSTANT.Styles.Success);
          this.getPerson(0);
        }
      }, error => {
        this.toastService.show(CONSTANT.messageToast.PERSON_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
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
