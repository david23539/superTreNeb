'use strict'
const constantFile = require('../utils/Constant')

const regexStringWhithSpaces = new RegExp(constantFile.regex.STRINGS_WITH_SPACES)

function validateDirection(direction_IN){
	return (direction_IN.navegador && regexStringWhithSpaces.test(direction_IN.navegador))
}

module.exports={
	validateDirection
}