export class ReasignedPersonModel{
  constructor(
    public dataReasignedPerson:{
      personaAntigua:string,
      personaNueva:string
    },
    public direccionIp: {
      navegador: string
    }
  ){}
}
