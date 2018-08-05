'use strict';
const express = require('express');
const api = express.Router();
const billController = require('../controller/bill.controller');
const md_auth = require('../middleware/autenticate.middleware');


api.get('/getCategoriesByProvider/:idProvider', md_auth.ensureAuth, billController.getCategoriesByProvider);
api.get('/getProductByCategory/:idCategory', md_auth.ensureAuth, billController.getProductsByCategory);
api.get('/getUniqueBill/:idBill', md_auth.ensureAuth, billController.getBillById);
api.get('/filterBill/:key', md_auth.ensureAuth, billController.filterBill);
api.post('/createBill', md_auth.ensureAuth, billController.createBill);
api.post('/getBills', md_auth.ensureAuth, billController.getAllBill);
api.delete('/deletedBills/:idBill', md_auth.ensureAuth, billController.deleteBill);
api.get('/downloadBill',billController.downloadBill);






// eslint-disable-next-line no-undef
module.exports = api;