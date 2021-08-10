//const http = require('http');
const path = require('path');

// Third-party imported module
const express = require('express');
const bodyParser = require('body-parser');

// main
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false})); // This has to go before path parser such that it is run before them and be used in the future
app.use(express.static(path.join(__dirname, 'public')));
// /admin/add-product
app.use('/admin', adminRoutes);
app.use(shopRoutes);
// Others: app.(delete, patch, and put) ...

app.use((req, res, next) => { // use will handle all sorts of requests like POST, GET, PUT, ...
    //res.status(404).send('<h1> Page not found</h1>');
    res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'));
});


app.listen(3000);