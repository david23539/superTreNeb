import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse, HttpRequest} from "@angular/common/http";
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import {LoginService} from "../../../services/service/login.service";
import {GLOBAL} from "../../../services/global";
@Injectable()
export class UploadService{
  public url: string;

  constructor(private _http: HttpClient, private _loginService:LoginService){
    this.url = GLOBAL.url;
  }

  makeFileRequest(endpoint: string, params: Array<string>, files: Array<File>,  name: string){
    let token = this._loginService.getToken();
    let url = this.url + endpoint;
    return new Promise(function (resolve, reject) {
      let fromData: any = new FormData();
      let xhr = new XMLHttpRequest();
      if(files){

        for(let i=0; i <files.length; i++){
          fromData.append(name, files[i], files[i].name);
        }
        xhr.onreadystatechange = function () {
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              resolve(JSON.parse(xhr.response));
            }else{
              reject(xhr.response);
            }
          }
        };
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', token.toString());
        xhr.send(fromData);
      }
    })
  }
}
