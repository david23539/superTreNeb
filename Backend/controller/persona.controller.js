'use strict'

const validationPerson = require('../Validation/person.validation')
const Person = require('../model/personData.model')
const validateDireccion = require('../Validation/direccionIp.validation')
const adapterPerson = require('../adapter/person.adapter')
const constantFile = require('../utils/Constant')
const validationGlobal = require('../Validation/global.validation')
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
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message : constantFile.api.ERROR_REQUEST})
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

function deletePerson(personId, cb){
	Person.findByIdAndUpdate(personId, {stn_status:false}, {new: true}, cb)

}



function createPerson(req, res){
	const paramsIN = req.body
	let person_IN = new Person
	person_IN = adapterPerson.personDataAdapterIN(paramsIN)
	if(validationPerson.validateAllDataPerson(person_IN) && validateDireccion.validateDirection(paramsIN.direccionIp)){
		person_IN.save((err, person_OUT)=>{
			if(err || !person_OUT){
				auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, paramsIN.direccionIp.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PERSONA_REGISTER_FAIL})
			}else{
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.PERSON_REGISTER_SUCCESS,  req.connection.remoteAddress, paramsIN.direccionIp.navegador)
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PERSON_REGISTER_SUCCESS})
			}
		})

	}else{
		paramsIvalids(res)
	}

}

function updatePerson(req, res){
	let paramsIN = req.body
	const personId = req.params.id
	let person_IN = new Person()
	person_IN = adapterPerson.personDataAdapterIN(paramsIN)
	if(validationPerson.validateAllDataPerson(person_IN) && validationGlobal.validateId(personId) && validateDireccion.validateDirection(paramsIN.direccionIp)){
		person_IN._doc._id = personId
		Person.findByIdAndUpdate(personId, person_IN, {new:true}, (err, person_OUT)=>{
			if(err || !person_OUT){
				auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, paramsIN.direccionIp.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PERSON_UPDATE_ERROR})
			}else{
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.PERSON_UPDATE_SUCCESS, req.connection.remoteAddress, paramsIN.direccionIp.navegador)
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PERSON_UPDATE_SUCCESS})
			}
		})
	}else{
		paramsIvalids(res)
	}

}



function paramsIvalids(res){
	res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
}



// eslint-disable-next-line no-undef
module.exports ={
	sendCodeActivation,
	deletePerson,
	createPerson,
	updatePerson

	//getUserByEmailPersona

}