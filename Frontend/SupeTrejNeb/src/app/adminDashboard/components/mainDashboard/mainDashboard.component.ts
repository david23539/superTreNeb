import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../services/constant";

@Component({
  selector: 'main-dashboard',
  templateUrl: './mainDashboard.component.html',
  styleUrls: ['./mainDashboard.component.css'],
  host:{
    '(document:keyup)':'getValueKey($event)'
  }
})
export class MainDashboardComponent implements OnInit{


  public shoppingList:any;
  public totalItemPrice: number = 0;
  public itemSelected: any;
  public payMoney:number = 0;
  public returnPay:number = 0;
  public actionNumberKey:string;
  public constant:any;

  constructor() {
    this.constant = CONSTANT.keysPress;
    this.actionNumberKey = "";
  }



  ngOnInit() {
  this.shoppingList = [{id:"0",product: "leche", quantity: 1, unitPrice:0.22, finalPrice: 0.333, image: "image"},
    {id:"1", product: "tomate", quantity: 1, unitPrice:0.4, finalPrice: 0.5, image: "image"},
    {id:"2", product: "chicles", quantity: 1, unitPrice:0.1, finalPrice: 0.3, image: "image"},
    {id:"3", product: "llave inglesa", quantity: 1, unitPrice:30, finalPrice: 31.5, image: "image"},
    {id:"4", product: "chorizo", quantity: 1, unitPrice:5, finalPrice: 5.5, image: "image"},
    {id:"5", product: "salchichon", quantity: 1, unitPrice:6, finalPrice: 6.5, image: "image"},
    {id:"6", product: "sal", quantity: 1, unitPrice:1, finalPrice: 1.21, image: "image"},
    {id:"7", product: "pan", quantity: 1, unitPrice:0.6, finalPrice: 0.8, image: "image"}];

  this.getTotalFinalPrice(this.shoppingList);
  }
  getTotalFinalPrice(items){
    this.totalItemPrice = 0;
    for(let item of items){
      this.totalItemPrice += item.finalPrice * item.quantity;
    }
    // this.totalItemPrice += this.totalItemPrice + 0.001;
    this.totalItemPrice.toFixed(2);
    this.calculateReturnPayDinamic(this.totalItemPrice)
    // Math.round(this.totalItemPrice * 100) / 100;
  }






  changeRecordOfList(item){
    this.itemSelected = item;
    this.actionNumberKey = "";
    console.log(this.itemSelected)
  }

  getValueKey(content){
    this.calculateActions(content.key)
  }

  updateShoppingList(itemUpdate){
    for (let i = 0; i < this.shoppingList.length; i++){
      if(this.shoppingList[i].id == itemUpdate.id){
        this.shoppingList.splice(i, 1);
        this.shoppingList.push(itemUpdate);
        this.shoppingList.sort();
        this.getTotalFinalPrice(this.shoppingList);
      }
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

  calculateReturnPayDinamic( total){
    if(this.payMoney){
      this.returnPay =  this.payMoney - total;
    }

  }


  calculateActions(value){
    console.log(value);
    let quantityItem = 0;
    if((value.charCodeAt(0)>=48 && value.charCodeAt(0)<=57) || (value.charCodeAt(0)==46 || value.charCodeAt(0)==44)){
      this.actionNumberKey +=value;
      console.log(this.actionNumberKey);
    }

    if(value == this.constant.ENTER && this.actionNumberKey){
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
    }

  }

}
