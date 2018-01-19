'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'secret_key_token_for_superTrebNeb_project_1_df2es7f7'

// eslint-disable-next-line no-undef
exports.createToken = function (user) {
	const payload = {
		sub: user._doc._id,
		name: user._doc.stn_username,
		surname:user._doc.stn_person.stn_name,
		email:user._doc.stn_person.stn_email,
		role:user._doc.stn_role,
		image:user._doc.stn_person.stn_image,
		iat:moment().unix(),
		// exp:moment().add(30, 'days').unix()
		exp:moment().add(1, 'days').unix()
	}
	return jwt.encode(payload, secret)
}