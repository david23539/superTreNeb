'use strict'

const express = require('express')
const api = express.Router()
const categoryController = require('../controller/category.controller')
const md_auth = require('../middleware/autenticate.middleware')


api.post('/createCategory', md_auth.ensureAuth, categoryController.createCategory)
api.put('/updateCategory', md_auth.ensureAuth, categoryController.updateCategory)



// eslint-disable-next-line no-undef
module.exports = api