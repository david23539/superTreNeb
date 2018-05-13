'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonDataSchema = Schema({
	stn_name:{
		type:String,
		require:true
	},
	stn_lastname1:{
		type:String,
		require:true
	},
	stn_lastname2: String,
	stn_mobile:Number,
	stn_telephone:Number,
	stn_dni:String,
	stn_email:{
		type:String,
		require:true
	},
	stn_status: Boolean,
	stn_image: String,
    stn_imagePersonResize: String,
	stn_fk_address: {type: Schema.ObjectId, ref: 'STN_Address'}

})
// eslint-disable-next-line no-undef
module.exports = mongoose.model('STN_Person', PersonDataSchema)