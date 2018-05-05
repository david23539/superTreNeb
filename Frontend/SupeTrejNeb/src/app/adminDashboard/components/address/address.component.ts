import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {Address} from "../../model/address/address.model";
import {DataBrowser} from "../../../utils/dataBrowser";
import {AddressService} from "../../services/address/address.service";
import {MzToastService} from "ng2-materialize";

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers:[DataBrowser, AddressService, MzToastService]
})
export class AddressComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.AddressTitle;
  public searchResult:string = "";
  public AddressSearch:string = CONSTANT.Labels.SearchAddress;
  public headsTables:any = CONSTANT.headAddress;
  public bodyTable:any;
  public count:number;
  public buttonSaveUpdate:boolean;
  public ADD_ADDRESS_TITTLE = CONSTANT.Labels.AddAddress;
  public LABEL_PROVINCE = CONSTANT.Labels.Province;
  public LABEL_POPULATION = CONSTANT.Labels.Population;
  public LABEL_TYPEVIA = CONSTANT.Labels.TypeVia;
  public LABEL_POSTALCODE = CONSTANT.Labels.PostalCode;
  public LABEL_NUMBER = CONSTANT.Labels.Number;
  public LABEL_DOOR = CONSTANT.Labels.Door;
  public LABEL_FLOOR = CONSTANT.Labels.Floor;
  public LABEL_NAME_STREET = CONSTANT.Labels.Street;
  public LABEL_SAVE = CONSTANT.Labels.Save;
  public LABEL_UPDATE = CONSTANT.Labels.Update;
  public LABEL_CANCEL = CONSTANT.Labels.Cancel;
  public DELETED_ADDRESS_TITTLE = CONSTANT.Labels.DeleteAddress;
  public DELETED_ADDRESS_SUBTITTLE = CONSTANT.Labels.Confirm_Deleted_Address;
  public LABEL_DELETED_ADDRESS = CONSTANT.Labels.Delete;
  public LABEL_CANCEL_ADDRESS = CONSTANT.Labels.Cancel;
  public operationType: string;
  public address_IN: Address;
  public browser: any;
  public responseServer:any;

  public invalidClassStyleNumberForm:string = CONSTANT.Styles.Invalid;
  public validClassStyleNumberForm:string = CONSTANT.Styles.Valid;
  public classStyleNumberForm:string = "";
  public invalidClassStylePopulationForm:string = CONSTANT.Styles.Invalid;
  public validClassStylePopulationForm:string = CONSTANT.Styles.Valid;
  public classStylePopulationForm:string = "";
  public invalidClassStyleDoorForm:string = CONSTANT.Styles.Invalid;
  public validClassStyleDoorForm:string = CONSTANT.Styles.Valid;
  public classStyleDoorForm:string = "";
  public invalidClassStyleFloorForm:string = CONSTANT.Styles.Invalid;
  public validClassStyleFloorForm:string = CONSTANT.Styles.Valid;
  public classStyleFloorForm:string = "";
  public invalidClassStyleProvinceForm:string = CONSTANT.Styles.Invalid;
  public validClassStyleProvinceForm:string = CONSTANT.Styles.Valid;
  public classStyleProvinceForm:string = "";
  public invalidClassStyleNameStreetForm:string = CONSTANT.Styles.Invalid;
  public validClassStyleNameStreetForm:string = CONSTANT.Styles.Valid;
  public classStyleNameStreetForm:string = "";
  public itemIdSelectDeleted:string;

  constructor(private _getDataBrowser: DataBrowser, private _addressService:AddressService, private toastService: MzToastService) {
    this.initializateAddress();
    this.browser = this._getDataBrowser.getDataBrowser();
  }

  private initializateAddress(){
    this.address_IN = new Address({provincia:"", poblacion:"",tipoVia:"",codigoPostal:"",numero:0,piso:0,puerta:"",nombreCalle:""},
      {id:""}, {page:0}, {navegador:""});
  }
  ngOnInit() {
    this.createInstanceModal();
    this.getAddressByPagination(0);
    this.countAddress();
  }


  private countAddress(){
    this._addressService.getCountAddress().subscribe(
      response =>{
        this.responseServer = response;
        this.count = this.responseServer.count
      },error=>{
        this.toastService.show(CONSTANT.messageToast.ADDRESS_ERROR, 4000, CONSTANT.Styles.Error);
    }
    )
  }

  private createInstanceModal(){
    $('.modal').modal();
  }

  filterItem(){
    if(this.searchResult && this.searchResult.length > 2) {
      this.filterAddress();
    }else{
      this.getAddressByPagination(0);
    }
  }

  private filterAddress(){
    this._addressService.getAddressFildered(this.searchResult).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.ResponseServers.No_Data_Address){
          this.toastService.show(CONSTANT.messageToast.NO_DATA_CATEGORY, 4000, CONSTANT.Styles.Info);
        }else if(this.responseServer.message == CONSTANT.ResponseServers.InvalidParams){
          this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
        }else{
          this.bodyTable = this.responseServer.address
        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.ADDRESS_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )

  }

  getAddressesByPagination(event){

  }

  validateVisualForm(value){

    switch (value){
      case 'province':
        if(this.address_IN.dataAddress.provincia == ""){
          this.classStyleProvinceForm = this.invalidClassStyleProvinceForm;
        }else{
          this.classStyleProvinceForm = this.validClassStyleProvinceForm;
        }
        break;
      case 'population':
        if(this.address_IN.dataAddress.poblacion == ""){
          this.classStylePopulationForm = this.invalidClassStylePopulationForm;
        }else{
          this.classStylePopulationForm = this.validClassStylePopulationForm;
        }
        break;
      case 'number':
        if(this.address_IN.dataAddress.numero == 0){
          this.classStyleNumberForm = this.invalidClassStyleNumberForm;
        }else{
          this.classStyleNumberForm = this.validClassStyleNumberForm;
        }
        break;
      case 'door':
        if(this.address_IN.dataAddress.puerta == ""){
          this.classStyleDoorForm = this.invalidClassStyleDoorForm;
        }else{
          this.classStyleDoorForm = this.validClassStyleDoorForm;
        }
        break;
      case 'floor':
        if(this.address_IN.dataAddress.piso == 0){
          this.classStyleFloorForm = this.invalidClassStyleFloorForm;
        }else{
          this.classStyleFloorForm = this.validClassStyleFloorForm;
        }
        break;
      case 'nameStreet':
        if(this.address_IN.dataAddress.nombreCalle == ""){
          this.classStyleNameStreetForm = this.invalidClassStyleNameStreetForm;
        }else{
          this.classStyleNameStreetForm = this.validClassStyleNameStreetForm;
        }
        break;
    }
  }

  getAddressByPagination(page){
    this.address_IN.pagination.page = page*10;
    this._addressService.getAddressPagination(this.address_IN).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.ResponseServers.No_Data_Address){
          this.toastService.show(CONSTANT.messageToast.NO_DATA_AVAIBLE, 4000, CONSTANT.Styles.Info);
        }else{
          this.bodyTable = this.responseServer.address
        }
      },error =>{
        this.toastService.show(CONSTANT.messageToast.ADDRESS_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  onSubmit(createUpdateForm){
    if(this.operationType === CONSTANT.OperationTables.create){
      this.address_IN.direccionIp.navegador = this.browser.browser;
      this._addressService.createAddress(this.address_IN).subscribe(
        response=>{
          this.responseServer = response;
          if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
            this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
          }else if(this.responseServer.message === CONSTANT.ResponseServers.Direction_Success){
            this.toastService.show(CONSTANT.messageToast.ADDRESS_NEW_SUCCESS, 4000, CONSTANT.Styles.Success);
            $('#createAddress').modal('close');
            createUpdateForm.reset();
            this.getAddressByPagination(0);
          }
        },error=>{
          this.toastService.show(CONSTANT.messageToast.ADDRESS_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }else if(this.operationType === CONSTANT.OperationTables.update){
      if(!this.address_IN.direccionIp.navegador){
        this.address_IN.direccionIp.navegador = this.browser.browser;
      }
      this._addressService.updateAddress(this.address_IN).subscribe(
        response=>{
          this.responseServer = response;
          if(this.responseServer.message === CONSTANT.ResponseServers.Address_Success_Update){
            this.toastService.show(CONSTANT.messageToast.ADDRESS_UPDATE_SUCCESS, 4000, CONSTANT.Styles.Success);
            $('#createAddress').modal('close');
            createUpdateForm.reset();
            this.getAddressByPagination(0);
          }else if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
            this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
          }
        },error=>{
          this.toastService.show(CONSTANT.messageToast.ADDRESS_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }
  }

  deleteAddress(){
    this._addressService.deletedAddress(this.itemIdSelectDeleted).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.ResponseServers.Address_Success_Deleted){
          this.toastService.show(CONSTANT.messageToast.ADDRESS_DELETED_SUCCESS, 4000, CONSTANT.Styles.Success);
          this.getAddressByPagination(0);
        }else if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
          this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.ADDRESS_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  addUpdateAddress(event){
    if (event.operation === CONSTANT.OperationTables.create) {
      this.operationType = CONSTANT.OperationTables.create;
      this.initializateAddress();
      $('#createAddress').modal('open');
      this.buttonSaveUpdate = true;
    }else if(event.operation === CONSTANT.OperationTables.update && event.items){
      this.operationType = CONSTANT.OperationTables.update;
      $('#createAddress').modal('open');
      this.initializateAddress();
      this.buttonSaveUpdate = false;
      let addressUpdate_IN = event.items;
      this.address_IN.dataAddress.provincia = addressUpdate_IN.provincia;
      this.validateVisualForm('province');
      this.address_IN.dataAddress.poblacion = addressUpdate_IN.location;
      this.validateVisualForm('population');
      this.address_IN.dataAddress.nombreCalle= addressUpdate_IN.nombreCalle;
      this.validateVisualForm('nameStreet');
      this.address_IN.dataAddress.piso= addressUpdate_IN.piso;
      this.validateVisualForm('floor');
      this.address_IN.dataAddress.puerta= addressUpdate_IN.puerta;
      this.validateVisualForm('door');
      this.address_IN.dataAddress.numero= addressUpdate_IN.numero;
      this.validateVisualForm('number');
      this.address_IN.dataAddress.tipoVia= addressUpdate_IN.tipoVia;
      this.address_IN.dataAddress.codigoPostal= addressUpdate_IN.codigoPostal;
      this.address_IN.identifier.id = addressUpdate_IN.id;
      this.ADD_ADDRESS_TITTLE = CONSTANT.Labels.ModifyAddress;
    }else if(event.operation === CONSTANT.OperationTables.delete && event.items){
      $('#deletedAddres').modal('open');
      this.itemIdSelectDeleted = event.items.id;
    }
  }


}

