export class BillData{
  constructor(
    public data:{
      idProvider:string,
      nameProvider:string,
      idCategory:string,
      nameCategory:string,
      product:{
        category:string,
        description:string,
        id:string,
        iva:number,
        name:string,
        cost:number,
        margin:number,
        quantity:number,
        price:number
      }
    }

  ){}
}
