import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public elem:any;
  public instance:any;
  public titleDiscover:String;
  public subtitleDiscover:String;
  public routers:any;

  constructor(private _router:Router) {
    this.routers = _router;
    console.log(this.routers.url);
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
      $('.sidenav').sidenav();
      this.elem = document.querySelector('.tap-target');
      this.instance = M.FeatureDiscovery.init(this.elem);
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
    switch (this.routers.url){

      default:
        this.titleDiscover = "MENÚ LATERAL";
        this.subtitleDiscover = "Pulse sobre el icono de menú, situado aquí debajo, para mostrar el menú oculto";
    }

  }

}








