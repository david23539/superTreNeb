import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../../global";
import {LoginService} from "../login.service";

@Injectable()
export class UserService {

  public url: String;
  public token;


  constructor(private _http: HttpClient, private _loginService: LoginService) {
    this.url = GLOBAL.url;
  }



  getDataUserByToken(){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'getDataUser', null, {headers:header})
  }


}
