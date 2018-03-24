'use strict'

const express = require('express')
const api = express.Router()
const categoryController = require('../controller/category.controller')
const md_auth = require('../middleware/autenticate.middleware')


api.post('/createCategory', md_auth.ensureAuth, categoryController.createCategory)
api.put('/updateCategory', md_auth.ensureAuth, categoryController.updateCategory)
api.delete('/deletedCategory/:id', md_auth.ensureAuth, categoryController.deletedCategory)
api.post('/getCategory/:id', md_auth.ensureAuth, categoryController.getCategoryById)
api.post('/getAllCategories', md_auth.ensureAuth, categoryController.getAllCategory)
api.get('/getCategoriesFilter/:key', md_auth.ensureAuth, categoryController.filterCategories)



// eslint-disable-next-line no-undef
module.exports = api