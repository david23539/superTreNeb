import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Login} from "../../../model/login";
import CryptoJS = require('crypto-js');
import {LoginService} from "../../../services/service/login.service";
import {GLOBAL} from "../../../services/global";
import { Router} from "@angular/router";


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
  public RECOVER_PASSWORD = "Para recuperar su cuenta pulse ";
  public claseFormulario = '';
  public dataLogin:Login;
  public usernames: string;
  public credenciales = true;
  public recordarCredenciales:Boolean;
  public token: any;
  public show: Boolean = false;
  /*public elem: any;
  public instance: any;*/

  //@ViewChild('hiddenLabel') label: ElementRef;

  constructor(private _loginService:LoginService, private  _router: Router) {
    this.dataLogin = new Login({nombreUsuario:"", password:""}, {email:""},{direccionData:"",navegador:""});
    this.claseFormulario = 'validate white-text';

  }

  ngOnInit() {
    /*this.elem = document.querySelector('.modal');
    this.instance = M.Modal.init(this.elem, {dismissible: false});*/
    //this.instance.open();
  }


  /*private createKey(data:string): string{
    return CryptoJS.SHA512(data).toString();
  }*/

  private getDataBrowser():any{
    let unknown = '-';

    // screen
    let screenSize = '';
    if (screen.width) {
      let width = (screen.width) ? screen.width : '';
      let height = (screen.height) ? screen.height : '';
      screenSize += '' + width + ' x ' + height
    }

    // browser
    let nVer = navigator.appVersion;
    let nAgt = navigator.userAgent;
    let browser = navigator.appName;
    let version = '' + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset, verOffset, ix;


    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
        version = nAgt.substring(verOffset + 8)
      }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 4)
    }

    // Edge
    else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
      browser = 'Microsoft Edge';
      version = nAgt.substring(verOffset + 5)
    }

    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(verOffset + 5)
    }

    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
      browser = 'Chrome';
      version = nAgt.substring(verOffset + 7)
    }

    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
      browser = 'Safari';
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
        version = nAgt.substring(verOffset + 8)
      }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
      browser = 'Firefox';
      version = nAgt.substring(verOffset + 8)
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(nAgt.indexOf('rv:') + 3)
    }

    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName
      }
    }

    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
      version = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    let mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
    let cookieEnabled = (navigator.cookieEnabled);

    //os regext
    let os = unknown;
    let clientStrings = [
      {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
      {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
      {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
      {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
      {s:'Windows Vista', r:/Windows NT 6.0/},
      {s:'Windows Server 2003', r:/Windows NT 5.2/},
      {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
      {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
      {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
      {s:'Windows 98', r:/(Windows 98|Win98)/},
      {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
      {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
      {s:'Windows CE', r:/Windows CE/},
      {s:'Windows 3.11', r:/Win16/},
      {s:'Android', r:/Android/},
      {s:'Open BSD', r:/OpenBSD/},
      {s:'Sun OS', r:/SunOS/},
      {s:'Linux', r:/(Linux|X11)/},
      {s:'iOS', r:/(iPhone|iPad|iPod)/},
      {s:'Mac OS X', r:/Mac OS X/},
      {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
      {s:'QNX', r:/QNX/},
      {s:'UNIX', r:/UNIX/},
      {s:'BeOS', r:/BeOS/},
      {s:'OS/2', r:/OS\/2/},
      {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];

    for (let id in clientStrings) {
      let cs = clientStrings[id];
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break
      }
    }

    let osVersion = unknown;

    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = 'Windows'
    }

    switch (os) {
      case 'Mac OS X':
        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'Android':
        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'iOS':
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer).toString();

        break
    }

    let jscd = {
      screen: screenSize + browser + version + majorVersion+ mobile+ os + osVersion + cookieEnabled,
      browser: browser,
      browserVersion: version,
      browserMajorVersion: majorVersion,
      mobile: mobile,
      os: os,
      osVersion: osVersion,
      cookies: cookieEnabled
    };



    return jscd
  }

  onSubmit():void{
    // this.instance.open();
    this.show = true;
    let regexp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    let email = regexp.test(this.usernames);
    if(!email){
      regexp = new RegExp('^[0-9a-zA-Z]+$');
      let username = regexp.test(this.usernames);
      if(!username){
        this.show =false;
        // this.instance.close();
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
    this.dataLogin.direccionIp.navegador = this.getDataBrowser().browser + this.getDataBrowser().browserVersion;
    this._loginService.login(this.dataLogin, 'true').subscribe(
      response=>{
        this.token = response;
        if(this.recordarCredenciales){
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
