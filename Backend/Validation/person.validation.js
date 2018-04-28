'use strict'
const constantFile = require('../utils/Constant')

const regexStringSpaces = new RegExp(constantFile.regex.STRINGS_WITH_SPACES)
const regexNumbers = new RegExp(constantFile.regex.NUMBERS)


function validateDataPersonEmail(params){
	const regexEmail = new RegExp(constantFile.regex.EMAIL)
	return regexEmail.test(params.persona.email)
}

function validateAllDataPerson(person_IN){
	let params = {
		persona:{
			email:person_IN.stn_email
		}
	}
	return !!(regexStringSpaces.test(person_IN.stn_fk_address) && (validateDataPersonEmail(params)) && regexStringSpaces.test(person_IN.stn_dni) && (checkMobilOrTelefon(person_IN)) &&
		regexStringSpaces.test(person_IN.stn_lastname1) && regexStringSpaces.test(person_IN.stn_lastname2) && regexStringSpaces.test(person_IN.stn_name))
}

function checkMobilOrTelefon(person_IN){
	let mobile = false
	let telefon = false
	if(person_IN.stn_mobile){
		mobile = !!regexNumbers.test(person_IN.stn_mobile)
	}else{
		mobile = true
	}

	if(person_IN.stn_telephone){
		telefon = !!regexNumbers.test(person_IN.stn_telephone)
	}else{
		telefon = true
	}

	return mobile && telefon
}

// eslint-disable-next-line no-undef
module.exports ={
	validateDataPersonEmail,
	validateAllDataPerson
}