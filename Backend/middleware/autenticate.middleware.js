'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'secret_key_token_for_superTrebNeb_project_1_df2es7f7'
const constantFile = require('../Constant')

// eslint-disable-next-line no-undef
exports.ensureAuth = function(req, res, next){
	let payload = ''
	if (!req.headers.authorization) {
		return res.status(constantFile.httpCode.FORBIDDEN).send({message: constantFile.api.AUTHENTICATE_FAIL})

	}
	const token = req.headers.authorization.replace(/['"]+/g, '')
	try {
		payload = jwt.decode(token, secret)
		if (payload.exp <= moment().unix()) {
			return res.status(constantFile.httpCode.UNAUTHORIZED).send({message: constantFile.api.EXPIRED_TOKEN})
		}
	} catch (ex) {
		return res.status(constantFile.httpCode.NO_FOUND).send({message: constantFile.api.NO_VALID_TOKEN})
	}
	req.user = payload
	next()
}