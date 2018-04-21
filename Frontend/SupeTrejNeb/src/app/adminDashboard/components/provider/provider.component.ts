import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {ProviderService} from "../../services/provider/provider.service";
import {Provider} from "../../model/provider/provider.model";
import {MzToastService} from "ng2-materialize";
import {CategoryComponent} from "../category/category.component";
import {CategoryService} from "../../services/category/category.service";
import {TableListComponent} from "../../utils/table-list/table-list.component";

@Component({
  selector: 'providers',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
  providers:[ProviderService, MzToastService, CategoryComponent, CategoryService]
})
export class ProviderComponent implements OnInit {

  @ViewChildren('table2') tableCategoryUsed: QueryList<TableListComponent>;
  @ViewChild('table1') tableCategoryAll: TableListComponent;


  public TITLE:string = CONSTANT.Labels.ProviderTitle;
  public ProviderSearch:string = CONSTANT.Labels.SearchProvider;
  public headsTables:any = CONSTANT.headProvider;
  public HeadCategories:any = CONSTANT.headListCategories;
  public searchResult:string = "";
  public bodyTable: any;
  public bodyCategory: any;
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
  public CIF:string = CONSTANT.Labels.Cif;
  public LAVEL_CATEGORY_NO_USED = CONSTANT.Labels.CategoriesNoUsed;
  public LAVEL_CATEGORY_USED = CONSTANT.Labels.CategoriesUsed;
  public categoriesAllTable:any =[];
  public categoryUsed:any = [];


  constructor(private _providerService:ProviderService, private toastService: MzToastService, private categories:CategoryComponent) {
    this.providerModel_IN = new Provider(
      {reasonSocial:"",resposiblePerson:"",contactPerson:"",nifBusiness:"",localizationBussiness:"",relationatedCategories:""},
      {id:""},
      {page:0},
      {navegador:""})
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
        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.PROVIDER_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  filterItem(){
  }

  getProviderByPagination(event){

  }

  getCategoriesComponent(){
    this.categories.getCategoriesOutside().subscribe(
      response=>{
        this.filterCategoriesByUded(response.object)
      },error=>{
        console.log(error)
      }
    );
  }

  addCategorySelected(event){
    console.log(this.tableCategoryUsed);
    this.tableCategoryUsed.first.bodyTableContent = event.object;


    // this.tableCategoryUsed.bodyTableContent.push(event.object);
    this.categoryUsed.push(event.object);
    this.filterCategoriesByUded(this.categoriesAllTable);
  }

  deleteCategorySelected(event){
    this.categoriesAllTable.push(event.object);
    for(let i = 0; i < this.categoryUsed.length; i++){
      if(event.object.id === this.categoryUsed[i].id){
        this.categoryUsed.splice(i,1);
      }
    }
  }

  private filterCategoriesByUded(categories){
    if(this.categoryUsed.length === 0){
      // this.categoryUsed = categories;
      this.categoriesAllTable = categories;
    }else{
      for(let i = 0; i < categories.length; i++){
        for(let j=0; j < this.categoryUsed.length; j++){
          if(categories[i].id === this.categoryUsed[j].id){
            this.categoriesAllTable.splice(i,1);
            break;
          }
        }
      }
      // this.categoryUsed = categories
      // this.tableCategoryAll.bodyTableContent = categories;
      // this.categoriesAllTable = categories;
    }
  }

  onSubmit(){

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
      // this.clearModal();
      this.buttonSaveUpdate = false;
      // this.initStateModal();
      // this.getAllCategories();
      // this.setProperties(event.items);
    }else if(event.operation === CONSTANT.OperationTables.delete && event.items){
      // $('#deletedProduct').modal('open');
      // this.productModel_OUT.identifier.id = event.items.id;

    }
  }

  ngOnInit() {
    $('.modal').modal();
    this.getProvider(0)
  }

}
