'use strict'

const express = require('express')
const UserController = require('../controller/user.controller')
const api = express.Router()

api.post('/registerNewUser', UserController.registerUser)
api.post('/login', UserController.login)

// eslint-disable-next-line no-undef
module.exports = api