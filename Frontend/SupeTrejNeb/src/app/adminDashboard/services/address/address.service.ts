import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../../../services/global";
import {LoginService} from "../../../services/service/login.service";

@Injectable()
export class AddressService {

  public token;
  public url: String;

  constructor(private _http: HttpClient, private _loginService:LoginService) {
    this.url = GLOBAL.url;
    this.token = "";
  }

  createAddress(address_IN){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(address_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'createAddress', param, {headers:header})
  }

  getAddressPagination(address_IN){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(address_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'getAddressPagination', param, {headers:header})
  }

  getAddressFildered(keyWords){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'filterAddress/'+keyWords,{headers:header})
  }

  updateAddress(address_IN){
    if(this.token === ""){
      this.token = this._loginService.getToken();
    }
    let identifier = address_IN.identifier.id;
    let param = JSON.stringify(address_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.put(this.url+'updateAddress/'+identifier, param, {headers:header})
  }

  deletedAddress(id){
    if(this.token === ""){
      this.token = this._loginService.getToken();
    }
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.delete(this.url+'deletedAddress/'+id,{headers:header})
  }

  getCountAddress(){
    if(this.token === ""){
      this.token = this._loginService.getToken();
    }
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'countAddress',{headers:header})
  }

}
