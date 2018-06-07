'use strict'

const ProductModel = require('../model/product.model')
const constantFile = require('../utils/Constant')
const adapterProduct = require('../adapter/product.adapter');
const validationProduct = require('../Validation/product.validation')
const validationGlobal = require('../Validation/global.validation')
const auditoriaController = require('./saveLogs.controller')
const serviceProduct = require('../service/product.service')
const fs = require('fs')
const path = require('path')


function createProduct(req, res){
	const params = req.body
	let product = new ProductModel()
	if(params.direccionIp && params.direccionIp.navegador){
		params.direccionIp.direccionData = req.connection.remoteAddress
		product = adapterProduct.adapterProduct(params)

		if(validationProduct.validationProductDataComplete(product)){
			checkReferenceProduct(product.stn_referenceProduct, (err, referenceProduct)=>{
				if(err){
					auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador)
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_REGISTER_FAIL})
				}else if(referenceProduct.length !== 0){
					res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.EXISTS_REFERENCE_PRODUCT})
				}else{
					product.save((err, productSave)=>{
						if(err || !productSave){
							auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador)
							res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_REGISTER_FAIL})
						}else{
							auditoriaController.saveLogsData(req.user.name,constantFile.functions.PRODUCT_REGISTER_SUCCESS, params.direccionIp.direccionData, params.direccionIp.navegador)
							res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PRODUCT_REGISTER_SUCCESS, id: productSave._doc._id})
						}
					})
				}
			})

		}else{
			paramsIvalids(res)
		}
	}else{
		paramsIvalids(res)
	}
}

function checkReferenceProduct(reference, cb){
	ProductModel.find({stn_referenceProduct:reference}, cb)
}

function updateProduct(req, res){
	const params = req.body
	const id = params.identifier.id
	let productUpdate = new ProductModel()
	if(params.direccionIp && params.direccionIp.navegador){
		params.direccionIp.direccionData = req.connection.remoteAddress
		productUpdate = adapterProduct.adapterProduct(params)
		if(validationGlobal.validateId(id) && validationProduct.validationProductDataComplete(productUpdate)){
			productUpdate._doc._id = id
			ProductModel.findByIdAndUpdate(id, productUpdate, {new:true},(err, productUpdateStorage)=>{
				if(err || !productUpdateStorage){
					auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador)
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_UPDATE_ERROR})
				}else{
					auditoriaController.saveLogsData(req.user.name,constantFile.functions.PRODUCT_UPDATE_SUCCESS, params.direccionIp.direccionData, params.direccionIp.navegador)
					res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PRODUCT_UPDATE_SUCCESS, id:productUpdateStorage._doc._id})
				}
			})
		}else{
			paramsIvalids(res)
		}
	}else{
		paramsIvalids(res)
	}
}

function deletedProduct(req, res){
	const productId = req.params.id
	if(validationGlobal.validateId(productId)){
		ProductModel.findByIdAndUpdate(productId, {stn_deleteProduct: true}, (err, productStorage)=>{
			if(err || !productStorage){
				auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'deleteProductNoBrowserNecesary')
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_DELETE_ERROR})
			}else{
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.PRODUCT_DELETE_SUCCESS, req.connection.remoteAddress, 'deleteProductNoBrowserNecesary')
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PRODUCT_DELETE_SUCCESS})
			}
		})
	}else{
		paramsIvalids(res)
	}

}

function getProductAllPagination(req, res) {
	const params = req.body
	params.direccionIp.direccionData = req.connection.remoteAddress
	if(validationGlobal.validationPage(params.pagination.page)){
		ProductModel.find({stn_deleteProduct:false}).skip(params.pagination.page).limit(10).populate({path:'stn_categoryFk'}).exec((err, products)=>{
			if(err){
				auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador);
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_GET_ERROR});
			}else if(products.length === 0){
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_PRODUCT_AVAIBLE});
			}else{
				res.status(constantFile.httpCode.PETITION_CORRECT).send({products: adapterProduct.AdapterListProduct_OUT(products)});
			}
		})
	}else{
		paramsIvalids(res)
	}
}

