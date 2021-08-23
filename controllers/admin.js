const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //res.send('<form action ="/admin/add-product" method ="POST"><input type="text" name="title"><button type="submit"> Add product</button></form>');
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path:'/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    //console.log(req.body);
    // const product = new Product(null, title, imageUrl, description, price);
    // product.save()
    //     .then(() => {
    //         res.redirect('/');
    //     })
    //     .catch(err => console.log(err)
    // );
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price

    req.user.createProduct({
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price
    })
    .then(() => {
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    // Product.findById(prodId, product=> {
    //     if (!product) {
    //         return res.redirect('/');
    //     }
    //     res.render('admin/edit-product', {
    //         pageTitle: 'Edit Product', 
    //         path:'/admin/edit-product',
    //         editing: editMode,
    //         product: product
    //     });
    // });
    // Product.findByPk(prodId)
    req.user.getProducts({where: {id: prodId}})
    .then(products => {
        const product = products[0];
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product', 
            path:'/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    .catch(err => {console.log(err)});
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    // const updatedProduct = new Product(
    //     prodId, 
    //     updatedTitle, 
    //     updatedImageUrl, 
    //     updatedDesc, 
    //     updatedPrice
    // );
    // updatedProduct.save();
    Product.findByPk(prodId)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.ImageUrl = updatedImageUrl;
        return product.save();
    })
    .then(result => {
        console.log('Updated Product!')
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    //console.log(req.body);
    // Product.fetchAll(products => {
    //     res.render('admin/products', {
    //         prods: products, 
    //         pageTitle: 'Admin Products', 
    //         path: '/admin/products',
    //     });
    // });
    //Product.findAll()
    req.user.getProducts()
    .then(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products',
        });
    })
    .catch(err => {console.log(err)});
};

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    //Product.deleteById(prodId);
    // Method 1
    //Product.destroy({});
    // Method 2
    Product.findByPk(prodId)
    .then(product => {
        return product.destroy();
    })
    .then(result => {
        console.log("Destroyed the Item");
        res.redirect('/admin/products');
    })
    .catch(err => {console.log(err)});
    //res.redirect('/admin/products');
};