import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "../../../services/global";
import {LoginService} from "../../../services/service/login.service";

@Injectable()
export class CategoryService {

  public token;
  public url: String;

  constructor(private _http: HttpClient, private _loginService:LoginService) {
    this.url = GLOBAL.url;
    this.token = "";
  }

  getCategories(categoryModel){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(categoryModel);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'getCategoriesPagination', param, {headers:header})

  }
  getAllCategories(categoryModel){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(categoryModel);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'getAllCategories', param, {headers:header})

  }

  createCategory(categoryModel){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(categoryModel);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.post(this.url+'createCategory', param, {headers:header})
  }

  updateCategory(categoryModel){
    this.token = this._loginService.getToken();
    let param = JSON.stringify(categoryModel);
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.put(this.url+'updateCategory', param, {headers:header})
  }

  deletedCategory(id){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.delete(this.url+'deletedCategory/'+id,{headers:header})
  }
  getCategoriesFildered(keyWords){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'getCategoriesFilter/'+keyWords,{headers:header})
  }

  getCountCategies(){
    this.token = this._loginService.getToken();
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.url+'getCountCategories',{headers:header})
  }

}
