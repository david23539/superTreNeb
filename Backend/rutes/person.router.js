'use strict'
const express = require('express')
const api = express.Router()
const personController = require('../controller/persona.controller')

api.post('/getCodeRecover', personController.sendCodeActivation)
api.post('/compareCode', personController.compareCodeActivation)


// eslint-disable-next-line no-undef
module.exports = api