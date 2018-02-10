export class NewPassModel{
  constructor(
    public code: String,
    public navegador: String,
    public password: String,
    public final:Boolean = false
  ){}
}
