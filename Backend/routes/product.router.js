'use strict';

const express = require('express');
const api = express.Router();
const productController = require('../controller/product.controller');
const md_auth = require('../middleware/autenticate.middleware');
const multipart = require('connect-multiparty');

// const md_upload = multipart({uploadDir:'./Backend/uploadFiles/products/original'});//para windows
const md_upload = multipart({uploadDir:'./uploadFiles/products/original'})//para linux

api.post('/createProduct', md_auth.ensureAuth, productController.createProduct);
api.post('/updateProduct', md_auth.ensureAuth, productController.updateProduct);
api.post('/getProducts', md_auth.ensureAuth, productController.getProductAllPagination);
api.post('/checkProductStock', md_auth.ensureAuth, productController.changeStockProduct);
api.get('/getProductFavorites', md_auth.ensureAuth, productController.getFavoriteProduct);
api.post('/uploadImageProduct/:id', [md_auth.ensureAuth, md_upload], productController.updateProductImage);
api.get('/filterProducts/:key', md_auth.ensureAuth, productController.filterProduct);
api.get('/countProducts', md_auth.ensureAuth, productController.countProduct);
api.get('/getUniqueProduct/:id', md_auth.ensureAuth, productController.getDetailProduct);
api.get('/getImageResize/:imageFile', productController.getImageResizeFile);
api.get('/getImageOriginal/:imageFile', productController.getImageOriginalFile);
api.get('/getProductByCode/:codeProduct', productController.getProductByCode);
api.delete('/deleteProduct/:id', md_auth.ensureAuth, productController.deletedProduct);






// eslint-disable-next-line no-undef
module.exports = api;