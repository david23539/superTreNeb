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

// eslint-disable-next-line no-undef
module.exports ={
	validateDataCategory
}