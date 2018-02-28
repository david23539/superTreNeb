import { Component, OnInit } from '@angular/core';
import { NewPassService} from "../../../services/service/new-pass.service";
import { DataBrowser} from "../../../utils/dataBrowser";
import { NewPassModel} from "../../../model/newPass";
import {Router} from "@angular/router";
import {MzToastService} from "ng2-materialize";

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
  providers: [DataBrowser,NewPassService, MzToastService]
})
export class NewPasswordComponent implements OnInit {

  public CODE_TITLE: String = "Introduzca su código";
  public SECOND_CODE_TITLE: string = "Las contraseñas no coinciden o tienen una <br> longuitud menor a 8 caracteres";
  public CODE_LABEL: String = "Código";
  public NEW_PASS: String = "Nueva Contraseña";
  public CLASS_STATUS: String = "";
  public BUTTON_CODE: String = "Nueva Contraseña";
  public CHANGE_PASS: String = "Cambiar Contraseña";
  public REPEAT_PASS: String = "Repita La Nueva Contraseña";
  public ACCEPT: String = "ACEPTAR";
  public CHANGE_PASS_TITLE_MODAL: string = "Cambio de contraseña";
  public CHANGE_PASS_SUBTITLE_MODAL: string = "Contraseña cambiada con exito";
  public CHANGE_PASS_SUBSUBTITLE_MODAL: string = "Si se equivocó en su código, recuerde que tiene 2 intentos mas";
  public styleSuccess: string = 'teal accent-4';
  public styleError: string = 'red accent-2';
  public codes: String;
  public firstPass: String;
  public SecondPass: String;
  public codeNull: Boolean;
  public validateData: Boolean;
  public instance: any;
  public elem: any;
  public browser: any;
  public dataPass:NewPassModel;
  public messageResponse: any;
  public tryNumber:number = 0;

  constructor( private _getDataBrowser:DataBrowser, private _newPassService:NewPassService,private _router:Router, private toastService: MzToastService) {
    this.CLASS_STATUS = "validate white-text";
    this.codes = "";
    this.codeNull = true;
    this.validateData = false;
    this.dataPass = new NewPassModel("","","");
  }

  ngOnInit() {


  }

  private validatePass():Boolean{
    this.CLASS_STATUS = "valid white-text";
    return (this.firstPass.length >= 8 && this.SecondPass.length>=8 && (this.firstPass == this.SecondPass));
  }

  private resetInput(){



   // this.validateData = true;
    this.showMessage(this.SECOND_CODE_TITLE, this.styleError);
    this.firstPass = "";
    this.SecondPass = "";
    this.CLASS_STATUS = "invalid red-text";
  }

  showMessage(message:string, styles:string){

    this.toastService.show(message, 4000, styles, this.redirectTo());
  }
  private redirectTo():Function{
    this._router.navigate(['/login']);
    return null;
  }
  onSubmit(){
    if (this.codes && this.firstPass && this.SecondPass) {
      if (this.validatePass()) {
        this.browser = this._getDataBrowser.getDataBrowser();
        this.dataPass.code = this.codes;
        this.dataPass.navegador = this.browser.browser;
        this.dataPass.password = this.firstPass;
        this.dataPass.final = true;
        this._newPassService.recoverPassword(this.dataPass).subscribe();
        //this.instance.open();LIMPIAR HTML
        this.showMessage(this.CHANGE_PASS_SUBTITLE_MODAL, this.styleSuccess);
      } else{
        this.resetInput()
      }
    }else{
      this.browser = this._getDataBrowser.getDataBrowser();
      this.dataPass.code = this.codes;
      this.dataPass.navegador = this.browser.browser;
      this.dataPass.password = this.firstPass;
     // console.log(this.dataPass);
      this._newPassService.recoverPassword(this.dataPass).subscribe(
        response=>{
          this.messageResponse = response;
          if(this.messageResponse.message === 'Error en la peticion '){
            this.tryNumber++;
            let infoMessage = 'Codigo incorrecto';
            this.codeNull = true;
            this.codes = "";
            this.toastService.show(infoMessage, 4000, 'red accent-2' );
            // M.toast({html: infoMessage , classes: 'red accent-2'});

          }else if (this.messageResponse.message === 'Equipo Boqueado') {
            this._router.navigate(['/login']);


            //generacion de guardian
          }else{
            this.codeNull = false;
            this.codeNull = false;
            this.BUTTON_CODE = this.CHANGE_PASS;
            this.CODE_TITLE = this.NEW_PASS;
          }


        })
    }
  }
}
