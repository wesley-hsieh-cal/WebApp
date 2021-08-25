const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    let errMsg = req.flash('error');
    if (errMsg.length > 0) {
        errMsg = errMsg[0]
    } else {
        errMsg = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: errMsg
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email/password.');
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(result => {
                    if (result) {
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        return req.session.save(err => {
                            console.log(err);
                            return res.redirect('/');
                        });
                    }
                    req.flash('error', 'Invalid email/password.');
                    res.redirect('/login')
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}

exports.getSignUp = (req, res, next) => {
    const errMsg = req.flash('error');
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'SignUp',
        errorMessage: errMsg
    });
}

exports.postSignUp = (req, res, next) => {
    const password = req.body.password;
    const confirm = req.body.confirm;
    if (password !== confirm) {
        req.flash('error', 'passwords are different')
        return res.redirect('/signup');
    }
    const email = req.body.email;
    User.findOne({email: email})
        .then(user => {
            if (user) {
                req.flash('error', 'Email is already exists.')
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 9)
                .then(pwd => {
                    const new_user = new User({
                        email: email,
                        password: pwd,
                        cart: {items: []}
                    });
                    return new_user.save()
                })
                .then(() => {
                    res.redirect('/login');
                });
        })
        .catch(err => {console.log(err)});
}