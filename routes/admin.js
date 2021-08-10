const path = require('path');

const express = require('express');
const router = express.Router();
const rootDir = require('../utils/path');

// app.get based on app.use but only fire for incoming 'GET' requests
router.get('/add-product', (req, res, next) => {
    //res.send('<form action ="/admin/add-product" method ="POST"><input type="text" name="title"><button type="submit"> Add product</button></form>');
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
});

// app.post based on app.use but only fire for incoming 'POST' requests
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;