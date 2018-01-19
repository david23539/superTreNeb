'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const DirecctioIpSchema = Schema({
	stn_directionIp: String,
	stn_status: Boolean,
	stn_browser: String,
	stn_tryNumber: Number,
	stn_user: {type: Schema.ObjectId, ref: 'STN_User'}

})
// eslint-disable-next-line no-undef
module.exports = mongoose.model('STN_Direction_IP', DirecctioIpSchema)