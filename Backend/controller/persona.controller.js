'use strict'

const validationPerson = require('../Validation/person.validation')
const Person = require('../model/personData.model')

const constantFile = require('../utils/Constant')
const auditoriaController = require('./saveLogs.controller')
const userController = require('./user.controller')
// const userService = require('../service/user.service')
const emailService = require('../service/email.service')
const emailAdapter = require('../adapter/email.adapter')
const htmlrenderService = require('../service/htmlCodeVerification.service')
function sendCodeActivation(req, res) {
	const params = req.body
	const ip = req.connection.remoteAddress
	if(validationPerson.validateDataPersonEmail(params)){
		Person.find({stn_email:params.persona.email.toLowerCase()}, (err, personStorage)=>{
			if(err){
				auditoriaController.saveLogsData('undefined', constantFile.api.ERROR_REQUEST + err, ip, params.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.api.ERROR_REQUEST})
			}else if(personStorage.length === 0){
				auditoriaController.saveLogsData('undefined',constantFile.functions.EMAIL_NO_EXIT + params.persona.email, ip, params.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.api.ERROR_REQUEST})
			}else{
				userController.getUserByPersonId(personStorage[0]._id, (err, userStorage)=>{
					if(userStorage.length !== 0){
						let codeVerification = (Math.random()* (Math.random() *100)).toString().replace('.','')
						// userService.encriptCodeVerification(codeVerification, (err, encriptCode)=>{
						// 	if(encriptCode){
						userController.setCodeValidation(codeVerification, userStorage[0]._id, (err, userUpdateStorage)=>{
							if(err || userUpdateStorage.length === 0){
								auditoriaController.saveLogsData('undefined', constantFile.api.ERROR_REQUEST + err, ip, params.navegador)
								res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.functions.ERROR_GENERATE_CODE})
							}else{
								emailService.sendMails(emailAdapter.adapterParamsEmail(userStorage[0]._doc.stn_username, ip, params.navegador), htmlrenderService.getHtmlCodeVerification(codeVerification), params.persona.email)//nos envia un correo con la clave y deja constacia en los logs
								res.status(constantFile.httpCode.PETITION_CORRECT).send({message : constantFile.functions.EMAIL_SEND})
							}
						})
						/*}else{
							auditoriaController.saveLogsData('undefined', constantFile.api.ERROR_REQUEST + err, ip, params.navegador)
							res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.functions.ERROR_GENERATE_CODE})
						}*/
					// })


					}else{
						auditoriaController.saveLogsData('undefined', constantFile.api.ERROR_REQUEST + err, ip, params.navegador)
						res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.functions.ERROR_GENERATE_CODE})
					}
				})
			}
		})
	}else{
		auditoriaController.saveLogsData('undefined', constantFile.api.ERROR_REQUEST + params.persona.email, ip, params.navegador)
		res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.functions.ERROR_PARAMETROS_ENTRADA})
	}
}

/*function getUserByEmailPersona(email, browser, ip, res, cb){
	let params = {
		persona: email,
		navegador: browser
	}
	if(validationPerson.validateDataPersonEmail(params)){
		Person.findOne({stn_email:email}).populate({path:'stn_user'}).exec(cb)
	}else{
		auditoriaController.saveLogsData('undefined', constantFile.functions.ERROR_PARAMETROS_ENTRADA, ip, params.navegador)
		res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.api.ERROR_REQUEST})
	}

}*/


// eslint-disable-next-line no-undef
module.exports ={
	sendCodeActivation,
	//getUserByEmailPersona

}