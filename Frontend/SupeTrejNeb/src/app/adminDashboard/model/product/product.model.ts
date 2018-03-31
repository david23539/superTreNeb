export class Product{
  constructor(
    public dataProduct:{
      nameProd:string,
      descriptProd:string,
      costProd:number,
      refProd:string,
      ivaProd:number,
      image:string,
      marginProd:number,
      stock:number,
      catProd:string
    },
    public identifier:{
      id:string
    },
    public pagination:{
      page:number
    },
    public direccionIp: {
      direccionData:string,
      navegador: string
    }
  ){}
}

