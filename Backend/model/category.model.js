'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = Schema({
	stn_nameCategory: String,
	stn_descriptionCategory: String,
	stn_ivaCategory: Number
})
// eslint-disable-next-line no-undef
module.exports = mongoose.model('STN_Category', CategorySchema)