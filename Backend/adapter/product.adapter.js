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
    product.stn_deleteProduct = false
    return product

}

function AdapterProduct_OUT(product){
    let product_OUT = {}
    return  product_OUT = {
        name: product.stn_nameProduct,
        description: product.stn_descriptionProduct,
        cost: product.stn_costProduct,
        reference: product.stn_referenceProduct,
        iva: product.stn_ivaProduct,
        image: product.stn_imageProduct,
        margin: product.stn_marginProduct,
        stock: product.stn_stockProduct,
        id : product._doc._id
    }

}
module.exports = {
    adapterProduct,
    AdapterProduct_OUT
}