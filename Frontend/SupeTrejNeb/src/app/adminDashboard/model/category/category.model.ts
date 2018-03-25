
export class Category{
  constructor(
    public dataCategory:{
      nameCat:string,
      descriptionCat:string,
      ivaCat:number
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

