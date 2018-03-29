'use strict'

const ProductModel = require('../model/product.model')
const constantFile = require('../utils/Constant')
const adapterProduct = require('../adapter/product.adapter')
const validationProduct = require('../Validation/product.validation')
const auditoriaController = require('./saveLogs.controller')

function createProduct(req, res){
    const params = req.body
    let product = new ProductModel()
    if(params.direccionIp && params.direccionIp.navegador){
        params.direccionIp.direccionData = req.connection.remoteAddress
        product = adapterProduct.adapterProduct(params)
        //TODO La expresion regular no pasa habra que revisarla
        if(validationProduct.validationProductDataComplete(product)){
            product.save((err, productSave)=>{
                if(err || !productSave){
                    auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador)
                    res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_REGISTER_FAIL})
                }else{
                    auditoriaController.saveLogsData(req.user.name,constantFile.functions.PRODUCT_REGISTER_SUCCESS, params.direccionIp.direccionData, params.direccionIp.navegador)
                    res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PRODUCT_REGISTER_SUCCESS, productObject:adapterProduct.AdapterProduct_OUT(productSave)})
                }
            })
        }else{
            paramsIvalids(res)
        }
    }else{
        paramsIvalids(res)
    }
}

function updateProduct(req, res){
    const params = req.body
    const id = params.identifier.id
    let productUpdate = new ProductModel()
    if(params.direccionIp && params.direccionIp.navegador){
        params.direccionIp.direccionData = req.connection.remoteAddress
        productUpdate = adapterProduct.adapterProduct(params)
        if(validationProduct.validationProductDataComplete(productUpdate)){
            productUpdate._doc._id = id
            ProductModel.findByIdAndUpdate(id, productUpdate, {new: true}, (err, productUpdateStorage)=>{
                if(err || !productUpdateStorage){
                    auditoriaController.saveLogsData(req.user.name,err, params.direccionIp.direccionData, params.direccionIp.navegador)
                    res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_UPDATE_ERROR})
                }else{
                    auditoriaController.saveLogsData(req.user.name,constantFile.functions.PRODUCT_UPDATE_SUCCESS, params.direccionIp.direccionData, params.direccionIp.navegador)
                    res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PRODUCT_UPDATE_SUCCESS, productObject:adapterProduct.AdapterProduct_OUT(productUpdateStorage)})
                }
            })
        }else{
            paramsIvalids(res)
        }
    }else{
        paramsIvalids(res)
    }
}

function paramsIvalids(res){
    res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
}
module.exports ={
    createProduct,
    updateProduct
}