
export class Category{
  constructor(
    public dataCategory:{
      nameCat:string,
      descriptionCat:string,
      ivaCat:number
    },
    public direccionIp: {
      direccionData:string,
      navegador: string
    }
  ){}
}