function filterProduct(req, res){
	const keyword = req.params.key
	if(validationGlobal.validateId(keyword)){

		ProductModel.find({stn_nameProduct: {$regex: keyword, $options: 'i'}, stn_deleteProduct:false}).limit(10).populate({path:'stn_categoryFk'}).exec((err, products)=>{
			if(err){
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_GET_ERROR})
			}else if(products.length !== 0){
				res.status(constantFile.httpCode.PETITION_CORRECT).send({products: adapterProduct.AdapterListProduct_OUT(products)})
			}else{
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_PRODUCT_AVAIBLE})
			}
		})
	}else{
		paramsIvalids(res)
	}
}

function countProduct(req, res) {
	ProductModel.count({stn_deleteProduct:false},(err, count)=>{
		if(err){
			res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_GET_ERROR})
		}else if(!count){
			res.status(constantFile.httpCode.PETITION_CORRECT).send({message:constantFile.functions.NO_PRODUCT_AVAIBLE})
		}else{
			res.status(constantFile.httpCode.PETITION_CORRECT).send({count: count})
		}
	})
}

function updateProductImage(req, res){
	const productId = req.params.id
	if(validationGlobal.validateId(productId)){
		if(req.files.image){
			const filename = serviceProduct.validateImageFile(req.files.image)
			if(filename){

				serviceProduct.resizeImage(req, constantFile.urls.PRODUCT_IMG_ORIGINAL+filename, constantFile.urls.PRODUCT_IMG_RESIZE+filename)
				ProductModel.findByIdAndUpdate(productId, {stn_imageProduct:filename, stn_imageProductResize:filename}, {new:true},(err, productUpdate)=>{
					if(err || !productUpdate){
						auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'image fail')
						res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_GET_ERROR})
					}else{
						res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PRODUCT_UPDATE_SUCCESS})
					}
				})
			}else{
				paramsIvalids(res)
			}

		}else{
			paramsIvalids(res)
		}
	}else{
		paramsIvalids(res)
	}
}

function getDetailProduct(req, res){
	const productId = req.params.id;
	if(validationGlobal.validateId(productId)){
		ProductModel.findById(productId).populate({path:'stn_categoryFk'}).exec((err, data)=>{
			if(err){
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_GET_ERROR})
			}else if(!data){
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.NO_PRODUCT_AVAIBLE})
			}else{
				res.status(constantFile.httpCode.PETITION_CORRECT).send({products: adapterProduct.AdapterProduct_OUT(data)})
			}
		})
	}else{
		paramsIvalids(res)
	}
}

function getProductByCode(req, res){
	let params_IN = req.params.codeProduct;
	if(validationProduct.validationCodeProduct(params_IN)){
		ProductModel.findOne({stn_referenceProduct:params_IN, stn_deleteProduct: false}, (err, product_OUT)=>{
			if(err){
                res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_GET_ERROR})

            }else if(!product_OUT){
                res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.NO_PRODUCT_AVAIBLE})
			}else{
                res.status(constantFile.httpCode.PETITION_CORRECT).send({products: adapterProduct.AdapterProductByCode(product_OUT)})
			}
		})
	}else{
		paramsIvalids(res)
	}
}

function getImageResizeFile(req, res) {
	const imageFile = req.params.imageFile;
	// const path_file = './uploadFiles/products/resize/'+imageFile   //para linux
	const path_file = './Backend/uploadFiles/products/resize/'+imageFile;   //para windows

	sendImageFile(path_file, res)
}



function getImageOriginalFile(req, res) {
	const imageFile = req.params.imageFile
	const path_file = './Backend/uploadFiles/products/original/'+imageFile

	sendImageFile(path_file, res)
}

function sendImageFile(path_file, res) {
	fs.access(path_file, function (err) {
		if (!err) {
			res.sendFile(path.resolve(path_file))
		} else {
			paramsIvalids(res)
		}
	})
}

function paramsIvalids(res){
	res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
}

// eslint-disable-next-line no-undef
module.exports ={
	createProduct,
	updateProduct,
	deletedProduct,
	getProductAllPagination,
	filterProduct,
	countProduct,
	updateProductImage,
	getDetailProduct,
	getImageResizeFile,
	getImageOriginalFile,
    getProductByCode
};