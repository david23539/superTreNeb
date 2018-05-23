'use strict';
const express = require('express');
const api = express.Router();
const billController = require('../controller/bill.controller');
const md_auth = require('../middleware/autenticate.middleware');


api.get('/getCategoriesByProvider/:idProvider', md_auth.ensureAuth, billController.getCategoriesByProvider);






// eslint-disable-next-line no-undef
module.exports = api;