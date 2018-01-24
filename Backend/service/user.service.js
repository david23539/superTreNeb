/* eslint-disable no-unused-vars */
'use strict'
const bcrypt = require('bcrypt-nodejs')
const Log = require('log'), log = new Log('info')

// eslint-disable-next-line no-unused-vars
function registerNewUser(params, res, cb) {
	bcrypt.hash(params.usuario.password,null, null, cb)
}

function comparePassword(password, userDataPassword){
	return bcrypt.compareSync(password, userDataPassword)

}

// eslint-disable-next-line no-undef
module.exports={
	registerNewUser,
	comparePassword
}