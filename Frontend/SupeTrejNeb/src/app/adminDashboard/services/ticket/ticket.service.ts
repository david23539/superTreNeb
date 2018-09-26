import { Injectable } from '@angular/core';
import {GLOBAL} from "../../../services/global";
import {LoginService} from "../../../services/service/login.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class TicketService {

  public token;
  public url: String;

  constructor(private _http: HttpClient, private _loginService:LoginService) {
    this.url = GLOBAL.url;
    this.token = "";
  }

  getFilterTickets(ticket_IN){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(ticket_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'filterTicket', param, {headers:header})
  }
  countTicket(){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'countTickets',{headers:header})
  };

  getTickets(ticket_IN){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(ticket_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'getTicket', param, {headers:header})
  }

  createTiket(ticket_IN) {
    this.token = this._loginService.getToken();
    let param = JSON.stringify(ticket_IN);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'createTicket', param, {headers:header})
  }

}
