'use strict'
const express = require('express')
const api = express.Router()
const personController = require('../controller/persona.controller')
const multipart = require('connect-multiparty')
const md_upload = multipart({uploadDir:'./Backend/uploadFiles/products/original'})
const md_auth = require('../middleware/autenticate.middleware')

api.post('/getCodeRecover', personController.sendCodeActivation)
api.post('/createPerson', md_auth.ensureAuth, personController.createPerson)
api.post('/updatePerson/:id', md_auth.ensureAuth, personController.updatePerson)
api.post('/getPersonPagination', md_auth.ensureAuth, personController.getPersonByPagination)
api.post('/reasignedPersons', md_auth.ensureAuth, personController.reassigmentsPersonOfProvider)
api.get('/filterPerson/:key', md_auth.ensureAuth, personController.filterPerson)
api.get('/countPersons', md_auth.ensureAuth, personController.getCountPerson)
api.post('/uploadImagePerson/:id', [md_auth.ensureAuth, md_upload], personController.updatePersonImage)
api.get('/getProviderPerson/:id', md_auth.ensureAuth, personController.checkProviderByPerson)
api.delete('/deletedPerson/:id', md_auth.ensureAuth, personController.deletedPrevPerson)




// eslint-disable-next-line no-undef
module.exports = api