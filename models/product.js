const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    imageUrl: {
        type: String,
        required: true
    }, 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Create relation to User object.
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);






















/** ---------------------------- MongoDB --------------------- */



// const mongoDb = require('mongodb');
// const getDb = require('../utils/database').getDb;
// class Product {

//     /**
//      * A constructor function that create Product object
//      * 
//      * @param {str} title The product's title
//      * @param {double} price The product's price
//      * @param {str} imageUrl The product's image's url
//      * @param {str} description The description of the product
//      * @param {str} id The id we want to stored in the MongoDB
//      * @param {str} userId The id of which user create this product
//      */
//     constructor(title, price, imageUrl, description, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this._id = id ? new mongoDb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     // connect to MongoDb to save data inside it 
//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             dbOp = db.collection('products').updateOne({_id: new mongoDb.ObjectId(this._id)}, {$set: this});
//         } else {
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     // fetch all the products from MongoDb
//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products').find().toArray()
//             .then(products => {
//                 console.log(products);
//                 return products;
//             })
//             .catch(err => {console.log(err)});
//     }

//     // fetch a single product from MongoDb
//     static findById(prodId) {
//         const db = getDb();
//         return db.collection('products').find({ _id: new mongoDb.ObjectId(prodId) })
//             .next()
//             .then(product => {
//                 console.log(product);
//                 return product;
//             })
//             .catch(err => {console.log(err)});
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db.collection('products').deleteOne({ _id: new mongoDb.ObjectId(prodId)})
//             .then(result => {console.log('Deleted!')})
//             .catch(err => {console.log(err)});
//     }
// }

// module.exports = Product;