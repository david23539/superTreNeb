import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../../../services/global";
import {LoginService} from "../../../services/service/login.service";

@Injectable()
export class BillService{
  public token;
  public url: String;

  constructor(private _http: HttpClient, private _loginService:LoginService) {
    this.url = GLOBAL.url;
    this.token = "";
  }

  selectCategoriesByProvider(providerId_IN){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'getCategoriesByProvider/'+providerId_IN,{headers:header})
  }

  selectProductByCategory(categoryId_IN){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'getProductByCategory/'+categoryId_IN,{headers:header})
  }

  createBill(Bill_IN){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(Bill_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'createBill', param, {headers:header})
  }

}
