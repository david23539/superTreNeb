'use strict'

const express = require('express')
const api = express.Router()
const productController = require('../controller/product.controller')
const md_auth = require('../middleware/autenticate.middleware')


api.post('/createProduct', md_auth.ensureAuth, productController.createProduct)




// eslint-disable-next-line no-undef
module.exports = api