const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //res.send('<form action ="/admin/add-product" method ="POST"><input type="text" name="title"><button type="submit"> Add product</button></form>');
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path:'/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}

exports.postAddProduct = (req, res, next) => {
    //console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    //res.send('<h1> Main page </h1>');
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views','shop.html')); 
    // __dirname is a global variable that holds the absolute path on our OS. it will point to routes folder
    
    // Using render for now on;
    //const products = adminData.products;
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/',
            hasProduct: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
}