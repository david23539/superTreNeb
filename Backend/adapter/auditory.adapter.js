'use strict'

const Auditory = require('../model/auditory.model')

function auditoryLogs(username, messaje, ip, browser) {
	let auditoryModel = new Auditory()
	auditoryModel.stn_user = username
	auditoryModel.stn_fecha = new Date()
	auditoryModel.stn_message = messaje
	auditoryModel.stn_ip = ip
	auditoryModel.stn_browser = browser
	return auditoryModel

}

// eslint-disable-next-line no-undef
module.exports = {
	auditoryLogs
}