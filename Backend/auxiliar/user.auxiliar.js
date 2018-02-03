'use strict'

const constantFile = require('../utils/Constant')

function userExist(res) {
	res.status(constantFile.httpCode.CONFLICT).send({
		message:constantFile.functions.USER_EXIST
	})

}

function userNoExist(res){
	res.status(constantFile.httpCode.CONFLICT).send({
		message:constantFile.functions.USER_NO_EXIST
	})
}

function notRegisterUser(res) {
	res.status(constantFile.httpCode.CONFLICT).send({
		message:constantFile.functions.USER_REGISTER_ERROR
	})
}



// eslint-disable-next-line no-undef
module.exports ={
	userExist,
	notRegisterUser,
	userNoExist
}