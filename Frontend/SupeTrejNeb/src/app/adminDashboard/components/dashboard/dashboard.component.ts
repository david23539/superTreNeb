import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import { GLOBAL} from "../../../services/global";
import {UserService} from "../../../services/service/user/user.service";
import {DirectionIpService} from "../../../services/service/direcctionIP/direction-ip.service";
import { DataBrowser} from "../../../utils/dataBrowser";
import {NotificationService} from "../../services/notification/notification.service";
import {CONSTANT} from "../../../services/constant";
import {NotificationsService} from "../../services/notification/notifications.service";
import {MzToastService} from "ng2-materialize";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DataBrowser, UserService, MzToastService, DirectionIpService]
})

export class DashboardComponent implements OnInit{
  public EXITAPPSESSION = "Salir";
  public titleDiscover:String;
  public subtitleDiscover:String;
  public routers:any;
  public breadcumsTagsArray;
  public personData:any;
  public url: string;
  public IMAGE:String;
  public EMAIL: String;
  public NAME:String;
  public LASTNAME:String;
  public browser: any;
  public MAINPAGE: String = "Panel Principal";
  public CATEGORIES_PAGE: String = "Categorías";
  public PRODUCT_PAGE: String = "Productos";
  public PROVIDERS_PAGE: String = "Proveedores";
  public PERSONS_PAGE: String = "Personas";
  public ADDRESS_PAGE: String = "Direcciones";
  public BILLING_PAGE: String = "Facturación";
  public classBackgraundSidenav="blue-grey lighten-2 z-depth-3";
  public classNotificationIcon = "material-icons pink-text";
  public classNotNotificationIcon = "material-icons";
  public classDefaultNotificationIcon = "material-icons";
  public responseServer: any;
  public notifications: any;
  public bodyStock:any;
  public headStock:any = CONSTANT.headStock;

  constructor(private _router:Router, private _userService:UserService, private _getDataBrowser:DataBrowser, private toastService: MzToastService,
              private _directionIpService:DirectionIpService, private _notification: NotificationService, private _notifications:NotificationsService) {
    this.routers = _router;
    this.breadcumsTagsArray = this.routers.url;
    this.url = GLOBAL.url;

  }

  private prepareDataToNotificationList(){
    let productNotifications= [];
    for(let item of this.notifications){
      productNotifications.push({name: item.name, stockMin: item.stockMin, stockMax: item.stock})
    }
    return productNotifications
  }

  exitSession(){
    localStorage.clear();
    sessionStorage.clear();
  }

  ngOnInit() {
    $('.modal').modal();

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

          this._router.navigate(['/login']);
        }else{
          this._router.navigate(['/login']);

        }
      }
    );

    this.getNotifications();
    this.getSubscriptionNotifications();


  }

  showNotifications(){
    $('#stock').modal('open');

  }

  /**
   * nos subcribimos a las notificaciones service para
   * estar a la escucha de los cambios
   */
  private getSubscriptionNotifications(){
    this._notification.getNotification().subscribe(
      response=>{
        this.notifications = response;
        if(this.notifications){

          this.bodyStock = this.prepareDataToNotificationList();
          this.classDefaultNotificationIcon = this.classNotificationIcon
        }else{
          this.bodyStock = [];
          this.classDefaultNotificationIcon = this.classNotNotificationIcon;
        }
      }
    )
  }

  /**
   * obtenemos todas las notificaciones
   * y a continuacion las mandamos al serrvice para compartirlas entre los controllers
   */
  getNotifications(){
    this._notification.getNotificationsServer().subscribe(
      response=>{
        this.responseServer = response;
        this.notifications = this.responseServer.products;
        if(this.notifications) {

          this._notification.changeNotification(this.responseServer.products);

        }
      },error=>{
        this.toastService.show(CONSTANT.messageToast.NOTIFICATIONS_ERROR, 4000, CONSTANT.Styles.Error);

      }
    );
  }



}
















