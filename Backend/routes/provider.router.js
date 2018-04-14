'use strict'

const express = require('express')
const api = express.Router()
const providerController = require('../controller/provider.controller')
const md_auth = require('../middleware/autenticate.middleware')
// const multipart = require('connect-multiparty')
// const md_upload = multipart({uploadDir:'./Backend/uploadFiles/products/original'})
// const md_upload = multipart({uploadDir:'./uploadFiles/products/original'})

api.post('/createProvider', md_auth.ensureAuth, providerController.createProvider)
api.post('/getProviders', md_auth.ensureAuth, providerController.getProvidersByPagination)
api.post('/updateProvider/:id', md_auth.ensureAuth, providerController.updateProvider)
api.get('/filterProvider/:key', md_auth.ensureAuth, providerController.filterProvider)
api.delete('/deleteProvider/:id', md_auth.ensureAuth, providerController.deleteProvider)






// eslint-disable-next-line no-undef
module.exports = api