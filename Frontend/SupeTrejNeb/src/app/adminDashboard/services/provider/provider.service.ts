import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../../../services/global";
import {LoginService} from "../../../services/service/login.service";

@Injectable()
export class ProviderService {

  public token;
  public url: String;

  constructor(private _http: HttpClient, private _loginService:LoginService) {
    this.url = GLOBAL.url;
    this.token = "";
  }

  getProviders(provider_IN){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(provider_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'getProviders', param, {headers:header})
  }

  createProvider(provider_IN){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(provider_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'createProvider', param, {headers:header})
  }

  updateProvider(provider_IN){
    this.token = this._loginService.getToken();
    let identifier = provider_IN.identifier.id;
    let param = JSON.stringify(provider_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'updateProvider/'+identifier, param, {headers:header})
  }

  countProviders(){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'countProvider', {headers:header})
  }

  filterProvider(param_IN){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'filterProvider/'+param_IN, {headers:header})
  }

  deletedProvider(id){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.delete(this.url+'deleteProvider/'+id,{headers:header})
  }


}
