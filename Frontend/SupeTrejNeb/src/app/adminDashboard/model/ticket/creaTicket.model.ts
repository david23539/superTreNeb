
export class CreaTicketModel {

  constructor(
    public shoppingList: Array<{
      product: string,
      quantity:number,
      finalPrice:number
    }>,
    public idTicket: number,
    public direccionIp:{
      navegador:string
    }
  ){}
}
