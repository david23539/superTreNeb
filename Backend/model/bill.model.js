'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = Schema({
	stn_nameClient: {type: String, require:true},
	stn_ivaBill: Number,
	stn_dataBill:{type: String, require:true},
	stn_type:{type: String, require:true},
	stn_dateCreation:{type: Date, require:true},
	stn_dateLastModify:{type: Date, require:false},
	stn_payStatus:{type: Boolean, require:true},
	stn_closed:{type: Boolean, require:true},
	stn_status:{type: Boolean, require:true}
});
// eslint-disable-next-line no-undef
module.exports = mongoose.model('STN_Bill', BillSchema);