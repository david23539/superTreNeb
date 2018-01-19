'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
	stn_role: String,
	stn_username:{
		type:String,
		require:true
	},
	stn_password:{
		type:String,
		require:true
	},
	stn_reminderPhrase: String,
	stn_state:{
		type:Boolean,
		require:true
	},

	stn_person: {type: Schema.ObjectId, ref: 'STN_Person'}

})
// eslint-disable-next-line no-undef
module.exports = mongoose.model('STN_User', UserSchema)