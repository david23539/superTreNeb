'use strict'
const express = require('express')
const api = express.Router()
const addressController = require('../controller/address.controller')

const md_auth = require('../middleware/autenticate.middleware')

api.post('/createAddress', md_auth.ensureAuth, addressController.createAdddress)
api.put('/updateAddress/:id', md_auth.ensureAuth, addressController.updateAddress)
api.post('/getAddressPagination', md_auth.ensureAuth, addressController.getAddressByPagination)
api.get('/filterAddress/:key', md_auth.ensureAuth, addressController.filterAddress)
api.get('/countAddress', md_auth.ensureAuth, addressController.getCountAddress)
api.delete('/deletedAddress/:id', md_auth.ensureAuth, addressController.deletedAddress)





// eslint-disable-next-line no-undef
module.exports = api