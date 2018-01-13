
'use strict'
// const bcrypt = require('bcrypt-nodejs')
// const fs = require('fs')
const User = require('../model/user.model')
// const path = require('path')
const constantFile = require('../Constant')
const serviceUser = require('../service/user.service')

function login(req, res) {
	res.status(200).send({
		message: constantFile.api.MESSAGE_OK
	})
}

function registerUser(req, res){

	const user = new User()
	res.status(200).send({
		message: serviceUser.registerNewUser(user)
	})
}

// eslint-disable-next-line no-undef
module.exports = {
	login,
	registerUser
}