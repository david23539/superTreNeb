'use strict'

const express = require('express')
const api = express.Router()
const productController = require('../controller/product.controller')
const md_auth = require('../middleware/autenticate.middleware')


api.post('/createProduct', md_auth.ensureAuth, productController.createProduct)
api.post('/updateProduct', md_auth.ensureAuth, productController.updateProduct)
api.post('/getProducts', md_auth.ensureAuth, productController.getProductAllPagination)
api.get('/filterProducts/:key', md_auth.ensureAuth, productController.filterProduct)
api.delete('/deleteProduct/:id', md_auth.ensureAuth, productController.deletedProduct)





// eslint-disable-next-line no-undef
module.exports = api