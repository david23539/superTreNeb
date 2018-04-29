export class Person{
  constructor(
    public dataPerson:{
      nombre:string,
      apellido1:string,
      apellido2:string,
      movil:number,
      telefono:number,
      dni:string,
      email:string,
      direcction:string
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
