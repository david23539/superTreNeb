'use strict'

const CategoryModel = require('../model/category.model')

function categoryDataAdapter(categoryParams) {
	let category = new CategoryModel()
	category.stn_nameCategory = categoryParams.dataCategory.nameCat
	category.stn_descriptionCategory = categoryParams.dataCategory.descriptionCat
	category.stn_ivaCategory = categoryParams.dataCategory.ivaCat
	// category._doc._id = categoryParams.identifier.id
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

			name: item._doc.stn_nameCategory,
			description: item._doc.stn_descriptionCategory,
			iva: item._doc.stn_ivaCategory,
			id: item._doc._id


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