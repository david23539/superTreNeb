'use strict'

const CategoryModel = require('../model/category.model')
const categoryAdapter = require('../adapter/category.adapter')
const categoryValidation = require('../Validation/category.validation')
const constantFile = require('../utils/Constant')
const auditoriaController = require('./saveLogs.controller')


/*Funcion para crear una categoria*/
function createCategory(req, res){

	const params = req.body
	let category = new CategoryModel()
	params.direccionIp.direccionData = req.connection.remoteAddress
	category = categoryAdapter.categoryDataAdapter(params)
	if(categoryValidation.validateDataCategory(category)){
		category.save((err, categoryStored) => {
			if(err || !categoryStored){
				auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.CATEGORY_REGISTER_FAIL})
			}else if(categoryStored){
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.CATEGORY_REGISTER_SUCCESS, params.direccionIp.direccionData, params.direccionIp.navegador)
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.CATEGORY_REGISTER_SUCCESS})
			}
		})
	}else{
		auditoriaController.saveLogsData(req.user.name,constantFile.functions.ERROR_PARAMETROS_ENTRADA_LOG, params.direccionIp.direccionData, params.direccionIp.navegador)
		res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})


	}
}


// eslint-disable-next-line no-undef
module.exports = {
	createCategory
}