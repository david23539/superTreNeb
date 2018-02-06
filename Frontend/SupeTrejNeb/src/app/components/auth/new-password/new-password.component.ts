import { Component, OnInit } from '@angular/core';
import { NewPassService} from "../../../services/service/new-pass.service";
import { DataBrowser} from "../../../utils/dataBrowser";
import { NewPassModel} from "../../../model/newPass";

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
  providers: [DataBrowser,NewPassService]
})
export class NewPasswordComponent implements OnInit {

  public CODE_TITLE: String = "Introduzca su código";
  public SECOND_CODE_TITLE: String = "Las contraseñas no coinciden";
  public CODE_LABEL: String = "Código";
  public NEW_PASS: String = "Nueva Contraseña";
  public CLASS_STATUS: String = "";
  public BUTTON_CODE: String = "Nueva Contraseña";
  public CHANGE_PASS: String = "Cambiar Contraseña";
  public REPEAT_PASS: String = "Repita La Nueva Contraseña";
  public ACCEPT: String = "ACEPTAR";
  public CHANGE_PASS_TITLE_MODAL: String = "Cambio de contraseña";
  public CHANGE_PASS_SUBTITLE_MODAL: String = "Si especificó correctamente su correo y su código habrá cambiado su contraseña";
  public CHANGE_PASS_SUBSUBTITLE_MODAL: String = "Si se equivocó en su código, recuerde que tiene 2 intentos mas";
  public codes: String;
  public firstPass: String;
  public SecondPass: String;
  public codeNull: Boolean;
  public validateData: Boolean;
  public instance: any;
  public elem: any;
  public browser: any;
  public dataPass:NewPassModel;

  constructor( private _getDataBrowser:DataBrowser, private _newPassService:NewPassService) {
    this.CLASS_STATUS = "validate white-text";
    this.codes = "";
    this.codeNull = true;
    this.validateData = false;
    this.dataPass = new NewPassModel("","","");
  }

  ngOnInit() {
    this.elem = document.querySelector('.modal');
    this.instance = M.Modal.init(this.elem, {dismissible: false})
  }

  private validatePass():Boolean{
    return (this.firstPass.length >= 8 && this.SecondPass.length>=8);
  }

  private resetInput(){

    this.validateData = true;
    this.firstPass = "";
    this.SecondPass = "";
    this.CLASS_STATUS = "invalid red-text";
  }

  onSubmit(){
    if (!this.codeNull && (this.codes && this.firstPass && this.SecondPass) && (this.firstPass == this.SecondPass)) {
      if (this.validatePass()) {
        this.browser = this._getDataBrowser.getDataBrowser();
        this.dataPass.code = this.codes;
        this.dataPass.navegador = this.browser;
        this.dataPass.password = this.firstPass;
        this._newPassService.recoverPassword(this.dataPass).subscribe();
        this.instance.open();
      } else{
        this.resetInput()
      }
    }
  }
}
