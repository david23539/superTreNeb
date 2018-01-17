
'use strict'
// const bcrypt = require('bcrypt-nodejs')
// const fs = require('fs')
const User = require('../model/user.model')
const Persons = require('../model/personData.model')
const Address = require('../model/addressData.model')
// const path = require('path')
const constantFile = require('../Constant')
const userAuxiliar = require('../auxiliar/user.auxiliar')
const globalAuxiliar = require('../auxiliar/global.auxiliar')
const Log = require('log'), log = new Log('info')
const serviceUser = require('../service/user.service')
const validationUser = require('../Validation/user.validation')
const adapterUser = require('../adapter/user.adapter')
const rolBackController = require('./rollBack.controller')
const auditoriaController = require('./saveLogs.controller')

function login(req, res) {
	res.status(200).send({
		message: constantFile.api.MESSAGE_OK
	})
}

function registerUser(req, res){

	const params = req.body
	let newUser = new User()
	let newAddress = new Address()
	let newPerson = new Persons()
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

								newUser = adapterUser.userDataAdapter(params)
								try {
									newUser.save((err, userStored) => {
										if (err) {
											globalAuxiliar.errorPeticion(res)
										} else if (!userStored) {
											userAuxiliar.notRegisterUser(res)
										} else {
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
                                                                    userStored._doc.stn_associatedDevice, params.usuario.navegador)
                                                                globalAuxiliar.registerSuccess(res, userStored, constantFile.functions.USER_REGISTER_SUCCESS)
                                                            }
                                                        })
                                                    }else{
                                                        auditoriaController.saveLogsData(userStored._doc.stn_username, constantFile.functions.USER_REGISTER_SUCCESS,
                                                            userStored._doc.stn_associatedDevice, params.usuario.navegador)
                                                        globalAuxiliar.registerSuccess(res, userStored, constantFile.functions.USER_REGISTER_SUCCESS)
													}

												}
											})

										}
									})
								}catch (e){
									log.error(e)
									globalAuxiliar.errorPeticion(res)
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

function login(req, res){

	let params = req.body
	if(validationUser.validationLoginData(params)){
        res.status(constantFile.httpCode.PETICION_CORRECTA).send({
            message: constantFile.api.MESSAGE_OK

        })
	}else{
        res.status(constantFile.httpCode.BAD_REQUEST).send({
            message: constantFile.functions.ERROR_PARAMETROS_ENTRADA,
            parametros : params
        })
	}
}

// eslint-disable-next-line no-undef
module.exports = {
	login,
	registerUser
}