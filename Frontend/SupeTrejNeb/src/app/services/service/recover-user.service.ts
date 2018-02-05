import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../global";

@Injectable()
export class RecoverUserService{

  public url: String;

  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

  sendEmail(email):any{
    let param = JSON.stringify(email);
    let header = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post(this.url+'getCodeRecover', param, {headers:header})
  }
}
