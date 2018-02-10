import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../global";

@Injectable()
export class CheckBlockClientTerminalService {

  public url: String;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  async checkIpBlock() {
    await this.checkIpBlockCall().subscribe(
      response => {
        console.dir(response);
        return !response.status;
      }
    )
  }

  checkIpBlockCall():any{

    let header = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post(this.url+'checkBlockIp', null, {headers:header})
  }
}
