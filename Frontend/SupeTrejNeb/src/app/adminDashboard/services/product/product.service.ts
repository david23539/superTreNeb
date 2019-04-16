import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../../../services/global";
import {LoginService} from "../../../services/service/login.service";


@Injectable()
export class ProductService {

  public token;
  public url: String;

  constructor(private _http: HttpClient, private _loginService:LoginService) {
    this.url = GLOBAL.url;
    this.token = "";
  }

  getProduct(productModel){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(productModel);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'getProducts', param, {headers:header})

  }

  getCountProduct(){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'countProducts',{headers:header})
  }

  createProduct(product_IN){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(product_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'createProduct', param, {headers:header})
  }

  purgeProducts() {
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'purgeProducts',{headers:header})
  }

  filterProduct(keyWords){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'filterProducts/'+ keyWords,  {headers:header})
  }

  getProductByCategory(idCategory) {
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'getProductByCategory/'+ idCategory,  {headers:header})
  }

  updateProduct(product_IN){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(product_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'updateProduct', param, {headers:header})
  }
  checkStockProduct(products){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(products);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'checkProductStock', param, {headers:header})
  }

  getProductFavorites(){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'getProductFavorites',  {headers:header})

  }

  deletedProduct(id){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.delete(this.url+'deleteProduct/'+id,{headers:header})
  }

  getProductByCode(params_IN){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'getProductByCode/'+ params_IN.code+'/'+params_IN.name,  {headers:header})
  }


}
