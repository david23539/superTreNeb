'use strict'

const CategoryModel = require('../model/category.model')

function categoryDataAdapter(categoryParams) {
	let category = new CategoryModel()
	category.stn_nameCategory = categoryParams.nameCat
	category.stn_descriptionCategory = categoryParams.descriptionCat
	category.stn_ivaCategory = categoryParams.ivaCat
	return category


}

// eslint-disable-next-line no-undef
module.exports = {
	categoryDataAdapter
}