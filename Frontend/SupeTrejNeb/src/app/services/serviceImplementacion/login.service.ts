import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import {GLOBAL} from "../global";

@Injectable()
export class LoginService {




  public url: String;
  constructor( private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login() {
    console.log(this.url);
  }

}
