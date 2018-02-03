
'use strict'
// const bcrypt = require('bcrypt-nodejs')
// const fs = require('fs')
const User = require('../model/user.model')
const Persons = require('../model/personData.model')
const Address = require('../model/addressData.model')
const DirectionIp = require('../model/direcctionIp.model')
const directionIpController = require ('./directioIp.controller')
const directionIpService = require('../service/directionIp.service')
const constantFile = require('../utils/Constant')
const userAuxiliar = require('../auxiliar/user.auxiliar')
const globalAuxiliar = require('../auxiliar/global.auxiliar')
const Log = require('log'), log = new Log('info')
const serviceUser = require('../service/user.service')
const validationUser = require('../Validation/user.validation')
const adapterDirectionIp = require('../adapter/direcctionIp.adapter')
const rolBackController = require('./rollBack.controller')
const auditoriaController = require('./saveLogs.controller')
const jwtService = require('../service/jwt.service')
const userAdapter = require('../adapter/user.adapter')


function registerUser(req, res){


	const params = req.body
	let newUser = new User()
	let newAddress = new Address()
	let newPerson = new Persons()
	let directionIp = new DirectionIp()
	params.direccionIp.direccionData = req.connection.remoteAddress
	if(validationUser.validationDataNewUser(params)){//TODO los parametros de entrada son correctos
		User.findOne({stn_username: params.usuario.nombreUsuario}, (err, issetUser)=>{
			if(err){
				globalAuxiliar.errorPeticion(res)

			}else if(issetUser){
				userAuxiliar.userExist(res)
			}else{

				Persons.findOne({stn_email: params.persona.email.toLowerCase()}, (err, issetUserEmail)=>{
					if(err){
						globalAuxiliar.errorPeticion(res)
					}else if(issetUserEmail){
						userAuxiliar.userExist(res)
					}else{

						serviceUser.registerNewUser(params, res, function(err, hash){
							if(err){
								globalAuxiliar.errorPeticion(res)
							}else if(hash){
								params.usuario.password = hash



								try {

									newUser = userAdapter.userDataAdapter(params)
									newUser.save((err, userStored) => {
										if (err) {
											globalAuxiliar.errorPeticion(res)
											rolBackController.rollBack('person', userStored._doc._id)
										} else if (!userStored) {
											userAuxiliar.notRegisterUser(res)
											rolBackController.rollBack('person', userStored._doc._id)
										} else {
											directionIp = adapterDirectionIp.directionIpDataAdapter(params, userStored)
											directionIp.save((err, directionIpStorage)=>{
												if(err || !directionIpStorage){
													auditoriaController.saveLogsData(params.usuario.nombreUsuario,constantFile.messageLog.ERROR_IP, params.direccionIp.direccionData, params.direccionIp.navegador)
												}else{
													auditoriaController.saveLogsData(params.usuario.nombreUsuario,constantFile.messageLog.SUCCESS_REGISTER_IP, params.direccionIp.direccionData, params.direccionIp.navegador)
												}
											})
											newPerson = userStored._doc.stn_person
											newPerson.save((err, personStored)=>{
												if(err){
													globalAuxiliar.errorPeticion(res)
													//TODO borrar usuario
													rolBackController.rollBack('person', userStored._doc._id)
												}else if(!personStored){
													userAuxiliar.notRegisterUser(res)
													////TODO borrar usuario
													rolBackController.rollBack('person', userStored._doc._id)
												}else {

													newAddress = personStored._doc.stn_fk_address
													if(null != newAddress.stn_province) {
														newAddress.save((err, adressStored) => {
															if (err) {
																globalAuxiliar.errorPeticion(res)
																//TODO borrar usuario y persona
																rolBackController.rollBack('address', userStored._doc._id, personStored._doc._id)
															} else if (!adressStored) {
																userAuxiliar.notRegisterUser(res)
																////TODO borrar usuario y persona
																rolBackController.rollBack('address', userStored._doc._id, personStored._doc._id)
															} else {
																auditoriaController.saveLogsData(userStored._doc.stn_username, constantFile.functions.USER_REGISTER_SUCCESS,
																	params.direccionIp.direccionData, params.direccionIp.navegador)
																globalAuxiliar.registerSuccess(res, userStored, constantFile.functions.USER_REGISTER_SUCCESS)
															}
														})
													}else{
														auditoriaController.saveLogsData(userStored._doc.stn_username, constantFile.functions.USER_REGISTER_SUCCESS,
															params.direccionIp.direccionData, params.direccionIp.navegador)
														globalAuxiliar.registerSuccess(res, userStored, constantFile.functions.USER_REGISTER_SUCCESS)
													}

												}
											})

										}
									})
								}catch (e){
									log.error(e)
									globalAuxiliar.errorPeticion(res)
									auditoriaController.saveLogsData(params.usuario.nombreUsuario, e.message,
										params.direccionIp.direccionData, params.direccionIp.navegador)
								}
							}else{
								globalAuxiliar.errorPeticion(res)
							}
						})
					}
				})
			}
		})
	}else{//TODO los parametros de entrada no son correctos
		res.status(constantFile.httpCode.BAD_REQUEST).send({
			message: constantFile.functions.ERROR_PARAMETROS_ENTRADA,
			parametros : params
		})


	}
}

