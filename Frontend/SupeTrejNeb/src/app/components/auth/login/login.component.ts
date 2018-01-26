import { Component, OnInit } from '@angular/core';
import {Login} from "../../../model/login";

import {LoginService} from "../../../services/service/login.service";
import {GLOBAL} from "../../../services/global";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public MAIN_LOGIN = "Acceso";
  public NAME_USER = "Nombre de usuario o Email";
  public PASSWORD = "Contraseña";
  public REMEMBER = "Recordar en este equipo";
  public ENTER = "Entrar";
  public WELCOME = "Introduzca sus credenciales";
  public ERROR_CREDENCIALS = "Introduzca sus credenciales correctamente";
  public claseFormulario = '';
  public dataLogin:Login;
  public usernames: string;
  public credenciales = true;
  public recordarCredenciales:Boolean;
  constructor(private _loginService:LoginService) {
    this.dataLogin = new Login("","","", "");
    this.claseFormulario = 'validate white-text';
  }

  ngOnInit() {
  }

  onSubmit(){

    let regexp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    let email = regexp.test(this.usernames);
    if(!email){
      regexp = new RegExp('^[0-9a-zA-Z]+$');
      let username = regexp.test(this.usernames);
      if(!username){
        this.claseFormulario = 'invalid red-text';
        this.credenciales = false;
        this.usernames = '';
        this.dataLogin.contrasena = "";
      }else{
        this.claseFormulario = 'validate white-text';
      }
    }else{
      this.claseFormulario = 'validate white-text';

    }

    //this._loginService.login();
  }

}
