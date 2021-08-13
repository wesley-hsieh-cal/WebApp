//const path = require('path');

const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
//const rootDir = require('../utils/path');

//const products = [];

// app.get based on app.use but only fire for incoming 'GET' requests
router.get('/add-product', productController.getAddProduct);

// app.post based on app.use but only fire for incoming 'POST' requests
router.post('/add-product', productController.postAddProduct);

module.exports = router;
//exports.routes = router;
//exports.products = products;