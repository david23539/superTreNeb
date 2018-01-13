'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressDataSchema = Schema({
	stn_province:String,
	stn_location: String,
	stn_typeVia: String,
	stn_postalCod: String,
	stn_number: Number,
	stn_floor: Number,
	stn_door:String

})
// eslint-disable-next-line no-undef
module.exports = mongoose.model('STN_Address', AddressDataSchema)