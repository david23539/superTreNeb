import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../../../services/global";
import {LoginService} from "../../../services/service/login.service";

@Injectable()
export class PersonService {

  public token;
  public url: String;

  constructor(private _http: HttpClient, private _loginService:LoginService) {
    this.url = GLOBAL.url;
    this.token = "";
  }

  getPersonPagination(person_IN){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(person_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'getPersonPagination', param, {headers:header})
  }

  getPersonFildered(keyWords){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'filterPerson/'+keyWords,{headers:header})
  }

  createPerson(person_IN){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(person_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'createPerson', param, {headers:header})
  }

  updatePerson(person_IN){
    this.token = this._loginService.getToken();
    let identifier = person_IN.identifier.id;
    let param = JSON.stringify(person_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'updatePerson/'+ identifier, param, {headers:header})
  }

  deletedPerson(id){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.delete(this.url+'deletedPerson/'+id,{headers:header})
  }

}
