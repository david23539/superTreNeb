'use strict'

const ProductModel = require('../model/product.model')
const constantFile = require('../utils/Constant')
const adapterProduct = require('../adapter/product.adapter')


function createProduct(req, res){
    const params = req.body
    let product = new ProductModel()
    if(params.direccionIp && params.direccionIp.navegador){
        params.direccionIp.direccionData = req.connection.remoteAddress
        product = adapterProduct.adapterProduct(params)
        //queda la validacion
    }else{
        res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
    }
}