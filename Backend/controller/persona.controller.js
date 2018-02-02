'use strict'

const validationPerson = require('../Validation/person.validation')
const Person = require('../model/personData.model')
const constantFile = require('../Constant')
const auditoriaController = require('./saveLogs.controller')
const userController = require('./user.controller')
const emailService = require('../service/email.service')
const emailAdapter = require('../adapter/email.adapter')

function sendCodeActivation(req, res) {
	const params = req.body
	const ip = req.connection.remoteAddress
	if(validationPerson.validateDataPersonEmail(params)){
		Person.find({stn_email:params.persona.email}, (err, personStorage)=>{
			if(err){
				auditoriaController.saveLogsData('undefined', constantFile.api.ERROR_REQUEST + err, ip, params.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.api.ERROR_REQUEST})
			}else if(!personStorage){
				auditoriaController.saveLogsData('undefined',constantFile.functions.EMAIL_NO_EXIT + params.persona.email, ip, params.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.api.ERROR_REQUEST})
			}else{
				userController.getUserByPersonId(personStorage._id, (err, userStorage)=>{
					if(userStorage){
						//--------------------------QUEDA POR IMPLEMENTAR AQUI Y EN LA FUNCION compareCodeActivation()------------------------------------------
						//GENERAR NUMERO ALEATORIO Y ASIGNARSELO AL USUARIO
						//CREAR UNA PLANTILLA DINAMICA CON EL NUMERO ALEATORIO Y PASARLA A LA FUNCION DE ABAJO sendEmail(param, ¡¡¡¡TEMPLATE!!!!, email)
						emailService.sendMail(emailAdapter.adapterParamsEmail(userStorage._id, ip, params.navegador), '', params.persona.email)//nos envia un correo con la clave y deja constacia en los logs
						//ENVIO DE RESPUESTA AL CLIENTE
						//----------------------logica el la funcion de comparar-------------
						//LLAMADA AL CONTROLADOR DE USUARIO PARA VERIFICAR EL NUEMERO Y SI ES CORRECTO DEVOLVER UN TRUE Y PASAR A LA SOLICITACION DE LA NUEVA CLAVE
						//SI ES TRUE ELIMINAR CLAVE ALEATORIA EN EL USUARIO PARA QUE NO SE REPITA O SE PUEDA VOLVER A USAR
					}
				})
			}
		})
		//console.log(Math.random()* Math.random() *100)
	}


}

function compareCodeActivation(req, res){

}

// eslint-disable-next-line no-undef
module.exports ={
	sendCodeActivation,
	compareCodeActivation
}