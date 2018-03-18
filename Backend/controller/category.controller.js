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
	if(params.direccionIp && params.direccionIp.navegador){
		params.direccionIp.direccionData = req.connection.remoteAddress
		category = categoryAdapter.categoryDataAdapter(params)
		if(categoryValidation.validateDataCategory(category)){
			category.save((err, categoryStored) => {
				if(err || !categoryStored){
					auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador)
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.CATEGORY_REGISTER_FAIL})
				}else if(categoryStored){
					auditoriaController.saveLogsData(req.user.name,constantFile.functions.CATEGORY_REGISTER_SUCCESS, params.direccionIp.direccionData, params.direccionIp.navegador)
					res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.CATEGORY_REGISTER_SUCCESS, categoryObject:categoryStored})
				}
			})
		}else{
			auditoriaController.saveLogsData(req.user.name,constantFile.functions.ERROR_PARAMETROS_ENTRADA_LOG, params.direccionIp.direccionData, params.direccionIp.navegador)
			res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})


		}
	}else{
		auditoriaController.saveLogsData(req.user.name,constantFile.functions.ERROR_PARAMETROS_ENTRADA_LOG, 0, 'undefined')
		res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
	}


}

/*Funcion actualizar una categoria*/

function updateCategory(req, res){
	const params = req.body
	let category = new CategoryModel()
	params.direccionIp.direccionData = req.connection.remoteAddress
	category = categoryAdapter.categoryDataAdapter(params)
	if(categoryValidation.validateDataCategory(category) && categoryValidation.updateParamsId(params.id)){
		category._doc._id = params.id
		CategoryModel.findByIdAndUpdate(params.id, category, {new: true}, (err, categoryUpdate)=>{
			if(err || !categoryUpdate ){
				auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.CATEGORY_UPDATE_ERROR})
			}else{
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.CATEGORY_UPDATE_SUCCESS, params.direccionIp.direccionData, params.direccionIp.navegador)
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.CATEGORY_UPDATE_SUCCESS})
			}
		})
	}else{
		auditoriaController.saveLogsData(req.user.name,constantFile.functions.ERROR_PARAMETROS_ENTRADA_LOG, params.direccionIp.direccionData, params.direccionIp.navegador)
		res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
	}
}

function deletedCategory(req, res){
	const categoryId = req.params.id
	const params = req.body
	params.direccionIp.direccionData = req.connection.remoteAddress
	if(categoryValidation.validateId(categoryId)){
		CategoryModel.findByIdAndRemove(categoryId, (err, categoryRemoved)=>{
			if(err || !categoryRemoved){
				auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.CATEGORY_DELETE_ERROR})
			}else{
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.CATEGORY_DELETE_SUCCESS, params.direccionIp.direccionData, params.direccionIp.navegador)
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.CATEGORY_DELETE_SUCCESS})
			}
		})
	}else{
		auditoriaController.saveLogsData(req.user.name,constantFile.functions.ERROR_PARAMETROS_ENTRADA_LOG, params.direccionIp.direccionData, params.direccionIp.navegador)
		res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
	}
}

function getCategoryById(req, res){
	const categoryId = req.params.id
	const params = req.body
	params.direccionIp.direccionData = req.connection.remoteAddress
	if(categoryValidation.validateId(categoryId)){
		CategoryModel.findById(categoryId, (err, category)=>{
			if(err || !category){
				auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador)
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.CATEGORY_GET_CATEGORY_ERROR})
			}else{

				res.status(constantFile.httpCode.PETITION_CORRECT).send({categoryObject: categoryAdapter.getCategoryByIdAdapter(category)})
			}
		})
	}else{
		auditoriaController.saveLogsData(req.user.name,constantFile.functions.ERROR_PARAMETROS_ENTRADA_LOG, params.direccionIp.direccionData, params.direccionIp.navegador)
		res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
	}

}

function getAllCategory(req,res){
	const params = req.body
	params.direccionIp.direccionData = req.connection.remoteAddress
	CategoryModel.find({},(err,categoryData)=>{
		if(err || !categoryData){
			auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador)
			res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.CATEGORY_GET_CATEGORY_ERROR})
		}else{
			res.status(constantFile.httpCode.PETITION_CORRECT).send({categoryObject: categoryAdapter.getAllCategoriesAdapter(categoryData)})
		}
	})
}
// eslint-disable-next-line no-undef
module.exports = {
	createCategory,
	updateCategory,
	deletedCategory,
	getCategoryById,
	getAllCategory
}