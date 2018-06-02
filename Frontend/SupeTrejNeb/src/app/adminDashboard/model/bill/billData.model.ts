export class BillDataModel{
  constructor(
    public pagination:{
      page:number
    },
    public direccionIp: {
      navegador: string
    },
    public identifier:{
      id:string
    }


  ){}
}
