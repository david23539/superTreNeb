import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../global";

@Injectable()
export class NewPassService {

  public url: String;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  recoverPassword(data){
    let param = JSON.stringify(data);
    let header = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post(this.url+'compareCode', param, {headers:header})
  }

}
