export class BillDataModel{
  constructor(
    public pagination:{
      page:number
    },
    public direccionIp: {
      navegador: string
    }

  ){}
}
