'use strict'
// const User = require('../model/user.model')
// const Persons = require('../model/personData.model')
const constantFile = require('../Constant')
const Log = require('log'), log = new Log('info')

// eslint-disable-next-line no-unused-vars
function registerNewUser(user) {

	log.info(constantFile.api.SERVICE_OK)
	return 'Exito'
}

// eslint-disable-next-line no-undef
module.exports={
	registerNewUser
}