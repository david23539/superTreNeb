export class Ticket{
  constructor(
    public ticket: {
      idTicket: Number,
      dateTicket:Date,
      price:Number
    },
    public direccionIp:{
      navegador:String
    }
  ){}
}
