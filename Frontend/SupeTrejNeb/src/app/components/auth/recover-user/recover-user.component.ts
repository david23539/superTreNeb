import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recover-user',
  templateUrl: './recover-user.component.html',
  styleUrls: ['./recover-user.component.css']
})
export class RecoverUserComponent implements OnInit {

  public IF_EXIST_EMAIL = "Si el correo introducido existe le llegará la clave para la recuperación de la cuenta"
  public TITLE_RECOVER_ACOUNT_EMAIL = "Introduzca su email para recuperar su cuenta";
  public EMAIL = "Email";
  public SEND_EMAIL = "Enviar";
  public emailInputRecover = "";
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("boton");
  }

}
