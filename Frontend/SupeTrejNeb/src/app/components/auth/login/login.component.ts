import { Component, OnInit } from '@angular/core';
import {Login} from "../../../model/login";

import {LoginService} from "../../../services/serviceImplementacion/login.service";
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

  public dataLogin:Login;
  public usernames: String;

  public recordarCredenciales:Boolean;
  constructor(private _loginService:LoginService) {
    this.dataLogin = new Login("","","");
  }

  ngOnInit() {
  }

  onSubmit(){
    this._loginService.login();
  }

}
