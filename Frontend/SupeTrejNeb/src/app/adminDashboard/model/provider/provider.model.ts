export class Provider{
  constructor(
    public dataProvider:{
      reasonSocial:string,
      resposiblePerson:string,
      contactPerson:string,
      nifBusiness:string,
      localizationBussiness:string,
      relationatedCategories:any
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
