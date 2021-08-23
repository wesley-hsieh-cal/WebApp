//const path = require('path');

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
//const rootDir = require('../utils/path');

//const products = [];

// app.get based on app.use but only fire for incoming 'GET' requests
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// app.post based on app.use but only fire for incoming 'POST' requests
router.post('/add-product', adminController.postAddProduct);


router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.deleteProduct);

module.exports = router;
//exports.routes = router;
//exports.products = products;