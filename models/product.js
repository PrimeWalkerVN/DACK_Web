let mongoose = require('mongoose');
let Schema = mongoose.Schema
let schema = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    typeProduct: {type: String, required: true},
    imagePath: {type: String, required: true},
});

 module.exports = mongoose.model('Product',schema, 'products');
