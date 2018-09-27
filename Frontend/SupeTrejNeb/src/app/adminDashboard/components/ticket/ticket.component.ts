import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {Ticket} from "../../model/ticket/ticket";
import {TicketService} from "../../services/ticket/ticket.service";
import {DataBrowser} from "../../../utils/dataBrowser";
import {MzToastService} from "ng2-materialize";

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers:[TicketService, DataBrowser, MzToastService]
})
export class TicketComponent implements OnInit {

  public TITLE:string = CONSTANT.Labels.TicketTitle;
  public headsTables:any = CONSTANT.headTicket;
  public headsTicket:any = CONSTANT.shoppingList;
  public bodyTable: any;
  public bodyTicket= [];
  public countRecord:number;
  public ticket: Ticket;
  public browser: any;
  public datesTicket: any = 0;
  public ref: any ;
  public total: any = 0.0;
  public responseServer : any;
  public page : any = {
    page: 0
  };

  public n_ref: String = CONSTANT.Labels.N_Ticket;
  public price: String = CONSTANT.Labels.Price_Ticket;
  public options: Pickadate.DateOptions = {
    format: 'dddd, dd mmm, yyyy',
    formatSubmit: 'yyyy-mm-dd',
  };



  constructor(private _ticketService:TicketService, private _getDataBrowser: DataBrowser, private toastService: MzToastService) {
    this.ticket = new Ticket({idTicket:null,dateTicket:null,price:null},{navegador:""},{page:0});
  }


  ngOnInit() {
    $('.modal').modal();
    this.browser = this._getDataBrowser.getDataBrowser();
    this.ticket.direccionIp.navegador = this.browser.browser;
    this.getTickets(0);
    this.countTicket();
  }


  selectTicket(event){
    if(event || event.page){
      this.bodyTicket = event.object.shopping;
      this.ref = event.object.number;
      this.datesTicket = event.object.date;

      this.total = event.object.price;

      $('#ticketModal').modal('open');
    }
  }

  private countTicket(){
    this._ticketService.countTicket().subscribe(
      response=>{
        this.responseServer = response
        this.countRecord = this.responseServer.count;
      },error =>{
        this.toastService.show(CONSTANT.messageToast.TICKET_ERROR, 4000, CONSTANT.Styles.Error);

      }
    )
  }

  private getTickets(page){
    this.ticket.pagination.page = page;
    this._ticketService.getTickets(this.ticket).subscribe(
      response =>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
          this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
        }else if(this.responseServer.message === CONSTANT.ResponseServers.No_Data){
          this.toastService.show(CONSTANT.ResponseServers.No_Data, 4000, CONSTANT.Styles.Info);
        }else {
          this.bodyTable = this.responseServer.ticket
        }
      },error =>{
        this.toastService.show(CONSTANT.messageToast.TICKET_ERROR, 4000, CONSTANT.Styles.Error);
      }
    )
  }

  getFilterTicket(page){

    if(page.page && page.page > 0){
      page.page = (page.page -1) *10;
    }
    if(!this.ticket.ticket.idTicket && !this.ticket.ticket.price && !this.ticket.ticket.dateTicket){
      this.getTickets(page.page);
      this.countTicket();
    }else{
      this.ticket.pagination.page = page.page;
      this._ticketService.getFilterTickets(this.ticket).subscribe(
        response=>{
          this.responseServer = response;
          if(this.responseServer.message === CONSTANT.messageToast.NO_DATA){
            this.toastService.show(CONSTANT.messageToast.NO_DATA_CRITERIA, 4000, CONSTANT.Styles.Info);
          }else if(this.responseServer.ticket){
            this.bodyTable = this.responseServer.ticket;
            this.countRecord = this.responseServer.count;
          }else if(this.responseServer.message === CONSTANT.ResponseServers.InvalidParams){
            this.toastService.show(CONSTANT.ResponseServers.InvalidParams, 4000, CONSTANT.Styles.Warning);
          }
        },error=>{
          this.toastService.show(CONSTANT.messageToast.TICKET_ERROR, 4000, CONSTANT.Styles.Error);
        }
      )
    }

  }

  printTickets(){
    const ficha=document.getElementById("ticket");
    const ventimp=window.open(' ','popimpr');
    ventimp.document.write(ficha.innerHTML);
    ventimp.document.close();
    ventimp.print();
    ventimp.close();

  }
}
