//const http = require('http');
const path = require('path');

// Third-party imported module
const express = require('express');
const bodyParser = require('body-parser');

// main
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error.js');

// app.set('view engine', 'pug'); // Setting the template engine to 'Pug'
app.set('view engine', 'ejs'); // Setting the template engine to 'ejs'
app.set('views', 'views'); // The latter is the folder's name

app.use(bodyParser.urlencoded({extended: false})); // This has to go before path parser such that it is run before them and be used in the future
app.use(express.static(path.join(__dirname, 'public')));
// /admin/add-product
app.use('/admin', adminRoutes);
app.use(shopRoutes);
// Others: app.(delete, patch, and put) ...

app.use(errorController.get_404);


app.listen(3000);