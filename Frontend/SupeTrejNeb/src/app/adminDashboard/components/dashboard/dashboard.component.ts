import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router} from "@angular/router";
import { GLOBAL} from "../../../services/global";
import {UserService} from "../../../services/service/user/user.service";
import {DirectionIpService} from "../../../services/service/direcctionIP/direction-ip.service";
import { DataBrowser} from "../../../utils/dataBrowser";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DataBrowser, UserService, DirectionIpService]
})
export class DashboardComponent implements OnInit, AfterViewInit {


  public elem:any;
  public instance:any;
  public titleDiscover:String;
  public subtitleDiscover:String;
  public routers:any;
  public breadcumsTagsArray;
  public nameRoutes =[];
  public personData:any;
  public url: string;
  public IMAGE:String;
  public EMAIL: String;
  public NAME:String;
  public LASTNAME:String;
  public browser: any;
  public MAINPAGE: String = "Panel Principal";
  public classBackgraundSidenav="blue-grey lighten-2 z-depth-3";

  constructor(private _router:Router, private _userService:UserService, private _getDataBrowser:DataBrowser,
              private _directionIpService:DirectionIpService) {
    this.routers = _router;
    this.breadcumsTagsArray = this.routers.url;
    this.url = GLOBAL.url;

  }


  hidenSidenaves():void{
    // $('.sidenav-overlay').click();
  }







  ngOnInit() {

    this.nameRoutes = this.routers.url.split("/");
    this.nameRoutes.splice(0,2);
    this._userService.getDataUserByToken().subscribe(
      response=>{
        this.personData = response;

        if(this.personData.message !== "Equipo Boqueado") {
          this.IMAGE = this.personData.person.image;
          this.EMAIL = this.personData.person.email;
          this.NAME = this.personData.person.name;
          this.LASTNAME = this.personData.person.lastname;
        }else{
          this._router.navigate(['/login']);
        }
      },error=>{//en caso de error  porque no exista el token lo mando al login y el guard a la pagina de bloqueo
        this.personData = error;

        if(this.personData.message === "Equipo Boqueado"){
          // this.browser = this._getDataBrowser.getDataBrowser();
          /*this._directionIpService.blockIp(this.browser.browser + this.browser.browserVersion).subscribe(
            response=>{
              this._router.navigate(['/login']);
            }
          )*/
          this._router.navigate(['/login']);
        }else{
          this._router.navigate(['/login']);

        }
      }
    )

    //lamar al servicio para mostrar la imagen y obtener todos los datos del usuario
  }

  ngAfterViewInit(): void {
     /* $('.sidenav').sidenav();
      this.elem = document.querySelector('.tap-target');
      this.instance = M.FeatureDiscovery.init(this.elem);*/
  }

  showHelp():void{
    if(this.instance.isOpen){
      this.instance.close();
    }else{
      this.messageIntoDiscover();
      this.instance.open();
    }
  }

  messageIntoDiscover():void{

    switch (this._router.url){
      case "/dashboard/main-dashboard":
        this.titleDiscover = "USO DE LA TABLA";
        this.subtitleDiscover = "Seleccione un elemento de la lista, marque la cantidad y ejecute la acción. Si desea sumar o restar un elemneto pulse el - o el +. " +
          "Si desea eliminar un elemento pulse sobre eliminar o borrar en el teclado";
        break;
      case "/":
        this.titleDiscover = "MENÚ LATERAL";
        this.subtitleDiscover = "Pulse sobre el icono de menú, situado aquí debajo, para mostrar el menú oculto. Si se encuentra en la versión mobil arrastre de izquierda a derecha";
    }
  }
}
















