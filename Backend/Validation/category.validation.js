'use strict'
const constantFile = require('../utils/Constant')

function validateDataCategory(categoryObject){

	const regexString = new RegExp(constantFile.regex.STRINGS)
	const regexNumbers = new RegExp(constantFile.regex.NUMBERS)
	let nameCategory =  regexString.test(categoryObject.stn_nameCategory)
	let descriptionCategory = regexString.test(categoryObject.stn_descriptionCategory)
	let ivaCategory = regexNumbers.test(categoryObject.stn_ivaCategory)
	return nameCategory && descriptionCategory && ivaCategory
}

function updateParamsId(paramid){
	if(!paramid){
		return false
	}else{
		const regexString = new RegExp(constantFile.regex.STRINGS)
		return regexString.test(paramid.id)
	}
}

function validateId(id){
	const regexString = new RegExp(constantFile.regex.STRINGS)
	return regexString.test(id)
}
function validationPage(page){
	const regexString = new RegExp(constantFile.regex.NUMBERS)
	return regexString.test(page)
}


// eslint-disable-next-line no-undef
module.exports ={
	validateDataCategory,
	updateParamsId,
	validateId,
	validationPage
}