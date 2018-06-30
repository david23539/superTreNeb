import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class NotificationService {

  private notificationSource = new BehaviorSubject(0);
  // currentNotification = this.notificationSource.asObservable();
  public currentNotification: any;
  constructor() { }

  changeNotification(numberNotification: any){
    this.notificationSource.next(numberNotification);
  }

  getNotification():Observable<any>{
    return this.currentNotification = this.notificationSource.asObservable();
  }
}
