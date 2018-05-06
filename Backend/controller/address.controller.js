'use strict'
const Address = require('../model/addressData.model')
const constantFile = require('../utils/Constant')
const adapterAddress = require('../adapter/address.adapter')
const validationAddress = require('../Validation/address.validation')
const validationBrowser = require('../Validation/global.validation')
const validateDireccion = require('../Validation/direccionIp.validation')
const auditoriaController = require('./saveLogs.controller')

function createAdddress(req, res){
	let params_IN = req.body
	let address_IN = adapterAddress.addressDataAdapter(params_IN.dataAddress)
	if(validationAddress.validationCreateAddress(address_IN) && validateDireccion.validateDirection(params_IN.direccionIp) ){
		address_IN.save((err, address_OUT)=>{
			if(err || !address_OUT){
				auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, params_IN.direccionIp.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.ADDRESS_REGISTER_FAIL})
			}else{
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.ADDRESS_REGISTER_SUCCESS,  req.connection.remoteAddress, params_IN.direccionIp.navegador)
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ADDRESS_REGISTER_SUCCESS})
			}
		})
	}else{
		paramsIvalids(res)
	}

}

function updateAddress(req, res){
	let paramsIN = req.body
	const addreesId = req.params.id

	let address_IN = adapterAddress.addressDataAdapter(paramsIN.dataAddress)
	if(validationAddress.validationCreateAddress(address_IN) && validationBrowser.validateId(addreesId) && validateDireccion.validateDirection(paramsIN.direccionIp)){
		address_IN._doc._id = addreesId
		Address.findByIdAndUpdate(addreesId, address_IN, {new:true}, (err, address_OUT)=>{
			if(err || !address_OUT){
				auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, paramsIN.direccionIp.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.ADDRESS_UPDATE_ERROR})
			}else{
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.ADDRESS_UPDATE_SUCCESS, req.connection.remoteAddress, paramsIN.direccionIp.navegador)
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ADDRESS_UPDATE_SUCCESS})
			}
		})
	}else{
		paramsIvalids(res)
	}

}

function getAddressByPagination(req,res){
	const param = req.body
	if(validationBrowser.validationPage(param.pagination.page)){
		Address.find({stn_status:true})
			.skip(param.pagination.page)
			.limit(10)
			.exec((err, personList_OUT)=>{
				if(err){
					auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'getAddressPaginations')
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.ADDRESS_GET_ERROR})
				}else if(personList_OUT.length === 0){
					res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_ADDRESS_AVAIBLE})
				}else{
					res.status(constantFile.httpCode.PETITION_CORRECT).send({address: adapterAddress.addressDataListOUTAdapter(personList_OUT)})
				}
			})
	}else{
		paramsIvalids(res)
	}
}

function filterAddress(req, res){
	const keyword = req.params.key
	if(validationBrowser.validateId(keyword)){
		Address.find({stn_location:{$regex: keyword, $options: 'i'}, stn_status:true})
			.limit(10)
			.exec((err, personList_OUT)=>{
				if(err){
					auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'getAddressFilter')
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.ADDRESS_GET_ERROR})
				}else if(personList_OUT.length === 0){
					res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_ADDRESS_AVAIBLE})
				}else{
					res.status(constantFile.httpCode.PETITION_CORRECT).send({address: adapterAddress.addressDataListOUTAdapter(personList_OUT)})
				}
			})
	}else{
		paramsIvalids(res)
	}
}

function getCountAddress(req, res){
	Address.count({stn_status:true},(err, countAddress)=>{
		if(err || !countAddress){
			res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.ADDRESS_GET_ERROR})
		}else{
			res.status(constantFile.httpCode.PETITION_CORRECT).send({count:countAddress})
		}
	})
}

function deletedAddress(req, res){
	let addressId = req.params.id
	if(validationBrowser.validateId(addressId)){
		Address.findByIdAndUpdate(addressId, {stn_status:false}, {new: true}, (err, deleteAddress_OUT)=>{
			if(err || !deleteAddress_OUT){
				auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'deletePerson')
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.ADDRESS_DELETED_FAIL})
			}else{
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.ADDRESS_DELETED_SUCCESS,  req.connection.remoteAddress, 'deletePerson')
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ADDRESS_DELETED_SUCCESS})
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
	createAdddress,
	updateAddress,
	getAddressByPagination,
	filterAddress,
	getCountAddress,
	deletedAddress
}