'use strict'
const express = require('express')
const api = express.Router()
const personController = require('../controller/persona.controller')

const md_auth = require('../middleware/autenticate.middleware')

api.post('/getCodeRecover', personController.sendCodeActivation)
api.post('/createPerson', md_auth.ensureAuth, personController.createPerson)
api.post('/updatePerson/:id', md_auth.ensureAuth, personController.updatePerson)
api.post('/getPersonPagination', md_auth.ensureAuth, personController.getPersonByPagination)
api.get('/filterPerson/:key', md_auth.ensureAuth, personController.filterPerson)
api.delete('/deletedPerson/:id', md_auth.ensureAuth, personController.deletedPrevPerson)




// eslint-disable-next-line no-undef
module.exports = api