'use strict'
const constantFile = require('../utils/Constant')

const regexString = new RegExp(constantFile.regex.STRINGS_WITH_SPACES)
const regexNumbers = new RegExp(constantFile.regex.NUMBERS)

function validationCreateAddress(address_IN){
	return !!(regexString.test(address_IN.stn_province) && regexString.test(address_IN.stn_location) && regexNumbers.test(address_IN.stn_number) && regexNumbers.test(address_IN.stn_floor)
		&& regexString.test(address_IN.stn_door) && regexString.test(address_IN.stn_directionName) && checkOpcionals(address_IN))
}

function checkOpcionals(address_IN){
	let typeVia = false
	let postalCode = false
	if(address_IN.stn_typeVia){
		typeVia = regexString.test(address_IN.stn_typeVia)
	}else{
		typeVia = true
	}

	if(address_IN.stn_postalCod){
		postalCode = regexString.test(address_IN.stn_postalCod)
	}else{
		postalCode = true
	}

	return typeVia && postalCode
}

// eslint-disable-next-line no-undef
module.exports ={
	validationCreateAddress
}