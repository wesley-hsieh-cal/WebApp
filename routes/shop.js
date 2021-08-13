const path = require('path');

const express = require('express');
const router = express.Router();
//const rootDir = require('../utils/path')
//const adminData = require('./admin');
const productController = require('../controllers/products');

router.get('/', productController.getProducts);

// app.use('/', (req, res, next) => { // It indicate that any path start with '/' will be executed here.
//     console.log('hi')
//     res.send('<h1>Hello from Express!!</h1>');
// });

module.exports = router;