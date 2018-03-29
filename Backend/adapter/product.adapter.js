'use strict'

const ProductModel = require('../model/product.model')

function adapterProduct(params){
    let product = new ProductModel()
    product.stn_nameProduct = params.dataProduct.nameProd
    product.stn_descriptionProduct = params.dataProduct.descriptProd
    product.stn_costProduct = params.dataProduct.costProd
    product.stn_referenceProduct = params.dataProduct.refProd
    product.stn_ivaProduct = params.dataProduct.ivaProd
    product.stn_imageProduct = params.dataProduct.image
    product.stn_marginProduct = params.dataProduct.marginProd
    product.stn_stockProduct = params.dataProduct.stock
    product.stn_categoryFk = params.dataProduct.catProd
    return product

}
module.exports = {
    adapterProduct
}