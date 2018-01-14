'use strict'

const constantFile = require('../Constant')

function userExist(res) {
	res.status(constantFile.httpCode.CONFLIC).send({
		message:constantFile.functions.USER_EXIST
	})

}

function notRegisterUser(res) {
	res.status(constantFile.httpCode.CONFLIC).send({
		message:constantFile.functions.USER_REGISTER_ERROR
	})
}



// eslint-disable-next-line no-undef
module.exports ={
	userExist,
	notRegisterUser
}