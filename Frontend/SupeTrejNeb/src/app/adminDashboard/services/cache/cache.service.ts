import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CacheService {

  private cacheSource = new BehaviorSubject(0);

  public currentCache: any;


  constructor() { }

  setDataCache(cache: any){
    this.cacheSource.next(cache);
  }

  getCache():Observable<any>{
    return this.currentCache = this.cacheSource.asObservable();
  }

}
