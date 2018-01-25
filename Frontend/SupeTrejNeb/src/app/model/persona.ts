import {Direccion} from "./direccion";

export class Persona{
  constructor(
    public nombre:String,
    public apellido1:String,
    public apellido2:String,
    public email:String,
    public movil:Number,
    public telefono:Number,
    public dni:String,
    public imagen: String,
    public direccion: Direccion

  ){}
}
