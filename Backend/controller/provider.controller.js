'use strict'

const adapter = require('../adapter/provider.adapter')
const auditoriaController = require('./saveLogs.controller')
const validate = require('../Validation/provider.validation')
const validateDireccion = require('../Validation/direccionIp.validation')
const validationGlobal = require('../Validation/global.validation')

const PersonController = require('./persona.controller')
const constantFile = require('../utils/Constant')
const ProviderModel = require('../model/provider.model')


function createProvider(req, res) {

	const params = req.body
	let provider_IN = new ProviderModel()
	provider_IN = adapter.adapterProvider(params.dataProvider)
	if(validate.validateProvider(provider_IN) && validateDireccion.validateDirection(params.direccionIp)){
		provider_IN.save((err, provider_OUT)=>{
			if(err || !provider_OUT){
				auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, params.direccionIp.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PROVIDER_REGISTER_FAIL})
			}else{
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.PROVIDER_REGISTER_SUCCESS, params.direccionIp.direccionData, params.direccionIp.navegador)
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PROVIDER_REGISTER_SUCCESS})
			}
		})
	}else{
		paramsIvalids(res)
	}
}

function updateProvider(req, res){
	const params = req.body
	const providerId = req.params.id
	let provider_IN = new ProviderModel()
	provider_IN = adapter.adapterProvider(params.dataProvider)
	if(validate.validateProvider(provider_IN) && validateDireccion.validateDirection(params.direccionIp) && validationGlobal.validateId(providerId)){
		provider_IN._doc._id = providerId
		ProviderModel.findByIdAndUpdate(providerId, provider_IN, {new:true}, (err, provider_OUT)=>{
			if(err || !provider_OUT){
				auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, params.direccionIp.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PROVIDER_UPDATE_ERROR})
			}else{
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.PROVIDER_UPDATE_SUCCESS, params.direccionIp.direccionData, params.direccionIp.navegador)
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PROVIDER_UPDATE_SUCCESS})
			}
		})
	}else{
		paramsIvalids(res)
	}
}

function deleteProvider(req, res){
	const providerId = req.params.id
	if(validationGlobal.validationId(providerId)){
		ProviderModel.findById(providerId).populate('stn_responsiblePerson').populate('stn_contactPerson').exec((err, provider_OUT)=>{
			if(err || !provider_OUT){
				errorDeleted(req, err, res)
			}else{
				PersonController.deletePerson(provider_OUT._doc.stn_responsiblePerson.id, (err, person_OUT1)=>{
					if(err || !person_OUT1){
						errorDeleted(req, err, res)
					}else{
						PersonController.deletePerson(provider_OUT._doc.stn_contactPerson.id, (err, person_OUT2)=>{
							if(err || !person_OUT2){
								errorDeleted(req, err, res)
							}else{
								ProviderModel.findByIdAndUpdate(providerId, {stn_status:false}, {new:true}, (errDeleted, providerDeleted_OUT)=>{
									if(errDeleted || !providerDeleted_OUT){
										errorDeleted(req, err, res)
									}else{
										auditoriaController.saveLogsData(req.user.name,constantFile.functions.PROVIDER_DELETE_SUCCESS, req.connection.remoteAddress, 'deleteProviders')
										res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PROVIDER_DELETE_SUCCESS})
									}
								})
							}
						})
					}
				})
			}
		})
	}else{
		paramsIvalids(res)
	}
}

function getProvidersByPagination(req, res){
	const param = req.body
	if(validationGlobal.validationPage(param.pagination.page)){
		ProviderModel.find({stn_status:true})
			.skip(param.pagination.page)
			.limit(10)
			.populate({
				path:'stn_responsiblePerson',
				populate:{
					path: 'stn_fk_address'
				}
			})
			.populate({
				path:'stn_contactPerson',
				populate:{
					path: 'stn_fk_address'
				}
			})
			.populate('stn_categoryFk')
			.populate('stn_addressFkBussiness')
			.exec((err, provider_OUT)=>{
				if(err){
					auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'getProviderPaginations')
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PROVIDER_GET_ERROR})
				}else if(provider_OUT.length === 0){
					res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_PROVIDERS_AVAIBLE})
				}else{
					res.status(constantFile.httpCode.PETITION_CORRECT).send({providers: adapter.adapterOutListProvider(provider_OUT)})
				}
			})
	}else{
		paramsIvalids(res)
	}

}

function filterProvider(req, res){
	const keyword = req.params.key
	if(validationGlobal.validateId(keyword)){
		ProviderModel.find({stn_businessName:{$regex: keyword, $options: 'i'}, stn_status:true})
			.limit(10)
			.populate({
				path:'stn_responsiblePerson',
				populate:{
					path: 'stn_fk_address'
				}
			})
			.populate({
				path:'stn_contactPerson',
				populate:{
					path: 'stn_fk_address'
				}
			})
			.populate('stn_categoryFk')
			.populate('stn_addressFkBussiness')
			.exec((err, providers_OUT)=>{
				if(err){
					auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'getProviderFilter')
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PROVIDER_GET_ERROR})
				}else if(providers_OUT.length === 0){
					res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_PROVIDERS_AVAIBLE})
				}else{
					res.status(constantFile.httpCode.PETITION_CORRECT).send({providers: adapter.adapterOutListProvider(providers_OUT)})
				}
			})
	}else{
		paramsIvalids(res)
	}
}

function countProvider(req, res) {
	ProviderModel.count({stn_status:true},(err, count)=>{
		if(err){
			res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PROVIDER_GET_ERROR})
		}else if(!count){
			res.status(constantFile.httpCode.PETITION_CORRECT).send({message:constantFile.functions.NO_PROVIDERS_AVAIBLE})
		}else{
			res.status(constantFile.httpCode.PETITION_CORRECT).send({count: count})
		}
	})
}



function errorDeleted(req, err, res){
	auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'deleteProviders')
	res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PROVIDER_DELETE_ERROR})
}

function paramsIvalids(res){
	res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
}

// eslint-disable-next-line no-undef
module.exports={
	createProvider,
	updateProvider,
	deleteProvider,
	getProvidersByPagination,
	filterProvider,
	countProvider
}