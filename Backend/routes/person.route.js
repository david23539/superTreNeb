'use strict'
const express = require('express')
const api = express.Router()
const personController = require('../controller/persona.controller')
// const md_auth = require('../middleware/autenticate.middleware')

api.post('/getCodeRecover', personController.sendCodeActivation)




// eslint-disable-next-line no-undef
module.exports = api