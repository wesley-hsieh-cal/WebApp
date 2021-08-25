const path = require('path');

// Third-party imported module
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
//const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');

const MONGODBURI = 'mongodb+srv://WesMac:xRKKMc68v6D2hgaH@cluster0.0frhb.mongodb.net/cluster0?retryWrites=true&w=majority'

const app = express();
const store = new MongoDBStore({
    uri: MONGODBURI,
    collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false})); // This has to go before path parser such that it is run before them and be used in the future
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'a secret that only i should know', 
    resave: false, 
    saveUninitialized: false,
    store: store
}));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            req.isLoggedIn = true;
            next();
        })
        .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

// /admin/add-product
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get_404);

mongoose.connect(MONGODBURI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {console.log(err)});

// mongoConnect(() => {
//     app.listen(3000);
// });