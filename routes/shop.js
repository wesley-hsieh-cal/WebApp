const path = require('path');

const express = require('express');
const router = express.Router();
const rootDir = require('../utils/path')

router.get('/', (req, res, next) => {
    //res.send('<h1> Main page </h1>');
    res.sendFile(path.join(rootDir, 'views','shop.html')); 
    // __dirname is a global variable that holds the absolute path on our OS. it will point to routes folder
});

// app.use('/', (req, res, next) => { // It indicate that any path start with '/' will be executed here.
//     console.log('hi')
//     res.send('<h1>Hello from Express!!</h1>');
// });

module.exports = router;