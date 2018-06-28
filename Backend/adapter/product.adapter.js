'use strict';

const ProductModel = require('../model/product.model');
const adapterCategory = require('./category.adapter');

function adapterProduct(params){
	let product = new ProductModel();
	product.stn_nameProduct = params.dataProduct.nameProd;
	product.stn_descriptionProduct = params.dataProduct.descriptProd;
	product.stn_costProduct = params.dataProduct.costProd;
	product.stn_referenceProduct = params.dataProduct.refProd;
	product.stn_ivaProduct = params.dataProduct.ivaProd;
	product.stn_imageProduct = params.dataProduct.image;
	product.stn_marginProduct = params.dataProduct.marginProd;
	product.stn_stockProduct = params.dataProduct.stock;
	product.stn_stockProductMin = params.dataProduct.stockMin;
	product.stn_categoryFk = params.dataProduct.catProd;
	product.stn_favorite = params.dataProduct.favorite;
	product.stn_deleteProduct = false;
	return product;

}



function AdapterProduct_OUT(product){
// eslint-disable-next-line no-unused-vars
	let product_OUT = {};
	return  product_OUT = {
		name: product.stn_nameProduct,
		description: product.stn_descriptionProduct,
		cost: product.stn_costProduct,
		reference: product.stn_referenceProduct,
		iva: product.stn_ivaProduct,
		image: product.stn_imageProduct,
		margin: product.stn_marginProduct,
		stock: product.stn_stockProduct,
		stockMin: product.stn_stockProductMin,
		category : adapterCategory.getCategoryByIdAdapter(product._doc.stn_categoryFk),
		favorite: product.stn_favorite,
		id : product._doc._id
	};

}

function AdapterProductByCode(product){
    let product_OUT = {};
    return  product_OUT = {
        name: product.stn_nameProduct,
        description: product.stn_descriptionProduct,
        cost: product.stn_costProduct,
        reference: product.stn_referenceProduct,
        iva: product.stn_ivaProduct,
        image: product.stn_imageProduct,
        margin: product.stn_marginProduct,
        stock: product.stn_stockProduct,
        stockMin: product.stn_stockProductMin,
        favorite: product.stn_favorite,
        id : product._doc._id
    };
}

function AdapterListProduct_OUT(products){
	let products_OUT = [];
	for(let item of products){
		let product = {
			name: item.stn_nameProduct,
			description: item.stn_descriptionProduct,
			cost: item.stn_costProduct,
			reference: item.stn_referenceProduct,
			iva: item.stn_ivaProduct,
			margin: item.stn_marginProduct,
			stock: item.stn_stockProduct,
			stockMin: item.stn_stockProductMin,
			category : adapterCategory.getCategoryByIdAdapter(item._doc.stn_categoryFk),
			image: item.stn_imageProductResize,
            favorite: item.stn_favorite,
			id : item._doc._id
		};
		products_OUT.push(product);
	}
	return products_OUT;
}

function AdapListProdWithoutCat_OUT(products){
    let products_OUT = [];
    for(let item of products){
        let product = {
            name: item.stn_nameProduct,
            description: item.stn_descriptionProduct,
            cost: item.stn_costProduct,
            reference: item.stn_referenceProduct,
            iva: item.stn_ivaProduct,
            margin: item.stn_marginProduct,
            stock: item.stn_stockProduct,
            stockMin: item.stn_stockProductMin,
            image: item.stn_imageProductResize,
            favorite: item.stn_favorite,
            id : item._doc._id
        };
        products_OUT.push(product);
    }
    return products_OUT;
}

// eslint-disable-next-line no-undef
module.exports = {
	adapterProduct,
	AdapterProduct_OUT,
	AdapterListProduct_OUT,
    AdapterProductByCode,
    AdapListProdWithoutCat_OUT
};