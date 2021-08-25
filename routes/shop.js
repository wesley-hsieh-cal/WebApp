const path = require('path');

const express = require('express');
const router = express.Router();
//const rootDir = require('../utils/path')
//const adminData = require('./admin');
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProductsDetails); // ':' signal express not take it as actual string
router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);
router.get('/orders', isAuth, shopController.getOrders);
router.post('/create-order', isAuth, shopController.postOrder);
// router.get('/checkout', shopController.getCheckout);

module.exports = router;