function extractMethodCheckIp(err, userStorage, params, res, ips) {
	if (getData(err, userStorage, params.usuario.password, serviceUser.comparePassword)) {

		if (params.getToken) {
			compareIp(userStorage, (err, ipData) => {//TODO buscamos si esta ip esta relacionada con algun usuario
				if (err) {// si ocurre un error guardamos auditoria
					auditoriaController.saveLogsData(userStorage._doc.stn_username, err, params.direccionIp.direccionData, params.direccionIp.navegador)
				} else if (!ipData) {//si no tiene registro la nueva ip al usuario y vacio el contador tanto del usuario como de la ip
					directionIpController.registerNewIp(params, userStorage)
					auditoriaController.saveLogsData(userStorage._doc.stn_username, constantFile.functions.USER_LOGIN_SUCCESS_TOKEN, params.direccionIp.direccionData, params.direccionIp.navegador)
					res.status(constantFile.httpCode.PETITION_CORRECT).send({
						token: jwtService.createToken(userStorage)
					})
				} else {//si ya tiene asociada una ip miro si esta ip esta relacionada y si no lo esta la relaciono y vacio el contador tanto del usuario como de la ip
					ips = ipData._doc.stn_directionIp
					if (directionIpService.compareIps(params.direccionIp.direccionData, ips)) {
						directionIpController.resetCount(ipData._id, params)
						auditoriaController.saveLogsData(userStorage._doc.stn_username, constantFile.functions.USER_LOGIN_SUCCESS_TOKEN, params.direccionIp.direccionData, params.direccionIp.navegador)
						res.status(constantFile.httpCode.PETITION_CORRECT).send({
							token: jwtService.createToken(userStorage)
						})
					} else {//añado la ip nueva al array que se guardara
						ips.push(params.direccionIp.direccionData)
						directionIpController.addIpForUser(ipData, ips, params)
						directionIpController.resetCount(ipData._id, params)
						res.status(constantFile.httpCode.PETITION_CORRECT).send({
							token: jwtService.createToken(userStorage)
						})
					}

				}

			})

		} else {
			auditoriaController.saveLogsData(userStorage._doc.stn_username, constantFile.functions.USER_LOGIN_SUCCESS, params.direccionIp.direccionData, params.direccionIp.navegador)
			res.status(constantFile.httpCode.PETITION_CORRECT).send({
				message: constantFile.api.MESSAGE_OK
			})
		}
	} else if (userStorage) {
		checkIp(userStorage, params, res)
	} else {
		userAuxiliar.userNoExist(res)
	}
}

function login(req, res){

	let params = req.body
	params.direccionIp.direccionData = req.connection.remoteAddress
	let ips = []
	if(validationUser.validationLoginData(params)){
		if(params.type === 'usuario') {
			User.findOne({stn_username: params.usuario.nombreUsuario, stn_state:true}, (err, userStorage) => {
				extractMethodCheckIp(err, userStorage, params, res, ips)
			})
		}else if(params.type === 'persona'){
			Persons.findOne({stn_email:params.persona.email.toLowerCase()}, (err, person)=>{
				if(err || !person){
					globalAuxiliar.errorPeticion(res)
				}else {
					User.findOne({stn_person: person, stn_state:true}, (err, userStorage) => {
						if (getData(err, userStorage, params.usuario.password, serviceUser.comparePassword)) {
							if(params.getToken){
								auditoriaController.saveLogsData(userStorage._doc.stn_username, constantFile.functions.USER_LOGIN_SUCCESS_TOKEN,params.direccionIp.direccionData, params.direccionIp.navegador)
								res.status(constantFile.httpCode.PETITION_CORRECT).send({
									token: jwtService.createToken(userStorage)
								})
							}else{
								auditoriaController.saveLogsData(userStorage._doc.stn_username, constantFile.functions.USER_LOGIN_SUCCESS,params.direccionIp.direccionData, params.direccionIp.navegador)
								res.status(constantFile.httpCode.PETITION_CORRECT).send({
									message: constantFile.api.MESSAGE_OK

								})
							}
						} else if(userStorage){
							checkIp(userStorage, params, res)
						}else{
							userAuxiliar.userNoExist(res)
						}
					})
				}

			})
		}
	}else{
		res.status(constantFile.httpCode.BAD_REQUEST).send({
			message: constantFile.functions.ERROR_PARAMETROS_ENTRADA,
			parametros : params
		})
	}
}

