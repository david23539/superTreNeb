'use strict'

const ProductModel = require('../model/product.model')
const constantFile = require('../utils/Constant')
const adapterProduct = require('../adapter/product.adapter')
const validationProduct = require('../Validation/product.validation')


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
                    res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.PRODUCT_REGISTER_SUCCESS, productObject:productSave})
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
    createProduct
}