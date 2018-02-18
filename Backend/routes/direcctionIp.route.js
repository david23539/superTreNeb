'use strict'
const express = require('express')
const api = express.Router()
const direccionIpController = require('../controller/directioIp.controller')

api.post('/checkBlockIp', direccionIpController.checkIpForBlock)
api.post('/blockPC', direccionIpController.blockIp)


// eslint-disable-next-line no-undef
module.exports = api
//checkBlockIp