function userObject(user, cb){
	User.findById(user._id).populate({path:'stn_person'}).exec(cb)
}

function getUserByPersonId(id, cb){
	User.find({stn_person:id}, cb)
}

function compareIp(UserId, cb){
	DirectionIp.findOne({stn_user:UserId},cb)
}

function getData(err, data, password, fnc){
	if(err || !data){
		return false
	}else{
		return fnc(password, data.stn_password)
	}
}

function checkIp(userStorage, params, res){
	DirectionIp.findOne({stn_user: userStorage._doc._id}, (err, data)=>{
		if(err || !data){
			auditoriaController.saveLogsData(userStorage._doc.stn_username, err, params.direccionIp.direccionData, params.direccionIp.navegador)
		}else if((data._doc.stn_tryNumber ++) >= 2){
			DirectionIp.findByIdAndUpdate(data._id,{$set:{stn_tryNumber:data._doc.stn_tryNumber, stn_status:false}}, {new: true}, (err, data)=>{
				if(data){
					auditoriaController.saveLogsData(userStorage._doc.stn_username, constantFile.functions.USER_BLOCK,params.direccionIp.direccionData, params.direccionIp.navegador)
				}
			})

			User.update({ _id: userStorage._id }, { $set: { stn_state: false}}, (err, data)=>{
				if(err || !data){
					log.info(err)
				}else{
					log.info(data)
				}
			})

		}else{
			DirectionIp.findByIdAndUpdate(data._id,{$set:{stn_tryNumber:data._doc.stn_tryNumber++}}, {new: true}, (err, data)=>{
				if(data){
					auditoriaController.saveLogsData(userStorage._doc.stn_username, constantFile.functions.LOGIN_TRY_FAIL,params.direccionIp.direccionData, params.direccionIp.navegador)
				}
			})
		}
	})
	userAuxiliar.userNoExist(res)
}

function setCodeValidation(code, id, cb){
	User.findByIdAndUpdate(id, {$set:{stn_codeVerication:code}}, {new: true}, cb)
}

function changePassword(req, res){

}

function compareCodeActivation(req, res){
	const params = req.body
	const ip = req.connection.remoteAddress
	//-----------------------QUEDA BUSCAR LA IP QUE NO ESTE DESABILITADA EN CASO AFIRMATIVO DENEGAR LA PETICION
	//  CODIGO DE LA BUSQUEDA DE IP
	serviceUser.encriptCodeVerification(params.code, (err, hash)=>{
		if(hash){
			User.findOne({stn_codeVerication:hash}, (err, data)=>{//si el codigo no esta relacionado se busca la ip si la ip no existe se añade, si extiste se comprueba que no este desabilitada
				if(err){
					auditoriaController.saveLogsData('undefined', constantFile.api.ERROR_REQUEST + err, ip, params.navegador)
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.functions.ERROR_GENERATE_CODE})
				}else if(!data){
					///queda por implementar el bloqueo de ip
					directionIpController.findIp(ip,(err, ipData)=>{
						if(err){
							auditoriaController.saveLogsData('undefined', constantFile.api.ERROR_REQUEST + err, ip, params.navegador)
						}else if(!ipData){
							//HABRÁ QUE HACER UNA LLAMADA PARA REGISTRAR LA NUEVA IP
						}else{
							//SI EXISTE Y TIENE 3 INTENTOS SE DESABILITA Y SI NO SE LE SUMA UNO AL NUMERO DE INTENTOS
						}
					})

					/*auditoriaController.saveLogsData('undefined', constantFile.api.ERROR_REQUEST + err, ip, params.navegador)
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.functions.ERROR_GENERATE_CODE})*/
				}else{
					//--------------------------------SE DEBUELVE UN TRUE Y SE ELIMINA LA CODIGO ALEATORIO DEL USUARIO


					/*auditoriaController.saveLogsData('undefined', constantFile.api.ERROR_REQUEST + err, ip, params.navegador)
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message : constantFile.functions.ERROR_GENERATE_CODE})*/
				}
			})
		}
	})
//----------------------logica el la funcion de comparar-------------
	//LLAMADA AL CONTROLADOR DE USUARIO PARA VERIFICAR EL NUEMERO Y SI ES CORRECTO DEVOLVER UN TRUE Y PASAR A LA SOLICITACION DE LA NUEVA CLAVE
	//SI ES TRUE ELIMINAR CLAVE ALEATORIA EN EL USUARIO PARA QUE NO SE REPITA O SE PUEDA VOLVER A USAR
}


// eslint-disable-next-line no-undef
module.exports = {
	login,
	registerUser,
	userObject,
	changePassword,
	setCodeValidation,
	getUserByPersonId,
	compareCodeActivation
}