import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import {GLOBAL} from "../global";

@Injectable()
export class LoginService {



  public token: String;
  public url: String;
  constructor( private _http: HttpClient) {
    this.url = GLOBAL.url;
    this.token = "";
  }

  login(data_login, gettoken = null) {
    if(gettoken != null){
      data_login.getToken = gettoken;
    }else{
      data_login.gettoken = "";
    }
    let param = JSON.stringify(data_login);
    let header = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post(this.url+'login', param, {headers:header})

  }

  public getToken(): String{//queda hacer pruebas para ver si esta vacio
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
    }else{
      this.token = sessionStorage.getItem('token')
    }

    return this.token;
  }

}
