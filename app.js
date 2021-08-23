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
const sequelize = require('./utils/database');

// Relations between Models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


// app.set('view engine', 'pug'); // Setting the template engine to 'Pug'
app.set('view engine', 'ejs'); // Setting the template engine to 'ejs'
app.set('views', 'views'); // The latter is the folder's name

app.use(bodyParser.urlencoded({extended: false})); // This has to go before path parser such that it is run before them and be used in the future
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user; // It is an sequelize object not JS.
        next();
    })
    .catch(err => {console.log(err)});
});

// /admin/add-product
app.use('/admin', adminRoutes);
app.use(shopRoutes);
// Others: app.(delete, patch, and put) ...

app.use(errorController.get_404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'}); // A user who offer a product 
User.hasMany(Product); // A user can sell more products
User.hasOne(Cart); // A user can only have one cart at a time
Cart.belongsTo(User); // Cart can only belongs to one user
Cart.belongsToMany(Product, {through: CartItem}); 
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
    //.sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1);
        //app.listen(3000);
    })
    .then(user => {
        if (!user) {
            return User.create({name: 'Wes', email:'wes@test.com'});
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(
        err => {console.log(err)}
    );

    //app.listen(3000);