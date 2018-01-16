'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuditoryLogs = Schema({
	stn_user: String,
	stn_fecha: Date,
	stn_message: String,
	stn_ip: String,
	stn_browser: String
	
})
// eslint-disable-next-line no-undef
module.exports = mongoose.model('STN_Log', AuditoryLogs)