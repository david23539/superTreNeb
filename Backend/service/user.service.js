'use strict'
const bcrypt = require('bcrypt-nodejs')
// const constantFile = require('../Constant')
 const Log = require('log'), log = new Log('info')
const User = require('../model/user.model')
const globalAuxiliar = require('../auxiliar/global.auxiliar')

// eslint-disable-next-line no-unused-vars
function registerNewUser(params, res, cb) {
	bcrypt.hash(params.usuario.password,null, null, cb)
}

// eslint-disable-next-line no-undef
module.exports={
	registerNewUser
}