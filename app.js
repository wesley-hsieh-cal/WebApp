const path = require('path');

// Third-party imported module
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
//const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false})); // This has to go before path parser such that it is run before them and be used in the future
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('6125362f8f52c5329190c00f')
        .then(user => {
            //req.user = new User(user.name, user.email, user.cart, user._id);
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

// /admin/add-product
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get_404);

mongoose.connect('mongodb+srv://WesMac:xRKKMc68v6D2hgaH@cluster0.0frhb.mongodb.net/cluster0?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Wes', 
                    email: 'wes@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            };
        });
        app.listen(3000);
    })
    .catch(err => {console.log(err)});

// mongoConnect(() => {
//     app.listen(3000);
// });