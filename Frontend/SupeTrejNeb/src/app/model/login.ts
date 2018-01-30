
export class Login{
  constructor(
    public usuario: {
      nombreUsuario: String,
      password: String
    },

    public persona: {
      email: String
    },
    public direccionIp: {
      direccionData:String,
      navegador: String
    }


  ){}
}

