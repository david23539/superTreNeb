'use strict'
const constantFile = require('../utils/Constant')

const regexString = new RegExp(constantFile.regex.STRINGS_WITH_SPACES)
const regexNumbers = new RegExp(constantFile.regex.NUMBERS)

function validateDataCategory(categoryObject){


	let nameCategory =  regexString.test(categoryObject.stn_nameCategory)
	let descriptionCategory = regexString.test(categoryObject.stn_descriptionCategory)
	let ivaCategory = regexNumbers.test(categoryObject.stn_ivaCategory)
	return nameCategory && descriptionCategory && ivaCategory
}

function updateParamsId(paramid){
	if(!paramid){
		return false
	}else{
		return regexString.test(paramid.id)
	}
}

function validateId(id){
	return regexString.test(id)
}
function validationPage(page){
	return regexString.test(page)
}


// eslint-disable-next-line no-undef
module.exports ={
	validateDataCategory,
	updateParamsId,
	validateId,
	validationPage
}