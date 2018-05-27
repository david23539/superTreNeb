export class BillAutoModel{
  constructor(
    public data:{
      nombreClient:string,
      ivaBill:number,
      bodyBill:string,
      tipoBill:string,
      cierreDateBill:Date,
      pagado:Boolean,
      cerrado:Boolean
    },
    public identifier:{
      id:string
    },
    public pagination:{
      page:number
    },
    public direccionIp: {
      navegador: string
    }

  ){}
}
