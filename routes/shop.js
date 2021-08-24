const path = require('path');

const express = require('express');
const router = express.Router();
//const rootDir = require('../utils/path')
//const adminData = require('./admin');
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProductsDetails); // ':' signal express not take it as actual string
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.get('/orders', shopController.getOrders);
router.post('/create-order', shopController.postOrder);
// router.get('/checkout', shopController.getCheckout);

module.exports = router;