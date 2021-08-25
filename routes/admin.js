//const path = require('path');
//const rootDir = require('../utils/path');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
// app.get based on app.use but only fire for incoming 'GET' requests
// app.post based on app.use but only fire for incoming 'POST' requests

router.get('/add-product', isAuth, adminController.getAddProduct); // render the page for user to add a product to sell
router.get('/products', isAuth, adminController.getProducts); // Get all products that a user sells
router.post('/add-product', isAuth, adminController.postAddProduct); // post the product to the database
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
router.post('/edit-product', isAuth, adminController.postEditProduct);
router.post('/delete-product', isAuth, adminController.deleteProduct);

module.exports = router;
