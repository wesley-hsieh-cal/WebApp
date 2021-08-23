const Product = require('../models/product');
//const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    //res.send('<h1> Main page </h1>');
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views','shop.html')); 
    // __dirname is a global variable that holds the absolute path on our OS. it will point to routes folder
    
    // Using render for now on;
    //const products = adminData.products;
    // Product.fetchAll()
    //     .then(([rows, fieldData]) => {
    //         res.render('shop/product-list', {
    //             prods: rows, 
    //             pageTitle: 'All Products', 
    //             path: '/products',
    //         });
    //     })
    //     .catch(err => {console.log(err)});

    Product
    .findAll()
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

    Product.findByPk(prodId)
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
    // Product.fetchAll(products => {
    //     res.render('shop/index', {
    //         prods: products, 
    //         pageTitle: 'Shop', 
    //         path: '/',
    //     });
    // });
    // Product.fetchAll()
    //     .then(([rows, fieldData]) => {
    //         res.render('shop/index', {
    //             prods: rows, 
    //             pageTitle: 'Shop', 
    //             path: '/',
    //         });
    //     })
    //     .catch(err => {console.log(err)});
    
    Product.findAll()
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
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for (product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);
    //             if (cartProductData) {
    //                 cartProducts.push({productData: product, qty: cartProductData.qty});
    //             };
    //         };
    //         res.render('shop/cart', {
    //             path: '/cart',
    //             pageTitle: 'Your Cart',
    //             products: cartProducts
    //         });
    //     });
    // })
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => {console.log(err)});
    })
    .catch(err => {console.log(err)});
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchCart;
    let newQuantity = 1;
    // Product.findById(prodId, (product) => {
    //     Cart.addProduct(prodId, product.price);
    // });
    // res.redirect('/cart');
    req.user.getCart()
    .then(cart => {
        fetchCart = cart;
        return cart.getProducts({where: {id: prodId}})
    })
    .then(products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        if (product) { // The product is already in the cart. Need to update the quantity.
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product
        }
        return Product.findByPk(prodId);
    })
    .then(product => {
        return fetchCart.addProduct(product, 
            { through: { quantity: newQuantity }
        });
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(err => {console.log(err)});
};

exports.postCartDeleteProduct= (req, res, next) => {
    const prodId = req.body.productId;
    // Product.findById(prodId, product => {
    //     Cart.deleteProduct(prodId, product.price);
    //     res.redirect('/cart');
    // });
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id:prodId}});
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {console.log(err)})
}

exports.postOrder = (req, res, next) => {
    let fetchCart;
    req.user.getCart()
    .then(cart => {
        fetchCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            return order.addProducts(products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity };
                return product
            }));
        })
        .catch(err => {console.log(err)});
    })
    .then(result => {
        return fetchCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => {console.log(err)});
};

exports.getOrders = (req, res, next) => {
    // res.render('shop/orders', {
    //     path: '/orders',
    //     pageTitle: 'Your Orders'
    // });
    req.user.getOrders({include: ['products']})
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