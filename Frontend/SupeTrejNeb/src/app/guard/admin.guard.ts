import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginService} from "../services/service/login.service";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor( private _router:Router, private _loginService:LoginService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let token = this._loginService.getToken();
    if(token && token != ""){
     //this._router.navigate(['/dashboard']);
      return true;
    }else{
      this._router.navigate(['/login']);
      return false;
    }


  }
}
