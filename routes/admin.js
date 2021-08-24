//const path = require('path');
//const rootDir = require('../utils/path');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// app.get based on app.use but only fire for incoming 'GET' requests
// app.post based on app.use but only fire for incoming 'POST' requests

router.get('/add-product', adminController.getAddProduct); // render the page for user to add a product to sell
router.get('/products', adminController.getProducts); // Get all products that a user sells
router.post('/add-product', adminController.postAddProduct); // post the product to the database
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.deleteProduct);

module.exports = router;
