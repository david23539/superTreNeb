import { Component, OnInit } from '@angular/core';
import { emailValidate} from "../../../validate/email.validate";
import { RecoverUser} from "../../../model/recoverUser";
import {DataBrowser} from "../../../utils/dataBrowser";
import {RecoverUserService} from "../../../services/service/recover-user.service";
import {Router} from "@angular/router";
import {MzToastService} from "ng2-materialize";



@Component({
  selector: 'recover-user',
  templateUrl: './recover-user.component.html',
  styleUrls: ['./recover-user.component.css'],
  providers: [DataBrowser,emailValidate,RecoverUserService, MzToastService]
})
export class RecoverUserComponent implements OnInit {

  public IF_EXIST_EMAIL = "Si el correo introducido existe le llegará la clave para la recuperación de la cuenta";
  public TITLE_RECOVER_ACOUNT_EMAIL = "Introduzca su email para recuperar su cuenta";
  public EMAIL = "Email";
  public SEND_EMAIL = "Enviar";
  public emailInputRecover = "";
  public butonEmailDisabled = true;
  public recoverUser:RecoverUser;
  public dataBrowser:any;
  public responseEmail:String;

  constructor(private _getDataBrowser:DataBrowser, private _emailValid: emailValidate,
              private _recoverUser:RecoverUserService, private  _router: Router, private toastService: MzToastService) {
    this.recoverUser = new RecoverUser({email: ""}, "");

  }
  ngOnInit() {
     this.dataBrowser = this._getDataBrowser.getDataBrowser();
  }


  onSubmit(){
    this.recoverUser.persona.email = this.emailInputRecover;
    this.recoverUser.navegador = this.dataBrowser.browser + this.dataBrowser.browserVersion;
      this._recoverUser.sendEmail(this.recoverUser).subscribe(
        response => {
          this._router.navigate(['/new-password']);

        },error=>{
          this.toastService.show(error.error.message, 4000, 'red accent-2' );
        }
      )


  }

  validateEmail(){
    this.butonEmailDisabled = !this._emailValid.validate(this.emailInputRecover);
  }
}
