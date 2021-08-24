const Product = require('../models/product');
const Order = require('../models/order');
//const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    //Product.fetchAll()
    Product.find()
        .then(products => {
            res.render('shop/product-list', {
                prods: products, 
                pageTitle: 'Shop', 
                path: '/products',
            });
        })
        .catch(err => {console.log(err)});
};

exports.getProductsDetails = (req, res, next) => {
    const prodId = req.params.productId; // @ shop.js in routes, we tell express that treat products/... as productId
    // Product.findById(prodId, product => {
    //     res.render('shop/product-detail', {
    //         product: product,
    //         pageTitle: product.title,
    //         path: '/products'
    //     })
    // });

    // One way to find an item
    // Product.findAll({
    //     where: {id: prodId}
    // }).then(products=>{products[0]}).catch();

    Product.findById(prodId) // Mongoose has findById method
    .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    })
    .catch(err => {console.log(err)});
};

exports.getIndex = (req, res, next) => {
    //Product.fetchAll()
    Product.find()
    .then(products => {
        res.render('shop/index', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/',
        });
    })
    .catch(err => {console.log(err)});
};

exports.getCart = (req, res, next) => {
    // req.user.getCart()
    // .then(products => {
    //     console.log('prod is ', products);
    //     res.render('shop/cart', {
    //         path: '/cart',
    //         pageTitle: 'Your Cart',
    //         products: products
    //     })
    // })
    // .catch(err => {console.log(err)});
    req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => {console.log(err)});
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        })
        .catch(err=> {console.log(err)});
};

exports.postCartDeleteProduct= (req, res, next) => {
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {console.log(err)})
}

exports.postOrder = (req, res, next) => {
    req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i=>{
                return {quantity: i.quantity, product: { ...i.productId._doc }}; //_doc we access the actual data
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {console.log(err)});
};

exports.getOrders = (req, res, next) => {
    Order.find({"user.userId": req.user})
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => {console.log(err)});
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};