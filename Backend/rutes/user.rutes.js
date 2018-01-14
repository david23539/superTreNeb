'use strict'

const express = require('express')
const UserController = require('../controller/user.controller')
const api = express.Router()

api.post('/registerNewUser', UserController.registerUser)

// eslint-disable-next-line no-undef
module.exports = api