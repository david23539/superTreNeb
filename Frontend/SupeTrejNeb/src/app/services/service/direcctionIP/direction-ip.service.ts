import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../../global";

@Injectable()
export class DirectionIpService {

  public url: String;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  blockIp(navegador){
    let param = JSON.stringify(navegador);
    let header = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post(this.url+'blockPC', param, {headers:header})
  }

}
