import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../../../services/global";
import {LoginService} from "../../../services/service/login.service";

@Injectable()
export class NotificationService {

  public token;
  public url: String;
  private notificationSource = new BehaviorSubject(0);
  // currentNotification = this.notificationSource.asObservable();
  public currentNotification: any;
  constructor(private _http: HttpClient, private _loginService:LoginService) {
    this.url = GLOBAL.url;
    this.token = "";
  }

  changeNotification(numberNotification: any){
    this.notificationSource.next(numberNotification);
  }

  getNotification():Observable<any>{
    return this.currentNotification = this.notificationSource.asObservable();
  }

  getNotificationsServer(){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'getNotifications',{headers:header})
  }
}
