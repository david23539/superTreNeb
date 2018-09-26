
export class CreaTicketModel {

  constructor(
    public shoppingList: [{
      product: string,
      quantity:number,
      finalPrice:number
    }],
    public idTicket: number,
    public direccionIp:{
      navegador:string
    }
  ){}
}
