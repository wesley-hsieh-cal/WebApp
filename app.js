const http = require('http');
// Third-party imported module
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false})); // This has to go before path parser such that it is run before them and be used in the future

app.use('/add-product', (req, res, next) => {
    res.send('<form action ="/product" method ="POST"><input type="text" name="title"><button type="submit"> Add product</button></form>');
});

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<h1> Main page </h1>');
});

// app.use('/', (req, res, next) => { // It indicate that any path start with '/' will be executed here.
//     console.log('hi')
//     res.send('<h1>Hello from Express!!</h1>');
// });

app.listen(3000);