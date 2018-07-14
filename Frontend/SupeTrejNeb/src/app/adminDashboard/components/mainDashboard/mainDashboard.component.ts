import { Component, OnInit} from '@angular/core';
import {GLOBAL} from "../../../services/global";
import {CONSTANT} from "../../../services/constant";
import {ProductService} from "../../services/product/product.service";
import {MzToastService} from "ng2-materialize";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'main-dashboard',
  templateUrl: './mainDashboard.component.html',
  styleUrls: ['./mainDashboard.component.css'],
  providers:[ProductService, MzToastService],
  host:{
    '(document:keyup)':'getValueKey($event)',
    '(document:keypress)':'prueba($event)'
  }
})
export class MainDashboardComponent implements OnInit {

  public OPEN_BOX_REGISTER = "Abrir caja registradora";
  public ADD_PRODUCT = "Añadir Producto Manual";
  public PAY_FINISH = "Pagar y Finalizar";
  public INCLUDE_PRODUCT = "Incluir Producto Manualmente";
  public SEARCH_PRODUCT = "Buscar Productos";
  public CLASS_MAX = "col l12";
  public shoppingList= [];
  public totalItemPrice: number = 0;
  public itemSelected: any;
  public payMoney:number = 0;
  public returnPay:number = 0;
  public actionNumberKey:string;
  public constant:any;
  public constantToast:any;
  public finalPriceAsc:Boolean = true;
  public quantityAsc:Boolean = true;
  public productAsc:Boolean = true;
  // public addProductName = "Varios";
  public addProductPrice :any;
  public addProductQuantity:number = 1;
  public date: any;
  public searchProduct: string;
  public responseServer: any;
  public productsSearch:any;
  public url = "";
  public barCode:any;
  public codeProduct:string = "";
  public entra:boolean = false;
  public contextmenu = true;
  public contextmenuX = 0;
  public contextmenuY = 0;
  public arrays = [];

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%' // Ending top style attribute
  };



  constructor(private _productService:ProductService, private _toastService:MzToastService, private _route: ActivatedRoute, private _router:Router, private _notification: NotificationService) {
    this.url = GLOBAL.url;
    this.constant = CONSTANT.keysPress;
    this.constantToast = CONSTANT.messageToast;
    this.actionNumberKey = "";
    this.addProductPrice = null;
  }

  prueba(evento){
    let result = CONSTANT.hotkeys.find((elemento)=>{
      return elemento == evento.key;
    });
    if(!result){
      this.codeProduct += evento.key;
      this.entra = true;

    }else{
      let code = {
        key : this.codeProduct
      };
      this.entra = false;
      this.getValueKey(code);
      this.codeProduct = "";
    }
  }
  clearPrice(){
    if(this.addProductPrice === 0){
      this.addProductPrice = '';
    }
  }

  closedContextMenu(){
    this.contextmenu = true;
  }

  ngOnInit() {
    $('.modal').modal();
    $('.tabs').tabs();
    this.getProductFavorite();


  }


  getTotalFinalPrice(items){
    this.totalItemPrice = 0;
    for(let item of items){
      this.totalItemPrice += item.finalPrice * item.quantity;
    }
/*
    let numerro = this.totalItemPrice.toString();
    let primeras  = numerro.indexOf(".");
    let numeroFinal = numerro.substr(0, primeras+3);
    this.totalItemPrice = parseFloat(numeroFinal);*/
    this.calculateReturnPayDinamic(this.totalItemPrice)
  }

  private getProductFavorite(){
    this._productService.getProductFavorites().subscribe(
      response=>{
        this.responseServer = response;
        this.arrays = this.responseServer.products;
      },error=>{
        this._toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  searchProductRef(){
    if(this.searchProduct.length >=3){
      this._productService.filterProduct(this.searchProduct).subscribe(
        response=>{
          this.responseServer = response;
          this.productsSearch = this.responseServer.products;
        },error=>{
          this._toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }else{
      this.productsSearch = [];
    }
  }

  addProductSearch(item){

    let cost = item.cost;
    let marg = item.margin;
    let iva = item.iva;
    let costIva = cost + ((cost * iva)/100);
    let costMargIv = costIva +((costIva * marg)/100);
    let exists = false;
    const newItemToList = {
      id: item.id,
      product:item.name,
      quantity: 1,
      unitPrice:0,
      finalPrice: costMargIv.toFixed(2)
    };
    for(let elemt of this.shoppingList){
      if(elemt.id === newItemToList.id){
        elemt.quantity ++;
        exists = true;
      }
    }
    /*let result = this.shoppingList.find((elemt)=>{
      return elemt.id == newItemToList.id;
    });*/
    if(exists){
      this.getTotalFinalPrice(this.shoppingList);
    }else{
      this.shoppingList.push(newItemToList);
      this.getTotalFinalPrice(this.shoppingList);

    }



  }

  addProductToList(){
    const numberElementOfList = this.shoppingList.length;
    if(this.addProductPrice){
      const newItemToList = {
        id: numberElementOfList+1,
        product:"Balanza",
        quantity: this.addProductQuantity,
        unitPrice:0,
        finalPrice: this.addProductPrice
      };
      let result = this.shoppingList.find((elemt)=>{
        return elemt.id == newItemToList;
      });
      if(!result){
        this.shoppingList.push(newItemToList);
        this.getTotalFinalPrice(this.shoppingList);
      }

    }
  }


  changeRecordOfList(item){
    this.itemSelected = item;
    this.actionNumberKey = "";
  }

  getValueKey(content){
    if((content.key.length === 1 && content.code && content.code.indexOf("Numpad")!== -1) || content.key === "Control" || content.key === this.constant.SUM
    || content.key === this.constant.REST || content.key === this.constant.DELETEITEM || content.key === this.constant.MULTIPLICATION){
      this.calculateActions(content.key, true)
    }else if(content.key.length >= 7 && content.key.length <= 13){
      this.barCode = content.key;
      this.getProductByScannerBar(content.key);
    }

  }

  checkStock(){
    let prepareShopList = [];
    for(let item of this.shoppingList){
      if('string' === typeof(item.id))
        prepareShopList.push({id:item.id, quantity:item.quantity})
    }
    if(prepareShopList.length !== 0) {
      this._productService.checkStockProduct(prepareShopList).subscribe(
        response => {
          this.responseServer = response;
          if (this.responseServer.message === CONSTANT.ResponseServers.InvalidParams) {
            this._toastService.show(CONSTANT.messageToast.PARAMS_INVALID, 4000, CONSTANT.Styles.Warning);
          } else if(this.responseServer.products .length > 0){
            this._notification.changeNotification(this.responseServer.products);
            //this._toastService.show("calculado los stocks", 4000, CONSTANT.Styles.Success);
          }
        }, error => {
          this._toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
        }
      );
    }
  }

  deleteItemShoppingList(itemDelete){
    for (let i = 0; i < this.shoppingList.length; i++){
      if(this.shoppingList[i].id == itemDelete.id){
        this.shoppingList.splice(i, 1);
        this.getTotalFinalPrice(this.shoppingList);
      }
    }
  }

  addProduct(event){

    if(event.code === 'Enter' || event.code === 'NumpadEnter'){
      this.addProductToList();
      this.actionNumberKey ="";
      $('#addProducts').modal('close');
    }
  }

  openBoxMoney(){
    const ficha=document.getElementById("openBox");
    const ventimp=window.open(' ','popimpr');
    ventimp.document.write(ficha.innerHTML);
    ventimp.document.close();
    ventimp.print();
    ventimp.close();
  }

  getDateToday(){
    let dateFULL = new Date();
    let day = dateFULL.getDate() + "-";
    let month = dateFULL.getMonth()+"-";
    let yearFull = dateFULL.getFullYear() + "   ";
    let hour = dateFULL.getHours()+":";
    let minutes = dateFULL.getMinutes();
    this.date = day+month+yearFull+hour+minutes;
  }

  printTickets(){

    const ficha=document.getElementById("ticket");
    const ventimp=window.open(' ','popimpr');
    ventimp.document.write(ficha.innerHTML);
    ventimp.document.close();
    ventimp.print();
    ventimp.close();

  }

  calculateReturnPayDinamic( total){
    if(this.payMoney){
      this.returnPay =  this.payMoney - total;
    }

  }

  getProductByScannerBar(code){
    if(CONSTANT.hotkeys.indexOf(code) === -1) {
      this.barCode = code;//TODO eliminar cuando sea necesario y este implementado el lector de codigos de barras
      this._productService.getProductByCode(code).subscribe(
        response => {
          this.responseServer = response;
          if (this.responseServer.message === CONSTANT.ResponseServers.InvalidParams) {
            this._toastService.show(CONSTANT.messageToast.PARAMS_INVALID, 4000, CONSTANT.Styles.Warning);
          } else if (this.responseServer.message === CONSTANT.ResponseServers.No_Data_Product) {
            this._toastService.show(CONSTANT.messageToast.NO_DATA_AVAIBLE, 4000, CONSTANT.Styles.Info);
            $('#addNewProduct').modal('open');
          } else {
            this.addProductSearch(this.responseServer.products);
          }
        }, error => {
          this._toastService.show(CONSTANT.messageToast.PRODUCT_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }
  }

  goToNewProduct(){
    this._router.navigate(['/dashboard/product',{codeBar:this.barCode}]);
  }

  calculateActions(value, scanner = false){

    let quantityItem = 0;
    if((value.charCodeAt(0)>=48 && value.charCodeAt(0)<=57) || (value.charCodeAt(0)==46 || value.charCodeAt(0)==44)){
      if(!scanner){
        this.actionNumberKey = "";
      }
      this.actionNumberKey +=value;
    }


    if(value == "Control" && this.actionNumberKey){
      this.payMoney = parseFloat(this.actionNumberKey);
      this.calculateReturnPayDinamic(this.totalItemPrice);
      this.actionNumberKey = "";
    }

    if(this.itemSelected){
      if(value && value === this.constant.SUM){
        quantityItem = this.itemSelected.quantity +1;
        this.itemSelected.quantity = quantityItem;
        //this.updateShoppingList(this.itemSelected);
        this.getTotalFinalPrice(this.shoppingList);
      }else if(value === this.constant.REST){
        quantityItem = this.itemSelected.quantity - 1;
        if(quantityItem == 0){
          this.deleteItemShoppingList(this.itemSelected);
        }else{
          this.itemSelected.quantity = quantityItem;
          //this.updateShoppingList(this.itemSelected);
          this.getTotalFinalPrice(this.shoppingList);
        }
      }else if(value === this.constant.DELETEITEM){
        this.deleteItemShoppingList(this.itemSelected);
      }else if(value === this.constant.MULTIPLICATION && this.actionNumberKey){
        quantityItem = this.itemSelected.quantity;
        this.itemSelected.quantity = quantityItem * parseFloat(this.actionNumberKey);
        this.getTotalFinalPrice(this.shoppingList);
        this.actionNumberKey= "";
        // this.updateShoppingList(this.itemSelected);
      }
    }else{

    }
  }


  orderTableByColums(colums){
    let beforeItem;
    let afterItem;
    let i = 0;
    if(this.shoppingList){
      switch (colums){
        case "product":
          while (i < this.shoppingList.length) {
            i++;
            for (let i = 0; i < this.shoppingList.length; i++) {
              beforeItem = this.shoppingList[i];
              afterItem = this.shoppingList[i + 1];
              if (this.productAsc && afterItem && (beforeItem.product > afterItem.product)) {
                this.shoppingList.splice(i + 1, 1);
                this.shoppingList.splice(i, 0, afterItem)
              }else if(!this.productAsc && afterItem && (beforeItem.product < afterItem.product)){
                this.shoppingList.splice(i + 1, 1);
                this.shoppingList.splice(i, 0, afterItem)
              }
            }
          }
          break;
        case "quantity":
          while (i < this.shoppingList.length) {
            i++;
            for (let i = 0; i < this.shoppingList.length; i++) {
              beforeItem = this.shoppingList[i];
              afterItem = this.shoppingList[i + 1];
              if (this.quantityAsc && afterItem && (beforeItem.quantity > afterItem.quantity)) {
                this.shoppingList.splice(i + 1, 1);
                this.shoppingList.splice(i, 0, afterItem)
              }else if(!this.quantityAsc && afterItem && (beforeItem.quantity < afterItem.quantity)){
                this.shoppingList.splice(i + 1, 1);
                this.shoppingList.splice(i, 0, afterItem)
              }
            }
          }
          break;
        case "finalPrice":
          while (i < this.shoppingList.length) {
            i++;
            for (let i = 0; i < this.shoppingList.length; i++) {
              beforeItem = this.shoppingList[i];
              afterItem = this.shoppingList[i + 1];
              if (this.finalPriceAsc && afterItem && (beforeItem.finalPrice > afterItem.finalPrice)) {
                this.shoppingList.splice(i + 1, 1);
                this.shoppingList.splice(i, 0, afterItem)
              }else if(!this.finalPriceAsc && afterItem && (beforeItem.finalPrice < afterItem.finalPrice)){
                this.shoppingList.splice(i + 1, 1);
                this.shoppingList.splice(i, 0, afterItem)
              }
            }
          }
          break;
      }
    }
  }
}
