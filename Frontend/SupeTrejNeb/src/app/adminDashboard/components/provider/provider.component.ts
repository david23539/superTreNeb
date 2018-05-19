import {Component, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {ProviderService} from "../../services/provider/provider.service";
import {Provider} from "../../model/provider/provider.model";
import {MzToastService} from "ng2-materialize";
import {CategoryComponent} from "../category/category.component";
import {CategoryService} from "../../services/category/category.service";
import {SelectCategoriesComponent} from "../select-categories/select-categories.component";
import {PersonsComponent} from "../persons/persons.component";
import {PersonService} from "../../services/person/person.service";
import {AddressComponent} from "../address/address.component";
import {AddressService} from "../../services/address/address.service";
import {DataBrowser} from "../../../utils/dataBrowser";
import {UploadService} from "../../services/uploadFiles/upload.service";


@Component({
  selector: 'providers',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
  providers:[ProviderService, MzToastService, CategoryComponent,
    CategoryService, SelectCategoriesComponent, PersonService, PersonsComponent, AddressService,
    AddressComponent, DataBrowser, UploadService]
})
export class ProviderComponent implements OnInit {




  @Output() sendProviders = new EventEmitter();

  public TITLE:string = CONSTANT.Labels.ProviderTitle;
  public ProviderSearch:string = CONSTANT.Labels.SearchProvider;
  public headsTables:any = CONSTANT.headProvider;

  public searchResult:string = "";
  public bodyTable: any;

  public classStyleFormName:string = "";
  public validClassStyleFormName:string = CONSTANT.Styles.Valid;
  public invalidClassStyleFormName:string = CONSTANT.Styles.Invalid;
  public classStyleFormCif:string = "";
  public validClassStyleFormCif:string = CONSTANT.Styles.Valid;
  public invalidClassStyleFormCif:string = CONSTANT.Styles.Invalid;
  public countProvider:number;
  public providerModel_IN:Provider;
  public responseServer:any;
  public operationType:string;
  public ADD_PROVIDER_TITTLE:string = CONSTANT.Labels.AddProvider;
  public ADD_UPDATE_TITTLE:string = CONSTANT.Labels.UpdateProvider;
  public buttonSaveUpdate:boolean;
  public LABEL_SAVE_PROVIDER:string = CONSTANT.Labels.Save;
  public LABEL_UPDATE_PROVIDER:string = CONSTANT.Labels.Update;
  public LABEL_CANCEL_PROVIDER:string = CONSTANT.Labels.Cancel;
  public LABEL_CATEGORIES:string = CONSTANT.Labels.SelectCategories;
  public LABEL_ADDRESS:string = CONSTANT.Labels.SelectAddress;
  public LABEL_RESPONSIBLE:string = CONSTANT.Labels.SelectResponsible;
  public LABEL_CONTACT:string = CONSTANT.Labels.SelectContact;
  public TOLLTIP_CATEGORIES:string = CONSTANT.Labels.TooltipCategoy;
  public TOLLTIP_ADDRESS:string = CONSTANT.Labels.TooltipAddress;
  public TOLLTIP_RESPOSIBLE:string = CONSTANT.Labels.TooltipResposible;
  public TOLLTIP_CONTACT:string = CONSTANT.Labels.TooltipContact;
  public TOLLTIP_CIF:string = CONSTANT.Labels.TooltipCif;
  public TOLLTIP_SOCIAL_REASON:string = CONSTANT.Labels.TooltipReason;
  public NAMEPROVIDER:string = CONSTANT.Labels.SocialReason;
  public SELECT_PERSON_LABEL = CONSTANT.Labels.SelectPerson;
  public SELECT_ADDRESS_LABEL = CONSTANT.Labels.SelectAddress;
  public DELETED_PROVIDER_TITTLE = CONSTANT.Labels.DeleteProvider;
  public DELETED_PROVIDER_SUBTITTLE = CONSTANT.Labels.Confirm_Deleted_Provider;
  public LABEL_DELETED_PROVIDER = CONSTANT.Labels.Delete;


  public CIF:string = CONSTANT.Labels.Cif;
  public categoriesAllTable:any =[];
  public personContactAllList_OUT:any = [];
  public personResponsibleAllList_OUT:any = [];
  public addressAllList_OUT:any = [];
  public headPersonTable:any = CONSTANT.headPerson;
  public headAddressTable:any = CONSTANT.headAddress;
  public categoryUsed:any = [];
  public browser: any;
  public countAddress:number;



  constructor(private _providerService:ProviderService,
              private toastService: MzToastService,
              private categories:CategoryComponent,
              private selectCategories: SelectCategoriesComponent,
              private _personController: PersonsComponent,
              private _addressController: AddressComponent,
              private _getDataBrowser: DataBrowser) {

    this.providerModel_IN = new Provider(
      {reasonSocial:"",resposiblePerson:"",contactPerson:"",nifBusiness:"",localizationBussiness:"",relationatedCategories:""},
      {id:""},
      {page:0},
      {navegador:""});
    this.browser = this._getDataBrowser.getDataBrowser();
  }


  private getProvider(page){
    this.providerModel_IN.pagination.page = page * 10;
    this._providerService.getProviders(this.providerModel_IN).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.ResponseServers.No_Data_Provider){
          this.toastService.show(CONSTANT.messageToast.NO_DATA_AVAIBLE, 4000, CONSTANT.Styles.Info);
        }else{
        this.bodyTable = this.responseServer.providers;
        this.getCountProvider();
        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.PROVIDER_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  private getCountProvider(){
    this._providerService.countProviders().subscribe(
      response=>{
        this.responseServer = response;
        this.countProvider = this.responseServer.count;
        this.emitProvider();
      },error=>{
        this.toastService.show(CONSTANT.messageToast.PROVIDER_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  private emitProvider(){
    this.sendProviders.emit({
      providers: this.bodyTable,
      count:this.countProvider
    })
  }

  getAddress(page = 0){
    this._addressController.getAddressByPagination(page);
    this._addressController.sendData.subscribe(
      response=>{
       this.addressAllList_OUT = response.address;
       this.countAddress = response.count;
      },error=>{
        console.log(error);
      }
    )
  }

  getAddressPagination(event){
    this.getAddress(event.page -1 )
  }

  selectAddress(event){
    this.providerModel_IN.dataProvider.localizationBussiness = event.object.id;
    $('#selectAddress').modal('close');
  }

  filterItem(){
    if((this.searchResult || this.searchResult == '') && this.searchResult.length < 3) {
      this.getProvider(0);
    }else{
      this.getProviderFilter();
    }
  }

  getProviderByPagination(event){
    this.getProvider(event.page - 1);
  }

  private getProviderFilter(){
    this._providerService.filterProvider(this.searchResult).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.ResponseServers.No_Data_Provider) {
          this.toastService.show(CONSTANT.messageToast.NO_DATA_AVAIBLE, 4000, CONSTANT.Styles.Info);
        }else if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
            this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
        }else{
          this.bodyTable = this.responseServer.providers;
          this.emitProvider();

        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.PROVIDER_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  selectPersonContact(event){
    this.providerModel_IN.dataProvider.contactPerson = event.object.id;
    $('#selectContactPerson').modal('close');
  }

  selectPersonResposible(event){
    this.providerModel_IN.dataProvider.resposiblePerson = event.object.id;
    $('#selectResponsiblePerson').modal('close');
  }

  categoriesSelected(event){
    this.providerModel_IN.dataProvider.relationatedCategories = this.prepareReturnListObject(event.objects);
    this.categoryUsed = event.objects;
    this.categoriesAllTable = event.result;
  }

  private prepareReturnListObject(listObject){
    let listReturn = [];
    for (let i = 0; i < listObject.length; i++){
      listReturn.push(listObject[i].id);
    }
    return listReturn;

  }

  getCategoriesComponent(browser){

    this.categories.getCategoriesOutside("firefox").subscribe(
      response=>{

        this.categoriesAllTable = response.object;

      },error=>{
        console.log(error)
      }
    );
  }


  onSubmit(createUpdateForm){
    if(this.operationType === CONSTANT.OperationTables.create){
      if(this.checkValidateData){
        this.providerModel_IN.direccionIp.navegador = this.browser.browser;
        this._providerService.createProvider(this.providerModel_IN).subscribe(
          response=>{
            this.responseServer = response;
            if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
              this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
            }else if(this.responseServer.message === CONSTANT.ResponseServers.Provider_Success){
              this.toastService.show(CONSTANT.messageToast.PROVIDER_NEW_SUCCESS, 4000, CONSTANT.Styles.Success);
              createUpdateForm.reset();
              $('#providerModal').modal('close');
              this.getProvider(0);

            }
          },error=> {
            this.toastService.show(CONSTANT.messageToast.PROVIDER_ERROR, 4000, CONSTANT.Styles.Error);
        }
        )
      }else{
        this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
      }
    }else if(this.operationType === CONSTANT.OperationTables.update){
      this.providerModel_IN.direccionIp.navegador = this.browser.browser;
      if(this.checkValidateData()){
        this._providerService.updateProvider(this.providerModel_IN).subscribe(
          response=>{
            this.responseServer = response;
            if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
              this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
            }else{
              this.toastService.show(CONSTANT.messageToast.PROVIDER_UPDATE_SUCCESS, 4000, CONSTANT.Styles.Success);
              createUpdateForm.reset();
              $('#providerModal').modal('close');
              this.getProvider(0);
            }

          },error=>{
            this.toastService.show(CONSTANT.messageToast.PROVIDER_ERROR, 4000, CONSTANT.Styles.Error);
          }
        )
      }else{
        this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
      }
    }

  }

  private checkValidateData(){
    return !!(this.providerModel_IN.dataProvider.relationatedCategories.length != 0 && this.providerModel_IN.dataProvider.resposiblePerson
      && this.providerModel_IN.dataProvider.contactPerson && this.providerModel_IN.dataProvider.localizationBussiness);
  }

  validateVisualForm(value){
    switch (value) {
      case "name":
        if (this.providerModel_IN.dataProvider.reasonSocial) {
          this.classStyleFormName = this.validClassStyleFormName;
        } else {
          this.classStyleFormName = this.invalidClassStyleFormName;
        }
        break;
      case "cif":
        if (this.providerModel_IN.dataProvider.nifBusiness) {
          this.classStyleFormCif = this.validClassStyleFormCif;
        } else {
          this.classStyleFormCif = this.invalidClassStyleFormCif;
        }
        break;
    }
  }

  addUpdateProvider(event){
    if (event.operation === CONSTANT.OperationTables.create) {
      this.operationType = CONSTANT.OperationTables.create;
      $('#providerModal').modal('open');
      // this.clearModal();
      this.buttonSaveUpdate = true;
      // this.initStateModal();
      // this.getAllCategories();

    }else if(event.operation === CONSTANT.OperationTables.update && event.items){
      this.operationType = CONSTANT.OperationTables.update;
      $('#providerModal').modal('open');
      this.buttonSaveUpdate = false;
      this.providerModel_IN.dataProvider.localizationBussiness = event.items.address.id;
      this.providerModel_IN.dataProvider.resposiblePerson = event.items.responsible.id;
      this.providerModel_IN.dataProvider.contactPerson = event.items.contact.id;
      this.providerModel_IN.dataProvider.nifBusiness = event.items.nif;
      this.providerModel_IN.dataProvider.reasonSocial = event.items.nameBusiness;
      this.providerModel_IN.dataProvider.relationatedCategories = this.setterCategoriesSelected(event.items.categoryProvider);
      this.categoryUsed = event.items.categoryProvider;
      this.providerModel_IN.identifier.id = event.items.id;

    }else if(event.operation === CONSTANT.OperationTables.delete && event.items){

      $('#deletedProvider').modal('open');
      this.providerModel_IN.identifier.id = event.items.id;

    }
  }

   private setterCategoriesSelected(categories_IN){
    let categories_Id = [];
    for(let item of categories_IN){
      categories_Id.push(item.id);
    }
    return categories_Id;
  }

  getPersons(){

    if(this.personContactAllList_OUT.length != 0){
      this.personResponsibleAllList_OUT = this.personContactAllList_OUT;
    }else if(this.personResponsibleAllList_OUT.length != 0){
      this.personContactAllList_OUT = this.personResponsibleAllList_OUT;
    }else if(this.personResponsibleAllList_OUT.length == 0 && this.personContactAllList_OUT.length == 0){
      this._personController.getPerson(0);
      this._personController.sendPerson.subscribe(
        response=>{
          this.personContactAllList_OUT = response.persons;
          this.personResponsibleAllList_OUT = response.persons;
        },error=>{
          console.log(error);
        }
      )
    }

  }

  deleteProvider(){
    if(this.providerModel_IN.identifier.id){
      this._providerService.deletedProvider(this.providerModel_IN.identifier.id).subscribe(
        response=>{
          this.toastService.show(CONSTANT.messageToast.PROVIDER_DELETED_SUCCESS, 4000, CONSTANT.Styles.Success);
          this.getProvider(0)
        },error=>{
          this.toastService.show(CONSTANT.messageToast.PROVIDER_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }
  }



  ngOnInit() {
    $('.modal').modal();
    this.getProvider(0)
  }

}
