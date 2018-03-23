import {Component, OnInit} from '@angular/core';
import {Login} from "../../../model/login";
import {LoginService} from "../../../services/service/login.service";
import { Router} from "@angular/router";
import { DataBrowser} from "../../../utils/dataBrowser";
import { MzToastService } from 'ng2-materialize'


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataBrowser, LoginService, MzToastService]
})
export class LoginComponent implements OnInit {

  public MAIN_LOGIN = "Acceso";
  public NAME_USER = "Nombre de usuario o Email";
  public PASSWORD = "Contraseña";
  public REMEMBER = "Recordar en este equipo";
  public ENTER = "Entrar";
  public WELCOME = "Introduzca sus credenciales";
  public ERROR_CREDENCIALS = "Introduzca sus credenciales correctamente";
  public RECOVER_PASSWORD = "Para recuperar su cuenta pulse ";
  public claseFormulario = '';
  public dataLogin:Login;
  public usernames: string;
  public credenciales = true;
  public recordarCredenciales:Boolean = true;
  public token: any;
  public show: Boolean = false;
  public browser: any;

  constructor(private _loginService:LoginService, private  _router: Router, private _getDataBrowser:DataBrowser, private toastService: MzToastService) {
    this.dataLogin = new Login({nombreUsuario:"", password:""}, {email:""},{direccionData:"",navegador:""});
    this.claseFormulario = 'validate white-text';

  }

  changeCredentials(){
    this.recordarCredenciales = !this.recordarCredenciales;

  }

  ngOnInit() {

  }

  onSubmit():void{

    this.show = true;
    let regexp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    let email = regexp.test(this.usernames);
    if(!email){
      regexp = new RegExp('^[0-9a-zA-Z]+$');
      let username = regexp.test(this.usernames);
      if(!username){
        this.show =false;
        this.claseFormulario = 'invalid red-text';
        this.credenciales = false;
        this.usernames = '';
        this.dataLogin.usuario.password = "";
      }else{
        this.claseFormulario = 'validate white-text';
        this.dataLogin.usuario.nombreUsuario = this.usernames;
        this.sendInfoLogin();
      }
    }else{
      this.claseFormulario = 'validate white-text';
      this.dataLogin.persona.email = this.usernames;
      this.sendInfoLogin();
    }
  }


  private sendInfoLogin(): void{
    localStorage.clear();
    sessionStorage.clear();
    this.browser = this._getDataBrowser.getDataBrowser();
    this.dataLogin.direccionIp.navegador = this.browser.browser + this.browser.browserVersion;
    this._loginService.login(this.dataLogin, 'true').subscribe(
      response=>{
        this.token = response;
        if(this.token.token == undefined){
          this.toastService.show(this.token.message, 4000, 'red accent-2' );
          this.claseFormulario = 'invalid red-text';
          this.credenciales = false;
          this.usernames = '';
          this.dataLogin.usuario.password = "";
        }else if(this.recordarCredenciales){
          localStorage.setItem('token', this.token.token);

          this._router.navigate(['/dashboard']);
        }else{
          sessionStorage.setItem('token', this.token.token);

          this._router.navigate(['/dashboard']);
        }
        this.show = false;
        // this.instance.close();


      },error=>{
        console.log(error);
        this.show = false;
        // this.instance.close();
      }
    )
  }
  public logout(): void{
    localStorage.clear();
    sessionStorage.clear();
  }



}
