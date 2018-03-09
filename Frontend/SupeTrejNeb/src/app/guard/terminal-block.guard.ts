import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CheckBlockClientTerminalService} from "../services/service/check-block-client-terminal.service";


@Injectable()
export class TerminalBlockGuard implements CanActivate {

  constructor( private _router:Router, private _checkBlockClientTerminalService:CheckBlockClientTerminalService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this._checkBlockClientTerminalService.checkIpBlockCall().map(e =>{
      if(!e.status){
        if(e.message === "El token ha expirado"){
          this._router.navigate(['/login']);
        }
        return true;

      }else{
        this._router.navigate(['/page-block']);
        return false;
      }
    })
    /*let response =  this._checkBlockClientTerminalService.checkIpBlock();
    console.log('este es el guardian ' + response);

    let val = true;
    return val;*/


  }
}
