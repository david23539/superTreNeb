import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import {GLOBAL} from "../global";

@Injectable()
export class LoginService {




  public url: String;
  constructor( private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login(data_login, gettoken = null) {
    if(gettoken != null){
      data_login.gettoken = gettoken;
    }else{
      data_login.gettoken = "";
    }
    let param = JSON.stringify(data_login);
    let header = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post(this.url+'login', param, {headers:header})

  }

}
