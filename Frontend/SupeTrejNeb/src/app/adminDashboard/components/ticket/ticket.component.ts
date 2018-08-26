import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../../services/constant";
import {Ticket} from "../../../model/ticket";
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
  public bodyTable: any;
  public SEARCH:string = CONSTANT.Labels.Search;
  public countProduct:number;
  public ticket: Ticket;
  public browser: any;
  public responseServer : any;

  public n_ref: String = CONSTANT.Labels.N_Ticket;
  public price: String = CONSTANT.Labels.Price_Ticket;
  public options: Pickadate.DateOptions = {
    format: 'dddd, dd mmm, yyyy',
    formatSubmit: 'yyyy-mm-dd',
  };
  public fecha:Date;


  constructor(private _ticketService:TicketService, private _getDataBrowser: DataBrowser, private toastService: MzToastService) {
    this.ticket = new Ticket({idTicket:null,dateTicket:null,price:null},{navegador:""});
  }


  ngOnInit() {
  }


  getProductsByPagination(event){
    if(event || event.page){
      //this.getProducts(event.page);
    }
  }

  addUpdateProduct(event){}


  getFilterTicket(){
    this.browser = this._getDataBrowser.getDataBrowser();
    this.ticket.direccionIp.navegador = this.browser.browser;
    this._ticketService.getFilterTickets(this.ticket).subscribe(
      response=>{
        this.responseServer = response;
        if(this.responseServer.message === CONSTANT.messageToast.NO_DATA){
          this.toastService.show(CONSTANT.messageToast.NO_DATA_CRITERIA, 4000, CONSTANT.Styles.Info);
        }
      },error=>{

      }
    )
  }
}
