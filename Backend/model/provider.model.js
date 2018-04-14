'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProviderSchema = Schema({
	stn_businessName: {type: String, require:true},
	stn_responsiblePerson: {type: Schema.ObjectId, ref: 'STN_Person'},
	stn_contactPerson: {type: Schema.ObjectId, ref: 'STN_Person'},
	stn_nifBussines: {type: String, require:true},
	stn_status:{type:Boolean, require:true},
	stn_addressFkBussiness: {type: Schema.ObjectId, ref: 'STN_Address'},
	stn_categoryFk: [{type: Schema.ObjectId, ref: 'STN_Category'}]

})
// eslint-disable-next-line no-undef
module.exports = mongoose.model('STN_Provider', ProviderSchema)