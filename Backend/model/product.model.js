'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
	stn_nameProduct: String,
	stn_descriptionProduct: String,
	stn_costProduct: Number,
	stn_referenceProduct: Number,
	stn_ivaProduct: Number,
	stn_imageProduct: String,
	stn_imageProductResize: String,
	stn_marginProduct: Number,
	stn_stockProduct: Number,
	stn_stockProductMin: Number,
	stn_deleteProduct: Boolean,
	stn_categoryFk: {type: Schema.ObjectId, ref: 'STN_Category'}
})
// eslint-disable-next-line no-undef
module.exports = mongoose.model('STN_Product', ProductSchema)