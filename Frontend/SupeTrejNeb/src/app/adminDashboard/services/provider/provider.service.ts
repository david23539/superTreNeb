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


}
