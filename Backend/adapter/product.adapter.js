'use strict'

const ProductModel = require('../model/product.model')
const adapterCategory = require('./category.adapter')

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
		category : adapterCategory.getCategoryByIdAdapter(product._doc.stn_categoryFk),
		id : product._doc._id
	}

}
function AdapterListProduct_OUT(products){
	let products_OUT = []
	for(let item of products){
		let product = {
			name: item.stn_nameProduct,
			description: item.stn_descriptionProduct,
			cost: item.stn_costProduct,
			reference: item.stn_referenceProduct,
			iva: item.stn_ivaProduct,
			margin: item.stn_marginProduct,
			stock: item.stn_stockProduct,
			category : adapterCategory.getCategoryByIdAdapter(item._doc.stn_categoryFk),
            image: item.stn_imageProductResize,
			id : item._doc._id
		}
		products_OUT.push(product)
	}
	return products_OUT
}
// eslint-disable-next-line no-undef
module.exports = {
	adapterProduct,
	AdapterProduct_OUT,
	AdapterListProduct_OUT
}