'use strict'
const constantFile = require('../Constant')

// eslint-disable-next-line no-undef
exports.isAdmin = function (req, res, next) {

	if(req.user.role !== constantFile.functions.ROL_ADMIN){
		return res.status(constantFile.httpCode.FORBIDDEN).send({message: constantFile.api.ACCESS_DENIED})
	}
	next()

}