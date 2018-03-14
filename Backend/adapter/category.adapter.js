'use strict'

const CategoryModel = require('../model/category.model')

function categoryDataAdapter(categoryParams) {
	let category = new CategoryModel()
	category.stn_nameCategory = categoryParams.nameCat
	category.stn_descriptionCategory = categoryParams.descriptionCat
	category.stn_ivaCategory = categoryParams.ivaCat
	return category


}
function getCategoryByIdAdapter(categoryObject){
	let category = {
		id: categoryObject._doc._id,
		iva: categoryObject._doc.stn_ivaCategory,
		description: categoryObject._doc.stn_descriptionCategory,
		name: categoryObject._doc.stn_nameCategory
	}
	return category
}

function getAllCategoriesAdapter(categoriesObjects){
	let adaptationCategories = []
	for(let item of categoriesObjects){
		let category = {
			id: item._doc._id,
			iva: item._doc.stn_ivaCategory,
			description: item._doc.stn_descriptionCategory,
			name: item._doc.stn_nameCategory
		}
		adaptationCategories.push(category)
	}
	return adaptationCategories
}


// eslint-disable-next-line no-undef
module.exports = {
	categoryDataAdapter,
	getCategoryByIdAdapter,
	getAllCategoriesAdapter
}