'use strict'
const constantFile = require('../Constant')

function validateDataPersonEmail(params){
	const regexEmail = new RegExp(constantFile.regex.EMAIL)
	return regexEmail.test(params.persona.email)
}

// eslint-disable-next-line no-undef
module.exports ={
	validateDataPersonEmail
}