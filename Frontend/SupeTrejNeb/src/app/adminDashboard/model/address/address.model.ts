export class Address{
  constructor(
    public dataAddress:{
      provincia:string,
      poblacion:string,
      tipoVia:string,
      codigoPostal:string,
      numero:number,
      piso:number,
      puerta:string,
      nombreCalle:string
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
